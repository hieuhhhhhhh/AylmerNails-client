<template>
  <div id="services">
    <Menu
      :options="[
        {
          text: 'All services',
          path: '/services/all',
        },
        {
          text: 'New service',
          path: '/services/add_service',
        },
        {
          text: 'New category',
          path: '/services/add_service',
        },
      ]"
      :getTitle="getTitle"
    />
    <router-view />
  </div>
</template>

<script>
import fetchCategorizedServices from "./apis/fetchCategorizedServices";
import Menu from "./comps/menu/Parent.vue";

export default {
  name: "Layout-",
  components: {
    Menu,
  },
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    this.categories = await fetchCategorizedServices();
  },
  methods: {
    getTitle(path) {
      switch (path) {
        case "/services/all":
          return "Services // All";

        case "/services/add_service":
          return "Services // Add New Service";

        case "/services/add_category":
          return "Services // Add New Category";

        default:
          return "Services";
      }
    },
  },
};
</script>

<style scoped>
#services {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
}
#cateContainer {
  margin: auto;
  padding: 5px;
  width: fit-content;
}
</style>