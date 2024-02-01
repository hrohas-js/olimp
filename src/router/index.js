import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from "@/store/MainStore";

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
    path: '/postAdvertisements/:mode',
    name: 'PostAdvertisements',
    component: () => import("@/views/PostAdvertisements")
  },
  {
    path: '/create',
    name: 'CreateAnnouncement',
    component: () => import("@/views/CreateAnnouncement")
  },
  {
    path: '/about',
    name: 'AboutCompany',
    component: () => import("@/views/AboutCompany")
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

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  mainStore.miniChat = false;
  next();
})

export default router
