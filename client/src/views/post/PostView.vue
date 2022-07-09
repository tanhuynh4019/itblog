<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    Bài viết hay IT cho bạn
                </h2>
            </v-container>
        </v-sheet>
        <v-sheet :color="website.color.main">
            <v-container>
                <v-btn text dark :to="{ name: 'post' }">Trang chủ</v-btn>
                <v-btn text dark>Kỷ năng phỏng vấn</v-btn>
                <v-btn text dark>Kỷ thuật</v-btn>
                <v-btn text dark>Cách viết CV</v-btn>
                <v-btn text dark>Hướng nghiệp</v-btn>
                <v-btn text dark>Học bổng</v-btn>
                <v-btn text dark>Nhân vật</v-btn>
                <v-btn text dark>Xu hướng</v-btn>
                <v-btn text dark>Sách hay</v-btn>
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
                        <v-btn depressed dark class="float-end" :color="website.color.main" :to="{ name: 'createpost' }">
                            Thêm bài viết</v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <h3>BÀI MỚI NHẤT</h3>
                        <v-row class="mt-2">
                            <v-col cols="12">
                                <v-card class="no-shadow" :to="{path: `/post/eye/chua_co`}">
                                    <v-row>
                                        <v-col cols="4">
                                            <v-img height="180"
                                                src="https://blog.topcv.vn/wp-content/uploads/2022/05/viec-lam-luong-cao-218x150.jpg">
                                            </v-img>
                                        </v-col>
                                        <v-col cols="8">
                                            <h3>Top 10 việc làm lương cao thu nhập khủng bạn cần biết</h3>
                                            <p class="text--secondary mt-3">Tiền lương là tiêu chí hàng đầu trong quá
                                                trình
                                                tìm kiếm việc làm của người lao động. Thông thường, tiền lương sẽ được
                                                chi
                                                trả vào...</p>
                                            <v-chip dark :color="website.color.main">Hướng nghiệp</v-chip>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <v-img height="180"
                                            src="https://blog.topcv.vn/wp-content/uploads/2022/06/luong-khoan-la-gi-topcv-218x150.jpg">
                                        </v-img>
                                    </v-col>
                                    <v-col cols="8">
                                        <h3>Lương khoán là gì? Lương khoán phải đóng BHXH hay không?</h3>
                                        <p class="text--secondary mt-3">Lương khoán là hình thức trả lương phổ biến được
                                            các doanh nghiệp áp dụng. Vậy lương khoán là gì? Loại hình thanh toán này có
                                            ưu...</p>
                                        <v-chip dark :color="website.color.main">Hướng nghiệp</v-chip>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <h3>TOP BÀI VIẾT HAY</h3>
                        <v-row class="mt-2">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <v-img height="180"
                                            src="https://blog.topcv.vn/wp-content/uploads/2022/05/viec-lam-luong-cao-218x150.jpg">
                                        </v-img>
                                    </v-col>
                                    <v-col cols="8">
                                        <h3>Top 10 việc làm lương cao thu nhập khủng bạn cần biết</h3>
                                        <p class="text--secondary mt-3">Tiền lương là tiêu chí hàng đầu trong quá trình
                                            tìm kiếm việc làm của người lao động. Thông thường, tiền lương sẽ được chi
                                            trả vào...</p>
                                        <v-chip dark :color="website.color.main">Hướng nghiệp</v-chip>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <v-img height="180"
                                            src="https://blog.topcv.vn/wp-content/uploads/2022/06/luong-khoan-la-gi-topcv-218x150.jpg">
                                        </v-img>
                                    </v-col>
                                    <v-col cols="8">
                                        <h3>Lương khoán là gì? Lương khoán phải đóng BHXH hay không?</h3>
                                        <p class="text--secondary mt-3">Lương khoán là hình thức trả lương phổ biến được
                                            các doanh nghiệp áp dụng. Vậy lương khoán là gì? Loại hình thanh toán này có
                                            ưu...</p>
                                        <v-chip dark :color="website.color.main">Hướng nghiệp</v-chip>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
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
    name: 'PostView',
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
.container {
    max-width: 1200px;
}
</style>
