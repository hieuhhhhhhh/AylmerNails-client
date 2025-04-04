<template>
  <table>
    <tbody>
      <tr>
        <th colspan="2">
          <div id="title">
            <div>{{ info.firstName }} {{ info.lastName }}</div>
            <div>
              <Drawer :onEditName="onEditName" />
            </div>
          </div>
        </th>
      </tr>
      <tr>
        <th>Client Name:</th>
        <td>{{ info.contactName }}</td>
      </tr>
      <tr>
        <th>Phone Number:</th>
        <td>{{ formatPhone(info.phoneNum) }}</td>
      </tr>
      <tr>
        <th>Joined on:</th>
        <td>
          {{ unixToReadable(info.birth) }}
        </td>
      </tr>
      <tr>
        <th>Role:</th>
        <td>
          {{ info.role }}
        </td>
      </tr>
      <tr>
        <th>Note:</th>
        <td>
          {{ info.notes }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import unixToReadable from "@/lib/unixToReadable";
import formatPhone from "@/lib/formatPhone";
import Drawer from "./drawer/Parent.vue";

export default {
  props: {
    info: Object,
  },
  components: { Drawer },
  setup() {
    return {
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