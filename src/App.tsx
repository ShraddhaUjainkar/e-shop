import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import CartDrawer from './components/CartDrawer';
import Loading from './components/Loading';
import { CartProvider, useCart } from './stores/CartContext';

const ProductListing = lazy(() => import('./pages/ProductListing'));
const ProductDetails = lazy(() => import('./pages/ProductDetail'));

function AppContent() {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <BrowserRouter>
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          {/* Define the dynamic :slug parameter */}
          <Route path="/product/:slug" element={<ProductDetails />} />
        </Routes>
      </Suspense>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </BrowserRouter>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
