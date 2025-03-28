<template>
  <table>
    <tbody>
      <tr>
        <th colspan="2">
          <div id="title">
            <div>{{ userInfo.firstName }} {{ userInfo.lastName }}</div>
            <div>
              <Drawer :onEditName="onEditName" />
            </div>
          </div>
        </th>
      </tr>
      <tr>
        <th>Contact Name:</th>
        <td>{{ userInfo.contactName }}</td>
      </tr>
      <tr>
        <th>Phone Number:</th>
        <td>{{ formatPhone(userInfo.phoneNum) }}</td>
      </tr>
      <tr>
        <th>Joined on:</th>
        <td>
          {{ unixToReadable(userInfo.birth) }}
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
    :onFinish="onNameUpdated"
  />
</template>

<script>
// lib
import { ref } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import formatPhone from "@/lib/formatPhone";

// comp
import Drawer from "./drawer/Parent.vue";
import NameEdit from "./NameEdit.vue";
import { useRouter } from "vue-router";

export default {
  props: {
    userInfo: Object,
  },
  components: {
    Drawer,
    NameEdit,
  },
  setup() {
    // lib
    const router = useRouter();
    // status
    const isEditingName = ref(false);

    // INPUT
    const onEditName = () => {
      isEditingName.value = true;
    };

    const onNameUpdated = () => {
      isEditingName.value = false;
      router.push("/refresh");
    };

    const onNotEditName = () => {
      isEditingName.value = false;
    };

    return {
      isEditingName,
      onEditName,
      onNotEditName,
      onNameUpdated,
      unixToReadable,
      formatPhone,
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
  display: flex;
  font-size: 30px;
  gap: 60px;
}
</style>