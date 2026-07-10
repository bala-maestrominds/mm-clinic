// src/pages/public/ServiceDetailPage.jsx
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { 
  NavBar, 
  Footer, 
  Icon,
  GlassCard
} from '../../components/SharedComponents';
import {
  ServiceDetailHero,
  ServiceBenefits,
  ServiceProcedure,
  ServiceFAQs,
  RelatedServices,
  ServiceCTASection
} from '../../components/ServiceDetailComponents';
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
    <div className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <NavBar />

      <main>
        {/* Hero Section */}
        <ServiceDetailHero service={service} />

        {/* Benefits Section */}
        {service.benefits && service.benefits.length > 0 && (
          <ServiceBenefits benefits={service.benefits} />
        )}

        {/* Procedure Section */}
        {service.procedure && service.procedure.length > 0 && (
          <ServiceProcedure procedure={service.procedure} />
        )}

        {/* FAQs Section */}
        {service.faqs && service.faqs.length > 0 && (
          <ServiceFAQs faqs={service.faqs} />
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <RelatedServices services={relatedServices} />
        )}

        {/* CTA Section */}
        <ServiceCTASection />
      </main>

      <Footer />
    </div>
  );
}