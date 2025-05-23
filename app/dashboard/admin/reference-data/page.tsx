"use client"

import { useState } from "react"
import { Search, Plus, Database, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useReferenceData } from "@/contexts/reference-data-context"
import { PageHeader } from "@/components/dashboard/page-header"

export default function ReferenceDataPage() {
  const {
    units,
    departments,
    userTypes,
    skillSets,
    ipAddresses,
    geoLocations,
    taskTypes,
    tgSchedules,
    tgTypes,
    resourceTypes,
    resources,
    skuCategories,
    skuTypes,
    locationTags,
    skuUnits,
    skuWeights,
    currencies,
    qualityRatings,
    assetCategories,
    assetStates,
  } = useReferenceData()

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddTableDialogOpen, setIsAddTableDialogOpen] = useState(false)
  const [isTableDataDialogOpen, setIsTableDataDialogOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState<any>(null)
  const [newTable, setNewTable] = useState({
    name: "",
    instanceName: "",
    description: "",
  })

  // Sample reference data tables
  const referenceTables = [
    {
      id: 1,
      name: "Unit",
      instanceName: "unit",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "System Admin",
      updatedOn: "2023-01-15",
      description: "Units in the organization",
      data: units,
    },
    {
      id: 2,
      name: "Department",
      instanceName: "department",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "John Smith",
      updatedOn: "2023-05-20",
      description: "Departments within the organization",
      data: departments,
    },
    {
      id: 3,
      name: "User Type",
      instanceName: "user_type",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Emily Davis",
      updatedOn: "2023-06-10",
      description: "Types of users in the system",
      data: userTypes,
    },
    {
      id: 4,
      name: "Skill Set",
      instanceName: "skill_set",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "System Admin",
      updatedOn: "2023-01-15",
      description: "Types of skills in the system",
      data: skillSets,
    },
    {
      id: 5,
      name: "IP Address",
      instanceName: "ip_address",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Michael Wilson",
      updatedOn: "2023-07-05",
      description: "IP addresses allowed to access the system",
      data: ipAddresses,
    },
    {
      id: 6,
      name: "Geo Location",
      instanceName: "geo_location",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Geographic access control data",
      data: geoLocations,
    },
    {
      id: 7,
      name: "Task Type",
      instanceName: "task_type",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Types of tasks in the system",
      data: taskTypes,
    },
    {
      id: 8,
      name: "TG Schedule",
      instanceName: "tg_schedule",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Task group schedules",
      data: tgSchedules,
    },
    {
      id: 9,
      name: "TG Type",
      instanceName: "tg_type",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Task group types",
      data: tgTypes,
    },
    {
      id: 10,
      name: "Resource Type",
      instanceName: "resource_type",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Types of resources",
      data: resourceTypes,
    },
    {
      id: 11,
      name: "Resource",
      instanceName: "resource",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Resources in the system",
      data: resources,
    },
    {
      id: 12,
      name: "SKU Category",
      instanceName: "sku_category",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "SKU categories",
      data: skuCategories,
    },
    {
      id: 13,
      name: "SKU Type",
      instanceName: "sku_type",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "SKU types",
      data: skuTypes,
    },
    {
      id: 14,
      name: "Location Tag",
      instanceName: "location_tag",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Location tags",
      data: locationTags,
    },
    {
      id: 15,
      name: "SKU Unit",
      instanceName: "sku_unit",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "SKU units",
      data: skuUnits,
    },
    {
      id: 16,
      name: "SKU Weight",
      instanceName: "sku_weight",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "SKU weights",
      data: skuWeights,
    },
    {
      id: 17,
      name: "Currency",
      instanceName: "currency",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Currencies",
      data: currencies,
    },
    {
      id: 18,
      name: "Quality Rating",
      instanceName: "quality_rating",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Quality ratings",
      data: qualityRatings,
    },
    {
      id: 19,
      name: "Asset Category",
      instanceName: "asset_category",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Asset categories",
      data: assetCategories,
    },
    {
      id: 20,
      name: "Asset State",
      instanceName: "asset_state",
      createdBy: "System Admin",
      createdOn: "2023-01-15",
      updatedBy: "Robert Johnson",
      updatedOn: "2023-08-15",
      description: "Asset states",
      data: assetStates,
    },
  ]

  // Filter tables based on search term
  const filteredTables = referenceTables.filter(
    (table) =>
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.instanceName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRowDoubleClick = (table: any) => {
    setSelectedTable(table)
    setIsTableDataDialogOpen(true)
  }

  const handleAddTable = () => {
    if (!newTable.name || !newTable.instanceName) return

    // In a real app, this would add the table to the database
    setIsAddTableDialogOpen(false)
    setNewTable({
      name: "",
      instanceName: "",
      description: "",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reference Data Management"
        description="You are mapping this particular data with a database table. The database table name should be mentioned."
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Reference Data Tables
            </CardTitle>
            <Button onClick={() => setIsAddTableDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Table
            </Button>
          </div>
          <CardDescription>Manage reference data tables used throughout the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tables..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Search</Button>
          </div>

          <div className="text-sm text-muted-foreground mb-4">
            <Info className="h-4 w-4 inline mr-1" />
            Search pattern: search(text * --&gt; whole text word should be returned)
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Table Instance Name</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTables.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No tables found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTables.map((table, index) => (
                    <TableRow
                      key={table.id}
                      className={`cursor-pointer ${index % 2 === 0 ? "bg-blue-50" : ""}`}
                      onDoubleClick={() => handleRowDoubleClick(table)}
                    >
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.instanceName}</TableCell>
                      <TableCell>{table.createdBy}</TableCell>
                      <TableCell>{table.createdOn}</TableCell>
                      <TableCell>{table.description}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableCaption>Double click on a row to open the table and add new data into it.</TableCaption>
            </Table>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              <Info className="h-4 w-4 inline mr-1" />
              These are the tables that will be used around the software.
            </p>
            <p className="text-sm text-muted-foreground">
              <Info className="h-4 w-4 inline mr-1" />
              Here also we can add updated by and updated on.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add New Table Dialog */}
      <Dialog open={isAddTableDialogOpen} onOpenChange={setIsAddTableDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Reference Table</DialogTitle>
            <DialogDescription>Create a new reference data table for the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="table-name">Table Name</Label>
              <Input
                id="table-name"
                placeholder="Enter table name"
                value={newTable.name}
                onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instance-name">Table Instance Name</Label>
              <Input
                id="instance-name"
                placeholder="Enter instance name (e.g., skill_type)"
                value={newTable.instanceName}
                onChange={(e) => setNewTable({ ...newTable, instanceName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter table description"
                value={newTable.description}
                onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTableDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTable} disabled={!newTable.name || !newTable.instanceName}>
              Add Table
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table Data Dialog */}
      <Dialog open={isTableDataDialogOpen} onOpenChange={setIsTableDataDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedTable?.name} Data</DialogTitle>
            <DialogDescription>View and manage data in the {selectedTable?.name} table.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="view">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view">View Data</TabsTrigger>
              <TabsTrigger value="add">Add New Entry</TabsTrigger>
            </TabsList>
            <TabsContent value="view" className="py-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTable?.data && selectedTable.data.length > 0 ? (
                      selectedTable.data.map((item: any, index: number) => {
                        // Determine which fields to display based on the table type
                        let id = ""
                        let name = ""
                        let description = ""

                        if (selectedTable.name === "Unit") {
                          id = item.Unit_ID
                          name = item.Unit_Name
                          description = item.Description
                        } else if (selectedTable.name === "Department") {
                          id = item.Department_ID
                          name = item.Department_Name
                          description = item.Description
                        } else if (selectedTable.name === "User Type") {
                          id = item.User_Type_ID
                          name = item.User_Type_Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "Skill Set") {
                          id = item.Skill_Set_ID
                          name = item.Skill_Set_Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "IP Address") {
                          id = item.IP_Add_ID
                          name = item.Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "Geo Location") {
                          id = item.GEO_LOC_ID
                          name = item.Unit
                          description = `${item.Latitude}, ${item.Longitude}`
                        } else if (selectedTable.name === "Task Type") {
                          id = item.TT_ID
                          name = item.Task_Type_Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "TG Schedule") {
                          id = item.TG_SCH_ID
                          name = item.Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "TG Type") {
                          id = item.TGT_ID
                          name = item.TG_Type_Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "Resource Type") {
                          id = item.Res_Type_ID
                          name = item.Resource_Type_Name
                          description = ""
                        } else if (selectedTable.name === "Resource") {
                          id = item.Resource_ID
                          name = item.Resource_Name
                          description = item.Resource_Type
                        } else if (selectedTable.name === "SKU Category") {
                          id = item.SKU_CAT_ID
                          name = item.SKU_Category_Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "SKU Type") {
                          id = item.SKU_Type_ID
                          name = item.SKU_Type_Name
                          description = item.Description || ""
                        } else if (selectedTable.name === "Location Tag") {
                          id = item.LOC_TAG_ID
                          name = item.Location_Tag
                          description = item.Description || ""
                        } else if (selectedTable.name === "SKU Unit") {
                          id = ""
                          name = item.SKU_Unit
                          description = ""
                        } else if (selectedTable.name === "SKU Weight") {
                          id = item.SUW_ID
                          name = item.SKU_Single_Unit_Weight
                          description = ""
                        } else if (selectedTable.name === "Currency") {
                          id = item.CUR_ID
                          name = item.Currency
                          description = item.Default_Flag
                        } else if (selectedTable.name === "Quality Rating") {
                          id = item.QCR_ID
                          name = item.SKU_Quality_Rating
                          description = ""
                        } else if (selectedTable.name === "Asset Category") {
                          id = item.Ass_CAT_ID
                          name = item.Asset_Category
                          description = ""
                        } else if (selectedTable.name === "Asset State") {
                          id = item.Ass_ST_ID
                          name = item.Asset_Status_Name
                          description = ""
                        }

                        return (
                          <TableRow key={index}>
                            <TableCell>{id}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{description}</TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  <Info className="h-4 w-4 inline mr-1" />
                  IDs will be auto-generated by the system
                </p>
              </div>
            </TabsContent>
            <TabsContent value="add" className="py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="entry-name">Name</Label>
                  <Input id="entry-name" placeholder="Enter name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="entry-description">Description</Label>
                  <Input id="entry-description" placeholder="Enter description" />
                </div>
                {selectedTable?.name === "Department" && (
                  <div className="grid gap-2">
                    <Label htmlFor="related-unit">Related Unit</Label>
                    <Input id="related-unit" placeholder="Enter related manufacturing unit" />
                  </div>
                )}
                {selectedTable?.name === "Geo Location" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input id="latitude" placeholder="Enter latitude" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input id="longitude" placeholder="Enter longitude" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <Button>Add Entry</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
