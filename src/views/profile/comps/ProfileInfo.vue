<template>
  <table>
    <tbody>
      <tr>
        <th id="title" colspan="2">
          {{ userInfo.firstName }} {{ userInfo.lastName }}
        </th>
        <Drawer :onEditName="onEditName" />
      </tr>
      <tr>
        <th>Contact Name:</th>
        <td>{{ userInfo.contactName }}</td>
      </tr>
      <tr>
        <th>Phone Number:</th>
        <td>{{ userInfo.phoneNum }}</td>
      </tr>
      <tr>
        <th>Joined on:</th>
        <td>
          {{ userInfo.birth }}
        </td>
      </tr>
      <tr>
        <th>Role:</th>
        <td>
          {{ userInfo.role }}
        </td>
      </tr>
    </tbody>
  </table>
  <NameEdit
    v-if="isEditingName"
    :userInfo="userInfo"
    :onCancel="onNotEditName"
  />
</template>

<script>
// lib
import { ref } from "vue";
// comp
import Drawer from "./Drawer.vue";
import NameEdit from "./NameEdit.vue";

export default {
  props: {
    userInfo: Object,
  },
  components: {
    Drawer,
    NameEdit,
  },
  setup() {
    // status
    const isEditingName = ref(false);

    // INPUT
    const onEditName = () => {
      isEditingName.value = true;
    };

    const onNotEditName = () => {
      isEditingName.value = false;
    };

    return {
      isEditingName,
      onEditName,
      onNotEditName,
    };
  },
};
</script>

<style scoped>
th,
td {
  padding: 10px;
  text-align: left;
}
#title {
  font-size: 30px;
}
</style>