import { HeroSearch } from '@/components/home/HeroSearch';
import { TradeCategoriesGrid } from '@/components/home/TradeCategoriesGrid';
import { HowItWorksStrip } from '@/components/home/HowItWorksStrip';
import { TrustBar } from '@/components/home/TrustBar';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { SupplierCTA } from '@/components/home/SupplierCTA';

export default function HomePage() {
  return (
    <>
      <HeroSearch />
      <TrustBar />
      <TradeCategoriesGrid />
      <HowItWorksStrip />
      <TestimonialsSection />
      <SupplierCTA />
    </>
  );
}
