<template>
  <b-navbar id="top" class="bg-white border text-dark" :sticky="true">
    <b-link class="nav-link text-dark m-0 p-0" @active="true" @click="goToHome">
      <h2 class>{{headerText}}</h2>
    </b-link>
  </b-navbar>
</template>

<script>

export default {
  methods: {
    goToHome() {
      // this.$router.push({ name: "home" });
      this.$router.push({ name: "carsHome" });
    },
    logout() {
    }
  },
  computed: {    
    headerText() {
      return "Your Cars are here!";
    }
  }
};
</script>

<style>

</style>