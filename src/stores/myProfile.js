import { defineStore } from "pinia";

export const useMyProfile = defineStore("myProfile", {
  state: () => ({
    token: null,
    role: null,
  }),
  actions: {
    setMyProfile({ token, role }) {
      this.token = token;
      this.role = role;
    },
    clearMyProfile() {
      this.token = null;
      this.role = null;
    },
  },
});

export const useNewAppoCount = defineStore("newAppoCount", {
  state: () => ({
    newAppoCount: 0,
  }),
  actions: {
    setNewAppoCount(count) {
      this.newAppoCount = count;
    },
  },
});
