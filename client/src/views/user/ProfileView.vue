<template>
  <div class="profile">
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-card color="white" class="no-shadow">
            <v-img class="white--text align-start" height="200px" :src="getImageUser(profile.backgroud_photo.filename)">
              <v-card-title class="float-end">
                <v-btn depressed color="white" fab small>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>
            </v-img>
            <v-row>
              <v-col cols="6">
                <v-avatar size="152" class="ml-5" style="margin-top: -25%;">
                  <v-img :src="getImageUser(profile.profile_photo.filename)"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6">
                <div class="pa-2">
                  <v-btn text depressed fab small class="float-end mt-2">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" style="margin-top: -4%">
                <div class="pa-4">
                  <h2 v-if="!profile.first_name || !profile.last_name">{{profile.profile_name}}</h2>
                  <h2 v-if="profile.first_name && profile.last_name">{{profile.last_name + ' ' + profile.first_name}}</h2>
                  <div>NodeJS Developer (MEVN) - ASP.NET MVC</div>
                  <div class="text--secondary">Thuận An, Binh Duong, Vietnam</div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4">

          <v-sheet color="white">
            <div class="pa-4">
              <h4>ĐIỀU TUYỆT VỜI</h4>
              Chưa nhận thấy điều tuyệt vời từ bạn.
            </div>
          </v-sheet>

          <v-sheet color="white" class="mt-5">
            <div class="pa-4">
              <h4>HỌC TẬP</h4>
              Bạn chưa học khóa nào? Học ngay
            </div>
          </v-sheet>

          <v-sheet color="white" class="mt-5">
            <div class="pa-4">
              <h4>TIẾP CẬN (+ 0 exp)</h4>

              <v-sheet color="#C8E6C9">
                <div class="pa-4">
                  <img src="../../images/icon/facebook.png" width="25" class="float-start" alt="" />
                  <div class="float-end"> +0 exp</div>
                  <div>
                    <b class="ml-2">0</b>
                    <div class="mt-1">Bình luận</div>
                  </div>
                </div>
              </v-sheet>

              <v-sheet color="#DCEDC8" class="mt-2">
                <div class="pa-4">
                  <img src="../../images/icon/facebook.png" width="25" class="float-start" alt="" />
                  <div class="float-end"> +0 exp</div>
                  <div>
                    <b class="ml-2">0</b>
                    <div class="mt-1">Thích</div>
                  </div>
                </div>
              </v-sheet>

              <v-sheet color="#F0F4C3" class="mt-2">
                <div class="pa-4">
                  <img src="../../images/icon/facebook.png" width="25" class="float-start" alt="" />
                  <div class="float-end"> +0 exp</div>
                  <div>
                    <b class="ml-2">0</b>
                    <div class="mt-1">Bỏ phiếu</div>
                  </div>
                </div>
              </v-sheet>

              <v-sheet color="#FFECB3" class="mt-2">
                <div class="pa-4">
                  <img src="../../images/icon/facebook.png" width="25" class="float-start" alt="" />
                  <div class="float-end"> +0 exp</div>
                  <div>
                    <b class="ml-2">0</b>
                    <div class="mt-1">Đanh giá</div>
                  </div>
                </div>
              </v-sheet>

            </div>
          </v-sheet>

          <v-sheet color="white" class="mt-5">
            <div class="pa-4">
              <h4>CHỨNG CHỈ</h4>
              Bạn chưa có chứng chỉ nào, nhận ngay.
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import uploadApi from '../../api/upload.api';
import profileApi from '../../api/profile.api';

export default Vue.extend({
  name: 'profile',
  props: ['user', 'website', 'onResize'],
  data: () => ({
    profile: {
      first_name: '',
      profile_name: '',
      last_name: '',
      backgroud_photo: {
        filename: '',
      },
      profile_photo: {
        filename: '',
      }
    }
  }),
  async created() {
    let that = this;
    that.loadProfile();
  },
  methods: {
    getImageUser(filename: string) {
      return uploadApi.getImage('user') + filename;
    },
    async loadProfile() {
      const that = this;
      const g_profile = await profileApi.getProfile();
      this.profile = g_profile.data;
    }
  }
})
</script>

<style scoped>
.profile {
  background-color: #ECEFF1;
  height: 1000px;
}
</style>