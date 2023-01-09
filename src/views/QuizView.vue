<template>
  <div
    class="container flex flex-row flex-wrap grow shrink gap-4 max-w-fit justify-center"
  >
    <QuizQuestion
      v-for="question in questions"
      :question="question"
      :key="question.question"
    ></QuizQuestion>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import QuizQuestion from "@/components/QuizQuestion.vue";
import TriviaModule from "@/store/modules/trivia";
import { getModule } from "vuex-module-decorators";
import { TriviaQuestion } from "trivia";

@Options({
  components: {
    QuizQuestion,
  },
  props: {
    difficulty: {
      type: String,
      required: true,
    },
  },
})
export default class QuizView extends Vue {
  triviaModule!: TriviaModule;

  created(): void {
    this.triviaModule = getModule(TriviaModule, this.$store);
  }

  mounted(): void {
    this.triviaModule.getQuestions();
  }

  get questions(): TriviaQuestion[] {
    switch (this.$route.params["difficulty"]) {
      case "medium":
        return this.triviaModule.getMediumQuestions;
      case "hard":
        return this.triviaModule.getHardQuestions;
      default:
        return this.triviaModule.getEasyQuestions;
    }
  }
}
</script>
