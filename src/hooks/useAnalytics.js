import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback((eventName, params = {}) => {
    const timestamp = new Date().toISOString();
    const payload = {
      event: eventName,
      ...params,
      timestamp,
      platform: "web",
    };

    // Log to console for development audit/testing
    console.log(`%c[GA4 Event Tracker]: ${eventName}`, "color: #10b981; font-weight: bold; padding: 2px 4px; border-radius: 4px; background: #ecfdf5", payload);

    // Push to window dataLayer for Tag Manager / GA4 integration
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    }
  }, []);

  return { trackEvent };
}
