import React from "react";
import useModalStore from "@/store/useModalStore";

interface BottomModalProps {
  id: string;
  tab?: React.ReactNode;
  content: React.ReactNode;
  onClick?: () => void;
}

const BottomModal = ({ id, tab, content, onClick }: BottomModalProps) => {
  const { modals, closeModal } = useModalStore();
  const isOpen = modals[id] || false;
  const modalClass = ` bg-stone-500 fixed ${
    isOpen ? "translate-y-0" : "translate-y-full"
  } bottom-0 max-w-3xl w-full max-h-[400px] rounded-t-lg pl-6 pr-4 flex flex-col left-1/2 -translate-x-1/2 transition-transform duration-300`;

  // const modalClass = `no-scroll bg-stone-500 fixed translate-y-0 bottom-0 max-w-3xl w-full max-h-[400px] rounded-t-lg px-4 flex flex-col left-1/2 -translate-x-1/2`;
  return (
    <div className={modalClass}>
      <div>{tab}</div>
      <div className="w-full h-full overflow-y-auto pb-44 relative no-scroll">
        {content}
        <div className="bg-stone-500 w-full h-14 fixed bottom-0 left-0 grid grid-cols-2 px-4 py-2 gap-2 text-sm">
          <button
            className="bg-stone-600 rounded-sm"
            onClick={() => closeModal(id)}
          >
            닫기
          </button>
          <button className="bg-black text-white rounded-sm" onClick={onClick}>
            적용
          </button>
        </div>
      </div>
      {/* <div className="bg-stone-500 w-full h-14 fixed bottom-0 px-4 -ml-4 grid grid-cols-2 p-2 gap-2 text-sm">
        <button className=" bg-stone-600 rounded-sm">닫기</button>
        <button className="bg-black text-white rounded-sm">적용</button>
      </div> */}
    </div>
  );
};

export default BottomModal;
