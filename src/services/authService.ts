import { LoginCredentials, RegisterCredentials } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ token: string; user: any }> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await response.json();

    const { token, user } = data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  },

  async register(
    credentials: RegisterCredentials
  ): Promise<{ token: string; user: any }> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }
    const data = await response.json();

    const { token, user } = data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  },

  getToken(): { token: string | null; user: any | null } {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  },

  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};
