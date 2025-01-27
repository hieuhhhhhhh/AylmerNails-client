<template>
  <td>
    <div id="flexBox">
      <input
        type="checkbox"
        :checked="checked[0]"
        @change="onCheckDay(0, $event)"
      />
    </div>
  </td>
  <td>
    <div id="flexBox">
      <input
        type="checkbox"
        :checked="checked[1]"
        @change="onCheckDay(1, $event)"
      />
    </div>
  </td>
  <td>
    <div id="flexBox">
      <input
        type="checkbox"
        :checked="checked[2]"
        @change="onCheckDay(2, $event)"
      />
    </div>
  </td>
  <td>
    <div id="flexBox">
      <input
        type="checkbox"
        :checked="checked[3]"
        @change="onCheckDay(3, $event)"
      />
    </div>
  </td>
  <td>
    <div id="flexBox">
      <input
        type="checkbox"
        :checked="checked[4]"
        @change="onCheckDay(4, $event)"
      />
    </div>
  </td>
  <td>
    <div id="flexBox">
      <input
        type="checkbox"
        :checked="checked[5]"
        @change="onCheckDay(5, $event)"
      />
    </div>
  </td>
  <td>
    <div id="flexBox">
      <input
        type="checkbox"
        :checked="checked[6]"
        @change="onCheckDay(6, $event)"
      />
    </div>
  </td>
</template>
<script>
export default {
  props: {
    checked: Array,
    updateCheck: Function,
  },
  methods: {
    onCheckDay(index, event) {
      this.updateCheck(index, event.target.checked);
    },
  },
};
</script>

<style scoped>
input {
  transform: scale(2);
  margin: 10px;
  box-sizing: border-box;
}
#flexBox {
  display: flex;
  justify-content: center;
}
</style>
