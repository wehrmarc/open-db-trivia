<template>
  <QCard>
    <div></div>
  </QCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import QCard from "@/components/Q-Card.vue";

@Options({
  components: {
    QCard,
  },
})
export default class QuizQuestion extends Vue {}
</script>
