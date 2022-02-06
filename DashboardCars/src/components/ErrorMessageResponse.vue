<template>
  <span> </span>
</template>

<script>
import UIConfigurations from "@/shared/uiconfigurations.js";

export default {
  components: {},
  name: "comp-alertmessage",
  props: ["alertMessageProp"],
  data() {
    return {
      dismissibleAlert: {
        show: false,
        items: [],
      },
    };
  },
  async created() {
    this.alertErrorItems = this.alertMessageProp.items;
    if (this.alertMessageProp.isInError && this.alertMessageProp.items != null) {
      var errorItems = this.alertMessageProp.items;
      for (let i = 0; i < errorItems.length; i++) {
        this.$snotify.error(
          errorItems[i].errorMessage,
          errorItems[i].title,
          UIConfigurations.SnotifyToastConfig
        );
      }
    }
  },
  methods: {},
  computed: {
    dismissiveAlertShow: {
      get: function () {
        return this.dismissibleAlert.show;
      },
      set: function (value) {
        this.dismissibleAlert.show = value;
      },
    },

    alertErrorItems: {
      get: function () {
        return this.dismissibleAlert.items;
      },
      set: function (value) {
        this.dismissibleAlert.items = value;
      },
    },
  },
};
</script>
<style>
.semiBoldText {
  font-weight: 500;
}
.preSpacing {
  white-space: pre;
}
</style>
<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
