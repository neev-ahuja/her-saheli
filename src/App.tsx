import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MenstrualMode from "./pages/MenstrualMode";
import PregnancyMode from "./pages/PregnancyMode";
import ConceiveMode from "./pages/ConceiveMode";
import PostpartumMode from "./pages/PostpartumMode";
import MenopauseMode from "./pages/MenopauseMode";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menstrual" element={<MenstrualMode />} />
          <Route path="/pregnancy" element={<PregnancyMode />} />
          <Route path="/conceive" element={<ConceiveMode />} />
          <Route path="/postpartum" element={<PostpartumMode />} />
          <Route path="/menopause" element={<MenopauseMode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
