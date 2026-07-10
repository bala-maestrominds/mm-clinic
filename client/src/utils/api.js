// src/utils/api.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || `Request failed: ${res.status}`);
  }
  return json.data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

// Resolves a possibly-relative photo/image path (e.g. "/uploads/x.jpg") returned
// by the backend into a full URL the <img> tag can load.
export function resolveAssetUrl(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

// Adapts a backend Service document into the shape ServicesPage / ServiceDetailPage
// / ServiceDetailComponents already expect (built against the old static servicesData.js).
export function adaptService(svc) {
  return {
    id: svc.slug || svc._id,
    _id: svc._id,
    title: svc.name,
    category: svc.category,
    description: svc.shortDescription || svc.description,
    longDescription: svc.description,
    image: resolveAssetUrl(svc.imageUrl) || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop',
    price: svc.priceFrom ? `$${svc.priceFrom}` : 'Contact us',
    duration: svc.durationMinutes ? `${svc.durationMinutes} mins` : '',
  };
}

// Adapts a backend Doctor document into the shape DoctorCard / DoctorDetailPage
// already expect (they were built against the old static doctorsData.js).
export function adaptDoctor(doc) {
  return {
    id: doc._id,
    name: doc.name,
    specialization: doc.specialty,
    rating: 5.0,
    reviews: 0,
    experience: doc.experienceYears ? `${doc.experienceYears} Years Experience` : "Experienced",
    education: doc.email || "PureDent Clinic",
    languages: ["English"],
    image: resolveAssetUrl(doc.photoUrl),
    bio: doc.bio || "A dedicated member of the PureDent team.",
    available: doc.isActive !== false,
  };
}