import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { Impact } from "@/components/Impact";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      {/* <Problem /> */}
      <Solution />
      <Features />
      {/* <Impact />   */}
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
