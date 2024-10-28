import SearchManager from "@/components/pages/main/SearchManager";

export default function Home() {
  if (typeof window !== "undefined") {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefer-color-scheme: dark)").matches;
    console.log(isDarkMode);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-5 relative h-svh flex">
      <SearchManager />
    </main>
  );
}
