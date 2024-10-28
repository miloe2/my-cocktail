export interface ChatMessage {
  // id: string;
  time: Date;
  user: 'user' | 'gpt';
  msg: string ;
}

export interface ChatStore {
  isChatStart: boolean;
  updateChatStatus: () => void;
  chatMessages: ChatMessage[];
  updateChatMessage: (msg: string, user: 'user' | 'gpt') => void;
}