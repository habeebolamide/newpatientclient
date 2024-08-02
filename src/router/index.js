import Vue from 'vue'
import VueRouter from 'vue-router'
// import Landing from '../views/LandingPage/LandingPage.vue'
import Dashboard from '../views/Dashboard/DashBoard.vue'
import LoginPage from '../views/Auth/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/auth/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function isAuthenticated() {
  // Check if the user is authenticated
  // Modify this logic based on your authentication implementation
  const token = localStorage.getItem('authToken');
  return !!token;
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    next('/auth/login');
  } else {
    // Otherwise, proceed with the navigation
    next();
  }
})

export default router
