import Vue from 'vue'
import VueRouter from 'vue-router'

import StudentHome from '../views/student/studentHome.vue'
import AdminHome from '../views/admin/adminHome.vue'
import TeacherHome from '../views/teacher/teacherHome.vue'
import AssistHome from '../views/assist/assistHome.vue'

import Login from '../views/login/Login.vue'


import StuConcreteCourse from '../views/student/course/concreteCourse.vue'
import TeaConcreteCourse from '../views/teacher/course/concreteCourse.vue'
import AssistConcreteCourse from '../views/assist/course/concreteCourse.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  { path: '/test', component: () => import('../views/test.vue') },

  {
    //学生界面
    path: '/studentome',
    name: 'StudentHome',
    component: StudentHome,
    children: [
      //学生账户
      { path: '/studentHome/control', component: () => import('../views/student/Control.vue') },
      { path: '/studentHome/accounce', component: () => import('../views/announce/announce.vue') },
      { path: '/studentHome/account', component: () => import('../views/student/account/account.vue') },
      { path: '/studentHome/modifyAccount', component: () => import('../views/student/account/modifyAccount.vue') },
      { path: '/studentHome/modifyPassword', component: () => import('../views/student/account/passwordModify.vue') },

      //课程
      { path: '/studentHome/course', component: () => import('../views/student/course/myClass.vue') },
      {
        path: '/studentHome/concreteCourse', component: StuConcreteCourse, children: [
          { path: '/studentHome/concreteCourse/Ann', component: () => import('../views/student/course/courseDetail/courseAnnounce.vue') },
          { path: '/studentHome/concreteCourse/Exper', component: () => import('../views/student/course/courseDetail/courseExperiment.vue') },
          { path: '/studentHome/concreteCourse/Peo', component: () => import('../views/student/course/courseDetail/coursePeople.vue') },
          { path: '/studentHome/concreteCourse/Perform', component: () => import('../views/student/course/courseDetail/coursePerformance.vue') },
          { path: '/studentHome/concreteCourse/ConExper', component: () => import('../views/student/course/concreteCourse.vue') },
          { path: '/studentHome/concreteCourse/FillExper', component: () => import('../views/student/course/experiment/experimentFill.vue') },
          { path: '/studentHome/concreteCourse/FillSimulater', component: () => import('../views/student/course/experiment/experimentSimulater.vue') },
          { path: '/studentHome/concreteCourse/File', component: () => import('../views/student/course/courseDetail/courseFile.vue') },

          //rzc拍卖
          { path: '/studentHome/concreteCourse/DemandSupply', component: () => import('../components/rzc/auctionIntroduction.vue') },
          { path: '/studentHome/concreteCourse/DemandSupplyPar', component: () => import('../components/rzc/auction.vue') },
          { path: '/studentHome/concreteCourse/DemandSupplyCurve', component: () => import('../components/rzc/auctionDetail.vue') },
          { path: '/studentHome/concreteCourse/DemandSupplyIntention', component: () => import('../components/rzc/auctionIntention.vue') },
          { path: '/studentHome/concreteCourse/DemandSupplyReport', component: () => import('../components/rzc/auctionReport.vue') },
          { path: '/teacherHome/concreteCourse/Exper/DemandSupplyManage', component: () => import('../components/rzc/auctionManagement.vue') },

          //cyh盈亏平衡
          { path: '/studentHome/concreteCourse/BalanceCost', component: () => import('../components/cyh/BreakEventExp.vue') },
          // 不确定分析
          // { path: '/experiment/uncertainty-analysis', component: () => import('../views/Experiments/UncertiantyAnalysis') },
          //经济寿命周期
          { path: '/studentHome/concreteCourse/EconomicLife', component: () => import('../components/economicLifeCycle/EconomyLifeExp.vue') },
          { path: '/experiment/uncertainty-analysis', component: () => import('../views/Experiments/UncertiantyAnalysis') },
          // yxb蒙特卡洛分析
          { path: '/studentHome/concreteCourse/montecarlo', component: () => import('../components/montecarlo.vue') },
        ]
      },

    ]
  },
  {
    //管理员界面
    path: '/adminHome',
    name: 'AdminHome',
    component: AdminHome,
    children: [
      //账户
      { path: '/adminHome/account', component: () => import('../views/admin/account/account.vue') },
      { path: '/adminHome/modifyAccount', component: () => import('../views/admin/account/modifyAccount.vue') },
      { path: '/adminHome/editauth', component: () => import('../views/admin/account/editauth.vue') },
      { path: '/adminHome/modifyPassword', component: () => import('../views/admin/account/passwordModify.vue') },
      //公告
      { path: '/adminHome/annManage', component: () => import('../views/admin/annManage/annManage.vue') },
      //课程
      {
        path: '/adminHome/courseManage',
        name: 'AdminCourseManage',
        component: () => import('../views/admin/courseManage/courseManageHome.vue'),
        children: [
          { path: '/adminHome/courseManage/courseType', component: () => import('../views/admin/courseManage/courseType.vue') },
          { path: '/adminHome/courseManage/courseTea', component: () => import('../views/admin/courseManage/courseTea.vue') },
        ]
      },
      //用户
      // {
      //   path: '/adminHome/userManage',
      //   name: 'AdminUserManage',
      //   component: () => import('../views/admin/userManage/accountManageHome.vue'),
      //   children: [
      //     { path: '/adminHome/userManage/accountAdd', component: () => import('../views/admin/userManage/accountAdd.vue') },
      //     { path: '/adminHome/userManage/accountCheck', component: () => import('../views/admin/userManage/accountCheck.vue') },
      //     { path: '/adminHome/userManage/accountInfo', component: () => import('../views/admin/userManage/accountInfo.vue') },
      //     { path: '/adminHome/userManage/accountModify', component: () => import('../views/admin/userManage/accountModify.vue') },
      //     { path: '/adminHome/userManage/accountCancel', component: () => import('../views/admin/userManage/accountCancel.vue') },
      //   ]
      // },

      { path: '/adminHome/accountAdd', component: () => import('../views/admin/userManage/accountAdd.vue') },
      { path: '/adminHome/accountCheck', component: () => import('../views/admin/userManage/accountCheck.vue') },
      { path: '/adminHome/accountInfo', component: () => import('../views/admin/userManage/accountInfo.vue') },
      { path: '/adminHome/accountModify', component: () => import('../views/admin/userManage/accountModify.vue') },
      { path: '/adminHome/accountCancel', component: () => import('../views/admin/userManage/accountCancel.vue') },
    ]
  },
  {
    //老师界面
    path: '/teacherHome',
    name: 'TeacherHome',
    component: TeacherHome,
    children: [
      { path: '/teacherHome/control', component: () => import('../views/teacher/Control.vue') },
      //账户
      { path: '/teacherHome/account', component: () => import('../views/teacher/account/account.vue') },
      { path: '/teacherHome/modifyAccount', component: () => import('../views/teacher/account/modifyAccount.vue') },
      { path: '/teacherHome/modifyPassword', component: () => import('../views/teacher/account/passwordModify.vue') },

      { path: '/teacherHome/manageCourse', component: () => import('../views/teacher/course/ManageCourse.vue') },

      //责任课程
      { path: '/teacherHome/manageCourse2', component: () => import('../views/teacher/course/courseManage/manageCourse.vue') },
      //课程
      { path: '/teacherHome/myClass', component: () => import('../views/teacher/course/myClass.vue') },
      {
        path: '/teacherHome/concreteCourse', component: TeaConcreteCourse, children: [
          { path: '/teacherHome/concreteCourse/Ann', component: () => import('../views/teacher/course/courseDetail/courseAnnounce.vue') },
          { path: '/teacherHome/concreteCourse/Peo', component: () => import('../views/teacher/course/courseDetail/coursePeople.vue') },
          { path: '/teacherHome/concreteCourse/Perform', component: () => import('../views/teacher/course/courseDetail/coursePerformance.vue') },

          { path: '/teacherHome/concreteCourse/File', component: () => import('../views/teacher/course/courseDetail/courseFile.vue') },
          { path: '/teacherHome/concreteCourse/Exper', component: () => import('../views/teacher/course/courseDetail/courseExperiment.vue') },

          { path: '/teacherHome/concreteCourse/stuExperList', component: () => import('../views/teacher/course/experiment/stuExperList.vue') },
          { path: '/studentHome/concreteCourse/BalanceCostExp', component: () => import('../components/cyh/CorrectReport') },

        ]
      },

      { path: '/teacherHome/accounce', component: () => import('../views/announce/announce.vue') },
    ]
  },

  {
    //助教界面
    path: '/assistHome',
    name: 'AssistHome',
    component: AssistHome,
    children: [

      //账户
      { path: '/assistHome/account', component: () => import('../views/assist/account/account.vue') },
      { path: '/assistHome/modifyAccount', component: () => import('../views/assist/account/modifyAccount.vue') },
      { path: '/assistHome/modifyPassword', component: () => import('../views/assist/account/passwordModify.vue') },

      //课程
      { path: '/assistHome/myClass', component: () => import('../views/assist/course/myClass.vue') },
      {
        path: '/assistHome/concreteCourse', component: AssistConcreteCourse, children: [
          { path: '/assistHome/concreteCourse/Ann', component: () => import('../views/assist/course/courseDetail/courseAnnounce.vue') },
          { path: '/assistHome/concreteCourse/Exper', component: () => import('../views/assist/course/courseDetail/courseExperiment.vue') },

          { path: '/assistHome/concreteCourse/stuExperList', component: () => import('../views/assist/course/experiment/stuExperList.vue') },



          { path: '/assistHome/concreteCourse/Peo', component: () => import('../views/assist/course/courseDetail/coursePeople.vue') },
          { path: '/assistHome/concreteCourse/File', component: () => import('../views/assist/course/courseDetail/courseFile.vue') },

        ]
      },

      { path: '/assistHome/accounce', component: () => import('../views/announce/announce.vue') },
    ]
  },

]


const router = new VueRouter({
  routes
})

export default router
