<template>
  <td>
    <input
      type="time"
      :value="times[0]"
      @input="onInputTime(0, $event)"
      :disabled="times[0] == null || disabled"
      required
    />
  </td>
  <td>
    <input
      type="time"
      :value="times[1]"
      @input="onInputTime(1, $event)"
      :disabled="times[1] == null || disabled"
      required
    />
  </td>
  <td>
    <input
      type="time"
      :value="times[2]"
      @input="onInputTime(2, $event)"
      :disabled="times[2] == null || disabled"
      required
    />
  </td>
  <td>
    <input
      type="time"
      :value="times[3]"
      @input="onInputTime(3, $event)"
      :disabled="times[3] == null || disabled"
      required
    />
  </td>
  <td>
    <input
      type="time"
      :value="times[4]"
      @input="onInputTime(4, $event)"
      :disabled="times[4] == null || disabled"
      required
    />
  </td>
  <td>
    <input
      type="time"
      :value="times[5]"
      @input="onInputTime(5, $event)"
      :disabled="times[5] == null || disabled"
      required
    />
  </td>
  <td>
    <input
      type="time"
      :value="times[6]"
      @input="onInputTime(6, $event)"
      :disabled="times[6] == null || disabled"
      required
    />
  </td>
</template>
<script>
export default {
  props: {
    times: Array,
    setTime: Function,
    disabled: Boolean,
  },
  methods: {
    onInputTime(index, event) {
      this.setTime(index, event.target.value);
    },
  },
};
</script>
<style scoped>
input {
  font-family: Arial, Helvetica, sans-serif;
  width: 100px;
  padding-inline: 0;
}
</style>