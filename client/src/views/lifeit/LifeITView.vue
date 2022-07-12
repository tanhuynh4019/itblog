<template>
  <div>
    <v-sheet :color="website.color.main">
      <v-container>
        <h2 class="white--text">
          Thảo luận chuyện nghề nghiệp IT, các thành viên, các tổ chức sẽ cùng
          bạn thảo luận và cho mọi thứ tốt đẹp hơn
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
          <v-col cols="6">
            <v-text-field
              dense
              outlined
              class="w-100"
              placeholder="Nhập nội dung tìm kiếm"
              :color="website.color.main"
              append-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn
              depressed
              dark
              class="float-end"
              :color="website.color.main"
              :to="{ name: 'createlifeit' }"
              >Thêm chủ đề</v-btn
            >
          </v-col>
        </v-row>

        <v-row style="margin-top: -20px">
          <v-col cols="12" v-for="lifeit in lifeits" :key="lifeit._id">
            <v-card :to="{ path: `/life-it/eye/${lifeit.slug}` }">
              <div class="pa-3">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img
                        :src="
                          getImageUser(
                            lifeit.user_auth.profile.profile_photo.filename
                          )
                        "
                        :alt="lifeit.user_auth.profile.profile_name"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <b>{{ lifeit.name }}</b>
                      </v-list-item-title>
                      <v-list-item-title class="mt-2 text--secondary">
                        <span class="mt-5"
                          >By:
                          {{ lifeit.user_auth.profile.profile_name }}
                          | Cập nhật lần cuối: 16 ngày trước</span
                        >
                        | Bình luận: {{ lifeit.commentCount }}
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
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import uploadApi from "../../api/upload.api";
import LifeITApi from "../../api/life_it.api";

export default Vue.extend({
  name: "LifeIT",
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
      lifeits: [] as any,
    };
  },
  mounted() {
    let that = this;
    that.loadLifeIT();
  },
  methods: {
    getImageUser(filename: string) {
      return uploadApi.getImage("user") + filename;
    },
    async loadLifeIT() {
      let that = this;
      const c_life_it = await LifeITApi.getLifeIT_p();
      console.log(c_life_it);
      that.lifeits = c_life_it.data;
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
