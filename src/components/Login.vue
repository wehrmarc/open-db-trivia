<template>
    <div class="flex justify-center align-middle">

    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import QCard from "./Q-Card.vue";

@Options({
    components: {
        QCard
    }
})
export default class LoginDialog extends Vue {
    this.$store
}
</script>