import { TriviaQuestion } from "trivia";

export class TriviaQuestionModel implements TriviaQuestion {
  public readonly category: string;
  public readonly type: string;
  public readonly difficulty: string;
  public readonly question: string;
  public readonly correct_answer: string;
  public readonly incorrect_answers: string[];
  public readonly possible_answers: string[];
  public selected_answer = "";

  constructor(question: TriviaQuestion) {
    this.category = question.category;
    this.type = question.type;
    this.difficulty = question.difficulty;
    this.question = this.unEscape(question.question);
    this.correct_answer = this.unEscape(question.correct_answer);
    this.incorrect_answers = question.incorrect_answers.map(this.unEscape);

    this.possible_answers = this.shuffleAnswers([
      this.correct_answer,
      ...this.incorrect_answers,
    ]);
  }

  private shuffleAnswers(allAnswers: string[]): string[] {
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
  }

  private unEscape(safe: string): string {
    return decodeURIComponent(
      encodeURIComponent(
        safe
          .replace(/&lt;/g, "<")
          .replace(/&lt;/g, "<")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, "&")
      )
    );
  }
}
