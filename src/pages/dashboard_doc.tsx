"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, Stethoscope, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

const patientReports = [
  {
    id: 1,
    name: "Alex Tinoco",
    age: 35,
    diagnosis: "Hipertensión",
    imageUrl: "/src/assets/foto1.png?height=80&width=80",
    fullReport: "El paciente presenta presión arterial elevada. Las lecturas de presión arterial consistentemente por encima de 140/90 mmHg. El paciente reporta dolores de cabeza y mareos ocasionales. Se recomiendan cambios en el estilo de vida, incluida la reducción de la ingesta de sodio, aumento de la actividad física y técnicas de manejo del estrés. Se prescribe lisinopril 10 mg diarios. Cita de seguimiento programada en 4 semanas para evaluar la eficacia del medicamento y ajustar el plan de tratamiento si es necesario.",
    analysis: {
      prediction: "Alto riesgo de complicaciones cardiovasculares si la presión arterial no se controla.",
      recommendation: "Considerar agregar un diurético si los objetivos de presión arterial no se alcanzan en 3 meses.",
      warning: "Monitorear los efectos secundarios de los inhibidores de la ECA, particularmente la tos seca.",
    }
  },
  {
    id: 2,
    name: "Diego Antunez",
    age: 28,
    diagnosis: "Migraña",
    imageUrl: "/src/assets/foto2.png?height=80&width=80",
    fullReport: "El paciente reporta dolores de cabeza frecuentes, que ocurren 3-4 veces por semana. Describe el dolor como pulsátil, generalmente en un lado de la cabeza, acompañado de náuseas y sensibilidad a la luz. Los desencadenantes incluyen falta de sueño y estrés. Se prescribe sumatriptán para ataques agudos y se recomienda llevar un diario de dolores de cabeza. Se discutieron medidas preventivas, incluida una rutina de sueño regular, técnicas de reducción del estrés y modificaciones dietéticas. Seguimiento en 6 semanas para evaluar la efectividad del tratamiento.",
    analysis: {
      prediction: "Potencial para el desarrollo de migraña crónica si los tratamientos agudos se abusan.",
      recommendation: "Considerar tratamiento profiláctico si la frecuencia no disminuye en 2 meses.",
      warning: "Vigilar la cefalea por abuso de medicamentos, limitar el uso de sumatriptán a <10 días/mes.",
    }
  },
  {
    id: 3,
    name: "Diego Diaz",
    age: 45,
    diagnosis: "Diabetes Tipo 2",
    imageUrl: "/src/assets/foto3.png?height=80&width=80",
    fullReport: "Paciente diagnosticado con diabetes tipo 2. Nivel de HbA1c en 7.8%. El paciente reporta sed aumentada, micción frecuente y fatiga. IMC: 31.2 (Obesidad). Se prescribe metformina 500 mg dos veces al día. Se educó al paciente sobre el control de la glucosa en sangre, la nutrición adecuada y la importancia de la actividad física regular. Se refiere al programa de educación sobre diabetes. Cita de seguimiento en 3 meses para recontrolar HbA1c y evaluar la eficacia del medicamento.",
    analysis: {
      prediction: "Mayor riesgo de complicaciones diabéticas si no se logra el control glucémico.",
      recommendation: "Intensificar las intervenciones en el estilo de vida y considerar agregar un agonista del receptor GLP-1 si no se alcanza la meta de HbA1c en 3 meses.",
      warning: "Monitorear la función renal y los niveles de vitamina B12 debido al uso de metformina.",
    }
  },
]

const generalAnalysis = {
  trends: "Aumento de la prevalencia de condiciones crónicas entre los pacientes más jóvenes.",
  recommendations: "Implementar programas de cribado proactivo para la detección temprana de hipertensión y diabetes.",
  warnings: "Tendencia creciente de incumplimiento con los medicamentos en todos los grupos de edad.",
}

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Panel de Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reports" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="reports">Informes</TabsTrigger>
              <TabsTrigger value="analytics">Análisis</TabsTrigger>
            </TabsList>
            <TabsContent value="reports">
              <ScrollArea className="h-[calc(100vh-300px)]">
                {patientReports.map((report) => (
                  <Card key={report.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={report.imageUrl}
                          alt={`Paciente ${report.name}`}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold">{report.name}</h3>
                          <p className="text-sm text-gray-500">Edad: {report.age}</p>
                          <p className="text-sm text-gray-500">Diagnóstico: {report.diagnosis}</p>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="mt-4 w-full">
                            <ChevronDown className="mr-2 h-4 w-4" /> Ver Informe Completo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Informe del Paciente: {report.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={report.imageUrl}
                                alt={`Paciente ${report.name}`}
                                className="w-16 h-16 rounded-full"
                              />
                              <div>
                                <h3 className="font-semibold">{report.name}</h3>
                                <p className="text-sm text-gray-500">Edad: {report.age}</p>
                                <p className="text-sm text-gray-500">Diagnóstico: {report.diagnosis}</p>
                              </div>
                            </div>
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                              <p>{report.fullReport}</p>
                            </ScrollArea>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Análisis General</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="font-medium">Tendencias:</p>
                        <p>{generalAnalysis.trends}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <TrendingDown className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Recomendaciones:</p>
                        <p>{generalAnalysis.recommendations}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <p className="font-medium">Advertencias:</p>
                        <p>{generalAnalysis.warnings}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-6 mb-4">Análisis Individual del Paciente</h3>
                  <ScrollArea className="h-[300px]">
                    {patientReports.map((report) => (
                      <Card key={report.id} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4 mb-4">
                            <img
                              src={report.imageUrl}
                              alt={`Paciente ${report.name}`}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h4 className="font-semibold">{report.name}</h4>
                              <p className="text-sm text-gray-500">{report.diagnosis}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                              <TrendingUp className="h-4 w-4 text-blue-500 mt-1" />
                              <div>
                                <p className="font-medium">Predicción:</p>
                                <p className="text-sm">{report.analysis.prediction}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <TrendingDown className="h-4 w-4 text-green-500 mt-1" />
                              <div>
                                <p className="font-medium">Recomendación:</p>
                                <p className="text-sm">{report.analysis.recommendation}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
                              <div>
                                <p className="font-medium">Advertencia:</p>
                                <p className="text-sm">{report.analysis.warning}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
