
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, BarChart3, Package, Users, Calendar, Plus } from "lucide-react";
import AdminOverview from "./admin/AdminOverview";
import ProductsManager from "./admin/ProductsManager";
import UsersManager from "./admin/UsersManager";
import BookingsManager from "./admin/BookingsManager";
import AddProductForm from "./admin/AddProductForm";
import { supabase } from "@/lib/supabaseClient";

interface AdminDashboardProps {
  onBack: () => void;
}





const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [adminName, setAdminName] = useState("");

   useEffect(() => {
      const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAdminName(user?.user_metadata?.name || "Admin");
    };
    getUser();
    }, []);


  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "bookings", label: "View Bookings", icon: Calendar },
    { id: "add-product", label: "Add Parts", icon: Plus },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AdminOverview />;
      case "products":
        return <ProductsManager />;
      case "users":
        return <UsersManager />;
      case "bookings":
        return <BookingsManager />;
      case "add-product":
        return <AddProductForm />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Daniels AutoCare</h1>
                
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome, {adminName}</h1>

              </div>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
