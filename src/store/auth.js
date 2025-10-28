import { defineStore } from "pinia";
import { DEMO_CREDENTIALS, STORAGE_KEYS } from "../utils/constants";
import { validateAuthForm } from "../utils/validation";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION)) || null,
  }),
  actions: {
    login(email, password) {
      const validation = validateAuthForm(email, password);
      if (!validation.isValid) {
        return { success: false, message: Object.values(validation.errors)[0] };
      }

      if (email === DEMO_CREDENTIALS.EMAIL && password === DEMO_CREDENTIALS.PASSWORD) {
        const mockUser = { email, token: "fake_token_123" };
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(mockUser));
        this.user = mockUser;
        return { success: true };
      }

      return { success: false, message: "Invalid email or password" };
    },

    register(email, password) {
      const validation = validateAuthForm(email, password);
      if (!validation.isValid) {
        return { success: false, message: Object.values(validation.errors)[0] };
      }

      const mockUser = { email, token: "fake_token_123" };
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(mockUser));
      this.user = mockUser;
      return { success: true };
    },

    logout() {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      this.user = null;
    },
  },
});
