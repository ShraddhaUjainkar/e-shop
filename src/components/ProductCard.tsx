import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../stores/CartContext';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, 'STANDARD', false);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="product-card group">
      <div className="product-card-image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img
            className="transition-transform duration-700 group-hover:scale-105"
            src={product.thumbnail}
            alt={product.name}
          />
        </Link>
      </div>

      <div className="product-card-info">
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-card-category">{product.category}</p>
        <span className="product-card-price">${product.price}</span>
      </div>

      <button
        onClick={handleQuickAdd}
        className="cart-checkout-btn"
        style={{
          backgroundColor: isAdded ? '#b59410' : undefined,
        }}
      >
        {isAdded ? '✓ Added' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
