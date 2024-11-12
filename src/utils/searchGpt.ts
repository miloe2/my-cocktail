import { ChatGptResponse, HandleSearchParams } from "@/types/types";

export const searchGpt = async ({
  setLoadingStatus,
  searchText,
  fetchSearchResult,
  // updateGptMessage,
  searchType,
  finalCallback,
}: HandleSearchParams): Promise<ChatGptResponse | "error"> => {
  setLoadingStatus();
  try {
    const rsp = (await fetchSearchResult(searchText, searchType)) as string;
    let parsedResponse: ChatGptResponse | string;

    try {
      parsedResponse = JSON.parse(rsp) as ChatGptResponse;
      return parsedResponse; // 성공 시 ChatGptResponse 반환
    } catch (error) {
      console.log("Parsing error, invalid JSON format");
      return "error"; // 파싱 오류 시 "error" 반환
    }
  } catch (error) {
    console.log("Fetch error:", error);
    return "error"; // fetch 오류 시 "error" 반환
  } finally {
    setLoadingStatus();
    if (finalCallback) finalCallback();
  }
};
