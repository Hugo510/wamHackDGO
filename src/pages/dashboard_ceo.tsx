"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, BarChart, PieChart, LineChart, Activity, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  { id: 'demographics', label: 'Demographics' },
  { id: 'medicalHistory', label: 'Medical History' },
]

const mockPatients = [
  { id: 1, name: "John Doe", age: 35, lastVisit: "2023-05-15", condition: "Hypertension" },
  { id: 2, name: "Jane Smith", age: 28, lastVisit: "2023-05-18", condition: "Migraine" },
  { id: 3, name: "Robert Johnson", age: 45, lastVisit: "2023-05-20", condition: "Type 2 Diabetes" },
  { id: 4, name: "Emily Brown", age: 31, lastVisit: "2023-05-22", condition: "Asthma" },
  { id: 5, name: "Michael Wilson", age: 52, lastVisit: "2023-05-25", condition: "Arthritis" },
]

export default function Component() {
  const [activeMenuItem, setActiveMenuItem] = useState('demographics')

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Medical Dashboard</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeMenuItem === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start hover:text-blue-700 hover:bg-blue-50 transition-all 
                          ${activeMenuItem === item.id ? 'text-white bg-blue-500' : 'text-blue-600 bg-blue-50'}`}
              onClick={() => setActiveMenuItem(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeMenuItem === 'demographics' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Age and Sex Distribution */}
            <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-blue-600">Age and Sex Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-blue-50 flex items-center justify-center rounded-md">
                  <BarChart className="w-16 h-16 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution of Patients */}
            <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-blue-600">Geographic Distribution of Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-blue-50 flex items-center justify-center rounded-md relative">
                  <MapPin className="w-12 h-12 text-blue-500 absolute" style={{ top: '30%', left: '40%' }} />
                  <MapPin className="w-8 h-8 text-blue-500 absolute" style={{ top: '50%', left: '60%' }} />
                  <MapPin className="w-6 h-6 text-blue-500 absolute" style={{ top: '70%', left: '30%' }} />
                </div>
              </CardContent>
            </Card>

            {/* Non-Pathological Background Trends */}
            <Card className="col-span-2 bg-white shadow-md hover:bg-blue-50 transition-colors">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-blue-600">Non-Pathological Background Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-blue-50 flex items-center justify-center rounded-md">
                  <LineChart className="w-16 h-16 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            {/* Distribution of Pathological Background */}
            <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-blue-600">Distribution of Pathological Background</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-blue-50 flex items-center justify-center rounded-md">
                  <PieChart className="w-16 h-16 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            {/* Frequency of Hereditary-Familial Diseases */}
            <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-blue-600">Frequency of Hereditary-Familial Diseases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-blue-50 flex items-center justify-center rounded-md">
                  <Activity className="w-16 h-16 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeMenuItem === 'medicalHistory' && (
          <Card className="bg-white shadow-md">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-600">Patient History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  {mockPatients.map((patient) => (
                    <Card key={patient.id} className="p-4 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={patient.name} />
                          <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Age: {patient.age} | Last Visit: {patient.lastVisit}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {patient.condition}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}