<template>
  <v-app id="inspire">

    <v-app-bar app color="white" class="no-shadow">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-btn color="#006064" outlined :to="{ name: 'login' }">Đăng nhập</v-btn>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-main color="white">
      <v-container>
        <router-view :website="website" @showSnackbar="snackbar = $event" />
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
import UserApi from './api/user.api';
export default {
  async created() {
    

  },
  data: () => ({
    user: null,
    drawer: null,
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
  }),
  methods: {
    async loadAuth() {
      let that = this;
      const g_user = await UserApi.getAuth();
    }
  }
}
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