// src/components/ServiceDetailComponents.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './SharedComponents';

export const ServiceDetailHero = ({ service }) => (
  <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 px-6 lg:px-10 overflow-hidden">
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Column - Text */}
        <div className="lg:w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">
              {service.category}
            </span>
            {service.badge && (
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${
                service.badge === 'Best Seller' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary-container text-on-secondary-container'
              }`}>
                {service.badge}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            {service.title}
          </h1>
          <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
            {service.longDescription || service.description}
          </p>
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <p className="text-sm text-on-surface-variant">Starting at</p>
              <p className="text-2xl font-bold text-primary">{service.price}</p>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant">Duration</p>
              <p className="text-2xl font-bold text-primary">{service.duration}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/book" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
              Book Appointment
            </Link>
            <Link to="/services" className="px-8 py-4 border border-primary/20 text-primary rounded-xl font-bold hover:bg-primary/5 transition-all active:scale-95">
              View All Services
            </Link>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
              <div className="flex items-center gap-4 text-white">
                <Icon name="schedule" className="text-2xl" />
                <span>{service.duration}</span>
                <Icon name="payments" className="text-2xl ml-4" />
                <span>{service.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ServiceBenefits = ({ benefits }) => (
  <section className="py-12 px-6 lg:px-10 bg-surface-container-low">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Why Choose This Treatment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
            <Icon name="check_circle" className="text-secondary text-2xl shrink-0" />
            <span className="text-on-surface-variant">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ServiceProcedure = ({ procedure }) => (
  <section className="py-12 px-6 lg:px-10">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">What to Expect</h2>
      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
        <div className="space-y-8">
          {procedure.map((step, index) => (
            <div key={index} className="flex items-start gap-6 relative">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm md:text-lg shrink-0 relative z-10">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-base md:text-lg text-on-surface-variant">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ServiceFAQs = ({ faqs }) => (
  <section className="py-12 px-6 lg:px-10 bg-surface-container-low">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-primary mb-2">{faq.question}</h4>
            <p className="text-on-surface-variant">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const RelatedServices = ({ services }) => (
  <section className="py-12 px-6 lg:px-10">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Related Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link 
            key={service.id} 
            to={`/services/${service.id}`}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/5"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop';
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
              <p className="text-sm text-on-surface-variant mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">{service.price}</span>
                <span className="text-sm text-on-surface-variant">{service.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export const ServiceCTASection = () => (
  <section className="py-12 px-6 lg:px-10 bg-primary">
    <div className="max-w-7xl mx-auto text-center text-white">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Smile?</h2>
      <p className="text-lg mb-8 opacity-90">Book your consultation today and take the first step toward your perfect smile.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/book" className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95">
          Book Appointment Now
        </Link>
        <Link to="/contact" className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95">
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);