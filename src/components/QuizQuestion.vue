<template>
  <QCard>
    <fieldset>
      <h3
        class="text-xs font-medium leading-tight tracking-tight text-gray-500"
        v-html="question.category"
      ></h3>
      <p
        class="pb-4 pt-2 text-xs sm:text-sm font-medium leading-tight tracking-tight max-w-xs text-gray-900 break-words"
        v-html="question.question"
      ></p>
      <div
        class="flex gap-1 items-center mb-4"
        v-for="answer in question.possible_answers"
        :key="answer"
      >
        <input
          v-model="selectedAnswer"
          :disabled="answered"
          :id="answer"
          type="radio"
          :name="question.question"
          :value="answer"
          class="w-4 sm:h-6 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
        />
        <label
          for="answer"
          v-html="answer"
          class="block ml-2 text-xs sm:text-sm font-medium align-middle text-gray-900"
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
        class="w-full disabled:opacity-25 text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Answer
      </button>
    </fieldset>
  </QCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import QCard from "@/components/Q-Card.vue";
import { TriviaQuestionModel } from "@/types/TriviaQuestionModel";
import TriviaModule from "@/store/modules/trivia";
import { getModule } from "vuex-module-decorators";

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
  triviaModule!: TriviaModule;

  question!: TriviaQuestionModel;
  selectedAnswer = "";
  answered = false;

  created(): void {
    this.triviaModule = getModule(TriviaModule, this.$store);
  }

  mounted(): void {
    if (this.question.selected_answer.length > 0) {
      this.selectedAnswer = this.question.selected_answer;
      this.answered = true;
    }
  }

  answer(): void {
    this.answered = true;
    this.triviaModule.answerQuestion({
      question: this.question,
      selectedAnswer: this.selectedAnswer,
    });
  }
}
</script>
