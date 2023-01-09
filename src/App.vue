<template>
  <AppBar></AppBar>
  <div
    class="relative flex min-h-screen justify-center overflow-hidden bg-gray-100 py-6 sm:py-12"
  >
    <router-view :key="$route.path" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppBar from "./components/AppBar.vue";

@Options({
  components: {
    AppBar,
  },
})
export default class HomeView extends Vue {}
</script>
