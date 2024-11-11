import axios from "axios";
import { ChatGptResponse } from "@/types/types";

// const BASE_URL = "http://172.20.10.3:3000";
const BASE_URL = process.env.BASE_URL;

export const fetchSearchResult = async (
  query: string,
  searchType: "chat" | "filter",
): Promise<ChatGptResponse | undefined> => {
  console.log("API 호출합니다", query);
  let content;
  if (searchType === "filter") {
    content = `Please suggest up to 3 cocktails that include the following ingredients: ${query}. Focus on recipes that highlight these ingredients and suggest simple, achievable recipes based on the selected items.`;
  } else {
    content = `Please suggest up to 3 cocktails based on the user query: "${query}".`;
  }
  console.log(content);
  try {
    const rsp = await axios.post(`${BASE_URL}/api/generate`, {
      query: content,
    });
    const parsedMsg = JSON.parse(rsp.data.response);
    console.log(parsedMsg, typeof parsedMsg);
    return parsedMsg;
  } catch (error) {
    console.log(error);
  }
};

export const testPhone = async () => {
  console.log("api start");
  try {
    const rsp = await axios.post(`${BASE_URL}/api/test`, {
      message: "Hello from client", // 요청 본문에 message 필드를 추가
    });
    console.log("API Response:", rsp.data);
  } catch (error) {
    console.error("오류 발생!", error);
  }
};

/**
 * TODO
 * 모달 스크롤에 따라 버튼 활성화
 * 배포
 * bottom Modal 올라오는 효과 (&& 조건? 어떻게 처리?)
 * 기본적인 item 사진 찾기 (주류 픽 사진 뽑고, 카테고리 뒤로 내리기? 내려보고 검색해보기)
 * fine tuning
 * 메인 페이지 디자인
 * firebase analistic
 * 애드센스
 * chat gpt history 전달해서 같이 물어보기
 * 질문 DB 화
 *
 *
 ****** Finished ******
 * handlerSearch 모듈화
 * SearchManger / cocktail-chat 모듈화
 * 스켈레톤 페이지
 * 모바일에서 api 호출
 * 모달창 필터 수정 하기 - 술이 아닌 진 / 칵테일 / 라임 / 콜라/ 이런식으로 만들기,
 * 모달창 스크롤 이벤트 => 뒤로가기버튼 되게
 * 카드아이템 디자인
 * 채팅에 Date() 같이 전달하기
 * useChatStore user 파라미터로 자동 저장
 * 튜토리얼 페이지
 * 필터로 api 호출 할 때, notice2 로 넘기기 / 적용 => 바로 서치하기,  type 1 / 2
 *
 ****** 안 중요 ******
 * 유튜브 링크 걸기
 * 버튼 효과
 * 모달 index 애니메이션
 * unit test
 * 모달 클릭시 검색창도 translate Y
 * indexed DB 활용해서
 *
 */
