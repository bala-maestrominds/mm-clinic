// src/pages/public/ServiceDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { 
  NavBar, 
  Footer
} from '../../components/SharedComponents';
import {
  ServiceDetailHero,
  ServiceBenefits,
  ServiceProcedure,
  ServiceFAQs,
  RelatedServices,
  ServiceCTASection
} from '../../components/ServiceDetailComponents';
import { Reveal, PageTransition } from '../../components/Motion';
import { getServiceById, getRelatedServices } from '../../data/servicesData';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId);
  const relatedServices = service ? getRelatedServices(serviceId) : [];
  
  // Local state to coordinate the page intro sequence cleanly
  const [ready, setReady] = useState(false);

  // Reset scroll position and re-trigger entry animations whenever serviceId changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setReady(false);
    
    const animationFrame = requestAnimationFrame(() => {
      setReady(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [serviceId]);

  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <PageTransition className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col justify-between">
      <NavBar />

      {/* 
        Main content container with structural entry control:
        Fades the entire frame up slightly to hide rough layout shifts on mount.
      */}
      <main 
        className="flex-grow transition-all duration-700 ease-out transform"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0px)' : 'translateY(12px)'
        }}
      >
        {/* Hero Section - Appears instantly with the container */}
        <div className="relative">
          <ServiceDetailHero service={service} />
        </div>

        {/* 
          Content Grid Wrapper:
          Uses modular spacing and staggered layout entry transitions for a premium magazine feel.
        */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-16 md:space-y-24">
          
          {/* Benefits Section */}
          {service.benefits && service.benefits.length > 0 && (
            <div 
              className="transition-all duration-700 ease-out transform"
              style={{
                transitionDelay: ready ? '150ms' : '0ms',
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0px)' : 'translateY(20px)'
              }}
            >
              <Reveal>
                <ServiceBenefits benefits={service.benefits} />
              </Reveal>
            </div>
          )}

          {/* Procedure Section */}
          {service.procedure && service.procedure.length > 0 && (
            <div 
              className="transition-all duration-700 ease-out transform"
              style={{
                transitionDelay: ready ? '300ms' : '0ms',
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0px)' : 'translateY(20px)'
              }}
            >
              <Reveal>
                <ServiceProcedure procedure={service.procedure} />
              </Reveal>
            </div>
          )}

          {/* FAQs Section */}
          {service.faqs && service.faqs.length > 0 && (
            <div 
              className="transition-all duration-700 ease-out transform"
              style={{
                transitionDelay: ready ? '450ms' : '0ms',
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0px)' : 'translateY(20px)'
              }}
            >
              <Reveal>
                <ServiceFAQs faqs={service.faqs} />
              </Reveal>
            </div>
          )}

          {/* Related Services Section */}
          {relatedServices.length > 0 && (
            <div 
              className="transition-all duration-700 ease-out transform border-t border-outline-variant pt-16"
              style={{
                transitionDelay: ready ? '600ms' : '0ms',
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0px)' : 'translateY(20px)'
              }}
            >
              <Reveal>
                <RelatedServices services={relatedServices} />
              </Reveal>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div 
          className="transition-all duration-1000 ease-out transform"
          style={{
            transitionDelay: ready ? '700ms' : '0ms',
            opacity: ready ? 1 : 0
          }}
        >
          <ServiceCTASection />
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
}