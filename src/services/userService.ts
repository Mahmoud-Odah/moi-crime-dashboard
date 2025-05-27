import { User } from '../types/user';
import { authService } from './authService';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const getHeaders = () => {
  const {token} = authService.getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(API_URL, {
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        data,
      };
    }

    return data;
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        data,
      };
    }

    return data;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        data,
      };
    }

    return data;
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const data = await response.json();
      throw {
        status: response.status,
        data,
      };
    }
  },
};
