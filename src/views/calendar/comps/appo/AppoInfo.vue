<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: 80%" />
    </colgroup>
    <tbody>
      <tr>
        <th>Service</th>
        <td>
          <div class="duo" v-if="details.serviceName">
            <div>{{ details.serviceName }} - {{ details.cateName }}</div>
            <button class="infoBtn" @click="toService">i</button>
          </div>
          <div id="AOS" v-for="(AOS, index) in details.AOSOsText" :key="index">
            {{ AOS.question }} ~ {{ AOS.answer }}
            {{ formatOffset(AOS.offset) }}
          </div>
        </td>
      </tr>
      <tr>
        <th>Client</th>
        <td>
          <div class="duo">
            <div>
              {{ formatPhone(details.phoneNum) }}
              <div>
                {{ details.contactName }}
              </div>
            </div>
            <div>
              <button class="infoBtn" v-if="details.userId" @click="toUser">
                i
              </button>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <th>Date Time</th>
        <td>{{ getTime() }}<br />{{ getDate() }} {{ getReminder() }}</td>
      </tr>
      <tr>
        <th>Duration</th>
        <td>{{ getDuration() + " mins" }} <br />(to {{ getEndTime() }})</td>
      </tr>
      <tr>
        <th>Employee</th>
        <td>
          <div class="duo">
            {{ details.empAlias }}
            <button class="infoBtn" v-if="details.empId" @click="toEmployee">
              i
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <th>Preferred</th>
        <td>
          {{ details.selectedEmps?.map((emp) => emp.empAlias).join(", ") }}
        </td>
      </tr>
      <tr>
        <th>Note</th>
        <td>{{ details.note }}</td>
      </tr>
      <tr>
        <th>Booker</th>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import unixToReadable from "@/lib/unixToReadable";
import secsToHours from "@/lib/secsToHours";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import formatPhone from "@/lib/formatPhone";
import { useRouter } from "vue-router";
// icon
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { faInfo } from "@fortawesome/free-solid-svg-icons";

export default {
  props: {
    details: Object,
  },
  // components: {
  //   FontAwesomeIcon,
  // },
  setup(props) {
    // lib
    const router = useRouter();

    // helpers
    const formatOffset = (seconds) => {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let absMinutes = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${absMinutes} mins)`;
    };

    const getTime = () => {
      const seconds = props.details.start;
      return secsToHours(seconds);
    };

    const getDate = () => {
      const unixDate = props.details.date + 12 * 60 * 60;
      return unixToReadable(unixDate);
    };

    const getReminder = () => {
      const unixDate = props.details.date + 12 * 60 * 60;
      const text = unixTimeToReminder(unixDate);
      if (text) {
        return `(${text})`;
      }
    };

    const getDuration = () => {
      const gap = props.details.end - props.details.start;
      return gap / 60;
    };

    const getEndTime = () => {
      const seconds = props.details.end;
      return secsToHours(seconds);
    };

    // INPUT
    const toService = () => {
      router.push(`/services/details/${props.details.serviceId}`);
    };

    const toEmployee = () => {
      router.push(`/employees/details/${props.details.empId}`);
    };

    const toUser = () => {
      router.push(`/users/${props.details.userId}`);
    };

    return {
      // faInfo,
      formatOffset,
      formatPhone,
      getTime,
      getDate,
      getDuration,
      getEndTime,
      getReminder,
      toService,
      toEmployee,
      toUser,
    };
  },
};
</script>

<style scoped>
#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

table {
  text-align: left;
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}
th,
td {
  border: 1px solid black;

  padding: 5px;
  text-align: left;
}
#AOS {
  font-size: 12px;
}
.duo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.infoBtn {
  aspect-ratio: 1;
  border-radius: 3px;
  font-family: Georgia, serif;
  width: 23px;
  padding: 0px;
  font-weight: bold;
}
</style>
