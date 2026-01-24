'use client';

import { useEffect } from 'react';

// Note: v2 styles are now in the main layout

/**
 * V2 Layout
 *
 * Layout per le route v2 che usano il nuovo design system.
 * Include il CSS v2 e nasconde nav/footer v1.
 */
export default function V2Layout({ children }: { children: React.ReactNode }) {
  // Hide desktop nav and footer from v1 layout
  useEffect(() => {
    const desktopNav = document.querySelector('[data-desktop-nav]') as HTMLElement;
    if (desktopNav) {
      desktopNav.style.display = 'none';
    }

    const footer = document.querySelector('[data-footer]') as HTMLElement;
    if (footer) {
      footer.style.display = 'none';
    }

    return () => {
      if (desktopNav) {
        desktopNav.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return <div className="v2-layout">{children}</div>;
}
