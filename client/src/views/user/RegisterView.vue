<template>
    <div v-if="!user">
        <center>
            <v-card width="400">
                <div class="pa-6 text-start">
                    <h3>Đăng nhập</h3>
                    <p>Trải nghiệm công nghệ IT tại ITblog</p>

                    <v-form v-model="userFrom.valid" ref="userFrom">
                        <v-text-field v-model="userFrom.value.email" :rules="userFrom.validate.email" dense outlined
                            label="E-mail đăng nhập" :color="website.color.main">
                        </v-text-field>
                        <v-text-field v-model="userFrom.value.password" :rules="userFrom.validate.password"
                            type="password" dense outlined label="Mật khẩu" :color="website.color.main">
                        </v-text-field>
                        <v-text-field v-model="userFrom.value.confirm_password" :rules="[passwordConfirmationRule]"
                            type="password" dense outlined label="Xác nhận mật khẩu" :color="website.color.main">
                        </v-text-field>
                    </v-form>

                    <v-btn @click="register()" :loading="isLoadingSave" class="w-100 rounded-pill"
                        :color="website.color.main" dark depressed large>Đăng ký</v-btn>

                    <div class="mt-5 text-center">Hoặc</div>

                    <v-btn class="w-100 rounded-pill mt-5 text-capitalize" outlined :color="website.color.main" dark
                        depressed large>
                        <img width="22" height="24" src="../../images/icon/google.png" />
                        <span class="ml-2 text--secondary">Đăng nhập bằng Google</span>
                    </v-btn>
                    <v-btn class="w-100 rounded-pill mt-5 text-capitalize" outlined :color="website.color.main" dark
                        depressed large>
                        <img width="22" height="24" src="../../images/icon/facebook.png" />
                        <span class="ml-2 text--secondary">Đăng nhập bằng Facebook</span>
                    </v-btn>
                    <v-btn class="w-100 rounded-pill mt-5 text-capitalize" outlined :color="website.color.main" dark
                        depressed large>
                        <img width="22" height="24" src="../../images/icon/github.png" />
                        <span class="ml-2 text--secondary">Đăng nhập bằng Github</span>
                    </v-btn>

                    <p class="text-center mt-10">Bạn đã có tài khoản ITBlog ? <router-link
                            class="cyan--text text--darken-4 font-weight-bold" :to="{ name: 'login' }">Đăng nhập
                        </router-link>
                    </p>
                </div>
            </v-card>
        </center>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserApi from '../../api/user.api'

export default Vue.extend({
    name: 'Register',
    props: ['website', 'user'],
    data: () => ({
        isLoadingSave: false,
        userFrom: {
            value: {
                username: '',
                password: '',
                email: '',
                confirm_password: ''
            },
            valid: true,
            validate: {
                email: [
                    (v: string) => !!v || 'E-mail không được để trống',
                    (v: string) => /.+@.+\..+/.test(v) || 'E-mail không đúng định dạng',
                ],
                password: [
                    (v: string) => !!v || 'Mật khẩu không được để trống',
                    (v: string) => (v && v.length >= 5) || 'Mật khẩu phải trên 5 ký tự',
                    (v: string) => (v && v.length <= 30) || 'Mật khẩu không vượt quá 30 ký tự'
                ]
            }
        }
    }),
    computed: {
        passwordConfirmationRule() {
            return () => (this.userFrom.value.password === this.userFrom.value.confirm_password) || 'Xác nhận mật khẩu không khớp!'
        }
    },
    mounted() {
        if (this.user) {
            this.$router.push({ name: 'error404' })
        }
    },
    watch: {
        user() {
            if (this.user) {
                this.$router.push({ name: 'error404' })
            }
        }
    },
    methods: {
        async register() {
            let that = this;
            const valid = (that.$refs.userFrom as Vue & { validate: () => boolean }).validate();
            if (valid) {
                that.isLoadingSave = true;
                const formData = new FormData();
                formData.append('email', that.userFrom.value.email);
                formData.append('password', that.userFrom.value.password);
                formData.append('confirm_password', that.userFrom.value.confirm_password);

                const c_user = await UserApi.register(formData);
                if (!c_user.error) {
                    localStorage.setItem("token_id", c_user.data.token_id);
                    that.$emit('showSnackbar', { snackbar: true, text: c_user.message });

                    const g_user: any = await UserApi.getAuth();
                    that.$emit('userEmit', g_user.data);

                    that.$router.push({ path: `/profile/${c_user.data.username}` })
                } else {
                    that.$emit('showSnackbar', { snackbar: true, text: c_user.message });
                    that.isLoadingSave = false;
                }
            }
        }
    }
})
</script>
