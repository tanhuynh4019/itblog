<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container>
                <h2 class="white--text">
                    Chưa có
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

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <div>
                                1. What is the difference between the equality operators == and ===?
                            </div>
                            <div>
                                <v-chip color="#004D40" dark class="float-end">EASY</v-chip>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <b>Trả lời: </b>
                            Triple equals (===) checks for strict equality, which means both the type and value must be the same. Double equals (==) on the other hand first performs type coercion so that both operands are of the same type and then applies strict comparison.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <div>
                                1. What is the difference between the equality operators == and ===?
                            </div>
                            <div>
                                <v-chip color="#004D40" dark class="float-end">EASY</v-chip>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <b>Trả lời: </b>
                            Triple equals (===) checks for strict equality, which means both the type and value must be the same. Double equals (==) on the other hand first performs type coercion so that both operands are of the same type and then applies strict comparison.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-container>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import uploadApi from '../../api/upload.api';

export default Vue.extend({
    name: ' EyeInterView',
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
