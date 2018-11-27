import Vue from 'vue'
import Router from 'vue-router'
const index = r => require.ensure([], () => r(require('../pages/index/index.vue')), 'index')
const other = r => require.ensure([], () => r(require('../pages/other/index.vue')), 'other')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: 'index'
      },
      component: index
    },
    {
      path: '/other',
      name: 'other',
      meta: {
        title: 'other'
      },
      component: other
    }
  ]
})
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title
  next()
})

export default router
