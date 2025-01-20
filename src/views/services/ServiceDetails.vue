<template>
  <div>This is details of {{ service_id }}</div>
</template>
<script>
export default {
  data() {
    return {
      service_id: null,
    };
  },
  created() {
    this.service_id = this.$route.params.id;
  },
};
</script>
