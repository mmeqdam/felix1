"use client";

import useSWR from 'swr';
import { supabase } from '@/lib/supabase';

export interface ProductImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  material: string | null;
  dimensions: string | null;
  weight: string | null;
  stock_quantity: number;
  is_active: boolean | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  images: ProductImage[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number | null;
}

const fetchProducts = async (options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
  excludeId?: string;
}) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories (id, name, slug),
      images:product_images (id, image_url, alt_text, sort_order)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.excludeId) {
    query = query.neq('id', options.excludeId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;

  let products = (data || []) as Product[];
  
  if (options?.categorySlug) {
    products = products.filter(p => p.category?.slug === options.categorySlug);
  }

  products = products.map(p => ({
    ...p,
    images: (p.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  }));

  return products;
};

export const useProducts = (options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
  excludeId?: string;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    ['products', options],
    () => fetchProducts(options)
  );

  return {
    data: data || [],
    error,
    isLoading,
    mutate,
  };
};

export const useProduct = (slug: string) => {
  const { data, error, isLoading } = useSWR(
    slug ? ['product', slug] : null,
    async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (id, name, slug),
          images:product_images (id, image_url, alt_text, sort_order)
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      const product = data as Product;
      product.images = (product.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

      return product;
    }
  );

  return { data, error, isLoading };
};

export const useCategories = () => {
  const { data, error, isLoading } = useSWR(
    'categories',
    async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return (data || []) as Category[];
    }
  );

  return { data: data || [], error, isLoading };
};

export const useRelatedProducts = (productId: string, categorySlug?: string) => {
  const { data, error, isLoading } = useSWR(
    productId ? ['related-products', productId, categorySlug] : null,
    async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (id, name, slug),
          images:product_images (id, image_url, alt_text, sort_order)
        `)
        .eq('is_active', true)
        .neq('id', productId)
        .limit(6);

      if (error) throw error;

      let products = (data || []) as Product[];

      products = products.map(p => ({
        ...p,
        images: (p.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      }));

      if (categorySlug) {
        const sameCat = products.filter(p => p.category?.slug === categorySlug);
        const otherCat = products.filter(p => p.category?.slug !== categorySlug);
        products = [...sameCat, ...otherCat].slice(0, 6);
      }

      return products;
    }
  );

  return { data: data || [], error, isLoading };
};
