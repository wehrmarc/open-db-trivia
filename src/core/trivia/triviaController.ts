import { TokenResponse, TriviaResponse } from "trivia";
import { EndpointService } from "../api/endpoint.service";

const api = new EndpointService("https://opentdb.com/");

async function getToken(): Promise<TokenResponse> {
  return await api.get("api_token.php?command=request");
}

async function getEasyQuestions(token: string): Promise<TriviaResponse> {
  return await api.get(`api.php?amount=50&difficulty=easy&token=${token}`);
}

async function getMediumQuestions(token: string): Promise<TriviaResponse> {
  return await api.get(`api.php?amount=50&difficulty=medium&token=${token}`);
}

async function getHardQuestions(token: string): Promise<TriviaResponse> {
  return await api.get(`api.php?amount=50&difficulty=hard&token=${token}`);
}

export default {
  getToken,
  getEasyQuestions,
  getMediumQuestions,
  getHardQuestions,
};
