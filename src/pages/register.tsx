"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, ScanLine, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from '@/hooks/use-toast'
import { ScrollArea } from "@/components/ui/scroll-area"

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  curp: z.string().length(18, { message: "La CURP debe tener 18 caracteres" }),
  edad: z.number().min(0).max(120, { message: "La edad debe estar entre 0 y 120 años" }),
  sexo: z.enum(["masculino", "femenino", "otro"]),
  peso: z.number().min(0, { message: "El peso no puede ser negativo" }),
  altura: z.number().min(0, { message: "La altura no puede ser negativa" }),
  motivoConsulta: z.string().min(10, { message: "Por favor, proporcione más detalles sobre el motivo de la consulta" }),
  antecedentesNoPatologicos: z.string(),
  antecedentesPatologicos: z.string(),
  antecedentesFamiliares: z.string()
})

export default function FormularioPaciente() {
  const [usarINE, setUsarINE] = useState(false)
  const [escuchando, setEscuchando] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema)
  })

  const escanearINE = () => {
    console.log("Escaneando INE...")
    setUsarINE(true)
    toast({
      title: "INE Escaneada",
      description: "La información de su INE ha sido capturada exitosamente.",
    })
  }

  const toggleEscucha = () => {
    setEscuchando(!escuchando)
    if (!escuchando) {
      toast({
        title: "Escucha Activada",
        description: "Puede comenzar a dictar la información del paciente.",
      })
    } else {
      toast({
        title: "Escucha Desactivada",
        description: "Se ha detenido la captura de voz.",
      })
    }
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
              <div className="flex justify-between items-center">
                <Button type="button" onClick={escanearINE} className="flex items-center bg-blue-500 hover:bg-blue-600">
                  <ScanLine className="mr-2 h-4 w-4" />
                  {usarINE ? 'INE Escaneada' : 'Escanear INE'}
                </Button>
                <Button 
                  type="button" 
                  onClick={toggleEscucha} 
                  className={`flex items-center ${escuchando ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  {escuchando ? 'Detener Escucha' : 'Iniciar Escucha'}
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input id="nombre" {...register("nombre")} placeholder="Ingrese su nombre completo" />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="curp">CURP</Label>
                <Input id="curp" {...register("curp")} placeholder="Ingrese su CURP" />
                {errors.curp && <p className="text-red-500 text-sm">{errors.curp.message}</p>}
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
                {errors.sexo && <p className="text-red-500 text-sm">{errors.sexo.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input id="peso" type="number" {...register("peso", { valueAsNumber: true })} placeholder="Ingrese su peso" />
                {errors.peso && <p className="text-red-500 text-sm">{errors.peso.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="altura">Altura (cm)</Label>
                <Input id="altura" type="number" {...register("altura", { valueAsNumber: true })} placeholder="Ingrese su altura" />
                {errors.altura && <p className="text-red-500 text-sm">{errors.altura.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivoConsulta">Motivo de Consulta</Label>
                <Textarea id="motivoConsulta" {...register("motivoConsulta")} placeholder="Describa brevemente el motivo de su consulta" />
                {errors.motivoConsulta && <p className="text-red-500 text-sm">{errors.motivoConsulta.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="antecedentesNoPatologicos">Antecedentes Personales No Patológicos</Label>
                <Textarea id="antecedentesNoPatologicos" {...register("antecedentesNoPatologicos")} placeholder="Ingrese sus antecedentes no patológicos" />
                {errors.antecedentesNoPatologicos && <p className="text-red-500 text-sm">{errors.antecedentesNoPatologicos.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="antecedentesPatologicos">Antecedentes Personales Patológicos</Label>
                <Textarea id="antecedentesPatologicos" {...register("antecedentesPatologicos")} placeholder="Ingrese sus antecedentes patológicos" />
                {errors.antecedentesPatologicos && <p className="text-red-500 text-sm">{errors.antecedentesPatologicos.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="antecedentesFamiliares">Antecedentes Heredo Familiares</Label>
                <Textarea id="antecedentesFamiliares" {...register("antecedentesFamiliares")} placeholder="Ingrese los antecedentes de su familia" />
                {errors.antecedentesFamiliares && <p className="text-red-500 text-sm">{errors.antecedentesFamiliares.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600">
                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : 'Registrar Paciente'}
              </Button>
            </form>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Gracias por confiar en nuestro servicio médico.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
