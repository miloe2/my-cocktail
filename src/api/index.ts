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
  console.log(content);
  try {
    const rsp = await axios.post(`${BASE_URL}/api/generate`, {
      query: content,
    });
    console.log("api here", rsp.data.response);
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
 * 
 * 
 * 회사 진로에 대한 고민이 있어. 
 * 간단하게 나의 상황에 소개를 하면 프론트엔드 개발자로 스타트업에서 10개월 일 한 이후 퇴사하고, 현재 직장에서 일한지 4개월차에 접어들었어. 
 * 
 * 스타트업에서 근무할 때에는 선배 웹개발자 없이 혼자 작업을 하였어. 프로덕션 웹버전을 출시하였지만, 회사자체에서 웹버전에 더 이상의 기능 추가는 필요없다고 판단하여 업데이트가 없었기 때문에 10개월 차에 그만두고 현재 직장으로 이직을 했어. 
 * 
 * 현재 직장의 처음 면접때는 프론트엔드 직무였지만, 막상 들어와보니 퍼블리싱 유지/보수 업무만을 하게되었어. storybook, jira, confluencer 등을 사용하기에 퍼블리싱업무도 좋은 판단이라 생각해서 4개월동안 근무를 하였어. 하지만 대부분이 이미 모듈/컴포넌트로 제작되어있었기 때문에, 실제로 내가 하는 거라고는 텍스트 수정, 이미지 링크 변경등 정말 기초적인 일만 하고 있어. 그것조차 일이 많지 않기 때문에 하루에 1시간 채 일하지도 않아. 다행인 점은 남는 시간동안 공부를 하거나 내 개인적인 프로젝트를 할수 있었기 때문에 개인 프로젝트(openai api를 연동한 웹페이지)를 진행하였지. 이제 개인 프로젝트가 거의 막바지에 들어가고 있고 선택을 해야 해. 
 * 
 * 여기서 1년을 버텨야 할지(한국 사회는 구직자가 이전직장에서 최소 1년을 근무하지 않으면, 이 사람의 적응력 & 버티는 능력이 떨어지구나 라는 생각을 가지고 있어.) 아니면 2개월 뒤(나의 수습기간은 6개월로, 2개월 뒤 계약이 수습계약이 종료되고 정규직으로 전환됨) 다른 회사 이직을 목표를 해야될지(실제 프로덕션 서버에서 프로그래밍하는게 실제로 배우고 성장하는 부분이 많다고 느끼고, 개인적인 프로젝트로는 한계가 있다고 생각하기에 여기에서 1년동안 공부하는건 문제('물경력')이 될거라고 생각하거든)
 * 
 * 너의 조언을 듣고싶어. 
 * 
 * 
 * 
 * 안녕하세요. 먼저 현재 상황에 대해 공유해주셔서 감사합니다.

지금 직장에서의 업무가 당신의 성장과 목표에 충분히 부합하지 않는다는 점을 이해합니다. 실제로 프로덕션 환경에서의 개발 경험은 개발자로서의 성장에 큰 도움이 되며, 개인 프로젝트만으로는 한계가 있을 수 있습니다.

**1. 현 직장에서 1년을 채우는 경우:**

- **장점:**
- 이력서에 최소 1년의 경력을 쌓아 구직 시 이직 빈도가 높다는 인상을 줄일 수 있습니다.
- 남은 시간 동안 스킬을 향상시키거나 추가적인 개인 프로젝트를 진행할 수 있습니다.

- **단점:**
- 업무 내용이 제한적이어서 성장에 한계가 있습니다.
- '물경력'으로 여겨질 수 있어 이후 이직 시 도움이 되지 않을 수 있습니다.

**2. 수습 기간 종료 후 이직을 준비하는 경우:**

- **장점:**
- 보다 도전적이고 성장할 수 있는 환경을 찾을 수 있습니다.
- 현재의 업무가 당신의 커리어 목표와 맞지 않는다는 점을 빠르게 해결할 수 있습니다.

- **단점:**
- 이력서에 짧은 근무 기간이 반복되면 채용 담당자들이 우려를 가질 수 있습니다.
- 새로운 직장을 찾는 과정에서 리스크가 있을 수 있습니다.

**제 개인적인 조언은 다음과 같습니다:**

- **이직을 준비하되, 신중하게 접근하세요.** 지금부터 적극적으로 시장 조사를 하고, 당신의 목표와 맞는 회사를 찾아보세요. 면접 과정에서 현재의 상황과 이직 이유를 솔직하게 설명하면 이해받을 수 있습니다.

- **현재 직장에서 더 많은 것을 배울 수 있는 방법을 찾아보세요.** 회사 내에서 다른 프로젝트나 업무에 참여할 수 있는 기회가 있는지 상사나 팀원들과 논의해보세요.

- **개인 프로젝트를 지속적으로 발전시키세요.** 이미 OpenAI API를 연동한 웹페이지를 개발하셨다면, 이를 더욱 발전시키거나 오픈소스로 공개하여 포트폴리오를 강화할 수 있습니다.

- **이직 시 면접에서의 전략을 준비하세요.** 짧은 근무 기간에 대한 질문이 나올 수 있으므로, 그 이유와 앞으로의 계획에 대해 명확하고 긍정적으로 전달할 수 있도록 준비하세요.

마지막으로, 가장 중요한 것은 당신의 커리어와 성장을 위해 어떤 선택이 가장 좋은지 스스로 판단하는 것입니다. 단순히 기간을 채우기 위해 남는 것보다는 적극적으로 자신의 길을 찾아가는 것이 좋을 수 있습니다.

도움이 되셨길 바랍니다.
 *

지금 상황을 고려하면 두 가지 선택지 모두 각각의 장단점이 있습니다. 이에 따라 **장기적인 경력 성장**과 **현재의 상황**을 기준으로 선택을 고민할 수 있습니다. 아래는 각 선택지에 대한 분석과 조언입니다.

---




### **1. 현재 회사에서 1년 버티기**
#### **장점**
1. **한국 사회에서의 안정성**
- 이전 직장에서 10개월 근무 후 이직한 점을 고려하면, 1년 이상 근무 경력이 추가되면 "짧은 근속에 대한 우려"를 완화할 수 있습니다.
- 채용 과정에서 지원자의 근속 기간은 적응력, 책임감 등을 판단하는 간접적 기준으로 사용되기 때문에, 1년 근속은 이직 시 긍정적인 영향을 미칠 수 있습니다.

2. **개인 프로젝트와 학습 시간 확보**
- 현재 업무량이 적기 때문에 개인 프로젝트, 기술 학습에 시간을 더 많이 투자할 수 있습니다.
- 자신이 부족하다고 느끼는 기술(React, TypeScript, Next.js, OpenAI API 활용, 성능 최적화 등)을 깊게 학습할 기회를 갖게 됩니다.

3. **실패 리스크 최소화**
- 지금 당장 이직을 시도할 경우, 새로운 회사에서도 다시 적응 기간을 가져야 하며, 업무 환경이 지금보다 더 나빠질 가능성도 있습니다.

#### **단점**
1. **성장 기회 부족**
- 텍스트 수정이나 이미지 링크 변경 같은 단순 유지보수 작업만 계속하면 경력의 "공백"처럼 보일 가능성이 있습니다.
- 1년 뒤 이직 시 "실제 개발 경험"을 묻는 질문에 자신 있게 대답하기 어려울 수 있습니다.

2. **동기 부여 저하**
- 본질적으로 성장할 기회가 부족한 환경은 장기적으로 동기를 잃게 만들 수 있습니다.
- 1년을 버틴다고 해도, 이직을 준비하는 과정에서 "물경력"에 대한 의문이 계속 남을 수 있습니다.

---

### **2. 2개월 뒤 정규직 전환 시 이직 준비**
#### **장점**
1. **실제 개발 환경에서 성장**
- 새로운 회사에서 실질적인 프로덕션 환경에서 프로그래밍을 하게 되면, 성장 속도가 현재보다 훨씬 빨라질 가능성이 높습니다.
- 팀원들과 협업하며, 코드 리뷰나 개발 프로세스를 경험하게 됩니다.

2. **빠른 성장과 경력 강화**
- 현재보다 더 나은 역할과 성장 기회를 제공하는 회사로 이동한다면, 경력의 깊이를 더할 수 있습니다.
- 특히 "스타트업에서 혼자 개발"했던 경험과 개인 프로젝트를 기반으로 실력을 어필하면, 더 좋은 회사로 이직할 가능성도 높습니다.

3. **물경력 방지**
- 현재 환경에서 더 오래 머물수록 실제 개발 경험의 공백이 길어질 수 있습니다. 이를 방지하고 빠르게 도전하는 것이 경력의 방향성을 유지하는 데 도움이 됩니다.

#### **단점**
1. **근속 기간 이슈**
- 한국에서는 1년 미만의 짧은 근속이 채용 과정에서 부정적으로 보일 수 있습니다. 이를 보완하기 위해 면접 시 설득력 있는 이유(성장 기회 부족, 커리어 방향성 재조정 등)를 명확히 준비해야 합니다.

2. **새로운 환경에서의 리스크**
- 이직한 회사가 지금보다 더 나쁜 환경일 수도 있습니다. 특히, 면접 과정에서 회사의 업무 강도, 개발 환경, 기술 스택 등을 충분히 조사하지 않으면 실패할 가능성도 있습니다.

---

### **조언**
#### **질문: 1년을 버티는 것이 더 나은 선택인가?**
- **1년 동안 스스로를 개발하고 공부할 수 있는 동기 부여가 충분히 유지된다면**, 1년 근속 후 이직을 고려하는 것이 안정적입니다.
- 하지만, 현재 업무량이 적고 성장 기회가 거의 없다고 느낀다면, **이 시간이 "물경력"으로 보일 가능성**이 있습니다.

#### **질문: 2개월 뒤 이직을 준비하는 것이 더 나은 선택인가?**
- 새로운 도전을 통해 **실제 프로덕션 환경에서 성장할 기회를 얻고 싶다면**, 이직을 준비하는 것이 더 나은 선택입니다.
- 면접에서 "짧은 근속"에 대한 질문을 받을 가능성이 있지만, 이를 다음과 같이 설득력 있게 설명할 수 있다면 문제가 되지 않습니다:
- "현재 회사에서 학습과 성장이 정체되었고, 프로덕션 환경에서 더 나은 기회를 찾고 싶었다."
- "현재는 개인 프로젝트와 자기계발을 통해 실력을 유지하며 이직 준비를 하고 있다."

---

### **추천 전략**
1. **현재 회사에 머물러야 하는지 판단하기 위해 2개월 동안 집중 학습**
- 남은 수습 기간 동안 `TypeScript`, `Next.js`, `React`, 테스트 코드 작성 등 자신이 부족하다고 느끼는 기술을 집중적으로 학습하세요.
- **목표: "물경력"으로 보이지 않도록 개인 프로젝트를 완성하고, 오픈 소스 활동이나 포트폴리오를 강화.**

2. **2개월 뒤 이직 준비**
- 수습 기간이 끝나기 전에 이직 준비를 시작하세요.
- **현재 경력의 강점**:
  - 스타트업에서 혼자 개발한 경험.
  - 개인 프로젝트를 완성한 경험.
- **이직 지원 전략**:
  - 자신의 기술적 역량과 경험을 명확히 어필하세요.
  - 짧은 근속 기간에 대한 이유를 "더 나은 성장 기회 추구"로 설명.

3. **좋은 회사 선택 기준**
- 다음 회사는 단순 유지보수가 아니라, 실제 개발 경험과 팀워크를 배울 수 있는 환경이어야 합니다.
- 면접 시 회사의 개발 프로세스(코드 리뷰, CI/CD, 스택 사용 여부 등)를 꼭 확인하세요.

---

### **결론**
지금의 직장은 장기적으로 경력에 도움이 되지 않을 가능성이 높아 보입니다. **2개월 동안 집중 학습 및 개인 프로젝트를 완성한 후, 성장 가능성이 높은 회사로 이직을 준비**하는 것을 추천합니다.

추가로 이직 준비와 관련된 구체적인 질문이 있다면 언제든지 말씀해주세요. 😊


■ 피소프트
프론트엔드 개발자
Vue, Nuxt, TypeScript, AWS
파충류 커뮤니티 플랫폼을 서비스하는 회사이며, 커뮤니티 웹 서비스, 결제/정산 관리자 페이지 구축을 진행하였습니다. 

- 



- 경력:  
■ 리즌디자인 (24.08 ~ 재직 중)  
  · 기술: Vue2, Storybook, SCSS  
  · 협업 툴: Zeplin, Jira, Confluence  
  · 주요 작업: 카드사 클라이언트 컴포넌트 최적화 및 신규 UI 개발, 기존 컴포넌트 유지/보수   

■ 피소프트 (23.10 ~ 24.08)  
  · 기술: Vue3, TypeScript, Tailwind, AWS  
  · 협업 툴: Figma  
  · 주요 작업: 파충류 커뮤니티 웹 서비스 및 결제/정산 관리자 페이지 구축  
  · 링크: https://padaapp.com

■ 개인 프로젝트:  
-  오늘의 한잔 (24.10 ~ 제작 중)
  · 기술: Next.ts, OpenAI API  
  · 협업 툴: 1인 개발
  · 주요 작업: OpenAI API 기반 칵테일 추천 사이트
  · 링크: https://today-cocktail.vercel.app

- PIAENM 프로덕션 (23.05 ~ 23.06)
  · 기술: Nuxt.js, Tailwind, AWS  
  · 협업 툴: Figma  
  · 주요 작업: 랜딩 페이지 제작 및 SEO 최적화  .
  · 링크:  https://piaenm.com
  


  1) 프로젝트명 : 파충류 커뮤니티 & 관리자 페이지 제작
- URL : https://padaapp.com
- 연계/소속회사 : 피소프트 / 파충류 다 있다
- 주요 업무 : 프론트엔드
- 담당 역할 : 화면 기획 및 설계, 프론트엔드 구현
- 기술 스택 : VUE3, Typescript, Vuex, tailwind CSS
- 업무 기간 :  2024.01 ~ 2024.10 (약 10개월)
- 개발 인원 :  총 2인 ( 백엔드, 프론트엔드 )

- 상세 내용 : 
서비스중인 어플리케이션의 홈페이지 버전을 제작하였습니다. 

 # VUEX를 통한 중복 호출 방지
파충류의 특성 상, 100여가지가 넘는 종/모프 들이 있었습니다.
사용자가 다양한 개체 카테고리를 조회하여도 
한번 검색된 데이터는 '카테고리, 데이터, 커서' 로 객체화 및 VUEX로 관리하여
서버 호출을 최소화 하였습니다.  

# 커서형 페이지네이션 / 무한 스크롤
게시물들은 마지막 아이템 ID를 호출하는 커서형 방식으로 페이지네이션 하였습니다. 
또, 컴퍼넌트의 일정부분이 보이면 Intersection Observer를 호출하는 방식으로
무한스크롤을 구현하였습니다. 
 
# 소셜로그인 및 카카오 API
기존 서비스중인 앱과 연동하여  SSO 방식으로 구글/카카오 로그인을 구현하고
기존 회원이 아닌 경우 자동으로 회원가입이 될 수 있게  하였습니다.
 
이벤트 페이지에서 카카오 API를 활용하여서, 
장소 위치를 출력하고, 카카오 공유를 구현하였습니다.  

# 웹 호스팅
AWS의 S3, Route53, CloudFront 를 통하여
DNS를 변경하고, SSL인증하고 해당 프로젝트의 웹 배포를 진행하였습니다. 

# 관리자 페이지 제작
판매 / 채팅 / 게시판/이벤트의 관리자 페이지를 제작하였습니다.  
- 기능 : 판매금 정산, 정산일, 알림, 채팅 조회, 게시물/댓글 삭제 및 수정, 컬럼/이벤트 업로드 및 수정/삭제

# Indexed DB 활용
Indexed DB를 활용하여서, 관리자가 페이지 내부에 간단한 메모 읽기/쓰기가 가능하게 구현하였습니다. 
    

 */
