<template>
  <form @submit.prevent="onSubmit">
    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: 80%" />
      </colgroup>
      <tbody>
        <tr>
          <th>Name:</th>
          <td>
            <div id="flexBox">
              <input
                type="text"
                v-model="name"
                required
                @input="name = $event.target.value.toUpperCase()"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="greenBtn">
      <FontAwesomeIcon :icon="saveIcon" /> <b>Confirm New Category</b>
    </button>
  </form>
</template>

<script>
// comps
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// lib
import addCategory from "./apis/addCategory";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      saveIcon: faCheck,
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
input {
  width: 100%;
}
th,
td {
  padding: 10px;
  text-align: left;
}
#flexBox {
  display: flex;
}
</style>