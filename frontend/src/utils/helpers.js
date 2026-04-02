// Auth utilities
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// API utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiCall = async (endpoint, options = {}) => {
  const token = getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeTokens();
      window.location.href = "/login";
    }
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};

// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const getPasswordStrength = (password) => {
  if (!password) return "weak";
  if (password.length < 6) return "weak";
  if (password.length < 10) return "medium";
  if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
    return "strong";
  }
  return "medium";
};

// Toast utilities
export const showToast = (message, type = "info") => {
  const event = new CustomEvent("showToast", {
    detail: { message, type },
  });
  window.dispatchEvent(event);
};
