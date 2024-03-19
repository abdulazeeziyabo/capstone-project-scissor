import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../layout/dash-board.vue';
import productDashboard from '../layout/product-dashboard.vue';
import HomePage from '../views/home-page.vue';
import Login from '../views/login-page.vue'
import MyUrls from '../views/my-urls.vue';
import NotFound from '../views/not-found.vue';
import Profile from '../views/profile-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {name: 'home-page'}, 
    },
    {
      path: '/dash-board',
      name: 'dash-board',
      component: DashBoard,
      children: [
        
        {
          path: '/faqs-page',
          name: 'faqs-page',
          component: () => import('../views/faqs-page.vue')
        },
        {
          path: '/price-page',
          name: 'price-page',
          component: () => import('../views/price-page.vue')
        },
        {
          path: '/home-page',
          name: 'home-page',
          component: HomePage,
        },
        {
          path: '/login-page',
          name: 'login-page',
          component: Login
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: () => import('../views/sign-up.vue')
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
      ]
    },
    {
      path:'/product-dashboard',
      name:'productDashboard',
      component:productDashboard,children:[
        {
          path: '/my-urls',
          name: 'my-urls',
          component: MyUrls,
          meta: {requiresAuth: true}
        },
        {
          path: '/custom-url',
          name: 'custom-url',
          component: () => import('../views/custom-url.vue'),
          meta: {requiresAuth: true}
         
        },
        {
          path: '/profile-page',
          name: 'profile-page',
          component: Profile,
          meta: {requiresAuth: true}
         
        },

      ]
    }
    
  ]
});
// global navigation guard
 router.beforeEach(async (to, from, next) => {
   const isLoggedIn = !!localStorage.getItem("isLoggedIn");

  if (to.matched.some((item) => item.meta.requiresAuth)) {
     if (!isLoggedIn) {
      next({ path: "/login-page" });
     } else {
       next();
     }
   } else if (isLoggedIn && to.name === "login-page") {
     next({ path: "/my-urls" });
   } else {
     next();
   }
 });
export default router
