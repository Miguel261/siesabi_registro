import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Directory from '@/components/resources/directory.vue'
import Questions from '@/components/resources/questions.vue'
import Login from '@/views/auth/login.vue'
import Dashboard from '@/views/MySiesabi.vue'
import Registro from '@/views/register/RegisterView.vue'
import Manager from '@/views/manager/ManagerView.vue'
import Admin from '@/views/admin/AdminView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/directory',
      name: 'directory',
      component: Directory,
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Registro,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, requiresAdmin: true }, 
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const accessToken = authStore.getAccessToken;
  const userRole = authStore.getRol; 

  if (to.meta.requiresAuth) {
    if (!accessToken) {
      next({ name: 'login' });
    } else if (to.meta.requiresAdmin && userRole !== 'admin') {
      next({ name: 'dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router