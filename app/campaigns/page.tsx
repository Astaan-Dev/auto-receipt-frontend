'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { Search, Plus, BarChart } from 'lucide-react'
import { DateRangePickerWithRange } from "@/components/ui/date-range-picker"

type Campaign = {
  id: string
  name: string
  status: 'Active' | 'Scheduled' | 'Completed'
  sentCount: number
  deliveryRate: number
  startDate: Date
  endDate: Date
}

const initialCampaigns: Campaign[] = [
  { id: '1', name: 'Summer Sale', status: 'Active', sentCount: 5000, deliveryRate: 98.5, startDate: new Date('2023-06-01'), endDate: new Date('2023-06-30') },
  { id: '2', name: 'New Product Launch', status: 'Scheduled', sentCount: 0, deliveryRate: 0, startDate: new Date('2023-07-01'), endDate: new Date('2023-07-15') },
  { id: '3', name: 'Customer Feedback', status: 'Completed', sentCount: 10000, deliveryRate: 99.1, startDate: new Date('2023-05-01'), endDate: new Date('2023-05-31') },
]

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [newCampaign, setNewCampaign] = useState({ name: '', message: '', startDate: new Date(), endDate: new Date() })
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

  const handleCreateCampaign = () => {
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      status: 'Scheduled',
      sentCount: 0,
      deliveryRate: 0,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
    }
    setCampaigns([...campaigns, campaign])
    setNewCampaign({ name: '', message: '', startDate: new Date(), endDate: new Date() })
  }

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!dateRange || (campaign.startDate >= dateRange.from && campaign.endDate <= dateRange.to))
  )

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">SMS Campaigns</h2>
        <p className="text-muted-foreground">
          Manage and track your SMS marketing campaigns.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Campaigns</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                <Plus className="mr-2 h-4 w-4" /> Create New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaignMessage">Message</Label>
                  <Textarea
                    id="campaignMessage"
                    value={newCampaign.message}
                    onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Campaign Duration</Label>
                  <DateRangePickerWithRange
                    date={{
                      from: newCampaign.startDate,
                      to: newCampaign.endDate
                    }}
                    setDate={(range) => setNewCampaign({
                      ...newCampaign,
                      startDate: range?.from || new Date(),
                      endDate: range?.to || new Date()
                    })}
                  />
                </div>
                <Button onClick={handleCreateCampaign} className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">Create Campaign</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <DateRangePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Delivery Rate</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={campaign.status === 'Active' ? 'default' : campaign.status === 'Scheduled' ? 'secondary' : 'outline'}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.sentCount}</TableCell>
                  <TableCell>{campaign.deliveryRate}%</TableCell>
                  <TableCell>{campaign.startDate.toLocaleDateString()}</TableCell>
                  <TableCell>{campaign.endDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="text-[#ff4e00] border-[#ff4e00] hover:bg-[#ff4e00] hover:text-white">
                      <BarChart className="mr-2 h-4 w-4" />
                      View Stats
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

