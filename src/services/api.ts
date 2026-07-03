import { apiFetch } from '../utils/apiFetch';
import type { Product, RawProduct } from '../types';
import { mapToProduct } from './mapper';

export async function getProducts(): Promise<Product[]> {
  const response = await apiFetch<RawProduct[]>(
    `${import.meta.env.VITE_API_URL}/products`
  );

  return response.map(mapToProduct);
}

export async function getProductByID(id: number) {
  const response = await apiFetch<RawProduct>(
    `${import.meta.env.VITE_API_URL}/products/${id}`
  );

  return mapToProduct(response);
}
