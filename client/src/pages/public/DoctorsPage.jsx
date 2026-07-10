// src/pages/public/DoctorsPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  NavBar, 
  Footer, 
  Icon
} from '../../components/SharedComponents';
import { DoctorCard, DoctorFilterBar } from '../../components/DoctorComponents';
import { doctorsData, getSpecializations, filterDoctors } from '../../data/doctorsData';

export default function DoctorsPage() {
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const specializations = getSpecializations();

  useEffect(() => {
    const filtered = filterDoctors(selectedSpecialization, searchTerm);
    setFilteredDoctors(filtered);
  }, [selectedSpecialization, searchTerm]);

  const handleSpecializationChange = (spec) => {
    setSelectedSpecialization(spec);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <NavBar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 lg:px-10 py-8 md:py-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container/30 text-on-secondary-container rounded-full">
                <Icon name="verified" className="text-sm" />
                <span className="text-xs font-semibold">World-Class Specialists</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                Meet Our Expert <br />Specialists
              </h1>
              <p className="text-lg text-on-surface-variant">
                Our team of board-certified dental professionals is dedicated to providing clinical precision and compassionate care for your lifelong smile.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl"></div>
              <div className="glass-card rounded-card overflow-hidden shadow-2xl relative">
                <img 
                  className="w-full h-[300px] object-cover" 
                  alt="PureDent Dental Team" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEvp3vn5WDgUqo2U-CdZrzdSFWGH8uaHzi8jKcwKVJO02QDzA6Iod2lU3yNdqEa-UQEz3Ihd_qQRWDX4t0Ohcpjh-q-0_KskA11vLoV094VYAEPl-JfEE7tS6rE3TKKW6t_ZLAqwweQUyU01oqxVMegKxkU8dLByqR28sWrchLEb07W4hnwxeq2Ih7JytMtSzeteRqVR0kwYk-3AGBKoN6NSHlWCwlGMsV1-cLVdqqIzWoSEsFuuBF"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="px-6 lg:px-10 mb-8 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto">
            <DoctorFilterBar 
              specializations={specializations}
              selectedSpecialization={selectedSpecialization}
              onSpecializationChange={handleSpecializationChange}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              totalCount={filteredDoctors.length}
            />
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="px-6 lg:px-10 max-w-7xl mx-auto">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="search" className="text-6xl text-primary/30 mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">No Doctors Found</h3>
              <p className="text-on-surface-variant">Try adjusting your filters or search term</p>
              <button 
                onClick={() => {
                  setSelectedSpecialization('All Specializations');
                  setSearchTerm('');
                }}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="mt-12 px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="glass-card bg-primary-container p-8 lg:p-12 rounded-card flex flex-col md:flex-row items-center justify-between gap-6 text-on-primary-container overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl"></div>
            <div className="space-y-4 relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold">Can't find the right specialist?</h2>
              <p className="text-base text-on-primary-container/80">Talk to our care coordinators for a personalized recommendation based on your unique dental needs.</p>
            </div>
            <div className="flex flex-wrap gap-4 relative z-10">
              <Link to="/contact" className="bg-surface-container-lowest text-primary px-6 py-3 rounded-full text-xs font-semibold hover:shadow-lg transition-all">
                Chat Now
              </Link>
              <Link to="/contact" className="border border-on-primary-container/30 text-on-primary-container px-6 py-3 rounded-full text-xs font-semibold hover:bg-white/10 transition-all">
                Call +1-800-PURE-DENT
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}