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
      console.error("Error accediendo a la cámara:", err)
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
                      <DialogTitle>Capture su INE</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/2 p-6 border-r border-[#3B82F6]">
                        <div className="aspect-[3/2] bg-gray-200 rounded-lg overflow-hidden mb-4">
                          <img 
                            src="/placeholder.svg?height=300&width=450" 
                            alt="Ejemplo de INE" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-center text-gray-600">Ejemplo de INE</p>
                      </div>
                      <div className="w-full md:w-1/2 p-6">
                        {!isCameraActive && !capturedImage && (
                          <div className="flex items-center justify-center h-full">
                            <Button 
                              onClick={() => setIsCameraActive(true)}
                              className="bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                            >
                              <Camera className="mr-2 h-4 w-4" /> Activar Cámara
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
                              Capturar Foto
                            </Button>
                          </div>
                        )}
                        {capturedImage && (
                          <div className="relative aspect-[3/2] bg-black rounded-lg overflow-hidden mb-4">
                            <img 
                              src={capturedImage} 
                              alt="INE Capturada" 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                              <Button
                                onClick={retakePhoto}
                                className="bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                              >
                                <RotateCw className="mr-2 h-4 w-4" /> Reintentar
                              </Button>
                              {isFirstSide && (
                                <Button
                                  onClick={proceedToNextSide}
                                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                                >
                                  Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                        <canvas ref={canvasRef} className="hidden" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input id="nombre" placeholder="Juan Pérez" {...register("nombre")} />
                  {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                </div>

                <div>
                  <Label htmlFor="correo">Correo Electrónico</Label>
                  <Input id="correo" type="email" placeholder="juan@example.com" {...register("correo")} />
                  {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}
                </div>

                <div>
                  <Label htmlFor="edad">Edad</Label>
                  <Input id="edad" type="number" placeholder="30" {...register("edad")} />
                  {errors.edad && <p className="text-red-500 text-sm">{errors.edad.message}</p>}
                </div>

                <div>
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select {...register("sexo")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sexo && <p className="text-red-500 text-sm">{errors.sexo.message}</p>}
                </div>

                <div>
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input id="peso" type="number" placeholder="70" {...register("peso")} />
                  {errors.peso && <p className="text-red-500 text-sm">{errors.peso.message}</p>}
                </div>

                <div>
                  <Label htmlFor="altura">Altura (cm)</Label>
                  <Input id="altura" type="number" placeholder="170" {...register("altura")} />
                  {errors.altura && <p className="text-red-500 text-sm">{errors.altura.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="motivoConsulta">Motivo de la Consulta</Label>
                  <Textarea id="motivoConsulta" placeholder="Describe tu motivo para consultar" {...register("motivoConsulta")} />
                  {errors.motivoConsulta && <p className="text-red-500 text-sm">{errors.motivoConsulta.message}</p>}
                </div>

                <div>
                  <Label htmlFor="ocupacion">Ocupación</Label>
                  <Input id="ocupacion" placeholder="Ingeniero" {...register("ocupacion")} />
                  {errors.ocupacion && <p className="text-red-500 text-sm">{errors.ocupacion.message}</p>}
                </div>

                <div>
                  <Label htmlFor="estadoCivil">Estado Civil</Label>
                  <Select {...register("estadoCivil")}>
                    <SelectTrigger>
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
                  {errors.estadoCivil && <p className="text-red-500 text-sm">{errors.estadoCivil.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tabaquismo" {...register("tabaquismo")} />
                  <Label htmlFor="tabaquismo">Tabaquismo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="alcoholismo" {...register("alcoholismo")} />
                  <Label htmlFor="alcoholismo">Alcoholismo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="drogas" {...register("drogas")} />
                  <Label htmlFor="drogas">Consumo de Drogas</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ejercicio">Frecuencia de Ejercicio</Label>
                  <Input id="ejercicio" placeholder="3 veces por semana" {...register("ejercicio")} />
                  {errors.ejercicio && <p className="text-red-500 text-sm">{errors.ejercicio.message}</p>}
                </div>

                <div>
                  <Label htmlFor="alimentacion">Hábitos Alimenticios</Label>
                  <Input id="alimentacion" placeholder="Vegetariano" {...register("alimentacion")} />
                  {errors.alimentacion && <p className="text-red-500 text-sm">{errors.alimentacion.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="enfermedadesPrevias">Enfermedades Previas</Label>
                  <Textarea id="enfermedadesPrevias" placeholder="Diabetes, Asma, etc." {...register("enfermedadesPrevias")} />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="cirugiasPrevias">Cirugías Previas</Label>
                  <Textarea id="cirugiasPrevias" placeholder="Apendicitis, etc." {...register("cirugiasPrevias")} />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="alergias">Alergias</Label>
                  <Textarea id="alergias" placeholder="Polen, mariscos, etc." {...register("alergias")} />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="medicamentosActuales">Medicamentos Actuales</Label>
                  <Textarea id="medicamentosActuales" placeholder="Ibuprofeno, Insulina, etc." {...register("medicamentosActuales")} />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="hospitalizacionesPrevias">Hospitalizaciones Previas</Label>
                  <Textarea id="hospitalizacionesPrevias" placeholder="Accidente, etc." {...register("hospitalizacionesPrevias")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="diabetes" {...register("diabetes")} />
                  <Label htmlFor="diabetes">Diabetes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hipertension" {...register("hipertension")} />
                  <Label htmlFor="hipertension">Hipertensión</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cardiopatias" {...register("cardiopatias")} />
                  <Label htmlFor="cardiopatias">Cardiopatías</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cancer" {...register("cancer")} />
                  <Label htmlFor="cancer">Cáncer</Label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="otrosAntecedentes">Otros Antecedentes</Label>
                <Textarea id="otrosAntecedentes" placeholder="Otros antecedentes relevantes" {...register("otrosAntecedentes")} />
              </div>

              <CardFooter>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                  {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Registrar Paciente'}
                </Button>
              </CardFooter>
            </form>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
