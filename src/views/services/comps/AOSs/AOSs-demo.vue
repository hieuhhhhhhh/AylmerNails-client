<template>
  <div v-for="(AOS, index) in AOSs" :key="index">
    <div id="title">{{ index + 1 }}. {{ AOS.prompt }}</div>
    <table border="1">
      <thead>
        <tr>
          <th>Answer</th>
          <th>Length Increase (minutes) <br /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(option, index) in AOS.options" :key="index">
          <td>{{ option.name }}</td>
          <td>{{ option.length_offset / 60 }}</td>
          <!-- Correct use of parseSeconds -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    AOSs: Object,
  },
};
</script>

<style scoped>
#note {
  color: rgb(184, 121, 3);
}
#title {
  font-size: 17px;
  padding: 5px;
}
table {
  border-collapse: collapse;
  max-width: 100vw;
}

th,
td {
  padding: 10px;
  text-align: left;
}
</style>
