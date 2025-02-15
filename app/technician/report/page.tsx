'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type Technician = {
  id: string
  name: string
}

type Report = {
  technicianId: string
  completedTasks: number
  averageRating: number
  efficiency: number
}

const technicians: Technician[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
]

const reportData: Report[] = [
  { technicianId: '1', completedTasks: 45, averageRating: 4.7, efficiency: 92 },
  { technicianId: '2', completedTasks: 38, averageRating: 4.5, efficiency: 88 },
  { technicianId: '3', completedTasks: 52, averageRating: 4.9, efficiency: 95 },
]

export default function TechnicianReportPage() {
  const [selectedTechnician, setSelectedTechnician] = useState<string>('')

  const filteredReport = reportData.filter(report => report.technicianId === selectedTechnician)

  const chartData = reportData.map(report => ({
    name: technicians.find(tech => tech.id === report.technicianId)?.name,
    completedTasks: report.completedTasks,
    efficiency: report.efficiency,
  }))

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Technician Report</h2>
        <p className="text-muted-foreground">
          View performance reports for technicians.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="technician">Select Technician</Label>
            <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
              <SelectTrigger id="technician">
                <SelectValue placeholder="Select a technician" />
              </SelectTrigger>
              <SelectContent>
                {technicians.map((technician) => (
                  <SelectItem key={technician.id} value={technician.id}>{technician.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedTechnician && (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReport.map((report) => (
                    <>
                      <TableRow key={`${report.technicianId}-completed`}>
                        <TableCell>Completed Tasks</TableCell>
                        <TableCell>{report.completedTasks}</TableCell>
                      </TableRow>
                      <TableRow key={`${report.technicianId}-rating`}>
                        <TableCell>Average Rating</TableCell>
                        <TableCell>{report.averageRating.toFixed(1)}</TableCell>
                      </TableRow>
                      <TableRow key={`${report.technicianId}-efficiency`}>
                        <TableCell>Efficiency</TableCell>
                        <TableCell>{report.efficiency}%</TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Technician Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="completedTasks" fill="#8884d8" name="Completed Tasks" />
              <Bar yAxisId="right" dataKey="efficiency" fill="#82ca9d" name="Efficiency (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

