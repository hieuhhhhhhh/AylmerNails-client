<template>
  <form id="esi" @submit.prevent="onSubmit">
    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: 80%" />
      </colgroup>
      <tbody>
        <tr>
          <th>Name:</th>
          <td id="flexBox">
            <input class="info" type="text" v-model="name" required />
          </td>
        </tr>
        <tr>
          <th>Description:</th>
          <td id="flexBox">
            <textarea
              id="description"
              type="text"
              rows="3"
              v-model="description"
            />
          </td>
        </tr>
        <tr>
          <th>Starting Price $:</th>

          <td id="flexBox">
            <input
              class="info"
              type="number"
              step="0.01"
              v-model="price"
              :min="1"
            />
          </td>
        </tr>

        <tr>
          <th>
            Available for <br />
            online booking:
          </th>
          <td>
            <input
              id="check"
              type="checkbox"
              :checked="clientCanBook"
              v-model="clientCanBook"
            />
          </td>
        </tr>

        <tr>
          <th>Available Until:</th>
          <td>
            <input id="date" type="date" v-model="date" />
          </td>
        </tr>
        <tr>
          <th>Category:</th>
          <td id="flexBox">
            <select :value="categoryId" @change="setCategory" required>
              <option
                v-for="cate in categories"
                :key="cate.cate_id"
                :value="cate.cate_id"
              >
                {{ cate.name }}
              </option>
              <option :value="'null'">none</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div id="duo">
      <button class="redBtn" type="button" @click="onClose">
        <FontAwesomeIcon :icon="cancelIcon" /> Cancel
      </button>
      <button class="greenBtn">
        <FontAwesomeIcon :icon="saveIcon" /> Save Changes
      </button>
    </div>
  </form>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import parseUT from "@/lib/parseUT";
import parseDate from "@/lib/parseDate";
import updateServiceInfo from "../apis/updateServiceInfo";
import fetchCategories from "../apis/fetchCategories";

export default {
  props: {
    onClose: Function,
    serviceId: Number,
    _name: String,
    _description: String,
    _category: Number,
    _date: Number,
    _price: String,
    _clientCanBook: Number,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      editIcon: faPenToSquare,
      cancelIcon: faCancel,
      saveIcon: faCheck,

      // products
      name: "",
      description: "",
      date: null,
      categoryId: null,
      price: null,
      clientCanBook: true,

      // resources
      categories: [],
    };
  },
  methods: {
    setCategory(event) {
      this.categoryId = event.target.value;
    },
    async onSubmit() {
      if (this.categoryId == "null") {
        this.categoryId = null;
      }

      const res = await updateServiceInfo(
        this.serviceId,
        this.name,
        this.description,
        this.categoryId,
        parseDate(this.date),
        this.price,
        this.clientCanBook
      );

      if (res) {
        this.$router.push("/services/refresh");
      }
    },
  },
  async created() {
    this.categories = await fetchCategories();
    this.name = this._name;
    this.description = this._description;
    this.price = this._price;
    this.clientCanBook = this._clientCanBook;

    this.categoryId = this._category ?? "null";

    this.date = this._date ? parseUT(this._date) : null;
  },
};
</script>

<style scoped>
.info,
textarea {
  width: 100%;
}
th,
td {
  text-align: left;
}
td {
  padding: 10px;
}
#flexBox {
  display: flex;
}
#duo {
  display: flex;
  gap: 15px;
}
#date {
  font-size: 15px;
  padding: 5px;
}
#description {
  width: 100%;
}
#esi {
  background-color: var(--background-i2);
}
#check {
  transform: scale(2);
  margin-left: 7px;
  margin-right: 10px;
}
</style>