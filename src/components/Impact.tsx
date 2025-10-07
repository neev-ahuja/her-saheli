import { TrendingUp, Users, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import womenCommunity from "@/assets/women-community.jpg";

const impacts = [
  {
    icon: TrendingUp,
    title: "Economic Impact",
    points: [
      "No heavy backend costs with free hosting",
      "Scalable model for future growth",
      "Open-source foundation",
    ],
  },
  {
    icon: Users,
    title: "Social Impact",
    points: [
      "Destigmatizes menstruation through education",
      "Multi-language support for rural India",
      "Empowers women to understand their bodies",
    ],
  },
  {
    icon: Heart,
    title: "Healthcare Impact",
    points: [
      "Early detection of irregularities (PCOS/PCOD)",
      "AI-powered health insights",
      "Preventive health data for NGOs",
    ],
  },
];

export const Impact = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Feasibility & Impact
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Built for accessibility and designed for maximum social impact across economic, social, and healthcare dimensions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div className="space-y-6">
            {impacts.map((impact, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <impact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{impact.title}</h3>
                    <ul className="space-y-2">
                      {impact.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={womenCommunity}
                alt="Women supporting each other"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
