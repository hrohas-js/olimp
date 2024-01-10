import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/HomeView")
  },
  {
    path: '/catalog/:category/:subCategory',
    name: 'catalog',
    component: () => import("@/views/CatalogView")
  },
  {
    path: '/cartPage/:author/:id',
    name: 'cartPage',
    component: () => import("@/views/CartPage")
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import("@/views/ProfilePage")
  },
  {
    path: '/postAdvertisements',
    name: 'PostAdvertisements',
    component: () => import("@/views/PostAdvertisements")
  },
  {
    path: '/create',
    name: 'CreateAnnouncement',
    component: () => import("@/views/CreateAnnouncement")
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import("@/views/NotFound"),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  }
})

export default router
