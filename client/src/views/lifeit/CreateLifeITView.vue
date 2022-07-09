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

                <h3>Chủ đề</h3>
                <v-text-field outlined dense label="Tiêu đề" :color="website.color.main" class="mt-2"
                    placeholder="Vui lòng nhập tiêu đề"></v-text-field>
                <v-combobox label="Tag" multiple outlined dense :color="website.color.main" class="mt-2"></v-combobox>
                <v-textarea  :color="website.color.main" class="mt-2" label="Nội dung" outlined></v-textarea>
                <div class="float-end">
                    <v-btn depressed outlined :color="website.color.main" dark>Hủy</v-btn>
                    <v-btn depressed class="ml-2" :color="website.color.main" dark>Đăng</v-btn>
                </div>
            </v-container>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import uploadApi from '../../api/upload.api';

export default Vue.extend({
    name: 'CreateLifeIT',
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
