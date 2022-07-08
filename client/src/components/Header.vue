<template>
    <div>
        <v-app-bar app color="white" class="no-shadow">
            <v-spacer style="padding-left: 6%;">
                <div>
                    <v-row>
                        <v-col cols="1">
                            <router-link :to="{ name: 'home' }">
                                <h2 class="float-start">ITBlog</h2>
                            </router-link>
                        </v-col>
                        <v-col cols="11" v-if="onResize.isLaptop || onResize.isDesktop">
                            <div class="ml-5">
                                <v-btn :small="onResize.isLaptop" :color="website.color.main" text v-for="menu in menus"
                                    :key="menu.name" style="text-transform: none !important;">
                                    {{ menu.name }}
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-spacer>

            <v-responsive max-width="350" style="padding-right: 4%;">
                <div class="float-end" v-if="!user">
                    <v-btn :to="{ name: 'login' }" text>Đăng nhập</v-btn>
                    <v-btn color="#B71C1C" depressed class="ml-2" dark :to="{ name: 'register' }">Đăng ký</v-btn>
                    <v-app-bar-nav-icon v-if="onResize.isIpad || onResize.isMobile" @click="drawer = !drawer">
                    </v-app-bar-nav-icon>
                </div>
                <div class="float-end" v-if="user">
                    <div class="text-center">
                        <v-avatar size="32">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                        </v-avatar>
                        <div class="text--secondary">{{ user.email.replace(/@(\D*)/, '') }} <v-icon>mdi-menu-down
                            </v-icon>
                        </div>
                    </div>
                </div>
            </v-responsive>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" fixed temporary>
            <v-list nav dense>
                <v-list-item-group :color="website.color.main">
                    <v-list-item v-for="(menu, i) in menus" :key="i">

                        <v-list-item-content>
                            <v-list-item-title v-text="menu.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Header',
    props: ['user', 'website', 'onResize'],
    data() {
        return {
            drawer: false,
            menus: [
                {
                    name: 'Trang chủ',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                },
                {
                    name: 'Hội nhóm IT',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                },
                {
                    name: 'Học tập',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                },
                {
                    name: 'Vua Fix bug',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                },
                {
                    name: 'Cuộc sống IT',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                },
                {
                    name: 'Chia sẻ',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                },
                {
                    name: 'Chứng chỉ Free',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                },
                {
                    name: 'Inter View',
                    icon: '',
                    disabled: '',
                    tooltip: '',
                }
            ]
        }
    }
})
</script>
