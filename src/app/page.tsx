import { cookies } from "next/headers";
// import { GetServerSideProps } from "next";
import { Tutorial } from "@/components/pages/main/Tutorial";
import RecommendCocktailBanner from "@/components/pages/main/RecommendCocktailBanner";
import IntroBanner from "@/components/pages/main/IntroBanner";
import BeverageModal from "@/components/pages/main/BeverageModal";
import BottomNavigator from "@/components/elements/BottomNavigator";
import SearchHints from "@/components/pages/main/SearchHints";

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
      <main className="mx-auto max-w-5xl relative flex flex-col h-svh px-6 ">
        <div className="-mx-6">
          <IntroBanner />
        </div>
        <h1 className="font-bold mt-8 text-lg">이렇게 검색할수 있어요!</h1>
        <div className="-mx-6 mt-4 ">
          <SearchHints />
        </div>
        <div className="mt-8 ">
          <RecommendCocktailBanner />
        </div>
      </main>
      <BottomNavigator />
      {isFirstVisit && <Tutorial />}
      {<BeverageModal modalId={modalId} />}
    </>
  );
}
