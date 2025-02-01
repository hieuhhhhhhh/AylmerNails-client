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
      <br />
      <div id="technicians" v-if="SEs.length">
        <div v-for="employee in SEs" :key="employee.employee_id">
          <input
            id="check"
            type="checkbox"
            :value="employee.employee_id"
            v-model="checked"
            @change="onCheckEmp"
          />
          <label
            ><FontAwesomeIcon :icon="userIcon" /> {{ employee.alias }}</label
          >
        </div>
      </div>
      <div id="note" v-else>No available technicians</div>
    </div>
    <div>
      <button class="redBtn" id="remove" @click="onRemove(service.serviceId)">
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

import { faUser } from "@fortawesome/free-regular-svg-icons";
// library
import fetchServicePreview from "../apis/fetchServicePreview";
import fetchServiceEmployees from "../apis/fetchSEs";

export default {
  name: "Service-",
  props: {
    service: Object,
    onRemoveService: Function,
    onInputEmpIds: Function,
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
      userIcon: faUser,
      // resources
      SEs: [],
      checked: [],
      // products
      name: "",
      description: "",
      length: "",
    };
  },
  methods: {
    onRemove(serviceId) {
      this.onRemoveService(serviceId);
    },
    onCheckEmp() {
      this.onInputEmpIds(this.service.serviceId, this.checked);
    },
  },
  async created() {
    const [preview, employees] = await Promise.all([
      fetchServicePreview(this.service.serviceId),
      fetchServiceEmployees(this.service.serviceId),
    ]);

    // Assign preview details
    this.name = preview.name;
    this.description = preview.description;
    this.length = preview.length;

    // Assign employees
    this.SEs = employees;
    this.max = employees.length;

    this.checked = employees.map((e) => e.employee_id);
    this.onCheckEmp();
  },
};
</script>

<style scoped>
#technicians {
  border-top: 2px solid var(--xtrans-gray);
  padding: 5px;
}
#check {
  transform: scale(2);
  margin: 10px;
}
#note {
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: rgb(184, 121, 3);
}
#remove {
  margin: 5px;
}
#bar {
  display: flex;
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
  color: gray;
}
</style>
