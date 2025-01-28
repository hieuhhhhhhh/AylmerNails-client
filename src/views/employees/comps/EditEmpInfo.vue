<template>
  <div id="note">*Ideal Lengths are not editable</div>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: 80%" />
    </colgroup>
    <tbody>
      <tr>
        <th>Name:</th>
        <td id="flexBox">
          <input
            id="textInput"
            type="text"
            :value="alias"
            @input="onInputAlias"
            required
          />
        </td>
      </tr>
      <tr>
        <th>Available Until:</th>
        <td>
          <input
            id="date"
            type="date"
            :value="last_date"
            @change="onInputLastDate"
          />
        </td>
      </tr>
      <tr>
        <th>Services:</th>
      </tr>
    </tbody>
  </table>
  <br />
</template>

<script>
export default {
  props: {
    // states
    alias: String,
    last_date: String,
    // setters
    setAlias: Function,
    setLastDate: Function,
  },
  methods: {
    onInputAlias(event) {
      this.setAlias(event.target.value);
    },
    onInputLastDate(event) {
      this.setLastDate(event.target.value);
    },
  },
};
</script>


<style scoped>
table {
  text-align: left;
}
th,
td {
  padding: 10px;
  text-align: left;
}

#note {
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>