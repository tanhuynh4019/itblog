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
                                <v-btn :small="onResize.isLaptop" :color="website.color.main" text v-for="menu in menus" :disabled="menu.disabled"
                                    :to="menu.link" :key="menu.name" style="text-transform: none !important;">
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
                    <v-btn icon>
                        <v-icon size="30">mdi-bell-outline</v-icon>
                    </v-btn>
                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon size="30">mdi-account-reactivate</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-list-item-group :color="website.color.main">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Thông tin tài khoản
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item :to="{ path: `/profile/${user.profile_name}` }">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Hồ sơ của tôi
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="user.role == 1 || user.role == 2 || user.role == 3" :to="{name: 'manageinterview'}">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Quản lý InterView
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Thoát
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-card>
                    </v-menu>
                </div>
            </v-responsive>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" fixed temporary>
            <v-list nav dense>
                <v-list-item-group :color="website.color.main">
                    <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.link">

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
                    disabled: false,
                    tooltip: '',
                    link: {
                        name: 'homeuser'
                    }
                },
                {
                    name: 'Hội nhóm IT',
                    icon: '',
                    disabled: true,
                    tooltip: '',
                    link: ''
                },
                {
                    name: 'Học tập',
                    icon: '',
                    disabled: false,
                    tooltip: '',
                    link: {
                        name: 'learning'
                    }
                },
                {
                    name: 'Vua Fix bug',
                    icon: '',
                    disabled: true,
                    tooltip: '',
                    link: ''
                },
                {
                    name: 'Cuộc sống IT',
                    icon: '',
                    disabled: false,
                    tooltip: '',
                    link: {
                        name: 'lifeit'
                    }
                },
                {
                    name: 'Chia sẻ',
                    icon: '',
                    disabled: false,
                    tooltip: '',
                    link: {
                        name: 'post'
                    }
                },
                {
                    name: 'Tuyển dụng',
                    icon: '',
                    disabled: true,
                    tooltip: '',
                    link: ''
                },
                {
                    name: 'Inter View',
                    icon: '',
                    disabled: false,
                    tooltip: '',
                    link: {
                        name: 'interview'
                    }
                }
            ]
        }
    }
})
</script>
