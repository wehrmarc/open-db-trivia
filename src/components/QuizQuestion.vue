<template>
  <QCard>
    <fieldset>
      <h3
        class="text-xs font-medium leading-tight tracking-tight text-gray-500 dark:text-white"
        v-html="question.category"
      ></h3>
      <p
        class="pb-4 pt-2 text-xs sm:text-sm font-medium leading-tight tracking-tight max-w-xs text-gray-900 dark:text-white break-words"
        v-html="question.question"
      ></p>
      <div
        class="flex gap-1 items-center mb-4"
        v-for="answer in possibleAnswers"
        :key="answer"
      >
        <input
          v-model="selectedAnswer"
          :disabled="answered"
          :id="answer"
          type="radio"
          :name="question.question"
          :value="answer"
          class="w-4 sm:h-6 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="answer"
          v-html="answer"
          class="block ml-2 text-xs sm:text-sm font-medium align-middle text-gray-900 dark:text-gray-300"
        >
        </label>
        <template v-if="answered">
          <span
            class="text-xs sm:text-sm"
            v-if="answer === question.correct_answer"
            >✔️</span
          >
          <span class="text-xs sm:text-sm" v-else>❌</span>
        </template>
      </div>
      <button
        :disabled="answered || !selectedAnswer"
        @click="answer"
        class="w-full disabled:opacity-25 text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Answer
      </button>
    </fieldset>
  </QCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import QCard from "@/components/Q-Card.vue";
import { TriviaQuestion } from "trivia";

@Options({
  components: {
    QCard,
  },
  props: {
    question: {
      required: true,
    },
  },
})
export default class QuizQuestion extends Vue {
  question!: TriviaQuestion;
  answered = false;
  selectedAnswer = "";

  answer(): void {
    this.answered = true;

    // if (this.selectedAnswer === this.question.correct_answer) {
    // }
  }

  get possibleAnswers() {
    return this.shuffleAnswers([
      this.question.correct_answer,
      ...this.question.incorrect_answers,
    ]).map(this.unEscape);
  }

  shuffleAnswers(allAnswers: string[]): string[] {
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
  }

  unEscape(safe: string): string {
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
</script>
