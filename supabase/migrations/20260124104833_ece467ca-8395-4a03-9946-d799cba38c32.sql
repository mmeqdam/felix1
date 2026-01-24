-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view product images
CREATE POLICY "Anyone can view product images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

-- Allow admins to upload product images
CREATE POLICY "Admins can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to update product images
CREATE POLICY "Admins can update product images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to delete product images
CREATE POLICY "Admins can delete product images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Insert seed categories
INSERT INTO public.categories (name, slug, description, sort_order) VALUES
('أقراط', 'earrings', 'مجموعة الأقراط الفاخرة', 1),
('أساور', 'bracelets', 'مجموعة الأساور الأنيقة', 2),
('خواتم', 'rings', 'مجموعة الخواتم المميزة', 3),
('قلادات', 'necklaces', 'مجموعة القلادات الراقية', 4)
ON CONFLICT DO NOTHING;

-- Insert seed products
INSERT INTO public.products (name, slug, description, price, compare_at_price, material, dimensions, weight, stock_quantity, is_active, is_featured, category_id) VALUES
('Pantheon', 'pantheon', 'أقراط مستوحاة من العمارة الكلاسيكية، تجمع بين الأناقة الخالدة والحداثة البسيطة.', 2850.00, NULL, '18k Gold Plated Sterling Silver', '2.5cm x 1.2cm', '4.2g per earring', 15, true, true, (SELECT id FROM categories WHERE slug = 'earrings')),
('Eclipse', 'eclipse', 'سوار فاخر بتصميم دائري يعكس جمال الكسوف.', 3200.00, 3500.00, '18k Gold', '17cm adjustable', '12g', 10, true, true, (SELECT id FROM categories WHERE slug = 'bracelets')),
('Halo', 'halo', 'أقراط بتصميم هالة مضيئة تضفي لمسة من الإشراق.', 1950.00, NULL, 'Sterling Silver with Gold Finish', '1.8cm diameter', '3.5g per earring', 20, true, false, (SELECT id FROM categories WHERE slug = 'earrings')),
('Oblique', 'oblique', 'أقراط بخطوط مائلة تعكس الجرأة والأناقة.', 1650.00, NULL, 'Sterling Silver', '2.0cm x 0.8cm', '3.0g per earring', 25, true, false, (SELECT id FROM categories WHERE slug = 'earrings')),
('Lintel', 'lintel', 'أقراط مستوحاة من العمارة بتصميم عتبة أنيق.', 2250.00, NULL, '18k Gold Plated', '2.2cm x 1.0cm', '3.8g per earring', 18, true, true, (SELECT id FROM categories WHERE slug = 'earrings')),
('Shadowline', 'shadowline', 'سوار بتصميم خطوط الظل الفريد.', 3950.00, 4200.00, '18k Gold', '18cm adjustable', '15g', 8, true, true, (SELECT id FROM categories WHERE slug = 'bracelets')),
('Arcus', 'arcus', 'سوار بتصميم قوسي أنيق.', 2750.00, NULL, 'Sterling Silver with Gold', '16.5cm adjustable', '10g', 12, true, false, (SELECT id FROM categories WHERE slug = 'bracelets')),
('Span', 'span', 'سوار امتداد بتصميم عصري.', 1850.00, NULL, 'Sterling Silver', '17cm', '8g', 22, true, false, (SELECT id FROM categories WHERE slug = 'bracelets')),
('Circular', 'circular', 'خاتم دائري كلاسيكي بلمسة عصرية.', 1450.00, NULL, '18k Gold', 'Multiple sizes available', '4g', 30, true, true, (SELECT id FROM categories WHERE slug = 'rings')),
('Organic', 'organic', 'أقراط بتصميم عضوي مستوحى من الطبيعة.', 2100.00, NULL, 'Recycled Gold', '2.3cm x 1.5cm', '4.0g per earring', 15, true, true, (SELECT id FROM categories WHERE slug = 'earrings'));

-- Insert product images for each product
INSERT INTO public.product_images (product_id, image_url, alt_text, sort_order)
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/pantheon-1.jpg', 'Pantheon earrings main view', 0
FROM products p WHERE p.slug = 'pantheon'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/pantheon-2.jpg', 'Pantheon earrings side view', 1
FROM products p WHERE p.slug = 'pantheon'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/eclipse-1.jpg', 'Eclipse bracelet main view', 0
FROM products p WHERE p.slug = 'eclipse'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/halo-1.jpg', 'Halo earrings main view', 0
FROM products p WHERE p.slug = 'halo'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/oblique-1.jpg', 'Oblique earrings main view', 0
FROM products p WHERE p.slug = 'oblique'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/lintel-1.jpg', 'Lintel earrings main view', 0
FROM products p WHERE p.slug = 'lintel'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/shadowline-1.jpg', 'Shadowline bracelet main view', 0
FROM products p WHERE p.slug = 'shadowline'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/arcus-1.jpg', 'Arcus bracelet main view', 0
FROM products p WHERE p.slug = 'arcus'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/span-1.jpg', 'Span bracelet main view', 0
FROM products p WHERE p.slug = 'span'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/circular-1.jpg', 'Circular ring main view', 0
FROM products p WHERE p.slug = 'circular'
UNION ALL
SELECT p.id, 'https://yagaeuoepdoblpboioeb.supabase.co/storage/v1/object/public/product-images/organic-1.jpg', 'Organic earrings main view', 0
FROM products p WHERE p.slug = 'organic';