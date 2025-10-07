import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-primary/10 border-2 border-primary/20 p-12 md:p-16 text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Ready to Transform Your Health Journey?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Join <span className="text-primary">Her-Saheli</span> Today
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience personalized menstrual health care that evolves with you through every phase of life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="default" className="text-base">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-base">
                  Learn More
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">Free to Start</div>
                  <div className="text-sm text-muted-foreground">No credit card required</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary mb-1">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">Personalized insights</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">Private</div>
                  <div className="text-sm text-muted-foreground">Your data stays yours</div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
