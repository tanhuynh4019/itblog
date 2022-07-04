<template>
  <v-app id="inspire">

    <HeaderComponent :user="user" :website="website" />

    <v-main color="white">
      <v-container>
        <router-view :website="website" @showSnackbar="snackbar = $event" :user="user" @userEmit="user = $event" />
        <v-snackbar v-model="snackbar.snackbar" :timeout="timeout" top>
          {{ snackbar.text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar.snackbar = false">
              Đóng
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
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
      timeout: 2000,
      website: {
        color: {
          main: '#006064'
        }
      }
    }
  },
  methods: {
    async loadAuth(): Promise<any> {
      let that = this;
      const g_user: any = await UserApi.getAuth();
      that.user = g_user.data;
    }
  }
})
</script>

<style>
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