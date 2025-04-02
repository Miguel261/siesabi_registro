import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => ({
    id: null
  }),
  actions: {
    setID(id) {
      this.id = id;
    },
    clearID() {
      this.id = null;
    }
  },
  getters: {
    getID: (state) => state.id,
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'user-store',
      },
    ],
  },
});