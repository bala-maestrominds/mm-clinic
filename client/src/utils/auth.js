const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

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