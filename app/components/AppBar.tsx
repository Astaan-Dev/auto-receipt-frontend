'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertCircle, MessageSquare, Tv, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddNewCustomerIssueCard } from "./AddNewCustomerIssueCard"
import { AddNewComplaintForm } from "./AddNewComplaintForm"
import { AddNewSTBRepairForm } from "./AddNewSTBRepairForm"

export function AppBar() {
  const [isCustomerIssueDialogOpen, setIsCustomerIssueDialogOpen] = useState(false)
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false)
  const [isSTBRepairDialogOpen, setIsSTBRepairDialogOpen] = useState(false)

  // Mock data for technicians
  const technicians = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' },
  ]

  const menuItems = [
    { icon: AlertCircle, label: 'Customer Issues', onClick: () => setIsCustomerIssueDialogOpen(true), color: '#FF6B6B' },
    { icon: MessageSquare, label: 'Complaints', onClick: () => setIsComplaintDialogOpen(true), color: '#4ECDC4' },
    { icon: Tv, label: 'STB Repair', onClick: () => setIsSTBRepairDialogOpen(true), color: '#45B7D1' },
    { icon: Send, label: 'Send SMS', href: '/send-sms', color: '#FFA07A' },
  ]

  return (
    <nav className="flex items-center space-x-4 py-3 px-6 bg-white shadow-md">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {item.href ? (
            <Link href={item.href} className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
              <item.icon className="h-5 w-5" style={{ color: item.color }} />
              <span className="font-medium" style={{ color: item.color }}>{item.label}</span>
            </Link>
          ) : (
            <button onClick={item.onClick} className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
              <item.icon className="h-5 w-5" style={{ color: item.color }} />
              <span className="font-medium" style={{ color: item.color }}>{item.label}</span>
            </button>
          )}
        </motion.div>
      ))}
      <Dialog open={isCustomerIssueDialogOpen} onOpenChange={setIsCustomerIssueDialogOpen}>
        <DialogContent>
          <AddNewCustomerIssueCard onClose={() => setIsCustomerIssueDialogOpen(false)} technicians={technicians} />
        </DialogContent>
      </Dialog>
      <Dialog open={isComplaintDialogOpen} onOpenChange={setIsComplaintDialogOpen}>
        <DialogContent>
          <AddNewComplaintForm onClose={() => setIsComplaintDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={isSTBRepairDialogOpen} onOpenChange={setIsSTBRepairDialogOpen}>
        <DialogContent>
          <AddNewSTBRepairForm onClose={() => setIsSTBRepairDialogOpen(false)} technicians={technicians} />
        </DialogContent>
      </Dialog>
    </nav>
  )
}

