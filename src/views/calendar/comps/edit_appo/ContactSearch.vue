<template>
  <div>
    <div id="flexBox">
      <input
        type="text"
        v-model="query"
        @input="onSearch"
        placeholder="Search..."
      />
    </div>

    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: auto" />
      </colgroup>
      <tbody v-if="contacts.length">
        <tr>
          <th>Contact Name</th>

          <th>Phone Number</th>
          <th>Last Used</th>
        </tr>
        <tr
          class="row"
          v-for="(contact, index) in contacts"
          :key="index"
          @click="onClickContact(contact.phoneNum, contact.name)"
        >
          <td>{{ contact.name }}</td>
          <td>{{ formatPhone(contact.phoneNum) }}</td>

          <td>{{ unixTimeToReminder(contact.lastUsed) }}</td>
        </tr>
      </tbody>
      <th v-else>No Results</th>
    </table>
  </div>
</template>
<script>
// lib
import { ref, watch } from "vue";
import searchContacts from "../../apis/searchContacts";
import formatPhone from "@/lib/formatPhone";
import unixTimeToReminder from "@/lib/unixTimeToReminder";

export default {
  props: {
    _query: String,
    onSelectContact: Function,
  },
  setup(props) {
    // payload
    const query = ref("");
    // outcome
    const contacts = ref([]);

    // APIS
    const onSearch = async () => {
      contacts.value = await searchContacts(query.value);
    };

    // INPUT
    const onClickContact = (phoneNum, contactName) => {
      props.onSelectContact(phoneNum, contactName);
    };

    // DEPENDENCIES
    watch(
      () => props._query,
      async (value) => {
        query.value = value;
        await onSearch();
      }
    );

    return {
      query,
      contacts,
      onSearch,
      onClickContact,
      formatPhone,
      unixTimeToReminder,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: center;
  padding: 10px;
  padding-inline: 5px;
}
tr {
  border: 1px solid;
}
.row {
  cursor: pointer;
}
.row:hover {
  background: var(--hover);
}
.row:active {
  background: var(--active);
}
#flexBox {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>