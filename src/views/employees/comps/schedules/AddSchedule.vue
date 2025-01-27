<template>
  <div id="note">*Press on the right clock icon to select time</div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sar</th>
        <th>Sun</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Open</td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
      </tr>
      <tr>
        <td>Close</td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
            min="1"
          />
        </td>
        <td id="flexBox">
          <input
            type="time"
            :value="defaultLength"
            @input="onInputDefaultLength"
            required
          />
        </td>
      </tr>
    </tbody>
  </table>

  <button v-if="!isAdding" class="blueBtn" @click="openInput">
    <FontAwesomeIcon :icon="plusIcon" /> Add New Schedule
  </button>
  <div v-else id="duo">
    <button class="redBtn" @click.prevent="closeInput">
      <FontAwesomeIcon :icon="cancelIcon" /> Cancel
    </button>
    <button class="greenBtn" type="submit">
      <FontAwesomeIcon :icon="saveIcon" /> Add
    </button>
  </div>
</template>


<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default {
  props: {
    serviceId: String,
  },
  components: {
    FontAwesomeIcon,
  },

  data() {
    return {
      // icons
      plusIcon: faPlus,
      cancelIcon: faCancel,
      saveIcon: faCheck,
      // status
      isAdding: false,
    };
  },
  methods: {
    openInput() {
      this.isAdding = true;
    },
    closeInput() {
      this.isAdding = false;
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
input {
  font-family: Arial, Helvetica, sans-serif;
  width: 100px;
  padding-inline: 0;
}
#note {
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>
