declare module "trivia" {
    namespace Trivia {
        interface TokenResponse {
          response_code: number;
          response_message: string;
          token: string;
        }

        interface TriviaResponse {
          response_code: number;
          results: TriviaQuestion[];
        }
        
        interface TriviaQuestion {
          category: string;
          type: string;
          difficulty: string;
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }
    }
    export = Trivia;
}