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
                        text: 'Trang chủ',
                        disabled: false,
                        href: '/',
                    },
                    {
                        text: 'Danh sách Interview',
                        disabled: true,
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
                    <v-col cols="6" v-if="user">
                        <v-btn v-if="user.role == 1 || user.role == 2 || user.role == 3" depressed dark class="float-end" :color="website.color.main" :to="{ name: 'createinterview' }">
                            Thêm Inter View</v-btn>
                    </v-col>
                </v-row>


                <h3>Chọn chủ đề ({{interviews.length}} chủ đề)</h3>
                <v-row>
                    <v-col cols="3" v-for="item in interviews" :key="item._id">
                        <v-card class="mx-auto my-12" :to="item.is_active ? {path: `/inter-view/eye/chua_co`} : null">
                            <template slot="progress">
                                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                            </template>

                            <v-img height="250" :src="getImageInterView(item.image.filename)"></v-img>

                            <v-card-title>{{item.name}}</v-card-title>

                            <v-card-text>
                                <v-row align="center" class="mx-0">
                                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="14">
                                    </v-rating>

                                    <div class="grey--text ms-4">
                                        4.5 (413)
                                    </div>
                                </v-row>

                                <div class="my-4 text-subtitle-1">
                                    By {{item.user_auth.profile.profile_name}}
                                </div>

                                <div>{{item.description}}</div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-title>Đang có 0 câu hỏi</v-card-title>

                            <v-card-actions>
                                <v-btn :color="website.color.main" text v-if="item.is_active">
                                    Bắt đầu ngay
                                </v-btn>
                                <v-btn :color="website.color.main" text else disabled>
                                   Chuẩn bị phát hành
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
import InterViewApi from '../../api/intert_view.api';

export default Vue.extend({
    name: 'InterView',
    props: ['website', 'user', 'onResize'],
    components: {

    },
    data() {
        return {
            interviews: [] as any,
            categorys: ['Kỷ năng phỏng vấn', 'Kỷ thuật', 'Cách viết CV', 'Hướng nghiệp', 'Học bổng', 'Nhân vật', 'Xu hướng', 'Sách hay']
        }
    },
    mounted() {
        let that = this
        that.loadInterView();
    },
    methods: {
        getImageUser(filename: string) {
            return uploadApi.getImage('user') + filename;
        },
        getImageInterView(filename: string) {
            return uploadApi.getImage('interview') + filename;
        },
        async loadInterView(){
            let that = this;
            const gp_inter_view = await InterViewApi.getInterView_p();
            console.log(gp_inter_view);
            that.interviews = gp_inter_view.data;
        }
    }
})
</script>

<style scoped>
</style>
