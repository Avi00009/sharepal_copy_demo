# SharePal — Gaming Gadgets on Rent (Bangalore) 🎮

A high-fidelity, pixel-perfect recreation and enhancement of the official **[SharePal Gaming Gadgets Rental Page](https://sharepal.in/bangalore/gaming-gadgets-on-rent)**.

Built end-to-end adhering closely to SharePal's design system, typography (Ubuntu & Inter), brand colors (`#4C187C`, `#8A2BE2`, `#9EFF00`), micro-animations, and interactive rental workflows.

---

## 🌟 Live Demo & Preview

- **Local URL:** `http://localhost:3000/`
- **Build Status:** Production bundle built and verified (`dist/`)
- **Ready for Instant 1-Click Deployment:** Vercel, Netlify, or GitHub Pages.

---

## ✨ Features & Architecture

### 1. Header & Navigation
- **Authentic SharePal SVG Logo:** Custom vector reproduction featuring the signature white "Share" and neon lime `#9EFF00` "Pal".
- **City Selector Modal:** Switch between major supported cities (*Bangalore*, *Mumbai*, *Delhi NCR*, *Hyderabad*, *Pune*, *Chennai*, *Kolkata*).
- **Rental Date Selector Trigger:** Displays chosen delivery & pickup dates and billable rental days, or prompts to select dates.
- **Header Actions:** Quick Search, Cart trigger with live item count badge, and User Login indicator.
- **Responsive Layout:** Tailored dual-row mobile header with touch-friendly date selector.

### 2. Category Navigation & Hero Banner
- **Primary Category Switcher:** Photography, **Gaming** (with purple active indicator), Outdoor, and Entertainment.
- **Hero Banner:** Linear gradient (`#8A2BE2` to `#4C187C`), subtle background console graphics, and trust badges:
  - *Zero Security Deposit*
  - *Free Doorstep Delivery*
  - *100+ Games Included*
  - *100% Sanitized & Tested*

### 3. Subcategories & Filtering
- **Subcategory Filter Pills:**
  - `All`
  - `GTA VI`
  - `PS5 Console`
  - `Xbox Console`
  - `VR`
  - `Racing Wheel`
  - `Big Screen Gaming`
- **Instant Search:** Real-time search by product title, game name, or bundle type.
- **In-Stock Toggle:** Filter out currently unavailable items.
- **Sorting:** By *Trending First*, *Price: Low to High*, *Price: High to Low*, *Top Rated*, and *Most Booked*.

### 4. Product Catalog (from `product-list.json`)
- Displays all **23 console and game packages** directly loaded from `product-list.json`.
- **Badges:** Dynamic tags for *Trending*, *New Release*, and *Vote to Launch*.
- **Interactive Voting:** The *PlayStation Portal Remote Player* includes an active "Vote to Launch" button with real-time vote counter increment and confetti!
- **Dynamic Pricing Calculator:** Prices adjust automatically based on selected rental duration (e.g. 2 days, 4 days with 15% discount, 7 days with 35% discount).
- **Wishlist Toggle:** Save items to wishlist (persisted via `localStorage`).

### 5. Detailed Product Modal
- Inspect any console package to view:
  - High-resolution console photography
  - Item ID and subcategory
  - Included items checklist (*DualSense controllers*, *HDMI 2.1 cable*, *Power cord*, *USB-C cable*, *100+ pre-installed games*)
  - Pricing calculation for the selected rental duration
  - Direct "Add to Cart & Reserve" action

### 6. Interactive Cart & Checkout Simulator
- Slide-over cart drawer with:
  - Quantity controls (`+` / `-` / `remove`)
  - Clear billing summary: Rental total, **₹0 Security Deposit**, **Free Delivery & Pickup**
  - **Checkout Flow:** Fill in delivery address in Bangalore, select payment mode (*Pay on Delivery* or *UPI*), and confirm order with celebratory confetti and unique Order ID (`SP-XXXXXX`).

### 7. Impact Statistics & Value Propositions
- **Key Impact Metrics:**
  - `250Cr+`: *Saved Together*
  - `4.5M Kg`: *CO₂e Emissions Saved*
  - `100K+`: *Products in Circulation*
- **Why Choose SharePal:** Zero Deposit, Free Doorstep Delivery & Pickup, 100% Quality Tested & Sanitized, Pay on Delivery.

### 8. Authentic Customer Testimonials Marquee
- Recreates SharePal's auto-scrolling customer review marquee featuring verified customer testimonials from Bangalore, Mumbai, Kolkata, and Delhi with 5-star ratings and Google Review badge (`4.8 / 5` from 5,000+ reviews).

### 9. Interactive FAQ Accordion
- 9 FAQs including SharePal's transparent rental calculation policy, KYC verification explanation, hygiene standards, and console game libraries.
- Category filters (*How it works?*, *Quality & Hygiene*, *Verification/KYC*) and expand/collapse toggle.

### 10. Footer & Floating Actions
- Complete SharePal multi-column footer with quick links, policies, and a smooth "Go up" back-to-top button.
- Floating bottom bar: "Select rental dates to view prices".
- Sticky WhatsApp support chat button with pre-filled message.
- Mobile bottom navigation bar (*Home*, *Category*, *Search*, *Cart*).

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Custom Vanilla CSS Design System with CSS Custom Properties, smooth transitions, glassmorphism, and responsive breakpoints
- **Icons:** Lucide React + Authentic SharePal SVGs
- **Delight:** Canvas Confetti for celebratory micro-interactions
- **Data Source:** `product-list.json`

---

## 🚀 How to Run Locally

1. Clone or extract the repository:
   ```bash
   git clone <your-repo-url>
   cd sharepal-gaming-rental
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000/`.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel in 1-Minute

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SharePal Gaming Rental recreation"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sharepal-gaming-rental.git
   git push -u origin main
   ```

2. Go to **[vercel.com](https://vercel.com)** &rarr; **Add New Project** &rarr; Select your GitHub repository.
3. Click **Deploy**. Vercel will automatically detect Vite and publish the live URL!
