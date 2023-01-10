import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
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

const DEFAULT_TITLE = "Open DB Trivia";
function getTitle(to: RouteLocationNormalized): string {
  const difficulty = to.params["difficulty"]?.toString() || "";

  return `${DEFAULT_TITLE} | ${capitalizeFirstLetter(
    difficulty ? difficulty : to.name?.toString() || ""
  )}`;
}

router.beforeEach((to, from, next) => {
  document.title = getTitle(to);

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

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default router;
