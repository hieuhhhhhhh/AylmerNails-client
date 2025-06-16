.<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input type="text" v-model="code" placeholder="Verification Code" />
    </div>
    <div>{{ msg }}</div>
    <button>Verify</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
// apis
import guestAddAppo from "../../../apis/guestAddAppo";

// PARAMS
const props = defineProps({
  codeId: Number,
  phoneNum: String,
  chain: Object,
  date: Number,
  onNavigateNext: Function,
});

// PAYLOAD
const code = ref("");
const msg = ref("");

// APIS
async function onSubmit() {
  const message = await guestAddAppo(
    props.codeId,
    code.value,
    props.chain,
    props.date
  );

  //   if fail
  if (message) {
    msg.value = message;
    code.value = "";
    return;
  }

  // if succesful
  props.onNavigateNext();
}
</script>
