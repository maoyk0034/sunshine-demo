import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SchoolLibraryPage from '../pages/SchoolLibraryPage.vue'
import StudyPlanPage from '../pages/StudyPlanPage.vue'
import LearningCenterPage from '../pages/LearningCenterPage.vue'
import CommunityPage from '../pages/CommunityPage.vue'
import ResourcesPage from '../pages/ResourcesPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/schools', component: SchoolLibraryPage },
    { path: '/study-plan', component: StudyPlanPage },
    { path: '/learning', component: LearningCenterPage },
    { path: '/community', component: CommunityPage },
    { path: '/resources', component: ResourcesPage },
    { path: '/profile', component: ProfilePage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
