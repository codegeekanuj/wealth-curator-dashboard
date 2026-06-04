# Personal Finance - Wealth Curator Dashboard

A production-quality, responsive, and high-fidelity **Personal Finance Dashboard** ("Wealth Curator") implementing both **Proton Finance** and **Editorial Finance** branding modules. Built using **Vite + React** and **Vanilla CSS Design Variables**, satisfying all core internship assignment requirements.

---

## 🏛️ Architecture Decisions

### 1. Unified Brand & Theme Switching Shell
Instead of building separate apps for the two branding designs shown in the assignment (Proton vs. Editorial), we built a unified state shell in `src/App.jsx`. By injecting CSS classes (`.brand-proton`, `.brand-editorial`, and `.dark`) dynamically on the document root, we decouple structural components from visual styles. This allows the assessor to test both brand layouts and dark/light modes on the fly.

### 2. Decoupled Mock Data & Service Layer
All metrics, budgets, alerts, and transactional feeds are centralized in `src/data/mockData.js`. The components do not access this data directly; instead, they retrieve it through a simulated data fetching hook to mimic standard REST API client behaviors.

### 3. Component-Based Architecture
Layout files are separated logically:
* **Shell Layouts**: `Sidebar.jsx`, `Header.jsx`, `BottomNav.jsx`.
* **Feature Pages**: `Dashboard.jsx`, `Markets.jsx`, `Budgets.jsx`, `Insights.jsx`, `PlaceholderPage.jsx`.
* **State Management**: Persisted locally in the browser to keep settings synchronized across browser page refreshes.

---

## 🪝 Custom Hooks Explanation

* **`useFetch`**: Simulates REST client request latency, return states, and loading overlays. It supports configurations for simulated delays, network errors, and empty datasets. This allows developer auditing of UI boundaries (loading indicators, error alerts, empty filters).
* **`useAnalytics`**: Implements event tracking. It outputs detailed tracking payloads (containing timestamps, event names, and context parameters) to the developer console and pushes them to `window.dataLayer` for GA4 / Google Tag Manager compatibility.
* **`useDebounce`**: Throttles user keystrokes in search filters to prevent rapid, consecutive component re-renders.
* **`useLocalStorage`**: Custom state hook that automatically reads and synchronizes user preferences (theme, brand type, side-menu collapse) with the browser storage.

---

## ⚡ Performance Optimizations

* **Code Splitting & Lazy Loading**: All feature pages (`Dashboard`, `Markets`, `Budgets`, `Insights`) are loaded dynamically using `React.lazy()` and rendered within a `<Suspense>` boundary. This ensures the initial entry script remains compact and page resources compile only on-demand.
* **Memoized Filtering**: Transactional filtering and calculations are wrapped in `useMemo` hooks. Search queries are debounced to ensure layout reflows execute only when typing stops.
* **Pure CSS Stylesheets**: Building design tokens directly inside a single Vanilla CSS stylesheet (`src/index.css`) avoids the parsing, compilation, and runtime performance penalties associated with CSS-in-JS libraries or bloated framework loaders.

---

## 🔍 SEO & Accessibility (Web)

* **Semantic Outlines**: Markup uses correct HTML5 tags (`<aside>`, `<header>`, `<main>`, `<nav>`, `<footer>`) to construct structured pages for search engine indexing and screen readers.
* **Dynamic SEO Headers**: The page title modifies dynamically in React (`useEffect`) to reflect the current page tab and brand active (*e.g., "Market Intelligence | Editorial Finance - Premium Wealth Curator"*).
* **Metadata & Rich Previews**: Injected custom meta description and Open Graph tags (`og:title`, `og:description`, `og:image`) inside `index.html` to generate polished link previews on social platforms.
* **ARIA Parameters**: Custom buttons, toggle triggers, and structural wrappers are decorated with interactive `aria-label` elements to support screen reader layouts and keyboard-only navigation.

---

## ⚖️ Trade-offs

### 1. Client-Side SPA vs. Next.js SSR
* **Decision**: We chose Vite Client-Side React.
* **Trade-off**: Next.js (Server-Side Rendering) is superior for out-of-the-box SEO indexing. However, for a mock fintech dashboard dashboard, Vite compiles significantly faster, runs locally without a Node server environment, and offers a lighter runtime foot-print. We mitigated the SPA indexing penalty by utilizing static HTML descriptions, Open Graph layouts, and dynamic DOM title adjustments.

### 2. Client-Side Simulation vs. Full Backend Node API
* **Decision**: Simulated REST layer (`useFetch` + static JSON).
* **Trade-off**: Building a backend Node API adds configuration complexity and local database setup requirements for the reviewer. By simulating latency, errors, and empty states directly in `useFetch`, the dashboard behaves identically to an API-driven app while remaining instantly runnable with standard dependencies.

### 3. Vanilla CSS variables vs. Tailwind CSS
* **Decision**: Pure Vanilla CSS.
* **Trade-off**: Tailwind speeds up development for basic grids. However, since the assignment demanded custom, high-fidelity brand switching (Proton vs. Editorial), writing raw CSS classes mapped to HSL color variables in a single root stylesheet provides absolute design flexibility and reduces project dependencies.
