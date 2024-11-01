import { HandleSearchParams } from "@/types/types";

export const searchGpt = async ({
  setLoadingStatus,
  searchText,
  fetchSearchResult,
  updateGptMessage,
  finalCallback,
}: HandleSearchParams) => {
  setLoadingStatus();
  try {
    const rsp = await fetchSearchResult(searchText);
    if (rsp) {
      updateGptMessage(rsp, "gpt");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingStatus();
    if (finalCallback) finalCallback();
  }
};
