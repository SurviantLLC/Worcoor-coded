"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Task types table
const taskTypesTable = [
  { id: 1, name: "Auditor/Complaince/QC", code: "AUD_QC" },
  { id: 2, name: "Machine Operator", code: "MACH_OP" },
  { id: 3, name: "Equipment Manager", code: "EQUIP_MGR" },
  { id: 4, name: "Warehouse Operation", code: "WAREHOUSE" },
  { id: 5, name: "Maintanance Management", code: "MAINT_MGR" },
]

// Task skills table
const taskSkillsTable = [
  { id: 1, name: "Business Management", category: "Management" },
  { id: 2, name: "Project Management", category: "Management" },
  { id: 3, name: "Team Management", category: "Management" },
  { id: 4, name: "Auditor", category: "Quality" },
  { id: 5, name: "Machine Operator", category: "Operations" },
  { id: 6, name: "Quality Manager", category: "Quality" },
  { id: 7, name: "Packaging", category: "Operations" },
  { id: 8, name: "Electrician", category: "Technical" },
  { id: 9, name: "Plumber", category: "Technical" },
  { id: 10, name: "Welder", category: "Technical" },
  { id: 11, name: "Assembly Line", category: "Operations" },
  { id: 12, name: "HAZMAT", category: "Safety" },
  { id: 13, name: "Machine Repair", category: "Maintenance" },
  { id: 14, name: "ERT", category: "Emergency" },
  { id: 15, name: "Equipment Handling", category: "Operations" },
]

// Units table
const unitsTable = [
  { id: 1, name: "All", location: "Global", active: true },
  { id: 2, name: "Unit 1", location: "Building A", active: true },
  { id: 3, name: "Production Unit 1", location: "Building B", active: true },
  { id: 4, name: "Asset Storing Facility", location: "Warehouse", active: true },
  { id: 5, name: "Main Office", location: "Administrative", active: true },
]

// Helper functions to work with the data tables
const getTaskTypeById = (id) => taskTypesTable.find(type => type.id === id)
const getTaskTypeByName = (name) => taskTypesTable.find(type => type.name === name)
const getAllTaskTypes = () => taskTypesTable
const getActiveTaskTypes = () => taskTypesTable.filter(type => type.active !== false)

const getTaskSkillById = (id) => taskSkillsTable.find(skill => skill.id === id)
const getTaskSkillByName = (name) => taskSkillsTable.find(skill => skill.name === name)
const getAllTaskSkills = () => taskSkillsTable
const getTaskSkillsByCategory = (category) => taskSkillsTable.filter(skill => skill.category === category)

const getUnitById = (id) => unitsTable.find(unit => unit.id === id)
const getUnitByName = (name) => unitsTable.find(unit => unit.name === name)
const getAllUnits = () => unitsTable
const getActiveUnits = () => unitsTable.filter(unit => unit.active === true)

// Update the Table component to have clean borders and subtle black accents
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm table-striped", className)} {...props} />
    </div>
  ),
)
Table.displayName = "Table"

// Update the TableHeader to use black with subtle opacity
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b bg-black/10 text-foreground", className)} {...props} />
  ),
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("bg-black/5 font-medium text-foreground", className)} {...props} />
  ),
)
TableFooter.displayName = "TableFooter"

// Update the TableRow to have hover effect with black
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    onRowClick?: () => void
    onRowDoubleClick?: () => void
  }
>(({ className, onRowClick, onRowDoubleClick, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-black/5 data-[state=selected]:bg-black/10 cursor-pointer",
      className,
    )}
    onClick={onRowClick}
    onDoubleClick={onRowDoubleClick}
    {...props}
  />
))
TableRow.displayName = "TableRow"

// Update the TableHead to use dark text
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
)
TableCaption.displayName = "TableCaption"

export { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption,
  // Export the data tables and helper functions
  taskTypesTable,
  taskSkillsTable,
  unitsTable,
  getTaskTypeById,
  getTaskTypeByName,
  getAllTaskTypes,
  getActiveTaskTypes,
  getTaskSkillById,
  getTaskSkillByName,
  getAllTaskSkills,
  getTaskSkillsByCategory,
  getUnitById,
  getUnitByName,
  getAllUnits,
  getActiveUnits
}
