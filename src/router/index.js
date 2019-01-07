import Vue from 'vue'
import Router from 'vue-router'
import ApprovalCreateSinglePage from '@/components/ApprovalCreateSinglePage'
import Approval from '@/components/Approval'
import ApprovalQueryPage from '@/components/ApprovalQueryPage'
import ApprovalSignPage from '@/components/ApprovalSignPage'
import AnnouncementCreatePage from '@/components/AnnouncementCreatePage'
import AnnouncementQueryPage from '@/components/AnnouncementQueryPage'
import uploadSingleFile from '@/components/uploadSingleFile'
import sendApprovalToOther from '@/components/sendApprovalToOther'
import InnerAnnouncement from '@/components/InnerAnnouncement'
import OuterDocument from '@/components/OuterDocument'
import AppLayout from '@/components/AppLayout';
import LoginPage from '@/components/LoginPage';
import beforeEach from '@/router/beforeEach';
import MainPage from '@/components/MainPage';



Vue.use(Router)

const router = new Router({
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
          path: '/approvalCreate/:apID(\\d*?)',
          name: 'ApprovalCreateSinglePage',
          component: ApprovalCreateSinglePage
        },
        {
          path: '/approvalQuery',
          name: 'ApprovalQueryPage',
          component: ApprovalQueryPage
        },
        {
          path: '/approvalQuery/:articleStatusId(\\d*?):page(\\d*?)',
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
        {
          path: '/mainPage',
          name: 'MainPage',
          component: MainPage
        },
        {
          path: '/approvalSignPage',
          name: 'ApprovalSignPage',
          component: ApprovalSignPage
        },
        {
          path: '/approvalSignPage/:apID(\\d*?)',
          name: 'ApprovalSignPage',
          component: ApprovalSignPage
        },
        {
          path: '/temp',
          name: 'uploadSingleFile',
          component: uploadSingleFile
        },
        {
          path: '/temp1',
          name: 'sendApprovalToOther',
          component: sendApprovalToOther
        },
        {
          path: '/temp2',
          name: 'InnerAnnouncement',
          component: InnerAnnouncement
        },
        {
          path: '/temp3',
          name: 'OuterDocument',
          component: OuterDocument
        },
        
    ]
  }
  ]
});

router.beforeEach(beforeEach);

export default router;
