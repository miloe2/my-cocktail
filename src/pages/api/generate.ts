import type { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.OPENAI_API_KEY;
const apiEndpoint = "https://api.openai.com/v1/chat/completions";

const handleSendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  // CORS 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // OPTIONS 메서드에 대한 예비 요청(Preflight request) 처리
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  console.log("api 호출 시작");
  const { query } = req.body;
  const notice = `
  {
    "cocktails": [
      {
        "name": "칵테일 이름",
        "ingredients": [
          { "name": "재료 이름", "amountValue": 30, "unit": "ml" },
          { "name": "재료 이름", "amountValue": 15, "unit": "g" }
        ],
        "degree": 40
      },
      {
        "name": "다른 칵테일 이름",
        "ingredients": [
          { "name": "재료 이름", "amountValue": 50, "unit": "ml" },
          { "name": "재료 이름", "amountValue": 20, "unit": "g" }
        ],
        "degree": 35
      }
    ]
  }`;
  // "taste": "맛 설명 (string)"
  // const notice = 'JSON 키워드는 name, receipt, degree, taste 로 해줘. '

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // model: "gpt-3.5-turbo",
        model: "gpt-4o-mini",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant specialized in cocktail recommendations. Always provide responses in the ${notice} JSON format with matches for the user's query.`,
          },
          {
            role: "user",
            content: `${query}`,
          },
          // {
          //   role: "user",
          //   content: `Please suggest up to 3 cocktails that include "${query}" as an ingredient. If there are many ingredients, give a recommended recipe focusing on essential ingredients. If there are few ingredients, suggest simple recipes that can be made with just those.`,
          // },
        ],
        max_tokens: 512, // 답변 최대 글자 수,
        top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
        temperature: 0.3, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
        frequency_penalty: 0, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
        presence_penalty: 0, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
        // stop: ['문장 생성 중단 단어'],
      }),
    });
    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "No response";
    console.log(aiResponse);
    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("오류 발생!", error);
  } finally {
    console.log("finally");
  }
};

export default handleSendMessage;
