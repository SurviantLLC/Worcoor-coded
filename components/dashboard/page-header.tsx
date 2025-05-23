"use client"

import { PageTitle } from "../page-title"
import { Button } from "../ui/button"
import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    icon?: ReactNode
    onClick: () => void
  }
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <PageTitle title={title} description={description} />
      {action && (
        <Button className="flex items-center gap-2" onClick={action.onClick}>
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  )
}
