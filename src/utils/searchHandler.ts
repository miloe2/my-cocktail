import { Dispatch, SetStateAction } from "react";
import { NextRouter } from "next/router";
interface HandleSearchParams {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchQuery: (text: string) => Promise<{ data: { response: string } }>;
  updateChatMessage: (message: string, sender: "user" | "gpt") => void;
  router: NextRouter;
}
export const handleSearch = async ({
  searchText,
  setSearchText,
  searchQuery,
  updateChatMessage,
  router,
}: HandleSearchParams) => {
  // setLog("요청시작");
  setSearchText("");
  updateChatMessage(searchText, "user");
  // if (!isChatStart) {
  // updateChatStatus();
  // }
  try {
    const rsp = await searchQuery(searchText);
    if (rsp && rsp.data) {
      updateChatMessage(rsp.data.response, "gpt");
      // setLog(`응답 받음: ${JSON.stringify(rsp.data)}`);
    }
  } catch (error) {
    console.log(error);
    // setLog(`오류 발생: ${error}`);
  } finally {
    router.push("/ask-cocktail");
  }
};
