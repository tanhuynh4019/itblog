import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/user/LoginView.vue'
import RegisterView from '../views/user/RegisterView.vue'
import ProfileView from '../views/user/ProfileView.vue'

import HomeUserView from '../views/HomeUserView.vue'

import LearningView from '../views/learning/LearningView.vue'

import LifeITView from '../views/lifeit/LifeITView.vue'
import CreateLifeITView from '../views/lifeit/CreateLifeITView.vue'
import EyeLifeITView from '../views/lifeit//EyeLifeITView.vue'

import PostView from '../views/post/PostView.vue'
import CreatePostView from '../views/post/CreatePostView.vue'
import EyePostView from '../views/post/EyePostView.vue'

import InterViewView from '../views/interview/IntervVewView.vue'
import CreateInterViewView from '../views/interview/CreateViewView.vue'
import EyeInterViewView from '../views/interview/EyeInterViewView.vue'
import EditInterViewView from '../views/interview/EditInterViewView.vue'

import Error404View from '../views/error/Error404View.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    name: 'homeuser',
    component: HomeUserView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/sign-in',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/404',
    name: 'error404',
    component: Error404View
  },
  {
    path: '/learning',
    name: 'learning',
    component: LearningView
  },
  {
    path: '/life-it',
    name: 'lifeit',
    component: LifeITView
  },
  {
    path: '/life-it/create',
    name: 'createlifeit',
    component: CreateLifeITView
  },
  {
    path: '/life-it/eye/:slug',
    name: 'eyelifeit',
    component: EyeLifeITView
  },
  {
    path: '/post',
    name: 'post',
    component: PostView
  },
  {
    path: '/post/create',
    name: 'createpost',
    component: CreatePostView
  },
  {
    path: '/post/eye/:slug',
    name: 'eyepost',
    component: EyePostView
  },
  {
    path: '/inter-view',
    name: 'interview',
    component: InterViewView
  },
  {
    path: '/inter-view/create',
    name: 'createinterview',
    component: CreateInterViewView
  },
  {
    path: '/inter-view/eye/:slug',
    name: 'eyeinterview',
    component: EyeInterViewView
  },
  {
    path: '/inter-view/edit/:id',
    name: 'editinterview',
    component: EditInterViewView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
