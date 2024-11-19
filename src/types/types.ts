export interface ChatGptResponse {
  cocktails: Array<CocktailRecipt>;
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

export interface SQLChatData {
  user_id: string;
  sender_type: "gpt" | "user" | "system";
  message: string | ChatGptResponse;
  created_at: string;
  is_favorite: boolean;
  is_saved_data: boolean;
}

export interface ChatStore {
  // isChatStart: boolean;
  // updateChatStatus: () => void;
  chatMessages: Array<SQLChatData>;
  updateChatMessage: (data: SQLChatData) => void;
  // updateGptMessage: (msg: ChatGptResponse) => void;
  // updateUserMessage: (msg: string, time: string) => void;
  // updateSystemMessage: (msg: string) => void;
}

export interface HandleSearchParams {
  setLoadingStatus: () => void;
  searchText: string;
  fetchSearchResult: (
    text: string,
    searchType: "chat" | "filter",
  ) => Promise<string | undefined>;
  searchType: "chat" | "filter";
  finalCallback?: () => void;
}
