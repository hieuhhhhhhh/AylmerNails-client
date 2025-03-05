<template>
  <div v-for="(AOS, parentIndex) in AOSs" :key="parentIndex">
    <div id="title">
      <button
        class="redBtn"
        id="smallBtn"
        @click.prevent="removeQuestion(parentIndex)"
      >
        <FontAwesomeIcon :icon="removeIcon" /></button
      >&nbsp; <b>Question {{ parentIndex + 1 }} </b>:
      <input
        id="prompt"
        type="text"
        :value="AOS.prompt"
        @input="onInputQuestion(parentIndex, $event.target.value)"
        required
      />
    </div>
    <table border="1">
      <thead>
        <tr>
          <th>Option</th>
          <th>Length Increase (minutes) <br /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(option, index) in AOS.options" :key="index">
          <td>
            <div id="flexBox">
              <button
                class="redBtn"
                id="smallBtn"
                v-if="index > 0"
                @click.prevent="removeOption(parentIndex, index)"
              >
                <FontAwesomeIcon :icon="removeIcon" /></button
              >&nbsp;
              <input
                id="nameInput"
                type="text"
                :value="option.name"
                @input="onInputOption(parentIndex, index, $event)"
                required
              />
            </div>
          </td>
          <td>
            <input
              type="number"
              :value="option.length_offset / 60"
              @input="onInputLength(parentIndex, index, $event)"
              required
              step="1"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button
              class="orangeBtn"
              id="smallBtn"
              @click.prevent="addOption(parentIndex)"
            >
              <FontAwesomeIcon :icon="plusIcon" /> More Option
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="note">
      *'Length Increase' can be negative to indicate decrement
    </div>
    <br />
  </div>
  <div>
    <button class="orangeBtn" @click.prevent="addQuestion">
      <FontAwesomeIcon :icon="plusIcon" /> Start New Question
    </button>
  </div>
  <br />
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default {
  props: {
    AOSs: Object,
    editAOS: Function,
    removeOption: Function,
    addOption: Function,
    addQuestion: Function,
    removeQuestion: Function,
    onInputQuestion: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      plusIcon: faPlus,
      removeIcon: faTrashCan,
    };
  },
  methods: {
    onInputLength(parentIndex, index, event) {
      this.editAOS(
        parentIndex,
        index,
        "length_offset",
        event.target.value * 60
      );
    },
    onInputOption(parentIndex, index, event) {
      this.editAOS(parentIndex, index, "name", event.target.value);
    },
  },
};
</script>

<style scoped>
#flexBox {
  display: flex;
}
#nameInput {
  flex: 1;
}
#prompt {
  flex: 1;
  margin-left: 10px;
}
#note {
  color: rgb(184, 121, 3);
}
#title {
  font-size: 17px;
  padding: 5px;
  display: flex;
  width: 100%;
}
#smallBtn {
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
}
table {
  border-collapse: collapse; /* or separate */
}
input {
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: left;
}
</style>
