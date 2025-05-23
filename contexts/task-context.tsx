"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the Task type
export interface Task {
  id?: string
  name: string
  createdBy?: string
  createdOn?: string
  type: string
  skill: string
  unit: string
  description?: string
}

export interface TaskGroup {
  id: string
  name: string
  createdBy: string
  createdOn: string
  typeOfTG: string
  tgType: string
  numberOfTasks: string
  unit: string
  status: string
  department: string
  description?: string
  startDateTime?: string
  tasks: TaskGroupTask[]
}

export interface TaskGroupTask {
  id: string
  name: string
  stepNumber?: string
  assignToRole: string
  schedulingType: string
  repeatPattern?: string
  duration?: string
  assignTo?: string
}

// Define the context type
interface TaskContextType {
  tasks: Task[]
  taskGroups: TaskGroup[]
  addTask: (task: Task) => void
  addTaskGroup: (taskGroup: TaskGroup) => void
  updateTaskGroup: (taskGroup: TaskGroup) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  addTasksFromTaskGroup: (groupId: string, tasks: TaskGroupTask[]) => void
  lastCreatedTask: Task | null
  lastCreatedTaskGroup: TaskGroup | null
  showTaskCreatedNotification: boolean
  showTaskGroupCreatedNotification: boolean
  clearTaskNotification: () => void
  clearTaskGroupNotification: () => void
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: "T-001",
    name: "Audit Production Line A",
    createdBy: "John Doe",
    createdOn: "05/01/2023",
    type: "Audit",
    skill: "Auditor",
    unit: "Unit 1",
    description: "Conduct a full audit of Production Line A",
  },
  {
    id: "T-002",
    name: "Cut Sheet Metal Components",
    createdBy: "Jane Smith",
    createdOn: "05/05/2023",
    type: "Cutting",
    skill: "Sheet Cutting",
    unit: "Unit 2",
    description: "Cut sheet metal components according to specifications",
  },
  {
    id: "T-003",
    name: "Package Finished Products",
    createdBy: "Mike Johnson",
    createdOn: "05/10/2023",
    type: "Packing",
    skill: "Packaging",
    unit: "Unit 3",
    description: "Package finished products for shipping",
  },
  {
    id: "T-004",
    name: "Quality Check Assembly Line B",
    createdBy: "Sarah Williams",
    createdOn: "05/15/2023",
    type: "Quality Check",
    skill: "Quality Control",
    unit: "Unit 2",
    description: "Perform quality checks on Assembly Line B products",
  },
  {
    id: "T-005",
    name: "Maintenance of Machine 3",
    createdBy: "Robert Brown",
    createdOn: "05/20/2023",
    type: "Maintenance",
    skill: "Maintenance",
    unit: "Unit 4",
    description: "Perform routine maintenance on Machine 3",
  },
]

const initialTaskGroups: TaskGroup[] = [
  {
    id: "TG-001",
    name: "Audits",
    createdBy: "John",
    createdOn: "10/05/2025",
    typeOfTG: "Repetitive",
    tgType: "Internal",
    numberOfTasks: "10",
    unit: "All",
    status: "Planned",
    department: "Production",
    tasks: [
      {
        id: "TG001-T1",
        name: "Initial Audit",
        stepNumber: "1",
        assignToRole: "Auditor",
        schedulingType: "Repetitive",
        repeatPattern: "Weekly",
        duration: "2",
      },
      {
        id: "TG001-T2",
        name: "Follow-up Audit",
        stepNumber: "2",
        assignToRole: "Senior Auditor",
        schedulingType: "Repetitive",
        repeatPattern: "Monthly",
        duration: "1",
      },
    ],
  },
  {
    id: "TG-002",
    name: "Order Name",
    createdBy: "John",
    createdOn: "10/05/2025",
    typeOfTG: "One-time",
    tgType: "External Order",
    numberOfTasks: "20",
    unit: "M1",
    status: "Active",
    department: "Production",
    tasks: [
      {
        id: "TG002-T1",
        name: "Material Preparation",
        stepNumber: "1",
        assignToRole: "Material Handler",
        schedulingType: "One-time",
        duration: "4",
      },
      {
        id: "TG002-T2",
        name: "Assembly",
        stepNumber: "2",
        assignToRole: "Assembler",
        schedulingType: "One-time",
        duration: "8",
      },
    ],
  },
  {
    id: "TG-003",
    name: "Name",
    createdBy: "Mathew",
    createdOn: "10/05/2025",
    typeOfTG: "One-time",
    tgType: "Internal Production",
    numberOfTasks: "12",
    unit: "M2",
    status: "Active",
    department: "Production",
    tasks: [
      {
        id: "TG003-T1",
        name: "Design Review",
        stepNumber: "1",
        assignToRole: "Designer",
        schedulingType: "One-time",
        duration: "2",
      },
    ],
  },
  {
    id: "TG-004",
    name: "Maintenance",
    createdBy: "Roy",
    createdOn: "10/05/2025",
    typeOfTG: "Repetitive",
    tgType: "Internal",
    numberOfTasks: "1",
    unit: "All",
    status: "Planned",
    department: "All",
    tasks: [
      {
        id: "TG004-T1",
        name: "Equipment Maintenance",
        stepNumber: "1",
        assignToRole: "Maintenance",
        schedulingType: "Repetitive",
        repeatPattern: "Monthly",
        duration: "4",
      },
    ],
  },
  {
    id: "TG-005",
    name: "Adhoc Task",
    createdBy: "John",
    createdOn: "12/05/2025",
    typeOfTG: "One-time",
    tgType: "Internal",
    numberOfTasks: "1",
    unit: "M1",
    status: "Completed",
    department: "Production",
    tasks: [
      {
        id: "TG005-T1",
        name: "Fix Production Line",
        stepNumber: "1",
        assignToRole: "Maintenance",
        schedulingType: "one-time",
        duration: "4",
        assignTo: "Jennifer Taylor",
      },
    ],
  },
]

// Create the provider component
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(initialTaskGroups)
  const [showTaskCreatedNotification, setShowTaskCreatedNotification] = useState(false)
  const [lastCreatedTask, setLastCreatedTask] = useState<Task | null>(null)
  const [lastCreatedTaskGroup, setLastCreatedTaskGroup] = useState<TaskGroup | null>(null)
  const [showTaskGroupCreatedNotification, setShowTaskGroupCreatedNotification] = useState(false)

  // Add a new task
  const addTask = (task: Task) => {
    setTasks([...tasks, task])
    setLastCreatedTask(task)
    setShowTaskCreatedNotification(true)

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowTaskCreatedNotification(false)
    }, 3000)
  }

  const addTaskGroup = (taskGroup: TaskGroup) => {
    setTaskGroups((prevGroups) => [...prevGroups, taskGroup])
    setLastCreatedTaskGroup(taskGroup)
    setShowTaskGroupCreatedNotification(true)

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowTaskGroupCreatedNotification(false)
    }, 5000)
  }

  const updateTaskGroup = (updatedTaskGroup: TaskGroup) => {
    setTaskGroups((prevGroups) =>
      prevGroups.map((group) => (group.id === updatedTaskGroup.id ? updatedTaskGroup : group)),
    )
  }

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const addTasksFromTaskGroup = (groupId: string, groupTasks: TaskGroupTask[]) => {
    // Find the task group
    const taskGroup = taskGroups.find((group) => group.id === groupId)
    if (!taskGroup) return

    // Convert task group tasks to repository tasks
    const newTasks = groupTasks.map((groupTask) => {
      // Generate a new task ID based on the highest existing ID
      const highestId = Math.max(...tasks.map((t) => Number.parseInt(t.id.replace("T-", ""))), 0)
      const newId = `T-${String(highestId + 1).padStart(3, "0")}`

      return {
        id: newId,
        name: groupTask.name,
        type: taskGroup.typeOfTG === "Repetitive" ? "Repetitive" : "One-time",
        skill: groupTask.assignToRole,
        unit: taskGroup.unit,
        createdBy: taskGroup.createdBy,
        createdOn: new Date().toLocaleDateString(),
        description: `Task from group: ${taskGroup.name} (${taskGroup.id})`,
      }
    })

    // Add the new tasks to the repository
    setTasks((prevTasks) => [...prevTasks, ...newTasks])
  }

  const clearTaskNotification = () => {
    setShowTaskCreatedNotification(false)
  }

  const clearTaskGroupNotification = () => {
    setShowTaskGroupCreatedNotification(false)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskGroups,
        addTask,
        addTaskGroup,
        updateTaskGroup,
        updateTask,
        deleteTask,
        addTasksFromTaskGroup,
        lastCreatedTask,
        lastCreatedTaskGroup,
        showTaskCreatedNotification,
        showTaskGroupCreatedNotification,
        clearTaskNotification,
        clearTaskGroupNotification,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

// Create a hook to use the context
export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}
