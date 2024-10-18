import SerachBar from "@/components/elements/SearchBar";
import SearchHints from "@/components/pages/main/SearchHints";

export default function Home() {
  if (typeof window !== "undefined") {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefer-color-scheme: dark)").matches;
    console.log(isDarkMode);
  }

  return (
    <main className="mx-auto max-w-5xl min-h-screen bg-stone-800 text-stone-100 px-4 py-8">
      <SerachBar className="mt-20" />
      <SearchHints />

      {/* <div className="flex space-x-4 h-80">
      </div> */}
    </main>
  );
}
