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

export const useNotificationCount = defineStore("NotificationCount", {
  state: () => ({
    newAppoCount: 0,
    newCanceledAppoCount: 0,
    newUserCount: 0,
    newSavedCount: 0,
    newBlacklistCount: 0,
  }),
  actions: {
    setNewAppoCount(count) {
      this.newAppoCount = count;
    },
    setNewCanceledAppoCount(count) {
      this.newCanceledAppoCount = count;
    },
    setNewUserCount(count) {
      this.newUserCount = count;
    },
    setNewSavedCount(count) {
      this.newSavedCount = count;
    },
    setNewBlacklistCount(count) {
      this.newBlacklistCount = count;
    },
  },
});

export const useFooterReact = defineStore("footerReact", {
  state: () => ({
    react_key: 0,
  }),
  actions: {
    triggerReact() {
      this.react_key++;
    },
  },
});

export const useRequestError = defineStore("requestError", {
  state: () => ({
    msg: "",
  }),
  actions: {
    setMessage(value) {
      this.msg = value;
    },
    reset() {
      this.msg = "";
    },
  },
});
