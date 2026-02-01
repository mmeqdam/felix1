"use client";

import useSWR from 'swr';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/auth-context';

export interface OrderItem {
  id: string;
  quantity: number;
  price_at_purchase: number;
  product: {
    id: string;
    name: string;
    slug: string;
    images: { image_url: string }[];
  };
}

export interface Order {
  id: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

export const useOrders = () => {
  const { user } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user ? ['orders', user.id] : null,
    async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          status,
          total_amount,
          shipping_address,
          created_at,
          items:order_items (
            id,
            quantity,
            price_at_purchase,
            product:products (
              id,
              name,
              slug,
              images:product_images (image_url)
            )
          )
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []) as Order[];
    }
  );

  return {
    data: data || [],
    error,
    isLoading,
    mutate,
  };
};
