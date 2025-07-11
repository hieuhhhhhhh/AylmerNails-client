<template>
  <div id="flexBox">
    <div id="title">Appointment Confirmed – Thank You</div>
    <div>Customer: {{ formatPhone(customer.phoneNum) }}</div>
    <div id="date">
      {{ unixToReadable(date_) }} ({{ unixTimeToReminder(date_) }})
    </div>
    <div class="slot" v-for="(slot, index) in chain_.slots" :key="index">
      <div class="service">{{ slot.serviceName }}</div>
      <div>
        <FontAwesomeIcon :icon="faClock" />
        {{ secsToHours(slot.start) }} to {{ secsToHours(slot.end) }}
      </div>
      <div>
        <FontAwesomeIcon :icon="faUser" />
        {{ slot.empAliases.join(" / ") }}
      </div>
      <div v-if="slot.message">
        <textarea
          :ref="'textareas'"
          rows="3"
          :value="slot.message"
          @input="onTypeMessage(index, $event)"
          disabled
        ></textarea>
      </div>
    </div>
    <div>
      If you have any questions or need to reschedule, please don’t hesitate to
      contact us!
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

// lib
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import formatPhone from "@/lib/formatPhone";

// PARAMS
const props = defineProps({
  chain: Object,
  date: Number,
  onClearForm: Function,
  customer: Object,
});

// RESOURCES
const chain_ = ref({});
const date_ = ref(null);

// LIFECYCLE
onMounted(() => {
  chain_.value = props.chain;
  date_.value = props.date;
  props.onClearForm();
});
</script>

<script>
export default {};
</script>


<style scoped>
#flexBox {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
#date {
  font-size: 20px;
  margin: 8px;
}
.slot {
  box-shadow: 0 0 5px var(--shadow-color);
  background-color: var(--background-i2);
  padding: 10px;
  margin: 3px;
  width: 350px;
  max-width: 90%;
  border-radius: 5px;
  font-size: 15px;
}
.service {
  font-size: 20px;
}
.slot > div {
  margin: 8px;
}
textarea {
  width: 100%;
  box-sizing: border-box;
}
#title {
  font-size: 25px;
  text-align: center;
}
</style>