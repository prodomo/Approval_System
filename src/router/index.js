import Vue from 'vue'
import Router from 'vue-router'
import ApprovalCreatePage from '@/components/ApprovalCreatePage'
import ApprovalCreateSinglePage from '@/components/ApprovalCreateSinglePage'
import Approval from '@/components/Approval'
import ApprovalQueryPage from '@/components/ApprovalQueryPage'
import AnnouncementCreatePage from '@/components/AnnouncementCreatePage'
import AnnouncementQueryPage from '@/components/AnnouncementQueryPage'
import AppLayout from '@/components/AppLayout';
import LoginPage from '@/components/LoginPage';
import beforeEach from '@/router/beforeEach';



Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/(login)?',
      meta: {
          guest: true
      },
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/',
      meta: {
          auth: true
      },
      component:AppLayout,
      children:[
        // {
        //   path: '/',
        //   name: 'AppLayout',
        //   component: AppLayout
        // },
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
        {
          path: '/03',
          name: 'ApprovalQueryPage',
          component: ApprovalQueryPage
        },
        {
          path: '/04',
          name: 'AnnouncementCreatePage',
          component: AnnouncementCreatePage
        },
        {
          path: '/05',
          name: 'AnnouncementQueryPage',
          component: AnnouncementQueryPage
        },
        {
          path: '/06',
          name: 'Approval',
          component: Approval
        },
    ]
  }
  ]
})
