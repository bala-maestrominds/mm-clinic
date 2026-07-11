// src/components/SharedComponents.jsx
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link, NavLink } from 'react-router-dom';

// ============================================
// 1. ICON COMPONENT
// ============================================
export const Icon = memo(({ name, className = '', fill = false }) => (
  <span 
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
  >
    {name}
  </span>
));

// ============================================
// 2. GLASS CARD COMPONENTS
// ============================================
export const GlassCard = memo(({ children, className = '' }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-primary/5 rounded-lg shadow-[0px_10px_30px_rgba(15,118,110,0.1)] ${className}`}>
    {children}
  </div>
));

export const GlassCardLight = memo(({ children, className = '' }) => (
  <div className={`bg-white/80 backdrop-blur-2xl border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-2xl ${className}`}>
    {children}
  </div>
));

// ============================================
// 3. UNIFIED NAVIGATION BAR
// ============================================
export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Monitor scroll height to change background styling.
  // Throttled with requestAnimationFrame so we update state at most once
  // per frame instead of on every single scroll event (big perf win on
  // trackpads/momentum scrolling which can fire dozens of events/frame).
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Unified link class function supporting desktop and mobile states.
  // Wrapped in useCallback so NavLink doesn't get a brand-new className
  // function identity on every render.
  const navLinkClass = useCallback(({ isActive }) =>
    `text-base md:text-sm lg:text-base font-medium transition-colors duration-200 block py-3 md:py-0 ${
      isActive
        ? "text-primary border-l-4 border-primary pl-3 md:border-l-0 md:border-b-2 md:pl-0 md:pb-1"
        : "text-on-surface-variant hover:text-primary pl-3 md:pl-0"
    }`, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled || isOpen ? "bg-white/95 shadow-md" : "bg-surface/80 shadow-sm"
      }`}
    >
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 z-50" onClick={closeMenu}>
          <Icon name="dentistry" className="text-primary text-3xl" />
          <span className="text-lg md:text-xl font-bold text-primary">
            PureDent Clinic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/doctors" className={navLinkClass}>Doctors</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          
          <Link
            to="/book"
            onClick={closeMenu}
            className="hidden sm:inline-block md:inline-block lg:inline-block px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-primary-container transition-all active:scale-95"
          >
            Book Appointment
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="p-2 md:hidden text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl block">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Slide-Down Overlay */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-outline-variant/10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-4 space-y-1 flex flex-col">
          <NavLink to="/" className={navLinkClass} end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>About</NavLink>
          <NavLink to="/services" className={navLinkClass} onClick={closeMenu}>Services</NavLink>
          <NavLink to="/doctors" className={navLinkClass} onClick={closeMenu}>Doctors</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>Contact</NavLink>
          
          {/* Mobile-only CTA action items */}
          <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
            <Link
              to="/book"
              onClick={closeMenu}
              className="w-full text-center py-3 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:opacity-90 transition-all"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================
// 4. STAT COUNTER
// ============================================
export const StatCounter = memo(function StatCounter({ target, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const animated = useRef(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.floor(easeOutQuart * target);
              setCount(currentValue);
              
              if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target]);

  return (
    <div className="text-center p-6 md:p-8 rounded-lg bg-white/70 backdrop-blur-md border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.1)]">
      <h3 className="text-4xl md:text-5xl font-bold text-primary mb-1" ref={elementRef}>
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-xs md:text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
});

// ============================================
// 5. FEATURE CARD
// ============================================
export const FeatureCard = memo(({ icon, title, description }) => (
  <div className="p-6 rounded-lg bg-white/70 backdrop-blur-md border border-primary/5 hover:bg-white hover:shadow-xl transition-all group">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-surface-container flex items-center justify-center rounded-xl mb-4 md:mb-6 group-hover:bg-primary/10 transition-colors">
      <Icon name={icon} className="text-primary text-3xl md:text-4xl" />
    </div>
    <h4 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-4">{title}</h4>
    <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">{description}</p>
  </div>
));

// ============================================
// 6. SERVICE CARD (Home page)
// ============================================
export const ServiceCard = memo(function ServiceCard({ title, description, image, icon }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-outline-variant/30 hover:shadow-2xl transition-all duration-300">
      {!imgError ? (
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url('${image}')` }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="h-48 bg-primary/10 flex items-center justify-center">
          <div className="text-center text-primary/70">
            <Icon name="image" className="text-4xl block mb-2" />
            <span className="text-sm">Image unavailable</span>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-primary">{title}</h4>
          <Icon name={icon} className="text-secondary text-2xl" />
        </div>
        <p className="text-sm md:text-base text-on-surface-variant mb-4 leading-relaxed">
          {description}
        </p>
        <Link to="/services" className="text-primary font-semibold hover:underline flex items-center gap-2 text-sm">
          Learn More
          <Icon name="chevron_right" className="text-sm" />
        </Link>
      </div>
    </div>
  );
});

// ============================================
// 7. TESTIMONIAL CARD
// ============================================
export const TestimonialCard = memo(({ quote, name, role, image, initials }) => (
  <div className="p-6 md:p-8 rounded-lg bg-white/70 backdrop-blur-md border border-primary/10 flex flex-col h-full hover:shadow-lg transition-shadow">
    <div className="flex gap-1 mb-4 md:mb-6 text-secondary">
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
    </div>
    <p className="text-sm md:text-base text-on-surface italic mb-6 md:mb-8 grow leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-3 md:gap-4">
      {image ? (
        <img 
          alt={name} 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-primary/10" 
          src={image} 
        />
      ) : (
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm md:text-base">
          {initials}
        </div>
      )}
      <div>
        <h6 className="font-bold text-primary text-sm md:text-base">{name}</h6>
        <p className="text-xs md:text-label-md text-on-surface-variant">{role}</p>
      </div>
    </div>
  </div>
));

// ============================================
// 8. SERVICE CARD WITH PRICE (Services page)
// ============================================
export const ServiceCardWithPrice = memo(function ServiceCardWithPrice({
  id,
  title, 
  description, 
  image, 
  icon, 
  price, 
  duration, 
  badge, 
  badgeColor = 'primary' 
}) {
  const [imgError, setImgError] = useState(false);

  const badgeColors = {
    primary: 'bg-white/90 text-primary',
    secondary: 'bg-secondary-container text-on-secondary-container',
    popular: 'bg-secondary-container text-on-secondary-container'
  };

  return (
    <Link to={`/services/${id}`} className="block h-full">
      <div className="bg-white/80 backdrop-blur-2xl border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer">
        <div className="h-48 overflow-hidden relative">
          {!imgError ? (
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src={image} 
              alt={title}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <div className="text-center text-primary/50">
                <Icon name="image" className="text-4xl block mb-2" />
                <span className="text-sm">Image unavailable</span>
              </div>
            </div>
          )}
          {badge && (
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${badgeColors[badgeColor] || badgeColors.primary}`}>
              {badge}
            </div>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-on-surface">{title}</h3>
            <Icon name={icon} className="text-primary text-2xl shrink-0" />
          </div>
          <p className="text-sm text-on-surface-variant mb-6 flex-1">{description}</p>
          <div>
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
              <div>
                <div className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Starting at</div>
                <div className="text-primary font-bold text-lg">{price}</div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <Icon name="schedule" className="text-sm" />
                <span className="text-xs font-semibold">{duration}</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              View Details
              <Icon name="arrow_forward" className="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

// ============================================
// 9. CATEGORY TABS
// ============================================
export const CategoryTabs = memo(function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex p-1 bg-surface-container-low rounded-full border border-outline-variant">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary text-white'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
});

// ============================================
// 10. VALUE CARD
// ============================================
export const ValueCard = memo(function ValueCard({ icon, title, description, iconBg = 'secondary-container' }) {
  const bgColors = {
    'secondary-container': 'bg-secondary-container text-on-secondary-container',
    'primary-container/10': 'bg-primary-container/10 text-primary',
    'tertiary-fixed': 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    'surface-container-highest': 'bg-surface-container-highest text-on-surface'
  };

  return (
    <div className="glass-card p-6 rounded-2xl transition-all hover:-translate-y-2">
      <div className={`w-12 h-12 rounded-xl ${bgColors[iconBg]} flex items-center justify-center mb-4`}>
        <Icon name={icon} fill />
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant">{description}</p>
    </div>
  );
});

// ============================================
// 11. TEAM MEMBER CARD
// ============================================
export const TeamMemberCard = memo(function TeamMemberCard({ name, role, description, image, alt }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 bg-surface-container">
        {!imgError ? (
          <img 
            className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105" 
            src={image} 
            alt={alt || name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full aspect-3/4 flex items-center justify-center bg-primary/10">
            <div className="text-center text-primary/50">
              <Icon name="person" className="text-6xl block mb-2" />
              <span className="text-sm">Photo unavailable</span>
            </div>
          </div>
        )}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-primary/80 to-transparent transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold text-primary">{name}</h3>
      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{role}</p>
    </div>
  );
});

// ============================================
// 12. CTA SECTION
// ============================================
export const CTASection = ({ variant = 'primary' }) => {
  if (variant === 'about') {
    return (
      <section className="py-12 md:py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10 shadow-sm bg-white">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Ready for a Pure Experience?</h2>
              <p className="text-sm md:text-base text-on-surface-variant">Join over 12,000 patients who have transformed their smiles with us.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book" className="px-6 py-3 bg-primary text-white rounded-xl text-xs md:text-sm font-semibold shadow-lg active:scale-95 transition-all hover:bg-primary/90">
                Book Online
              </Link>
              <Link to="/contact" className="px-6 py-3 border-2 border-primary text-primary rounded-xl text-xs md:text-sm font-semibold hover:bg-primary/5 active:scale-95 transition-all">
                Call Clinic
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }


  // Default primary CTA
  return (
    <section className="py-12 md:py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto bg-primary rounded-xl overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10 p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready for a Brighter, Healthier Smile?</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto opacity-90">
            Book your first consultation today and join our family of happy patients. We are currently accepting new patients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="px-8 md:px-10 py-4 md:py-5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all active:scale-95 text-base md:text-lg">
              Book Appointment Now
            </Link>
            <Link to="/contact" className="px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all active:scale-95 text-base md:text-lg flex items-center justify-center gap-2">
              <Icon name="call" /> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 13. UNIFIED FOOTER
// ============================================
export const Footer = memo(function Footer() {
  return (
  <footer className="bg-surface-container-highest border-t border-surface-variant w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-8 lg:gap-6 px-6 lg:px-10 py-10 md:py-12 max-w-7xl mx-auto text-center sm:text-left">

      {/* Brand Box */}
      <div className="space-y-4 sm:col-span-2 lg:col-span-2 flex flex-col items-center sm:items-start">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Icon name="dentistry" className="text-primary text-2xl" />
          PureDent Clinic
        </Link>
        <p className="text-sm leading-relaxed">
          Leading the way in dental excellence. We provide comprehensive dental care for patients of all ages in a modern, caring environment.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Quick Links</h4>
        <ul className="space-y-2.5">
          <li><Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors block py-0.5" to="/about">About Us</Link></li>
          <li><Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors block py-0.5" to="/services">Our Services</Link></li>
          <li><Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors block py-0.5" to="/doctors">Our Doctors</Link></li>
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors block py-0.5" href="#">Patient Portal</a></li>
        </ul>
      </div>

      {/* Legal Links */}
      <div>
        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Legal</h4>
        <ul className="space-y-2.5">
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors block py-0.5" href="#">Privacy Policy</a></li>
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors block py-0.5" href="#">Terms of Service</a></li>
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors block py-0.5" href="#">Cookie Policy</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Contact Us</h4>
        <address className="not-italic space-y-2">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            18, Yadaval Street<br />
            Chennai, TN 628002
          </p>
          <p className="text-sm text-on-surface-variant font-medium pt-1 block">
            +91 0987654321
          </p>
        </address>
      </div>
    </div>

    {/* Lower Copyright & Social Bar */}
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 border-t border-surface-variant/30 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
      <p className="text-xs sm:text-sm text-on-surface-variant">
        © 2026 PureDent Dental Clinic. All rights reserved.
      </p>

      <div className="flex gap-6 items-center">
        <a className="text-on-surface-variant hover:text-primary transition-colors p-1" aria-label="Website" href="#">
          <Icon name="public" className="text-xl" />
        </a>
        <a className="text-on-surface-variant hover:text-primary transition-colors p-1" aria-label="Share platform" href="#">
          <Icon name="share" className="text-xl" />
        </a>
      </div>
    </div>
  </footer>
  );
});