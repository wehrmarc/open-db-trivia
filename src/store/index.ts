import Vuex from "vuex";
import TriviaModule from "./modules/trivia";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  modules: {
    trivia: TriviaModule,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
