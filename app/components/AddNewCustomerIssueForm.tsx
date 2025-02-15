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

type AddNewCustomerIssueFormProps = {
  onSubmit: () => void
}

export function AddNewCustomerIssueForm({ onSubmit }: AddNewCustomerIssueFormProps) {
  const [formData, setFormData] = useState({
    icno: '',
    mobile: '',
    userName: '',
    technicianId: '',
    district: '',
    description: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission, e.g., sending data to an API
    console.log('Submitting new customer issue:', formData)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icno">ICno</Label>
          <Input id="icno" name="icno" value={formData.icno} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userName">User Name</Label>
          <Input id="userName" name="userName" value={formData.userName} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="technicianId">Technician</Label>
          <Select name="technicianId" value={formData.technicianId} onValueChange={(value) => setFormData({ ...formData, technicianId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a technician" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">John Doe</SelectItem>
              <SelectItem value="2">Jane Smith</SelectItem>
              <SelectItem value="3">Bob Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input id="district" name="district" value={formData.district} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
      </div>
      <Button type="submit" className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">Submit</Button>
    </form>
  )
}

