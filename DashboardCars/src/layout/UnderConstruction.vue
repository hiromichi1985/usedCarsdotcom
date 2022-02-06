<template>
  <div>
    <b-card id="ContentsContainer" class="m-2 bg-white">
      <h3>UNDER CONSTRUCTION</h3>
      <b-img :src="require('../assets/img/construction.gif')"></b-img>
    </b-card>
  </div>
</template>
<script>
export default {
  methods: {},
  created() {
    this.$snotify.error("Example body content \r\n TEST", "Example title", {
      timeout: 5000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  },
};
</script>
