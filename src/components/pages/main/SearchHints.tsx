import ScrollableBox from "@/components/elements/ScrollableBox";
interface SearchHintsProps {
  className?: string;
}

const SearchHints = ({ className }: SearchHintsProps) => {
  return (
    <div className={className}>
      <ScrollableBox>
        <div className="bg-stone-600 w-full h-full rounded-md text-sm flex p-2 font-thin">
          <div className="bg-stone-700">img</div>
          <p className="ml-2">
            내가 가지고 있는거 <br /> OOO, OOOOO, OOOOOOO{" "}
          </p>
        </div>

        <div className="bg-stone-600 w-full h-full rounded-md text-sm flex p-2 font-thin">
          <div className="bg-stone-700">img</div>
          <p className="ml-2">
            말리부, 짐빔만 가지고 <br /> 만들 수 있는 거 알려줘{" "}
          </p>
        </div>

        <div className="bg-stone-600 w-full h-full rounded-md text-sm flex p-2 font-thin">
          <div className="bg-stone-700">img</div>
          <p className="ml-2">
            레시피 <br /> 알려줘{" "}
          </p>
        </div>
      </ScrollableBox>
    </div>
  );
};
export default SearchHints;
