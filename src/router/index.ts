import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import QuizView from "@/views/QuizView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/quiz/:difficulty",
    name: "quiz",
    component: QuizView,
    props: (route) => ({
      difficulty: route.params.difficulty,
    }),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !store.getters["trivia/getToken"]) {
    next({ name: "login" });
    return;
  }

  if (to.path === "/") {
    next({ name: "quiz", params: { difficulty: "easy" } });
    return;
  }

  next();
});

export default router;
