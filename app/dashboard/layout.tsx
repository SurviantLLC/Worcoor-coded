"use client"

import type React from "react"

import { useState } from "react"
import { SidebarProvider } from "@/components/dashboard/sidebar-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileHeader } from "@/components/dashboard/mobile-header"
import { TaskProvider } from "@/contexts/task-context"
import { ReferenceDataProvider } from "@/contexts/reference-data-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <ReferenceDataProvider>
      <TaskProvider>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            <DashboardSidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <MobileHeader />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </TaskProvider>
    </ReferenceDataProvider>
  )
}
