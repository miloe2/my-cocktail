import axios from "axios";
import { ChatGptResponse } from "@/types/types";

const BASE_URL = "http://localhost:3000/api";

export const fetchSearchResult = async (
  query: string,
): Promise<ChatGptResponse | undefined> => {
  console.log("API 호출합니다", query);
  try {
    const rsp = await axios.post(`${BASE_URL}/generate`, {
      query,
    });
    const parsedMsg = JSON.parse(rsp.data.response);
    console.log(parsedMsg, typeof parsedMsg);
    // console.log(rsp.data.response, typeof rsp.data.response) // {cocktails : [..] , string}
    return parsedMsg;
  } catch (error) {
    console.log(error);
  }
};

export const test = async () => {
  console.log("api start");
  try {
    const rsp = await axios.post(`${BASE_URL}/test`, {
      message: "Hello from client", // 요청 본문에 message 필드를 추가
    });
    console.log("API Response:", rsp.data);
  } catch (error) {
    console.error("오류 발생!", error);
  }
};

/**
 * TODO
 * 스켈레톤 페이지
 * 모달 index 애니메이션
 * 필터로 api 호출 할 때, notice2 로 넘기기
 * 모바일에서 api 호출
 * 카드아이템 디자인
 * handlerSearch 모듈화
 * 기본적인 item 사진 찾기
 * 메인 페이지 디자인
 * 채팅에 Date() 같이 전달하기
 * 유튜브 링크 걸기
 * 배포
 * 버튼 효과
 * chat gpt history 전달해서 같이 물어보기
 * 애드센스
 *
 */
