<template>
  <input type="date" id="datePicker" :value="date" @change="onSelect" />
</template>
<script>
import parseDate from "@/lib/parseDate";
import parseUT from "@/lib/parseUT";

export default {
  props: {
    unixDate: Number,
    onInputDate: Function,
  },
  data() {
    return {
      // outcome
      date: null,
    };
  },
  methods: {
    onSelect(event) {
      this.date = event.target.value;
      this.onInputDate(parseDate(this.date));
    },
  },
  created() {
    console.log("unix: ", this.unixDate);
    this.date = parseUT(this.unixDate);
    console.log("date: ", this.date);
  },
};
</script>

<style scoped>
#datePicker {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
}
</style>