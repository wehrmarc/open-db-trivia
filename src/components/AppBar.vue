<template>
  <header class="bg-white dark:bg-black px-3 py-3 shadow-xl">
    <nav class="flex items-center justify-between flex-wrap">
      <div class="flex items-center flex-no-shrink text-gray-900 mr-6">
        <span class="font-semibold text-xl tracking-tight"
          >Open Trivia Database Quiz</span
        >
      </div>
      <div class="block sm:hidden">
        <button
          @click="toggleMenu"
          class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
      </div>
      <div
        :class="menuOpen ? 'block' : 'hidden'"
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:flex-grow">
          <div
            class="font-semibold leading-tight tracking-tight rounded-md hover:text-gray-300 sm:inline-block mt-2 sm:mt-0 ml-2 mr-6"
          >
            <router-link
              :to="{ name: 'quiz', params: { difficulty: 'easy' } }"
              :class="[
                selectedDifficulty === 'easy'
                  ? 'text-blue-500'
                  : 'text-gray-900',
              ]"
              aria-current="page"
            >
              Easy
            </router-link>
          </div>
          <div
            class="font-semibold leading-tight tracking-tight rounded-md hover:text-gray-300 sm:inline-block mt-2 sm:mt-1 ml-2 mr-6"
          >
            <router-link
              :to="{ name: 'quiz', params: { difficulty: 'medium' } }"
              :class="[
                selectedDifficulty === 'medium'
                  ? 'text-blue-500'
                  : 'text-gray-900',
              ]"
              aria-current="page"
            >
              Medium
            </router-link>
          </div>
          <div
            class="font-semibold leading-tight tracking-tight rounded-md hover:text-gray-300 sm:inline-block mt-2 sm:mt-1 ml-2 mr-6"
          >
            <router-link
              :to="{ name: 'quiz', params: { difficulty: 'hard' } }"
              :class="[
                selectedDifficulty === 'hard'
                  ? 'text-blue-500'
                  : 'text-gray-900',
              ]"
              aria-current="page"
            >
              Hard
            </router-link>
          </div>
        </div>
        <div>
          <a
            @click="logout"
            href="#"
            class="no-underline inline-block text-xs px-2 py-2 leading-none font-semibold border rounded text-gray-900 border-grey hover:border-transparent hover:text-teal hover:bg-white ml-2 mt-2 sm:mt-0"
            >Log out</a
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import TriviaModule from "@/store/modules/trivia";
import router from "@/router";

@Options({})
export default class AppBar extends Vue {
  triviaModule!: TriviaModule;

  menuOpen = false;

  created() {
    this.triviaModule = getModule(TriviaModule, this.$store);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.triviaModule.clearSession();
    router.push({
      name: "login",
    });
  }

  get selectedDifficulty() {
    return this.$route.params["difficulty"];
  }
}
</script>
