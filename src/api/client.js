const API_BASE = process.env.REACT_APP_API_URL || "";

export async function api(path, options = {}) {
  const { body, headers, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const getProperties = (params = {}) => {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ""))
  ).toString();
  return api(`/api/properties${query ? `?${query}` : ""}`);
};

export const getProperty = (id) => api(`/api/properties/${id}`);
export const getPosts = (params = {}) => {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ""))
  ).toString();
  return api(`/api/posts${query ? `?${query}` : ""}`);
};
export const getPost = (slug) => api(`/api/posts/${slug}`);
export const createInquiry = (body) => api("/api/inquiries", { method: "POST", body });
export const recordTour = (body) => api("/api/tours", { method: "POST", body });
export const register = (body) => api("/api/auth/register", { method: "POST", body });
export const login = (body) => api("/api/auth/login", { method: "POST", body });
export const logout = () => api("/api/auth/logout", { method: "POST" });
export const getMe = () => api("/api/auth/me");
export const getInquiries = () => api("/api/inquiries");
export const updateInquiry = (id, status) => api(`/api/inquiries/${id}`, { method: "PUT", body: { status } });
export const getAnalytics = () => api("/api/analytics");
