import { AboutSection } from "@/components/landing-page/AboutSection";
import { BookingSection } from "@/components/landing-page/BookingSection";
import { GallerySection } from "@/components/landing-page/GallerySection";
import { HairStylesSection } from "@/components/landing-page/HairStylesSection";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { ServicesSection } from "@/components/landing-page/ServicesSection";
import { TestimonialsSection } from "@/components/landing-page/TestimonialsSection";
import { ResponsiveGenericToolbar } from "@/components/shared/nav/ResponsiveGenericToolbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center">
      <ResponsiveGenericToolbar>
        <HeroSection />
        <ServicesSection />
        <HairStylesSection />
        <AboutSection />
        <TestimonialsSection />
        <GallerySection/>
        <BookingSection/>
      </ResponsiveGenericToolbar>
    </main>
  );
}
