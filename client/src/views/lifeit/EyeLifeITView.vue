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

        <v-card>
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
                      >By: {{ lifeit.user_auth.profile.profile_name }} | Cập
                      nhật lần cuối: 16 ngày trước</span
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

            <h5 class="mt-5">Bình luận</h5>
            <v-textarea
              outlined
              class="mt-2"
              :color="website.color.main"
              placeholder="Bạn quan tâm chủ đề này, hãy nhập gì đó..."
            ></v-textarea>
            <v-row>
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-btn
                  depressed
                  class="float-end"
                  :color="website.color.main"
                  dark
                  >Bình luận</v-btn
                >
              </v-col>
            </v-row>

            2 Bình luận
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12">
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
                        <b>048204004318</b>
                        <span class="text--secondary"> 2 thg 7, 2022</span>
                      </v-list-item-title>
                      <v-list-item-title class="mt-2">
                        minh cung bi vay :((((
                      </v-list-item-title>
                      <v-list-item-title class="mt-2">
                        <span>
                          <v-icon size="18">mdi-thumb-up-outline</v-icon> 0
                        </span>
                        <span class="ml-2">
                          <v-icon size="18">mdi-thumb-down-outline</v-icon> 0
                        </span>
                        <span class="ml-2">
                          <v-icon size="18">mdi-reply</v-icon> Trả lời
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-divider></v-divider>
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
                        <b>048204004318</b>
                        <span class="text--secondary"> 2 thg 7, 2022</span>
                      </v-list-item-title>
                      <v-list-item-title class="mt-2">
                        minh cung bi vay :((((
                      </v-list-item-title>
                      <v-list-item-title class="mt-2">
                        <span>
                          <v-icon size="18">mdi-thumb-up-outline</v-icon> 0
                        </span>
                        <span class="ml-2">
                          <v-icon size="18">mdi-thumb-down-outline</v-icon> 0
                        </span>
                        <span class="ml-2">
                          <v-icon size="18">mdi-reply</v-icon> Trả lời
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import uploadApi from "../../api/upload.api";
import LifeITApi from "../../api/life_it.api";

export default Vue.extend({
  name: "EyeLifeIT",
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
      lifeit: {},
    };
  },
  mounted() {
    let that = this;
    that.finBySlugLifeIT();
  },
  methods: {
    getImageUser(filename: string) {
      return uploadApi.getImage("user") + filename;
    },
    async finBySlugLifeIT() {
      let that = this;
      const gbs_life_it = await LifeITApi.getBySlugLifeIT({
        slug: that.$route.params.slug,
      });
      console.log(gbs_life_it);
      if (gbs_life_it) {
        that.lifeit = gbs_life_it.data;
      }
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
