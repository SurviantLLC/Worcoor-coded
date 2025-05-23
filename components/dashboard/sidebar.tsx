"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Cog,
  Database,
  FileText,
  LayoutDashboard,
  Package,
  Users,
  Layers,
  Truck,
  ChevronLeft,
  LineChart,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SidebarProps = {
  isOpen: boolean
  toggle: () => void
}

export function DashboardSidebar({ isOpen, toggle }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Admin Panel",
      href: "/dashboard/admin",
      icon: Users,
    },
    {
      title: "Role Management",
      href: "/dashboard/admin/roles",
      icon: ClipboardList,
      parent: "Admin Panel",
    },
    {
      title: "User Management",
      href: "/dashboard/admin/users",
      icon: Users,
      parent: "Admin Panel",
    },
    {
      title: "Reference Data Management",
      href: "/dashboard/admin/reference-data",
      icon: Database,
      parent: "Admin Panel",
    },
    {
      title: "System Settings",
      href: "/dashboard/admin/settings",
      icon: Cog,
      parent: "Admin Panel",
    },
    {
      title: "Product Management",
      href: "/dashboard/product-manager",
      icon: Package,
    },
    {
      title: "Product Definition",
      href: "/dashboard/product-manager/products",
      icon: Package,
      parent: "Product Management",
    },
    {
      title: "Manufacturing Process",
      href: "/dashboard/product-manager/manufacturing",
      icon: Truck,
      parent: "Product Management",
    },
    {
      title: "Task Management",
      href: "/dashboard/task-manager",
      icon: ClipboardList,
    },
    {
      title: "Task Alerts Management",
      href: "/dashboard/task-manager/alerts",
      icon: Bell,
      parent: "Task Management",
    },
    {
      title: "Task Repository",
      href: "/dashboard/task-manager/repository",
      icon: ClipboardList,
      parent: "Task Management",
    },
    {
      title: "Task Assignment",
      href: "/dashboard/task-manager/assignments",
      icon: Users,
      parent: "Task Management",
    },
    {
      title: "Task Dashboard",
      href: "/dashboard/task-manager/dashboards",
      icon: LayoutDashboard,
      parent: "Task Management",
    },
    {
      title: "Performance Analytics",
      href: "/dashboard/analytics",
      icon: LineChart,
      parent: "Task Management",
    },
    {
      title: "Inventory Management",
      href: "/dashboard/inventory",
      icon: Database,
    },
    {
      title: "SKU Management",
      href: "/dashboard/inventory/skus",
      icon: Layers,
      parent: "Inventory Management",
    },
    {
      title: "Wastage Tracking",
      href: "/dashboard/inventory/wastage",
      icon: Trash,
      parent: "Inventory Management",
    },
    {
      title: "Procurement",
      href: "/dashboard/inventory/procurement",
      icon: Package,
      parent: "Inventory Management",
    },
    {
      title: "Inventory Analytics",
      href: "/dashboard/inventory/analytics",
      icon: BarChart3,
      parent: "Inventory Management",
    },
    {
      title: "Asset Management",
      href: "/dashboard/asset-management",
      icon: Package,
    },
    {
      title: "Asset Management",
      href: "/dashboard/asset-management/assets",
      icon: Package,
      parent: "Asset Management",
    },
    {
      title: "Asset Dashboard",
      href: "/dashboard/asset-management/dashboard",
      icon: BarChart3,
      parent: "Asset Management",
    },
    {
      title: "Audit Management",
      href: "/dashboard/audit",
      icon: FileText,
    },
    {
      title: "Audit Form Management",
      href: "/dashboard/audit/forms",
      icon: FileText,
      parent: "Audit Management",
    },
    {
      title: "Audit Report",
      href: "/dashboard/audit/reports",
      icon: BarChart3,
      parent: "Audit Management",
    },
  ]

  // Filter main navigation items (those without a parent)
  const mainNavItems = navItems.filter((item) => !item.parent)

  // Check if a nav item is active or one of its children is active
  const isActiveOrHasActiveChild = (item: any) => {
    // Use strict equality and ensure pathname is not null
    if (pathname && pathname === item.href) return true
    // Use a more reliable way to check for child items
    return navItems.some((child) => child.parent === item.title && pathname && pathname === child.href)
  }

  return (
    <div
      className={cn(
        "h-screen bg-black text-white border-r border-gray-800 transition-all duration-300",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800 h-16">
        <div className={cn("flex items-center", !isOpen && "justify-center")}>
          {isOpen ? (
            <div className="relative h-10 w-44">
              <Image 
                src="/logo_full.svg" 
                alt="Worcoor Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          ) : (
            <div className="relative h-8 w-8">
              {/* Extract just the icon from the full logo for the collapsed sidebar */}
              <Image 
                src="/logo_full.svg"
                alt="Worcoor Icon"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="text-white hover:bg-gray-800 hover:text-white rounded-md"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-128px)] no-scrollbar">
        <nav className="p-4 space-y-1">
          {mainNavItems.map((item) => (
            <div key={`nav-${item.href}`}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActiveOrHasActiveChild(item)
                    ? "bg-gray-800 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  !isOpen && "justify-center px-2",
                )}
                title={!isOpen ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {/* Add arrow icon for items with children */}
                    {navItems.some((child) => child.parent === item.title) &&
                      (isActiveOrHasActiveChild(item) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </>
                )}
              </Link>

              {/* Show child items if parent is active and sidebar is open */}
              {isOpen && isActiveOrHasActiveChild(item) && (
                <div className="ml-6 mt-1 space-y-1">
                  {navItems
                    .filter((child) => child.parent === item.title)
                    .map((child) => (
                      <Link
                        key={`child-${child.href}`}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                          pathname === child.href
                            ? "bg-gray-800 text-white font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        )}
                      >
                        <child.icon className="h-3.5 w-3.5" />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800 h-16">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center">A</div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@worcoor.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center">A</div>
          </div>
        )}
      </div>
    </div>
  )
}
