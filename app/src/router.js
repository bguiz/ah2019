import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
    },
    {
      path: '/create',
      name: 'CreateSurvey',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateSurvey.vue'),
    },
    {
      path: '/answer/:survey_id',
      name: 'AnswerSurvey',
      component: () => import(/* webpackChunkName: "about" */ './views/AnswerSurvey.vue'),
    },
    {
      path: '/result/:survey_id',
      name: 'SurveyResult',
      component: () => import(/* webpackChunkName: "about" */ './views/SurveyResult.vue'),
    },
  ],
});
