"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-context"
import { Logo } from "@/components/logo"

export function MobileHeader() {
  const { toggle } = useSidebar()

  return (
    <div className="md:hidden flex items-center p-4 border-b bg-gradient-blue">
      <Button variant="ghost" size="icon" className="mr-2 text-white" onClick={toggle}>
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-2">
        <Logo size={32} />
        <h1 className="text-lg font-medium text-white">Worcoor</h1>
      </div>
    </div>
  )
}
