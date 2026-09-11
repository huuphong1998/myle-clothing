import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import DiscountSection from "@/components/home/DiscountSection";
import FashionSection from "@/components/home/FashionSection";
import CollectSection from "@/components/home/CollectSection";
import CtaSection from "@/components/home/CtaSection";
import SponsorSection from "@/components/home/SponsorSection";
import DealSection from "@/components/home/DealSection";
import BlogSection from "@/components/home/BlogSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <DiscountSection />
      <FashionSection />
      <CollectSection />
      <CtaSection />
      <SponsorSection />
      <DealSection />
      <BlogSection />
    </>
  );
}
