import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, ShoppingCart, ClipboardList, User, LogOut } from "lucide-react";

interface Props {
  onBookService: () => void;
  onShopParts: () => void;
}

const MyBookings = () => {
  const bookings = [
    { id: 1, service: "Oil Change", status: "Pending", date: "2025-07-04" },
    { id: 2, service: "Brake Service", status: "Approved", date: "2025-06-29" },
    { id: 3, service: "Engine Diagnostic", status: "Completed", date: "2025-06-20" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Bookings</h2>
      {bookings.map((b) => (
        <Card key={b.id}>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{b.service}</span>
              <span className="text-sm px-2 py-1 rounded bg-gray-200">{b.status}</span>
            </div>
            <p className="text-sm text-gray-500">Date: {b.date}</p>
            {b.status === "Pending" && <Button variant="destructive">Cancel</Button>}
            {b.status === "Completed" && <Button variant="outline">Give Feedback</Button>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const MyOrders = () => {
  const orders = [
    { id: 1, item: "Brake Pads", status: "Delivered" },
    { id: 2, item: "Engine Oil", status: "Processing" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Orders</h2>
      {orders.map((o) => (
        <Card key={o.id}>
          <CardContent className="flex justify-between">
            <span>{o.item}</span>
            <span className="text-sm px-2 py-1 rounded bg-gray-100">{o.status}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ProfileSettings = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Profile Settings</h2>
      <form className="space-y-4">
        <input className="border p-2 w-full" type="text" placeholder="Full Name" />
        <input className="border p-2 w-full" type="tel" placeholder="Phone Number" />
        <input className="border p-2 w-full" type="password" placeholder="New Password" />
        <input className="border p-2 w-full" type="email" value="you@example.com" readOnly />
        <input className="border p-2 w-full" type="file" />
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

const UserDashboard = ({ onBookService, onShopParts }: Props) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    window.location.reload(); // Replace with better logout logic if available
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white p-4 shadow-md md:h-screen sticky top-0">
        <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("dashboard")}>🏠 Overview</Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("bookings")}>📋 My Bookings</Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("orders")}>🧾 My Orders</Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("profile")}>👤 Profile</Button>
          <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>🚪 Logout</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="mr-2" />
                  Book a Car Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Schedule maintenance, repairs, and diagnostics.
                </p>
                <Button className="w-full" onClick={onBookService}>
                  Go to Booking
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2" />
                  Shop Auto Parts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Browse car parts and accessories.
                </p>
                <Button className="w-full" onClick={onShopParts}>
                  Go to Parts Shop
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "bookings" && <MyBookings />}
        {activeTab === "orders" && <MyOrders />}
        {activeTab === "profile" && <ProfileSettings />}
      </main>
    </div>
  );
};

export default UserDashboard;
