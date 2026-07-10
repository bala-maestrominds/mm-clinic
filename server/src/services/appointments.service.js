import { Appointment } from '../models/appointments.model.js';
import { Doctor } from '../models/doctors.model.js';
import { Service } from '../models/services.model.js';
import { ApiError } from '../utils/ApiError.js';
import {
  generateAppointmentCode,
  signAppointmentCode,
  verifyAppointmentToken,
  generateQrDataUrl,
  generateAppointmentPdf,
} from '../utils/appointmentTicket.js';
import { createTransporter, buildAppointmentEmail } from '../utils/mailer.js';

async function createUniqueCode() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const code = generateAppointmentCode();
    // eslint-disable-next-line no-await-in-loop
    const existing = await Appointment.exists({ appointmentCode: code });
    if (!existing) return code;
  }
  throw new ApiError(500, 'Could not generate a unique booking code, please try again.');
}

async function assertSlotIsFree(doctorId, date, time, excludeId = null) {
  const query = {
    doctor: doctorId,
    date,
    time,
    status: { $ne: 'Cancelled' },
  };
  if (excludeId) query._id = { $ne: excludeId };

  const clash = await Appointment.findOne(query);
  if (clash) {
    throw new ApiError(409, 'This time slot has just been booked. Please choose another slot.');
  }
}

async function createAppointment(payload) {
  const { doctorId, serviceId, date, time } = payload;

  const [doctor, service] = await Promise.all([
    Doctor.findById(doctorId),
    Service.findById(serviceId),
  ]);

  if (!doctor || !doctor.isActive) throw new ApiError(404, 'Selected doctor is not available.');
  if (!service) throw new ApiError(404, 'Selected service was not found.');

  await assertSlotIsFree(doctorId, date, time);

  const appointmentCode = await createUniqueCode();
  const verificationToken = signAppointmentCode(appointmentCode);

  const appointment = await Appointment.create({
    appointmentCode,
    verificationToken,
    doctor: doctor._id,
    doctorName: doctor.name,
    doctorSpecialty: doctor.specialty,
    service: service._id,
    serviceName: service.name,
    servicePrice: service.priceFrom || 0,
    serviceDurationMinutes: service.durationMinutes || 30,
    date,
    time,
    patientName: payload.patientName.trim(),
    patientEmail: payload.patientEmail.trim().toLowerCase(),
    patientPhone: payload.patientPhone.trim(),
    patientAge: payload.patientAge ?? null,
    patientGender: payload.patientGender || '',
    notes: payload.notes?.trim() || '',
    paymentMethod: payload.paymentMethod || 'Pay at Clinic',
    amount: service.priceFrom || 0,
    // No real payment gateway is wired up yet -- appointments booked with "Pay at
    // Clinic" stay pending, other methods are treated as paid at booking time.
    paymentStatus: payload.paymentMethod && payload.paymentMethod !== 'Pay at Clinic' ? 'paid' : 'pending',
  });

  const qrCodeDataUrl = await generateQrDataUrl(appointment);

  // Email delivery must never block/fail the booking itself -- if SMTP isn't
  // configured or the send fails, the appointment is still confirmed and the
  // patient can still view/download the ticket from the confirmation screen.
  let emailSent = false;
  try {
    await sendAppointmentEmail(appointment);
    emailSent = true;
    appointment.emailSent = true;
    appointment.emailSentAt = new Date();
    await appointment.save();
  } catch (err) {
    console.error('[appointments] failed to send confirmation email:', err.message);
  }

  return { appointment, qrCodeDataUrl, emailSent };
}

async function sendAppointmentEmail(appointment) {
  const transporter = createTransporter();
  const { subject, text, html } = buildAppointmentEmail(appointment);
  const pdfBuffer = await generateAppointmentPdf(appointment);

  await transporter.sendMail({
    from: `"PureDent Clinic" <${process.env.GMAIL_USER}>`,
    to: appointment.patientEmail,
    replyTo: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
    subject,
    text,
    html,
    attachments: [
      {
        filename: `${appointment.appointmentCode}-ticket.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}

async function getAppointmentById(id) {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw new ApiError(404, 'Appointment not found');
  return appointment;
}

async function listAppointments({ status, date, search, doctorId } = {}) {
  const query = {};
  if (status && status !== 'All') query.status = status;
  if (date) query.date = date;
  if (doctorId) query.doctor = doctorId;
  if (search) {
    const re = new RegExp(search.trim(), 'i');
    query.$or = [{ patientName: re }, { doctorName: re }, { appointmentCode: re }, { patientEmail: re }];
  }
  return Appointment.find(query).sort({ createdAt: -1 });
}

async function updateAppointmentStatus(id, status) {
  const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!appointment) throw new ApiError(404, 'Appointment not found');
  return appointment;
}

async function verifyAppointment({ code, token }) {
  const appointment = await Appointment.findOne({ appointmentCode: code.trim().toUpperCase() });
  if (!appointment) throw new ApiError(404, 'No appointment found for this QR code.');

  const isValid = verifyAppointmentToken(appointment.appointmentCode, token);
  if (!isValid) throw new ApiError(400, 'This QR code could not be verified.');

  if (appointment.status === 'Cancelled') {
    throw new ApiError(400, 'This appointment has been cancelled.');
  }

  return appointment;
}

async function checkInAppointment(id) {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw new ApiError(404, 'Appointment not found');

  if (appointment.status === 'Cancelled') {
    throw new ApiError(400, 'This appointment has been cancelled.');
  }
  if (appointment.checkInStatus === 'checked_in') {
    throw new ApiError(409, `Patient already checked in at ${appointment.checkedInAt.toLocaleString()}.`);
  }

  appointment.checkInStatus = 'checked_in';
  appointment.checkedInAt = new Date();
  if (appointment.status === 'Confirmed' || appointment.status === 'Pending') {
    appointment.status = 'In-Progress';
  }
  await appointment.save();
  return appointment;
}

async function getAppointmentPdf(id) {
  const appointment = await getAppointmentById(id);
  const buffer = await generateAppointmentPdf(appointment);
  return { buffer, appointment };
}

export const appointmentsService = {
  createAppointment,
  getAppointmentById,
  listAppointments,
  updateAppointmentStatus,
  verifyAppointment,
  checkInAppointment,
  getAppointmentPdf,
};