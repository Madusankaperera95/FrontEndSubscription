import {createRouter,createWebHashHistory} from 'vue-router';
import PostView from '@/components/PostView.vue'
import WebsiteView from '@/components/WebsiteView.vue';



const routes = [
    {
      path: '/',
      component: WebsiteView,
    },
    {
      path: '/posts',
      component: PostView,
    },
    // Define more routes as needed
  ];

const router = new createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;