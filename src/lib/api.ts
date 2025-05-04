import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "../types/user";

const API_BASE_URL = "http://localhost:8001/api";

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as T;
}

// Authentication API
export const authApi = {
  // Register new user
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return handleResponse<RegisterResponse>(response);
  },

  // Login
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    return handleResponse<LoginResponse>(response);
  },
};
