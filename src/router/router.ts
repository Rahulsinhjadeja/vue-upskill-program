import { createRouter, createWebHistory } from "vue-router";

const routers = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("@/components/MovieList.vue"), name:"index" },
    { path: "/:id", component: () => import("@/components/MovieDetails.vue"), name: 'movie-details' , props: true},
    { path: "/:pathMatch(.*)*", component: () => import("@/components/NotFound.vue"), name: 'not-found' },
  ],
});

export default routers;