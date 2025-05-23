import Link from "next/link"
import { ArrowRight, Settings, Shield, Users, Bell, Database, Lock, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Admin Panel" description="Manage your workforce and system settings" />

      {/* KPI Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-gray-500">+3 from last month</p>
            <Progress value={85} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">All properly assigned</p>
            <Progress value={100} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Lock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-500">+5% from last audit</p>
            <Progress value={92} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-gray-500">Last 30 days</p>
            <Progress value={99.8} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-black">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-black p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>Manage users and their information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Add, edit, or remove users from the system. Manage user profiles and contact information.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Active users:</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  38 users
                </Badge>
              </div>
              <Progress value={90} className="h-1.5 bg-gray-200" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/admin/users" className="flex items-center justify-center gap-2">
                Manage Users
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-black p-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Role Assignment</CardTitle>
            </div>
            <CardDescription>Assign roles to users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>
                Assign or change roles for users in the system. Control access to different parts of the application.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Configured roles:</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  6 roles
                </Badge>
              </div>
              <Progress value={100} className="h-1.5 bg-gray-200" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/admin/roles" className="flex items-center justify-center gap-2">
                Manage Roles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-black p-2">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <CardTitle>System Settings</CardTitle>
            </div>
            <CardDescription>Configure system settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Configure general system settings, security, notifications, database, and more.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Configuration status:</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  92% complete
                </Badge>
              </div>
              <Progress value={92} className="h-1.5 bg-gray-200" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/admin/settings" className="flex items-center justify-center gap-2">
                Manage Settings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-black p-2">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Configure system notifications, email templates, and alert settings for all users.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Notification channels:</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  3 configured
                </Badge>
              </div>
              <Progress value={85} className="h-1.5 bg-gray-200" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link
                href="/dashboard/admin/settings?tab=notifications"
                className="flex items-center justify-center gap-2"
              >
                Configure Notifications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-black">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-black p-2">
                <Database className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Database Management</CardTitle>
            </div>
            <CardDescription>Manage database settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Manage database connections, backups, and data maintenance tasks for the system.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Storage usage:</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  45% used
                </Badge>
              </div>
              <Progress value={45} className="h-1.5 bg-gray-200" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/dashboard/admin/settings?tab=database" className="flex items-center justify-center gap-2">
                Manage Database
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
            <CardDescription>Latest activities in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">User Role Updated</p>
                  <p className="text-sm text-gray-500">John Doe assigned to Manager role</p>
                </div>
                <Badge className="bg-gray-200 text-gray-800">2 hours ago</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">System Backup</p>
                  <p className="text-sm text-gray-500">Automatic backup completed</p>
                </div>
                <Badge className="bg-gray-200 text-gray-800">6 hours ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-sm text-gray-500">Jane Smith registered as Worker</p>
                </div>
                <Badge className="bg-gray-200 text-gray-800">Yesterday</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">CPU Usage</p>
                  <span className="text-sm text-gray-500">32%</span>
                </div>
                <Progress value={32} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Memory Usage</p>
                  <span className="text-sm text-gray-500">58%</span>
                </div>
                <Progress value={58} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Disk Space</p>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <Progress value={45} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Network Traffic</p>
                  <span className="text-sm text-gray-500">27%</span>
                </div>
                <Progress value={27} className="h-2 bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
