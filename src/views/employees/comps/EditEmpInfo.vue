<template>
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
        <th>Color:</th>
        <td id="flexBox">
          <select
            v-model="colorId_"
            @change="onInputColor"
            :style="{ backgroundColor: getColor(), color: 'black' }"
            required
          >
            <option
              v-for="color in colors"
              :key="color.colorId"
              :value="color.colorId"
              :style="{ backgroundColor: color.code, color: 'black' }"
            >
              {{ color.name }}
            </option>
          </select>
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
        <td colspan="2">
          <div id="note">*Ideal Lengths are not editable</div>
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
import fetchColors from "../apis/fetchColors.js";

export default {
  props: {
    // outcome
    alias: String,
    colorId: Number,
    last_date: String,
    interval_percent: Number,
    // setters
    setAlias: Function,
    setColorId: Function,
    setLastDate: Function,
    setIntervalPercent: Function,
  },
  data() {
    return {
      // resources
      colorId_: this.colorId,
      colors: [],
    };
  },
  methods: {
    getColor() {
      const selected = this.colors.find(
        (color) => color.colorId === this.colorId_
      );
      return selected ? selected.code : "gray";
    },
    onInputAlias(event) {
      this.setAlias(event.target.value);
    },
    onInputLastDate(event) {
      this.setLastDate(event.target.value);
    },
    onInputIntervalPercent(event) {
      this.setIntervalPercent(event.target.value);
    },
    onInputColor(event) {
      this.setColorId(Number(event.target.value));
    },
  },
  async created() {
    this.colors = await fetchColors();
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
  color: rgb(184, 121, 3);
}
</style>