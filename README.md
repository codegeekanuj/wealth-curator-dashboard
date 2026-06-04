# Personal Finance Dashboard (Wealth Curator)

This repository contains the client-side implementation of the Personal Finance Dashboard built for the Bright Money Frontend Intern assignment. The project implements the two visual layout designs requested ("Proton Finance" and "Editorial Finance") across both light and dark themes.

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (v9 or higher)

### Setup Instructions
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the printed local port) to preview the app.

3. Compile the production bundle:
   ```bash
   npm run build
   ```
   This generates the optimized static build assets inside the `dist/` directory.

---

## Assignment Requirements Checklist

Here is a map of the assignment criteria to their specific implementations in the codebase:

### 1. UI Implementation
* **Component-Based Layouts**: The UI is split into reusable layouts under `src/components/`:
  * [Sidebar.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/components/Sidebar.jsx): Brand-adaptive collapsible side panel.
  * [Header.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/components/Header.jsx): Toolbar containing search inputs, notifications, settings, and layout toggles.
  * [BottomNav.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/components/BottomNav.jsx): Persistent navigation bar showing mobile-specific labels based on the selected brand.
* **Layout Sections**:
  * **Summary Cards**: Net Worth, Spending, and Savings stats with visual sparklines built using Recharts area curves ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L182-L270)).
  * **AI Strategy / Insights**: Dynamic portfolio alerts and cash flow suggestions ([Insights.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Insights.jsx)).
  * **Alerts List**: Actionable warning panels displaying subscription spikes and emergency fund thresholds ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L295-L330)).
  * **Activity List**: Sortable transaction table showing category tags, status badges, filters, search, and mock CSV downloads ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L368-L485)).
  * **Spending Composition**: Custom progress bars representing allocation percentages ([Dashboard.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Dashboard.jsx#L332-L364)).

### 2. Custom Hooks
All hooks reside in the `src/hooks/` directory:
* [useLocalStorage.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useLocalStorage.js): Syncs layout configurations (theme, brand type, side-menu collapse) with browser storage.
* [useFetch.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useFetch.js): Simulates API requests with latency, error handlers, and empty list overrides.
* [useAnalytics.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useAnalytics.js): Logs events to the developer console and pushes parameters to the `window.dataLayer` for GA4/GTM.
* [useDebounce.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/hooks/useDebounce.js): Throttles rapid user inputs in search filters to optimize render pipelines.

### 3. Data Handling & UI Auditing
* **Mock Database** ([mockData.js](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/data/mockData.js)): Centralized mock store representing metrics, alerts, transactions, and portfolio velocity history.
* **Audit Control Panel**: A dash-bordered toolbar (**🔍 ASSIGNMENT AUDIT BAR**) is added at the top of the main Dashboard page. It lets the reviewer instantly simulate and test:
  * **Loading state**: Triggers a 2-second delay with a loading spinner overlay.
  * **Error boundary**: Triggers a simulated request failure displaying a mock API connection error card.
  * **Empty state**: Clears the transaction table, rendering a generic "No transactions match your filters" banner.

### 4. Event Tracking (GA4)
Integrated via `useAnalytics` to capture the following:
* **Page views**: Triggers a `page_view` dispatch on tab change.
* **Search usage**: Logs `search_query` keywords.
* **Filter clicks**: Captures transaction filter tab changes and sidebar selections.
* **CTA clicks**: Captures clicks on buttons like "Execute Strategy" and "Apply Strategy".

### 5. Performance Optimizations
* **Code Splitting**: Dynamic pages (`Dashboard`, `Markets`, `Budgets`, `Insights`) are lazy-loaded via `React.lazy()` and rendered under a `<Suspense>` boundary in [App.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/App.jsx#L8-L13).
* **Memoized Computations**: Heavy operations, such as sorting and filtering transactions, are memoized using `useMemo` hooks.

### 6. SEO & Accessibility
* **Semantic Outlines**: Markup leverages HTML5 landmarks (`<aside>`, `<header>`, `<main>`, `<nav>`, `<footer>`) instead of generic divisions.
* **Dynamic Titles**: Page titles dynamically update (`document.title`) on route change.
* **OG Metadata**: Static Open Graph headers and meta description parameters are declared in [index.html](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/index.html).
* **Accessibility**: Buttons utilize `aria-label` descriptors and maintain focus outline layouts for keyboard-only users.

### 7. Bonus Criteria
* **Dark Mode**: Fully supports Light and Dark themes via HSL root CSS variables in [index.css](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/index.css#L84-L134).
* **Chart Integration**: Implemented area charts and sparklines using Recharts ([Markets.jsx](file:///Users/anujtripathi/Desktop/BRIGHT%20MONEY%20/src/pages/Markets.jsx#L150-L203)).
* **Design Token System**: Strict styling tokens declared in `src/index.css` for HSL values, paddings, border-radii, and animations.

---

## Architecture & Technical Decisions

### 1. Brand Layout Toggling
To address the two design brands presented in the assignment PDF (Proton Finance vs. Editorial Finance), we built a theme-toggling system controlled by active document classes. Clicking the brand selector in the header switches layout styling variables, menu titles, and grid distributions dynamically. This avoids codebase duplication.

### 2. Styling Strategy
Instead of using utility-class frameworks like Tailwind, we opted for Vanilla CSS utilizing central HSL variables in `src/index.css`. This simplifies color and token transitions across the active brands and themes while maintaining zero compilation overhead.

### 3. Single-Page Routing
Navigation is managed via local state in the app wrapper. Page components are deferred using lazy loading to ensure the entry script chunk remains compact.

### 4. Technical Trade-offs
* **Vite React Client vs. Next.js SSR**: We selected client-side React with Vite. While Next.js provides native server-side rendering for superior SEO indexing, Vite provides a simpler setup, lighter bundle footprint, and can run locally without needing a server container.
* **Client Simulation vs. Live Server API**: Data is fetched locally from static mock models. This ensures the app compiles and runs instantly for reviewers without requiring database server setup, while still validating the custom async hooks.
