// src/components/AboutComponents.jsx
import React from 'react';

// Icon wrapper for material symbols
export const Icon = ({ name, className = '', fill = false }) => (
  <span 
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
  >
    {name}
  </span>
);


export const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white/80 backdrop-blur-2xl border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-2xl ${className}`}>
    {children}
  </div>
);

// Navigation Bar Component (Reusing from Home)
export const AboutNavBar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-md shadow-sm transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-md' : 'bg-surface/80'
    }`}>
      <div className="flex justify-between items-center px-6 lg:px-10 py-4 max-w-7xl mx-auto">
        <a className="text-lg md:text-xl font-bold text-primary tracking-tight" href="/">PureDent</a>
        <div className="hidden md:flex items-center space-x-6">
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="/">Home</a>
          <a className="text-sm md:text-base text-primary border-b-2 border-primary pb-1" href="/about">About Us</a>
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="/services">Services</a>
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="/doctors">Our Doctors</a>
          <a className="text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors" href="/contact">Contact</a>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-full text-xs md:text-sm font-semibold active:scale-95 transition-all hover:opacity-80">
          Book Appointment
        </button>
      </div>
    </nav>
  );
};

// Value Card Component
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

// Team Member Card Component
export const TeamMemberCard = ({ name, role, description, image, alt }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img 
          className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105" 
          src={image} 
          alt={alt || name}
        />
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

// Footer Component (Reusing from Home)
export const AboutFooter = () => (
  <footer className="w-full mt-16 bg-surface-container-lowest border-t border-surface-variant">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 lg:px-10 py-12 max-w-7xl mx-auto">
      <div className="space-y-4">
        <a className="text-lg font-bold text-primary" href="/">PureDent</a>
        <p className="text-sm text-on-surface-variant">Redefining modern dental care with precision and compassion. Your journey to a perfect smile starts here.</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/services">Our Services</a></li>
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Success Stories</a></li>
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Patient Portal</a></li>
          <li><a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">FAQs</a></li>
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


export const AboutCTASection = () => (
  <section className="py-12 md:py-16 px-6 lg:px-10 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10 shadow-sm">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Ready for a Pure Experience?</h2>
          <p className="text-sm md:text-base text-on-surface-variant">Join over 12,000 patients who have transformed their smiles with us.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 bg-primary text-white rounded-xl text-xs md:text-sm font-semibold shadow-lg active:scale-95 transition-all hover:bg-primary/90">
            Book Online
          </button>
          <button className="px-6 py-3 border-2 border-primary text-primary rounded-xl text-xs md:text-sm font-semibold hover:bg-primary/5 active:scale-95 transition-all">
            Call Clinic
          </button>
        </div>
      </div>
    </div>
  </section>
);