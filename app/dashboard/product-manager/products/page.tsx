"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/dashboard/page-header"
import { SimpleProductForm } from "@/components/product-manager/simple-product-form"

// Sample product data
const initialProducts = [
  {
    id: 1,
    name: "Bookshelf - 5 Shelf",
    sku: "SHELF-001",
    category: "storage",
    description: "Five-shelf bookcase for office or home use with adjustable shelves.",
    price: "149.99",
    minimumStock: "5",
    inventory: 15,
    updatedAt: "2023-11-04T14:45:00Z",
    status: "active",
  },
  {
    id: 2,
    name: "Conference Table - 8 Person",
    sku: "TABLE-001",
    category: "furniture",
    description: "Large conference table suitable for meetings of up to 8 people.",
    price: "599.99",
    minimumStock: "2",
    inventory: 5,
    updatedAt: "2023-11-05T14:15:00Z",
    status: "active",
  },
  {
    id: 3,
    name: "Desk Lamp - LED",
    sku: "LAMP-001",
    category: "lighting",
    description: "Adjustable LED desk lamp with multiple brightness levels and color temperatures.",
    price: "39.99",
    minimumStock: "10",
    inventory: 50,
    updatedAt: "2023-11-10T09:20:00Z",
    status: "active",
  },
  {
    id: 4,
    name: "Ergonomic Footrest",
    sku: "FOOT-001",
    category: "office-supplies",
    description: "Adjustable footrest with massage surface for under-desk comfort.",
    price: "29.99",
    minimumStock: "8",
    inventory: 0,
    updatedAt: "2024-02-20T14:15:00Z",
    status: "discontinued",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter products based on search term, category, and status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory.toLowerCase()
    const matchesStatus = selectedStatus === "All Statuses" || product.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories
  const categories = [
    "All Categories",
    ...new Set(
      products.map((product) => {
        // Capitalize first letter of each word
        return product.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      }),
    ),
  ]

  // Get unique statuses
  const statuses = [
    "All Statuses",
    ...new Set(
      products.map((product) => {
        // Capitalize first letter
        return product.status.charAt(0).toUpperCase() + product.status.slice(1)
      }),
    ),
  ]

  // Calculate metrics
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const lowStockProducts = products.filter(
    (p) => Number.parseInt(p.minimumStock) > p.inventory && p.inventory > 0,
  ).length
  const totalSKUs = products.length // In this simplified version, each product has one SKU

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  // Handle adding a new product
  const handleAddProduct = (productData: any) => {
    const id = products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1
    const now = new Date().toISOString()

    setProducts([
      ...products,
      {
        id,
        name: productData.name,
        sku: productData.sku,
        category: productData.category,
        description: productData.description || "",
        price: productData.price,
        minimumStock: productData.minimumStock,
        inventory: 0,
        updatedAt: now,
        status: "active",
      },
    ])
    setIsAddDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <PageHeader title="Products" />
        <Button
          className="flex items-center gap-2 bg-black text-white hover:bg-black/90"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Product Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium">Total Products</div>
            <div className="text-3xl font-bold mt-2">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium">Active Products</div>
            <div className="text-3xl font-bold mt-2">{activeProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium">Low Stock Products</div>
            <div className="text-3xl font-bold mt-2">{lowStockProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium">Total SKUs</div>
            <div className="text-3xl font-bold mt-2">{totalSKUs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Products</h2>
            <p className="text-sm text-muted-foreground">Manage products and their inventory levels</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Category:</span>
                <select
                  className="border rounded p-2 text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <select
                  className="border rounded p-2 text-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Product Name</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">SKUs</th>
                  <th className="text-left p-3">Total Inventory</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Last Updated</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">1</td>
                    <td className="p-3">{product.inventory}</td>
                    <td className="p-3">
                      <Badge
                        variant={product.status === "active" ? "default" : "destructive"}
                        className="bg-black text-white rounded-full px-3 py-1 text-xs"
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-3">{formatDate(product.updatedAt)}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Add a new product to the system</DialogDescription>
          </DialogHeader>
          <SimpleProductForm onSubmit={handleAddProduct} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
