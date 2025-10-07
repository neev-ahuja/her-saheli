import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Moon, Activity, Heart, Brain, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MenopauseMode = () => {
  const features = [
    {
      icon: Activity,
      title: "Hormonal Tracking",
      description: "Monitor hormonal changes and symptoms to better understand your body.",
    },
    {
      icon: Heart,
      title: "Hot Flash Diary",
      description: "Track frequency, intensity, and triggers to manage hot flashes effectively.",
    },
    {
      icon: Moon,
      title: "Sleep Support",
      description: "Get personalized tips and tracking for better sleep quality during menopause.",
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Support for emotional well-being with mood tracking and coping strategies.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 mx-auto max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto">
              <Moon className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Menopause Mode</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigate menopause with confidence through symptom tracking and personalized wellness support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 text-center bg-muted/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Take Control of Menopause
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the tools and support you need to manage menopause with confidence.
            </p>
            <Button size="lg" variant="default">
              Get Started
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MenopauseMode;
