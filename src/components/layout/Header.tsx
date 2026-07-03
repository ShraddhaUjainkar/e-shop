import React from 'react';
import { useCart } from '../../stores/CartContext';
import type { HeaderProps } from '../../types';

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { cartCount, setIsCartOpen } = useCart();

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <header className="bg-background sticky top-0 z-40 border-b border-outline-variant">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <a
            className="font-display-lg-mobile italic text-primary font-bold text-2xl"
            href="/"
          >
            The Catalog
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCartClick}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors relative flex items-center justify-center"
            aria-label="Open cart"
          >
            <span
              className="material-symbols-outlined text-[24px]"
              data-icon="shopping_cart"
            >
              shopping_cart
            </span>
            {cartCount > 0 ? (
              <span>({cartCount})</span>
            ) : (
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
