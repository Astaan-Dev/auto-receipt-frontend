'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, isSameDay } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, CalendarIcon } from 'lucide-react'

type Technician = {
  id: string
  name: string
  district: string
  availability: string[]
}

type Appointment = {
  id: string
  technicianId: string
  date: Date
  customerName: string
  address: string
  status: 'Scheduled' | 'In Progress' | 'Completed'
}

const initialTechnicians: Technician[] = [
  { id: '1', name: 'John Doe', district: 'North', availability: ['Monday', 'Wednesday', 'Friday'] },
  { id: '2', name: 'Jane Smith', district: 'South', availability: ['Tuesday', 'Thursday', 'Saturday'] },
]

const initialAppointments: Appointment[] = [
  { id: '1', technicianId: '1', date: new Date(2023, 5, 15, 10, 0), customerName: 'Alice Johnson', address: '123 Main St', status: 'Scheduled' },
  { id: '2', technicianId: '2', date: new Date(2023, 5, 16, 14, 0), customerName: 'Bob Williams', address: '456 Elm St', status: 'In Progress' },
]

export default function SchedulerPage() {
  const [technicians, setTechnicians] = useState<Technician[]>(initialTechnicians)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [newTechnician, setNewTechnician] = useState<Partial<Technician>>({})
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({})
  const [filterDistrict, setFilterDistrict] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTechnician({ ...newTechnician, [e.target.name]: e.target.value })
  }

  const handleTechnicianSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const technician: Technician = {
      id: Date.now().toString(),
      ...newTechnician as Technician,
      availability: newTechnician.availability || []
    }
    setTechnicians([...technicians, technician])
    setNewTechnician({})
  }

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment as Appointment,
      date: selectedDate || new Date(),
      status: 'Scheduled'
    }
    setAppointments([...appointments, appointment])
    setNewAppointment({})
  }

  const filteredTechnicians = technicians.filter(tech => 
    !filterDistrict || tech.district === filterDistrict
  )

  const appointmentsForSelectedDate = appointments.filter(appointment => 
    selectedDate && isSameDay(appointment.date, selectedDate)
  )

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Technician Scheduler</h2>
        <p className="text-muted-foreground">
          Manage technicians and schedule appointments efficiently.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Technicians</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                  <Plus className="mr-2 h-4 w-4" /> Add New Technician
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Technician</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleTechnicianSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={newTechnician.name || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select name="district" onValueChange={(value) => setNewTechnician({ ...newTechnician, district: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                        <SelectItem value="East">East</SelectItem>
                        <SelectItem value="West">West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability (comma-separated days)</Label>
                    <Input 
                      id="availability" 
                      name="availability" 
                      value={newTechnician.availability?.join(', ') || ''} 
                      onChange={(e) => setNewTechnician({ ...newTechnician, availability: e.target.value.split(',').map(day => day.trim()) })}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">Add Technician</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Select value={filterDistrict} onValueChange={setFilterDistrict}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Districts</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTechnicians.map((technician) => (
                  <TableRow key={technician.id}>
                    <TableCell>{technician.name}</TableCell>
                    <TableCell>{technician.district}</TableCell>
                    <TableCell>{technician.availability.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Appointments</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                  <Plus className="mr-2 h-4 w-4" /> Add New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="technicianId">Technician</Label>
                    <Select name="technicianId" onValueChange={(value) => setNewAppointment({ ...newAppointment, technicianId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a technician" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map(tech => (
                          <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input 
                      id="customerName" 
                      name="customerName" 
                      value={newAppointment.customerName || ''} 
                      onChange={(e) => setNewAppointment({ ...newAppointment, customerName: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={newAppointment.address || ''} 
                      onChange={(e) => setNewAppointment({ ...newAppointment, address: e.target.value })}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">Add Appointment</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Appointments for {selectedDate ? format(selectedDate, 'PP') : 'selected date'}</h3>
                {appointmentsForSelectedDate.length > 0 ? (
                  <ul className="space-y-2">
                    {appointmentsForSelectedDate.map(appointment => (
                      <li key={appointment.id} className="bg-gray-100 p-2 rounded">
                        <p><strong>Time:</strong> {format(appointment.date, 'p')}</p>
                        <p><strong>Customer:</strong> {appointment.customerName}</p>
                        <p><strong>Address:</strong> {appointment.address}</p>
                        <Badge 
                          variant={appointment.status === 'Scheduled' ? 'default' : appointment.status === 'In Progress' ? 'secondary' : 'success'}
                          className="mt-1"
                        >
                          {appointment.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments for this date.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

