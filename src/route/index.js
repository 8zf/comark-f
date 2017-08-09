import Vue from 'vue'
import Router from 'vue-router'
import Editor from './../components/editor.vue'

Vue.use(Router);

export default new Router(
  {
    routes: [{path: '/editor/:id', component: Editor}]
  }
);