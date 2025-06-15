<template>
  <div id="note">Step 3: Select date and time</div>
  <div class="flexBox">
    <div class="top">
      <button class="dayBtn" @click="onMoveDate(-1)">
        <FontAwesomeIcon :icon="faMinus" />
      </button>
      <div>
        <input
          id="date"
          type="date"
          ref="dateInput"
          :value="date"
          @change="onInputDate($event.target.value)"
        />
      </div>
      <button class="dayBtn" @click="onMoveDate(1)">
        <FontAwesomeIcon :icon="faPlus" />
      </button>
    </div>
    <div v-if="unixDate">
      {{ unixToReadable(unixDate) }}
    </div>
    <div v-if="unixDate">
      {{ unixTimeToReminder(unixDate) }}
    </div>
  </div>
  <div id="openingBox">
    <div v-if="!date">Input a date to continue</div>
    <div v-if="fetched && !sortedOpenings.length">
      No open slots on this date🥲
    </div>
    <div v-for="(opening, index) in sortedOpenings" :key="index">
      <button class="openings" @click="onChooseOpening(opening)">
        <div>{{ formatTime(opening.start) }}</div>
      </button>
    </div>
  </div>
  <div id="msg" v-if="msg">{{ msg }}</div>
  <div id="duo">
    <button class="orangeBtn" id="leftBtn" @click="onBack">
      <FontAwesomeIcon :icon="backIcon" /> Back
    </button>
    <button class="blueBtn" id="rightBtn" @click="onContinue">
      Continue <FontAwesomeIcon :icon="continueIcon" />
    </button>
  </div>
</template>
<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faLeftLong,
  faRightLong,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
// lib
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import secondsToClock from "../apis/secondsToClock";
import parseDate from "@/lib/parseDate";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import unixToReadable from "@/lib/unixToReadable";
// apis
import fetchAvailability from "../apis/fetchAvailability";

export default {
  props: {
    isReady: Boolean,
    services: Object,
    onSelectChain: Function,
    onReturn: Function,
  },

  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      backIcon: faLeftLong,
      continueIcon: faRightLong,
      faPlus,
      faMinus,
      // status
      fetched: false,
      // resources
      msg: "",
      chains: [],
      openings: {},
      sortedOpenings: [],
      date: null,
      // outcome
      chain: null,
      unixDate: null,
    };
  },

  methods: {
    onBack() {
      this.onReturn();
    },
    onContinue() {
      if (!this.unixDate) {
        this.msg = "You haven't chosen a date";
        return;
      }
      if (!this.chain) {
        this.msg = "You haven't chosen a time slot for your appointment";
        return;
      }
      this.onSelectChain(this.chain, this.unixDate);
    },
    formatTime(seconds) {
      return secondsToClock(seconds);
    },
    onChooseOpening(opening) {
      // reset state
      this.msg = "";
      this.chain = null;
      // choose a random chain
      const max = opening.chains.length;
      const random = Math.floor(Math.random() * max);
      this.chain = opening.chains[random];
      this.onContinue();
    },
    isInThePast(value) {
      const today = getTodayUnixTime();
      const validated = parseDate(value);
      const res = validated <= today - 24 * 60 * 60;
      return res;
    },
    resetData() {
      this.msg = "";
      this.chains = [];
      this.openings = {};
      this.sortedOpenings = [];
      this.date = null;
      this.chain = null;
      this.unixDate = null;
    },
    async onInputDate(value) {
      // update status
      this.fetched = false;

      // reset data
      this.resetData();
      // if user select day in the past do nothing
      if (this.isInThePast(value)) {
        return;
      }

      this.date = value;
      this.unixDate = parseDate(value);
      console.log("unix date: ", this.unixDate);
      await this.fetchData();
    },
    async onMoveDate(direction) {
      let current;
      if (this.date) {
        current = new Date(this.date);
      } else {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        current = new Date(now.getTime() - offset * 60 * 1000);
      }
      current.setDate(current.getDate() + direction);
      const newDate = current.toISOString().slice(0, 10);
      await this.onInputDate(newDate);
    },
    async fetchData() {
      if (!this.services) return;

      const res = await fetchAvailability(this.unixDate, this.services);

      // if no result -> error occured -> do nothing
      if (!res) return;

      // append object 'openings'
      this.chains = res;
      for (let chain of this.chains) {
        const start = chain.chainStart;
        const end = chain.chainEnd;
        const minEnd = chain.minEnd;

        // group chains to groups called 'openings'
        if (!this.openings[start] || this.openings[start].end > end) {
          const opening = {
            start: start,
            end: end,
            minEnd: minEnd,
            chains: [],
          };
          this.openings[start] = opening;
        }

        if (this.openings[start].end === end) {
          this.openings[start].chains.push(chain);
        }
      }

      // convert to array
      const newOpenings = Object.values(this.openings);
      this.sortedOpenings = newOpenings.sort((a, b) => a.start - b.start);

      // update status
      this.fetched = true;
    },
    unixTimeToReminder,
    unixToReadable,
  },
  watch: {
    isReady(newVal) {
      if (newVal && !this.date) this.onMoveDate(1);
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
  padding-inline: 15px;
  font-size: 20px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

#leftBtn {
  font-size: 20px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.flexBox {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
}
input[type="date"] {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
}
#note {
  padding: 10px;
  padding-top: 0px;
  color: rgb(184, 121, 3);
  text-align: center;
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.dayBtn {
  font-size: 30px;
  height: fit-content;
  border-radius: 50%;
}
.openings {
  padding: 5px;
  padding-inline: 10px;
  font-size: 18px;
}
#openingBox {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 0px;
  margin: 10px 0px;

  background: var(--background-i2);
}
#msg {
  text-align: center;
  color: red;
}
</style>