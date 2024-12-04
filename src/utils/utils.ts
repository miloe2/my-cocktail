const convertToKST = (timeStr: string): string => {
  const transferedDate = new Date(timeStr);

  // KST 시간으로 변환
  const kstDate = new Date(
    transferedDate.toLocaleString("en-US", { timeZone: "Asia/Seoul" }),
  );

  // 시간과 분을 두 자리로 패딩
  const hours = kstDate.getHours().toString().padStart(2, "0");
  const minutes = kstDate.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const PAGE_SIZE = 3;

export { convertToKST, PAGE_SIZE };
