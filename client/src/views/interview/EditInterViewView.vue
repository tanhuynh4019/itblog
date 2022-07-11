<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    {{ interview.name }}
                </h2>
                <p class="white--text" v-html="interview.description"> </p>
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
                    <v-row>
                        <v-col cols="4">
                            <v-card>
                                <template slot="progress">
                                    <v-progress-linear color="deep-purple" height="10" indeterminate>
                                    </v-progress-linear>
                                </template>
                                <v-img height="250" :src="getImageInterView(interview.image.filename)">
                                </v-img>

                                <v-card-title>{{ interview.name ? interview.name : 'Trống' }}
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

                                    <div>{{ interview.description ? interview.description :
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
                        <v-col cols="8">
                            <v-row>
                                <v-col cols="8">
                                    <b>Chú ý:</b> Hãy xoanh quanh những vấn đề liên quan đến chủ đề "{{ interview.name
                                    }}", bài
                                    viết này sẽ được kiểm duyệt nếu bạn là editor. Các ADMIN, SUPERADMIN có thể đăng tải
                                    tùy ý.
                                </v-col>
                                <v-col cols="4">
                                    <v-btn @click="clickDialogSaveQuestion()" class="float-end" depressed
                                        :color="website.color.main" dark>Thêm câu hỏi
                                    </v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-expansion-panels>
                                        <v-expansion-panel v-for="(item, index) in interviewquestions" :key="index">
                                            <v-expansion-panel-header>
                                                <div>
                                                    <span v-html="item.question"></span>
                                                    <br />
                                                    <v-btn depressed outlined>Hiển thị đáp án</v-btn>
                                                </div>
                                                <div>
                                                    <v-chip color="#004D40" dark class="float-end">Junior</v-chip>
                                                </div>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <b>Trả lời: </b>
                                                <p v-html="item.answer"></p>
                                                <v-alert text :color="website.color.main">
                                                    <h3 class="text-h5">
                                                        Tốt nhất để nghe
                                                    </h3>
                                                    <div><p v-html="item.answer_good"></p></div>

                                                    <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
                                                </v-alert>
                                                <b>Trả lời nhanh: </b>
                                                
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>

                <v-dialog v-model="dialogSaveQuestion" scrollable max-width="800px">
                    <v-card>
                        <v-card-title>{{ titleDialog }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 600px;">

                            <v-form v-model="interviewQuestionForm.valid" ref="interviewQuestionForm">
                                <div class="mt-2"></div>
                                <b>Câu hỏi</b>
                                <ckeditor v-model="interviewQuestionForm.value.question" :editor="editor"
                                    :config="editorConfig">
                                </ckeditor>
                                <br />
                                <b>Câu trả lời</b>
                                <ckeditor v-model="interviewQuestionForm.value.answer" :editor="editor"
                                    :config="editorConfig">
                                </ckeditor>
                                <br />
                                <b>Trả lời ngắn gọn</b>
                                <ckeditor v-model="interviewQuestionForm.value.answer_good" :editor="editor"
                                    :config="editorConfig">
                                </ckeditor>
                                <br />
                                <b>Mức độ</b>
                                <v-chip-group v-model="interviewQuestionForm.value.level" active-class="red--text"
                                    column>
                                    <v-chip v-for="level in levels" :key="level">
                                        {{ level }}
                                    </v-chip>
                                </v-chip-group>
                                <br />
                                <b>Nhân vật phù hợp</b>
                                <v-chip-group v-model="interviewQuestionForm.value.figure" active-class="red--text"
                                    column>
                                    <v-chip v-for="figure in figures" :key="figure">
                                        {{ figure }}
                                    </v-chip>
                                </v-chip-group>
                                <br />
                                <v-switch v-model="interviewQuestionForm.value.is_active" :color="website.color.main"
                                    :label="interviewQuestionForm.value.is_active ? 'Cho phép hiển thị sau khi đăng câu hỏi' : 'không cho phép hiển thị sau khi đăng câu hỏi'">
                                </v-switch>
                            </v-form>

                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn color="blue darken-1" text @click="dialogSaveQuestion = false">
                                Đóng
                            </v-btn>
                            <v-btn @click="addInterViewQuestion()" color="blue darken-1" text>
                                Lưu
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import uploadApi from '../../api/upload.api';
import InterViewApi from '../../api/intert_view.api';
import InterViewQuestion from '../../api/inter_view_question';

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
        that.finBySlugInterView();
    },
    mounted() {
    },
    data() {
        return {
            interviewquestions: [] as any,
            levels: ['Dễ', 'Trung bình', 'Khó', 'Rất khó'],
            figures: ['Freser', 'Inter', 'Junior', 'Mid-Level', 'Senior',],
            titleDialog: '',
            dialogSaveQuestion: false,
            interview: {} as any,
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
            },
            interviewQuestionForm: {
                valid: true,
                validate: {},
                value: {
                    question: '',
                    answer: '',
                    answer_good: '',
                    level: 0 as any,
                    figure: 0 as any,
                    is_active: true as any
                },
            },
        }
    },
    methods: {
        clickDialogSaveQuestion() {
            let that = this;
            that.dialogSaveQuestion = true;
            that.titleDialog = 'Thêm câu hỏi và câu trả lời cho chủ đề: ' + that.interview.name
        },
        getImageUser(filename: string) {
            return uploadApi.getImage('user') + filename;
        },
        getImageBanner(filename: string) {
            return uploadApi.getImage('banner') + filename;
        },
        getImageCommon(filename: string) {
            return uploadApi.getImage('common') + filename;
        },
        getImageInterView(filename: string) {
            return uploadApi.getImage('interview') + filename;
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
        },
        async finBySlugInterView() {
            let that = this;
            const gbs_inter_view = await InterViewApi.getBySlugInterView({ slug: that.$route.params.slug });
            if (gbs_inter_view) {
                that.interview = gbs_inter_view.data;
                that.loadByIdToInterViewQuestion(gbs_inter_view.data._id);
            }
        },
        async addInterViewQuestion() {
            let that = this;
            const formData = new FormData();
            const data = that.interviewQuestionForm.value;
            formData.append('question', data.question);
            formData.append('answer', data.answer);
            formData.append('answer_good', data.answer_good);
            formData.append('is_active', data.is_active);
            formData.append('level', data.level);
            formData.append('figure', data.figure);
            formData.append('id_inter_view', that.interview._id);

            const c_inter_view_question = await InterViewQuestion.addInterViewQuestion(formData);
        },
        async loadByIdToInterViewQuestion(idInterView: string) {
            let that = this;
            const gbiiv_inter_view_question = await InterViewQuestion.getByIdToInterViewQuestion({ idInterView });
            that.interviewquestions = gbiiv_inter_view_question.data;
        }
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
