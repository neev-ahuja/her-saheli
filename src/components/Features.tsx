import { Bot, Activity, Bell, Heart, Sparkles, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Personalized AI Chatbot",
    description: "Get answers to all your doubts and concerns with online consultancy for serious issues.",
  },
  {
    icon: Activity,
    title: "Cycle Tracking",
    description: "AI-based cycle prediction with health insights for PCOS, anemia, and fertility.",
  },
  {
    icon: Bell,
    title: "Health Camp Notifications",
    description: "Stay informed about nearby government/NGO health camps and doctor consultations.",
  },
  {
    icon: Heart,
    title: "Support Kit",
    description: "Personalized comfort and hygiene recommendations with self-care advice.",
  },
  {
    icon: Sparkles,
    title: "Wellness Guidance",
    description: "Expert exercise and nutrition advice tailored to your health needs.",
  },
  {
    icon: MessageCircle,
    title: "Private & Multilingual",
    description: "Your data stays private with zero identity linkage, available in multiple languages.",
  },
];

const getGridPosition = (index) => {
  if (index === 0) return "lg:col-start-1 lg:row-start-1";
  if (index === 1) return "lg:col-start-2 lg:row-start-1";
  if (index === 2) return "lg:col-start-3 lg:row-start-1";
  if (index === 3) return "lg:col-start-1 lg:row-start-2";
  if (index === 4) return "lg:col-start-2 lg:row-start-2";
  if (index === 5) return "lg:col-start-3 lg:row-start-2";
  return "";
};

export const Features = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for comprehensive menstrual health care, powered by AI and designed with empathy.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-primary/5 border border-primary/20 animate-pulse-slow">
              <div className="flex items-center justify-center h-full text-primary/50 text-xl font-bold">
                AI Health
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12 lg:gap-y-16 py-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`
                  p-6 md:p-8 
                  bg-white dark:bg-gray-800 
                  rounded-3xl shadow-xl 
                  transition-all duration-500 
                  hover:shadow-2xl hover:scale-[1.03]
                  border border-pink-100 dark:border-pink-900/50
                  relative 
                  flex flex-col items-center text-center
                  lg:z-10
                  ${getGridPosition(index)}
                `}
              >
                <div className="
                    w-16 h-16 
                    rounded-full 
                    bg-primary/15 
                    flex items-center justify-center 
                    mb-5 
                    transition-all duration-500 
                    group-hover:bg-primary/30 
                    ring-4 ring-primary/10
                    shadow-md
                ">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};