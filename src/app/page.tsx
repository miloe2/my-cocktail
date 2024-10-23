import SearchBar from "@/components/elements/SearchBar";
import SearchHints from "@/components/pages/main/SearchHints";
// import OptionsGroup from "@/components/pages/main/OptionsGroup";
import BottomModal from "@/components/elements/BottomModal";

export default function Home() {
  if (typeof window !== "undefined") {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefer-color-scheme: dark)").matches;
    console.log(isDarkMode);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 relative">
      <SearchBar className="mt-20" />
      <div className="-mr-4 mt-4">
        <SearchHints />
      </div>
    </main>
  );
}
