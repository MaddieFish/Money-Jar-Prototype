// import Vue from 'vue';
// import Router from 'vue-router';
// import Home from './views/Home.vue';
//
// Vue.use(Router);
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
//     },
//   ],
// });

import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Jars from '../components/Jars.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/jars',
      name: 'Jars',
      component: Jars,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) { next('login'); } else if (!requiresAuth && currentUser) { next('jars'); } else { next(); }
});

export default router;
