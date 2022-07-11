<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    Quản lý Inter View
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
                        <v-text-field dense outlined style="width: 300px;" placeholder="Nhập nội dung tìm kiếm"
                            :color="website.color.main" append-icon="mdi-magnify" clearable></v-text-field>
                    </v-col>
                    <v-col cols="6" v-if="user">
                        <v-btn v-if="user.role == 1 || user.role == 2 || user.role == 3" depressed dark
                            class="float-end" :color="website.color.main" :to="{ name: 'createinterview' }">
                            Thêm Inter View</v-btn>
                    </v-col>
                </v-row>

                <v-card>
                    <center class="pa-4" v-if="interviews.lenght == 0">
                        <v-img style="width: 350px; max-width: 100%;" height="200"
                            src="https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/code-learn/not-found.svg" />
                        <br />
                        <h3>Không tìm thấy dữ liệu</h3>
                        <div class="mt-2">
                            <b>Không tìm thấy dữ liệu tương ứng với từ khóa tìm kiếm</b>
                        </div>
                    </center>

                    <div class="pa-4">
                        <v-row>
                            <v-col cols="12" v-for="interview in interviews" :key="interview._id">
                                <v-row>
                                    <v-col cols="3">
                                        <v-img :src="getImageInterView(interview.image.filename)" width="100%"
                                            height="180" />
                                    </v-col>
                                    <v-col cols="9">
                                        <h3>{{ interview.name }}</h3>
                                        <div class="text--secondary">
                                            Ngày đăng: {{ interview.create_date }} | Cập nhật: {{ interview.update_date
                                            }} |
                                            Trạng thái: {{ interview.is_browser ? 'Đã duyệt' : 'Chưa duyệt' }}
                                        </div>
                                        <p>{{ interview.description }}</p>
                                        <div>
                                            <v-switch v-model="interview.is_active"
                                                :label="interview.is_active ? 'Đang mở, cho phép mọi người vào xem' : 'Đã đóng, người xem không được phép xem'">
                                            </v-switch>
                                        </div>
                                        <div>
                                            <v-btn text :color="website.color.main">
                                                <v-icon>mdi-eye</v-icon> Xem
                                            </v-btn>
                                            <v-btn text :color="website.color.main" :to="{ path: `/inter-view/edit/${interview._id}` }">
                                                <v-icon>mdi-pencil</v-icon> Sửa
                                            </v-btn>
                                            <v-btn text :color="website.color.main">
                                                <v-icon>mdi-trash-can-outline</v-icon> Xóa
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>

            </v-container>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import uploadApi from '../../api/upload.api';
import InterViewApi from '../../api/intert_view.api';

export default Vue.extend({
    name: 'ManageInterView',
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
        async loadInterView() {
            let that = this;
            const gp_inter_view = await InterViewApi.getInterView_auth();
            that.interviews = gp_inter_view.data;
        }
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
