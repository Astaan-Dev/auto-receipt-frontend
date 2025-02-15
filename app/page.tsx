'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/Overview"
import { RecentPayments } from "@/components/RecentPayments"
import { TaskDistribution } from "@/components/TaskDistribution"
import { CustomerActivity } from "@/components/CustomerActivity"
import { motion } from "framer-motion"
import { DollarSign, Users, ListTodo, Send } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Dashboard() {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 text-white transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <motion.div
                className="h-8 w-8 rounded-full bg-white/20 p-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 10 }}
              >
                <DollarSign className="h-4 w-4" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-white/70">+20.1% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants}>
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500 text-white transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Customers
              </CardTitle>
              <motion.div
                className="h-8 w-8 rounded-full bg-white/20 p-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 10 }}
              >
                <Users className="h-4 w-4" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-white/70">+180 new customers</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants}>
          <Card className="group relative overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 text-white transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Open Tasks
              </CardTitle>
              <motion.div
                className="h-8 w-8 rounded-full bg-white/20 p-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 10 }}
              >
                <ListTodo className="h-4 w-4" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-white/70">+22 since last week</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants}>
          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 text-white transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Campaigns
              </CardTitle>
              <motion.div
                className="h-8 w-8 rounded-full bg-white/20 p-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 10 }}
              >
                <Send className="h-4 w-4" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-white/70">2 ending this week</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div 
          className="md:col-span-2 lg:col-span-4"
          variants={cardVariants}
        >
          <Card className="bg-white transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div 
          className="md:col-span-2 lg:col-span-3"
          variants={cardVariants}
        >
          <Card className="bg-white transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentPayments />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div 
          className="md:col-span-2 lg:col-span-4"
          variants={cardVariants}
        >
          <Card className="bg-white transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskDistribution />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div 
          className="md:col-span-2 lg:col-span-3"
          variants={cardVariants}
        >
          <Card className="bg-white transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Customer Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerActivity />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

