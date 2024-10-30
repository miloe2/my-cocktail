import BeverageModal from "./BeverageModal";
import useModalStore from "@/store/useModalStore";

import ScrollableBox from "@/components/elements/ScrollableBox";
interface SearchHintsProps {
  className?: string;
}

const SearchHints = ({ className }: SearchHintsProps) => {
  const { openModal } = useModalStore();
  const modalId = "beverage";
  return (
    <div className={className}>
      <ScrollableBox>
        <div
          className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin"
          onClick={() => openModal(modalId)}
        >
          <div className="bg-stone-600 aspect-square flex justify-center items-center">
            img
          </div>
          <div className="ml-2">
            <p className="font-medium text-sm mb-1">갖고있는 술로 찾기</p>
            <p className="text-[12px]">말리부, 블루큐라소, 마티니</p>
          </div>
        </div>

        <div className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin">
          <div className="bg-stone-600 aspect-square flex justify-center items-center">
            img
          </div>
          <div className="ml-2">
            <p className="font-medium text-sm mb-1">직접 검색해서 찾기</p>
            <p className="text-[12px]">
              짐볼이랑 말리부로만 만들수 있는 칵테일 알려줘.
            </p>
          </div>
        </div>

        <div className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin">
          <div className="bg-stone-600 aspect-square flex justify-center items-center">
            img
          </div>
          <div className="ml-2">
            <p className="font-medium text-sm mb-1">Lorem ipsum dolor</p>
            <p className="text-[12px]">
              sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </ScrollableBox>
      <BeverageModal modalId={modalId} />
    </div>
  );
};
export default SearchHints;
