<template>
  <div id="parent">
    <div id="background" @click="onCancel" />
    <div id="window">
      <div id="content">
        <form @submit.prevent="onSubmit">
          <div>this is changeee</div>
          <button>Confirm</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
// apis
import updateUserRole from "../../apis/updateUserRole";

async function onSubmit() {
  await updateUserRole();
}
</script>

<script>
export default {};
</script>

<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
  position: relative;
  z-index: 20;
  width: 300px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 20px;

  margin-top: 15px;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
}
</style>