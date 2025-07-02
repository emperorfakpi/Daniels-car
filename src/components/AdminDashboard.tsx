import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Car,
  BarChart3,
  Package,
  Users,
  Calendar,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        return <AdminOverview adminName={adminName} />;

      case "products":
        return <ProductsManager />;
      case "users":
        return <UsersManager />;
      case "bookings":
        return <BookingsManager />;
      case "add-product":
        return <AddProductForm />;
      default:
        return <AdminOverview adminName={adminName} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white shadow-sm border-b z-30 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>

            <div className="flex items-center space-x-3">
              {/* Hamburger Button */}
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
              >
                ☰
              </Button>

              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">Daniels AutoCare</h1>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Welcome, {adminName}</h1>
              </div>
            </div>

            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay (when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex h-[calc(100vh-80px)] relative z-20">
        {/* Sidebar */}
        <div
          className={`
            bg-white shadow-sm border-r
            fixed top-0 left-0 h-full w-64 z-30
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:static md:translate-x-0 md:h-auto md:top-auto md:left-auto
          `}
        >
          <nav className="p-4 space-y-2 pt-20 md:pt-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsSidebarOpen(false); // Auto close on selection
                  }}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto z-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
