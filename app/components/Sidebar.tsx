'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Home, CreditCard, MessageSquare, Calendar, Settings, ChevronLeft, ChevronRight, AlertCircle, Tv, Send, BarChart, LogIn, PenToolIcon as Tool } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const menuItems = [
  { icon: Home, name: 'Dashboard', href: '/dashboard' },
  { icon: CreditCard, name: 'Payments', href: '/payments' },
  { icon: AlertCircle, name: 'Customer Issues', href: '/customer-issues' },
  { icon: MessageSquare, name: 'Complaints', href: '/complaints' },
  { icon: Tv, name: 'STB Repair', href: '/stb-repair' },
  { icon: Send, name: 'Send SMS', href: '/send-sms' },
  { icon: BarChart, name: 'Campaigns', href: '/campaigns' },
  { icon: Calendar, name: 'Scheduler', href: '/scheduler' },
  {
    icon: Tool,
    name: 'Technician',
    href: '/technician',
    submenu: [
      { name: 'Scheduler Region', href: '/technician/scheduler-region' },
      { name: 'Tasks', href: '/technician/tasks' },
      { name: 'Report', href: '/technician/report' },
    ],
  },
  { icon: LogIn, name: 'Login', href: '/login' },
]

export default function Sidebar() {
  const [expanded, setExpanded] = React.useState(true)
  const [expandedSubmenu, setExpandedSubmenu] = React.useState<string | null>(null)
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <aside 
        className={cn(
          "flex flex-col h-screen bg-[#fff8f6] border-r border-[#ff4e00]/10 shadow-lg transition-all duration-300",
          expanded ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {expanded && (
            <div className="flex items-center justify-center">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Astaan-Tv-Icon-LaBEYrhnpkJYohNrwwhINL5QhEKd5b.png"
                alt="Astaan TV Logo"
                className="h-12 w-12"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-gray-700 hover:text-[#ff4e00] hover:bg-[#ff4e00]/10",
                          pathname.startsWith(item.href) && "bg-[#ff4e00]/10 text-[#ff4e00]",
                          !expanded && "justify-center"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5 shrink-0", expanded && "mr-2")} />
                        {expanded && (
                          <>
                            <span>{item.name}</span>
                            <ChevronRight className={cn("ml-auto h-4 w-4 transition-transform", expandedSubmenu === item.name && "rotate-90")} />
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {expanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-1 ml-4 space-y-1"
                        >
                          {item.submenu.map((subItem) => (
                            <Button
                              key={subItem.name}
                              variant="ghost"
                              className={cn(
                                "w-full justify-start text-gray-600 hover:text-[#ff4e00] hover:bg-[#ff4e00]/10",
                                pathname === subItem.href && "bg-[#ff4e00]/10 text-[#ff4e00]"
                              )}
                              asChild
                            >
                              <Link href={subItem.href}>
                                {subItem.name}
                              </Link>
                            </Button>
                          ))}
                        </motion.div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-gray-700 hover:text-[#ff4e00] hover:bg-[#ff4e00]/10",
                          pathname === item.href && "bg-[#ff4e00]/10 text-[#ff4e00]",
                          !expanded && "justify-center"
                        )}
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon className={cn("h-5 w-5 shrink-0", expanded && "mr-2")} />
                          {expanded && <span>{item.name}</span>}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right">
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  )
}

