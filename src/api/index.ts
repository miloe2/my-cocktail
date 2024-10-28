import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

export const searchQuery = async (query: string) => {
  console.log("API 호출합니다", query);
  try {
    const rsp = await axios.post(`${BASE_URL}/generate`, {
      query,
    });
    // console.log("FE API RSP", rsp);
    return rsp;
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
