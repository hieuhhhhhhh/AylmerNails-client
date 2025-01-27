<template>
  <div id="note">*Intervals are not editable</div>
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
        <th>Interval:</th>
        <td>
          <input
            type="number"
            :value="interval1"
            @input="onInputInterval1"
            required
          />
        </td>
      </tr>
      <tr>
        <th>
          Other Interval: <br />
          (Optional)
        </th>
        <td>
          <input type="number" :value="interval2" @input="onInputInterval2" />
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
    intervals: Array,
    last_date: String,
    // setters
    setAlias: Function,
    setIntervals: Function,
    setLastDate: Function,
  },
  data() {
    return {
      // states
      interval1: null,
      interval2: null,
    };
  },
  methods: {
    onInputAlias(event) {
      this.setAlias(event.target.value);
    },
    onInputLastDate(event) {
      this.setLastDate(event.target.value);
    },
    onInputInterval1(event) {
      this.interval1 = event.target.value;
      this.setIntervals([this.interval1, this.interval2]);
    },
    onInputInterval2(event) {
      this.interval2 = event.target.value;
      if (!this.interval2) {
        this.interval2 = null;
      }
      this.setIntervals([this.interval1, this.interval2]);
    },
  },
  created() {
    this.interval1 = this.intervals[0];
    if (this.intervals[1] != this.interval1) {
      this.interval2 = this.intervals[1];
    }
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
#duo {
  display: flex;
  gap: 15px;
}
</style>