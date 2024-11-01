import { HandleSearchParams } from "@/types/types";

export const searchGpt = async ({
  searchText,
  fetchSearchResult,
  updateGptMessage,
  setLastGptMessage,
  finalCallback,
}: HandleSearchParams) => {
  // const loadingMsg = {
  //   cocktails : []
  // }
  // updateGptMessage(loadingMsg, "gpt");
  try {
    const rsp = await fetchSearchResult(searchText);
    if (rsp) {
      // setLastGptMessage(rsp);
      updateGptMessage(rsp, "gpt");
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (finalCallback) finalCallback();
  }
};
