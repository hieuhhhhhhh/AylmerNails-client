<template>
  <button @click="handleClose">Close</button>
  <div>{{ AOSs }}</div>
</template>
<script>
import fetchAOSs from "../apis/fetchAOSs";

export default {
  props: {
    serviceId: Number,
    onClose: Function,
    onInputAOSOs: Function,
  },
  data() {
    return {
      // resource
      AOSs: [],
      // outcome
      AOSOs: [],
    };
  },
  methods: {
    onSubmit() {
      this.onInputAOSOs(this.AOSOs);
    },
    handleClose() {
      this.onClose();
    },
  },
  async created() {
    this.AOSs = await fetchAOSs(this.serviceId);
  },
};
</script>
