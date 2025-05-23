"use client"

import Link from "next/link"
import { ArrowRight, ClipboardList, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"

export default function ProductManagerPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Product Manager" description="Manage products, SKUs, and manufacturing steps" />

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-black">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-black p-2">
                <Package className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Product Management</CardTitle>
            </div>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Create, edit, and manage products in your catalog. Define product specifications and details.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active products:</span>
                <Badge variant="outline" className="bg-gray-100 text-black">
                  18 products
                </Badge>
              </div>
              <Progress value={75} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/product-manager/products" className="flex items-center justify-center gap-2">
                Manage Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-black p-2">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Manufacturing Steps</CardTitle>
            </div>
            <CardDescription>Define and manage manufacturing processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Define manufacturing steps, resource requirements, and quality control processes.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Production efficiency:</span>
                <Badge variant="outline" className="bg-gray-100 text-black">
                  82% efficiency
                </Badge>
              </div>
              <Progress value={82} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/product-manager/manufacturing" className="flex items-center justify-center gap-2">
                Manage Manufacturing
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
            <CardTitle>Upcoming Product Releases</CardTitle>
            <CardDescription>Products scheduled for release</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Ergonomic Office Chair</p>
                  <p className="text-sm text-muted-foreground">PRD-2023-001</p>
                </div>
                <Badge className="bg-gray-900 text-white">Due in 2 weeks</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Adjustable Standing Desk</p>
                  <p className="text-sm text-muted-foreground">PRD-2023-002</p>
                </div>
                <Badge className="bg-gray-700 text-white">Due in 1 month</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Modular Storage System</p>
                  <p className="text-sm text-muted-foreground">PRD-2023-003</p>
                </div>
                <Badge className="bg-gray-500 text-white">Due in 2 months</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Resources allocated to product development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Design Team</p>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Engineering Team</p>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Material Resources</p>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Quality Control</p>
                  <span className="text-sm text-muted-foreground">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
