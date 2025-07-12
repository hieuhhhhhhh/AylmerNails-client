<template>
  <div id="layout">
    <Menu
      :options="[
        {
          text: 'All',
          path: '/employees/all',
        },
        {
          text: 'New Employee',
          path: '/employees/add_employee',
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
        case "/employees/all":
          return "Employees";

        case "/employees/add_employee":
          return "New Employee";

        default: {
          if (path.includes("/employees/details")) {
            const employee_id = this.$route.params.id;
            return `Employee Details (ID: ${employee_id})`;
          }
          return "Employees";
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