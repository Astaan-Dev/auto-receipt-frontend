'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Search } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DateRangePickerWithRange } from "@/components/ui/date-range-picker"

const payments = [
  {
    id: '1',
    icno: '123456',
    mobile: '1234567890',
    amount: 100,
    date: new Date('2023-01-01'),
    status: 'Completed',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-31'),
  },
  {
    id: '2',
    icno: '234567',
    mobile: '2345678901',
    amount: 200,
    date: new Date('2023-01-02'),
    status: 'Pending',
    startDate: new Date('2023-01-02'),
    endDate: new Date('2023-02-01'),
  },
  {
    id: '3',
    icno: '345678',
    mobile: '3456789012',
    amount: 300,
    date: new Date('2023-01-03'),
    status: 'Failed',
    startDate: new Date('2023-01-03'),
    endDate: new Date('2023-02-02'),
  },
]

export default function PaymentsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPayments = payments.filter(payment => 
    (payment.icno.includes(searchQuery) || 
    payment.mobile.includes(searchQuery)) &&
    (!dateRange || (payment.date >= dateRange.from && payment.date <= dateRange.to))
  )

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Payment Receipt Management</h2>
          <p className="text-muted-foreground">
            View and manage payment receipts for all transactions.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ICno or Mobile"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <DateRangePickerWithRange date={dateRange} setDate={setDateRange} />
              <Button className="bg-[#ff4e00] hover:bg-[#ff6a00] text-white">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ICno</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.icno}</TableCell>
                      <TableCell>{payment.mobile}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{format(payment.date, 'PPP')}</TableCell>
                      <TableCell>{format(payment.startDate, 'PPP')}</TableCell>
                      <TableCell>{format(payment.endDate, 'PPP')}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={payment.status === 'Completed' ? 'default' : payment.status === 'Pending' ? 'secondary' : 'destructive'}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

