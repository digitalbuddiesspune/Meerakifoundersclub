/** Backend base including `/api/v1` — same convention as main `frontend` app. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "";
