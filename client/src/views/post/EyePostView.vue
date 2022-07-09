<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    Top 10 việc làm lương cao thu nhập khủng bạn cần biết
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
                    <v-col cols="8">
                        Tiền lương là tiêu chí hàng đầu trong quá trình tìm kiếm việc làm của người lao động. Thông
                        thường, tiền lương sẽ được chi trả vào cuối mỗi tháng làm việc. Bên cạnh đó, cũng có những công
                        việc được trả lương theo cơ chế theo tuần, ngày, giờ. Hiện nay, tại Việt Nam đang có 10 việc làm
                        lương cao kiếm “bội tiền” mà người lao động có thể tham khảo. Hãy cùng Blog.TopCV khám phá cụ
                        thể hơn trong bài viết ngay sau đây.

                        CEO Ngân hàng là vị trí đầu tàu của Ngân hàng. Nhiệm vụ chính của vị trí này đó chính là hoạch
                        định chiến lược, giải pháp kinh doanh giúp ngân hàng duy trì, phát triển ổn định. Thông thường
                        CEO tại các Ngân hàng sẽ đảm nhận vị trí Tổng Giám đốc điều hành ngân hàng, Giám đốc điều hành,
                        giám đốc chi nhánh.
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
    name: 'EyePost',
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
.container {
    max-width: 1200px;
}
</style>
