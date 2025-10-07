import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flower2, Activity, Heart, Utensils, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ConceiveMode = () => {
  const features = [
    {
      icon: Activity,
      title: "Ovulation Tracking",
      description: "Precise ovulation predictions to help you identify your most fertile days.",
    },
    {
      icon: Heart,
      title: "Fertility Insights",
      description: "Understand your fertility patterns with AI-powered analysis and recommendations.",
    },
    {
      icon: Flower2,
      title: "Yoga & Exercise",
      description: "Fertility-boosting yoga routines and exercise plans tailored to your needs.",
    },
    {
      icon: Utensils,
      title: "Diet Plans",
      description: "Nutrition guidance to optimize your health and improve fertility outcomes.",
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
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
              <Flower2 className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Trying to Conceive Mode</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Optimize your fertility journey with ovulation tracking, insights, and personalized wellness plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 text-center bg-muted/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Begin Your Fertility Journey
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the support and insights you need to optimize your chances of conception.
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

export default ConceiveMode;
