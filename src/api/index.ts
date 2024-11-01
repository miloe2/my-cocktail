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
 * 모달 클릭시 검색창도 translate Y
 * 모달 index 애니메이션 
 * 필터로 api 호출 할 때, notice2 로 넘기기2 
 * 모달창 필터 수정 하기 - 술이 아닌 진 / 칵테일 / 라임 / 콜라/ 이런식으로 만들기, 
 * 모바일에서 api 호출
 * 카드아이템 디자인
 * 기본적인 item 사진 찾기
 * 메인 페이지 디자인
 * 채팅에 Date() 같이 전달하기
 * 유튜브 링크 걸기
 * 배포
 * 버튼 효과
 * firebase analistic
 * 애드센스
 * chat gpt history 전달해서 같이 물어보기
*
*
* handlerSearch 모듈화
 * 스켈레톤 페이지
 */
