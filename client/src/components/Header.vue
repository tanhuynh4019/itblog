<template>
    <div>
        <v-app-bar app color="white" class="no-shadow">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer>
                <v-row>
                    <v-col cols="5">

                    </v-col>
                    <v-col cols="7">
                        <v-btn text>
                            <v-icon>mdi-home-circle</v-icon>
                            <br />
                            <div>Trang chủ</div>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-spacer>

            <v-responsive max-width="400">
                <div class="float-end" v-if="!user">
                    <v-btn color="#006064" outlined :to="{ name: 'login' }">Đăng nhập</v-btn>
                </div>
                <div class="float-end" v-if="user">
                    <div class="text-center">
                        <v-avatar size="32">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                        </v-avatar>
                        <div class="text--secondary">{{user.email.replace(/@(\D*)/, '')}} <v-icon>mdi-menu-down</v-icon>
                        </div>
                    </div>
                </div>
            </v-responsive>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" fixed temporary>
            <!--  -->
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Header',
    props: ['user', 'website'],
    data() {
        return {
            drawer: false
        }
    }
})
</script>
