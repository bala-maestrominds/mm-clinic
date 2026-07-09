// src/components/PureDentComponents.jsx
import React, { useState, useEffect, useRef } from 'react';

// Reusable Card component
export const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-primary/5 rounded-lg shadow-[0px_10px_30px_rgba(15,118,110,0.1)] ${className}`}>
    {children}
  </div>
);

// Icon wrapper for material symbols
export const Icon = ({ name, className = '', fill = false }) => (
  <span 
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
  >
    {name}
  </span>
);

// Navigation Bar Component
export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 backdrop-blur-md shadow-sm transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-md' : 'bg-surface/80'
    }`}>
      <nav className="flex justify-between items-center px-6 lg:px-10 py-4 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Icon name="dentistry" className="text-primary text-3xl" />
          <span className="text-lg md:text-xl font-bold text-primary dark:text-inverse-primary">
            PureDent Clinic
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#about">About</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#services">Services</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#doctors">Doctors</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#gallery">Gallery</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#faq">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden lg:block px-6 py-3 text-sm font-semibold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-all active:scale-95">
            Patient Login
          </button>
          <button className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-primary-container transition-all active:scale-95">
            Book Appointment
          </button>
        </div>
      </nav>
    </header>
  );
};

// Stats Counter Component
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

// Feature Card Component
export const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-lg bg-white/70 backdrop-blur-md border border-primary/5 hover:bg-white hover:shadow-xl transition-all group">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-surface-container flex items-center justify-center rounded-xl mb-4 md:mb-6 group-hover:bg-primary/10 transition-colors">
      <Icon name={icon} className="text-primary text-3xl md:text-4xl" />
    </div>
    <h4 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-4">{title}</h4>
    <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">{description}</p>
  </div>
);

// Service Card Component
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

// Testimonial Card Component
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

// CTA Section Component - MAKE SURE THIS IS EXPORTED
export const CTASection = () => (
  <section className="py-12 md:py-16 px-6 lg:px-10">
    <div className="max-w-7xl mx-auto bg-primary rounded-xl overflow-hidden relative shadow-2xl">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
      <div className="relative z-10 p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready for a Brighter, Healthier Smile?</h2>
        <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto opacity-90">
          Book your first consultation today and join our family of happy patients. We are currently accepting new patients.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all active:scale-95 text-base md:text-lg">
            Book Appointment Now
          </button>
          <button className="px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all active:scale-95 text-base md:text-lg flex items-center justify-center gap-2">
            <Icon name="call" /> Contact Us
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Footer Component
export const Footer = () => (
  <footer className="bg-surface-container-highest w-full border-t border-outline-variant">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Icon name="dentistry" className="text-primary text-3xl" />
            <span className="text-lg md:text-xl font-bold text-primary">PureDent Clinic</span>
          </div>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Leading the way in dental excellence. We provide comprehensive dental care for patients of all ages in a modern, caring environment.
          </p>
        </div>
        <div>
          <h5 className="text-primary font-bold mb-4 md:mb-6">Quick Links</h5>
          <ul className="space-y-2 md:space-y-4">
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">About Us</a></li>
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Our Services</a></li>
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Meet Our Doctors</a></li>
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Patient Education</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-primary font-bold mb-4 md:mb-6">Services</h5>
          <ul className="space-y-2 md:space-y-4">
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">General Dentistry</a></li>
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Cosmetic Dentistry</a></li>
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Dental Implants</a></li>
            <li><a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Teeth Whitening</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-primary font-bold mb-4 md:mb-6">Contact</h5>
          <ul className="space-y-2 md:space-y-4">
            <li className="flex items-start gap-2 text-sm md:text-base text-on-surface-variant">
              <Icon name="location_on" className="text-primary text-sm" />
              123 Dental Plaza, Health District, NY 10001
            </li>
            <li className="flex items-center gap-2 text-sm md:text-base text-on-surface-variant">
              <Icon name="call" className="text-primary text-sm" />
              +1 (555) 000-DENT
            </li>
            <li className="flex items-center gap-2 text-sm md:text-base text-on-surface-variant">
              <Icon name="mail" className="text-primary text-sm" />
              hello@puredent.clinic
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-6 border-t border-outline-variant gap-4">
        <p className="text-sm md:text-base text-on-surface-variant">© 2024 PureDent Clinic Management. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Accessibility</a>
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);