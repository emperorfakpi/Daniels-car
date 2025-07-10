
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Car, Phone, Mail, MapPin, Clock, Star, Wrench, Package, ShoppingCart, Users, Menu } from "lucide-react";
import ServiceBooking from "@/components/ServiceBooking";
import ProductCatalog from "@/components/ProductCatalog";
import Cart from "@/components/Cart";
import AuthPage from "@/components/AuthPage";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";


const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      name: "Oil Change",
      price: "From $49.99",
      duration: "30 mins",
      description: "Complete oil and filter change with multi-point inspection",
      image: "/placeholder.svg"
    },
    {
      name: "Brake Service",
      price: "From $199.99",
      duration: "2 hours",
      description: "Brake pad replacement and brake system inspection",
      image: "/placeholder.svg"
    },
    {
      name: "Engine Diagnostic",
      price: "From $129.99",
      duration: "1 hour",
      description: "Comprehensive engine diagnostic and troubleshooting",
      image: "/placeholder.svg"
    },
    {
      name: "Tire Service",
      price: "From $89.99",
      duration: "45 mins",
      description: "Tire rotation, balancing, and pressure check",
      image: "/placeholder.svg"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Service",
      description: "Fast and efficient service to get you back on the road"
    },
    {
      icon: Star,
      title: "Expert Technicians",
      description: "Certified professionals with years of experience"
    },
    {
      icon: Package,
      title: "Quality Parts",
      description: "Only genuine and high-quality replacement parts"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock customer support for emergencies"
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      rating: 5,
      comment: "Excellent service! Quick and professional. Will definitely come back.",
      service: "Oil Change"
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Great experience. The staff was knowledgeable and friendly.",
      service: "Brake Service"
    },
    {
      name: "Mike Wilson",
      rating: 4,
      comment: "Good value for money. Service was completed on time.",
      service: "Engine Diagnostic"
    }
  ];

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 Add this
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);



  const handleMobileNavClick = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  if (currentView === "dashboard") {
    return (
      <UserDashboard
        onBookService={() => setCurrentView("booking")}
        onShopParts={() => setCurrentView("products")}
      />
    );
  }
  

  if (currentView === "booking") {
    return <ServiceBooking onBack={() => setCurrentView(isLoggedIn ? "dashboard" : "home")} />;
  }
  

  if (currentView === "products") {
    return (
      <ProductCatalog
      onBack={() => setCurrentView(isLoggedIn ? "dashboard" : "home")}
        onAddToCart={handleAddToCart}
        onViewCart={() => setIsCartOpen(true)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
    );
  }

  if (currentView === "auth") {
    return (
      <AuthPage
        onBack={() => setCurrentView(isLoggedIn ? "dashboard" : "home")}
        setCurrentView={setCurrentView}
        setIsLoggedIn={setIsLoggedIn} // 👈 ADD THIS
        setUserRole={setUserRole} 
      />
    );
  }
  

  if (currentView === "admin") {
    return <AdminDashboard onBack={() => setCurrentView("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Daniels AutoCare</h1>
                <p className="text-sm text-gray-600">Professional Auto Services</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#products" className="text-gray-700 hover:text-blue-600">Parts</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Desktop Accounts Button */}
              <Button
                variant="outline"
                onClick={() => setCurrentView("auth")}
                className="hidden md:flex"
              >
                <Users className="h-4 w-4 mr-2" />
                Accounts
              </Button>
              
              

              {/* Cart Button (always visible) */}
              <Button
                variant="ghost"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-3">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <Car className="h-5 w-5 text-white" />
                      </div>
                      <span>Daniels AutoCare</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => {
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Services
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => handleMobileNavClick("products")}
                    >
                      Parts
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => {
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      About
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Contact
                    </Button>
                    
                    <div className="border-t pt-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-lg"
                        onClick={() => handleMobileNavClick("auth")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Accounts
                      </Button>
                      
                      
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Car Animations */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Animated Background Cars */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-blue-200 opacity-30 animate-pulse">
            <Car className="h-8 w-8 transform rotate-12" />
          </div>
          <div className="absolute top-32 right-20 text-blue-300 opacity-20 animate-bounce">
            <Car className="h-6 w-6 transform -rotate-12" />
          </div>
          <div className="absolute bottom-40 left-1/4 text-blue-200 opacity-25">
            <Car className="h-10 w-10 transform rotate-6 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute top-1/2 right-10 text-blue-300 opacity-20">
            <Car className="h-7 w-7 transform -rotate-6 animate-bounce" style={{ animationDelay: '2s' }} />
          </div>
          <div className="absolute bottom-20 right-1/3 text-blue-200 opacity-30">
            <Car className="h-9 w-9 transform rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          {/* Moving cars across screen */}
          <div className="absolute top-1/3 -left-20 text-blue-300 opacity-25 animate-[slide-right_15s_linear_infinite]">
            <Car className="h-8 w-8" />
          </div>
          <div className="absolute bottom-1/3 -right-20 text-blue-200 opacity-20 animate-[slide-left_20s_linear_infinite]">
            <Car className="h-6 w-6 transform rotate-180" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your Trusted Auto Care Partner
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Expert automotive services and quality parts to keep your vehicle running smoothly. 
            Book your service today or browse our extensive parts catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setCurrentView("booking")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Wrench className="mr-2 h-5 w-5" />
              Book Service
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView("products")}
            >
              <Package className="mr-2 h-5 w-5" />
              Shop Parts
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional automotive services performed by certified technicians
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-600">{service.price}</span>
                    <Badge variant="secondary">{service.duration}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best automotive care experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for any questions or to schedule your service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-gray-600">123 Accra<br />City, Tudu</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h4>
              <p className="text-gray-600">info@danielsautocare.com<br />support@danielsautocare.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h4>
              <p className="text-gray-600">Mon-Fri: 8AM-6PM<br />Sat: 9AM-4PM<br />Sun: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Daniels AutoCare</h3>
                </div>
              </div>
              <p className="text-gray-400">Your trusted partner for all automotive needs.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Oil Change</li>
                <li>Brake Service</li>
                <li>Engine Diagnostic</li>
                <li>Tire Service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Reviews</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Daniels AutoCare. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, quantity) => {
          if (quantity === 0) {
            setCartItems(prev => prev.filter(item => item.id !== id));
          } else {
            setCartItems(prev =>
              prev.map(item =>
                item.id === id ? { ...item, quantity } : item
              )
            );
          }
        }}
      />
    </div>
  );
};

export default Index;
