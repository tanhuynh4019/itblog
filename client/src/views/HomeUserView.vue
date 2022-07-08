<template>
  <div>
    <v-sheet class="home">
      <v-img :height="onResize.isMobile? 450 : onResize.isIpad ? 360 : 780" src="../images/banner/banner1.jpg">
        <v-container>
          <v-row :class="onResize.isMobile || onResize.isIpad ? 'text-center' : ''">
            <v-col cols="12" md="7" lg="8" class="left-introduct">
              <h1 class="text-main">NỀN TẢNG KẾT NỐI IT</h1>
              <P class="text-sub">
                Chúng tôi mang kiến thức và trải nghiệm IT miễn phí đến cho bạn
              </P>
              <p class="text-sub font-weight-bold">
                Nếu bạn là Dev. OK website này dành cho bạn
              </p>
            </v-col>
            <v-col cols="12" md="5" lg="4" class="mt-15">
              
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-sheet>
    <v-sheet class="mt-15">
      <v-img height="780" src="../images/banner/banner2.png">
        <v-container>
          <h1 class="text-center cyan--text text--darken-4">Chúng tôi làm gì cho bạn</h1>
          <v-row>
            <v-col cols="5" lg="5">

            </v-col>
            <v-col cols="7" lg="7" class="mt-15">
              <div v-for="feature in features" :key="feature.text">
                <v-img class="float-start" :src="feature.icon" width="30" />
                <div>
                  <h2 class="ml-5 float-start">{{ feature.text }}</h2>
                  <p class="float-start mt-2">{{ feature.content }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-sheet>
    <v-sheet class="mt-5" style="height: 1000px;">

    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import UploadApi from '../api/upload.api'

export default Vue.extend({
  name: 'HomeUser',
  props: ['website', 'user', 'onResize'],
  components: {
   
  },
  data() {
    return {
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

h1{
  font-size: 42px;
}

h2{
  opacity: 0.8;
  color: #006064
}

p{
  font-size: 16px;
}
</style>
