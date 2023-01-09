import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { TriviaQuestion } from 'trivia'

declare module '@vue/runtime-core' {
    // Declare your own store states.
    interface State {
      token: string,
      easyQuestions: TriviaQuestion[],
      mediumQuestions: TriviaQuestion[],
      hardQuestions: TriviaQuestion[],
      
    }
  
    interface ComponentCustomProperties {
      $store: Store<State>
    }
  }