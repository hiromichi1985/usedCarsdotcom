<template>
  <aside class="col-12 col-md-2 p-0 bg-dark flex-shrink-1">
    <nav
      class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start py-2 ml-3"
    >
      <div class="collapse navbar-collapse">
        <ul class="flex-md-column flex-row navbar-nav">
          <li class="nav-item">
            <b-link class="nav-link pl-0" @click="carsHomeClick">
              <div class="row">
                <div class="col-12"></div>
                <div class="col-2 p-0">
                  <div class="h-100 h4 mb-2">
                    <b-icon icon="list-ul" class="align-middle h-100" />
                  </div>
                </div>
                <div class="col-10 p-2">Cars Listings</div>
              </div>
            </b-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script>

export default {
  props: {
    msg: String,
  },
  methods: {
    carsHomeClick() {
      // if (this.$route.name === "partner"){
      //   //this does the refresh
      //   this.$router.go();
      // }
      // else {
      this.$router.push({ name: "carsHome" });
      // }
    },
    underConstruction() {
      //console.log("route", this.$route);
      //console.log("storedispatch", this.getHasChanged);
      this.$router.push({ name: "underconstruction" });
    },
  },
  computed: {
  },
};
</script>
