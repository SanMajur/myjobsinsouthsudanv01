import SearchHero from "@/components/SearchHero";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/*Render our self-contained interactive search component */}
      <SearchHero />
    </div>
  );
}
