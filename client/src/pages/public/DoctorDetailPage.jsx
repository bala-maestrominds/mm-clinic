// src/pages/public/DoctorDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { 
  NavBar, 
  Footer, 
  CTASection,
  Icon
} from '../../components/SharedComponents';
import { getDoctorById } from '../../data/doctorsData';

export default function DoctorDetailPage() {
  const { doctorId } = useParams();
  const doctor = getDoctorById(doctorId);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [doctorId]);

  if (!doctor) {
    return <Navigate to="/doctors" replace />;
  }

  return (
    <div className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <NavBar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 lg:px-10 py-8 md:py-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container/30 text-on-secondary-container rounded-full">
                <Icon name="verified" className="text-sm" />
                <span className="text-xs font-semibold">World-Class Specialist</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                {doctor.name}
              </h1>
              <p className="text-xl text-secondary font-semibold">{doctor.specialization}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Icon name="star" className="text-amber-500" fill />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-on-surface-variant">({doctor.reviews} reviews)</span>
                </div>
                <span className="text-on-surface-variant">|</span>
                <span className="text-on-surface-variant">{doctor.experience}</span>
              </div>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {doctor.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/appointment" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                  Book Appointment
                </Link>
                <Link to="/doctors" className="px-8 py-4 border border-primary/20 text-primary rounded-xl font-bold hover:bg-primary/5 transition-all active:scale-95">
                  View All Doctors
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl"></div>
              <div className="glass-card rounded-card overflow-hidden shadow-2xl relative">
                {!imgError ? (
                  <img 
                    className="w-full h-[500px] object-cover" 
                    src={doctor.image} 
                    alt={doctor.name}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-[500px] bg-primary/10 flex items-center justify-center">
                    <div className="text-center text-primary/50">
                      <Icon name="person" className="text-8xl block mb-2" />
                      <span className="text-lg">Photo unavailable</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Doctor Details */}
        <section className="px-6 lg:px-10 py-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl">
              <Icon name="school" className="text-primary text-3xl mb-3" />
              <h3 className="text-lg font-bold text-primary mb-2">Education</h3>
              <p className="text-on-surface-variant">{doctor.education}</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Icon name="schedule" className="text-primary text-3xl mb-3" />
              <h3 className="text-lg font-bold text-primary mb-2">Experience</h3>
              <p className="text-on-surface-variant">{doctor.experience}</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Icon name="language" className="text-primary text-3xl mb-3" />
              <h3 className="text-lg font-bold text-primary mb-2">Languages</h3>
              <p className="text-on-surface-variant">{doctor.languages.join(', ')}</p>
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