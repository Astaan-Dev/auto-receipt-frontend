'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { DateRangePickerWithRange } from "@/components/ui/date-range-picker"
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter } from 'lucide-react'

type Complaint = {
  id: string
  icno: string
  mobile: string
  wrongIcno: string
  userName: string
  status: 'Open' | 'Resolved'
  createdAt: Date
}

const initialComplaints: Complaint[] = [
  {
    id: '1',
    icno: '123456',
    mobile: '1234567890',
    wrongIcno: '654321',
    userName: 'John Doe',
    status: 'Open',
    createdAt: new Date('2023-06-01')
  },
  {
    id: '2',
    icno: '234567',
    mobile: '2345678901',
    wrongIcno: '765432',
    userName: 'Alice Johnson',
    status: 'Resolved',
    createdAt: new Date('2023-06-05')
  },
]

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [newComplaint, setNewComplaint] = useState<Partial<Complaint>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComplaint({ ...newComplaint, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const complaint: Complaint = {
      id: Date.now().toString(),
      ...newComplaint as Complaint,
      status: 'Open',
      createdAt: new Date()
    }
    setComplaints([...complaints, complaint])
    setNewComplaint({})
  }

  const toggleStatus = (id: string) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, status: complaint.status === 'Open' ? 'Resolved' : 'Open' }
        : complaint
    ))
  }

  const filteredComplaints = complaints.filter(complaint => 
    (complaint.icno.includes(searchQuery) || 
    complaint.mobile.includes(searchQuery) ||
    complaint.userName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!dateRange || (complaint.createdAt >= dateRange.from && complaint.createdAt <= dateRange.to))
  )

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Complaints Management</h2>
        <p className="text-muted-foreground">
          Track and resolve customer complaints efficiently.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Complaints</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                <Plus className="mr-2 h-4 w-4" /> Add New Complaint
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Complaint</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icno">ICno</Label>
                    <Input id="icno" name="icno" value={newComplaint.icno || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input id="mobile" name="mobile" value={newComplaint.mobile || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wrongIcno">Wrong ICno</Label>
                    <Input id="wrongIcno" name="wrongIcno" value={newComplaint.wrongIcno || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userName">User Name</Label>
                    <Input id="userName" name="userName" value={newComplaint.userName || ''} onChange={handleInputChange} required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search complaints"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex space-x-2">
              <DateRangePickerWithRange date={dateRange} setDate={setDateRange} />
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ICno</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Wrong ICno</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.icno}</TableCell>
                  <TableCell>{complaint.mobile}</TableCell>
                  <TableCell>{complaint.wrongIcno}</TableCell>
                  <TableCell>{complaint.userName}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={complaint.status === 'Open' ? 'destructive' : 'success'}
                    >
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(complaint.createdAt, 'PP')}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(complaint.id)}
                      className={complaint.status === 'Open' ? "text-[#ff4e00] border-[#ff4e00] hover:bg-[#ff4e00] hover:text-white" : "text-green-600 border-green-600 hover:bg-green-600 hover:text-white"}
                    >
                      {complaint.status === 'Open' ? 'Resolve' : 'Reopen'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

