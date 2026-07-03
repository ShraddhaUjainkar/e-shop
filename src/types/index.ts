export type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export interface RawProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  category: string;
  thumbnail: string;
  rating: Rating;
}

export interface CartItem {
  id: number;
  title: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
}

export interface Rating {
  rate: number;
  count: number;
}
export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    variant?: string,
    cartOpen?: boolean
  ) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
  subtotal: number;
}
export interface ErrorProps {
  state: {
    status: 'error';
    message?: string;
  };
}

export interface HeaderProps {
  onCartClick?: () => void;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
