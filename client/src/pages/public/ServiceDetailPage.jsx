// src/pages/public/ServiceDetailPage.jsx
import { useEffect } from 'react';
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

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <PageTransition className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <NavBar />

      <main>
        {/* Hero Section */}
        <ServiceDetailHero service={service} />

        {/* Benefits Section */}
        {service.benefits && service.benefits.length > 0 && (
          <Reveal>
            <ServiceBenefits benefits={service.benefits} />
          </Reveal>
        )}

        {/* Procedure Section */}
        {service.procedure && service.procedure.length > 0 && (
          <Reveal>
            <ServiceProcedure procedure={service.procedure} />
          </Reveal>
        )}

        {/* FAQs Section */}
        {service.faqs && service.faqs.length > 0 && (
          <Reveal>
            <ServiceFAQs faqs={service.faqs} />
          </Reveal>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <Reveal>
            <RelatedServices services={relatedServices} />
          </Reveal>
        )}

        {/* CTA Section */}
        <ServiceCTASection />
      </main>

      <Footer />
    </PageTransition>
  );
}