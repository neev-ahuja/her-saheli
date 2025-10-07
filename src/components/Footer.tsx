import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 bg-muted/30 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-3">
                Her-Saheli
              </h3>
              <p className="text-muted-foreground mb-4">
                An AI-powered menstrual health companion that evolves with every phase of a woman's life.
              </p>
              <p className="text-sm text-muted-foreground">
                By Byte Bandits
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Adaptive Health Modes</li>
                <li>AI Chatbot</li>
                <li>Cycle Tracking</li>
                <li>Health Insights</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Our Mission</li>
                <li>Impact</li>
                <li>Privacy Policy</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for women's health
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
