"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { useTaskContext } from "@/contexts/task-context"
import { format } from "date-fns"
import { PageHeader } from "@/components/dashboard/page-header"

// Mock data for task alerts
const taskAlerts = [
  {
    id: "AL-001",
    raisedBy: "John",
    raisedOn: "10/02/2025 09:00 hrs",
    description: "Machine Failure",
    sourceTaskGroup: "Production",
    sourceTaskName: "Packing",
    alertStatus: "Not Assigned",
    assignedTo: "",
    assignedTaskName: "",
    assignedTaskStatus: "",
    resolutionComments: "",
  },
  {
    id: "AL-002",
    raisedBy: "Matt",
    raisedOn: "09/02/2025 13:00 hrs",
    description: "SKU Shortage",
    sourceTaskGroup: "Maintenance",
    sourceTaskName: "Oil Change",
    alertStatus: "Assigned",
    assignedTo: "Tom",
    assignedTaskName: "Inventory Fulfillment",
    assignedTaskStatus: "In-Progress",
    resolutionComments: "",
  },
  {
    id: "AL-003",
    raisedBy: "Soy",
    raisedOn: "07/02/2025 13:00 hrs",
    description: "Audit form not assigned",
    sourceTaskGroup: "Weekly Audit and Maintenance",
    sourceTaskName: "Audit Machine Quality",
    alertStatus: "Closed",
    assignedTo: "Support",
    assignedTaskName: "Software Issue",
    assignedTaskStatus: "Closed",
    resolutionComments: "Form made available",
  },
]

// Mock data for dropdowns
const taskTypes = ["Maintenance", "Inventory", "Quality Check", "Software", "Hardware"]
const assignees = ["Tom", "Sarah", "Mike", "Emma", "Support"]
const tasks = ["Inventory Fulfillment", "Machine Repair", "Software Issue", "Quality Inspection"]
const taskGroups = ["Production", "Maintenance", "Weekly Audit and Maintenance", "Inventory"]
const departments = ["Production", "Quality", "Maintenance", "Logistics", "Administration"]
const units = ["All", "M1", "M2", "Assembly Unit A", "Assembly Unit B", "Woodworking Unit", "Finishing Unit"]

export default function TaskAlertsPage() {
  const [alerts, setAlerts] = useState(taskAlerts)
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, alertId: "" })
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [ticketCreated, setTicketCreated] = useState(false)
  const [createdTaskGroup, setCreatedTaskGroup] = useState(null)
  const [formData, setFormData] = useState({
    taskType: "",
    selectTask: "",
    assignTo: "",
    assignTime: "immediate",
    sourceTGName: "",
    sourceTaskName: "",
  })

  const { addTaskGroup } = useTaskContext()

  const totalAlerts = alerts.length
  const openAlerts = alerts.filter((alert) => alert.alertStatus !== "Closed").length
  const closedAlerts = alerts.filter((alert) => alert.alertStatus === "Closed").length
  const unassignedAlerts = alerts.filter((alert) => alert.alertStatus === "Not Assigned").length
  const assignedAlerts = alerts.filter((alert) => alert.alertStatus === "Assigned").length

  const handleContextMenu = (e, alertId) => {
    e.preventDefault()
    const alert = alerts.find((a) => a.id === alertId)
    if (alert.alertStatus === "Closed") return // Don't show context menu for closed alerts

    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      alertId,
    })
  }

  const handleAssignTicket = () => {
    const alert = alerts.find((a) => a.id === contextMenu.alertId)
    setSelectedAlert(alert)
    setFormData({
      ...formData,
      sourceTGName: alert.sourceTaskGroup,
      sourceTaskName: alert.sourceTaskName,
    })
    setContextMenu({ visible: false, x: 0, y: 0, alertId: "" })
    setAssignDialogOpen(true)
  }

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleCreateTicket = () => {
    if (!formData.taskType || !formData.selectTask || !formData.assignTo) {
      // Show validation error
      return
    }

    // Create a new task group with the name format: Source TG Name_AlertID
    const today = format(new Date(), "dd/MM/yyyy")
    const taskGroupName = `${formData.sourceTGName}_${selectedAlert.id}`

    const newTaskGroup = {
      id: `TG-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: taskGroupName,
      createdBy: "Current User", // This would come from auth context in a real app
      createdOn: today,
      typeOfTG: "One-time",
      tgType: "Internal",
      numberOfTasks: "1",
      unit: "All", // Default value, could be changed
      status: "Planned",
      department: "Production", // Default value, could be changed
      startDateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      description: `Task group created from alert: ${selectedAlert.description}`,
      tasks: [
        {
          id: `T-${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          name: formData.selectTask,
          stepNumber: "1",
          assignToRole: formData.taskType,
          schedulingType: "one-time",
          repeatPattern: "",
          duration: "4", // Default value
          assignTo: formData.assignTo,
        },
      ],
    }

    // Add the task group to the context so it appears in the Task Assignments page
    addTaskGroup(newTaskGroup)
    setCreatedTaskGroup(newTaskGroup)

    // Update the alert status
    const updatedAlerts = alerts.map((alert) => {
      if (alert.id === selectedAlert.id) {
        return {
          ...alert,
          alertStatus: "Assigned",
          assignedTo: formData.assignTo,
          assignedTaskName: formData.selectTask,
          assignedTaskStatus: "In-Progress",
        }
      }
      return alert
    })

    setAlerts(updatedAlerts)
    setTicketCreated(true)
    setAssignDialogOpen(false)

    // Auto-hide the notification after 5 seconds
    setTimeout(() => {
      setTicketCreated(false)
    }, 5000)
  }

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, alertId: "" })
  }

  // Close context menu when clicking outside
  const handleDocumentClick = (e) => {
    if (contextMenu.visible) {
      handleCloseContextMenu()
    }
  }

  return (
    <div className="space-y-4" onClick={handleDocumentClick}>
      <div className="flex justify-between items-center">
        <PageHeader title="Task Alert" description="" />
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary text-primary-foreground">
            Total: {totalAlerts}
          </Badge>
          <Badge variant="outline" className="bg-yellow-500 text-white">
            Open: {openAlerts}
          </Badge>
          <Badge variant="outline" className="bg-green-500 text-white">
            Closed: {closedAlerts}
          </Badge>
        </div>
      </div>

      {/* Ticket Created Notification */}
      {ticketCreated && createdTaskGroup && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Ticket Created</AlertTitle>
          <AlertDescription className="text-green-700">
            Task Group "{createdTaskGroup.name}" has been created successfully.
          </AlertDescription>
        </Alert>
      )}

      {/* Task Status Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({totalAlerts})</TabsTrigger>
          <TabsTrigger value="unassigned">Not Assigned ({unassignedAlerts})</TabsTrigger>
          <TabsTrigger value="assigned">Assigned ({assignedAlerts})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({closedAlerts})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <AlertsTable alerts={alerts} onContextMenu={handleContextMenu} />
        </TabsContent>

        <TabsContent value="unassigned" className="mt-4">
          <AlertsTable
            alerts={alerts.filter((alert) => alert.alertStatus === "Not Assigned")}
            onContextMenu={handleContextMenu}
          />
        </TabsContent>

        <TabsContent value="assigned" className="mt-4">
          <AlertsTable
            alerts={alerts.filter((alert) => alert.alertStatus === "Assigned")}
            onContextMenu={handleContextMenu}
          />
        </TabsContent>

        <TabsContent value="closed" className="mt-4">
          <AlertsTable
            alerts={alerts.filter((alert) => alert.alertStatus === "Closed")}
            onContextMenu={handleContextMenu}
          />
        </TabsContent>
      </Tabs>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="fixed z-50 bg-white rounded-md shadow-md border border-gray-200 py-1"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={handleAssignTicket}>
            Assign Ticket
          </button>
        </div>
      )}

      {/* Assign Ticket Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Assign Ticket <span className="text-red-500">(Add Task to address the raised concern)</span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alertId">Alert ID*</Label>
                <Input
                  id="alertId"
                  value={selectedAlert?.id || ""}
                  readOnly
                  className="bg-primary text-primary-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alertDescription">Alert Description</Label>
                <Textarea
                  id="alertDescription"
                  value={selectedAlert?.description || ""}
                  readOnly
                  className="h-24 bg-primary text-primary-foreground"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sourceTGName">Source TG Name</Label>
                <Select
                  value={formData.sourceTGName}
                  onValueChange={(value) => handleInputChange("sourceTGName", value)}
                >
                  <SelectTrigger className="bg-primary text-primary-foreground">
                    <SelectValue placeholder="Select Multiple Role Drop Down" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourceTaskName">Source Task Name</Label>
                <Select
                  value={formData.sourceTaskName}
                  onValueChange={(value) => handleInputChange("sourceTaskName", value)}
                >
                  <SelectTrigger className="bg-primary text-primary-foreground">
                    <SelectValue placeholder="Select Multiple Role Drop Down" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map((task) => (
                      <SelectItem key={task} value={task}>
                        {task}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border border-green-500 rounded-md p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="taskType">Task Type*</Label>
                  <Select value={formData.taskType} onValueChange={(value) => handleInputChange("taskType", value)}>
                    <SelectTrigger className="bg-primary text-primary-foreground">
                      <SelectValue placeholder="Select Multiple Role Drop Down" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selectTask">Select Task*</Label>
                  <Select value={formData.selectTask} onValueChange={(value) => handleInputChange("selectTask", value)}>
                    <SelectTrigger className="bg-primary text-primary-foreground">
                      <SelectValue placeholder="Select Multiple Role Drop Down" />
                    </SelectTrigger>
                    <SelectContent>
                      {tasks.map((task) => (
                        <SelectItem key={task} value={task}>
                          {task}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assignTo">Assign To*</Label>
                  <Select value={formData.assignTo} onValueChange={(value) => handleInputChange("assignTo", value)}>
                    <SelectTrigger className="bg-primary text-primary-foreground">
                      <SelectValue placeholder="Select Multiple Role Drop Down" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignees.map((assignee) => (
                        <SelectItem key={assignee} value={assignee}>
                          {assignee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignTime">Assign Time</Label>
                  <Select
                    value={formData.assignTime}
                    onValueChange={(value) => handleInputChange("assignTime", value)}
                    defaultValue="immediate"
                  >
                    <SelectTrigger className="bg-primary text-primary-foreground">
                      <SelectValue placeholder="Immediate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleCreateTicket}
                disabled={!formData.taskType || !formData.selectTask || !formData.assignTo}
              >
                Create TG Ticket
              </Button>
              <Button
                variant="secondary"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setAssignDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AlertsTable({ alerts, onContextMenu }) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader className="bg-gray-700 text-white">
          <TableRow>
            <TableHead>Alert ID</TableHead>
            <TableHead>Raised By</TableHead>
            <TableHead>Raised On (Date & Time)</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Source Task Group</TableHead>
            <TableHead>Source Task Name</TableHead>
            <TableHead>Alert Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Assigned Task Name</TableHead>
            <TableHead>Assigned Task Status</TableHead>
            <TableHead>Resolution Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id} className="bg-muted/30" onContextMenu={(e) => onContextMenu(e, alert.id)}>
              <TableCell>{alert.id}</TableCell>
              <TableCell>{alert.raisedBy}</TableCell>
              <TableCell>{alert.raisedOn}</TableCell>
              <TableCell>{alert.description}</TableCell>
              <TableCell>{alert.sourceTaskGroup}</TableCell>
              <TableCell>{alert.sourceTaskName}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                    ${alert.alertStatus === "Not Assigned" ? "bg-red-100 text-red-800 border-red-300" : ""}
                    ${alert.alertStatus === "Assigned" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""}
                    ${alert.alertStatus === "Closed" ? "bg-green-100 text-green-800 border-green-300" : ""}
                  `}
                >
                  {alert.alertStatus}
                </Badge>
              </TableCell>
              <TableCell>{alert.assignedTo}</TableCell>
              <TableCell>{alert.assignedTaskName}</TableCell>
              <TableCell>
                {alert.assignedTaskStatus && (
                  <Badge
                    variant="outline"
                    className={`
                      ${alert.assignedTaskStatus === "In-Progress" ? "bg-blue-100 text-blue-800 border-blue-300" : ""}
                      ${alert.assignedTaskStatus === "Closed" ? "bg-green-100 text-green-800 border-green-300" : ""}
                    `}
                  >
                    {alert.assignedTaskStatus}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{alert.resolutionComments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
