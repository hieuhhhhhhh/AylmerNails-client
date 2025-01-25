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
            <input
              id="textInput"
              type="text"
              :value="name"
              @input="setName"
              required
            />
          </td>
        </tr>
        <tr>
          <th>Description:</th>
          <td id="flexBox">
            <textarea
              id="description"
              type="text"
              rows="3"
              :value="description"
              @input="setDescription"
            />
          </td>
        </tr>
        <tr>
          <th>Available Until:</th>
          <td>
            <input id="date" type="date" :value="date" @change="setDate" />
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
              <option :value="'null'">*empty</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div id="duo">
      <button class="redBtn" @click.prevent="onClose">
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
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCancel } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

import parseUT from "@/lib/parseUT";
import parseDate from "@/lib/parseDate";
import updateServiceInfo from "../apis/updateServiceInfo";
import fetchCategories from "../apis/fetchCategories";

export default {
  props: {
    onClose: Function,
    serviceId: String,
    iName: String,
    iDescription: String,
    iCategoryId: Number,
    iDate: Number,
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

      // states
      name: "",
      description: "",
      date: null,
      categoryId: null,

      // resources
      categories: [],
    };
  },
  methods: {
    setName(event) {
      this.name = event.target.value;
    },
    setDescription(event) {
      this.description = event.target.value;
    },
    setDate(event) {
      this.date = event.target.value;
    },
    setCategory(event) {
      this.categoryId = event.target.value;
    },
    async onSubmit() {
      if (this.categoryId == "null") {
        this.categoryId = null;
      }

      await updateServiceInfo(
        this.serviceId,
        this.name,
        this.description,
        this.categoryId,
        parseDate(this.date)
      );

      this.$router.push("/services/refresh");
    },
  },
  async created() {
    this.categories = await fetchCategories();
    this.name = this.iName;
    this.description = this.iDescription;
    if (this.iCategoryId) {
      this.categoryId = this.iCategoryId;
    } else {
      this.categoryId = "null";
    }

    if (this.iDate) {
      this.date = parseUT(this.iDate);
    }
  },
};
</script>

<style scoped>
#textInput,
textarea {
  width: 100%;
}
th,
td {
  padding: 10px;
  text-align: left;
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
  padding: 7px;
}
</style>