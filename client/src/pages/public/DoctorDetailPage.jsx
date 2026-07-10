import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { 
  NavBar, 
  Footer, 
  CTASection,
  Icon
} from '../../components/SharedComponents';
import { fetchDoctorById } from '../../api/doctorsApi';

export default function DoctorDetailPage() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    setLoading(true);
    setNotFound(false);
    setImgError(false);

    fetchDoctorById(doctorId)
      .then((data) => {
        if (isMounted) setDoctor(data);
      })
      .catch(() => {
        if (isMounted) setNotFound(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [doctorId]);

  if (loading) {
    return (
      <div className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
        <NavBar />
        <main className="pt-24 pb-16">
          <div className="text-center py-24">
            <p className="text-on-surface-variant">Loading doctor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !doctor) {
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
              <p className="text-xl text-secondary font-semibold">{doctor.specialty}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Icon name="star" className="text-amber-500" fill />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-on-surface-variant">({doctor.reviews} reviews)</span>
                </div>
                <span className="text-on-surface-variant">|</span>
                <span className="text-on-surface-variant">{doctor.experience}</span>
                {/* Render Price if available */}
                {doctor.price && (
                  <>
                    <span className="text-on-surface-variant">|</span>
                    <span className="font-bold text-primary">${doctor.price} / Consultation</span>
                  </>
                )}
              </div>

              <p className="text-lg text-on-surface-variant leading-relaxed">
                {doctor.bio}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
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
                {!imgError && doctor.photoUrl ? (
                  <img 
                    className="w-full h-[500px] object-cover" 
                    src={doctor.photoUrl} 
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

        {/* Doctor Details Grid */}
        <section className="px-6 lg:px-10 py-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Education Card */}
            <div className="glass-card p-6 rounded-xl flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="school" className="text-primary text-3xl" />
                <h3 className="text-lg font-bold text-primary">Education</h3>
              </div>
              <p className="text-on-surface-variant">{doctor.education}</p>
              {doctor.languages && (
                <div className="mt-4 pt-4 border-t border-on-surface-variant/10">
                  <span className="text-s font-semibold text-secondary uppercase tracking-wider block mb-1">Languages</span>
                  <p className="text-sm text-on-surface-variant">{doctor.languages.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Working Hours Card */}
            <div className="glass-card p-6 rounded-xl flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="schedule" className="text-primary text-3xl" />
                <h3 className="text-lg font-bold text-primary">Working Hours</h3>
              </div>
              <div className="space-y-2">
                {doctor.workingHours && doctor.workingHours.length > 0 ? (
                  doctor.workingHours.map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-on-surface-variant/5 pb-1 last:border-0">
                      <span className="capitalize font-medium text-on-surface-variant">{schedule.day}</span>
                      <span className="text-on-surface font-semibold">{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-on-surface-variant text-sm">Schedule unavailable</p>
                )}
              </div>
              {doctor.slotDurationMinutes && (
                <p className="text-s text-on-surface-variant/70 mt-auto pt-3">
                  * Session duration: {doctor.slotDurationMinutes} mins
                </p>
              )}
            </div>

            {/* Services / Offerings Card */}
            <div className="glass-card p-6 rounded-xl flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="medical_services" className="text-primary text-3xl" />
                <h3 className="text-lg font-bold text-primary">Services Provided</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctor.services && doctor.services.length > 0 ? (
                  doctor.services.map((service, idx) => {
                    // Check if service is a fully populated object or just an ID string
                    const serviceName = typeof service === 'object' ? service.name : `Service Treatment #${idx + 1}`;
                    return (
                      <span key={idx} className="text-xs bg-primary/5 text-primary px-3 py-1.5 rounded-md font-medium">
                        {serviceName}
                      </span>
                    );
                  })
                ) : (
                  <p className="text-on-surface-variant text-sm">General Restorative Treatments</p>
                )}
              </div>
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