import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

const url = import.meta.env.VITE_URL_HOST;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    rol: null
  }),
  actions: {
    setTokens(accessToken, refreshToken, role) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.rol = role;
    },
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
      this.rol = null;
    },
    async refreshTokenStore() {
      const router = useRouter();
      try {
        const response = await axios.post(`${url}/api/auth/refresh`, null, {
          headers: {
            'Authorization': `Bearer ${this.getRefreshToken}`
          }
        });

        if (response.status == 201) {
          this.setTokens(response.data.accessToken, response.data.refreshToken, response.data.roles[0]);
        }
      } catch (error) {
        console.log(error);
        this.clearTokens();
        router.push('/login');
      }
    }
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    getRol: (state) => state.rol,
    isAuthenticated: (state) => !!state.accessToken,
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'auth-store',
      },
    ],
  },
});