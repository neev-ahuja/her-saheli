import { Baby, Heart, Flower2, Sunrise, Moon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Link } from "react-router-dom";

const modes = [
  {
    icon: Heart,
    title: "Menstrual Mode",
    description: "Period & PMS tracking, pain/mood log, comfort kit suggestions.",
    color: "bg-pink-100 dark:bg-pink-900/40", 
    link: "/menstrual",
  },
  {
    icon: Baby,
    title: "Pregnancy Mode",
    description: "Week-by-week guide, AI FAQs, doctor reminders, prenatal care.",
    color: "bg-teal-100 dark:bg-teal-900/40",
    link: "/pregnancy",
  },
  {
    icon: Flower2,
    title: "Trying to Conceive",
    description: "Ovulation tracking, fertility insights, yoga & diet plans.",
    color: "bg-purple-100 dark:bg-purple-900/40",
    link: "/conceive",
  },
  {
    icon: Sunrise,
    title: "Postpartum Mode",
    description: "Body recovery tracker, mood check-ins, baby feeding & sleep logs.",
    color: "bg-yellow-100 dark:bg-yellow-900/40",
    link: "/postpartum",
  },
  {
    icon: Moon,
    title: "Menopause Mode",
    description: "Hormonal tracking, hot-flash diary, sleep & mental wellness tips.",
    color: "bg-blue-100 dark:bg-blue-900/40",
    link: "/menopause",
  },
];

export const Solution = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            5 Adaptive Health Modes 🚀
          </h2>
          
          <p className="text-lg text-muted-foreground">
            **Her-Saheli** evolves with you through every phase of your life, offering personalized care when you need it most.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modes.map((mode, index) => (
            <div key={index} className="border border-border rounded-xl p-8 bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                <div className={`w-14 h-14 rounded-full ${mode.color} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}>
                  <mode.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{mode.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed min-h-[60px]">{mode.description}</p>
                
                <Link to={mode.link} className="inline-block">
                    <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-300">
                        Explore Mode
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};