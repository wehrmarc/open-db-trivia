<template>
  <Q-Card>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x"
      >
        Sign in to your account
      </h1>
      <form class="space-y-4 md:space-y-6" @submit.prevent="login">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="..Input"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder="Anything.."
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          />
        </div>
        <button
          class="w-full text-white bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </button>
      </form>
    </div>
  </Q-Card>
</template>

<script lang="ts">
import TriviaModule from "@/store/modules/trivia";
import router from "@/router";
import { getModule } from "vuex-module-decorators";
import { Options, Vue } from "vue-class-component";
import QCard from "@/components/Q-Card.vue";

@Options({
  components: {
    QCard,
  },
})
export default class LoginView extends Vue {
  triviaModule!: TriviaModule;

  email = "";
  password = "";

  created() {
    this.triviaModule = getModule(TriviaModule, this.$store);
  }

  async login(): Promise<void> {
    await this.triviaModule.getSessionToken().then(() => {
      router.push({
        name: "quiz",
        params: {
          difficulty: "easy",
        },
      });
    });
  }
}
</script>
