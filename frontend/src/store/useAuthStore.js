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
}));