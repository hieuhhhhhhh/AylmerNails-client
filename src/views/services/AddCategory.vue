<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      v-model="name"
      required
      @input="name = $event.target.value.toUpperCase()"
      placeholder="Category Name"
    />
    <button class="greenBtn">
      <FontAwesomeIcon :icon="saveIcon" /> <b>Add Category</b>
    </button>
  </form>
</template>

<script>
// comps
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// lib
import addCategory from "./apis/addCategory";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      saveIcon: faPlus,
      // products
      name: "",
    };
  },
  methods: {
    async onSubmit() {
      const res = await addCategory(this.name);
      if (res) {
        this.$router.push("/services");
      }
    },
  },
};
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
input {
  width: 300px;
  padding: 6px 10px;
  width: 250px;
}
</style>