import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="max-w-xl w-full text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-white font-bold text-4xl">M</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to BuyEasy</h1>
      <p className="text-lg text-gray-600 mb-8">India's leading platform for property buyers and builders. Choose your role to get started.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="w-full md:w-auto">
          <Link to="/login-consumer">Login as Consumer</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full md:w-auto">
          <Link to="/login-builder">Login as Builder</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default Landing; 