import { cookies } from "next/headers";
// import { GetServerSideProps } from "next";
import { Tutorial } from "@/components/pages/main/Tutorial";
import RecommendCocktail from "@/components/pages/main/RecommendCocktail";
import IntroBanner from "@/components/pages/main/IntroBanner";
import BeverageModal from "@/components/pages/main/BeverageModal";
import ScrollableBox from "@/components/elements/ScrollableBox";

export default function Home() {
  // if (typeof window !== "undefined") {
  //   const isDarkMode =
  //     window.matchMedia &&
  //     window.matchMedia("(prefer-color-scheme: dark)").matches;
  //   console.log(isDarkMode);
  // }
  const modalId = "beverage";

  const cookieStore = cookies();
  const isFirstVisit = !cookieStore.get("hasVisited");
  return (
    <>
      <main className="mx-auto max-w-5xl relative flex flex-col h-svh px-4">
        <div className="-mx-4">
          <IntroBanner />
        </div>
        {/* <SearchManager isMainPage={true} /> */}
        <h1 className="font-bold mt-8 pl-2.5 text-lg">
          이렇게 검색할수 있어요!
        </h1>
        <ScrollableBox className="space-x-3 mt-4 mb-8">
          <div className="py-2.5 px-4 bg-neutral-600 rounded-md">
            도수가 낮은 칵테일 추천해줘
          </div>
          <div className="py-2.5 px-4 bg-neutral-600 rounded-md">
            짐빔으로 만들수 있는 칵테일은?
          </div>
          <div className="py-2.5 px-4 bg-neutral-600 rounded-md">
            혼자 즐기는 칵테일 추천해줘
          </div>
        </ScrollableBox>
        <RecommendCocktail />
      </main>
      {isFirstVisit && <Tutorial />}
      {<BeverageModal modalId={modalId} />}
    </>
  );
}
