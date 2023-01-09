import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import triviaController from "@/core/trivia/triviaController";
import { TriviaQuestion } from "trivia";

@Module({ name: "trivia", namespaced: true })
export default class TriviaModule extends VuexModule {
  token = "";
  easyQuestions: TriviaQuestion[] = [];
  mediumQuestions: TriviaQuestion[] = [];
  hardQuestions: TriviaQuestion[] = [];

  get getToken() {
    return this.token;
  }
  get getEasyQuestions() {
    return this.easyQuestions;
  }
  get getMediumQuestions() {
    return this.mediumQuestions;
  }
  get getHardQuestions() {
    return this.hardQuestions;
  }

  @Mutation
  setToken(newToken: string) {
    this.token = newToken;
  }
  @Mutation
  setEasyQuestions(newEasyQuestions: any[]) {
    this.easyQuestions = newEasyQuestions;
  }
  @Mutation
  setMediumQuestions(newMediumQuestions: any[]) {
    this.mediumQuestions = newMediumQuestions;
  }
  @Mutation
  setHardQuestions(newHardQuestions: any[]) {
    this.hardQuestions = newHardQuestions;
  }

  @Action
  async getSessionToken() {
    await triviaController.getToken().then((result) => {
      this.setToken(result.token);
    });
  }
  @Action
  async getQuestions() {
    if (this.easyQuestions.length > 0) return;

    const [easyQuestions, mediumQuestions, hardQuestions] = await Promise.all([
      triviaController.getEasyQuestions(this.token),
      triviaController.getMediumQuestions(this.token),
      triviaController.getHardQuestions(this.token),
    ]);

    this.setEasyQuestions(easyQuestions.results);
    this.setMediumQuestions(mediumQuestions.results);
    this.setHardQuestions(hardQuestions.results);
  }
  @Action
  clearSession() {
    this.setToken("");
    this.setEasyQuestions([]);
    this.setMediumQuestions([]);
    this.setHardQuestions([]);
  }
}
