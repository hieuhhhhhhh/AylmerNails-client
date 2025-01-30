<template>
  <div id="bar">
    <div id="card">
      <div id="flexBox">
        <span id="name">{{ name }}</span>

        <span id="item"> <FontAwesomeIcon :icon="dollarIcon" /> 60+</span>
        <span id="item"
          ><FontAwesomeIcon :icon="timeIcon" /> {{ length / 60 }}m+</span
        >
      </div>
      <div id="des">{{ description }}</div>
    </div>
    <div>
      <button class="redBtn" @click="onRemoveService(serviceId)">
        <FontAwesomeIcon :icon="removeIcon" />
      </button>
    </div>
  </div>
</template>
<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faClock,
  faDollarSign,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
// library
import fetchServicePreview from "../../apis/fetchServicePreview";

export default {
  name: "Service-",
  props: {
    serviceId: Number,
    deselectService: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      timeIcon: faClock,
      dollarIcon: faDollarSign,
      removeIcon: faTrashCan,
      // products
      name: "",
      description: "",
      length: "",
    };
  },
  methods: {
    onRemoveService(serviceId) {
      this.deselectService(serviceId);
    },
  },
  async created() {
    const preview = await fetchServicePreview(this.serviceId);
    this.name = preview.name;
    this.description = preview.description;
    this.length = preview.length;
  },
};
</script>

<style scoped>
#bar {
  display: flex;
  align-items: center;
}
#card {
  box-shadow: 0 0 5px var(--shadow-color);
  max-width: 90vw;
  padding: 10px;
  margin: 3px;
  width: 350px;
  border-radius: 5px;
  background-color: var(--background-i2);
  box-sizing: border-box;
  height: fit-content;
}
#name {
  font-weight: bold;
  font-size: 23px;
  flex: 2;
}

#flexBox {
  display: flex;
  align-items: center;
}
#item {
  flex: 1;
  text-align: right;
}
#des {
  margin-top: 3px;
  padding-inline: 10px;
}
</style>
