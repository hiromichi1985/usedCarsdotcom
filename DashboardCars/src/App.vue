<template>
  <div id="app">
    <!-- <link
      rel="stylesheet"
      href="https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css"
    /> -->
    
    <vue-snotify></vue-snotify>
    <!-- HEADER -->
    <app-header></app-header>

    <div class="container-fluid p-0 pl-4">
      <div class="row row-offcanvas row-offcanvas-left min-w-100">
        <div class="row min-vh-100 flex-column flex-md-row w-100">
          <!-- SIDE MENU -->
          <app-sidemenu></app-sidemenu>

          <!-- MAIN CONTENT -->
          <main id="bodymainnavcontainer" class="col flex-grow-1 bg-secondary">
            <router-view></router-view>
          </main>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <app-footer></app-footer>
  </div>
</template>
<style>
@import "~vue-snotify/styles/material.css";
</style>
<script>
import SideMenu from "./layout/SideMenu.vue";
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
export default {
  components: {
    appSidemenu: SideMenu,
    appHeader: Header,
    appFooter: Footer,
  },
};
</script>

<style>
#bodymainnavcontainer {
  padding-right: 0;
  padding-left: 0;
}
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
