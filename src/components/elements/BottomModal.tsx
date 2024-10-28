import React from "react";
import useModalStore from "@/store/useModalStore";

interface BottomModalProps {
  id: string;
  tab?: React.ReactNode;
  content: React.ReactNode;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const BottomModal = ({ id, tab, content, onPrimaryAction, onSecondaryAction }: BottomModalProps) => {
  const refreshIconUrl = "/images/refresh-icon.svg";
  const { modals, closeModal } = useModalStore();
  const isOpen = modals[id] || false;
  const modalClass = ` bg-stone-700 fixed ${
    isOpen ? "translate-y-0" : "translate-y-full"
  } bottom-0 max-w-3xl w-full max-h-[400px] rounded-t-lg px-4 flex flex-col left-1/2 -translate-x-1/2 transition-transform duration-300`;

  return (
    <div className={modalClass}>
      <div>{tab}</div>
      <div className="w-full h-full overflow-y-auto pb-44 relative no-scroll">
        {content}
        <div className="bg-stone-700 w-full h-14 fixed bottom-0 left-0  px-4 py-2 flex text-sm space-x-2">
          <button 
            className="w-14 h-10 bg-stone-600 flex justify-center items-center text-white"
            onClick={onSecondaryAction}>
            <img src={refreshIconUrl} alt="" className="w-6 h-6" />            
          </button>
          <button
            className="bg-stone-600 rounded-sm w-1/2 h-full"
            onClick={() => closeModal(id)}
          >
            닫기
          </button>
          <button className="bg-stone-800 text-white rounded-sm w-1/2  h-full" onClick={onPrimaryAction}>
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
