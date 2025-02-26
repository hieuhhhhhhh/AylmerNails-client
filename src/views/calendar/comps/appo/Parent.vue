<template>
  <div id="parent">
    <div id="background" @click="onCloseAppo" />
    <div id="window" :style="{ backgroundColor: details.color }">
      <button @click="onCloseAppo" id="closeBtn" class="redBtn">X</button>
      <div id="content">
        <AppoInfo :details="details" />
      </div>

      <div id="flexBox">
        <button class="btn" @click="onEditAppo(appoId)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
// lib
import { onMounted, ref, watch } from "vue";
import fetchAppoDetails from "../../apis/fetchAppoDetails";
// comp
import AppoInfo from "./AppoInfo.vue";

export default {
  name: "AppoDetails",
  components: {
    AppoInfo,
  },
  props: {
    appoId: Number,
    onCloseAppo: Function,
    onEditAppo: Function,
  },
  setup(props) {
    // resources
    const details = ref({});

    // apis
    const fetchDetails = async () => {
      details.value = await fetchAppoDetails(props.appoId);
      console.log("details.value", details.value);
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

    return { details };
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
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
  border: 1px solid black;
}
#content {
  padding: 20px;
  margin-top: 15px;
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
table {
  text-align: left;
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid black;

  padding: 5px;
  text-align: left;
}
.btn {
  background-color: white;
  padding: 2px;
  padding-inline: 10px;
}
#flexBox {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-bottom: 10px;
}

#saveBtn {
  color: green;
}
</style>
