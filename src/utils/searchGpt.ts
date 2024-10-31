import { Dispatch, SetStateAction } from "react";
interface HandleSearchParams {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchQuery: (text: string) => Promise<{ data: { response: string } }>;
  updateChatMessage: (message: string, sender: "user" | "gpt") => void;
  finalCallback : () => void;
}
export const searchGpt = async ({
  searchText,
  setSearchText,
  searchQuery,
  updateChatMessage,
  finalCallback,
}: HandleSearchParams) => {
  setSearchText("");
  updateChatMessage(searchText, "user");
  try {
    const rsp = await searchQuery(searchText);
    if (rsp && rsp.data) {
      updateChatMessage(rsp.data.response, "gpt");
    }
  } catch (error) {
    console.log(error);
  } finally {
    finalCallback();
  }
};
