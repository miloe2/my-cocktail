import axios from "axios";

const BASE_URL = "http://172.20.10.3:3000";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSearchResult = async (
  query: string,
  searchType: "chat" | "filter",
): Promise<string | undefined> => {
  // console.log("API 호출합니다", BASE_URL);
  let content;
  if (searchType === "filter") {
    content = `Please suggest up to 3 cocktails that include the following ingredients: ${query}. Focus on recipes that highlight these ingredients and suggest simple, achievable recipes based on the selected items.`;
  } else {
    content = `Please suggest up to 3 cocktails based on the user query: "${query}".`;
  }
  // console.log(content);
  try {
    const rsp = await axios.post(`${BASE_URL}/api/generate`, {
      query: content,
    });
    // console.log("api here", rsp.data.response);
    return rsp.data.response;
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
 * 
 ***** TODO
 * fine tuning
 * 
 * unit test
 * 기본적인 item 사진 찾기 (주류 픽 사진 뽑고, 카테고리 뒤로 내리기? 내려보고 검색해보기)
 * 메인 페이지 디자인 (오늘의 칵테일 추천 / 인기 검색어)
 * 메타태그 SEO
 * 애드센스
 * firebase analistic 
 * 유튜브 링크 걸기
 *
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
 * 모달 스크롤에 따라 버튼 활성화
 * 배포
 * 리턴값이 JSON이 아닐때 notice 
 * 모달창 스크롤 내릴시 클릭 아이템 사라짐
 * Lottie
 * Filter로 검색할 시 채팅 ui 변경
 * 실제 날렸을때, 채팅창에 text 남음, setTimout 더길게 설정
 * SQLChatData로 데이터 저장하기
 * getAllData => useChatStore에 담아서 호출;(호출은 zustnad값으로)
 * 페이지네이션 / 날짜 구분 
 * 버튼 효과
 * isMainPage 파라미터로 ChatMessage 분리 
 * 메인페이지 디자인 -
 * https://www.thecocktaildb.com/api/json/v1/1/random.php
 *
 *
 ***** DB table
 * id : auto
 * user_id : UID
 * sender_type : "gpt" | "user" | "system"
 * message_type : "chat" | "filter"
 * message : string
 * created_at : timestamp
 * is_favorite : boolean
 * is_saved_data : boolean // 백엔드 저장여부
 * 
 * 
 * 
 *
 ***** 파인튜닝 질문
"다음 재료를 활용한 간단하고 만들기 쉬운 칵테일을 추천해줘: ${query}. "

"보드카로 만들 수 있는 칵테일 뭐 있어?"
"보드카 칵테일 레시피 알려줘 "
"보드카 레시피 추천해 "
"보드카와 오렌지 주스로 만들 수 있는 칵테일 알려줘."
"다음 재료를 활용한 간단하고 만들기 쉬운 칵테일을 추천해줘: 보드카, 오렌지 주스. "
"다음 재료를 활용한 간단하고 만들기 쉬운 칵테일을 추천해줘: 라임, 보드카."
"모히또"


"모히또 레시피 추천해줘."
"파인애플 모히또 레시피 알려줘."
"클래식 모히또 만드는 방법 좀 알려줘."
"위스키로 만들 수 있는 칵테일 추천해줘."
"달콤한 칵테일 레시피 알려줘."
"도수가 낮은 칵테일 추천해줘."
"진을 사용한 칵테일 레시피 알려줘."
"무알코올 칵테일 뭐 있어?"
"스크류드라이버 만드는 방법 알려줘."
"위스키 베이스 칵테일 중 유명한 거 추천해줘."
"피나콜라.다 레시피 알려줘."
"체리 브랜디로 만들 수 있는 칵테일 추천해줘."
"여름에 어울리는 시원한 칵테일 추천해줘."
"라임이 들어간 칵테일 뭐 있어?"
"상큼한 칵테일 알려줘."
"진토닉 만드는 법 좀 알려줘."
"보드카 베이스 칵테일 추천해줘."
"위스키와 콜라로 칵테일 만들 수 있어?"
"과일 주스가 들어간 칵테일 레시피 알려줘."
"럼을 활용한 칵테일 뭐 있어?"
"위스키와 버무스를 사용하는 칵테일 알려줘."
"여성분들이 좋아할 만한 칵테일 추천해줘."
"칵테일 도수 계산 방법 알려줘."
"코코넛 크림이 들어간 칵테일 레시피 알려줘."
"오렌지 주스를 활용한 칵테일 추천해줘."
"간단한 칵테일 만드는 방법 알려줘."
"만들기 쉬운 칵테일 뭐 있어?"
"탄산수가 들어간 칵테일 추천해줘."
"비터스가 들어간 칵테일 뭐 있어?"
"아이스티를 활용한 칵테일 알려줘."
"티키 스타일 칵테일 레시피 알려줘."
"새콤달콤한 칵테일 뭐 있어?"
"재료가 적게 필요한 칵테일 추천해줘."
"카페인이 들어간 칵테일 레시피 뭐 있어?"
"위스키와 레몬을 사용한 칵테일 알려줘."
"과일이 들어간 달콤한 칵테일 추천해줘."
"특별한 날 마실 수 있는 칵테일 알려줘."
"런치와 함께 어울리는 칵테일 추천해줘."
"파티에 어울리는 칵테일 레시피 알려줘."
"럼과 민트를 활용한 칵테일 뭐 있어?"
"체리 장식이 어울리는 칵테일 추천해줘."
"허브가 들어간 칵테일 뭐 있어?"
"칵테일 용어 설명해줘."
"올드 패션드 레시피 알려줘."
"위스키와 사과 주스로 칵테일 만들 수 있어?"
"저녁 식사 후 마실 수 있는 칵테일 추천해줘."
"무알코올 칵테일 중 가장 인기 있는 거 뭐야?"
"칵테일에 얼음을 어떻게 넣는 게 좋아?"
*/
