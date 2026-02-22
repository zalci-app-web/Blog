import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { CategoryPortals } from "@/components/category-portals";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoryPortals />
      </main>
      <SiteFooter />
    </div>
  );
}
