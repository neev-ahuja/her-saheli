import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sunrise, Heart, Baby, Moon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PostpartumMode = () => {
  const features = [
    {
      icon: Heart,
      title: "Body Recovery Tracker",
      description: "Monitor your physical recovery with personalized milestones and checkpoints.",
    },
    {
      icon: Sunrise,
      title: "Mood Check-ins",
      description: "Track your emotional well-being and identify patterns to support mental health.",
    },
    {
      icon: Baby,
      title: "Baby Feeding Logs",
      description: "Keep detailed records of feeding schedules, amounts, and preferences.",
    },
    {
      icon: Moon,
      title: "Sleep Tracking",
      description: "Monitor both your sleep and your baby's sleep patterns for better rest.",
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
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Sunrise className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Postpartum Mode</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Support for your recovery journey with tracking for body, mood, baby care, and sleep.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 text-center bg-muted/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Navigate Your Postpartum Period
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get comprehensive support as you recover and care for your newborn.
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

export default PostpartumMode;
