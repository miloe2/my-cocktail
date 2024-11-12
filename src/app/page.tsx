import { cookies } from "next/headers";
import SearchManager from "@/components/pages/main/SearchManager";
// import { GetServerSideProps } from "next";
import { Tutorial } from "@/components/pages/main/Tutorial";

export default function Home() {
  // if (typeof window !== "undefined") {
  //   const isDarkMode =
  //     window.matchMedia &&
  //     window.matchMedia("(prefer-color-scheme: dark)").matches;
  //   console.log(isDarkMode);
  // }
  const cookieStore = cookies();
  const isFirstVisit = !cookieStore.get("hasVisited");
  // console.log(isFirstVisit);
  return (
    <>
      <main className="mx-auto max-w-5xl px-4 py-5 relative flex items-center justify-center h-svh pb-32">
        <SearchManager isMainPage={true} />
      </main>
      {isFirstVisit && <Tutorial />}
    </>
  );
}
