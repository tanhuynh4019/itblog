<template>
  <div>
    <v-sheet :color="website.color.main">
      <v-container>
        <h2 class="white--text">Bài viết: Đăng bài</h2>
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
          <v-col cols="12"
            ><v-text-field
              v-model="blogForm.value.name"
              outlined
              dense
              label="Tiêu đề"
              :color="website.color.main"
              class="mt-2"
              placeholder="Vui lòng nhập tiêu đề"
            ></v-text-field
          ></v-col>
          <v-col cols="12"
            ><v-file-input
              @change="uploadImage()"
              dense
              v-model="blogForm.value.image"
              :color="website.color.main"
              counter
              label="Ảnh minh họa"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="#006064" dark label small>
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ blogForm.value.image.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </v-col>
          <v-col cols="12">
            <v-chip-group
              v-model="blogForm.value.categorys"
              active-class="red--text"
              column
            >
              <v-chip v-for="category in categorys" :key="category">
                {{ category }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cols="12">
            <v-combobox
              label="Tag"
              v-model="blogForm.value.tags"
              multiple
              outlined
              dense
              :color="website.color.main"
              class="mt-2"
            ></v-combobox>
          </v-col>
          <v-col cols="12">
            <label>Mô tả</label>
            <ckeditor
              :editor="editor"
              v-model="blogForm.value.description"
              :config="editorConfig"
              :color="website.color.main"
              class="mt-2"
              label="Mô tả"
            ></ckeditor>
          </v-col>
          <v-col cols="12">
            <label>Nội dung</label>
            <ckeditor
              :editor="editor"
              v-model="blogForm.value.content"
              :config="editorConfig"
              :color="website.color.main"
              class="mt-2"
            ></ckeditor>
          </v-col>
          <v-col cols="12">
            <div class="float-end">
              <v-btn depressed outlined :color="website.color.main" dark
                >Hủy</v-btn
              >
              <v-btn
                @click="createBlog()"
                :loading="isLoadingSave"
                depressed
                class="ml-2"
                :color="website.color.main"
                dark
                >Đăng</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import uploadApi from '../../api/upload.api'
import BlogApi from '../../api/blog.api'

export default Vue.extend({
  name: 'CreatePost',
  props: ['website', 'user', 'onResize'],
  components: {},
  watch: {
    user() {
      if (!this.user) {
        this.$router.push({ name: 'home' })
      }
    },
  },
  created() {
    let that = this
    that.imageNew = that.getImageCommon('none_img.png')
  },
  data() {
    return {
      isLoadingSave: false,
      imageNew: '' as any,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
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
      blogForm: {
        valid: true,
        validate: {},
        value: {
          name: '',
          content: '',
          description: '',
          tags: [],
          categorys: [],
        },
      },
    }
  },
  methods: {
    getImageCommon(filename: string) {
      return uploadApi.getImage('common') + filename
    },
    uploadImage() {
      let that = this
      const reader = new FileReader()
      const image_f: any = that.blogForm.value.image

      reader.addEventListener(
        'load',
        function () {
          that.imageNew = reader.result
        },
        false
      )

      if (image_f) {
        reader.readAsDataURL(image_f)
      } else {
        that.imageNew = that.getImageCommon('none_img.png')
      }
    },
    async createBlog() {
      let that = this
      const formData = new FormData()
      const data = that.blogForm.value
      formData.append('image', data.image as any)
      formData.append('name', data.name)
      formData.append('tags', data.tags)
      formData.append('content', data.content)
      formData.append('description', data.description)
      formData.append('categorys', data.categorys)
      const c_blog = await BlogApi.addBlog(formData)
      if (c_blog === 'Unauthorized') {
        that.$emit('showSnackbar', {
          snackbar: true,
          text: 'Hết phiên đăng nhập!',
        })
        that.isLoadingSave = false
      } else {
        if (!c_blog.error) {
          that.isLoadingSave = false
          that.$emit('showSnackbar', {
            snackbar: true,
            text: c_blog.message,
          })
          that.$router.push({ path: `/post` })
        } else {
          that.$emit('showSnackbar', {
            snackbar: true,
            text: c_blog.message,
          })
          that.isLoadingSave = false
        }
      }
      console.log(data)
    },
  },
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
