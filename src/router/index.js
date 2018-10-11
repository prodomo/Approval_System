import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ApprovalCreatePage from '@/components/ApprovalCreatePage'
import CreateApprovalPageStep2 from '@/components/CreateApprovalPageStep2'
import CreateApprovalPageStep3 from '@/components/CreateApprovalPageStep3'

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
      name: 'CreateApprovalPageStep2',
      component: CreateApprovalPageStep2
    },
    {
      path: '/03',
      name: 'CreateApprovalPageStep3',
      component: CreateApprovalPageStep3
    }
  ],
})
