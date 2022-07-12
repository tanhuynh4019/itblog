<template>
  <div>
    <v-sheet :color="website.color.main">
      <v-container>
        <h2 class="white--text">Cuộc sống IT: Đăng bài</h2>
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

        <h3>Chủ đề</h3>
        <v-text-field
          v-model="lifeitForm.value.name"
          outlined
          dense
          label="Tiêu đề"
          :color="website.color.main"
          class="mt-2"
          placeholder="Vui lòng nhập tiêu đề"
        ></v-text-field>
        <v-combobox
          v-model="lifeitForm.value.tags"
          label="Tag"
          multiple
          outlined
          dense
          :color="website.color.main"
          class="mt-2"
        ></v-combobox>
        <v-textarea
          v-model="lifeitForm.value.content"
          :color="website.color.main"
          class="mt-2"
          label="Nội dung"
          outlined
        ></v-textarea>
        <div class="float-end">
          <v-btn depressed outlined :color="website.color.main" dark>Hủy</v-btn>
          <v-btn
            @click="createLifeIT()"
            depressed
            class="ml-2"
            :color="website.color.main"
            dark
            >Đăng</v-btn
          >
        </div>
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import uploadApi from "../../api/upload.api";
import LifeITApi from "../../api/life_it.api";

export default Vue.extend({
  name: "CreateLifeIT",
  props: ["website", "user", "onResize"],
  components: {},
  watch: {
    user() {
      if (!this.user) {
        this.$router.push({ name: "home" });
      }
    },
  },
  data() {
    return {
      isLoadingSave: false,
      imageNew: "" as any,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      lifeitForm: {
        valid: true,
        validate: {},
        value: {
          name: "",
          content: "",
          tags: [],
        },
      },
    };
  },
  methods: {
    getImageUser(filename: string) {
      return uploadApi.getImage("user") + filename;
    },
    async createLifeIT() {
      let that = this;
      const formData = new FormData();
      const data = that.lifeitForm.value;
      formData.append("name", data.name);
      formData.append("tags", data.tags);
      formData.append("content", data.content);

      const c_life_it = await LifeITApi.addLifeIT(formData);

      if (c_life_it === "Unauthorized") {
        that.$emit("showSnackbar", {
          snackbar: true,
          text: "Hết phiên đăng nhập!",
        });
        that.isLoadingSave = false;
      } else {
        if (!c_life_it.error) {
          that.isLoadingSave = false;
          that.$emit("showSnackbar", {
            snackbar: true,
            text: c_life_it.message,
          });
          that.$router.push({ path: `/life-it/edit/${c_life_it.data.slug}` });
        } else {
          that.$emit("showSnackbar", {
            snackbar: true,
            text: c_life_it.message,
          });
          that.isLoadingSave = false;
        }
      }
      console.log(data);
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
