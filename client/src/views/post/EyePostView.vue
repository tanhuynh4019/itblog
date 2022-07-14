<template>
  <div>
    <v-sheet :color="website.color.main">
      <v-container>
        <h2 class="white--text">
          <v-text>{{ blogs.name }}</v-text>
        </h2>
      </v-container>
    </v-sheet>
    <v-sheet class="mt-5" style="height: 1000px">
      <v-container>
        <v-breadcrumbs
          style="margin-left: -23px"
          :items="[
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
          ]"
        >
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>

        <v-row>
          <v-col cols="8">
            <v-text v-html="blogs.content"></v-text>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import uploadApi from '../../api/upload.api'
import BlogApi from '../../api/blog.api'
export default Vue.extend({
  name: 'EyePost',
  props: ['website', 'user', 'onResize'],
  components: {},
  watch: {
    user() {
      if (!this.user) {
        this.$router.push({ name: 'home' })
      }
    },
  },
  data() {
    return {
      blogs: {},
      categorys: [
        'Kỹ năng phỏng vấn',
        'Kỹ thuật',
        'Cách viết CV',
        'Hướng nghiệp',
        'Học bổng',
        'Nhân vật',
        'Xu hướng',
        'Sách hay',
      ],
    }
  },
  mounted() {
    let that = this
    that.finBySlugBlog()
  },
  methods: {
    getImageUser(filename: string) {
      return uploadApi.getImage('user') + filename
    },
    async finBySlugBlog() {
      let that = this
      const gbs_blog = await BlogApi.getBySlugBlog({
        slug: that.$route.params.slug,
      })
      console.log(gbs_blog)
      if (gbs_blog) {
        that.blogs = gbs_blog.data
      }
    },
  },
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
