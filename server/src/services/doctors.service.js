import { Doctor } from '../models/doctors.model.js';
import { ApiError } from '../utils/ApiError.js';

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

async function listDoctors({ includeInactive = false, specialty } = {}) {
  const filter = {};
  if (!includeInactive) filter.isActive = true;
  if (specialty) filter.specialty = specialty;

  return Doctor.find(filter).sort({ name: 1 });
}

async function getDoctorById(id) {
  const doctor = await Doctor.findById(id).populate('services', 'name slug');
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  return doctor;
}

async function createDoctor(data) {
  return Doctor.create(data);
}

async function updateDoctor(id, data) {
  const doctor = await Doctor.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  return doctor;
}

async function deactivateDoctor(id) {
  const doctor = await Doctor.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  return doctor;
}

async function getAvailability(doctorId, dateStr) {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  if (!doctor.isActive) throw new ApiError(400, 'Doctor is not currently accepting bookings');

  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) throw new ApiError(400, 'Invalid date');

  const dayName = DAY_NAMES[date.getDay()];
  const windows = doctor.workingHours.filter((w) => w.day === dayName);

  if (windows.length === 0) return [];

  const slots = [];
  const duration = doctor.slotDurationMinutes || 30;

  for (const window of windows) {
    let cursor = timeToMinutes(window.startTime);
    const end = timeToMinutes(window.endTime);

    while (cursor + duration <= end) {
      slots.push(minutesToTime(cursor));
      cursor += duration;
    }
  }

  return slots;
}

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = String(Math.floor(mins / 60)).padStart(2, '0');
  const m = String(mins % 60).padStart(2, '0');
  return `${h}:${m}`;
}

export const doctorsService = {
  listDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deactivateDoctor,
  getAvailability,
};
