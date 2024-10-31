import { Dispatch, SetStateAction } from "react";

export interface ChatMessage {
  // id: string;
  // time: Date;
  user: "user" | "gpt";
  msg: string | { Cocktails : Array<CocktailRecipt>};
};

export interface CocktailRecipt {
  name: string;
  ingredients: Reciept[];
  degree: number;
};

export interface Reciept {
  name: string;
  amountValue: number;
  unit: string;
};

export interface GptApiResponse {
  data : {
    response : string;
  }
};
// 핸들러 함수에 필요한 타입
export interface HandleSearchParams {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  fetchSearchResults: (text: string) => Promise<GptApiResponse | undefined>;
  updateChatMessage: (message: string, sender: "user" | "gpt") => void;
  finalCallback?: () => void;
}

export interface ChatStore {
  isChatStart: boolean;
  updateChatStatus: () => void;
  chatMessages: ChatMessage[];
  updateChatMessage: (msg: string, user: "user" | "gpt") => void;
}
