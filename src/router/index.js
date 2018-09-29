import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateApprovalPageStep1 from '@/components/CreateApprovalPageStep1'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'CreateApprovalPageStep1',
      component: CreateApprovalPageStep1
    }
  ]
})
