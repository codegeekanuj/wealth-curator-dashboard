# Personal Finance - Wealth Curator Dashboard

A production-quality, responsive, and high-fidelity **Personal Finance Dashboard** ("Wealth Curator") implementing both **Proton Finance** and **Editorial Finance** branding modules. Built using **Vite + React** and **Vanilla CSS Design Variables**, satisfying all core internship assignment requirements.

---

## 📋 Core Requirements Checklist & Implementation Map

This map outlines how each rubric item in the **Frontend Intern Assignment PDF** has been implemented in the codebase:

### 1. UI Implementation (High Priority)
* **Pixel-Accurate Screens**: Implemented the layouts shown in the designs (Proton and Editorial brands, light and dark themes) with consistent typography and shadows.
* **Components System**: Modular design split into reusable chunks:
  * [Sidebar.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/components/Sidebar.jsx): Brand-adaptive collapsible side panel.
  * [Header.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/components/Header.jsx): Toolbar with profile actions, search filters, brand and theme togglers.
  * [BottomNav.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/components/BottomNav.jsx): Persistent navigation bar showing mobile-specific labels based on brand.
* **Key Sections**:
  * **Summary cards**: High-fidelity Net Worth, Spending, and Savings stats showing trendlines and mini Recharts sparkline visualizers ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L182-L270)).
  * **AI Insights**: Simulated rebalancing recommendations and Cash Flow suggestions ([Insights.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Insights.jsx)).
  * **Alerts**: Warning and warning lists with semantic color pills ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L295-L330)).
  * **Transactions**: Sortable activity lists with paginated queries and CSV export triggers ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L368-L485)).
  * **Spending Breakdown**: Horizontal percentage progress allocations mapping category distributions ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L332-L364)).

### 2. Custom Hooks (Mandatory)
* **`useFetch`** ([useFetch.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useFetch.js)): Handles standard remote connection latency, return objects, error boundaries, and empty list overrides.
* **`useAnalytics`** ([useAnalytics.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useAnalytics.js)): Formats event payloads and pushes them to `window.dataLayer` for GA4 / Tag Manager auditing.
* **`useDebounce`** ([useDebounce.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useDebounce.js)): Limits user keystrokes in search textfields to prevent rapid consecutive rendering cascades.
* **`useLocalStorage`** ([useLocalStorage.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useLocalStorage.js)): Manages persistence for theme configurations, brand layouts, and navigation states.

### 3. Data Handling (Simulation Auditing)
* **Mock Database**: Structured mocks for metrics, transactions, allocations, alerts, and market sentiment indexes ([mockData.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/data/mockData.js)).
* **Audit Panel**: Included a dashboard toolbar (**🔍 ASSIGNMENT AUDIT BAR**) enabling testers to dynamically toggle:
  * **Simulated Loading State** (triggers 2-second mock API latency and loader spinner).
  * **Simulated Error State** (renders user-friendly network connection error card).
  * **Simulated Empty State** (renders responsive empty data state view).

### 4. Google Analytics / Tagging (GA4)
* **Action Tracking**: Integrated tracking inside `useAnalytics` to capture:
  * **Page loads**: Dispatches `page_view` on tab change.
  * **Search usage**: Logs `search_query` search keywords.
  * **Filter clicks**: Captures category button clicks and sidebar navigations.
  * **CTA clicks**: Captures "Execute Strategy" and "Apply Strategy" clicks.

### 5. Performance Optimization
* **Lazy Loading & Suspense**: Page components are deferred using `React.lazy()` and rendered inside a fallback `<Suspense>` wrapper in [App.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/App.jsx#L8-L13).
* **Memoization**: Transactions lists and category filters are computed through `useMemo` hooks.
* **Inline Optimization**: Inline handlers are memoized or bound to optimize rendering thread workloads.

### 6. SEO & Accessibility (Web)
* **Semantic HTML**: Structural nodes use proper HTML5 landmarks (`<aside>`, `<header>`, `<main>`, `<nav>`, `<footer>`).
* **Meta & OG Tags**: Configured `index.html` with title elements, description parameters, and Open Graph metrics for rich link sharing previews.
* **Accessibility Controls**: Buttons and forms feature descriptive `aria-label` decorations and maintain visible outline indicators for keyboard navigators.

### 7. AI Insights Simulated Logic
* **Curated Suggestions**: Renders rebalancing signals, surplus allocation tips, overlap streaming audits, and tax-loss harvesting suggestions ([Insights.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Insights.jsx)).

### 8. Bonus Features
* **Dark Mode**: Fully supports Light and Dark modes utilizing central design variables in [index.css](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/index.css#L84-L134).
* **Chart Integration**: Implemented area charts and sparklines using Recharts ([Markets.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Markets.jsx#L150-L203)).
* **Design System**: Strict design tokens for typography, HSL colors, border-radii, spacing, and transition speeds.

---

## 🏛️ Architecture Decisions

### 1. Unified Brand & Theme Switching Shell
Instead of building separate apps for the two branding designs shown in the assignment (Proton vs. Editorial), we built a unified state shell in `src/App.jsx`. By injecting CSS classes (`.brand-proton`, `.brand-editorial`, and `.dark`) dynamically on the document root, we decouple structural components from visual styles. This allows the assessor to test both brand layouts and dark/light modes on the fly.

### 2. Decoupled Mock Data & Service Layer
All metrics, budgets, alerts, and transactional feeds are centralized in `src/data/mockData.js`. The components do not access this data directly; instead, they retrieve it through a simulated data fetching hook to mimic standard REST API client behaviors.

---

## ⚡ Performance Optimizations

* **Code Splitting & Lazy Loading**: All feature pages (`Dashboard`, `Markets`, `Budgets`, `Insights`) are loaded dynamically using `React.lazy()` and rendered within a `<Suspense>` boundary. This ensures the initial entry script remains compact and page resources compile only on-demand.
* **Memoized Filtering**: Transactional filtering and calculations are wrapped in `useMemo` hooks. Search queries are debounced to ensure layout reflows execute only when typing stops.
* **Pure CSS Stylesheets**: Building design tokens directly inside a single Vanilla CSS stylesheet (`src/index.css`) avoids the parsing, compilation, and runtime performance penalties associated with CSS-in-JS libraries or bloated framework loaders.

---

## ⚖️ Trade-offs

### 1. Client-Side SPA vs. Next.js SSR
* **Decision**: We chose Vite Client-Side React.
* **Trade-off**: Next.js (Server-Side Rendering) is superior for out-of-the-box SEO indexing. However, for a mock fintech dashboard dashboard, Vite compiles significantly faster, runs locally without a Node server environment, and offers a lighter runtime foot-print. We mitigated the SPA indexing penalty by utilizing static HTML descriptions, Open Graph layouts, and dynamic DOM title adjustments.

### 2. Client-Side Simulation vs. Full Backend Node API
* **Decision**: Simulated REST layer (`useFetch` + static JSON).
* **Trade-off**: Building a backend Node API adds configuration complexity and local database setup requirements for the reviewer. By simulating latency, errors, and empty states directly in `useFetch`, the dashboard behaves identically to an API-driven app while remaining instantly runnable with standard dependencies.
