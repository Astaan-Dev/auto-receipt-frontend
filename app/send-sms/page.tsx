'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, User, Phone, FileText } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

export default function SendSMSPage() {
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [template, setTemplate] = useState('')

  const handleSendSMS = () => {
    // Here you would typically send the SMS
    console.log('Sending SMS:', { recipient, message })
    // Reset form
    setRecipient('')
    setMessage('')
    setTemplate('')
    toast({
      title: "SMS Sent",
      description: "Your message has been sent successfully.",
    })
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Send SMS</h2>
        <p className="text-muted-foreground">
          Compose and send SMS messages to customers.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <div className="relative">
              <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="recipient"
                placeholder="Enter phone number"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appointment">Appointment Reminder</SelectItem>
                <SelectItem value="payment">Payment Confirmation</SelectItem>
                <SelectItem value="promotion">Promotional Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <div className="relative">
              <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="pl-8"
              />
            </div>
          </div>
          <Button onClick={handleSendSMS} className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">
            <Send className="mr-2 h-4 w-4" /> Send SMS
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

