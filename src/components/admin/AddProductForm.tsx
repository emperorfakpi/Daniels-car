
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    sku: "",
    supplier: "",
  });
  
  
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    alert("User not authenticated");
    return;
  }

  const { name, category, price, stock, description, sku, supplier } = formData;
  let imageUrl = "https://via.placeholder.com/300"; // fallback

  if (imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_upload"); // your Cloudinary preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/doqgdycnb/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        imageUrl = data.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      alert("Image upload failed: " + err.message);
      return;
    }
  }

  const { error } = await supabase.from("products").insert([
    {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      sku,
      supplier,
      image: imageUrl,
      brand: "Admin Added",
      user_id: user.id,
    },
  ]);

  if (error) {
    alert("Failed to add product: " + error.message);
    return;
  }

  alert("Product added successfully!");
  setFormData({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    sku: "",
    supplier: "",
  });
  setImageFile(null);
};


  




  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Add New Product</h2>
        <p className="text-gray-600">Add new parts and products to your inventory.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Product Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oils">Oils & Fluids</SelectItem>
                    <SelectItem value="brakes">Brake Parts</SelectItem>
                    <SelectItem value="filters">Filters</SelectItem>
                    <SelectItem value="engine">Engine Parts</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="tires">Tires</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="Product SKU"
                  value={formData.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  placeholder="Supplier name"
                  value={formData.supplier}
                  onChange={(e) => handleChange("supplier", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Product description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Product Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Product image will appear here</p>
                <div className="space-y-2">
                    <Label htmlFor="image">Upload Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                </div>

              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">{formData.name || "Product Name"}</h3>
                <p className="text-sm text-gray-600">{formData.category || "Category"}</p>
                <p className="text-lg font-bold">${formData.price || "0.00"}</p>
                <p className="text-sm">Stock: {formData.stock || "0"} units</p>
                {formData.description && (
                  <p className="text-sm text-gray-600 mt-2">{formData.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProductForm;
