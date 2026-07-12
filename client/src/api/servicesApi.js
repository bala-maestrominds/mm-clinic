import { API_BASE_URL } from "../utils/api.js";

const BASE = `${API_BASE_URL}/api/services`;

async function handle(res) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = Array.isArray(json.details) && json.details.length
      ? json.details.map((d) => d.message).join(", ")
      : json.error || `Request failed: ${res.status}`;
    throw new Error(message);
  }
  return json.data;
}

export async function fetchServices(category) {
  const url = new URL(BASE);
  if (category && category !== "All") url.searchParams.set("category", category);
  const res = await fetch(url);
  return handle(res);
}

export async function fetchServiceById(id) {
  const res = await fetch(`${BASE}/${id}`);
  return handle(res);
}

// `payload` may include an `imageFile` (File object) alongside plain fields.
function toFormData(payload) {
  const fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === "imageFile") {
      if (value) fd.append("image", value);
      return;
    }
    if (value === undefined || value === null) return;
    fd.append(key, value);
  });
  return fd;
}

export async function createService(payload) {
  const res = await fetch(BASE, {
    method: "POST",
    body: toFormData(payload),
  });
  return handle(res);
}

export async function updateService(id, payload) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    body: toFormData(payload),
  });
  return handle(res);
}

export async function deleteService(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || `Request failed: ${res.status}`);
  }
  return true;
}
