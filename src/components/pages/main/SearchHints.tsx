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
          <p className="ml-2">Lorem ipsum dolor sit amet xime, ex? </p>
        </div>

        <div className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin">
          <div className="bg-stone-600 aspect-square flex justify-center items-center">
            img
          </div>
          <p className="ml-2">adipisicingmagnam veritatis excepturi qui? </p>
        </div>

        <div className="bg-stone-700 w-full h-full rounded-md text-sm flex p-2 font-thin">
          <div className="bg-stone-600 aspect-square flex justify-center items-center">
            img
          </div>
          <p className="ml-2">r sit amet t. Earum ilmque incidunt eritatis </p>
        </div>
      </ScrollableBox>
      <BeverageModal modalId={modalId} />
    </div>
  );
};
export default SearchHints;
