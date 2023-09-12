export const API_BASE_URL = "http://127.0.0.1:8000/api";
export const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const authHeaders = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};
