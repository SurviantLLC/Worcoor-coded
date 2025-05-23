"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    tableData?: any[]
    skuColumns?: boolean
  }
>(({ className, tableData, skuColumns, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  >
    {tableData && skuColumns ? (
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 text-left font-medium">SKU Instance ID</th>
              <th className="p-2 text-left font-medium">Parent Resource</th>
              <th className="p-2 text-left font-medium">SKU Name</th>
              <th className="p-2 text-left font-medium">SKU Brand/Vendor</th>
              <th className="p-2 text-left font-medium">SKU Procured Date</th>
              <th className="p-2 text-left font-medium">Location</th>
              <th className="p-2 text-left font-medium">SKU Code</th>
              <th className="p-2 text-left font-medium">SKU Available Quantity</th>
              <th className="p-2 text-left font-medium">SKU Unit</th>
              <th className="p-2 text-left font-medium">Unit</th>
              <th className="p-2 text-left font-medium">Department</th>
              <th className="p-2 text-left font-medium">Wastage Quantity</th>
              <th className="p-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                <td className="p-2">{row.id || ""}</td>
                <td className="p-2">{row.parentResource || ""}</td>
                <td className="p-2">{row.name || ""}</td>
                <td className="p-2">{row.brand || ""}</td>
                <td className="p-2">{row.procuredDate || ""}</td>
                <td className="p-2">{row.location || ""}</td>
                <td className="p-2">{row.skuCode || ""}</td>
                <td className="p-2">{row.availableQuantity || 0}</td>
                <td className="p-2">{row.skuUnit || ""}</td>
                <td className="p-2">{row.unit || ""}</td>
                <td className="p-2">{row.department || ""}</td>
                <td className="p-2">{row.wastageQuantity || ""}</td>
                <td className="p-2">
                  {row.actions || (
                    <button className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      props.children
    )}
  </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
