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


export interface ChatStore {
  isChatStart: boolean;
  updateChatStatus: () => void;
  chatMessages: ChatMessage[];
  updateChatMessage: (msg: string, user: "user" | "gpt") => void;
}
