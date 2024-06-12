import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  email: '',
  password: '',
  authres: {},
  setEmail: (email) => {
    set(() => ({ email }));
  },
  setPassword: (password) => {
    set(() => ({ password }));
  },
  setAuthRes: (authres) => {
    set(() => ({ authres }));
  },
  clearAll: () => {
    set(() => ({
      email: '',
      password: '',
      authres: {},
    }));
  },
}));

export const useOnboarding = create((set) => ({
  onboarding: true,
  setOnboarding: (state) => {
    set(() => ({ onboarding: state }));
  },
}));
