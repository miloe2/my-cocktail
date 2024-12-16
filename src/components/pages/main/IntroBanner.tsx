import Image from "next/image";
import SearchManager from "./SearchManager";

const IntroBanner = () => {
  return (
    <div className="w-full relative ">
      <Image
        src="/images/common/main_banner.png"
        alt="Thumbnail"
        width={200}
        height={400}
        className="w-full h-full"
      />
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-60" />
      <div />
      <div className="w-full px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col">
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
