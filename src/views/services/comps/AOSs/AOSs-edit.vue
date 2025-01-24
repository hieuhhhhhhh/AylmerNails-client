<template>
  <div v-for="(AOS, parentIndex) in AOSs" :key="parentIndex">
    <div id="title">
      <b>Question {{ parentIndex }} </b>:
      <input id="prompt" type="text" :value="AOS.prompt" required />
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
            <input
              type="text"
              :value="option.name"
              @input="onInputOption(parentIndex, index, $event)"
              required
            />
          </td>
          <td>
            <input
              type="number"
              :value="option.length_offset / 60"
              @input="onInputLength(parentIndex, index, $event)"
              required
              min="1"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div id="note">
      *'Length Increase' can be negative to indicate decrement
    </div>
    <br />
  </div>
</template>
<script>
export default {
  props: {
    AOSs: Object,
    editAOS: Function,
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
#prompt {
  flex: 1;
  margin-left: 10px;
}
#note {
  font-style: italic;
  color: rgb(184, 121, 3);
}
#title {
  font-size: 17px;
  padding: 5px;
  display: flex;
  width: 100%;
}
table {
  border-collapse: collapse;
  max-width: 100vw;
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
