const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function fetchDoctors(specialty) {
  const url = new URL(`${API_BASE_URL}/api/doctors`);
  if (specialty && specialty !== 'All Specializations') {
    url.searchParams.set('specialty', specialty);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch doctors');
  const json = await res.json();

  if (Array.isArray(json)) return json;
  if (Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.doctors)) return json.doctors;

  throw new Error('Unexpected response shape from /doctors');
}

export async function fetchDoctorById(id) {
  const res = await fetch(`${API_BASE_URL}/api/doctors/${id}`);
  if (!res.ok) throw new Error('Failed to fetch doctor');
  const json = await res.json();

  if (json && json._id) return json;
  if (json && json.data) return json.data;
  if (json && json.doctor) return json.doctor;

  throw new Error('Unexpected response shape from /doctors/:id');
}