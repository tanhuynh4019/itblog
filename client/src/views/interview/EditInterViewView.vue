<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    Đăng bài interview
                </h2>
                <p class="white--text"> Interview là gì? Interview là thuật ngữ Tiếng Anh được dùng phổ biến trong lĩnh vực tuyển
                    dụng. Trong từ điển Anh-Việt Interview có nghĩa là sự gặp gỡ, cuộc nói chuyện, gặp mặt, cuộc phỏng
                    vấn/bài phỏng vấn. </p>
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
                        disabled: false,
                        href: '/inter-view',
                    },
                    {
                        text: 'Đăng bài Interview',
                        disabled: true,
                    },
                ]">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>

                <p v-if="user.role == 0">
                    Chào {{ user.profile_name }}, rất vui vì bạn đã tìm đến trang này, ITblog rất vinh hạnh nếu bạn trở
                    thành biên tập viên của ITblog. Bạn có thể gửi e-mail hoặc liên hệ tại đây để được chúng tôi xét
                    duyệt
                    cho bạn trở thành người biên soạn. Quyền lợi là bạn sẽ nhận được lương cũng như ưu đãi từ IT blog.

                <ul class="mt-5">
                    <li>Email: huynhminhtan9940@gmail.com</li>
                    <li>Phone: 0924404019 (Tấn)</li>
                    <li>Quy định làm biên tập viên: Tại đây</li>
                </ul>
                </p>

                <div v-if="user.role == 1 || user.role == 2 || user.role == 3">

                    <p>
                        <b>Hướng dẫn:</b>
                        Bạn phải tạo một khung chứa trước khi tạo câu hỏi, khung chứa bao gồm hình ảnh, mô tả, nội dung,
                        tiêu đề. Sau khi tạo xong bạn sẽ được chuyển qua khu vực cá nhân của đề tài này, bạn có thể tạo
                        nhiều khung và quản lý nó ở khu vực của mình.
                    </p>

                    <v-form>
                        <v-row>
                            <v-col cols="8">
                                <v-text-field v-model="interviewForm.value.name" outlined label="Tiêu đề" dense
                                    :color="website.color.main" placeholder="Tiêu đề phải từ 5 đến 250 ký tự">
                                </v-text-field>
                                <v-file-input @change="uploadImage()" dense v-model="interviewForm.value.image"
                                    :color="website.color.main" counter label="Ảnh minh họa"
                                    prepend-icon="mdi-paperclip" outlined :show-size="1000">
                                    <template v-slot:selection="{ index, text }">
                                        <v-chip v-if="index < 2" color="#006064" dark label small>
                                            {{ text }}
                                        </v-chip>

                                        <span v-else-if="index === 2"
                                            class="text-overline grey--text text--darken-3 mx-2">
                                            +{{ interviewForm.value.image.length - 2 }} File(s)
                                        </span>
                                    </template>
                                </v-file-input>

                                <v-textarea v-model="interviewForm.value.description" outlined label="Mô tả" dense
                                    :color="website.color.main" placeholder="Mô tả ngắn về chủ đề Interview này">
                                </v-textarea>

                                <ckeditor :editor="editor" v-model="interviewForm.value.content" :config="editorConfig">
                                </ckeditor>



                                <div class="float-end mt-5">
                                    <v-btn depressed outlined :color="website.color.main" dark>Hủy</v-btn>
                                    <v-btn depressed class="ml-2" :color="website.color.main" dark>Đăng</v-btn>
                                </div>

                            </v-col>
                            <v-col cols="4">
                                <v-card>
                                    <template slot="progress">
                                        <v-progress-linear color="deep-purple" height="10" indeterminate>
                                        </v-progress-linear>
                                    </template>

                                    <v-img height="250" :src="imageNew">
                                    </v-img>

                                    <v-card-title>{{ interviewForm.value.name ? interviewForm.value.name : 'Trống' }}
                                    </v-card-title>

                                    <v-card-text>
                                        <v-row align="center" class="mx-0">
                                            <v-rating :value="5" color="amber" dense half-increments readonly size="14">
                                            </v-rating>

                                            <div class="grey--text ms-4">
                                                0 (0)
                                            </div>
                                        </v-row>

                                        <div class="my-4 text-subtitle-1">
                                            By {{ user.profile_name }}
                                        </div>

                                        <div>{{ interviewForm.value.description ? interviewForm.value.description :
                                                "Trống"
                                        }}</div>
                                    </v-card-text>

                                    <v-divider class="mx-4"></v-divider>

                                    <v-card-title>Đang có 0 câu hỏi</v-card-title>

                                    <v-card-actions>
                                        <v-btn color="deep-purple lighten-2" text>
                                            Bắt đầu
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-form>
                </div>
            </v-container>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import uploadApi from '../../api/upload.api';

export default Vue.extend({
    name: 'EditInterView',
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
    created() {
        let that = this
        that.imageNew = that.getImageCommon('none_img.png');
    },  
    data() {
        return {
            imageNew: '' as any,
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
            },
            categorys: ['Kỷ năng phỏng vấn', 'Kỷ thuật', 'Cách viết CV', 'Hướng nghiệp', 'Học bổng', 'Nhân vật', 'Xu hướng', 'Sách hay'],
            interviewForm: {
                valid: true,
                validate: {

                },
                value: {
                    name: '',
                    description: '',
                    image: [],
                    content: ''
                }
            }
        }
    },
    methods: {
        getImageUser(filename: string) {
            return uploadApi.getImage('user') + filename;
        },
        getImageBanner(filename: string) {
            return uploadApi.getImage('banner') + filename;
        },
        getImageCommon(filename: string) {
            return uploadApi.getImage('common') + filename;
        },
        uploadImage() {
            let that = this;
            const reader = new FileReader();
            const image_f: any = that.interviewForm.value.image;

            reader.addEventListener("load", function () {
                that.imageNew = reader.result;
            }, false);

            if (image_f) {
                reader.readAsDataURL(image_f);
            }
            else {
                that.imageNew = that.getImageCommon('none_img.png')
            }
        }
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
