'use client';

import { useEffect } from 'react';

// Import v2 styles - this should be in layout, not page
import '../globals-v2.css';

/**
 * V2 Demo Layout
 * Completely isolates the v2 demo from the main app layout
 * Hides DesktopNav and Footer using direct DOM manipulation for reliability
 */
export default function V2DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use effect to hide desktop nav and footer on mount
  useEffect(() => {
    // Hide desktop nav
    const desktopNav = document.querySelector('[data-desktop-nav]') as HTMLElement;
    if (desktopNav) {
      desktopNav.style.display = 'none';
    }

    // Hide footer
    const footer = document.querySelector('[data-footer]') as HTMLElement;
    if (footer) {
      footer.style.display = 'none';
    }

    // Cleanup: restore on unmount
    return () => {
      if (desktopNav) {
        desktopNav.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return (
    <div className="v2-demo-layout">
      {children}
    </div>
  );
}
