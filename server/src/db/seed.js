import { connectDB } from '../config/db.js';
import { Service } from '../models/services.model.js';
import { Doctor } from '../models/doctors.model.js'
import mongoose from 'mongoose';

async function seed() {
  await connectDB();

  await Service.deleteMany({});
  await Doctor.deleteMany({});

  const services = await Service.insertMany([
    {
      name: 'Dental Implants',
      slug: 'dental-implants',
      category: 'Surgical',
      shortDescription: 'Permanent tooth replacement with a natural look and feel.',
      description: 'Titanium dental implants that replace missing teeth with a strong, natural-looking solution.',
      priceFrom: 1200,
      durationMinutes: 90,
    },
    {
      name: 'Teeth Whitening',
      slug: 'teeth-whitening',
      category: 'Cosmetic',
      shortDescription: 'Professional in-office whitening for a brighter smile.',
      description: 'Professional whitening treatment that removes stains and brightens teeth by several shades.',
      priceFrom: 250,
      durationMinutes: 45,
    },
    {
      name: 'Routine Cleaning',
      slug: 'routine-cleaning',
      category: 'General',
      shortDescription: 'Standard cleaning and dental examination.',
      description: 'Routine cleaning removes plaque, tartar, and helps prevent gum disease.',
      priceFrom: 80,
      durationMinutes: 30,
    },
    {
      name: 'Root Canal Treatment',
      slug: 'root-canal-treatment',
      category: 'Surgical',
      shortDescription: 'Save infected teeth without extraction.',
      description: 'Removes infected pulp, disinfects canals, and restores the tooth.',
      priceFrom: 450,
      durationMinutes: 90,
    },
    {
      name: 'Dental Crown',
      slug: 'dental-crown',
      category: 'General',
      shortDescription: 'Restore damaged teeth with durable crowns.',
      description: 'Custom ceramic crowns restore strength, function, and appearance.',
      priceFrom: 650,
      durationMinutes: 75,
    },
    {
      name: 'Dental Veneers',
      slug: 'dental-veneers',
      category: 'Cosmetic',
      shortDescription: 'Transform your smile with porcelain veneers.',
      description: 'Thin porcelain shells placed over teeth for a beautiful smile makeover.',
      priceFrom: 900,
      durationMinutes: 120,
    },
    {
      name: 'Braces Consultation',
      slug: 'braces-consultation',
      category: 'General',
      shortDescription: 'Comprehensive orthodontic assessment.',
      description: 'Consultation to evaluate bite alignment and recommend treatment options.',
      priceFrom: 100,
      durationMinutes: 40,
    },
    {
      name: 'Invisalign',
      slug: 'invisalign',
      category: 'Cosmetic',
      shortDescription: 'Clear aligners for teeth straightening.',
      description: 'Custom clear aligners designed to gradually straighten teeth.',
      priceFrom: 2800,
      durationMinutes: 60,
    },
    {
      name: 'Tooth Extraction',
      slug: 'tooth-extraction',
      category: 'Surgical',
      shortDescription: 'Safe removal of damaged or impacted teeth.',
      description: 'Simple and surgical tooth extraction procedures with local anesthesia.',
      priceFrom: 200,
      durationMinutes: 45,
    },
    {
      name: 'Pediatric Dental Checkup',
      slug: 'pediatric-dental-checkup',
      category: 'General',
      shortDescription: 'Comprehensive dental care for children.',
      description: 'Routine dental examination, cleaning, and preventive treatments for children.',
      priceFrom: 90,
      durationMinutes: 30,
    },
    {
      name: 'Emergency Dental Care',
      slug: 'emergency-dental-care',
      category: 'Surgical',
      shortDescription: 'Immediate treatment for dental emergencies.',
      description: 'Emergency care for severe tooth pain, broken teeth, infections, and trauma.',
      priceFrom: 180,
      durationMinutes: 60,
    },
    {
      name: 'Deep Teeth Cleaning',
      slug: 'deep-teeth-cleaning',
      category: 'General',
      shortDescription: 'Advanced cleaning for healthier gums.',
      description: 'Deep scaling and root planing to treat gum disease and maintain oral health.',
      priceFrom: 350,
      durationMinutes: 60,
    },
    {
      name: 'Smile Makeover Consultation',
      slug: 'smile-makeover-consultation',
      category: 'Cosmetic',
      shortDescription: 'Personalized smile enhancement consultation.',
      description: 'Comprehensive consultation to create a customized cosmetic dentistry treatment plan.',
      priceFrom: 150,
      durationMinutes: 45,
    },
    {
      name: 'Dental Filling',
      slug: 'dental-filling',
      category: 'General',
      shortDescription: 'Repair cavities using tooth-colored fillings.',
      description: 'Composite fillings restore decayed teeth while maintaining a natural appearance.',
      priceFrom: 120,
      durationMinutes: 40,
    },
    {
      name: 'Wisdom Tooth Removal',
      slug: 'wisdom-tooth-removal',
      category: 'Surgical',
      shortDescription: 'Removal of impacted wisdom teeth.',
      description: 'Surgical extraction of wisdom teeth to prevent pain and future complications.',
      priceFrom: 500,
      durationMinutes: 90,
    },
  ]);

  await Doctor.insertMany([
    {
      name: 'Dr. Sarah Chen',
      specialty: 'Orthodontist',
      bio: '12+ years specializing in orthodontics and smile transformations.',
      services: [services[6]._id, services[7]._id, services[1]._id],
      workingHours: [
        { day: 'monday', startTime: '09:00', endTime: '17:00' },
        { day: 'wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'friday', startTime: '09:00', endTime: '14:00' },
      ],
      slotDurationMinutes: 30,
    },
    {
      name: 'Dr. James Okafor',
      specialty: 'General Dentist',
      bio: 'Expert in preventive dentistry and family dental care.',
      services: [
        services[2]._id,
        services[10]._id,
        services[8]._id,
      ],
      workingHours: [
        { day: 'tuesday', startTime: '10:00', endTime: '18:00' },
        { day: 'thursday', startTime: '10:00', endTime: '18:00' },
        { day: 'saturday', startTime: '09:00', endTime: '13:00' },
      ],
      slotDurationMinutes: 30,
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Cosmetic Dentist',
      bio: 'Passionate about creating beautiful smiles using modern cosmetic dentistry.',
      services: [
        services[1]._id,
        services[5]._id,
        services[4]._id,
      ],
      workingHours: [
        { day: 'monday', startTime: '11:00', endTime: '18:00' },
        { day: 'tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'thursday', startTime: '09:00', endTime: '17:00' },
      ],
      slotDurationMinutes: 45,
    },
    {
      name: 'Dr. Michael Johnson',
      specialty: 'Oral Surgeon',
      bio: 'Experienced oral surgeon performing complex surgical procedures.',
      services: [
        services[0]._id,
        services[8]._id,
        services[3]._id,
      ],
      workingHours: [
        { day: 'wednesday', startTime: '08:00', endTime: '16:00' },
        { day: 'friday', startTime: '08:00', endTime: '16:00' },
      ],
      slotDurationMinutes: 60,
    },
    {
      name: 'Dr. Olivia Brown',
      specialty: 'Pediatric Dentist',
      bio: 'Dedicated to providing comfortable dental care for children.',
      services: [
        services[9]._id,
        services[2]._id,
      ],
      workingHours: [
        { day: 'monday', startTime: '09:00', endTime: '15:00' },
        { day: 'wednesday', startTime: '09:00', endTime: '15:00' },
        { day: 'friday', startTime: '09:00', endTime: '15:00' },
      ],
      slotDurationMinutes: 30,
    },
    {
      name: 'Dr. Ahmed Hassan',
      specialty: 'Periodontist',
      bio: 'Specialist in gum health, periodontal surgery, and dental implants.',
      services: [
        services[11]._id,
        services[0]._id,
        services[4]._id,
      ],
      workingHours: [
        { day: 'tuesday', startTime: '08:30', endTime: '16:30' },
        { day: 'thursday', startTime: '08:30', endTime: '16:30' },
      ],
      slotDurationMinutes: 45,
    },
    {
      name: 'Dr. Sophia Williams',
      specialty: 'Endodontist',
      bio: 'Root canal specialist with advanced microscopic treatment techniques.',
      services: [
        services[3]._id,
        services[4]._id,
      ],
      workingHours: [
        { day: 'monday', startTime: '10:00', endTime: '17:00' },
        { day: 'friday', startTime: '10:00', endTime: '17:00' },
      ],
      slotDurationMinutes: 60,
    },
  ]);

  console.log('[seed] done: 3 services, 2 doctors created');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
