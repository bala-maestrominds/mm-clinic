// ---------------------------------------------------------------------------
// Fixed admin credentials.
// For a real production deployment, move these to environment variables
// and verify them on a backend endpoint instead of in the client bundle.
// Kept here as constants only because the brief asked for a "fixed
// username and password" with no backend-auth requirement.
// ---------------------------------------------------------------------------
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "PureDent@2024";

const SESSION_KEY = "puredent_admin_session";

export function loginAdmin(username, password) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const session = {
      username,
      loggedInAt: Date.now(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) !== null;
}