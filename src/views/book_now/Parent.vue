<template>
  <div id="layout">
    <div v-show="page == 1 || page == 0">
      <Services
        :getServices="getServices"
        :onNavigateNext="onNavigateNext"
        :resetPage2="resetPage2"
      />
    </div>
    <div v-show="page == 2" :key="page2trigger">
      <SelectTime
        :services="services"
        :onSelectChain="onSelectChain"
        :onReturn="onReturn"
      />
    </div>
    <div v-show="page == 3" :key="page3trigger">
      <FinalPreview :chain="chain" :date="date" :onReturn="onReturn" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Services from "./comps/Services.vue";
import SelectTime from "./comps/SelectTime.vue";
import FinalPreview from "./comps/FinalPreview.vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

export default {
  name: "BookNowParent",
  components: {
    Services,
    SelectTime,
    FinalPreview,
  },
  setup() {
    // lib
    const router = useRouter();
    const route = useRoute();
    // Reactive state
    const services = ref({});
    const page = ref(1);
    const page2trigger = ref(0);
    const page3trigger = ref(0);
    const chain = ref({});
    const date = ref(null);

    // Methods

    const getServices = () => services.value;

    const updateURL = () => {
      router.push(`/booknow/${page.value}`);
    };

    const onNavigateNext = () => {
      page.value++;
      updateURL();
    };

    const resetPage2 = () => {
      page2trigger.value++;
    };

    const onReturn = () => {
      router.back();
    };

    const onSelectChain = (selectedChain, selectedDate) => {
      console.log("date", selectedDate);
      date.value = selectedDate;
      chain.value = selectedChain;
      page3trigger.value++;
      onNavigateNext();
    };

    // DEPENDENCIES

    watch(
      () => route.params.page,
      (value) => {
        if (page.value == value) {
          return;
        }

        if (value != 0 && value != 1 && Object.keys(chain).length === 0) {
          page.value = 1;
          updateURL();
          return;
        }

        page.value = value;
      }
    );

    // Route guard before leaving
    onBeforeRouteLeave((to, from, next) => {
      if (to.fullPath.startsWith("/booknow")) {
        next();
        return;
      }

      if (Object.keys(services.value).length === 0) {
        next();
        return;
      }

      const answer = confirm(
        "Current selections won't be saved. Proceed to leave?"
      );
      if (answer) {
        next(); // Proceed with navigation
      } else {
        next(false); // Prevent navigation
      }
    });

    // Return to template
    return {
      services,
      page,
      page2trigger,
      page3trigger,
      chain,
      date,
      getServices,
      onNavigateNext,
      resetPage2,
      onReturn,
      onSelectChain,
    };
  },
};
</script>

<style scoped>
#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}
#xs {
  color: rgb(193, 0, 0);
}
</style>
