// src/pages/public/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  NavBar, 
  Footer, 
  CTASection,
  ServiceCardWithPrice,
  CategoryTabs
} from '../../components/SharedComponents';
import { getServicesByCategory } from '../../data/servicesData';

const categories = [
  { id: 'general', label: 'General Dentistry' },
  { id: 'cosmetic', label: 'Cosmetic Dentistry' },
  { id: 'surgical', label: 'Surgical Specialists' }
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    setAnimateItems(false);
    const animationFrame = requestAnimationFrame(() => {
      setAnimateItems(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const displayedServices = getServicesByCategory(activeCategory);

  return (
    <div className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col justify-between selection:bg-primary/20">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 px-6 lg:px-10 overflow-hidden">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto text-center transition-all duration-1000 ease-out transform translate-y-0 opacity-100">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold mb-6 tracking-wide animate-fade-in">
              EXCELLENCE IN CARE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary tracking-tight">
              Our Specialized Dental Services
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
              Experience world-class dental care with our team of specialists. We combine clinical expertise with advanced technology to ensure your smile remains bright and healthy.
            </p>
          </div>
        </section>

        {/* Service Grid with Categories */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 md:pb-16">
          <div className="mb-10 transform transition-all duration-500">
            <CategoryTabs 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Service Cards Grid Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {displayedServices.map((service, index) => (
              <div 
                key={service.id} 
                className={`service-card transition-all duration-500 ease-out transform`}
                style={{
                  transitionDelay: animateItems ? `${index * 75}ms` : '0ms',
                  opacity: animateItems ? 1 : 0,
                  transform: animateItems ? 'translateY(0px)' : 'translateY(24px)'
                }}
              >
                <div className="hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-2xl h-full bg-surface">
                  <ServiceCardWithPrice {...service} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <CTASection variant="services" />
        </div>
      </main>

      <Footer />
    </div>
  );
}