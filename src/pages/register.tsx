"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScanLine, Loader2, Camera, RotateCw, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from '@/hooks/use-toast'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  correo: z.string().email({ message: "Por favor ingrese un correo electrónico válido" }),
  edad: z.number().min(0).max(120, { message: "La edad debe estar entre 0 y 120 años" }),
  sexo: z.enum(["masculino", "femenino", "otro"]),
  peso: z.number().min(0, { message: "El peso no puede ser negativo" }),
  altura: z.number().min(0, { message: "La altura no puede ser negativa" }),
  motivoConsulta: z.string().min(10, { message: "Por favor, proporcione más detalles sobre el motivo de la consulta" }),
  ocupacion: z.string().min(2, { message: "Por favor, ingrese su ocupación" }),
  estadoCivil: z.enum(["soltero", "casado", "divorciado", "viudo", "otro"]),
  tabaquismo: z.boolean(),
  alcoholismo: z.boolean(),
  drogas: z.boolean(),
  ejercicio: z.string(),
  alimentacion: z.string(),
  enfermedadesPrevias: z.string(),
  cirugiasPrevias: z.string(),
  alergias: z.string(),
  medicamentosActuales: z.string(),
  hospitalizacionesPrevias: z.string(),
  diabetes: z.boolean(),
  hipertension: z.boolean(),
  cardiopatias: z.boolean(),
  cancer: z.boolean(),
  otrosAntecedentes: z.string()
})

export default function FormularioPaciente() {
  const [usarINE, setUsarINE] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isFirstSide, setIsFirstSide] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (isCameraActive) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [isCameraActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing the camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setCapturedImage(imageDataUrl)
        setIsCameraActive(false)
      }
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setIsCameraActive(true)
  }

  const proceedToNextSide = () => {
    setIsFirstSide(false)
    setCapturedImage(null)
    setIsCameraActive(true)
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simular envío de datos
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Datos enviados:", data)
      toast({
        title: "Registro Exitoso",
        description: "La información del paciente ha sido registrada correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar la información. Por favor, intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">Registro de Paciente</CardTitle>
          <CardDescription>Por favor, ingrese sus datos para agilizar su atención médica.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-start items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" className="flex items-center bg-blue-500 hover:bg-blue-600">
                      <ScanLine className="mr-2 h-4 w-4" />
                      {usarINE ? 'INE Escaneada' : 'Escanear INE'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Capture Your ID</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/2 p-6 border-r border-[#3B82F6]">
                        <div className="aspect-[3/2] bg-gray-200 rounded-lg overflow-hidden mb-4">
                          <img 
                            src="/placeholder.svg?height=300&width=450" 
                            alt="ID Example" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-center text-gray-600">Example ID</p>
                      </div>
                      <div className="w-full md:w-1/2 p-6">
                        {!isCameraActive && !capturedImage && (
                          <div className="flex items-center justify-center h-full">
                            <Button 
                              onClick={() => setIsCameraActive(true)}
                              className="bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                            >
                              <Camera className="mr-2 h-4 w-4" /> Activate Camera
                            </Button>
                          </div>
                        )}
                        {isCameraActive && (
                          <div className="relative aspect-[3/2] bg-black rounded-lg overflow-hidden mb-4">
                            <video 
                              ref={videoRef} 
                              autoPlay 
                              playsInline 
                              className="w-full h-full object-cover"
                            />
                            <Button
                              onClick={capturePhoto}
                              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                            >
                              Capture Photo
                            </Button>
                          </div>
                        )}
                        {capturedImage && (
                          <div className="relative aspect-[3/2] bg-black rounded-lg overflow-hidden mb-4">
                            <img 
                              src={capturedImage} 
                              alt="Captured ID" 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                              <Button
                                onClick={retakePhoto}
                                className="bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                              >
                                <RotateCw className="mr-2 h-4 w-4" /> Retake
                              </Button>
                              {isFirstSide && (
                                <Button
                                  onClick={proceedToNextSide}
                                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                                >
                                  Next <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input id="nombre" {...register("nombre")} placeholder="Ingrese su nombre completo" />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input id="correo" type="email" {...register("correo")} placeholder="Ingrese su correo electrónico" />
                {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Input id="edad" type="number" {...register("edad", { valueAsNumber: true })} placeholder="Ingrese su edad" />
                {errors.edad && <p className="text-red-500 text-sm">{errors.edad.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select onValueChange={(value) => register("sexo").onChange({ target: { value } })}>
                  <SelectTrigger id="sexo">
                    <SelectValue placeholder="Seleccione su sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sexo && errors.sexo.message && (<p className="text-red-500 text-sm">{errors.sexo.message}</p>)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input id="peso" type="number" {...register("peso", { valueAsNumber: true })} placeholder="Ingrese su peso" />
                {errors.peso && errors.peso.message && (<p className="text-red-500 text-sm">{errors.peso.message}</p>)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="altura">Altura (cm)</Label>
                <Input id="altura" type="number" {...register("altura", { valueAsNumber: true })} placeholder="Ingrese su altura" />
                {errors.altura && errors.altura.message && (<p className="text-red-500 text-sm">{errors.altura.message}</p>)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivoConsulta">Motivo de Consulta</Label>
                <Textarea id="motivoConsulta" {...register("motivoConsulta")} placeholder="Describa brevemente el motivo de su consulta" />
                {errors.motivoConsulta && errors.motivoConsulta.message && (<p className="text-red-500 text-sm">{errors.motivoConsulta.message}</p>)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ocupacion">Ocupación</Label>
                <Input id="ocupacion" {...register("ocupacion")} placeholder="Ingrese su ocupación" />
                {errors.ocupacion && typeof errors.ocupacion.message === 'string' && (<p className="text-red-500 text-sm">{errors.ocupacion.message}</p>)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="estadoCivil">Estado Civil</Label>
                <Select onValueChange={(value) => register("estadoCivil").onChange({ target: { value } })}>
                  <SelectTrigger id="estadoCivil">
                    <SelectValue placeholder="Seleccione su estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero</SelectItem>
                    <SelectItem value="casado">Casado</SelectItem>
                    <SelectItem value="divorciado">Divorciado</SelectItem>
                    <SelectItem value="viudo">Viudo</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.estadoCivil && typeof errors.estadoCivil.message === 'string' && (<p className="text-red-500 text-sm">{errors.estadoCivil.message}</p>)}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tabaquismo">Tabaquismo</Label>
                  <Checkbox id="tabaquismo" {...register("tabaquismo")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alcoholismo">Alcohol</Label>
                  <Checkbox id="alcoholismo" {...register("alcoholismo")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drogas">Drogas</Label>
                  <Checkbox id="drogas" {...register("drogas")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ejercicio">Frecuencia de Ejercicio</Label>
                <Textarea id="ejercicio" {...register("ejercicio")} placeholder="Describa su frecuencia de ejercicio" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alimentacion">Hábitos Alimenticios</Label>
                <Textarea id="alimentacion" {...register("alimentacion")} placeholder="Describa sus hábitos alimenticios" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enfermedadesPrevias">Enfermedades Previas</Label>
                <Textarea id="enfermedadesPrevias" {...register("enfermedadesPrevias")} placeholder="Indique enfermedades previas" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cirugiasPrevias">Cirugías Previas</Label>
                <Textarea id="cirugiasPrevias" {...register("cirugiasPrevias")} placeholder="Indique cirugías previas" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alergias">Alergias</Label>
                <Textarea id="alergias" {...register("alergias")} placeholder="Indique sus alergias" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicamentosActuales">Medicamentos Actuales</Label>
                <Textarea id="medicamentosActuales" {...register("medicamentosActuales")} placeholder="Indique sus medicamentos actuales" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospitalizacionesPrevias">Hospitalizaciones Previas</Label>
                <Textarea id="hospitalizacionesPrevias" {...register("hospitalizacionesPrevias")} placeholder="Indique hospitalizaciones previas" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diabetes">Diabetes</Label>
                  <Checkbox id="diabetes" {...register("diabetes")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hipertension">Hipertensión</Label>
                  <Checkbox id="hipertension" {...register("hipertension")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardiopatias">Cardiopatías</Label>
                  <Checkbox id="cardiopatias" {...register("cardiopatias")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancer">Cáncer</Label>
                <Checkbox id="cancer" {...register("cancer")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otrosAntecedentes">Otros Antecedentes Familiares</Label>
                <Textarea id="otrosAntecedentes" {...register("otrosAntecedentes")} placeholder="Indique otros antecedentes familiares" />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Registrar Paciente"}
              </Button>
            </form>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-500">Sus datos estarán seguros y no serán compartidos con terceros.</p>
        </CardFooter>
      </Card>
      <canvas ref={canvasRef} style={{ display: 'none' }} width={450} height={300} />
    </div>
  )
}