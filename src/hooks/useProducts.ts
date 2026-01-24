import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

export const useProducts = (options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
  excludeId?: string;
}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
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

      // Filter by category slug in JS since nested filtering is tricky
      let products = (data || []) as Product[];
      
      if (options?.categorySlug) {
        products = products.filter(p => p.category?.slug === options.categorySlug);
      }

      // Sort images by sort_order
      products = products.map(p => ({
        ...p,
        images: (p.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      }));

      return products;
    },
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
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

      // Sort images by sort_order
      const product = data as Product;
      product.images = (product.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

      return product;
    },
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return (data || []) as Category[];
    },
  });
};

export const useRelatedProducts = (productId: string, categorySlug?: string) => {
  return useQuery({
    queryKey: ['related-products', productId, categorySlug],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories (id, name, slug),
          images:product_images (id, image_url, alt_text, sort_order)
        `)
        .eq('is_active', true)
        .neq('id', productId)
        .limit(6);

      const { data, error } = await query;

      if (error) throw error;

      let products = (data || []) as Product[];

      // Sort images
      products = products.map(p => ({
        ...p,
        images: (p.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      }));

      // Prioritize same category products
      if (categorySlug) {
        const sameCat = products.filter(p => p.category?.slug === categorySlug);
        const otherCat = products.filter(p => p.category?.slug !== categorySlug);
        products = [...sameCat, ...otherCat].slice(0, 6);
      }

      return products;
    },
    enabled: !!productId,
  });
};
