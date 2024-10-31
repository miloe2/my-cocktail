import { Dispatch, SetStateAction } from "react";
interface HandleSearchParams {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  fetchSearchResult: (text: string) => Promise<{ data: { response: string } }>;
  updateChatMessage: (message: string, sender: "user" | "gpt") => void;
  finalCallback : () => void;
}
export const searchGpt = async ({
  searchText,
  setSearchText,
  fetchSearchResult,
  updateChatMessage,
  finalCallback,
}: HandleSearchParams) => {
  setSearchText("");
  updateChatMessage(searchText, "user");
  try {
    const rsp = await fetchSearchResult(searchText);
    if (rsp && rsp.data) {
      updateChatMessage(rsp.data.response, "gpt");
    }
  } catch (error) {
    console.log(error);
  } finally {
    finalCallback();
  }
};
