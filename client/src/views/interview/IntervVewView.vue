<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    Inter view: Kỷ thuật phỏng vấn
                </h2>
            </v-container>
        </v-sheet>
        <v-sheet class="mt-5" style="height: 1000px;">
            <v-container>
                <v-breadcrumbs style="margin-left: -23px;" :items="[
                    {
                        text: 'Dashboard',
                        disabled: false,
                        href: 'breadcrumbs_dashboard',
                    },
                    {
                        text: 'Link 1',
                        disabled: false,
                        href: 'breadcrumbs_link_1',
                    },
                    {
                        text: 'Link 2',
                        disabled: true,
                        href: 'breadcrumbs_link_2',
                    },
                ]">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>

                 <v-row>
                    <v-col cols="6">
                        <v-text-field dense outlined class="w-100" placeholder="Nhập nội dung tìm kiếm"
                            :color="website.color.main" append-icon="mdi-magnify" clearable></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-btn depressed dark class="float-end" :color="website.color.main" :to="{ name: 'createinterview' }">
                            Thêm Inter View</v-btn>
                    </v-col>
                </v-row>


                <h3>Chọn chủ đề (30 chủ đề)</h3>
                <v-row>
                    <v-col cols="3">
                        <v-card class="mx-auto my-12" :to="{path: `/inter-view/eye/chua_co`}">
                            <template slot="progress">
                                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                            </template>

                            <v-img height="250" src="https://thietkewebdalat.net/blog/wp-content/uploads/2020/04/javascript-la-gi.jpg"></v-img>

                            <v-card-title>JavaScript</v-card-title>

                            <v-card-text>
                                <v-row align="center" class="mx-0">
                                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="14">
                                    </v-rating>

                                    <div class="grey--text ms-4">
                                        4.5 (413)
                                    </div>
                                </v-row>

                                <div class="my-4 text-subtitle-1">
                                    By tanhuynh9940
                                </div>

                                <div>Cung cấp các câu hỏi liên quan đến lập trình JavaScript, hy vọng nó sẽ hữu ích cho bạn</div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-title>Đang có 0 câu hỏi</v-card-title>

                            <v-card-actions>
                                <v-btn color="deep-purple lighten-2" text >
                                    Bắt đầu
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import uploadApi from '../../api/upload.api';

export default Vue.extend({
    name: 'InterView',
    props: ['website', 'user', 'onResize'],
    components: {

    },
    watch: {
        user() {
            if (!this.user) {
                this.$router.push({ name: 'home' })
            }
        }
    },
    data() {
        return {
            categorys: ['Kỷ năng phỏng vấn', 'Kỷ thuật', 'Cách viết CV', 'Hướng nghiệp', 'Học bổng', 'Nhân vật', 'Xu hướng', 'Sách hay']
        }
    },
    methods: {
        getImageUser(filename: string) {
            return uploadApi.getImage('user') + filename;
        },
    }
})
</script>

<style scoped>
</style>
