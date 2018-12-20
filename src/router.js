import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Questions from '@/components/Questions.vue'
import Poll from '@/components/Poll.vue'
import Options from '@/components/Options.vue'
import AddPoll from '@/components/AddPoll.vue'
import LoginForm from '@/components/Login/LoginForm.vue'
import form from '@/components/Form/form.vue'
import AddQuestion from '@/components/AddForm/AddQuestion.vue'
import store from './store'

Vue.use(Router)
// window.axios = require('axios')

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginForm,
      meta: {anonymous:true}
    },
    {
      path: '/poll',
      name: 'poll',
      component: Poll,
      meta:{auth:true}
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/poll/:name/:id',
      name: 'question',
      component: Questions,
      meta:{auth:true}
      // props: true
    },
    {
      path: '/questions/:name/:id',
      name: 'option',
      component: Options,
      meta:{auth:true}
    },
    {
      path: '/poll/add',
      name: 'Add Poll',
      component: AddPoll,
      meta:{auth:true}
    },
    {
      path: '/createPoll',
      name: 'Create Poll',
      component: form,
      meta:{auth:true}
    },
    {
      path: '/addquest',
      name: 'quest',
      component: AddQuestion,
      meta:{auth:true}
    }
  ]
})

// todo factorize this below function
router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.auth)
  const anonymousRequired = to.matched.some((route) => route.meta.anonymous)
  if (authRequired && !store.state.token){
    alert('Please login first!!!')
    next('/')
  } else if (anonymousRequired && store.state.token){
    alert('You are already logged in!!!')
    next('/poll')
  } else {
    next()
  }
})

export default router



