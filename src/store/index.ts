import { createStore, Store } from "vuex";
import triviaController from "@/core/trivia/triviaController";

export default createStore({
  state: {
    token: "",
    easyQuestions: [],
    mediumQuestions: [],
    hardQuestions: [],
  },
  getters: {
    token: (state) => state.token,
    easyQuestions: (state) => state.easyQuestions,
    meduimQuestions: (state) => state.mediumQuestions,
    hardQuestions: (state) => state.hardQuestions,
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken;
    },
    setEasyQuestions(state, newEasyQuetions) {
      state.easyQuestions = newEasyQuetions;
    },
    setMediumQuestions(state, newMediumQuetions) {
      state.mediumQuestions = newMediumQuetions;
    },
    setHardQuestions(state, newHardQuetions) {
      state.hardQuestions = newHardQuetions;
    },
  },
  actions: {
    async getToken(context) {
      const token = await triviaController.getToken();
      context.commit("setToken", token);
    },
    async getQuestions(context) {
      const [easyQuestions, mediumQuestions, hardQuestions] = await Promise.all(
        [
          triviaController.getEasyQuestions(context.state.token),
          triviaController.getMediumQuestions(context.state.token),
          triviaController.getHardQuestions(context.state.token),
        ]
      );

      context.commit("setEasyQuetions", easyQuestions);
      context.commit("setMeduimQuetion", mediumQuestions);
      context.commit("setHardQuestions", hardQuestions);
    },
  },
  modules: {},
});
