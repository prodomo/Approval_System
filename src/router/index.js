import Vue from 'vue'
import Router from 'vue-router'
import ApprovalCreatePage from '@/components/ApprovalCreatePage'
import ApprovalCreateSinglePage from '@/components/ApprovalCreateSinglePage'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/01',
      name: 'ApprovalCreatePage',
      component: ApprovalCreatePage
    },
    {
      path: '/02',
      name: 'ApprovalCreateSinglePage',
      component: ApprovalCreateSinglePage
    },
  ],
})
