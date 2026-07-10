// src/components/DoctorComponents.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './SharedComponents';

export const DoctorCard = ({ doctor }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="doctor-card group bg-surface-container-lowest rounded-card overflow-hidden shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-500">
      <div className="relative h-64 overflow-hidden">
        {!imgError ? (
          <img 
            className="doctor-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            src={doctor.image} 
            alt={doctor.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <div className="text-center text-primary/50">
              <Icon name="person" className="text-6xl block mb-2" />
              <span className="text-sm">Photo unavailable</span>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
          <Icon name="star" className="text-amber-500 text-sm" fill />
          <span className="text-xs font-semibold text-on-surface">{doctor.rating} ({doctor.reviews})</span>
        </div>
        {!doctor.available && (
          <div className="absolute top-4 left-4 bg-error text-white px-3 py-1 rounded-full text-xs font-semibold">
            Not Available
          </div>
        )}
      </div>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-on-surface">{doctor.name}</h3>
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">{doctor.specialization}</p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Icon name="school" className="text-sm" />
            <span className="text-xs">{doctor.education}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Icon name="schedule" className="text-sm" />
            <span className="text-xs">{doctor.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Icon name="language" className="text-sm" />
            <span className="text-xs">{doctor.languages.join(', ')}</span>
          </div>
        </div>
        <Link 
          to={`/doctors/${doctor.id}`}
          className="w-full block text-center bg-surface-container-high text-primary text-xs font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export const DoctorFilterBar = ({ 
  specializations, 
  selectedSpecialization, 
  onSpecializationChange,
  searchTerm,
  onSearchChange,
  totalCount 
}) => {
  return (
    <div className="glass-card p-4 rounded-xl flex flex-wrap items-center gap-4 border border-primary/10">
      <div className="flex items-center gap-2 pr-4 border-r border-outline-variant/30">
        <Icon name="filter_list" className="text-outline" />
        <span className="text-xs font-semibold text-outline uppercase tracking-wider">Filters</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 flex-1">
        <select 
          className="bg-surface-container-low border-none rounded-full px-4 py-2 text-xs font-semibold text-on-surface-variant focus:ring-2 focus:ring-primary/20 appearance-none min-w-[160px]"
          value={selectedSpecialization}
          onChange={(e) => onSpecializationChange(e.target.value)}
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        <div className="relative flex-1 min-w-[180px]">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm" />
          <input 
            className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-xs font-semibold text-on-surface-variant focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/50" 
            placeholder="Search doctor by name..."
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-on-surface-variant text-xs font-semibold">Showing {totalCount} Specialists</span>
      </div>
    </div>
  );
};