import Image from "next/image";
import SearchManager from "./SearchManager";

const IntroBanner = () => {
  return (
    <div className="w-full h-72 relative flex justify-center items-center">
      <Image
        src="/images/common/main_banner.png"
        alt="Thumbnail"
        width={200}
        height={400}
        className="w-full h-full absolute"
      />
      <div className="w-full h-full absolute inset-0 bg-black opacity-60" />

      <div className="w-full px-6 flex relative justify-center items-center flex-col">
        <div className="text-center mb-4">
          <p>오늘의 한잔</p>
          <p className="font-bold mt-2 text-xl/relaxed">
            채팅이나 필터로 레시피를 <br />
            검색해주세요!
          </p>
        </div>
        <SearchManager isMainPage={true} />
      </div>
    </div>
  );
};

export default IntroBanner;
