<template>
  <div id="DrawerContent">
    <div><router-link to="/">Home</router-link></div>
    <div><router-link to="/about">About</router-link></div>
    <div><router-link to="/contact">Contact</router-link></div>
  </div>
</template>

<style scoped>
#DrawerContent {
  margin-inline: 10px;
  box-sizing: border-box;
}
#DrawerContent a {
  text-decoration: none;
  color: inherit;
}
</style>
