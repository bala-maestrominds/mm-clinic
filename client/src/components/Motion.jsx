// src/components/Motion.jsx
//
// Small, dependency-free animation helpers shared across the app:
//  - <Reveal> fades/slides an element in once it scrolls into view.
//  - <PageTransition> fades a whole page in on mount/route change.
// Both use CSS animations (GPU-friendly) instead of JS-driven style
// updates, and respect prefers-reduced-motion automatically via CSS.

import { memo, useEffect, useRef, useState } from 'react';

/**
 * Reveal
 * Wrap any block of content to have it fade/slide up the first time it
 * enters the viewport. Uses a single shared IntersectionObserver pattern
 * per-instance (cheap - only observes while not yet visible).
 *
 * Props:
 *  - as: element type to render (default 'div')
 *  - delay: optional ms delay before the animation starts
 *  - className: extra classes merged onto the wrapper
 */
export const Reveal = memo(function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
});

/**
 * PageTransition
 * Wrap a page's top-level element to fade/slide the page in on mount.
 * Cheap CSS-only animation, re-triggers naturally on route change since
 * each page is a fresh component instance.
 */
export const PageTransition = memo(function PageTransition({ children, className = '' }) {
  return <div className={`page-transition ${className}`}>{children}</div>;
});
