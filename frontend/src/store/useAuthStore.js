import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js'; // Corrected import statement

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.error("Error in checking authentication:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },
    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
          const response = await axiosInstance.post('/auth/signup', formData);
          set({ authUser: response.data, isSigningUp: false });
        } catch (error) {
          console.error('Failed to sign up:', error);
          set({ isSigningUp: false });
        }
      },
}));