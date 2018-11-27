import Vue from 'vue'
import Router from 'vue-router'
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
        {
          path: '/approvalCreate',
          name: 'ApprovalCreateSinglePage',
          component: ApprovalCreateSinglePage
        },
        {
          path: '/approvalQuery',
          name: 'ApprovalQueryPage',
          component: ApprovalQueryPage
        },
        {
          path: '/announcementCreate',
          name: 'AnnouncementCreatePage',
          component: AnnouncementCreatePage
        },
        {
          path: '/announcementQuery',
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
