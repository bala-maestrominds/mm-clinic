// src/pages/public/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  NavBar, 
  StatCounter, 
  FeatureCard, 
  ServiceCard, 
  TestimonialCard, 
  CTASection, 
  Footer,
  Icon
} from '../../components/SharedComponents';

// Images
const heroImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBAjguS2Ikga6m4mMkiO6CaDaQK7EdW05Dj2uKAwgoBg3S9vsul7w00WJz999ROrFwkJ05PxY_alDfnQxUY55yMfz8pTX4VasNQFw_va5NAIwKPY6qjCLL5R__wJRFUzRhk9KRIjvNAkyauRIXkJH83UnIQBtfHAiWp8DlbpmfkYBFXldMHMYaJmg8Xnv506j0zZvEod69kxRhZmFTrbzoVvxUxm6GP519yJwxL1VHELZo-oG0xojjB";
const clinicImage1 = "https://lh3.googleusercontent.com/aida/AP1WRLsfOQUMZv_nVwAxDWr8T2rdHmyM4gwikR_rwc115lnTA56AgMysLk-96W8gOqemM1M-Efd0M5ZzV5cLzBykOiwcOTy-RkQ92mcF_lUAGnXTTJQeuynso7CSCsqUJ6fvVaHGmulsA5lz6QXtZ6xcynvp9eb6-GEItyUMuRGXLzvxGLKyuE3A9IFuHC5pwz1Aff-sQJ-p_owqThjwzhXgBk2SC9x1UTRhF30uEqPaAauELZdOh3K-wQQ6OWU";
const clinicImage2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBAjguS2Ikga6m4mMkiO6CaDaQK7EdW05Dj2uKAwgoBg3S9vsul7w00WJz999ROrFwkJ05PxY_alDfnQxUY55yMfz8pTX4VasNQFw_va5NAIwKPY6qjCLL5R__wJRFUzRhk9KRIjvNAkyauRIXkJH83UnIQBtfHAiWp8DlbpmfkYBFXldMHMYaJmg8Xnv506j0zZvEod69kxRhZmFTrbzoVvxUxm6GP519yJwxL1VHELZo-oG0xojjB";
const clinicImage3 = "https://lh3.googleusercontent.com/aida/AP1WRLtG-ucz4Z_DFr6IIPPuCBbrjsXhIEGp1KNQKSt4svxFGENarvgxuo2nuhuGmGV5Twff9LRJQYrDW9h0VB7Mt-P2IeC0HLcKMwEmET_gLAmFokWgR3Y1o6efWDFrY_zDU_k1HuOxz1azjNIKEZSZjybKMMTsbgdygy2gG2URL9IFmICg1exPDOBeL3KLKfVDssY82jDo42Guthw7TA5m9NvyOIlQiCM5uYZZ30tTMhs9YRjle0vOC5sv4r4";
const serviceImage1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBecSqOpwO_O3q9BQ2whBDAEM_zYF42WXBfcT4udar0X8fJKxruLhJlqs3e95_Ehtt1bJFqQzqzWDBXpvQ3G6mJO-KbcHoFuRbyx4WGOswof91sGqBwhE0MPURL19q8R85PDgT9O655EhDsoNnSLN6DzDQbkczSTJuisLCJ9pCGUKmvbdyb5iP4lZVm_3pIRhgFj9bIJbI8pzg2eG3zZUHXOKO-Gq07Zb8KmvSqI3zJU_0XGpN3qcvc";
const serviceImage2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuC-4TKT-yUlSomBP4PpcWEysf3CtFxwQja5GaO3FqzVUKX8IFP9gfzbS418hNbi7Cs2PFf_4qFrmU7lf3g1dUr1auc_-CZciBaDZlbXl0QA42ijFYXTJ2yb6yy4bladDmWW4BSwPjKT_PjTuauEEPOcU69whXw3NdQ7jWguBQ2J1ZHAhV1ut8rUIBKTOOV5j1GjVMe3_5lWTi-Rw7XKOC_e3VPTywwQESw8YuR9yNonxVZ44TOLnVMF";
const serviceImage3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuABl0WCysz8QOfcXgIBA3PXSxsNyAQ6PH1ywdpDF_FlRUGqrbVfeeUGdjIzmR6IBQZkaeWxvXmto1tytoNV3WgQdV4B32tYpNLfJXtwQq7klsduPZg_SdzrLoskRiDQj7euDETcU_n7Q-1WIrBBKfwifyTumkTFkRiTFssL5ohBgzqO6zm7XcNdJHdtvaGmAr4XphH8xLyl3KAi-KgTnGMdoPO8MUIW_XMjPcrwNrKj5XalYCehm2k7";
const testimonialImage1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCgDLzxckMx-iPpUEhETYJeQCAB98IRxkaCyushIqljd8Tz3oayFupNLxZKMz-fB0EoV4xio-sH-yKvjVVXRcDqAzZxO61ET5q2ysoV_xW0xtMVuwMxseMwE5Hn1PFrTj26ZmmuazJkQvE6QjzfDWvtQdnAZBOAZErZnWDCmN7Az5hbC7rrOQ4AMMoOaSDtgMyvcgQx1T9ILBsW4uesCEQ8xra25E2dtuBk_DSrJ2Y5sWfoKMRCmT6C";
const testimonialImage2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCLwdtNo0olVky5fQpEsFjn0-BZ4yodhyPvTAtH0ElA4sjXDMSGMoaUZ4lcliFE1LPEjdBstNlZ3LpVKhQZhASFt5gLymev-dRDyFde8XFStBPRnRDShtGVp_OrbsI1ulGXvIgLPGstYkzSDe9-V4V9fjS2FvnzZ4XLJzFXknaO8YG_jyVeCjgIQFFcmv6wvKLBiOGpLz-h-R3ocq6ZnEy1EaP63RsfRH2yPo1O0nhjZJNRJZNE6lyA";

export default function LandingPage() {
  return (
    <div className="bg-mesh text-on-surface font-body-md antialiased overflow-x-hidden">
      <NavBar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 lg:px-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full opacity-40 mix-blend-multiply filter grayscale-[0.2]" 
              style={{ 
                backgroundImage: `url('${heroImage}')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container/30 text-on-secondary-container rounded-full font-label-md">
                <Icon name="verified" className="text-sm" />
                Advanced Dental Technology Center
              </div>
              <h1 className="font-headline-xl text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight">
                Your Smile, <br /><span className="text-secondary">Our Priority</span>
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                Professional, affordable, patient-centered dental care using advanced technology. Experience pain-free dentistry in a sterile, welcoming environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/appointment" 
                  className="px-8 py-4 bg-primary text-white font-headline-sm rounded-lg shadow-xl shadow-primary/20 hover:translate-y-[-2px] transition-all"
                >
                  Start Consultation
                </Link>
                <Link 
                  to="/services" 
                  className="px-8 py-4 bg-white/50 backdrop-blur-md border border-primary/10 text-primary font-headline-sm rounded-lg hover:bg-white/80 transition-all"
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Hero Focal Image & Floating Cards */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white/80 rotate-2 hover:rotate-0 transition-transform duration-500 bg-surface">
                  <img 
                    alt="Clinical Excellence" 
                    className="w-full aspect-[4/5] object-cover" 
                    src={heroImage}
                  />
                </div>

                <div className="absolute -top-6 -left-6 md:-left-12 animate-float bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-[0px_10px_30px_rgba(15,118,110,0.1)] border border-primary/5 flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary-container flex items-center justify-center rounded-full text-primary">
                    <Icon name="groups" className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <div className="text-lg md:text-headline-sm text-primary font-bold">5000+</div>
                    <div className="text-xs md:text-label-md text-on-surface-variant">Happy Patients</div>
                  </div>
                </div>

                <div className="absolute bottom-8 md:bottom-12 -right-4 md:-right-8 animate-float [animation-delay:1s] bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-[0px_10px_30px_rgba(15,118,110,0.1)] border border-primary/5 flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-container flex items-center justify-center rounded-full text-white">
                    <Icon name="history_edu" className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <div className="text-lg md:text-headline-sm text-primary font-bold">15+</div>
                    <div className="text-xs md:text-label-md text-on-surface-variant">Years Experience</div>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-4 md:-left-16 animate-float [animation-delay:2s] bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-lg shadow-[0px_10px_30px_rgba(15,118,110,0.1)] border border-primary/5 flex items-center gap-2">
                  <Icon name="star" className="text-tertiary text-sm md:text-base" fill />
                  <div className="text-base md:text-headline-sm text-primary font-bold">4.9</div>
                  <div className="text-xs md:text-label-md text-on-surface-variant">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 px-6 lg:px-10 bg-surface-container-low">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCounter target={15000} label="Treatments Done" />
            <StatCounter target={24} label="Expert Doctors" />
            <StatCounter target={12} label="Clinic Branches" />
            <StatCounter target={99} label="Success Rate" suffix="%" />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 px-6 lg:px-10 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 lg:mb-16">
              <div>
                <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-primary mb-4 font-bold">Why Patients Trust PureDent</h2>
                <p className="text-body-lg text-on-surface-variant mb-6 md:mb-8 leading-relaxed">
                  We combine clinical excellence with a compassionate approach to ensure every visit to our clinic is comfortable and effective.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-primary/10 flex items-center justify-center rounded-lg text-primary">
                      <Icon name="check" className="text-lg md:text-xl" />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-sm md:text-base">Modern Equipment</h5>
                      <p className="text-xs md:text-body-sm text-on-surface-variant">State-of-the-art diagnostic tools.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-primary/10 flex items-center justify-center rounded-lg text-primary">
                      <Icon name="check" className="text-lg md:text-xl" />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-sm md:text-base">Expert Specialists</h5>
                      <p className="text-xs md:text-body-sm text-on-surface-variant">Decades of clinical experience.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  alt="Trustworthy Dental Care" 
                  className="rounded-xl shadow-xl w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover" 
                  src={clinicImage3}
                />
                <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 p-4 md:p-6 bg-white/70 backdrop-blur-md border border-primary/5 rounded-lg shadow-lg hidden sm:block max-w-[200px] md:max-w-[240px]">
                  <p className="text-xs md:text-body-sm italic text-primary">"Our goal is to make every patient feel at home while receiving world-class treatment."</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard 
                icon="medical_information"
                title="Experienced Dentists"
                description="Our team consists of board-certified specialists with decades of combined experience in complex dental procedures."
              />
              <FeatureCard 
                icon="biotech"
                title="Modern Equipment"
                description="We utilize digital X-rays, 3D imaging, and laser dentistry to provide precise diagnosis and minimally invasive treatments."
              />
              <FeatureCard 
                icon="payments"
                title="Affordable Pricing"
                description="Premium care shouldn't be out of reach. We offer competitive pricing and flexible interest-free payment plans."
              />
            </div>
          </div>
        </section>

        {/* About Us Visual Richness */}
        <section className="py-12 md:py-16 px-6 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <img 
                  alt="Clinic Interior" 
                  className="rounded-lg shadow-md aspect-video object-cover col-span-2" 
                  src={clinicImage1}
                />
                <img 
                  alt="Modern Tech" 
                  className="rounded-lg shadow-md aspect-square object-cover" 
                  src={clinicImage2}
                />
                <img 
                  alt="Our Doctors" 
                  className="rounded-lg shadow-md aspect-square object-cover" 
                  src={clinicImage3}
                />
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-primary mb-4 font-bold">Clinic Excellence</h2>
              <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                PureDent Clinic was founded with a single mission: to redefine the dental experience. Our clinic features a luxury spa-like environment equipped with hospital-grade sterilization and the latest in digital dentistry.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-surface-container-low border border-primary/5">
                  <Icon name="health_and_safety" className="text-primary text-xl md:text-2xl" />
                  <span className="text-sm md:text-base font-medium">100% Sterile Hospital-Grade Facility</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-surface-container-low border border-primary/5">
                  <Icon name="psychology" className="text-primary text-xl md:text-2xl" />
                  <span className="text-sm md:text-base font-medium">Specialized Care for Anxious Patients</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-12 md:py-16 px-6 lg:px-10 bg-surface-container-low" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 md:mb-12 lg:mb-16">
              <div className="max-w-xl">
                <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-primary mb-3 md:mb-4 font-bold">Our Specialized Services</h2>
                <p className="text-body-md text-on-surface-variant">From routine cleaning to complex restorative surgery, we offer comprehensive dental solutions under one roof.</p>
              </div>
              <Link 
                to="/services" 
                className="px-6 md:px-8 py-2 md:py-3 bg-secondary text-white font-label-md rounded-lg hover:bg-secondary/90 transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
              >
                View All Services
                <Icon name="arrow_forward" className="text-sm" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                title="Teeth Cleaning"
                description="Professional scaling and polishing to maintain oral hygiene and prevent gum diseases."
                image={serviceImage1}
                icon="dentistry"
              />
              <ServiceCard 
                title="Dental Implants"
                description="Permanent solution for missing teeth using biocompatible titanium and natural-looking crowns."
                image={serviceImage2}
                icon="clinical_notes"
              />
              <ServiceCard 
                title="Orthodontics"
                description="Advanced braces and clear aligners (Invisalign) to correct bite issues and straighten your smile."
                image={serviceImage3}
                icon="health_and_safety"
              />
            </div>
          </div>
        </section>

        {/* Patient Testimonials */}
        <section className="py-12 md:py-16 px-6 lg:px-10 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-primary mb-3 md:mb-4 font-bold">Patient Testimonials</h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto px-4">Hear from our patients about their journey to a healthier, brighter smile at PureDent.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <TestimonialCard 
                quote="PureDent transformed my smile and my confidence. The process was seamless and painless."
                name="Sarah J."
                role="Patient"
                image={testimonialImage1}
              />
              <TestimonialCard 
                quote="The most professional dental experience I've ever had. The technology they use is truly next-level."
                name="Michael R."
                role="Patient"
                image={testimonialImage2}
              />
              <TestimonialCard 
                quote="Friendly staff and a beautiful clinic. I actually look forward to my dental visits now!"
                name="Elena K."
                role="Patient"
                initials="EK"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection variant="primary" />
      </main>

      <Footer />
    </div>
  );
}