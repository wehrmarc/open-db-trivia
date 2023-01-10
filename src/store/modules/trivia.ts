import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import triviaController from "@/core/trivia/triviaController";
import { TriviaQuestionModel } from "@/types/TriviaQuestionModel";
import { TriviaQuestion } from "trivia";
import { Difficulty } from "@/types/enums";

@Module({ name: "trivia", namespaced: true })
export default class TriviaModule extends VuexModule {
  token = "";
  easyQuestions: TriviaQuestionModel[] = [];
  mediumQuestions: TriviaQuestionModel[] = [];
  hardQuestions: TriviaQuestionModel[] = [];

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
  setEasyQuestions(newEasyQuestions: TriviaQuestionModel[]) {
    this.easyQuestions = newEasyQuestions;
  }
  @Mutation
  setMediumQuestions(newMediumQuestions: TriviaQuestionModel[]) {
    this.mediumQuestions = newMediumQuestions;
  }
  @Mutation
  setHardQuestions(newHardQuestions: TriviaQuestionModel[]) {
    this.hardQuestions = newHardQuestions;
  }

  @Action({ rawError: true })
  async getSessionToken() {
    await triviaController.getToken().then((result) => {
      this.setToken(result.token);
    });
  }
  @Action({ rawError: true })
  async getQuestions() {
    if (this.easyQuestions.length > 0) return;

    const [easyQuestions, mediumQuestions, hardQuestions] = await Promise.all([
      triviaController.getEasyQuestions(this.token),
      triviaController.getMediumQuestions(this.token),
      triviaController.getHardQuestions(this.token),
    ]);

    this.setEasyQuestions(
      easyQuestions.results.map(
        (q: TriviaQuestion) => new TriviaQuestionModel(q)
      )
    );
    this.setMediumQuestions(
      mediumQuestions.results.map(
        (q: TriviaQuestion) => new TriviaQuestionModel(q)
      )
    );
    this.setHardQuestions(
      hardQuestions.results.map(
        (q: TriviaQuestion) => new TriviaQuestionModel(q)
      )
    );
  }
  @Action({ rawError: true })
  answerQuestion(payload: {
    question: TriviaQuestionModel;
    selectedAnswer: string;
  }) {
    switch (payload.question.difficulty) {
      case Difficulty.EASY:
        this.setEasyQuestions(setQuestionAnswered(this.easyQuestions));
        break;
      case Difficulty.MEDIUM:
        this.setMediumQuestions(setQuestionAnswered(this.mediumQuestions));
        break;
      case Difficulty.HARD:
        this.setHardQuestions(setQuestionAnswered(this.hardQuestions));
        break;
    }

    function setQuestionAnswered(questions: TriviaQuestionModel[]) {
      return questions.map((q: TriviaQuestionModel) => {
        if (q.question === payload.question.question)
          q.selected_answer = payload.selectedAnswer;
        return q;
      });
    }
  }
  @Action({ rawError: true })
  clearSession() {
    this.setToken("");
    this.setEasyQuestions([]);
    this.setMediumQuestions([]);
    this.setHardQuestions([]);
  }
}
