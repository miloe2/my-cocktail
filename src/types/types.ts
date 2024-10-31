export interface ChatGptMessage {
  user: "gpt";
  msg: ChatGptResponse;
}

export interface ChatUserMessage {
  user: "user";
  msg: string;
}

export interface CocktailRecipt {
  name: string;
  ingredients: Reciept[];
  degree: number;
}

export interface Reciept {
  name: string;
  amountValue: number;
  unit: string;
}

export interface ChatStore {
  isChatStart: boolean;
  updateChatStatus: () => void;
  chatMessages: Array<ChatGptMessage | ChatUserMessage>;
  updateGptMessage: (msg: ChatGptResponse, user: "gpt") => void;
  updateUserMessage: (msg: string, user: "user") => void;
}

export interface ChatGptResponse {
  cocktails: Array<CocktailRecipt>;
}

export interface HandleSearchParams {
  searchText: string;
  fetchSearchResult: (text: string) => Promise<ChatGptResponse | undefined>;
  updateGptMessage: (msg: ChatGptResponse, user: "gpt") => void;
  finalCallback?: () => void;
}
