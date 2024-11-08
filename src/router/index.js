import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/docent/:id',
    component: () => import('@/view/Docent.vue'),
    name: 'Docent',

    params: (route) => ({ id: route.params.id || 0 }),
  },
  {
    path: '/',
    component: () => import('@/view/Home.vue'),
    name: 'Home',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let previousRoute = null;

router.beforeEach((_, from, next) => {
  previousRoute = from;
  next();
});

export function getPreviousRoute() {
  return previousRoute;
}

export default router;
