"use client";
import { useRouter } from "next/navigation";

const BottomNavigator = () => {
  const router = useRouter();
  const goPath = (path: string) => {
    router.push(path);
  };
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl py-3 bg-neutral-900 flex text-[10px] justify-around">
      <button
        className="flex flex-col justify-center items-center bg-red-00"
        onClick={() => goPath("/")}
      >
        <img src="/icons/home_white.svg" alt="" className="w-[18px] mb-1" />
        <span>Home</span>
      </button>
      <button
        className="flex flex-col justify-center items-center bg-red-00"
        onClick={() => goPath("/cocktail-chat")}
      >
        <img src="/icons/chat_white.svg" alt="" className="w-[18px] mb-1" />
        <span>Chat</span>
      </button>
    </div>
  );
};
export default BottomNavigator;
