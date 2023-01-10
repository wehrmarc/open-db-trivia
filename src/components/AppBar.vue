<template>
  <header class="bg-white dark:bg-black px-3 py-3 shadow-xl">
    <nav class="flex items-center justify-between flex-wrap">
      <div class="flex items-center flex-no-shrink text-gray-900 mr-6">
        <span class="font-semibold text-xl tracking-tight"
          >Open Trivia Database Quiz</span
        >
      </div>
      <template v-if="loggedIn">
        <div class="block sm:hidden">
          <button
            @click="toggleMenu"
            class="flex items-center px-3 py-2 border rounded text-blue-500 hover:text-gray-400 border-gray hover:border-gray-400"
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
              class="font-semibold leading-tight tracking-tight sm:inline-block mt-2 sm:mt-0 ml-2 mr-6"
            >
              <router-link
                @click="closeMenu"
                :to="{ name: 'quiz', params: { difficulty: 'easy' } }"
                :class="[
                  selectedDifficulty === 'easy'
                    ? 'text-blue-500'
                    : 'text-gray-900',
                ]"
                class="hover:text-gray-400"
                aria-current="page"
              >
                Easy
              </router-link>
            </div>
            <div
              class="font-semibold leading-tight tracking-tight sm:inline-block mt-2 sm:mt-1 ml-2 mr-6"
            >
              <router-link
                @click="closeMenu"
                :to="{ name: 'quiz', params: { difficulty: 'medium' } }"
                :class="[
                  selectedDifficulty === 'medium'
                    ? 'text-blue-500'
                    : 'text-gray-900',
                ]"
                class="hover:text-gray-400"
                aria-current="page"
              >
                Medium
              </router-link>
            </div>
            <div
              class="font-semibold leading-tight tracking-tight sm:inline-block mt-2 sm:mt-1 ml-2 mr-6"
            >
              <router-link
                @click="closeMenu"
                :to="{ name: 'quiz', params: { difficulty: 'hard' } }"
                :class="[
                  selectedDifficulty === 'hard'
                    ? 'text-blue-500'
                    : 'text-gray-900',
                ]"
                aria-current="page"
                class="hover:text-gray-400"
              >
                Hard
              </router-link>
            </div>
          </div>
          <div>
            <a
              @click="logout"
              href="#"
              class="no-underline inline-block text-xs px-2 py-2 leading-none font-semibold border rounded text-gray-900 hover:text-gray-400 border-gray hover:border-gray-400 ml-2 mt-2 sm:mt-0"
              >Log out</a
            >
          </div>
        </div>
      </template>
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

  get loggedIn() {
    return this.triviaModule.token.length > 0;
  }

  created() {
    this.triviaModule = getModule(TriviaModule, this.$store);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout() {
    this.menuOpen = false;
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
