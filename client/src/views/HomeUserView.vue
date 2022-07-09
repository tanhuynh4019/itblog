<template>
  <div>
    <v-sheet class="wrap-block-user" :color="website.color.main" dark>
      <v-container>
        <h3 class="mt-5">Xin chào <b class="cyan--text text--lighten-4">{{ user.email }}</b>. Chào mừng bạn đến với
          ITblog. Thông số của bạn</h3>

        <v-row class="mt-5">
          <v-col cols="5">
            <v-sheet color="#00838F" class="rounded">
              <div class="pa-2">
                <v-row no-gutters class="mt-3">
                  <v-col cols="3">
                    <center>
                      <v-avatar size="65">
                        <v-img src="../images/icon/programmer.png"></v-img>
                      </v-avatar>
                    </center>
                  </v-col>
                  <v-col cols="9">
                    <h2 class="white--text">{{profile.profile_name}}</h2>
                    <p>
                      Kỹ thuật phần mềm - Đại học Thủ Dầu Một - Bình Dương
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <b class="yellow--text">{{ user.exp }} EXP</b> Quy định và lợi ích
                    <v-progress-linear class="mt-2" rounded color="lime" height="20" :value="user.exp" striped>
                    </v-progress-linear>
                    <v-row class="mt-1">
                      <v-col cols="4">
                        Cấp 1
                      </v-col>
                      <v-col cols="4" class="text-center">
                        0/50
                      </v-col>
                      <v-col cols="4">
                        <span class="float-end">
                          Cấp độ 2
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="7">
            a
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="mt-5" style="height: 1000px;">

    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import UploadApi from '../api/upload.api'
import ProfileApi from '../api/profile.api'

export default Vue.extend({
  name: 'HomeUser',
  props: ['website', 'user', 'onResize'],
  components: {

  },
  created(){
    let that = this
    that.loadProfile();
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
      profile: {
        profile_name: ''
      },
      urlImageFeature: '',
      features: [
        {
          text: 'Sáng tạo profile riêng biệt',
          content: 'Bạn có thể tùy chỉnh thông tin của mình từ kinh nghiệm, kỹ năng, sở thích,.. Mọi thứ đều được các thành viên và tổ chức tuyển dụng chú ý.',
          icon: UploadApi.getImage('feature') + 'resume.png',
          disabled: false
        },
        {
          text: 'Cuộc sống IT - Kết nối với mọi người',
          content: 'Bạn có những chia sẽ về lĩnh vực của mình, bạn muốn ai đó chia sẽ hoặc muốn tìm lời giải đáp trong cuộc sống. Hãy cùng tham gia với chúng tôi.',
          icon: UploadApi.getImage('feature') + 'neural.png',
          disabled: false
        },
        {
          text: 'Học tập',
          content: 'ITBlog cung cấp môi trường học lập trình miễn phí, chúng tôi cung cấp các giấy chứng nhận sau khi bạn hoàn thành các khóa học.',
          icon: UploadApi.getImage('feature') + 'education.png',
          disabled: false
        },
        {
          text: 'InterView',
          content: 'Chúng tôi sẽ giúp bạn chuẩn bị hành trang cho các cuộc phỏng vấn, chúng tôi tăng các kỷ năng chuyên môn cho bạn trước khi bạn đi phỏng vấn tại một công ty.',
          icon: UploadApi.getImage('feature') + 'job-interview.png',
          disabled: false
        },
        {
          text: 'Vua Fix bug',
          content: 'Bạn đã quá mệt mõi với việc FixBug. Hãy cùng ITBlog tìm ra giải pháp nhé và áp dụng nhanh và ngay cho dự án của bạn.',
          icon: UploadApi.getImage('feature') + 'bug.png',
          disabled: false
        },
        {
          text: 'Mạng xã hội',
          content: 'Chúng tôi là một mạng xã hội IT. Chúng tôi đang dần phát triển các tính năng để bạn có thể tiếp cận và chia sẻ các khoảng khắc với nhau.',
          icon: UploadApi.getImage('feature') + 'networking.png',
          disabled: false
        },
      ]
    }
  },
  methods: {
    async loadProfile(){
      let that = this;
      const g_profile: any = await ProfileApi.getProfile();
      that.profile = g_profile.data;
    }
  }
})
</script>

<style scoped>
.left-introduct {
  margin-top: 15%;
}

.left-introduct .text-main {
  font-size: 56px;
  color: #006064;
}

.left-introduct .text-sub {
  font-size: 28px;
}

h1 {
  font-size: 42px;
}

h2 {
  opacity: 0.8;
  color: #006064
}

p {
  font-size: 16px;
}
</style>
