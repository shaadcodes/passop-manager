import type {
  AuthResponse,
  PasswordEntry,
  SuccessResponse,
} from "../types/interfaces";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = localStorage.getItem("passop_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;

    const rawText = await response.text();

    try {
      const errorData = JSON.parse(rawText);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      if (rawText) {
        errorMessage = rawText.trim();
      }
    }
    throw new Error(errorMessage);
  }

  const data = await response.text();
  return data ? (JSON.parse(data) as T) : ({} as T);
}

export const passopAPI = {
  register: async (
    email: string,
    password: string,
  ): Promise<SuccessResponse> => {
    return fetchAPI<SuccessResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const data = await fetchAPI<AuthResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!data.token) {
      throw new Error("Authentication failed: Invalid credentials");
    }

    localStorage.setItem("passop_token", data.token);
    return data;
  },

  logout: (): void => {
    localStorage.removeItem("passop_token");
  },

  getPasswords: (): Promise<PasswordEntry[]> =>
    fetchAPI<PasswordEntry[]>("/passwords", {
      method: "GET",
    }),

  addPassword: (
    websiteName: string,
    websiteUrl: string,
    username: string,
    encryptedPassword: string,
    notes: string,
  ): Promise<SuccessResponse> =>
    fetchAPI<SuccessResponse>("/passwords", {
      method: "POST",
      body: JSON.stringify({
        website_name: websiteName,
        website_url: websiteUrl,
        username,
        encrypted_password: encryptedPassword,
        notes,
      }),
    }),

  updatePassword: (
    id: string,
    updateData: Partial<PasswordEntry>,
  ): Promise<SuccessResponse> =>
    fetchAPI<SuccessResponse>(`/passwords/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    }),

  deletePassword: (id: string): Promise<SuccessResponse> =>
    fetchAPI<SuccessResponse>(`/passwords/${id}`, {
      method: "DELETE",
    }),
};
