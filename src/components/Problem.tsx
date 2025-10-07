import { AlertCircle, Calendar, ShoppingBag, Search, Users, ArrowRight } from "lucide-react";

const Connector = () => (
  <div className="absolute left-6 top-1/2 -translate-y-1/2 h-full w-0.5 bg-border hidden md:block">
  </div>
);

const ProblemStep = ({ icon: Icon, title, description, isLast }) => (
  <div className="relative pl-14 md:pl-20 py-4">
    <div className="bg-background border border-border p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <h3 className="text-xl font-bold mb-1 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>

    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-destructive/10 border-4 border-background flex items-center justify-center shadow-lg">
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-destructive" />
    </div>

    {!isLast && (
      <div className="absolute left-[23px] md:left-[31px] top-12 md:top-[60px] h-full w-0.5 bg-border z-[-1]"/>
    )}
  </div>
);

const problems = [
  {
    icon: Calendar,
    title: "Fragmented Tracking",
    description: "One app for period and ovulation tracking—isolated from everything else.",
  },
  {
    icon: ShoppingBag,
    title: "Separate Supplies",
    description: "A different app or website needed for ordering pads, tampons, and meds.",
  },
  {
    icon: Search,
    title: "Unreliable Information",
    description: "Frustrating and often unreliable web searches for critical health questions.",
  },
  {
    icon: Users,
    title: "Disconnected Support",
    description: "A difficult gap in finding and connecting with local, free, verified resources.",
  },
];

export const Problem = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">The Problem</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Women's health is a{" "}
            <span className="text-destructive">disconnected journey</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            A woman today needs multiple apps and services, creating confusion and stress when she needs support the most. The experience is fragmented into four separate steps:
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-4">
          {problems.map((problem, index) => (
            <ProblemStep
              key={index}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
              isLast={index === problems.length - 1}
            />
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 text-center max-w-4xl mx-auto">
          <p className="text-2xl font-semibold text-muted-foreground italic">
            This fragmented approach is <span className="text-destructive font-extrabold">confusing</span>,{" "}
            <span className="text-destructive font-extrabold">reactive</span>, and adds{" "}
            <span className="text-destructive font-extrabold">stress</span> when support should be seamless.
          </p>
        </div>
      </div>
    </section>
  );
};