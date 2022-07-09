<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    Cuộc sống IT: Đăng bài
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

                <v-card>
                    <div class="pa-3">
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <img :src="getImageUser(lifeit.author.profile_photo.filename)"
                                        :alt="lifeit.author.profile_name">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>
                                        <b>{{ lifeit.name }}</b>
                                    </v-list-item-title>
                                    <v-list-item-title class="mt-2 text--secondary">
                                        <span class="mt-5">By: {{ lifeit.author.profile_name }} | Cập nhật lần
                                            cuối: 16 ngày
                                            trước</span> | Bình luận: {{ lifeit.commentCount }}
                                    </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action width="200">
                                    <v-icon>mdi-cards-heart</v-icon>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        <p>{{ lifeit.content }}...</p>

                        <div>
                            <v-chip-group active-class="primary--text" column>
                                <v-chip v-for="(tag, i) in lifeit.tags" :key="i">
                                    {{ tag }}
                                </v-chip>
                            </v-chip-group>
                        </div>

                        <h5 class="mt-5">Bình luận</h5>
                        <v-textarea outlined class="mt-2" :color="website.color.main" placeholder="Bạn quan tâm chủ đề này, hãy nhập gì đó..."></v-textarea>
                        <v-row>
                            <v-col cols="6">
                            </v-col>
                            <v-col cols="6">
                                <v-btn depressed class="float-end" :color="website.color.main" dark>Bình luận</v-btn>
                            </v-col>
                        </v-row>

                        2 Bình luận
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="12">
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-avatar>
                                            <img :src="getImageUser(lifeit.author.profile_photo.filename)"
                                                :alt="lifeit.author.profile_name">
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <b>048204004318</b> <span class="text--secondary">2 thg 7, 2022</span>
                                            </v-list-item-title>
                                            <v-list-item-title class="mt-2">
                                                minh cung bi vay :((((
                                            </v-list-item-title>
                                            <v-list-item-title class="mt-2">
                                                <span>
                                                    <v-icon size="18">mdi-thumb-up-outline</v-icon> 0
                                                </span>
                                                <span class="ml-2">
                                                    <v-icon size="18">mdi-thumb-down-outline</v-icon> 0
                                                </span>
                                                <span class="ml-2">
                                                    <v-icon size="18">mdi-reply</v-icon> Trả lời
                                                </span>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                            <v-col cols="12">
                                <v-divider></v-divider>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-avatar>
                                            <img :src="getImageUser(lifeit.author.profile_photo.filename)"
                                                :alt="lifeit.author.profile_name">
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <b>048204004318</b> <span class="text--secondary">2 thg 7, 2022</span>
                                            </v-list-item-title>
                                            <v-list-item-title class="mt-2">
                                                minh cung bi vay :((((
                                            </v-list-item-title>
                                            <v-list-item-title class="mt-2">
                                                <span>
                                                    <v-icon size="18">mdi-thumb-up-outline</v-icon> 0
                                                </span>
                                                <span class="ml-2">
                                                    <v-icon size="18">mdi-thumb-down-outline</v-icon> 0
                                                </span>
                                                <span class="ml-2">
                                                    <v-icon size="18">mdi-reply</v-icon> Trả lời
                                                </span>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
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

export default Vue.extend({
    name: 'EyeLifeIT',
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
            lifeit: {
                _id: 1,
                name: 'python (2,3) build-in trên codelearn bị lỗi không chạy được',
                content: 'Ngoài ngôn ngữ python trong khóa python cơ bản ra thì khi sử dụng python ở các khóa học khác hay luyện tập đều trả về kết quả lỗi ở những line không được viết dẫn đến không thể run và trả bài, mình đã paste thử code mình viết vào pycharm và chạy bình thường nhưng trên web thì hiện lỗi',
                tags: ['Lỗi'],
                commentCount: 2,
                author: {
                    profile_name: 'tanhuynh9940',
                    profile_photo: {
                        filename: 'profile.png'
                    }
                },
                updated_date: '2022-09-07',
                slug: 'chua-co'
            }
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
