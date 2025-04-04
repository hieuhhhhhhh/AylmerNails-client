<template>
  <div id="main">
    <div class="column" v-if="details.phoneNum?.visible">
      <div class="iconCont">
        <FontAwesomeIcon
          class="icon"
          :icon="faPhone"
          @click="openPhoneCall(details.phoneNum.value)"
        />
      </div>

      {{ details.phoneNum.value }}
    </div>
    <div class="column" v-if="details.address?.visible">
      <div class="iconCont">
        <FontAwesomeIcon
          class="icon"
          :icon="faLocationDot"
          @click="toLink(details.address.url)"
        />
      </div>
      {{ details.address.value }}
    </div>
    <div class="column" v-if="details.instagram?.visible">
      <div class="iconCont">
        <FontAwesomeIcon
          class="icon"
          :icon="faInstagram"
          @click="toLink(details.instagram.url)"
        />
      </div>
      {{ details.instagram.value }}
    </div>
    <div class="column" v-if="details.email?.visible">
      <div class="iconCont">
        <FontAwesomeIcon
          class="icon"
          :icon="faEnvelope"
          @click="openEmail(details.email.value)"
        />
      </div>
      {{ details.email.value }}
    </div>
  </div>
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

export default {
  name: "FooterContent",
  props: {
    details: Object,
  },
  components: { FontAwesomeIcon },
  setup() {
    // INPUT
    const toLink = (value) => {
      window.open(value);
    };

    const openEmail = (email) => {
      window.location.href = `mailto:${email}`;
    };

    const openPhoneCall = (phoneNum) => {
      window.location.href = `tel:${phoneNum}`;
    };

    return {
      faPhone,
      faEnvelope,
      faInstagram,
      faLocationDot,
      toLink,
      openEmail,
      openPhoneCall,
    };
  },
};
</script>

<style scoped>
#main {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 13px;
}
.column {
  text-align: center;
  flex: 1;
  max-width: 250px;
}
.iconCont {
  font-size: 30px;
}
.icon {
  box-shadow: 0 0 5px var(--shadow-color);
  background: var(--background-i2);
  border-radius: 10px;
  width: 30px;
  padding: 10px;
  cursor: pointer;
}
.icon:hover {
  background: var(--hover);
}
.icon:active {
  background: var(--active);
}

@media (max-width: 500px) {
  #main {
    flex-direction: column;
    align-items: center;
  }
  .column {
    max-width: 100%;
    margin-bottom: 15px;
  }
}
</style>