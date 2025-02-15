'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Search, Plus, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Task = {
  id: string
  icno: string
  mobile: string
  userName: string
  technicianId: string
  district: string
  createdAt: Date
  status: 'Open' | 'In Progress' | 'Resolved'
}

type Technician = {
  id: string;
  name: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    icno: '123456',
    mobile: '1234567890',
    userName: 'John Doe',
    technicianId: '1',
    district: 'North',
    createdAt: new Date('2023-06-01'),
    status: 'Open'
  },
  {
    id: '2',
    icno: '234567',
    mobile: '2345678901',
    userName: 'Alice Johnson',
    technicianId: '2',
    district: 'South',
    createdAt: new Date('2023-06-05'),
    status: 'In Progress'
  },
]

const technicians: Technician[] = [
  { id: '1', name: 'Jane Smith' },
  { id: '2', name: 'Bob Brown' },
  { id: '3', name: 'Alice Johnson' },
]

export default function CustomerIssuesPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState<Partial<Task>>({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const task: Task = {
      id: Date.now().toString(),
      ...newTask as Task,
      createdAt: new Date(),
      status: 'Open'
    }
    setTasks([...tasks, task])
    setNewTask({})
  }

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleUpdate = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task))
  }

  const filteredTasks = tasks.filter(task => 
    task.icno.includes(searchQuery) || 
    task.mobile.includes(searchQuery) ||
    task.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    technicians.find(tech => tech.id === task.technicianId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Customer Issues</h2>
        <p className="text-muted-foreground">
          Manage and track customer issues and assign technicians.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Issue Tracker</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                <Plus className="mr-2 h-4 w-4" /> Add New Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer Issue</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icno">ICno</Label>
                    <Input id="icno" name="icno" value={newTask.icno || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input id="mobile" name="mobile" value={newTask.mobile || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userName">User Name</Label>
                    <Input id="userName" name="userName" value={newTask.userName || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technicianId">Technician</Label>
                    <Select name="technicianId" value={newTask.technicianId || undefined} onValueChange={(value) => setNewTask({ ...newTask, technicianId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a technician" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((technician) => (
                          <SelectItem key={technician.id} value={technician.id}>{technician.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input id="district" name="district" value={newTask.district || ''} onChange={handleInputChange} required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Button className="bg-[#ff4e00] hover:bg-[#ff6a00] text-white">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ICno</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.icno}</TableCell>
                    <TableCell>{task.mobile}</TableCell>
                    <TableCell>{task.userName}</TableCell>
                    <TableCell>{technicians.find(tech => tech.id === task.technicianId)?.name}</TableCell>
                    <TableCell>{task.district}</TableCell>
                    <TableCell>{format(task.createdAt, 'PPP')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={task.status === 'Open' ? 'default' : task.status === 'In Progress' ? 'secondary' : 'success'}
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(task.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

