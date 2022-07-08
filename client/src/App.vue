<template>
  <v-app id="inspire" v-resize="onResize">

    <HeaderComponent :on-resize="{ isMobile, isIpad, isLaptop, isDesktop }" :user="user" :website="website" />

    <v-main>
      <router-view :on-resize="{ isMobile, isIpad, isLaptop, isDesktop }" :website="website" @showSnackbar="snackbar = $event" :user="user" @userEmit="user = $event" />

      <v-snackbar v-model="snackbar.snackbar" :timeout="timeout" top>
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar.snackbar = false">
            Đóng
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import HeaderComponent from './components/Header.vue'

import Vue from 'vue'
import UserApi from './api/user.api';

interface User {
  coin: number
}

export default Vue.extend({
  name: 'Home',
  components: {
    HeaderComponent,
  },
  async created() {
    let that = this;
    that.loadAuth();
  },
  data() {
    return {
      user: null,
      drawer: false,
      snackbar: {
        snackbar: false,
        text: '',
      },
      windowSize: {
        x: 0,
        y: 0,
      },
      timeout: 2000,
      website: {
        color: {
          main: '#006064'
        }
      },
      isMobile: false,
      isLaptop: false,
      isIpad: false,
      isDesktop: false,
    }
  },
  methods: {
    async loadAuth(): Promise<any> {
      let that = this;
      const g_user: any = await UserApi.getAuth();
      that.user = g_user.data;
    },
    onResize() {
      let that = this;
      that.windowSize = { x: window.innerWidth, y: window.innerHeight }
      that.resetOnsize();
      if (that.windowSize.x < 600) {
        that.isMobile = true;
      }
      else if (that.windowSize.x < 960) {
        that.isIpad = true;
      }
      else if(that.windowSize.x < 1264)
      {
        that.isLaptop = true;
      }
      else {
        that.isDesktop = true;
      }
    },
    resetOnsize() {
      let that = this;
      that.isMobile = false;
      that.isLaptop = false;
      that.isIpad = false;
      that.isDesktop = false;
    }
  }
})
</script>

<style>
.color_b_main {
  background-color: #ECEFF1 !important;
}

.no-shadow {
  box-shadow: none !important;
}

.w-100 {
  width: 100% !important;
}

a {
  text-decoration: none !important;
}
</style>