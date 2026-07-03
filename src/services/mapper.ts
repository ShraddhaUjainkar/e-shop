import type { Product, RawProduct } from '../types';

export function mapToProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    name: raw.title,
    price: raw.price,
    thumbnail: raw.image,
    desc: raw.description,
    category: raw.category,
    rating: raw.rating,
  };
}
