<template>
  <div>
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#114C8E"
      background-color="#fff"
      :opacity="100"
      :enforce-focus="true"
      :lock-scroll="true"
    >
      <b-card
        no-body
        img-src="/img/truck.gif"
        style="height: 50%; width: 50%"
        class="mx-auto"
      >
      </b-card>
    </loading>
    <comp-errorToast
      v-if="showAlertMessageComp"
      v-bind:alertMessageProp="alertMessageProp"
      ref="alertMessageComp"
    ></comp-errorToast>
    <div id="ContentsContainer" class="card m-2 bg-white">
      <div class="card-body">
        <b-container id="subsHeaderContainer" class="p-0 m-0">
          <b-row class="pl-3">
            <b-col class="p-0 m-0">
              <b-form-select :options="makerOptions" v-model="makerSelection">
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled
                    >Maker</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-col>
            <b-col class="p-0 m-0">
              <b-form-select :options="modelOptions" v-model="modelSelection">
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled
                    >Model</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-col>
            <b-col class="p-0 m-0">
              <b-form-select :options="yearOptions" v-model="yearSelection">
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled
                    >Year</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-col>
            <b-col>
              <b-button variant="primary" @click="searchClick">Search</b-button>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row><br /></b-row>
          <b-row>
            <b-col>
              <b-container class="p-0 m-0">
                <b-row
                  class="p-0 m-0"
                  v-for="(item, index) in searchResults"
                  :key="item.Id"
                >
                  <b-col class="p-0 m-0">
                    <!-- :style="alternateRow(index)" -->
                    <b-card
                      class="p-0 m-0"
                      :style="alternateRow(index)"
                      :img-src="item.tempImage"
                      img-alt="Card image"
                      img-left
                      img-height="200"
                      img-width="300"
                      :title="formatTitle(item.year, item.maker, item.model)"
                    >
                      <b-container class="p-0 m-0 text-left">
                        <b-row class="p-0 m-0 text-left">
                          <b-col
                            >{{ item.usedMiles.toLocaleString() }} mi</b-col
                          >
                        </b-row>
                        <b-row class="p-0 m-0">
                          <b-col class="pr-0 mr-0">
                            <h5>
                              {{
                                item.price.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })
                              }}
                            </h5>
                          </b-col>
                          <b-col class="pl-0">
                            {{
                              "Price drop " +
                              (item.priceBefore - item.price).toLocaleString(
                                "en-US",
                                {
                                  style: "currency",
                                  currency: "USD",
                                }
                              )
                            }}
                          </b-col>
                          <b-col></b-col>
                        </b-row>
                        <b-row class="p-0 m-0">
                          <b-col>
                            Colors:
                            <span v-for="color in item.colors" :key="color.id">
                              <!-- {{color}} -->
                              <b-button
                                :style="'background-color: ' + color.value"
                                class="m-1"
                                @mouseover="handleHover(item, color)"
                                @mouseleave="handleUnHover(item)"
                                @click="handleClick(item, color)"
                              ></b-button>
                            </span>
                            <!-- <br />{{item.colors}} -->
                          </b-col>
                        </b-row>
                        <!-- <b-row class="p-0 m-0">
                          <b-col class="p-0 m-0">{{ item }}</b-col>
                        </b-row> -->
                      </b-container>
                    </b-card>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
// import StringExtension from "../services/StringExtension.js";
import UIConfigurations from "../shared/uiconfigurations.js";
// import HttpUtilHelper from "../shared/httpUtilHelper.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
//eslint-disable-next-line no-unused-vars
import ErrorAlertToast from "@/components/ErrorMessageResponse.vue";
import { mapActions } from "vuex";
import CarsService from "../services/carsApiService.js";

export default {
  components: {
    Loading,
    compErrorToast: ErrorAlertToast,
  },
  data() {
    return {
      alertMessageProp: {
        isInError: false,
        items: [],
      },
      showAlertMessageComp: false,
      isLoading: false,
      model: {
        options: [],
        selection: null,
      },
      maker: {
        options: [],
        selection: null,
      },
      year: {
        options: [],
        selection: null,
      },
      searchResults: [],
    };
  },
  async mounted() {},
  async created() {
    console.log(await CarsService.GetModels());
    await this.searchClick();
  },
  methods: {
    ...mapActions("carsModule", ["getCarsData"]),
    addAlertMessagePropItem(httpResultHandler) {
      this.alertMessageProp.isInError = true;
      this.alertMessageProp.items.push({
        errorMessage: httpResultHandler.errorMessage,
        stackErrorMessages: httpResultHandler.stackErrorMessages.join(" "),
        title: httpResultHandler.title,
        responseType: httpResultHandler.responseType,
      });
    },
    loadErrors() {
      this.showAlertMessageComp = true;

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.showAlertMessageComp = false;
        this.alertMessageProp.items = [];
      }, 500);
    },
    showLoader() {
      this.isLoading = true;
    },
    hideLoader() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    alternateRow(index) {
      return UIConfigurations.alternateRow(index);
    },
    async onKeyInputDelay() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        //dosomething
      }, 500);
    },
    formatTitle(year, maker, model) {
      return year.toString() + " " + maker.text + " " + model.text;
    },
    handleHover(item, color) {
      var tempSearchResults = this.searchResults;
      for (let i = 0; tempSearchResults.length; i++) {
        if (tempSearchResults[i].id == item.id) {
          var findColor = tempSearchResults[i].colors.find((obj) => {
            return obj.id == color.id;
          });
          tempSearchResults[i].tempImage = findColor.src;
        }
      }
      this.searchResults = tempSearchResults;
    },
    handleUnHover(item) {
      var tempSearchResults = this.searchResults;
      for (let i = 0; tempSearchResults.length; i++) {
        if (tempSearchResults[i].id == item.id && tempSearchResults[i].clickedColor == null) {
          tempSearchResults[i].tempImage = tempSearchResults[i].defaultImage;
        } else {
          var findColor = tempSearchResults[i].colors.find((obj) => {
            return obj.id == tempSearchResults[i].clickedColor;
          });
          tempSearchResults[i].tempImage = findColor.src;
        }
      }
    },
    handleClick(item, color){
      var tempSearchResults = this.searchResults;
      for (let i = 0; tempSearchResults.length; i++) {
        if (tempSearchResults[i].id == item.id) {
          var findColor = tempSearchResults[i].colors.find((obj) => {
            return obj.id == color.id;
          });
          tempSearchResults[i].tempImage = findColor.src;
          tempSearchResults[i].clickedColor = findColor.id
        }
      }
    },
    async searchClick() {
      this.searchResults = [];
      var criteria = {
        makerId: this.makerSelection,
        modelId: this.modelSelection,
        year: this.yearSelection,
      };

      var result = await this.getCarsData(criteria);
      if (result.isInError) {
        this.addAlertMessagePropItem(result);
        this.loadErrors();
        return new Promise((resolve) => resolve(null));
      }
      console.log("result", result);

      if (result.data !== null || result.data.length !== 0) {
        this.searchResults = result.data;
      }
    },
  },
  computed: {
    modelOptions: {
      get: function () {
        return this.model.options;
      },
      set: function (value) {
        this.model.options = value;
      },
    },
    modelSelection: {
      get: function () {
        return this.model.selection;
      },
      set: function (value) {
        this.model.selection = value;
      },
    },
    makerOptions: {
      get: function () {
        return this.maker.options;
      },
      set: function (value) {
        this.maker.options = value;
      },
    },
    makerSelection: {
      get: function () {
        return this.maker.selection;
      },
      set: function (value) {
        this.maker.selection = value;
      },
    },
    yearOptions: {
      get: function () {
        return this.year.options;
      },
      set: function (value) {
        this.year.options = value;
      },
    },
    yearSelection: {
      get: function () {
        return this.year.selection;
      },
      set: function (value) {
        this.year.selection = value;
      },
    },
  },
};
</script>