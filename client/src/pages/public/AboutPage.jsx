// src/pages/public/AboutPage.jsx
import React, { useEffect, useState } from 'react';
import {
  NavBar,
  Footer,
  CTASection,
  ValueCard,
  TeamMemberCard,
  Icon
} from '../../components/SharedComponents';
import { PageTransition } from '../../components/Motion';

// Fallback images
const FALLBACK_IMAGES = {
  hero: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=800&fit=crop",
  story: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
  tech: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=800&fit=crop",
  team1: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
  team2: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop",
  team3: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop"
};

// Original images
const heroImage = "https://lh3.googleusercontent.com/aida/AP1WRLtZe2s0pyx_LJYzOQxTf66EHKOfvmMa7dkstdBziv4KGvE9a9PdjfgcO1u7zmA3665FDlUdxj8KxJxU8D1ruk6_ElFK8Hmwn4XIHpeY9Kjt0S0PJLPJKA1LT-2inNfC2ygo6oImRC31T5R6vm4JHXCMVTpqfbWDhpGEU3oEN-6UUtNp-xtuNdgeA7PXNRMvGkV8GQbD68vXNg5AYfeT_mY9rGE9AZiLBtpmhc4BY2k226JVFrUb7jH0qPM";
const storyImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCpMecPSEpkYR1y9NQhxpkYd2R1skTcdhTNkC2pgE46YZKOgL5N754R8-j8ooPIkeC8QpTh6UklAuMaxQ5BaNljeakn7JBMeYAjIEbeSnK3MKETxfJUIqVaNJhe3SlpcNsw978vaMXdWudKt_iAwznLyaZ0AhM8U3462sdx5047N9S5n399MR2RZW-I1W9V987EXXDAqLme-pcrhSFJKdle80OkzUOj5XwN6Lv7vjLbS0iYfUZTHsbQ";
const techImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC1uTp5nXuOS3ByR4RXHMDd2lHnQOh_YAzQsqVvnl9-zb34Z9ZOQP_7PsrRdB38qG4DDheVBCXRpKeUKjj1DBdaB1-UlQUrIFJvzvXBT576mWIzaWr3ackxHpaKAPOTZocO4-gSq2_UQthdu7EW9jl_VHjpNN8e5RHtWOR2o4RZa_swLVDA6wYulsgPuQ_lz1GoWUlnUEhKhjGSdDm8PRVkRFE3PGAL8_3CYG1kX7d5HRnn5XsePF8P";
const teamImage1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDSVFLtTQFYG82O71YupVukFC5wt5v9saZiReN7Il8tO7P7taqg__9gBElsks9o5d1AZFgbXE42oXv4ti2r-YgEIEr1jeyMv4rQqGQsQwOvqeicFAYM2EN1VnRo3uGKI9zp8bfNuvLT-vAs-fr7pYIEl7bnXC5J_XXhJ4L7gC5b6JleRe4FL5kkW77PgCLgYIJYGfn1W68Q_C1_H2KvPjCfvFf8bpKNlo8C-G91yMaxOEhVbzsBGr7n";
const teamImage2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuAVqN6rafuy-1psKjTG9L42HqBXsTt8C2f4FuyhXqkK7tIZg07ev72vtgAekmuWowUeNxkjIvJl5eQ6iX9WBz9GINFaE9kIT3hOzYr4VRzdviQEp7_5SVPsmJuqJVJxdV5v5HMHoEqXq_9hizChVGSZkb-wtf0bKF0_62V32ZOeW9b-c4X36G6Hmkw5pedxyZ0JxzrCrul-mOTIZykORIeSp1rGFcCjkzoXCO5oMJCe659YkK2OasO3";
const teamImage3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDFexumFSx9FR7g4ZeDL-K9j4wmb3pryeAKDPlY16FT0_VCU3ey4qKpVatALbYR13lLes40O24FL4kO3JJ1EltHcOGzsWkuoBWHN2UIWD1Zb2tNRku9_zTugvoRVZ8D2gZJUWcs58s-A-3bD6gFdNIJyK3DIowu1Zfo-PBMJZGqUrK8k3S4Blhhw4eDp-Pej1GWSaMd_GgW38CtumneDW-8A7-w_Zn6HjJ0HbvAoD9B6BURuJSMsHz0";

export default function AboutPage() {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (imageKey) => {
    setImageErrors(prev => ({
      ...prev,
      [imageKey]: true
    }));
  };

  const getImageSrc = (imageKey, originalSrc) => {
    if (imageErrors[imageKey]) {
      return FALLBACK_IMAGES[imageKey] || originalSrc;
    }
    return originalSrc;
  };

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

    document.querySelectorAll('.reveal-section').forEach((section) => {
      section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <NavBar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="PureDent Premium Clinic Interior"
              className="w-full h-full object-cover"
              src={getImageSrc('hero', heroImage)}
              onError={() => handleImageError('hero')}
            />
            <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/60 to-transparent" />
          </div>
          <div className="relative z-10 px-6 lg:px-10 max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-2 bg-primary-container text-white-container rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Setting the Standard
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                Clinical Precision. <br />
                <span className="text-secondary">Human Connection.</span>
              </h1>
              <p className="text-lg text-on-surface-variant mb-8">
                Experience the next generation of dental care in an environment designed for ultimate tranquility and technological excellence.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-primary text-white rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:-translate-y-1">
                  Explore Our Tech <Icon name="arrow_forward" className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-16 px-6 lg:px-10 reveal-section">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${getImageSrc('story', storyImage)})` }}
                  onError={() => handleImageError('story')}
                />
                <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-2xl border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-xl p-4 md:p-6">
                  <p className="text-lg md:text-xl font-bold text-primary">15+ Years</p>
                  <p className="text-xs md:text-sm text-on-surface-variant">of Excellence in Dentistry</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Our Story</h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                PureDent was founded with a singular vision: to bridge the gap between advanced medical technology and personalized patient experiences. What began as a boutique clinic in 2008 has evolved into a leading center for comprehensive oral health.
              </p>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Our journey has been defined by a commitment to continuous learning and the adoption of minimally invasive techniques. Every treatment plan at PureDent is as unique as the patients we serve, ensuring that care is always precise, comfortable, and sustainable.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-secondary">12,000+</div>
                  <p className="text-sm text-on-surface-variant">Happy Smiles Created</p>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-secondary">98%</div>
                  <p className="text-sm text-on-surface-variant">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-surface-container-low px-6 lg:px-10 reveal-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">Our Core Values</h2>
              <p className="text-sm md:text-base text-on-surface-variant mx-auto">
                The pillars that guide our practice, ensuring every interaction reflects our dedication to your health.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ValueCard
                icon="verified"
                title="Excellence"
                description="We strive for perfection in every procedure, utilizing the highest medical standards."
                iconBg="secondary-container"
              />
              <ValueCard
                icon="favorite"
                title="Compassion"
                description="Care that understands. We prioritize your comfort and peace of mind above all else."
                iconBg="primary-container/10"
              />
              <ValueCard
                icon="lightbulb"
                title="Innovation"
                description="Constantly evolving with the latest digital dentistry tools and methodologies."
                iconBg="tertiary-fixed"
              />
              <ValueCard
                icon="gavel"
                title="Integrity"
                description="Transparent communication and honest treatment plans you can trust implicitly."
                iconBg="surface-container-highest"
              />
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-12 md:py-16 px-6 lg:px-10 overflow-hidden reveal-section">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-wider">
                <Icon name="precision_manufacturing" className="text-sm" />
                Future-Ready Dentistry
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">State-of-the-Art Technology</h2>
              <p className="text-sm md:text-base text-on-surface-variant">
                We invest in the future of your oral health. Our clinic is equipped with a full suite of digital tools that reduce appointment times and increase accuracy.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Icon name="check_circle" className="text-secondary" />
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-primary">3D Cone Beam CT</p>
                    <p className="text-sm text-on-surface-variant">Precise imaging for complex implant and surgical planning.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Icon name="check_circle" className="text-secondary" />
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-primary">Digital Intraoral Scanners</p>
                    <p className="text-sm text-on-surface-variant">No more messy molds—just comfortable, high-precision digital impressions.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square relative rounded-full overflow-hidden border-16 border-surface-container p-2 bg-surface-container">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={getImageSrc('tech', techImage)}
                  onError={() => handleImageError('tech')}
                  alt="Advanced dental technology"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-16 bg-surface px-6 lg:px-10 reveal-section">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-12xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">Meet Our Leadership</h2>
                <p className="text-sm md:text-base text-on-surface-variant">
                  A team of dedicated professionals committed to your oral health and aesthetic goals. Led by world-class specialists with over 30 years of combined experience.
                </p>
              </div>
              <button className="text-xs md:text-sm font-semibold text-primary flex items-center gap-2 hover:underline">
                View All Specialists <Icon name="trending_flat" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <TeamMemberCard
                name="Dr. Julian Vance"
                role="Chief Medical Officer"
                description="Specializing in Full Mouth Reconstructive Surgery and Advanced Implantology."
                image={getImageSrc('team1', teamImage1)}
                alt="Dr. Julian Vance - Chief Medical Officer"
              />
              <TeamMemberCard
                name="Dr. Sarah Sterling"
                role="Lead Aesthetic Dentist"
                description="Expert in Aesthetic Veneers, Smile Design, and Digital Orthodontics."
                image={getImageSrc('team2', teamImage2)}
                alt="Dr. Sarah Sterling - Lead Aesthetic Dentist"
              />
              <TeamMemberCard
                name="Dr. Michael Chen"
                role="Specialist Surgeon"
                description="Focused on Laser Dentistry and Minimally Invasive Surgical Techniques."
                image={getImageSrc('team3', teamImage3)}
                alt="Dr. Michael Chen - Specialist Surgeon"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection variant="about" />
      </main>

      <Footer />
    </PageTransition>
  );
}