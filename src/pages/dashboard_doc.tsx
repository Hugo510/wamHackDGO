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
    name: "John Doe",
    age: 35,
    diagnosis: "Hypertension",
    imageUrl: "/src/assets/foto1.png?height=80&width=80",
    fullReport: "Patient presents with elevated blood pressure. Blood pressure readings consistently above 140/90 mmHg. Patient reports occasional headaches and dizziness. Recommended lifestyle changes including reduced sodium intake, increased physical activity, and stress management techniques. Prescribed lisinopril 10mg daily. Follow-up appointment scheduled in 4 weeks to assess medication efficacy and adjust treatment plan if necessary.",
    analysis: {
      prediction: "High risk of cardiovascular complications if blood pressure remains uncontrolled.",
      recommendation: "Consider adding a diuretic if blood pressure goals are not met within 3 months.",
      warning: "Monitor for side effects of ACE inhibitors, particularly dry cough.",
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    diagnosis: "Migraine",
    imageUrl: "/src/assets/foto2.png?height=80&width=80",
    fullReport: "Patient reports frequent headaches, occurring 3-4 times per week. Describes pain as throbbing, usually on one side of the head, accompanied by nausea and sensitivity to light. Triggers include lack of sleep and stress. Prescribed sumatriptan for acute attacks and recommended keeping a headache diary. Discussed preventive measures including regular sleep schedule, stress reduction techniques, and dietary modifications. Follow-up in 6 weeks to evaluate treatment effectiveness.",
    analysis: {
      prediction: "Potential for chronic migraine development if acute treatments are overused.",
      recommendation: "Consider prophylactic treatment if frequency doesn't decrease within 2 months.",
      warning: "Watch for medication overuse headache, limit sumatriptan use to <10 days/month.",
    }
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 45,
    diagnosis: "Type 2 Diabetes",
    imageUrl: "/src/assets/foto3.png?height=80&width=80",
    fullReport: "Patient diagnosed with Type 2 Diabetes. HbA1c level at 7.8%. Patient reports increased thirst, frequent urination, and fatigue. BMI: 31.2 (Obese). Prescribed metformin 500mg twice daily. Educated patient on blood glucose monitoring, proper nutrition, and the importance of regular physical activity. Referred to diabetes education program. Scheduled follow-up in 3 months for HbA1c recheck and to assess medication efficacy.",
    analysis: {
      prediction: "Increased risk of diabetic complications if glycemic control is not achieved.",
      recommendation: "Intensify lifestyle interventions and consider adding a GLP-1 receptor agonist if HbA1c goal is not met in 3 months.",
      warning: "Monitor renal function and vitamin B12 levels due to metformin use.",
    }
  },
]

const generalAnalysis = {
  trends: "Increasing prevalence of chronic conditions among younger patients.",
  recommendations: "Implement proactive screening programs for early detection of hypertension and diabetes.",
  warnings: "Rising trend of medication non-adherence across all age groups.",
}

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Patient Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reports" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="reports">
              <ScrollArea className="h-[calc(100vh-300px)]">
                {patientReports.map((report) => (
                  <Card key={report.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={report.imageUrl}
                          alt={`Patient ${report.name}`}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold">{report.name}</h3>
                          <p className="text-sm text-gray-500">Age: {report.age}</p>
                          <p className="text-sm text-gray-500">Diagnosis: {report.diagnosis}</p>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="mt-4 w-full">
                            <ChevronDown className="mr-2 h-4 w-4" /> View Full Report
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Patient Report: {report.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={report.imageUrl}
                                alt={`Patient ${report.name}`}
                                className="w-16 h-16 rounded-full"
                              />
                              <div>
                                <h3 className="font-semibold">{report.name}</h3>
                                <p className="text-sm text-gray-500">Age: {report.age}</p>
                                <p className="text-sm text-gray-500">Diagnosis: {report.diagnosis}</p>
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
                  <h3 className="text-lg font-semibold mb-4">General Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="font-medium">Trends:</p>
                        <p>{generalAnalysis.trends}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <TrendingDown className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Recommendations:</p>
                        <p>{generalAnalysis.recommendations}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <p className="font-medium">Warnings:</p>
                        <p>{generalAnalysis.warnings}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-6 mb-4">Individual Patient Analysis</h3>
                  <ScrollArea className="h-[300px]">
                    {patientReports.map((report) => (
                      <Card key={report.id} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4 mb-4">
                            <img
                              src={report.imageUrl}
                              alt={`Patient ${report.name}`}
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
                                <p className="font-medium">Prediction:</p>
                                <p className="text-sm">{report.analysis.prediction}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <TrendingDown className="h-4 w-4 text-green-500 mt-1" />
                              <div>
                                <p className="font-medium">Recommendation:</p>
                                <p className="text-sm">{report.analysis.recommendation}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
                              <div>
                                <p className="font-medium">Warning:</p>
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