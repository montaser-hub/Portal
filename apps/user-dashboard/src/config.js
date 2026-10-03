// Deployment settings, read from Vite env vars (see .env.example).
// Local defaults match `nx serve api` and the Angular admin dev server.

/** Base URL of the SmartShift API, without a trailing slash. */
export const API_URL = (
  import.meta.env.VITE_POTRAL_API_URL || 'http://localhost:3000/api/v1'
).replace(/\/$/, '');

/** Where the "Setting" link sends admins and managers: the Angular admin portal. */
export const ADMIN_PORTAL_URL =
  import.meta.env.VITE_ADMIN_PORTAL_URL || 'http://localhost:4200';
