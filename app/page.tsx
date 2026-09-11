import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import DiscountSection from "@/components/home/DiscountSection";
import FashionSection from "@/components/home/FashionSection";
import CollectSection from "@/components/home/CollectSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <DiscountSection />
      <FashionSection />
      <CollectSection />
    </>
  );
}
