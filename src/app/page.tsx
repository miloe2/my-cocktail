// import SearchBar from "@/components/elements/SearchBar";
import SearchHints from "@/components/pages/main/SearchHints";
import SearchManager from "@/components/pages/main/SearchManager";
// import OptionsGroup from "@/components/pages/main/OptionsGroup";
// import BottomModal from "@/components/elements/BottomModal";
// import BeverageModalManger from "@/components/pages/main/BeverageModalManger";

export default function Home() {
  if (typeof window !== "undefined") {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefer-color-scheme: dark)").matches;
    console.log(isDarkMode);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 relative h-svh flex items-center">
      <div className="w-full pb-32">
        <SearchManager />
        <div className="-mr-4 mt-4">
          <SearchHints />
        </div>
      </div>
    </main>
  );
}
