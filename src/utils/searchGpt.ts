import { HandleSearchParams } from "@/types/types";

export const searchGpt = async ({
  setLoadingStatus,
  searchText,
  fetchSearchResult,
  updateGptMessage,
  searchType,
  finalCallback,
}: HandleSearchParams) => {
  setLoadingStatus();
  try {
    const rsp = await fetchSearchResult(searchText, searchType);
    if (rsp) {
      updateGptMessage(rsp);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingStatus();
    if (finalCallback) finalCallback();
  }
};
