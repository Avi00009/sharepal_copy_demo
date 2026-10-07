import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import HeroBanner from './components/HeroBanner';
import SubcategoryTabs from './components/SubcategoryTabs';
import SearchAndFilterBar from './components/SearchAndFilterBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CityModal from './components/CityModal';
import DatePickerModal from './components/DatePickerModal';
import CartDrawer from './components/CartDrawer';
import FloatingDateBar from './components/FloatingDateBar';
import StatsSection from './components/StatsSection';
import WhyChooseSharePal from './components/WhyChooseSharePal';
import TestimonialsMarquee from './components/TestimonialsMarquee';
import FaqSection from './components/FaqSection';
import DirectoryLinks from './components/DirectoryLinks';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import MobileBottomNav from './components/MobileBottomNav';
import LoginModal from './components/LoginModal';
import SearchModal from './components/SearchModal';
import OfferBannerCarousel from './components/OfferBannerCarousel';
import ChatbotModal from './components/ChatbotModal';
import StickySubcategorySidebar from './components/StickySubcategorySidebar';
import EarnCreditsBar from './components/EarnCreditsBar';
import RentOutGearBanner from './components/RentOutGearBanner';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { productsData } from './data/products';

export default function App() {
  // Products state (allows incrementing votes)
  const [products, setProducts] = useState(productsData);

  // Location & Dates
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  // Initial dates: null by default matching SharePal initial browsing state
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [billableDays, setBillableDays] = useState(0);
  const [isDatesConfirmed, setIsDatesConfirmed] = useState(false);

  // Category & Subcategory Navigation
  const [activeCategory, setActiveCategory] = useState('gaming');
  const [activeSubcat, setActiveSubcat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modals & Drawers
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);

  // User Authentication
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sp_user');
      return saved ? JSON.parse(saved) : { name: 'Avigyan', phone: '9876543210' };
    } catch {
      return { name: 'Avigyan', phone: '9876543210' };
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('sp_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('sp_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sp_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sp_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sp_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('sp_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist toggle
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
      );
    }
  };

  const removeCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Date selection apply
  const applyDates = (delivery, pickup, days) => {
    setDeliveryDate(delivery);
    setPickupDate(pickup);
    setBillableDays(days);
    setIsDatesConfirmed(true);
  };

  // Vote handler
  const handleVote = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, booked_count: p.booked_count + 1 } : p
      )
    );
    alert("🎉 Thanks for voting! PlayStation Portal Remote Player is now at the top of our next Bangalore launch batch.");
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Subcategory filter
        if (activeSubcat !== 'all') {
          if (activeSubcat === 'gta-vi' && p.subcategory !== 'GTA VI') return false;
          if (activeSubcat === 'ps5' && p.subcategory !== 'PS5 Console') return false;
          if (activeSubcat === 'xbox' && p.subcategory !== 'Xbox Console') return false;
          if (activeSubcat === 'vr' && p.subcategory !== 'VR') return false;
          if (activeSubcat === 'racing-wheel' && p.subcategory !== 'Racing Wheel') return false;
          if (activeSubcat === 'big-screen' && p.subcategory !== 'Big Screen Gaming') return false;
        }

        // In Stock filter
        if (inStockOnly && p.out_of_stock) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTag = p.tag.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          return matchName || matchTag || matchSub;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') {
          if (a.tag === 'Trending' && b.tag !== 'Trending') return -1;
          if (b.tag === 'Trending' && a.tag !== 'Trending') return 1;
          return b.booked_count - a.booked_count;
        }
        if (sortBy === 'price-asc') return a.per_day_rent - b.per_day_rent;
        if (sortBy === 'price-desc') return b.per_day_rent - a.per_day_rent;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'booked') return b.booked_count - a.booked_count;
        return 0;
      });
  }, [products, activeSubcat, inStockOnly, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="sp-app">
      {/* 1. Header Navigation */}
      <Navbar
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        deliveryDate={deliveryDate}
        pickupDate={pickupDate}
        billableDays={billableDays}
        onOpenDateModal={() => setIsDateModalOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        currentUser={currentUser}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* 2. Upper Purple Section (Category Navigation & Hero Banner) */}
      <div className="sp-upper-purple-wrapper">
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
          }}
        />

        <HeroBanner />
      </div>

      {/* 3b. Moving Offer Banners Carousel (Desktop only) */}
      <div className="sp-hide-on-mobile">
        <OfferBannerCarousel
          onSelectSubcat={setActiveSubcat}
          onOpenDateModal={() => setIsDateModalOpen(true)}
        />
      </div>

      {/* 4. Top Earn with SharePal Credits Bar (Desktop only) */}
      <div className="sp-container sp-hide-on-mobile" style={{ marginBottom: '1.25rem' }}>
        <EarnCreditsBar />
      </div>

      {/* 5. Product Catalog with Sticky Subcategory Sidebar & Products Grid */}
      <main className="sp-container" id="sp-catalog-section">
        <div className="sp-catalog-layout">
          {/* Left Column: Sticky Subcategory Sidebar matching exact SharePal UI */}
          <StickySubcategorySidebar
            activeSubcat={activeSubcat}
            onSelectSubcat={setActiveSubcat}
          />

          {/* Right Column: Products Grid & Mid-page Banner */}
          <div className="sp-products-main-col">
            {/* Catalog Header Bar: Gaming Gadgets On Rent | 50 items */}
            <div className="sp-catalog-header-bar">
              <h2 className="sp-catalog-title">Gaming Gadgets On Rent</h2>
              <span className="sp-catalog-count">50 items</span>
            </div>
            <div className="sp-catalog-header-divider" />
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
                  No gaming consoles match your search
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
                  Try adjusting your filters or search keywords.
                </p>
                <button
                  type="button"
                  className="sp-btn-rent"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveSubcat('all');
                    setInStockOnly(false);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* First Row of Products (First 4 cards) */}
                <section className="sp-exact-product-grid" aria-label="Available Gaming Consoles">
                  {filteredProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      billableDays={billableDays}
                      isWishlisted={wishlist.includes(product.id)}
                      isInCart={cart.some((item) => item.id === product.id)}
                      onToggleWishlist={toggleWishlist}
                      onSelectProduct={setDetailProduct}
                      onAddToCart={addToCart}
                      onVote={handleVote}
                    />
                  ))}
                </section>

                {/* Wide Blue "Rent Out Your Gear on SharePal" Banner */}
                <div style={{ margin: '1.75rem 0' }}>
                  <RentOutGearBanner />
                </div>

                {/* Remaining Products */}
                {filteredProducts.length > 4 && (
                  <section className="sp-exact-product-grid" aria-label="More Gaming Consoles">
                    {filteredProducts.slice(4).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        billableDays={billableDays}
                        isWishlisted={wishlist.includes(product.id)}
                        isInCart={cart.some((item) => item.id === product.id)}
                        onToggleWishlist={toggleWishlist}
                        onSelectProduct={setDetailProduct}
                        onAddToCart={addToCart}
                        onVote={handleVote}
                      />
                    ))}
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Floating "Go to Cart" Lime Pill (Visible when items in cart, matching screenshot) */}
      {cart.length > 0 && (
        <div className="sp-floating-cart-wrapper">
          <button
            type="button"
            className="sp-floating-cart-pill"
            onClick={() => setIsCartOpen(true)}
            title="Open cart to view items and checkout"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <span>Go to Cart</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* 7. Stats Section (250Cr+ Saved, 4.5M Kg CO2, 100K+ Products) */}
      <StatsSection />

      {/* 8. Why Choose SharePal (Zero Deposit, Free Delivery, Tested) */}
      <WhyChooseSharePal />

      {/* 9. Reviews & Testimonials Marquee */}
      <TestimonialsMarquee />

      {/* 10. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 11. Category Directory Matrix */}
      <DirectoryLinks />

      {/* 12. Complete Footer */}
      <Footer />

      {/* 13. Floating Date Bar (Mobile & Desktop UX) */}
      <FloatingDateBar
        isDatesSelected={isDatesConfirmed}
        onOpenDateModal={() => setIsDateModalOpen(true)}
      />

      {/* 14. Sticky Animated Chat Support Button */}
      <WhatsAppFloat onOpenChatbot={() => setIsChatbotOpen(true)} />

      {/* 15. Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenCategories={() => {
          window.scrollTo({ top: 220, behavior: 'smooth' });
        }}
      />

      {/* Modals & Overlays */}
      <CityModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        deliveryDate={deliveryDate}
        pickupDate={pickupDate}
        onApplyDates={applyDates}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        billableDays={billableDays}
        onAddToCart={addToCart}
        onOpenDateModal={() => setIsDateModalOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeCartItem}
        onClearCart={clearCart}
        billableDays={billableDays}
        deliveryDate={deliveryDate}
        pickupDate={pickupDate}
        onOpenDateModal={() => setIsDateModalOpen(true)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(userObj) => setCurrentUser(userObj)}
        onLogout={() => setCurrentUser(null)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          setDetailProduct(p);
          setIsSearchModalOpen(false);
        }}
      />

      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />
    </div>
  );
}
