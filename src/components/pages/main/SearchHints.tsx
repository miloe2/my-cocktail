import ScrollableBox from "@/components/elements/ScrollableBox";
import useModalStore from "@/store/useModalStore";
import useSearchStore from "@/store/useSearchStore";
import BeverageModal from "./BeverageModal";
interface SearchHintsProps {
  className?: string;
}

const SearchHints = ({ className }: SearchHintsProps) => {
  const { openModal } = useModalStore();
  const { updateQuery } = useSearchStore();
  const modalId = "beverage";
  const handleText = (text: string) => {
    updateQuery(text);
  };
  return (
    <div className={className}>
      <ScrollableBox>
        <div
          className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin cursor-pointer"
          onClick={() => openModal(modalId)}
        >
          <div className="bg-stone-600 aspect-square flex justify-center items-center">
            <img
              src="/images/beverages/margarita.webp"
              alt=""
              className=" rounded-md"
            />
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm mb-1">재료로 찾기</p>
            <p className="text-[12px]">
              가지고 있는 재료를 <br /> 필터로 찾아보세요{" "}
            </p>
          </div>
        </div>

        <div
          className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin cursor-pointer"
          onClick={() => handleText("말리부랑 짐빔으로 만들수 있는 칵테일")}
        >
          <div className="bg-stone-600 aspect-square aspect-ratio flex justify-center items-center flex-nowrap">
            <img
              src="/images/beverages/mojito.webp"
              alt=""
              className=" rounded-md object-cover w-full h-full "
            />
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm mb-1">직접 검색하기</p>
            <p className="text-[12px]">
              말리부랑 짐빔으로 <br />
              만들 수 있는 칵테일
            </p>
          </div>
        </div>

        <div className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin cursor-pointer">
          <div className="bg-stone-600 aspect-square flex justify-center items-center">
            <img
              src="/images/beverages/default-cocktail.webp"
              alt=""
              className=" rounded-md object-cover w-full h-full "
            />
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm mb-1">Lorem ipsum </p>
            <p className="text-[12px]">
              sit amet consectetur <br /> sicing elit.
            </p>
          </div>
        </div>
      </ScrollableBox>
      {<BeverageModal modalId={modalId} />}
    </div>
  );
};
export default SearchHints;
