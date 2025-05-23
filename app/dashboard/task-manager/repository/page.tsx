"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
  // Import the data tables
  taskTypesTable,
  taskSkillsTable,
  unitsTable,
  getAllTaskTypes,
  getAllTaskSkills,
  getAllUnits
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useTaskContext, type Task } from "@/contexts/task-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"

export default function TaskRepositoryPage() {
  const { tasks, addTask, updateTask, showTaskCreatedNotification, lastCreatedTask } = useTaskContext()

  // Use the data from the imported tables
  const taskTypes = getAllTaskTypes()
  const taskSkills = getAllTaskSkills()
  const units = getAllUnits()

  // Add some sample tasks to display in the table - using unique IDs to avoid conflicts
  const sampleTasks = [
    {
      id: "T-101",
      name: "Audit Production Line A",
      createdBy: "John Doe",
      createdOn: "05/01/2023",
      type: "Auditor/Complaince/QC",
      skill: "Auditor",
      unit: "Unit 1",
      description: "Conduct comprehensive audit of production line A"
    },
    {
      id: "T-102",
      name: "Cut Sheet Metal Components",
      createdBy: "Jane Smith",
      createdOn: "05/05/2023",
      type: "Machine Operator",
      skill: "Machine Operator",
      unit: "Production Unit 1",
      description: "Cut metal components according to specifications"
    },
    {
      id: "T-103",
      name: "Package Finished Products",
      createdBy: "Mike Johnson",
      createdOn: "05/10/2023",
      type: "Warehouse Operation",
      skill: "Packaging",
      unit: "Asset Storing Facility",
      description: "Package finished products for shipment"
    },
    {
      id: "T-104",
      name: "Quality Check Assembly Line B",
      createdBy: "Sarah Williams",
      createdOn: "05/15/2023",
      type: "Auditor/Complaince/QC",
      skill: "Quality Manager",
      unit: "Production Unit 1",
      description: "Perform quality checks on assembly line B"
    },
    {
      id: "T-105",
      name: "Maintenance of Machine 3",
      createdBy: "Robert Brown",
      createdOn: "05/20/2023",
      type: "Maintanance Management",
      skill: "Machine Repair",
      unit: "Main Office",
      description: "Scheduled maintenance for machine 3"
    }
  ]

  // Combine existing tasks with sample tasks
  const allTasks = [...tasks, ...sampleTasks]

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Task Types")
  const [skillFilter, setSkillFilter] = useState("All Skill Types")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [editedTask, setEditedTask] = useState({
    id: "",
    name: "",
    type: "",
    skill: "",
    unit: "",
    description: "",
    createdBy: "",
    createdOn: "",
  })
  const [showTaskUpdatedNotification, setShowTaskUpdatedNotification] = useState(false)

  // New task form state
  const [newTask, setNewTask] = useState({
    name: "",
    type: "",
    skill: "",
    unit: "All",
    description: "",
  })

  // Filter tasks based on search and filters
  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch =
      task.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.createdBy?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "All Task Types" || task.type === typeFilter
    const matchesSkill = skillFilter === "All Skill Types" || task.skill === skillFilter

    return matchesSearch && matchesType && matchesSkill
  })

  // Generate next task ID
  const generateNextTaskId = () => {
    // Extract numbers from task IDs and find the highest
    const taskNumbers = allTasks
      .map((task) => {
        const match = task.id?.match(/T-(\d+)/)
        return match ? Number.parseInt(match[1], 10) : 0
      })
      .filter((num) => !isNaN(num))

    const highestNumber = taskNumbers.length > 0 ? Math.max(...taskNumbers) : 0
    const nextNumber = highestNumber + 1
    return `T-${String(nextNumber).padStart(3, "0")}`
  }

  // Format current date as MM/DD/YYYY
  const getCurrentDate = () => {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const year = now.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Handle adding a new task
  const handleAddTask = () => {
    if (!newTask.name || !newTask.type || !newTask.skill || !newTask.unit) return

    const nextId = generateNextTaskId()
    const currentDate = getCurrentDate()

    // Create the complete task object with all form fields
    const taskToAdd = {
      id: nextId,
      name: newTask.name,
      createdBy: "Current User", // In a real app, this would be the logged-in user
      createdOn: currentDate,
      type: newTask.type,
      skill: newTask.skill,
      unit: newTask.unit,
      description: newTask.description || "",
    }

    // Add the task to the context
    addTask(taskToAdd)

    // Show success notification
    setIsAddDialogOpen(false)
    resetForm()
  }

  // Handle updating a task
  const handleUpdateTask = () => {
    if (!editedTask.name || !editedTask.type || !editedTask.skill || !editedTask.unit) return

    updateTask(editedTask)
    setIsEditDialogOpen(false)
    setShowTaskUpdatedNotification(true)

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowTaskUpdatedNotification(false)
    }, 3000)
  }

  // Handle double-click on a task row
  const handleTaskRowDoubleClick = (task: Task) => {
    setSelectedTask(task)
    setEditedTask({
      id: task.id || "",
      name: task.name,
      type: task.type,
      skill: task.skill,
      unit: task.unit,
      description: task.description || "",
      createdBy: task.createdBy || "",
      createdOn: task.createdOn || "",
    })
    setIsEditDialogOpen(true)
  }

  // Reset form fields
  const resetForm = () => {
    setNewTask({
      name: "",
      type: "",
      skill: "",
      unit: "All",
      description: "",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Task Repository"
        description="These are all basic tasks in an organisation, created upfront just to avoid overload of creating task in BAU"
      />

      {/* Task Created Notification */}
      {showTaskCreatedNotification && lastCreatedTask && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Task Created</AlertTitle>
          <AlertDescription className="text-green-700">
            Task "{lastCreatedTask.name}" has been added to the repository with ID {lastCreatedTask.id}.
          </AlertDescription>
        </Alert>
      )}

      {/* Task Updated Notification */}
      {showTaskUpdatedNotification && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Task Updated</AlertTitle>
          <AlertDescription className="text-green-700">
            Task "{editedTask.name}" has been successfully updated.
          </AlertDescription>
        </Alert>
      )}

      <div className="border-t border-b border-gray-200 py-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor="search" className="whitespace-nowrap">
              Search
              <br />
              Task Name
            </Label>
            <div className="relative w-64">
              <Input
                id="search"
                type="search"
                placeholder="Search task name..."
                className="bg-background border-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="type-filter" className="whitespace-nowrap">
              Task Type
            </Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter" className="w-[180px] bg-background border-input">
                <SelectValue placeholder="Drop Down of all Task Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Task Types">All Task Types</SelectItem>
                {taskTypes.map((type) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="skill-filter" className="whitespace-nowrap">
              Task Skill
            </Label>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger id="skill-filter" className="w-[180px] bg-background border-input">
                <SelectValue placeholder="Drop Down of all Skill Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Skill Types">All Skill Types</SelectItem>
                {taskSkills.map((skill) => (
                  <SelectItem key={skill.id} value={skill.name}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="ml-auto">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Create Task
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-primary text-primary-foreground">
            <TableRow>
              <TableHead className="text-primary-foreground font-medium">Task ID</TableHead>
              <TableHead className="text-primary-foreground font-medium">Task Name</TableHead>
              <TableHead className="text-primary-foreground font-medium">Created By</TableHead>
              <TableHead className="text-primary-foreground font-medium">Created On</TableHead>
              <TableHead className="text-primary-foreground font-medium">Type of Task</TableHead>
              <TableHead className="text-primary-foreground font-medium">Task Skill</TableHead>
              <TableHead className="text-primary-foreground font-medium">Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TableRow
                  key={task.id}
                  className={index % 2 === 0 ? "bg-muted/50" : "bg-background"}
                  onDoubleClick={() => handleTaskRowDoubleClick(task)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.createdBy}</TableCell>
                  <TableCell>{task.createdOn}</TableCell>
                  <TableCell>{task.type}</TableCell>
                  <TableCell>{task.skill}</TableCell>
                  <TableCell>{task.unit}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Task Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>Add a new task to the repository</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-name">Task Name</Label>
              <Input
                id="task-name"
                placeholder="Enter task name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                className={!newTask.name ? "border-red-300 focus-visible:ring-red-300" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="task-description">Task Description</Label>
              <Textarea
                id="task-description"
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="task-type">Task Type</Label>
              <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                <SelectTrigger id="task-type" className={!newTask.type ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="task-skill">Task Skill</Label>
              <Select value={newTask.skill} onValueChange={(value) => setNewTask({ ...newTask, skill: value })}>
                <SelectTrigger id="task-skill" className={!newTask.skill ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select task skill" />
                </SelectTrigger>
                <SelectContent>
                  {taskSkills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.name}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="task-unit">Unit</Label>
              <Select value={newTask.unit} onValueChange={(value) => setNewTask({ ...newTask, unit: value })}>
                <SelectTrigger id="task-unit" className={!newTask.unit ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.name || "unassigned"}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleAddTask}
              disabled={!newTask.name || !newTask.type || !newTask.skill || !newTask.unit}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update task details</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-task-name">Task Name</Label>
              <Input
                id="edit-task-name"
                placeholder="Enter task name"
                value={editedTask.name}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                className={!editedTask.name ? "border-red-300 focus-visible:ring-red-300" : ""}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-task-description">Task Description</Label>
              <Textarea
                id="edit-task-description"
                placeholder="Enter task description"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-task-type">Task Type</Label>
              <Select value={editedTask.type} onValueChange={(value) => setEditedTask({ ...editedTask, type: value })}>
                <SelectTrigger id="edit-task-type" className={!editedTask.type ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-task-skill">Task Skill</Label>
              <Select
                value={editedTask.skill}
                onValueChange={(value) => setEditedTask({ ...editedTask, skill: value })}
              >
                <SelectTrigger id="edit-task-skill" className={!editedTask.skill ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select task skill" />
                </SelectTrigger>
                <SelectContent>
                  {taskSkills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.name}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-task-unit">Unit</Label>
              <Select value={editedTask.unit} onValueChange={(value) => setEditedTask({ ...editedTask, unit: value })}>
                <SelectTrigger id="edit-task-unit" className={!editedTask.unit ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.name || "unassigned"}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center">
              <Label htmlFor="edit-created-by" className="font-medium">
                Created By:
              </Label>
              <span className="font-mono bg-muted px-3 py-1 rounded">{editedTask.createdBy}</span>
            </div>

            <div className="flex justify-between items-center">
              <Label htmlFor="edit-created-on" className="font-medium">
                Created On:
              </Label>
              <span className="font-mono bg-muted px-3 py-1 rounded">{editedTask.createdOn}</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleUpdateTask}
              disabled={!editedTask.name || !editedTask.type || !editedTask.skill || !editedTask.unit}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
