import React from "react";
import useModalStore from "@/store/useModalStore";

interface BottomModalProps {
  id: string;
  tab?: React.ReactNode;
  content: React.ReactNode;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const BottomModal = ({
  id,
  tab,
  content,
  onPrimaryAction,
}: BottomModalProps) => {
  console.log("bottom modal render");
  const { modals, closeModal } = useModalStore();
  const isOpen = modals[id] || false;
  const modalClass = ` bg-stone-700 fixed ${
    isOpen ? "translate-y-0" : "translate-y-full"
  } bottom-0 max-w-3xl w-full max-h-[420px] rounded-t-2xl px-4 pb-14 flex flex-col left-1/2 -translate-x-1/2 transition-transform duration-300`;

  return (
    <div className={modalClass}>
      <div className="mb-4">{tab}</div>
      <div className="w-full h-full overflow-y-auto pb-24 relative no-scroll">
        {content}
        <div className="bg-stone-700 w-full h-14 fixed bottom-0 left-0  px-4 py-2 flex text-sm space-x-2">
          <button
            className="bg-stone-600 rounded-sm w-1/2 h-full"
            onClick={() => closeModal(id)}
          >
            닫기
          </button>
          <button
            className="bg-stone-800 text-white rounded-sm w-1/2  h-full"
            onClick={onPrimaryAction}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
