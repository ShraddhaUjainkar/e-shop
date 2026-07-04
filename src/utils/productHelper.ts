import type { Product } from '../types';

// Helper to generate dynamic variant images based on category
export const getProductImages = (product: Product) => {
  const defaultImages: Record<string, string[]> = {
    "men's clothing": [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
    ],
    "women's clothing": [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    ],
    jewelery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    ],
    electronics: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    ],
  };

  const category = product.category.toLowerCase();
  const categoryImages = defaultImages[category] || [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
  ];

  return [product.thumbnail, ...categoryImages];
};

// Deterministic variant stock calculator
export const getVariantStock = (
  color: string,
  size: string,
  productId: number
) => {
  const key = `${color}-${size}-${productId}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const val = Math.abs(hash) % 10;
  if (val < 2) return 'sold_out';
  if (val < 5) return 'low_stock';
  return 'available';
};

// Image optimization CDN helper
export const optimizeImageUrl = (url: string, width: number): string => {
  if (!url) return '';
  if (url.includes('fakestoreapi.com')) {
    // wsrv.nl is a free, fast, global image resizing CDN that converts to webp on the fly
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp`;
  }
  if (url.includes('unsplash.com')) {
    // Unsplash supports dynamic sizing via URL parameters, replace w=... with our requested width
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams(url.split('?')[1] || '');
    params.set('w', width.toString());
    params.set('auto', 'format');
    params.set('q', '80');
    return `${baseUrl}?${params.toString()}`;
  }
  return url;
};
