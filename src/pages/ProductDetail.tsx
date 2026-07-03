import { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useApiResource } from '../hooks/useResource';
import { getProductByID } from '../services/api';
import { useCart } from '../stores/CartContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

import { getProductImages, getVariantStock } from '../utils/productHelper';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const state = useApiResource(() => getProductByID(Number(slug)));
  const { addToCart, setIsCartOpen } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get('color') || 'Forest';
  const selectedSize = searchParams.get('size') || 'Medium';

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  // Sync selected options in query parameters
  const handleColorChange = (color: string) => {
    setSearchParams((prev) => {
      prev.set('color', color);
      return prev;
    });
  };

  const handleSizeChange = (size: string) => {
    setSearchParams((prev) => {
      prev.set('size', size);
      return prev;
    });
  };

  // Reset active image and quantity when routing between different products during rendering
  const [prevSlug, setPrevSlug] = useState(slug);
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setActiveImage(null);
    setQuantity(1);
  }

  if (state.status === 'loading' || state.status === 'idle') {
    return <Loading />;
  }

  if (state.status === 'error') {
    return <Error state={state} />;
  }

  const product = state.data;

  if (!product) {
    return (
      <main
        className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col justify-center items-center text-center"
        style={{ minHeight: '50vh' }}
      >
        <h2 className="font-display-xl text-display-xl mb-4">
          Product Not Found
        </h2>
        <p className="font-body-md text-on-surface-variant mb-6">
          The requested product could not be located in our archives.
        </p>
        <Link
          to="/"
          className="font-utility-label text-utility-label uppercase px-6 py-3 border border-line hover:bg-surface-container transition-colors inline-block"
        >
          Return to Catalog
        </Link>
      </main>
    );
  }

  const images = getProductImages(product);
  const currentImage = activeImage || product.thumbnail;
  const currentVariantStock = getVariantStock(
    selectedColor,
    selectedSize,
    product.id
  );

  const handleAddToCart = () => {
    if (currentVariantStock === 'sold_out') return;
    addToCart(
      product,
      quantity,
      `${selectedColor.toUpperCase()} . ${selectedSize.toUpperCase()}`
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    setIsCartOpen(true);
  };

  const oldPrice = product.price * 1.25;

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-16 items-start">
        {/* Left Column — Images */}
        <div className="md:col-span-7 space-y-gutter">
          <div className="bg-card-white border border-line aspect-square w-full overflow-hidden flex items-center justify-center p-8 md:p-12">
            <img
              id="main-image"
              className="max-w-full max-h-full object-contain transition-opacity duration-500"
              src={currentImage}
              alt={product.name}
            />
          </div>

          <div className="product-detail-gallery-thumbs">
            {images.map((img, idx) => {
              const isActive = currentImage === img;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`bg-card-white border aspect-square overflow-hidden hover:opacity-80 transition-all p-2 flex items-center justify-center ${
                    isActive ? 'border-2 border-primary' : 'border-line'
                  }`}
                >
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column — Actions & Info */}
        <div className="md:col-span-5 space-y-8 sticky top-32">
          <header className="space-y-2">
            <p className="font-utility-label text-utility-label uppercase tracking-widest text-primary">
              {product.category}
            </p>

            <h5 className="font-display-md text-display-md text-primary leading-tight mb-1">
              {product.name}
            </h5>

            <div className="flex items-center gap-4 py-2">
              <span className="font-price-display text-price-display text-secondary">
                ${product.price.toFixed(2)}
              </span>

              <span className="font-utility-label text-utility-label text-outline line-through">
                ${oldPrice.toFixed(2)}
              </span>
            </div>
          </header>

          <div className="space-y-6">
            {/* Colour Swatches */}
            <div className="space-y-3">
              <span className="font-utility-label text-utility-label uppercase text-on-surface-variant">
                Color /{' '}
                <span
                  id="selected-color"
                  className="text-on-surface font-semibold"
                >
                  {selectedColor}
                </span>
              </span>

              <div className="flex gap-4">
                {['Slate', 'Forest', 'Sand'].map((color) => {
                  const colorHex =
                    color === 'Slate'
                      ? '#4A5568'
                      : color === 'Forest'
                        ? '#2f4538'
                        : '#D6BC97';
                  return (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      title={color}
                      style={{ backgroundColor: colorHex }}
                      className={`w-10 h-10 rounded-full stitched-ring ${
                        selectedColor === color ? 'active-swatch' : ''
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Buttons */}
            <div className="space-y-3">
              <span className="font-utility-label text-utility-label uppercase text-on-surface-variant">
                Size
              </span>

              <div className="flex flex-wrap gap-4">
                {['Small', 'Medium', 'Large'].map((size) => {
                  const stockStatus = getVariantStock(
                    selectedColor,
                    size,
                    product.id
                  );
                  const isSelected = selectedSize === size;

                  let btnClass =
                    'px-4 py-3 rounded-full border text-xs uppercase tracking-wider text-utility-label transition-all flex flex-col items-center justify-center min-w-[100px] ';
                  let statusText = '';

                  if (stockStatus === 'sold_out') {
                    btnClass += isSelected
                      ? 'border-2 border-outline-variant bg-surface-container-low text-outline opacity-60 line-through'
                      : 'border-line border-dashed bg-surface-container-low text-outline/50 opacity-40 line-through';
                    statusText = 'Sold Out';
                  } else if (stockStatus === 'low_stock') {
                    btnClass += isSelected
                      ? 'border-2 border-error bg-error-container/10 text-error'
                      : 'border-error/30 hover:border-error text-on-surface';
                    statusText = 'Low Stock';
                  } else {
                    btnClass += isSelected
                      ? 'border-2 border-primary bg-primary-container/10 text-primary'
                      : 'border-line hover:bg-surface-container text-on-surface';
                  }

                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={btnClass}
                    >
                      <span>{size}</span>
                      <span className="text-[8px] font-mono tracking-normal normal-case font-medium opacity-80 mt-0.5">
                        {statusText}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Picker & Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center border border-line h-12 ${currentVariantStock === 'sold_out' ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  <button
                    disabled={currentVariantStock === 'sold_out'}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                  >
                    -
                  </button>

                  <input
                    id="qty-input"
                    type="text"
                    readOnly
                    value={currentVariantStock === 'sold_out' ? 0 : quantity}
                    className="w-12 h-full bg-transparent text-center font-utility-label"
                  />

                  <button
                    disabled={currentVariantStock === 'sold_out'}
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                  >
                    +
                  </button>
                </div>

                {currentVariantStock === 'sold_out' && (
                  <span className="text-xs text-error font-semibold font-mono">
                    This variant is currently sold out.
                  </span>
                )}
              </div>

              <button
                disabled={currentVariantStock === 'sold_out'}
                onClick={handleAddToCart}
                className="cart-checkout-btn"
                style={{
                  opacity: currentVariantStock === 'sold_out' ? 0.5 : 1,
                  backgroundColor: isAdded ? '#b59410' : undefined,
                  cursor:
                    currentVariantStock === 'sold_out'
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                {currentVariantStock === 'sold_out'
                  ? 'Sold Out'
                  : isAdded
                    ? '✓ Added'
                    : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
