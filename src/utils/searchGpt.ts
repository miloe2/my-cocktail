import { HandleSearchParams } from "@/types/types";

const searchGpt = async ({
  searchText,
  setSearchText,
  fetchSearchResults,
  updateChatMessage,
  finalCallback,
}: HandleSearchParams) => {
  setSearchText("");
  updateChatMessage(searchText, "user");
  try {
    const rsp = await fetchSearchResults(searchText) as { data: { response: string } };
    if (rsp && rsp.data) {
      updateChatMessage(rsp.data.response, "gpt");
    }
  } catch (error) {
    console.log(error);
  } finally {
    if(finalCallback) {
      finalCallback();
    }
  }
};

export default searchGpt