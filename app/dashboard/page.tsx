"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PageTitle } from "@/components/page-title"
import {
  BarChart3,
  ClipboardList,
  Database,
  Users,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Layers,
  Truck,
  Activity,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const productionTrend = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 4500 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4800 },
  { name: "May", value: 5200 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 6000 },
]

const inventoryData = [
  { name: "Furniture", value: 45 },
  { name: "Storage", value: 30 },
  { name: "Accessories", value: 25 },
]

const workerEfficiencyData = [
  { name: "Mon", efficiency: 85 },
  { name: "Tue", efficiency: 88 },
  { name: "Wed", efficiency: 92 },
  { name: "Thu", efficiency: 90 },
  { name: "Fri", efficiency: 94 },
  { name: "Sat", efficiency: 87 },
  { name: "Sun", efficiency: 82 },
]

const taskCompletionData = [
  { name: "Week 1", completed: 42, total: 50 },
  { name: "Week 2", completed: 45, total: 52 },
  { name: "Week 3", completed: 48, total: 53 },
  { name: "Week 4", completed: 51, total: 55 },
]

const COLORS = ["#1a365d", "#ffc107", "#64748b", "#10b981"]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Dashboard" description="Welcome to your Workforce & Inventory Management System" />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/H_Logo%403x-kbxa5EEVooqXmEnSTBwybFTmBd9ITD.png"
          alt="WC WorCoor Logo"
          width={180}
          height={60}
          className="h-auto"
          priority
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm font-medium">
            Last Updated: Today, 09:45 AM
          </Badge>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">128</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+14% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">45</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+5% from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,284</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+2.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">87%</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row of KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Output</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7,200</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+5.8% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">94.5%</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+1.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="flex items-center pt-1">
              <TrendingDown className="mr-1 h-3 w-3 text-amber-600" />
              <span className="text-xs text-amber-600">Requires attention</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">32.4%</div>
            <div className="flex items-center pt-1">
              <TrendingDown className="mr-1 h-3 w-3 text-amber-600" />
              <span className="text-xs text-amber-600">-0.8% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="workforce">Workforce</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Production Trends</CardTitle>
                <CardDescription>Monthly production output</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={productionTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#1a365d" strokeWidth={2} activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Distribution</CardTitle>
                <CardDescription>By category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={inventoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {inventoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Office Chairs (10)</p>
                      <p className="text-xs text-muted-foreground">PO-2023-001</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Due in 2 days</Badge>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Bookshelves (8)</p>
                      <p className="text-xs text-muted-foreground">PO-2023-002</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Due in 5 days</Badge>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Filing Cabinets (3)</p>
                      <p className="text-xs text-muted-foreground">PO-2023-003</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Due in 10 days</Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/task-manager/orders">
                    View All Orders <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Worker Performance</CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                        EJ
                      </div>
                      <div>
                        <p className="text-sm font-medium">Emma Johnson</p>
                        <p className="text-xs text-muted-foreground">Assembly</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">98%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={98} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                        MC
                      </div>
                      <div>
                        <p className="text-sm font-medium">Michael Chen</p>
                        <p className="text-xs text-muted-foreground">Quality Control</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">96%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={96} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                        SW
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sarah Williams</p>
                        <p className="text-xs text-muted-foreground">Packaging</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">95%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/worker/performance">
                    View All Workers <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Critical Inventory</CardTitle>
                <CardDescription>Items that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Wooden Panels - Oak</p>
                      <p className="text-xs text-muted-foreground">SKU: WD-FRAME-01</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                  </div>
                  <Progress value={15} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Upholstery Fabric - Black</p>
                      <p className="text-xs text-muted-foreground">SKU: UPH-FAB-02</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                  </div>
                  <Progress value={20} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Metal Legs - Chrome</p>
                      <p className="text-xs text-muted-foreground">SKU: MT-LEG-01</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Reorder Soon</Badge>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/inventory/levels">
                    View Inventory <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Current quality performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Defect Rate</p>
                      <p className="text-sm font-medium">1.2%</p>
                    </div>
                    <Progress value={12} className="h-2" />
                    <p className="text-xs text-green-600 mt-1">-0.3% from last month</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">First Pass Yield</p>
                      <p className="text-sm font-medium">97.5%</p>
                    </div>
                    <Progress value={97.5} className="h-2" />
                    <p className="text-xs text-green-600 mt-1">+0.8% from last month</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Customer Returns</p>
                      <p className="text-sm font-medium">0.5%</p>
                    </div>
                    <Progress value={5} className="h-2" />
                    <p className="text-xs text-green-600 mt-1">-0.2% from last month</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/analytics">
                    View Analytics <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Schedule for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Quality Audit</p>
                      <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Inventory Stocktake</p>
                      <p className="text-xs text-muted-foreground">Wednesday, 9:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Production Planning Meeting</p>
                      <p className="text-xs text-muted-foreground">Thursday, 2:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Supplier Meeting</p>
                      <p className="text-xs text-muted-foreground">Friday, 11:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Calendar <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>Frequently used sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/dashboard/task-manager/orders">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <ClipboardList className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-sm font-medium text-center">Manage Orders</span>
                    </div>
                  </Link>
                  <Link href="/dashboard/inventory/levels">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <Layers className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-sm font-medium text-center">Inventory Levels</span>
                    </div>
                  </Link>
                  <Link href="/dashboard/worker/performance">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <Activity className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-sm font-medium text-center">Worker Performance</span>
                    </div>
                  </Link>
                  <Link href="/dashboard/inventory/procurement">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <Truck className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-sm font-medium text-center">Procurement</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Production Module</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Inventory Management</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Worker Management</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Analytics Engine</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Operational
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PRODUCTION TAB */}
        <TabsContent value="production" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Production Output</CardTitle>
                <CardDescription>Monthly production trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={productionTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#1a365d" name="Units Produced" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manufacturing Progress</CardTitle>
                <CardDescription>Current production status by product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Office Chair - Standard</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Progress</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Office Desk - Adjustable</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Progress</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Filing Cabinet</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Progress</span>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/task-manager/tracking">
                    View All Products <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Production Schedule</CardTitle>
              <CardDescription>Upcoming production runs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Product</th>
                      <th className="py-3 px-4 text-left font-medium">Order ID</th>
                      <th className="py-3 px-4 text-left font-medium">Quantity</th>
                      <th className="py-3 px-4 text-left font-medium">Start Date</th>
                      <th className="py-3 px-4 text-left font-medium">Due Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Office Chairs</td>
                      <td className="py-3 px-4">PO-2023-001</td>
                      <td className="py-3 px-4">10</td>
                      <td className="py-3 px-4">Nov 1, 2023</td>
                      <td className="py-3 px-4">Nov 10, 2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Bookshelves</td>
                      <td className="py-3 px-4">PO-2023-002</td>
                      <td className="py-3 px-4">8</td>
                      <td className="py-3 px-4">Nov 5, 2023</td>
                      <td className="py-3 px-4">Nov 15, 2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Filing Cabinets</td>
                      <td className="py-3 px-4">PO-2023-003</td>
                      <td className="py-3 px-4">3</td>
                      <td className="py-3 px-4">Nov 10, 2023</td>
                      <td className="py-3 px-4">Nov 20, 2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800">Materials Prep</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Conference Tables</td>
                      <td className="py-3 px-4">PO-2023-004</td>
                      <td className="py-3 px-4">2</td>
                      <td className="py-3 px-4">Nov 15, 2023</td>
                      <td className="py-3 px-4">Nov 25, 2023</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800">Materials Prep</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INVENTORY TAB */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Distribution</CardTitle>
                <CardDescription>By category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={inventoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {inventoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Critical Inventory Items</CardTitle>
                <CardDescription>Items that are low in stock or need reordering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Wooden Panels - Oak</h3>
                        <p className="text-sm text-muted-foreground">SKU: WD-FRAME-01</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                    </div>
                    <Progress value={15} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Current: 15 units</span>
                      <span className="text-muted-foreground">Minimum: 50 units</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Upholstery Fabric - Black</h3>
                        <p className="text-sm text-muted-foreground">SKU: UPH-FAB-02</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                    </div>
                    <Progress value={20} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Current: 25 yards</span>
                      <span className="text-muted-foreground">Minimum: 100 yards</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Metal Legs - Chrome</h3>
                        <p className="text-sm text-muted-foreground">SKU: MT-LEG-01</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">Reorder Soon</Badge>
                    </div>
                    <Progress value={35} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Current: 45 sets</span>
                      <span className="text-muted-foreground">Minimum: 30 sets</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/inventory/levels">
                    View All Inventory <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Inventory Movements</CardTitle>
              <CardDescription>Latest stock changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Item</th>
                      <th className="py-3 px-4 text-left font-medium">SKU</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Quantity</th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Wooden Panels - Oak</td>
                      <td className="py-3 px-4">WD-FRAME-01</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-red-100 text-red-800">Outbound</Badge>
                      </td>
                      <td className="py-3 px-4">-15 units</td>
                      <td className="py-3 px-4">Nov 5, 2023</td>
                      <td className="py-3 px-4">John Smith</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Metal Legs - Chrome</td>
                      <td className="py-3 px-4">MT-LEG-01</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Inbound</Badge>
                      </td>
                      <td className="py-3 px-4">+50 sets</td>
                      <td className="py-3 px-4">Nov 3, 2023</td>
                      <td className="py-3 px-4">Sarah Davis</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Upholstery Fabric - Black</td>
                      <td className="py-3 px-4">UPH-FAB-02</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-red-100 text-red-800">Outbound</Badge>
                      </td>
                      <td className="py-3 px-4">-30 yards</td>
                      <td className="py-3 px-4">Nov 2, 2023</td>
                      <td className="py-3 px-4">Michael Brown</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Adjustment Mechanisms</td>
                      <td className="py-3 px-4">ADJ-MECH-01</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Inbound</Badge>
                      </td>
                      <td className="py-3 px-4">+25 units</td>
                      <td className="py-3 px-4">Nov 1, 2023</td>
                      <td className="py-3 px-4">Emily Johnson</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WORKFORCE TAB */}
        <TabsContent value="workforce" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Worker Efficiency</CardTitle>
                <CardDescription>Daily efficiency trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={workerEfficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#1a365d"
                        strokeWidth={2}
                        name="Efficiency (%)"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Worker Performance</CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                        EJ
                      </div>
                      <div>
                        <p className="text-sm font-medium">Emma Johnson</p>
                        <p className="text-xs text-muted-foreground">Assembly</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">98%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={98} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                        MC
                      </div>
                      <div>
                        <p className="text-sm font-medium">Michael Chen</p>
                        <p className="text-xs text-muted-foreground">Quality Control</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">96%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={96} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                        SW
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sarah Williams</p>
                        <p className="text-xs text-muted-foreground">Packaging</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">95%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={95} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                        DR
                      </div>
                      <div>
                        <p className="text-sm font-medium">David Rodriguez</p>
                        <p className="text-xs text-muted-foreground">Assembly</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">94%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/worker/performance">
                    View All Workers <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Worker Utilization</CardTitle>
              <CardDescription>Current workload and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Worker</th>
                      <th className="py-3 px-4 text-left font-medium">Department</th>
                      <th className="py-3 px-4 text-left font-medium">Current Task</th>
                      <th className="py-3 px-4 text-left font-medium">Workload</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">John Smith</td>
                      <td className="py-3 px-4">Assembly</td>
                      <td className="py-3 px-4">Office Chair Assembly</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={65} className="h-2 w-24" />
                          <span>65%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-orange-100 text-orange-800">Medium Load</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Emily Johnson</td>
                      <td className="py-3 px-4">Quality Control</td>
                      <td className="py-3 px-4">Final Inspection</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={35} className="h-2 w-24" />
                          <span>35%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Low Load</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Michael Brown</td>
                      <td className="py-3 px-4">Assembly</td>
                      <td className="py-3 px-4">Desk Frame Construction</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="h-2 w-24" />
                          <span>85%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-red-100 text-red-800">High Load</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Sarah Davis</td>
                      <td className="py-3 px-4">Packaging</td>
                      <td className="py-3 px-4">Product Packaging</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={30} className="h-2 w-24" />
                          <span>30%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Low Load</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TASKS TAB */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion</CardTitle>
                <CardDescription>Weekly task completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={taskCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#1a365d" name="Tasks Completed" />
                      <Bar dataKey="total" fill="#ffc107" name="Total Tasks" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Office Chairs (10)</p>
                      <p className="text-xs text-muted-foreground">PO-2023-001</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Due in 2 days</Badge>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Bookshelves (8)</p>
                      <p className="text-xs text-muted-foreground">PO-2023-002</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Due in 5 days</Badge>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Filing Cabinets (3)</p>
                      <p className="text-xs text-muted-foreground">PO-2023-003</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Due in 10 days</Badge>
                  </div>
                  <Progress value={25} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Conference Tables (2)</p>
                      <p className="text-xs text-muted-foreground">PO-2023-004</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Due in 14 days</Badge>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/task-manager/orders">
                    View All Orders <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Task Activities</CardTitle>
              <CardDescription>Latest updates on tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    EJ
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Emma Johnson</span> completed the assembly of 5 office chairs
                    </p>
                    <p className="text-xs text-muted-foreground">Today, 09:15 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    MC
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Michael Chen</span> approved quality check for bookshelf order
                    </p>
                    <p className="text-xs text-muted-foreground">Today, 08:45 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    SD
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Sarah Davis</span> started packaging for order PO-2023-001
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday, 04:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    JS
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">John Smith</span> requested additional materials for desk assembly
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday, 02:15 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Activities <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
