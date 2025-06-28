<template>
  <div id="layout">
    <Menu
      :options="[
        {
          text: 'All',
          path: '/services/all',
        },
        {
          text: 'New Category',
          path: '/services/add_category',
        },
        {
          text: 'New Service',
          path: '/services/add_service',
        },
      ]"
      :getTitle="getTitle"
    />
    <router-view />
  </div>
</template>

<script>
import Menu from "@/components/menu/Parent.vue";

export default {
  name: "Layout-",
  components: {
    Menu,
  },
  methods: {
    getTitle() {
      const path = this.$route.path;

      switch (path) {
        case "/services/all":
          return "Services";

        case "/services/add_category":
          return "New Category";

        default: {
          if (path.includes("/services/add_service")) {
            return `New Service`;
          }

          if (path.includes("/services/details")) {
            const service_id = this.$route.params.id;
            return `Service Details (ID: ${service_id})`;
          }
          return "Services";
        }
      }
    },
  },
};
</script>

<style scoped>
#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}
</style>