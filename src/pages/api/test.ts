// pages/api/test.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // OPTIONS 메서드에 대한 예비 요청(Preflight request) 처리
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  const { message } = req.body;

  if (!message) {
    res.status(400).json({ message: "Message is required" });
    return;
  }

  console.log("API /test 엔드포인트 호출됨, 메시지:", message);
  res.status(200).json({ message: "Test API 호출 성공", data: message });
}
