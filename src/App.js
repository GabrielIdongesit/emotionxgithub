// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Bike from "./components/Bike";
import Footer from "./components/Footer";
import HeadlineCard from "./components/HeadlineCard";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import ProductPreview from "./components/ProductPreview";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminDashboard from "./components/AdminDashboard";
import Pickup from "./pages/Pickup";
import Delivery from "./pages/Delivery";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import SpareParts from "./components/SpareParts";
import Payment from "./components/Payment";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLogin from "./components/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Layout wrapper
const Layout = ({ children }) => (
  <>
    <main>{children}</main>
    <Footer />
  </>
);

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/SignUp" replace />;
  return children;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // -------------------------
  // CART STATE (Persistent)
  // -------------------------
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // -------------------------
  // CART FUNCTIONS
  // -------------------------
  const addToCart = (product) => {
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <AuthProvider>
      <Router>
        <Navbar setSearchTerm={setSearchTerm} cartCount={cartCount} />

        <Routes>
          {/* Pickup & Delivery */}
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/delivery" element={<Delivery />} />

          {/* Auth / Static Pages */}
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/spare-parts" element={<SpareParts />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/AboutUs" element={<Layout><AboutUs /></Layout>} />
          <Route path="/ContactUs" element={<Layout><ContactUs /></Layout>} />
          <Route path="/Signin" element={<Layout><Signin /></Layout>} />
          <Route path="/SignUp" element={<Layout><SignUp /></Layout>} />

          {/* Home / Bikes (Protected) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Hero />
                  <HeadlineCard />
                  <Bike
                    searchTerm={searchTerm}
                    setSelectedProduct={setSelectedProduct}
                    addToCart={addToCart}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Cart & Checkout */}
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart
                  cart={cart}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  removeItem={removeItem}
                />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout cart={cart} setCart={setCart} />
              </Layout>
            }
          />

          {/* Admin Dashboard */}
         <Route path="/admin-dashboard" element={<AdminLogin />} />

<Route
  path="/admin-login"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>



          {/* Payment page */}
          <Route path="/payment" element={<Layout><Payment /></Layout>} />
        </Routes>

        {/* Product Quick View Modal */}
        <ProductPreview
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
