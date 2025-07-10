import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Star,
  Filter,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  inStock: boolean;
  image: string;
}

interface ProductCatalogProps {
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onViewCart: () => void;
  cartItemCount: number;
}

const ProductCatalog = ({
  onBack,
  onAddToCart,
  onViewCart,
  cartItemCount,
}: ProductCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        const cleanedProducts = (data ?? []).map((item: any) => ({
          id: item.id,
          name: item.name ?? "Unnamed Product",
          price: item.price ?? 0,
          originalPrice: item.originalPrice ?? null,
          rating: item.rating ?? 4.2,
          reviews: item.reviews ?? 0,
          category: (item.category ?? "other").toLowerCase().trim(),
          brand: item.brand ?? "Generic",
          inStock: Boolean(item.stock),
          image:
            item.image && item.image !== "null"
              ? item.image
              : "https://via.placeholder.com/400x300?text=No+Image",
        }));

        setProducts(cleanedProducts);
        console.log("✅ Products fetched:", cleanedProducts);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    onAddToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "oils", label: "Oils & Fluids" },
    { value: "engine", label: "Engine Parts" },
    { value: "tires", label: "Tires" },
    { value: "brakes", label: "Brake System" },
    { value: "electrical", label: "Electrical" },
    { value: "filters", label: "Filters" },
    { value: "maintenance", label: "Maintenance" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Auto Parts & Accessories</h1>
          </div>
          <Button variant="outline" onClick={onViewCart} className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            View Cart
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-600 flex items-center">
              {sortedProducts.length} products found
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {product.name}
                </CardTitle>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {product.rating}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {product.brand}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-blue-600">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
