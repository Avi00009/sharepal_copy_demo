import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
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
import OfferBannerCarousel from './components/OfferBannerCarousel';
import SharePalHomeHero from './components/SharePalHomeHero';
import StickySubcategorySidebar from './components/StickySubcategorySidebar';
import { productsData } from './data/products';

export default function App() {
  // Products state (allows incrementing votes)
  const [products, setProducts] = useState(productsData);

  // Location & Dates
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  // Initial dates: tomorrow & +3 days (2 billable days)
  const getInitialDates = () => {
    const today = new Date();
    const dDeliv = new Date(today.getTime() + 86400000);
    const dPick = new Date(dDeliv.getTime() + 3 * 86400000);
    return {
      delivery: dDeliv.toISOString().split('T')[0],
      pickup: dPick.toISOString().split('T')[0],
      days: 2
    };
  };

  const initialDates = getInitialDates();
  const [deliveryDate, setDeliveryDate] = useState(initialDates.delivery);
  const [pickupDate, setPickupDate] = useState(initialDates.pickup);
  const [billableDays, setBillableDays] = useState(initialDates.days);
  const [isDatesConfirmed, setIsDatesConfirmed] = useState(true);

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
  const [detailProduct, setDetailProduct] = useState(null);

  // User Authentication
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sp_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
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
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
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
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
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
        onOpenSearch={() => {
          window.scrollTo({ top: 380, behavior: 'smooth' });
          document.querySelector('.sp-search-input')?.focus();
        }}
        currentUser={currentUser}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* 2. Top Category Switcher with Floating Glide Animation */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
        }}
      />

      {/* 2b. SharePal Homepage Hero with 3D Floating Gears & 4 Category Cards */}
      <SharePalHomeHero
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
        }}
      />

      {/* 3. Gaming Consoles Hero Banner */}
      <HeroBanner selectedCity={selectedCity} />

      {/* 3b. Moving Offer Banners Carousel */}
      <OfferBannerCarousel
        onSelectSubcat={setActiveSubcat}
        onOpenDateModal={() => setIsDateModalOpen(true)}
      />

      {/* 4. Subcategory Pills */}
      <SubcategoryTabs
        activeSubcat={activeSubcat}
        onSelectSubcat={setActiveSubcat}
      />

      {/* 5. Search, Filter, Sort Toolbar */}
      <SearchAndFilterBar
        selectedCity={selectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        inStockOnly={inStockOnly}
        onToggleInStock={() => setInStockOnly(!inStockOnly)}
        totalItems={products.length}
        filteredCount={filteredProducts.length}
      />

      {/* 6. Product Catalog with Sticky Subcategory Sidebar */}
      <main className="sp-container" id="sp-catalog-section">
        <div className="sp-catalog-layout">
          {/* Left Column: Sticky Subcategory Sidebar matching exact SharePal UI */}
          <StickySubcategorySidebar
            activeSubcat={activeSubcat}
            onSelectSubcat={setActiveSubcat}
          />

          {/* Right Column: Products Grid */}
          <div className="sp-products-main-col">
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
              <section className="sp-product-grid" aria-label="Available Gaming Consoles">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    billableDays={billableDays}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={toggleWishlist}
                    onSelectProduct={setDetailProduct}
                    onAddToCart={addToCart}
                    onVote={handleVote}
                  />
                ))}
              </section>
            )}
          </div>
        </div>
      </main>

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

      {/* 14. Sticky WhatsApp Support Button */}
      <WhatsAppFloat />

      {/* 15. Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => {
          window.scrollTo({ top: 380, behavior: 'smooth' });
          document.querySelector('.sp-search-input')?.focus();
        }}
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
    </div>
  );
}
