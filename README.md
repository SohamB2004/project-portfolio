# Shivera – Digital Design, Web Development, 3D & AI Studio

A full-stack, UI/UX portfolio website designed and developed for a freelance studio offering paid services in **UI/UX Design**, **Web Design & Development**, **WordPress Solutions**, and **Video Editing**.

Built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) with Tailwind CSS, Lucide icons, and responsive layouts that match the reference design mockup.

---

## 🌟 Live Local Links

- **Frontend Client (Vite + React)**: [http://localhost:5173](http://localhost:5173)
- **Backend API (Express + Node.js)**: [http://localhost:5000](http://localhost:5000)
- **Quick Launch Script**: Double-click `start-portfolio.bat` in the root folder.

---

## 🎨 Design & Visual Language (Matching Proposed Reference)

- **Color Scheme**: Deep dark aesthetic (`#0B0F17` / `#0D111D`), subtle glassmorphism cards (`#111827`), ambient blue radial glows, and electric blue accents (`#3B82F6` / `#2563EB`).
- **Typography**: Clean, geometric sans-serif pairing (`Plus Jakarta Sans` & `Inter`).
- **Button Styling**: Primary vibrant electric blue rounded pills with directional arrow (`↗`) and dark glass bordered secondary buttons.
- **Hero Mockup**: 3D-styled dark metallic laptop chassis displaying live project screens with subtle desk lighting reflection.
- **Credibility Metric Badges**: `20+ Projects Delivered`, `10+ Happy Clients`, `4.9/5 Client Rating`, and `100% On-Time Delivery`.

---

## 🚀 Showcased Work & Featured Projects

### 1. Real Video Editing Projects (Unlisted YouTube Embeds)
All videos are integrated with an in-app HD modal player (click the play button on any card):
- **Cinematic Travel & Expedition**: [https://youtu.be/SECEBeM_K_Y](https://youtu.be/SECEBeM_K_Y)
- **High-Tech Product Launch Promo**: [https://youtu.be/NvMTx8s_KAM](https://youtu.be/NvMTx8s_KAM)
- **Electrifying Festival & Event Aftermovie**: [https://youtu.be/NkZOuQMOtsM](https://youtu.be/NkZOuQMOtsM)
- **Dynamic Brand Story & Commercial Reel**: [https://youtu.be/pHoaD20R0PA](https://youtu.be/pHoaD20R0PA)
- **Story-Driven Visual Narrative**: [https://youtu.be/B79ehlHVFos](https://youtu.be/B79ehlHVFos)

### 2. Real Live Website Portfolio
Integrated with interactive case study modals and external links:
- **Floow2** ([https://floow2.com/](https://floow2.com/)) – B2B Circular asset-sharing marketplace.
- **The Marketing Concept** ([https://themarketingconcept.de/index.html](https://themarketingconcept.de/index.html)) – Strategic German digital marketing and branding portal.
- **Hiroki Digital** ([https://hiroki-digital.at/](https://hiroki-digital.at/)) – Austrian performance tech & marketing agency with custom high-speed WordPress build.
- **Roger Federer Foundation** ([https://federerfoundation.org/](https://federerfoundation.org/)) – Global philanthropic foundation portal empowering educational programs.

### 3. Proposed Reference Showcases
- **Trekore – Himalayan Adventure Platform**: Interactive multi-device mockup with green checklist highlights.
- **Modern Living Redefined**: Luxury real estate architectural portal.
- **Pure Skincare Botanicals**: Organic cosmetics e-commerce storefront.
- **Café Aran**: Sensory boutique roastery digital experience.

---

## 🛠️ Tech Stack & Architecture

### Frontend (`client/`)
- **React 18** + **Vite 5** (Fast Refresh, sub-second HMR)
- **Tailwind CSS 3** with custom theme tokens & glowing shadows
- **Lucide React** icon library
- **Custom Modals**:
  - `VideoModal.jsx`: Seamless YouTube iframe player with tags and highlights
  - `ProjectModal.jsx`: Full case study drawer with live link buttons
  - `QuoteCalculatorModal.jsx`: Interactive real-time budget & turnaround estimator

### Backend (`server/`)
- **Node.js** + **Express.js** REST API
- **Mongoose / MongoDB** integration with automatic graceful file/memory fallback if MongoDB is not running locally.
- **Endpoints**:
  - `GET /api/projects`: Fetch portfolio items (supports `?category=Websites` filtering)
  - `GET /api/projects/:id`: Get specific project details
  - `GET /api/services`: Get service packages and turnaround times
  - `POST /api/contact`: Receive and validate contact inquiries
  - `POST /api/quote`: Interactive cost calculator & quote proposal dispatch
  - `GET /api/inquiries`: View all client inquiries submitted via the site
  - `GET /api/health`: Health check

---

## 📂 Project Structure

```
portfolio/
├── client/                     # Frontend Vite + React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Sticky glass navbar with mobile drawer
│   │   │   ├── Hero.jsx                # Headline, CTAs, 3D laptop, stats strip
│   │   │   ├── ServicesSection.jsx     # 4 Core services with blue circular icons
│   │   │   ├── PortfolioSection.jsx    # Filter tabs & grid with video play triggers
│   │   │   ├── ProjectDetailShowcase.jsx # Slider & highlights checklist
│   │   │   ├── AboutSection.jsx        # Story of uncle & nephew freelance studio
│   │   │   ├── ContactSection.jsx      # Form + direct contact + mountain art
│   │   │   ├── Footer.jsx              # Dark footer with navigation & copyright
│   │   │   ├── VideoModal.jsx          # YouTube video player modal
│   │   │   ├── ProjectModal.jsx        # Case study & live site modal
│   │   │   └── QuoteCalculatorModal.jsx# Instant price & timeline calculator
│   │   ├── data/
│   │   │   └── portfolioData.js        # Fallback datasets
│   │   ├── App.jsx                     # Root application container
│   │   ├── index.css                   # Tailwind styles, glows, scrollbars
│   │   └── main.jsx                    # React DOM entry
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend Express API
│   ├── src/
│   │   ├── data/
│   │   │   ├── projectsData.js         # Comprehensive project seed data
│   │   │   └── servicesData.js         # Service packages and agency meta
│   │   ├── models/
│   │   │   ├── Inquiry.js              # Inquiry schema with resilient fallback
│   │   │   └── Project.js              # Project schema and querying helpers
│   │   ├── routes/
│   │   │   └── api.js                  # Express REST routes
│   │   └── index.js                    # Server startup & MongoDB connection
│   ├── .env
│   └── package.json
├── package.json                # Root scripts
├── start-portfolio.bat         # 1-Click launcher for Windows
└── README.md
```

---

## 🏃 Running the Application

### Option A: Double-Click
Double-click `start-portfolio.bat` in Windows. It starts the backend and frontend simultaneously and launches the browser to [http://localhost:5173](http://localhost:5173).

### Option B: Terminal Commands
To run individual services manually:

```powershell
# 1. Start Backend Server (Port 5000)
cd server
node src/index.js

# 2. In another terminal, start Frontend Client (Port 5173)
cd client
npm run dev
```

