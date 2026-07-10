// src/components/SharedComponents.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

// ============================================
// 1. ICON COMPONENT
// ============================================
export const Icon = ({ name, className = '', fill = false }) => (
  <span 
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
  >
    {name}
  </span>
);

// ============================================
// 2. GLASS CARD COMPONENTS
// ============================================
export const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-primary/5 rounded-lg shadow-[0px_10px_30px_rgba(15,118,110,0.1)] ${className}`}>
    {children}
  </div>
);

export const GlassCardLight = ({ children, className = '' }) => (
  <div className={`bg-white/80 backdrop-blur-2xl border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-2xl ${className}`}>
    {children}
  </div>
);

// ============================================
// 3. NAVIGATION BAR
// ============================================
export const NavBar = ({ variant = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) => 
    `font-medium transition-colors duration-200 ${
      isActive 
        ? 'text-primary border-b-2 border-primary pb-1' 
        : 'text-on-surface-variant hover:text-primary'
    }`;

  const isAbout = variant === 'about';

  return (
    <header className={`fixed top-0 w-full z-50 backdrop-blur-md shadow-sm transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-md' : 'bg-surface/80'
    }`}>
      <nav className="flex justify-between items-center px-6 lg:px-10 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          {!isAbout && <Icon name="dentistry" className="text-primary text-3xl" />}
          <span className={`text-lg md:text-xl font-bold text-primary tracking-tight ${isAbout ? '' : 'dark:text-inverse-primary'}`}>
            {isAbout ? 'PureDent' : 'PureDent Clinic'}
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <NavLink to="/" className={isAbout ? 'text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors' : navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={isAbout ? `text-sm md:text-base ${window.location.pathname === '/about' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'} transition-colors` : navLinkClass}>
            {isAbout ? 'About Us' : 'About'}
          </NavLink>
          <NavLink to="/services" className={isAbout ? 'text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors' : navLinkClass}>
            Services
          </NavLink>
          <NavLink to="/doctors" className={isAbout ? 'text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors' : navLinkClass}>
            {isAbout ? 'Our Doctors' : 'Doctors'}
          </NavLink>
          <NavLink to="/contact" className={isAbout ? 'text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors' : navLinkClass}>
            Contact
          </NavLink>
        </div>
        <Link 
          to="/appointment" 
          className={`px-6 py-2 ${
            isAbout 
              ? 'bg-primary text-white rounded-full text-xs md:text-sm font-semibold hover:opacity-80' 
              : 'bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-primary-container'
          } transition-all active:scale-95`}
        >
          Book Appointment
        </Link>
      </nav>
    </header>
  );
};

// ============================================
// 4. STAT COUNTER (From Home page)
// ============================================
export const StatCounter = ({ target, label, suffix = '' }) => {
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
};

// ============================================
// 5. FEATURE CARD (From Home page)
// ============================================
export const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-lg bg-white/70 backdrop-blur-md border border-primary/5 hover:bg-white hover:shadow-xl transition-all group">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-surface-container flex items-center justify-center rounded-xl mb-4 md:mb-6 group-hover:bg-primary/10 transition-colors">
      <Icon name={icon} className="text-primary text-3xl md:text-4xl" />
    </div>
    <h4 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-4">{title}</h4>
    <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">{description}</p>
  </div>
);

// ============================================
// 6. SERVICE CARD (From Home page)
// ============================================
export const ServiceCard = ({ title, description, image, icon }) => {
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
        <a className="text-primary font-semibold hover:underline flex items-center gap-2 text-sm" href="#">
          Learn More
          <Icon name="chevron_right" className="text-sm" />
        </a>
      </div>
    </div>
  );
};

// ============================================
// 7. TESTIMONIAL CARD (From Home page)
// ============================================
export const TestimonialCard = ({ quote, name, role, image, initials }) => (
  <div className="p-6 md:p-8 rounded-lg bg-white/70 backdrop-blur-md border border-primary/10 flex flex-col h-full hover:shadow-lg transition-shadow">
    <div className="flex gap-1 mb-4 md:mb-6 text-secondary">
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
      <Icon name="star" className="text-sm" fill />
    </div>
    <p className="text-sm md:text-base text-on-surface italic mb-6 md:mb-8 flex-grow leading-relaxed">"{quote}"</p>
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
);

// ============================================
// 8. CTA SECTION
// ============================================
export const CTASection = ({ variant = 'primary' }) => {
  if (variant === 'about') {
    return (
      <section className="py-12 md:py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10 shadow-sm">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Ready for a Pure Experience?</h2>
              <p className="text-sm md:text-base text-on-surface-variant">Join over 12,000 patients who have transformed their smiles with us.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/appointment" className="px-6 py-3 bg-primary text-white rounded-xl text-xs md:text-sm font-semibold shadow-lg active:scale-95 transition-all hover:bg-primary/90">
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

  // Default primary CTA (Home page style)
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
            <Link to="/appointment" className="px-8 md:px-10 py-4 md:py-5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all active:scale-95 text-base md:text-lg">
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
// 9. FOOTER
// ============================================
export const Footer = ({ variant = 'home' }) => {
  const isAbout = variant === 'about';

  return (
    <footer className={`w-full ${isAbout ? 'mt-16 bg-surface-container-lowest' : 'bg-surface-container-highest'} border-t border-surface-variant`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 lg:px-10 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
            {!isAbout && <Icon name="dentistry" className="text-primary text-2xl" />}
            {isAbout ? 'PureDent' : 'PureDent Clinic'}
          </Link>
          <p className="text-sm text-on-surface-variant">
            {isAbout 
              ? 'Redefining modern dental care with precision and compassion. Your journey to a perfect smile starts here.'
              : 'Leading the way in dental excellence. We provide comprehensive dental care for patients of all ages in a modern, caring environment.'
            }
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" to="/about">About Us</Link></li>
            <li><Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" to="/services">Our Services</Link></li>
            <li><Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" to="/doctors">Our Doctors</Link></li>
            <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Patient Portal</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a></li>
            <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Contact Us</h4>
          <p className="text-sm text-on-surface-variant mb-2">123 Clinical Plaza, Medical District<br/>New York, NY 10001</p>
          <p className="text-sm text-on-surface-variant">+1 (555) 123-4567</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 border-t border-surface-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-on-surface-variant">© 2024 PureDent Dental Clinic. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="text-on-surface-variant hover:text-primary" href="#"><Icon name="public" /></a>
          <a className="text-on-surface-variant hover:text-primary" href="#"><Icon name="share" /></a>
        </div>
      </div>
    </footer>
  );
};