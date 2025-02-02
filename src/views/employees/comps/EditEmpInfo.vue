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
        <th>
          Ideal Percentage:<br />
          (should be > 40)
        </th>
        <td id="flexBox">
          <input
            type="number"
            :value="interval_percent"
            @change="onInputIntervalPercent"
            required
            :min="10"
            :max="100"
            step="1"
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
    // products
    alias: String,
    last_date: String,
    interval_percent: Number,
    // setters
    setAlias: Function,
    setLastDate: Function,
    setIntervalPercent: Function,
  },
  methods: {
    onInputAlias(event) {
      this.setAlias(event.target.value);
    },
    onInputLastDate(event) {
      this.setLastDate(event.target.value);
    },
    onInputIntervalPercent(event) {
      this.setIntervalPercent(event.target.value);
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