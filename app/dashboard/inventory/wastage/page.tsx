"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Search, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// Sample SKUs data
const skus = [
  { value: "WD-FRAME-01", label: "WD-FRAME-01 - Wooden Frame - Oak" },
  { value: "WD-FRAME-02", label: "WD-FRAME-02 - Wooden Frame - Maple" },
  { value: "WD-FRAME-03", label: "WD-FRAME-03 - Wooden Frame - Walnut" },
  { value: "MT-LEG-01", label: "MT-LEG-01 - Metal Legs - Chrome" },
  { value: "MT-LEG-02", label: "MT-LEG-02 - Metal Legs - Black" },
  { value: "UPH-SEAT-01", label: "UPH-SEAT-01 - Upholstered Seat - Fabric" },
  { value: "UPH-SEAT-02", label: "UPH-SEAT-02 - Upholstered Seat - Leather" },
  { value: "HW-SCREWS-01", label: "HW-SCREWS-01 - Hardware - Screws Pack" },
  { value: "HW-BOLTS-01", label: "HW-BOLTS-01 - Hardware - Bolts Pack" },
  { value: "PKG-BOX-01", label: "PKG-BOX-01 - Packaging - Standard Box" },
]

// Sample wastage reasons
const wastageReasons = [
  { value: "damaged", label: "Damaged during manufacturing" },
  { value: "defective", label: "Defective material" },
  { value: "expired", label: "Expired material" },
  { value: "spillage", label: "Spillage" },
  { value: "incorrect-measurement", label: "Incorrect measurement" },
  { value: "testing", label: "Used for testing" },
  { value: "other", label: "Other" },
]

// Sample wastage data
const initialWastage = [
  {
    id: 1,
    date: "2023-11-01",
    sku: "WD-FRAME-01",
    skuName: "Wooden Frame - Oak",
    quantity: 3,
    reason: "Damaged during manufacturing",
    notes: "Frames were damaged during assembly process.",
    reportedBy: "John Smith",
  },
  {
    id: 2,
    date: "2023-11-02",
    sku: "MT-LEG-01",
    skuName: "Metal Legs - Chrome",
    quantity: 5,
    reason: "Defective material",
    notes: "Legs had manufacturing defects and couldn't be used.",
    reportedBy: "Emily Johnson",
  },
  {
    id: 3,
    date: "2023-11-03",
    sku: "UPH-SEAT-01",
    skuName: "Upholstered Seat - Fabric",
    quantity: 2,
    reason: "Incorrect measurement",
    notes: "Fabric was cut incorrectly and couldn't be used.",
    reportedBy: "Michael Brown",
  },
  {
    id: 4,
    date: "2023-11-04",
    sku: "HW-SCREWS-01",
    skuName: "Hardware - Screws Pack",
    quantity: 10,
    reason: "Spillage",
    notes: "Screws were spilled and couldn't be recovered.",
    reportedBy: "Sarah Davis",
  },
  {
    id: 5,
    date: "2023-11-05",
    sku: "PKG-BOX-01",
    skuName: "Packaging - Standard Box",
    quantity: 8,
    reason: "Damaged during manufacturing",
    notes: "Boxes were damaged during handling.",
    reportedBy: "Robert Wilson",
  },
]

// Form schema
const formSchema = z.object({
  sku: z.string({
    required_error: "Please select a SKU.",
  }),
  quantity: z.coerce.number().positive({
    message: "Quantity must be a positive number.",
  }),
  reason: z.string({
    required_error: "Please select a reason.",
  }),
  notes: z.string().optional(),
})

type WastageFormValues = z.infer<typeof formSchema>

export default function WastageTrackingPage() {
  const [wastage, setWastage] = useState(initialWastage)
  const [searchTerm, setSearchTerm] = useState("")
  const [reasonFilter, setReasonFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const itemsPerPage = 5

  // Initialize form
  const form = useForm<WastageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: "",
      quantity: 1,
      reason: "",
      notes: "",
    },
  })

  // Filter wastage based on search term and reason filter
  const filteredWastage = wastage.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesReason = reasonFilter === "All" || item.reason.includes(reasonFilter)
    return matchesSearch && matchesReason
  })

  // Paginate wastage
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredWastage.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredWastage.length / itemsPerPage)

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle form submission
  const onSubmit = (data: WastageFormValues) => {
    setIsSubmitting(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const selectedSku = skus.find((sku) => sku.value === data.sku)
      const selectedReason = wastageReasons.find((reason) => reason.value === data.reason)

      const newWastage = {
        id: wastage.length > 0 ? Math.max(...wastage.map((item) => item.id)) + 1 : 1,
        date: new Date().toISOString().split("T")[0],
        sku: data.sku,
        skuName: selectedSku ? selectedSku.label.split(" - ")[1] : data.sku,
        quantity: data.quantity,
        reason: selectedReason ? selectedReason.label : data.reason,
        notes: data.notes || "",
        reportedBy: "Current User", // In a real app, this would be the logged-in user
      }

      setWastage([newWastage, ...wastage])

      toast({
        title: "Wastage recorded",
        description: `${data.quantity} units of ${data.sku} have been recorded as wastage.`,
      })

      form.reset()
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Wastage Tracking</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Record Wastage</CardTitle>
            <CardDescription>Record material wastage and specify the reason</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a SKU" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skus.map((sku) => (
                            <SelectItem key={sku.value} value={sku.value}>
                              {sku.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the SKU for which wastage occurred.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Wasted</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormDescription>Enter the quantity of material wasted.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wastageReasons.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the reason for the wastage.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter any additional notes or details about the wastage..." {...field} />
                      </FormControl>
                      <FormDescription>Provide any additional information about the wastage.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Recording..." : "Record Wastage"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Wastage Summary</CardTitle>
              <CardDescription>Overview of recent material wastage</CardDescription>
            </div>
            <Trash className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Total Wastage Events</div>
                  <div className="text-2xl font-bold">{wastage.length}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Total Units Wasted</div>
                  <div className="text-2xl font-bold">{wastage.reduce((total, item) => total + item.quantity, 0)}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Top Wastage Reasons</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(wastage.map((item) => item.reason)))
                    .slice(0, 3)
                    .map((reason) => (
                      <Badge key={reason} variant="outline">
                        {reason}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Most Wasted SKUs</div>
                <div className="space-y-2">
                  {Object.entries(
                    wastage.reduce((acc: Record<string, number>, item) => {
                      acc[item.sku] = (acc[item.sku] || 0) + item.quantity
                      return acc
                    }, {}),
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([sku, quantity]) => (
                      <div key={sku} className="flex items-center justify-between">
                        <span className="text-sm">{sku}</span>
                        <span className="text-sm font-medium">{quantity} units</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wastage History</CardTitle>
          <CardDescription>View history of recorded material wastage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search wastage..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="reason-filter" className="whitespace-nowrap">
                    Reason:
                  </Label>
                  <Select onValueChange={(value) => setReasonFilter(value)} defaultValue="All">
                    <SelectTrigger id="reason-filter" className="w-[200px]">
                      <SelectValue placeholder="All Reasons" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Reasons</SelectItem>
                      <SelectItem value="Damaged">Damaged during manufacturing</SelectItem>
                      <SelectItem value="Defective">Defective material</SelectItem>
                      <SelectItem value="Expired">Expired material</SelectItem>
                      <SelectItem value="Spillage">Spillage</SelectItem>
                      <SelectItem value="Incorrect">Incorrect measurement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Reported By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="font-medium">{item.sku}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={item.skuName}>
                            {item.skuName}
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={item.reason}>
                            {item.reason}
                          </div>
                        </TableCell>
                        <TableCell>{item.reportedBy}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No wastage records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredWastage.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredWastage.length)} of{" "}
                  {filteredWastage.length} records
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
