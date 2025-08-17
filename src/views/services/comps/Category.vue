<template>
  <div id="category">
    <div id="top">
      <div class="moveUp" @click="onMoveUp(category.cate_id)">
        <FontAwesomeIcon :icon="faCaretUp" />
      </div>
      <div id="title">
        {{ category.cate_name }}
      </div>
    </div>

    <div
      id="service"
      :class="{ faded: !service.is_active }"
      v-for="(service, index) in category.services"
      :key="index"
      @click="openServiceDetails(service.service_id)"
    >
      {{ service.service_name }}
    </div>

    <div id="flexBox">
      <button class="blueBtn" id="plus" @click="addService(category.cate_id)">
        <FontAwesomeIcon :icon="plusIcon" />
      </button>
      <button
        v-if="!category.services.length"
        class="redBtn"
        id="plus"
        @click="removeCate(category.cate_id)"
      >
        <FontAwesomeIcon :icon="removeIcon" />
      </button>
    </div>
  </div>
</template>

<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faTrashCan,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
// lib
import unixToReadable from "@/lib/unixToReadable";
// apis
import removeCategory from "../apis/removeCategory";
import moveCateUp from "../apis/moveCateUp";

export default {
  name: "Category-",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return { plusIcon: faPlus, removeIcon: faTrashCan, faCaretUp };
  },
  props: {
    category: Object,
  },
  methods: {
    openServiceDetails(service_id) {
      this.$router.push(`/services/details/${service_id}`);
    },
    addService(cate_id) {
      this.$router.push(`/services/add_service/${cate_id}`);
    },
    async removeCate(cate_id) {
      const res = await removeCategory(cate_id);
      if (res) {
        this.$router.push("/services/refresh");
      }
    },
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
    async onMoveUp(cateId) {
      const res = await moveCateUp(cateId);
      if (res) {
        this.$router.push("/services/refresh");
      }
    },
  },
};
</script>

<style scoped>
#plus {
  aspect-ratio: 1;
  width: 30px;
  padding: 0;
  border-radius: 20px;
  margin: 5px;
}
#flexBox {
  border-top: 1px solid var(--xtrans-gray);
  display: flex;
  justify-content: center;
}
#category {
  box-shadow: 0 0 5px var(--shadow-color);
  max-width: 90vw;
  width: 350px;
  border-radius: 5px;
  background-color: var(--background-i2);
  box-sizing: border-box;
  height: fit-content;
}
#top {
  position: relative;
}
#title {
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  box-sizing: border-box;
}
#service {
  padding: 8px;
  padding-inline: 15px;
  font-size: 17px;
  border-top: 1px solid var(--xtrans-gray);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#service:hover {
  background: var(--hover);
}
#service:active {
  background: var(--active);
}
.faded {
  color: gray;
  font-size: 14px;
}
.moveUp {
  position: absolute;
  right: 0;
  font-size: 30px;
  padding-top: 2px;
  padding-inline: 10px;
  cursor: pointer;
}

.moveUp:hover {
  background: var(--hover);
}
.moveUp:active {
  background: var(--active);
}
/* phone view */
@media (orientation: portrait) {
  #service {
    padding: 13px;
  }
  #title {
    padding: 15px;
  }
}
</style>