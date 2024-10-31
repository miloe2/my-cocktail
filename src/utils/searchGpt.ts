import { HandleSearchParams } from "@/types/types";

export const searchGpt = async ({
  searchText,
  fetchSearchResult,
  updateGptMessage,
  finalCallback,
}: HandleSearchParams) => {
  try {
    const rsp = await fetchSearchResult(searchText);
    if (rsp) {
      updateGptMessage(rsp, "gpt");
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (finalCallback) finalCallback();
  }
};
