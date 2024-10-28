// import SearchBar from "@/components/elements/SearchBar";
import SearchManager from "@/components/pages/main/SearchManager";
import ChattingRoom from "@/components/pages/main/ChattingRoom";
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
    <main className="mx-auto max-w-5xl px-4 py-8 relative h-svh flex">
      <SearchManager />
    </main>
  );
}
