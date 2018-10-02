import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateApprovalPageStep1 from '@/components/CreateApprovalPageStep1'
import CreateApprovalPageStep2 from '@/components/CreateApprovalPageStep2'
import CreateApprovalPageStep3 from '@/components/CreateApprovalPageStep3'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/01',
      name: 'CreateApprovalPageStep1',
      component: CreateApprovalPageStep1
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
