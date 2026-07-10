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
// 3. UNIFIED NAVIGATION BAR
// ============================================
export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) => 
    `text-sm md:text-base font-medium transition-colors duration-200 ${
      isActive 
        ? 'text-primary border-b-2 border-primary pb-1' 
        : 'text-on-surface-variant hover:text-primary'
    }`;

  return (
    <header className={`fixed top-0 w-full z-50 backdrop-blur-md shadow-sm transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-md' : 'bg-surface/80'
    }`}>
      <nav className="flex justify-between items-center px-6 lg:px-10 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <Icon name="dentistry" className="text-primary text-3xl" />
          <span className="text-lg md:text-xl font-bold text-primary dark:text-inverse-primary">
            PureDent Clinic
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/doctors" className={navLinkClass}>Doctors</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden lg:block px-6 py-3 text-sm font-semibold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-all active:scale-95">
            Patient Login
          </button>
          <Link 
            to="/book" 
            className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-primary-container transition-all active:scale-95"
          >
            Book Appointment
          </Link>
        </div>
      </nav>
    </header>
  );
};

// ============================================
// 4. STAT COUNTER
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
// 5. FEATURE CARD
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
// 6. SERVICE CARD (Home page)
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
        <Link to="/services" className="text-primary font-semibold hover:underline flex items-center gap-2 text-sm">
          Learn More
          <Icon name="chevron_right" className="text-sm" />
        </Link>
      </div>
    </div>
  );
};

// ============================================
// 7. TESTIMONIAL CARD
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
);

// ============================================
// 8. SERVICE CARD WITH PRICE (Services page)
// ============================================
export const ServiceCardWithPrice = ({ 
  id,
  title, 
  description, 
  image, 
  icon, 
  price, 
  duration, 
  badge, 
  badgeColor = 'primary' 
}) => {
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
};

// ============================================
// 9. CATEGORY TABS
// ============================================
export const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
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
};

// ============================================
// 10. VALUE CARD
// ============================================
export const ValueCard = ({ icon, title, description, iconBg = 'secondary-container' }) => {
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
};

// ============================================
// 11. TEAM MEMBER CARD
// ============================================
export const TeamMemberCard = ({ name, role, description, image, alt }) => {
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
};

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

  if (variant === 'services') {
    return (
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 md:mb-16">
        <div className="bg-linear-to-r from-primary to-secondary p-1 rounded-2xl">
          <div className="bg-surface rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Unsure what you need?</h2>
              <p className="text-sm md:text-base text-on-surface-variant">
                Book a comprehensive dental check-up and consultation. Our experts will create a personalized treatment plan for you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link to="/contact" className="px-8 py-4 border border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-colors text-center">
                Contact Us
              </Link>
              <Link to="/book" className="bg-linear-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform text-center">
                Book Now
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
export const Footer = () => (
  <footer className="bg-surface-container-highest border-t border-surface-variant w-full">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 lg:px-10 py-8 md:py-12 max-w-7xl mx-auto">
      <div className="space-y-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Icon name="dentistry" className="text-primary text-2xl" />
          PureDent Clinic
        </Link>
        <p className="text-sm text-on-surface-variant">
          Leading the way in dental excellence. We provide comprehensive dental care for patients of all ages in a modern, caring environment.
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
        <p className="text-sm text-on-surface-variant mb-2">18,Yadaval Street<br/>Chennai, TN 628002</p>
        <p className="text-sm text-on-surface-variant">+91 0987654321</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 border-t border-surface-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-on-surface-variant">© 2026 PureDent Dental Clinic. All rights reserved.</p>
      <div className="flex gap-4">
        <a className="text-on-surface-variant hover:text-primary" href="#"><Icon name="public" /></a>
        <a className="text-on-surface-variant hover:text-primary" href="#"><Icon name="share" /></a>
      </div>
    </div>
  </footer>
);