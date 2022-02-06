<template>
  <div
    id="footer"
    class="navbar navbar-fixed-bottom navbar-default bg-white align-middle"
    role="navigation"
  >
    <footer style="width: 100%;">
      <span class="float-left">Cars Corporated</span>
      <span class="float-right">Release# {{releaseNumber}}</span>

    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      releaseNumber: "1.0.0.0"
    }
  },
}
</script>