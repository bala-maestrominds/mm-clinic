// src/pages/public/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  NavBar, 
  Footer, 
  CTASection,
  ServiceCardWithPrice,
  CategoryTabs,
  Icon
} from '../../components/SharedComponents';

// Images
const images = {
  cleaning: "https://static.wixstatic.com/media/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg/v1/fill/w_2500,h_1875,al_c/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg",
  rootCanal: "https://tse3.mm.bing.net/th/id/OIP.7F-ILk3WjCKXZnoOGmTnvQHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  exam: "https://images.squarespace-cdn.com/content/v1/5d41bc8e7e87f900017bbb3d/1565367144976-02VOCDND0CH34D5NX5T6/Comprehensive+Exam.jpg",
  emergency: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
  whitening: "https://www.fashionabc.org/wp-content/uploads/2025/04/Professional-Teeth-Whitening-Before-And-After-Expectations.jpg",
  invisalign: "https://uploads-ssl.webflow.com/61e7a911958c1d7dfe2a57d8/63774122ddc4bf0af2aad078_Invisalign%20Trays.jpg",
  whiteningInOffice: "https://tse3.mm.bing.net/th/id/OIP.eFUhiQMnAPLekpEIvjvnPgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  veneers: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?auto=format&fit=crop&q=80&w=800",
  implants: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhSB0s0crGI96-nwKFPcruCA8hUtHrS5PWyBi7useN_AkXQ7r523-h0E-hwSeBMotr6VNxtyW6vKJqOE_QPYFfK2oHIJg6Yjz-Dh3nxvJO6P4ic3GpgiH4cTpfUdDcGJBd7fqD_tHLNbCZEYBWhwPyjoPv6GkuFce42ceee9dnnnnNAafFDrVQGIpn-0tjhjDQSlWCkXnqSfAXVpiWqTqBtaONm-WOfpUKSrm4L2mYDTLxDcgTnH2M",
  dentures: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7C3_wdW4f9LmXbEwqiSgMvndR2PEFPACBoj9VVOTvnKjsj2LLtvElXm6_hiHjrcawA6g6j21M8R4HgFseNnoyqDm1caWSWfg9B1JaeczJHv4Y22g_ish9LWdFq9oYmOcV8f9-EBVH4FYujOtsqzKEUAQav_nA3Cr0j6udblYd5nxoXJs2ePPrrrBEVj9H1lwOCl2_cz5z26pAxa81xLPkfoDtqSAvMm44fMN8niP4LPkDd7dkeJJu"
};

// Categories
const categories = [
  { id: 'general', label: 'General Dentistry' },
  { id: 'cosmetic', label: 'Cosmetic' },
  { id: 'restorative', label: 'Restorative' }
];

// Service Data with IDs matching the data file
const generalServices = [
  {
    id: 'teeth-cleaning',
    title: 'Teeth Cleaning',
    description: 'Comprehensive scaling and polishing to maintain optimal oral hygiene and prevent gum disease.',
    image: images.cleaning,
    icon: 'cleaning_services',
    price: '$85',
    duration: '45 mins',
    badge: 'Best Seller'
  },
  {
    id: 'root-canal',
    title: 'Root Canal',
    description: 'Pain-free therapy to save infected teeth and restore their functional structure with precision.',
    image: images.rootCanal,
    icon: 'healing',
    price: '$450',
    duration: '90 mins'
  },
  {
    id: 'comprehensive-exam',
    title: 'Comprehensive Exam',
    description: 'Routine checkups, digital X-rays, and oral cancer screening for complete oral health monitoring.',
    image: images.exam,
    icon: 'clinical_notes',
    price: '$95',
    duration: '30 mins'
  },
  {
    id: 'emergency-visit',
    title: 'Emergency Visit',
    description: 'Same-day relief for acute pain, broken teeth, or dental trauma when you need it most.',
    image: images.emergency,
    icon: 'emergency',
    price: '$150',
    duration: '45 mins'
  }
];

const cosmeticServices = [
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Advanced laser whitening technology that brightens your smile by several shades in just one visit.',
    image: images.whitening,
    icon: 'auto_fix_high',
    price: '$299',
    duration: '60 mins',
    badge: 'Popular',
    badgeColor: 'popular'
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description: 'Straighten your teeth discreetly with custom-made clear aligners for a perfect smile.',
    image: images.invisalign,
    icon: 'straighten',
    price: '$2,500',
    duration: 'Flex Plan'
  },
  {
    id: 'professional-whitening',
    title: 'Professional Whitening',
    description: 'Professional in-office whitening for a brighter smile in one hour using advanced light technology.',
    image: images.whiteningInOffice,
    icon: 'flare',
    price: '$350',
    duration: '60 mins'
  },
  {
    id: 'veneer-placement',
    title: 'Porcelain Veneers',
    description: 'Custom-crafted shells for a perfect, natural-looking smile transformation and alignment.',
    image: images.veneers,
    icon: 'auto_fix_high',
    price: '$1,200',
    duration: '120 mins'
  }
];

const restorativeServices = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Permanent solution for missing teeth that feels and looks completely natural.',
    image: images.implants,
    icon: 'settings_backup_restore',
    price: '$1,200',
    duration: '2-3 Visits'
  },
  {
    id: 'full-dentures',
    title: 'Full Dentures',
    description: 'Complete smile restoration with custom-fitted dentures for comfort and natural look.',
    image: images.dentures,
    icon: 'diversity_1',
    price: '$1,800',
    duration: '4 Weeks'
  },
  {
    id: 'dental-implants-premium',
    title: 'Dental Implants (Premium)',
    description: 'Permanent, natural-looking replacement for missing teeth that restores full function and aesthetics.',
    image: images.implants,
    icon: 'settings_backup_restore',
    price: '$1,200',
    duration: '90 mins'
  },
  {
    id: 'full-dentures-premium',
    title: 'Full Dentures (Premium)',
    description: 'High-quality, comfortable prosthetic solutions for complete smile restoration and improved quality of life.',
    image: images.dentures,
    icon: 'diversity_1',
    price: '$1,500',
    duration: '120 mins'
  }
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('general');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.service-card').forEach((card) => {
      card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setTimeout(() => {
      document.querySelectorAll('.service-card').forEach((card) => {
        card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        setTimeout(() => {
          card.classList.remove('opacity-0', 'translate-y-10');
          card.classList.add('opacity-100', 'translate-y-0');
        }, 50);
      });
    }, 100);
  };

  const getServices = () => {
    switch(activeCategory) {
      case 'general': return generalServices;
      case 'cosmetic': return cosmeticServices;
      case 'restorative': return restorativeServices;
      default: return generalServices;
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 px-6 lg:px-10 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold mb-6">
              EXCELLENCE IN CARE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Our Specialized Dental Services
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-8 md:mb-10">
              Experience world-class dental care with our team of specialists. We combine clinical expertise with advanced technology to ensure your smile remains bright and healthy.
            </p>
          </div>
        </section>

        {/* Service Grid with Categories */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 md:pb-16">
          <CategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getServices().map((service) => (
              <div key={service.id} className="service-card">
                <ServiceCardWithPrice {...service} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CTASection variant="services" />
      </main>

      <Footer />
    </div>
  );
}