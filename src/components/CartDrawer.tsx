import React, { useEffect } from 'react';
import { useCart } from '../stores/CartContext';
import type { CartDrawerProps } from '../types';

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  // Prevent background body scrolling when the cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <>
      {/* Translucent Backdrop Overlay */}
      <div
        className={`cart-drawer-backdrop ${isOpen ? 'visible' : 'hidden'}`}
        onClick={onClose}
      />

      {/* Cart Drawer Sliding Panel */}
      <div className={`cart-drawer ${isOpen ? 'open' : 'closed'}`}>
        {/* Header Area */}
        <div className="cart-drawer-header">
          <div className="flex items-center gap-2">
            <h2 className="font-display-sm text-md m-0">Your Cart</h2>
            <span className="text-utility-label text-[11px] tracking-wider text-[#424844] uppercase">
              ({cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:text-[#b59410] transition-colors flex items-center justify-center"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
              <span className="material-symbols-outlined text-[48px] text-[#737973] mb-4">
                shopping_bag
              </span>
              <p className="font-body-md text-on-surface-variant mb-4">
                Your cart is currently empty.
              </p>
              <button
                onClick={onClose}
                className="font-utility-label text-xs tracking-widest text-[#b59410] uppercase hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#d9d5ca]/30">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="cart-item">
                  {/* Product Thumbnail */}
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  {/* Info and Quantity Picker */}
                  <div className="cart-item-info">
                    <div>
                      <h4 className="font-headline-sm text-sm font-semibold truncate text-[#211f1c] m-0">
                        {item.title}
                      </h4>
                      <p className="font-utility-label text-[10px] tracking-wider text-[#737973] uppercase mt-1">
                        {item.variant}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="cart-item-quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-full flex items-center justify-center text-[#211f1c] transition-colors font-medium text-sm"
                      >
                        -
                      </button>
                      <span className="font-utility-label text-xs text-[#211f1c]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-full flex items-center justify-center text-[#211f1c] transition-colors font-medium text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Display and Removal */}
                  <div className="cart-item-actions">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn transition-colors"
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        close
                      </span>
                    </button>
                    <span className="font-utility-label text-sm text-[#211f1c] font-semibold mt-auto">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="cart-drawer-footer">
          {/* Pricing breakdown */}
          <div className="cart-pricing-summary">
            <div className="pricing-row font-utility-label text-xs uppercase tracking-wider text-[#424844]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="pricing-row font-utility-label text-[9px] uppercase tracking-wider text-[#737973] italic">
              <span>Estimated Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="pricing-row pt-3 border-t border-[#d9d5ca]/40">
              <span className="text-size-title font-bold">Total</span>
              <span className="text-size-title font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="space-y-3">
            <button
              className="cart-checkout-btn"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
