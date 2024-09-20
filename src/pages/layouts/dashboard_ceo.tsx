"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, BarChart, PieChart, LineChart, Activity, User, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line } from 'recharts'

const menuItems = [
  { id: 'demographics', label: 'Demographics', icon: BarChart },
  { id: 'medicalHistory', label: 'Medical History', icon: LineChart },
]

const mockPatients = [
  { 
    id: 1, 
    name: "John Doe", 
    age: 35, 
    lastVisit: "2023-05-15", 
    condition: "Hypertension",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    medicalHistory: "Patient has a history of hypertension diagnosed 3 years ago. Currently on lisinopril 10mg daily.",
    allergies: "Penicillin",
    medications: "Lisinopril 10mg daily",
    lastBloodPressure: "130/85",
    lastHeartRate: "72 bpm"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    age: 28, 
    lastVisit: "2023-05-18", 
    condition: "Migraine",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Elm St, Somewhere, USA",
    medicalHistory: "Patient suffers from chronic migraines, onset 5 years ago. Triggers include stress and lack of sleep.",
    allergies: "None known",
    medications: "Sumatriptan as needed",
    lastBloodPressure: "120/80",
    lastHeartRate: "68 bpm"
  },
  { 
    id: 3, 
    name: "Robert Johnson", 
    age: 45, 
    lastVisit: "2023-05-20", 
    condition: "Type 2 Diabetes",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 246-8135",
    address: "789 Oak St, Elsewhere, USA",
    medicalHistory: "Diagnosed with Type 2 Diabetes 2 years ago. Managing with diet and medication.",
    allergies: "Sulfa drugs",
    medications: "Metformin 500mg twice daily",
    lastBloodPressure: "135/88",
    lastHeartRate: "76 bpm"
  },
  { 
    id: 4, 
    name: "Emily Brown", 
    age: 31, 
    lastVisit: "2023-05-22", 
    condition: "Asthma",
    email: "emily.brown@example.com",
    phone: "+1 (555) 369-2580",
    address: "101 Pine St, Nowhere, USA",
    medicalHistory: "Asthma since childhood. Well-controlled with inhaler use.",
    allergies: "Pollen, Dust",
    medications: "Albuterol inhaler as needed",
    lastBloodPressure: "118/75",
    lastHeartRate: "70 bpm"
  },
  { 
    id: 5, 
    name: "Michael Wilson", 
    age: 52, 
    lastVisit: "2023-05-25", 
    condition: "Arthritis",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 147-2589",
    address: "202 Maple St, Someplace, USA",
    medicalHistory: "Osteoarthritis in both knees, diagnosed 5 years ago. Managing with physical therapy and medication.",
    allergies: "Ibuprofen",
    medications: "Acetaminophen as needed",
    lastBloodPressure: "128/82",
    lastHeartRate: "74 bpm"
  },
]

// Simulated data for charts
const ageAndSexData = [
  { age: '0-10', male: 15, female: 20 },
  { age: '11-20', male: 25, female: 30 },
  { age: '21-30', male: 45, female: 48 },
  { age: '31-40', male: 60, female: 58 },
  { age: '41-50', male: 50, female: 52 },
  { age: '51-60', male: 40, female: 45 },
  { age: '61+', male: 30, female: 35 },
]

const geographicDistributionData = [
  { name: 'North', value: 400 },
  { name: 'South', value: 300 },
  { name: 'East', value: 300 },
  { name: 'West', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const nonPathologicalTrendsData = [
  { year: 2018, smoking: 30, alcohol: 45, sedentary: 60 },
  { year: 2019, smoking: 28, alcohol: 48, sedentary: 58 },
  { year: 2020, smoking: 25, alcohol: 50, sedentary: 55 },
  { year: 2021, smoking: 22, alcohol: 47, sedentary: 52 },
  { year: 2022, smoking: 20, alcohol: 45, sedentary: 50 },
]

const pathologicalDistributionData = [
  { name: 'Hypertension', value: 30 },
  { name: 'Diabetes', value: 25 },
  { name: 'Asthma', value: 20 },
  { name: 'Arthritis', value: 15 },
  { name: 'Other', value: 10 },
]

const hereditaryDiseasesData = [
  { disease: 'Heart Disease', frequency: 35 },
  { disease: 'Diabetes', frequency: 30 },
  { disease: 'Cancer', frequency: 25 },
  { disease: 'Alzheimer\'s', frequency: 15 },
  { disease: 'Other', frequency: 10 },
]

export default function Component() {
  const [activeMenuItem, setActiveMenuItem] = useState('demographics')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const Sidebar = () => (
    <ScrollArea className="h-[calc(100vh-80px)]">
      {menuItems.map((item) => (
        <Button
          key={item.id}
          variant={activeMenuItem === item.id ? "secondary" : "ghost"}
          className={`w-full justify-start hover:text-blue-700 hover:bg-blue-50 transition-all 
                      ${activeMenuItem === item.id ? 'text-white bg-blue-500' : 'text-blue-600 bg-blue-50'}`}
          onClick={() => {
            setActiveMenuItem(item.id)
            setIsSidebarOpen(false)
          }}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </ScrollArea>
  )

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Medical Dashboard</h1>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:block w-64 bg-white shadow-md">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto">
          {activeMenuItem === 'demographics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age and Sex Distribution */}
              <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-blue-600">Age and Sex Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={ageAndSexData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="male" fill="#8884d8" />
                        <Bar dataKey="female" fill="#82ca9d" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution of Patients */}
              <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-blue-600">Geographic Distribution of Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={geographicDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius="80%"
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {geographicDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Non-Pathological Background Trends */}
              <Card className="col-span-1 md:col-span-2 bg-white shadow-md hover:bg-blue-50 transition-colors">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-blue-600">Non-Pathological Background Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={nonPathologicalTrendsData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="smoking" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="alcohol" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="sedentary" stroke="#ffc658" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Distribution of Pathological Background */}
              <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-blue-600">Distribution of Pathological Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pathologicalDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius="80%"
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pathologicalDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Frequency of Hereditary-Familial Diseases */}
              <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-blue-600">Frequency of Hereditary-Familial Diseases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={hereditaryDiseasesData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="disease" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="frequency" fill="#8884d8" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
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
                      <Dialog key={patient.id}>
                        <DialogTrigger asChild>
                          <Card className="p-4 hover:bg-blue-50 transition-colors cursor-pointer">
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
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{patient.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Age</Label>
                              <div className="col-span-3">{patient.age}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Email</Label>
                              <div className="col-span-3">{patient.email}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Phone</Label>
                              <div className="col-span-3">{patient.phone}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Address</Label>
                              <div className="col-span-3">{patient.address}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Condition</Label>
                              <div className="col-span-3">{patient.condition}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Medical History</Label>
                              <div className="col-span-3">{patient.medicalHistory}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Allergies</Label>
                              <div className="col-span-3">{patient.allergies}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Medications</Label>
                              <div className="col-span-3">{patient.medications}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Last BP</Label>
                              <div className="col-span-3">{patient.lastBloodPressure}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Last HR</Label>
                              <div className="col-span-3">{patient.lastHeartRate}</div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}