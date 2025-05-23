"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, Box, Database, Package, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/dashboard/page-header"

export default function InventoryManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Inventory Management"
        description="Manage inventory, SKUs, and track wastage across your manufacturing operations"
      />

      {/* KPI Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Total SKUs</span>
                <span className="text-2xl font-bold text-black">248</span>
              </div>
              <div className="rounded-full bg-gray-100 p-2">
                <Box className="h-5 w-5 text-gray-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly growth</span>
                <span className="font-medium text-black">+12.5%</span>
              </div>
              <Progress value={65} className="mt-2 h-2 bg-gray-200" indicatorClassName="bg-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Total Value</span>
                <span className="text-2xl font-bold text-black">$125,750</span>
              </div>
              <div className="rounded-full bg-gray-100 p-2">
                <Database className="h-5 w-5 text-gray-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly change</span>
                <span className="font-medium text-black">+8.2%</span>
              </div>
              <Progress value={82} className="mt-2 h-2 bg-gray-200" indicatorClassName="bg-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Low Stock Items</span>
                <span className="text-2xl font-bold text-black">45</span>
              </div>
              <div className="rounded-full bg-gray-100 p-2">
                <Package className="h-5 w-5 text-gray-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Weekly change</span>
                <span className="font-medium text-black">-3.1%</span>
              </div>
              <Progress value={35} className="mt-2 h-2 bg-gray-200" indicatorClassName="bg-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Wastage Rate</span>
                <span className="text-2xl font-bold text-black">2.4%</span>
              </div>
              <div className="rounded-full bg-gray-100 p-2">
                <Trash className="h-5 w-5 text-gray-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly target</span>
                <span className="font-medium text-black">3.0%</span>
              </div>
              <Progress value={24} className="mt-2 h-2 bg-gray-200" indicatorClassName="bg-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-black overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-black p-1.5">
                <Box className="h-5 w-5 text-white" />
              </div>
              SKU Management
            </CardTitle>
            <CardDescription>Manage SKUs and inventory levels</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              Add, edit, or remove SKUs from the system. Manage inventory levels and set primary/secondary
              relationships.
            </p>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 px-6 py-4">
            <Button asChild variant="default" className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/inventory/skus" className="flex items-center justify-center gap-2">
                Manage SKUs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-black p-1.5">
                <Trash className="h-5 w-5 text-white" />
              </div>
              Wastage Tracking
            </CardTitle>
            <CardDescription>Track and report material wastage</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              Record material wastage, specify reasons, and track wastage metrics across different SKUs.
            </p>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 px-6 py-4">
            <Button asChild variant="default" className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/inventory/wastage" className="flex items-center justify-center gap-2">
                Track Wastage
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-black p-1.5">
                <Package className="h-5 w-5 text-white" />
              </div>
              Procurement
            </CardTitle>
            <CardDescription>Manage procurement requests</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              Create and manage procurement requests, track order status, and update inventory upon receipt.
            </p>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 px-6 py-4">
            <Button asChild variant="default" className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/inventory/procurement" className="flex items-center justify-center gap-2">
                Manage Procurement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-black p-1.5">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Inventory Analytics
            </CardTitle>
            <CardDescription>View inventory analytics and reports</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              View inventory analytics, track usage patterns, and generate reports on inventory performance.
            </p>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 px-6 py-4">
            <Button asChild variant="default" className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/inventory/analytics" className="flex items-center justify-center gap-2">
                View Analytics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
            <CardDescription>Current inventory status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-muted-foreground">Total SKUs</p>
                  <p className="text-2xl font-bold">248</p>
                </div>
                <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">$125,750</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 rounded-lg bg-gray-100 p-4">
                  <p className="text-sm font-medium text-gray-700">Healthy Stock</p>
                  <p className="text-2xl font-bold text-gray-700">182</p>
                </div>
                <div className="space-y-2 rounded-lg bg-gray-200 p-4">
                  <p className="text-sm font-medium text-gray-700">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-700">45</p>
                </div>
                <div className="space-y-2 rounded-lg bg-gray-300 p-4">
                  <p className="text-sm font-medium text-gray-800">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-800">21</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest inventory transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Stock Received",
                  sku: "WD-FRAME-01",
                  quantity: 25,
                  date: "Today, 10:30 AM",
                },
                {
                  action: "Wastage Recorded",
                  sku: "MT-LEG-02",
                  quantity: 3,
                  date: "Today, 9:15 AM",
                },
                {
                  action: "Procurement Created",
                  sku: "UPH-SEAT-02",
                  quantity: 30,
                  date: "Yesterday, 4:45 PM",
                },
                {
                  action: "Stock Adjusted",
                  sku: "HW-SCREWS-01",
                  quantity: -5,
                  date: "Yesterday, 2:30 PM",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.sku} • {item.quantity > 0 ? "+" : ""}
                      {item.quantity} units
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
