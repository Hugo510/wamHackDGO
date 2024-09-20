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
  { id: 'demographics', label: 'Demografía', icon: BarChart },
  { id: 'medicalHistory', label: 'Historial Médico', icon: LineChart },
]

const mockPatients = [
  { 
    id: 1, 
    name: "Alex Tinoco", 
    age: 35, 
    lastVisit: "2023-05-15", 
    condition: "Hipertensión",
    email: "alex@example.com",
    phone: "6182318481",
    address: "Avenida Principal 123, Ciudad de México, México",
    medicalHistory: "El paciente tiene antecedentes de hipertensión diagnosticada hace 3 años. Actualmente toma lisinopril 10mg diarios.",
    allergies: "Penicilina",
    medications: "Lisinopril 10mg diarios",
    lastBloodPressure: "130/85",
    lastHeartRate: "72 bpm"
  },
  { 
    id: 2, 
    name: "Diego Antunez", 
    age: 28, 
    lastVisit: "2023-05-18", 
    condition: "Migraña",
    email: "diego.antunez@example.com",
    phone: "6182302940",
    address: "Calle Principal 456, Ciudad de México, México",
    medicalHistory: "La paciente sufre de migrañas crónicas desde hace 5 años. Los desencadenantes incluyen estrés y falta de sueño.",
    allergies: "Ninguna conocida",
    medications: "Sumatriptán según sea necesario",
    lastBloodPressure: "120/80",
    lastHeartRate: "68 bpm"
  },
  { 
    id: 3, 
    name: "Diego Diaz", 
    age: 45, 
    lastVisit: "2023-05-20", 
    condition: "Diabetes Tipo 2",
    email: "diego.diaz@example.com",
    phone: "6182038409",
    address: "Calle de la Rosa 789, Ciudad de México, México",
    medicalHistory: "Diagnosticado con Diabetes Tipo 2 hace 2 años. Manejado con dieta y medicación.",
    allergies: "Sulfamidas",
    medications: "Metformina 500mg dos veces al día",
    lastBloodPressure: "135/88",
    lastHeartRate: "76 bpm"
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
  { name: 'Norte', value: 400 },
  { name: 'Sur', value: 300 },
  { name: 'Este', value: 300 },
  { name: 'Oeste', value: 200 },
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
  { name: 'Hipertensión', value: 30 },
  { name: 'Diabetes', value: 25 },
  { name: 'Asma', value: 20 },
  { name: 'Artritis', value: 15 },
  { name: 'Otro', value: 10 },
]

const hereditaryDiseasesData = [
  { disease: 'Enfermedad Cardíaca', frequency: 35 },
  { disease: 'Diabetes', frequency: 30 },
  { disease: 'Cáncer', frequency: 25 },
  { disease: 'Alzheimer', frequency: 15 },
  { disease: 'Otro', frequency: 10 },
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
        <h1 className="text-2xl font-bold text-blue-600">Panel Médico</h1>
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
                  <CardTitle className="text-blue-600">Distribución por Edad y Sexo</CardTitle>
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
                  <CardTitle className="text-blue-600">Distribución Geográfica de Pacientes</CardTitle>
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
                  <CardTitle className="text-blue-600">Tendencias de Antecedentes No Patológicos</CardTitle>
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
                  <CardTitle className="text-blue-600">Distribución de Antecedentes Patológicos</CardTitle>
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
                  <CardTitle className="text-blue-600">Frecuencia de Enfermedades Hereditarias-Familiares</CardTitle>
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
                <CardTitle className="text-blue-600">Historial del Paciente</CardTitle>
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
                                  Edad: {patient.age} | Última Visita: {patient.lastVisit}
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
                              <Label className="text-right">Edad</Label>
                              <div className="col-span-3">{patient.age}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Correo Electrónico</Label>
                              <div className="col-span-3">{patient.email}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Teléfono</Label>
                              <div className="col-span-3">{patient.phone}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Dirección</Label>
                              <div className="col-span-3">{patient.address}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Condición</Label>
                              <div className="col-span-3">{patient.condition}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Historial Médico</Label>
                              <div className="col-span-3">{patient.medicalHistory}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Alergias</Label>
                              <div className="col-span-3">{patient.allergies}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Medicamentos</Label>
                              <div className="col-span-3">{patient.medications}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Última PA</Label>
                              <div className="col-span-3">{patient.lastBloodPressure}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Última FC</Label>
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
