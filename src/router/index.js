import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/HomeView")
  }
  ,
  {
    path: '/catalog/:category/:subCategory',
    name: 'catalog',
    component: () => import("@/views/CatalogView")
  },
  {
    path: '/cartPage/:id',
    name: 'cartPage',
    component: () => import("@/views/CartPage")
  }
  ,
  {
    path: '/profile',
    name: 'profile',
    component: () => import("@/views/ProfilePage")
  }
  ,
  {
    path: '/postAdvertisements',
    name: 'PostAdvertisements',
    component: () => import("@/views/PostAdvertisements")
  },
  {
    path: '/create',
    name: 'CreateAnnouncement',
    component: () => import("@/views/CreateAnnouncement")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.params.category !== from.params.category || to.name !== from.name) {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

export default router
