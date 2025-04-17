<template>
  <div>{{ chain }}</div>

  <div id="duo">
    <button class="orangeBtn" id="leftBtn" @click="onBack">
      <FontAwesomeIcon :icon="backIcon" /> Back
    </button>
    <button class="greenBtn" id="rightBtn" @click="onSubmit">
      Finish <FontAwesomeIcon :icon="continueIcon" />
    </button>
  </div>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLeftLong, faCheck } from "@fortawesome/free-solid-svg-icons";
// lib
import submitAppoChain from "../apis/submitAppoChain";

export default {
  props: {
    chain: Object,
    date: Number,
    onReturn: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      backIcon: faLeftLong,
      continueIcon: faCheck,
    };
  },
  methods: {
    onBack() {
      this.onReturn();
    },
    async onSubmit() {
      const res = await submitAppoChain(this.chain, this.date);
      console.log(res);
    },
  },
};
</script>
<style scoped>
#duo {
  display: flex;
  gap: 5px;
  width: 90%;
  justify-content: flex-end;
}

#rightBtn {
  padding: 10px;
  font-size: 25px;
}
#leftBtn {
  font-size: 23px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
</style>