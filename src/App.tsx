import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import LoginConsumer from "./pages/LoginConsumer";
import LoginBuilder from "./pages/LoginBuilder";
import BuilderDashboard from "./pages/BuilderDashboard";
import Landing from "./pages/Landing";
import AddEditProperty from "./pages/AddEditProperty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-consumer" element={<LoginConsumer />} />
          <Route path="/login-builder" element={<LoginBuilder />} />
          <Route path="/builder-dashboard" element={<BuilderDashboard />} />
          <Route path="/builder-dashboard/add" element={<AddEditProperty />} />
          <Route path="/builder-dashboard/edit/:id" element={<AddEditProperty />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
