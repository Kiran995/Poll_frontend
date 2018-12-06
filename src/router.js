import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Questions from '@/components/Questions.vue'
import Poll from '@/components/Poll.vue'
import Options from '@/components/Options.vue'
import AddPoll from '@/components/AddPoll.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'poll',
      component: Poll
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
      // props: true
    },
    {
      path: '/questions/:name/:id',
      name: 'option',
      component: Options,
    },
    {
      path: '/poll/add',
      name: 'Add Poll',
      component: AddPoll
    }
  ]
})



