export interface ChatGptMessage {
  user: "gpt";
  msg: ChatGptResponse;
}

export interface ChatUserMessage {
  user: "user";
  msg: string;
  time: string;
}

export interface ChatNoticeMessage {
  user: "notice";
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
  chatMessages: Array<ChatGptMessage | ChatUserMessage | ChatNoticeMessage>;
  updateGptMessage: (msg: ChatGptResponse) => void;
  updateUserMessage: (msg: string, time: string) => void;
  updateSystemMessage: (msg: string) => void;
}

export interface ChatGptResponse {
  cocktails: Array<CocktailRecipt>;
}

export interface HandleSearchParams {
  setLoadingStatus: () => void;
  searchText: string;
  fetchSearchResult: (
    text: string,
    searchType: "chat" | "filter",
  ) => Promise<string | undefined>;
  // updateGptMessage: (msg: ChatGptResponse) => void;
  searchType: "chat" | "filter";
  finalCallback?: () => void;
}
