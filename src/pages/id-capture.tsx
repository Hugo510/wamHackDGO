import React, { useState, useRef, useEffect } from 'react'
import { Camera, RotateCw, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function IDCapture() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isFirstSide, setIsFirstSide] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  return (
    <div className="min-h-screen bg-[#EFF6FF] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="p-6 bg-[#3B82F6] text-white text-center">
          <h1 className="text-2xl font-bold">Capture Your ID</h1>
          <p>{isFirstSide ? "Front Side" : "Back Side"}</p>
        </div>
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
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} width={450} height={300} />
    </div>
  )
}