import type { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.OPENAI_API_KEY;
const apiEndpoint = "https://api.openai.com/v1/chat/completions";

const handleSendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.body;
  const notice = `
[
    {
        "name": "칵테일 이름 (string)",
        "receipt": [
            { "ingredient": "재료 이름 (string)", "amount": "재료 양 (string)" },
            { "ingredient": "재료 이름 (string)", "amount": "재료 양 (string)" },
            ...
        ],
        "degree": "도수 (number)",
        "taste": "맛 설명 (string)"
    },
    ...
]
`;
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        // model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `${query}, 답변형식 : ${notice} 답변은 다음 JSON 형식에 맞춰서 작성해줘.`,
          },
        ],
        max_tokens: 128, // 답변 최대 글자 수,
        top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
        temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
        frequency_penalty: 0.5, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
        presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
        // stop: ['문장 생성 중단 단어'],
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "No response";
    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("오류 발생!", error);
  } finally {
    console.log("finally");
  }
};

export default handleSendMessage;
