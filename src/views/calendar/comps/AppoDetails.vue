<template>
  <div id="parent">
    <div id="background" @click="onCloseAppo" />
    <div id="window" :style="{ backgroundColor: details.color }">
      <button @click="onCloseAppo" id="closeBtn" class="redBtn">X</button>
      <div id="content">{{ details }}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import fetchAppoDetails from "../apis/fetchAppoDetails";

export default {
  name: "AppoDetailsComponent",
  props: {
    appoId: Number,
    onCloseAppo: Function,
  },
  setup(props) {
    // resources
    const details = ref({});

    // apis
    const fetchDetails = async () => {
      details.value = await fetchAppoDetails(props.appoId);
    };

    // lifecycle
    onMounted(fetchDetails);

    // events
    watch(
      () => props.appoId,
      () => {
        fetchDetails();
      }
    );

    return {
      details,
    };
  },
};
</script>

<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
  position: relative;
  z-index: 20;
  width: 500px;
  max-width: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 20px;
  margin-top: 10px;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
}
</style>