import Link from "next/link"
import { PageHeader } from "@/components/dashboard/page-header"
import {
  ArrowRight,
  BarChart,
  Calendar,
  ClipboardList,
  LineChart,
  ListChecks,
  Clock,
  AlertTriangle,
  Bell,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function TaskManagerPage() {
  // Sample data for quick stats
  const stats = {
    activeOrders: 12,
    pendingApprovals: 5,
    tasksInProgress: 28,
    completionRate: 87,
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Task Manager Panel"
        description="Manage production orders, task assignments, and track progress"
      />

      {/* KPI Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOrders}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
            <Progress value={65} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Alerts Management</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">-1 from last week</p>
            <Progress value={40} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasksInProgress}</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Group Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span>
                Planned: <span className="font-bold">12</span>
              </span>
              <span>
                Active: <span className="font-bold">18</span>
              </span>
              <span>
                Completed: <span className="font-bold">8</span>
              </span>
            </div>
            <Progress value={87} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Task Repository</CardTitle>
            </div>
            <CardDescription>Create and manage organization-wide tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>
                Create all tasks for the organization department wise. Define standard tasks and their requirements.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Available tasks:</span>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  24 Tasks
                </Badge>
              </div>
              <Progress value={75} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/task-manager/repository" className="flex items-center justify-center gap-2">
                Manage Tasks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Task Assignment</CardTitle>
            </div>
            <CardDescription>Assign tasks to workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Assign tasks to workers based on skills, availability, and priorities.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Unassigned tasks:</span>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  8 Tasks
                </Badge>
              </div>
              <Progress value={40} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/task-manager/assignments" className="flex items-center justify-center gap-2">
                Assign Tasks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Dashboards</CardTitle>
            </div>
            <CardDescription>View production metrics and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>View real-time dashboards showing production metrics, efficiency, and resource utilization.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">On-time completion:</span>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  87% rate
                </Badge>
              </div>
              <Progress value={87} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/task-manager/dashboards" className="flex items-center justify-center gap-2">
                View Dashboards
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Task Alerts Management</CardTitle>
            </div>
            <CardDescription>Manage task alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Configure and manage alerts for task deadlines, dependencies, and resource constraints.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active alerts:</span>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  5 Alerts
                </Badge>
              </div>
              <Progress value={40} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/task-manager/alerts" className="flex items-center justify-center gap-2">
                Manage Alerts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <ListChecks className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Task Tracking</CardTitle>
            </div>
            <CardDescription>Track task progress and completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Track the progress of tasks, identify bottlenecks, and monitor completion rates.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">In progress:</span>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  28 Tasks
                </Badge>
              </div>
              <Progress value={75} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/task-manager/tracking" className="flex items-center justify-center gap-2">
                Track Tasks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Performance Analytics</CardTitle>
            </div>
            <CardDescription>Analyze worker and production performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Analyze worker productivity, manufacturing efficiency, and resource utilization metrics.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Worker productivity:</span>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  94% average
                </Badge>
              </div>
              <Progress value={94} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/analytics" className="flex items-center justify-center gap-2">
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
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Quality Inspection</p>
                  <p className="text-sm text-muted-foreground">T-2023-001</p>
                </div>
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  Due in 2 days
                </Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Assembly Line Setup</p>
                  <p className="text-sm text-muted-foreground">T-2023-002</p>
                </div>
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                  Due in 5 days
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Inventory Audit</p>
                  <p className="text-sm text-muted-foreground">T-2023-003</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Due in 10 days
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Current worker assignments and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Assembly Department</p>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Finishing Department</p>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Material Resources</p>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Quality Control</p>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
