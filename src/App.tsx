import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetail';
import CartDrawer from './components/CartDrawer';
import { CartProvider, useCart } from './stores/CartContext';

function AppContent() {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <BrowserRouter>
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        {/* Define the dynamic :slug parameter */}
        <Route path="/product/:slug" element={<ProductDetails />} />
      </Routes>
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
