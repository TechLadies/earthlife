import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Category from './views/Category.vue';
import Question from './views/Question.vue';
import Actions from './views/Actions.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/steps',
      name: 'steps',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Steps.vue')
    },

    {
      path: '/habits/:category',
      name: 'category',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      component: Category
    },
    {
      path: '/habits/:category/:id',
      name: 'question',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      component: Question
    },
    {
      path: '/habits',
      name: 'habits',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Habits.vue')
    },

    {
      path: '/results',
      name: 'result',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Result.vue')
    },
    {
      path: '/results/actions',
      name: 'actions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Actions.vue')
    },

    {
      path: '/todo',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/ToDo.vue')
    }
  ]
});
