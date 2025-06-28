<template>
  <form @submit.prevent="onSubmit">
    <div id="btns">
      <button v-if="!isEditing" class="blueBtn" @click="toogleEdit">
        Press to Edit
      </button>
      <button v-if="isEditing" type="button" @click="onCancel" class="greenBtn">
        Cancel
      </button>
      <button v-if="isEditing" class="redBtn">Save</button>
    </div>
    <table>
      <tbody>
        <tr>
          <td class="icon">
            <FontAwesomeIcon :icon="faPhone" />
          </td>
          <td>
            <label
              ><input
                type="checkbox"
                v-model="PNvisible"
                :disabled="!isEditing"
              />
              Visible
            </label>
            <label for="pn">Phone Number</label>
            <input
              :disabled="!isEditing"
              type="tel"
              id="pn"
              v-model="phoneNum"
            />
          </td>
        </tr>
        <tr>
          <td class="icon">
            <FontAwesomeIcon :icon="faLocationDot" />
          </td>
          <td>
            <label
              ><input
                id="pnc"
                type="checkbox"
                v-model="ADvisible"
                :disabled="!isEditing"
              />
              Visible
            </label>
            <label for="ad">Address</label>
            <input
              :disabled="!isEditing"
              type="text"
              id="ad"
              v-model="address"
            />
            <label for="gm">Google Map URL</label>
            <input
              :disabled="!isEditing"
              type="text"
              id="gm"
              v-model="addressURL"
            />
          </td>
        </tr>
        <tr>
          <td class="icon">
            <FontAwesomeIcon :icon="faInstagram" />
          </td>
          <td>
            <label
              ><input
                id="pnc"
                type="checkbox"
                v-model="instaVisible"
                :disabled="!isEditing"
              />
              Visible
            </label>
            <label for="ii">Instagram ID</label>
            <input
              :disabled="!isEditing"
              type="text"
              id="ii"
              v-model="instaId"
            />
            <label for="iu">Instagram URL</label>
            <input
              :disabled="!isEditing"
              type="text"
              id="iu"
              v-model="instaURL"
            />
          </td>
        </tr>
        <tr>
          <td class="icon">
            <FontAwesomeIcon :icon="faEnvelope" />
          </td>
          <td>
            <label
              ><input
                id="pnc"
                type="checkbox"
                v-model="EMvisible"
                :disabled="!isEditing"
              />
              Visible
            </label>
            <label for="ea">Email Address</label>
            <input :disabled="!isEditing" type="text" id="ea" v-model="email" />
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</template>
<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// lib
import { onMounted, ref } from "vue";
import updateBusinessLinks from "./apis/updateBusinessLinks";
import fetchBusinessLinks from "./apis/fetchBusinessLinks";
import { useFooterReact } from "@/stores/myProfile";

export default {
  name: "BusinessLinks",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    // pinia
    const FRstore = useFooterReact();
    // status
    const isEditing = ref(false);
    // payload
    const PNvisible = ref(false);
    const phoneNum = ref(null);
    const ADvisible = ref(false);
    const address = ref(null);
    const addressURL = ref(null);
    const instaVisible = ref(false);
    const instaId = ref(null);
    const instaURL = ref(null);
    const EMvisible = ref(false);

    const email = ref(null);

    // INPUT
    const toogleEdit = () => {
      isEditing.value = !isEditing.value;
    };
    const onCancel = async () => {
      isEditing.value = false;
      await fetchData();
    };
    const onSubmit = async () => {
      const res = await updateBusinessLinks(
        PNvisible.value,
        phoneNum.value,
        ADvisible.value,
        address.value,
        addressURL.value,
        instaVisible.value,
        instaId.value,
        instaURL.value,
        EMvisible.value,
        email.value
      );

      if (res) {
        isEditing.value = false;
        // trigger footer to react
        FRstore.triggerReact();
        // refetch data
        await fetchData();
      }
    };

    // APIS
    const fetchData = async () => {
      // call api
      const res = await fetchBusinessLinks();

      // unpack
      PNvisible.value = res.phoneNum.visible;
      phoneNum.value = res.phoneNum.value;
      ADvisible.value = res.address.visible;
      address.value = res.address.value;
      addressURL.value = res.address.url;
      instaVisible.value = res.instagram.visible;
      instaId.value = res.instagram.value;
      instaURL.value = res.instagram.url;
      EMvisible.value = res.email.visible;
      email.value = res.email.value;
    };

    // LIFECYCLE
    onMounted(async () => {
      await fetchData();
    });

    return {
      faEnvelope,
      faLocationDot,
      faInstagram,
      faPhone,
      isEditing,
      address,
      phoneNum,
      addressURL,
      instaId,
      instaURL,
      email,
      PNvisible,
      ADvisible,
      instaVisible,
      EMvisible,
      toogleEdit,
      onSubmit,
      onCancel,
    };
  },
};
</script>

<style scoped>
label {
  display: block;
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
tr {
  border: 1px solid;
}
input[type="text"],
input[type="tel"] {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5px;
}
#btns {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 10px;
}
.icon {
  font-size: 30px;
  width: 50px;
  text-align: center;
}
input[type="checkbox"] {
  transform: scale(1.5);
  margin: 10px;
  margin-inline: 3px;
}
</style>