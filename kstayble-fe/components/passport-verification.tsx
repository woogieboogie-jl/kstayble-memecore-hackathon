"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Check, X, Loader2, FileText, Shield } from "lucide-react"

interface PassportVerificationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerificationComplete: (verified: boolean) => void
}

export function PassportVerification({ open, onOpenChange, onVerificationComplete }: PassportVerificationProps) {
  const [step, setStep] = useState<'upload' | 'scanning' | 'processing' | 'result'>('upload')
  const [isProcessing, setIsProcessing] = useState(false)
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null)

  const handlePassportScan = async () => {
    setStep('scanning')
    setIsProcessing(true)
    
    // Simulate camera scanning
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setStep('processing')
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock verification result (90% success rate)
    const success = Math.random() > 0.1
    setVerificationResult(success ? 'success' : 'failed')
    setStep('result')
    setIsProcessing(false)
    
    if (success) {
      onVerificationComplete(true)
    }
  }

  const handleFileUpload = async () => {
    setStep('processing')
    setIsProcessing(true)
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    // Mock verification result
    const success = Math.random() > 0.2
    setVerificationResult(success ? 'success' : 'failed')
    setStep('result')
    setIsProcessing(false)
    
    if (success) {
      onVerificationComplete(true)
    }
  }

  const handleClose = () => {
    setStep('upload')
    setVerificationResult(null)
    setIsProcessing(false)
    onOpenChange(false)
  }

  const handleRetry = () => {
    setStep('upload')
    setVerificationResult(null)
    setIsProcessing(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="!w-[75vw] !max-w-[280px] mx-auto bg-white border-2 border-black rounded-lg p-5 max-h-[70vh] overflow-y-auto" style={{ minWidth: 'unset', width: '75vw', maxWidth: '280px' }}>
        <DialogHeader className="pb-1.5">
          <DialogTitle className="text-center text-[10px] font-press font-bold text-black flex items-center justify-center gap-1">
            <Shield className="w-2.5 h-2.5 text-primary" />
            Passport Verification
          </DialogTitle>
          <p className="text-center text-[8px] font-press text-gray-600 mt-0.5">
            Verify your foreign status to enable KRW transactions
          </p>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-2">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-press font-semibold text-[10px] mb-0.5">Scan Your Passport</h3>
              <p className="text-[8px] font-press text-gray-600 mb-2">
                We need to verify your foreign passport to comply with Korean financial regulations.
              </p>
            </div>

            <div className="space-y-1.5">
              <Card className="border-2 border-primary hover:bg-primary/10 transition-colors cursor-pointer" onClick={handlePassportScan}>
                <CardContent className="p-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-press font-semibold text-[9px]">Scan with Camera</h4>
                    <p className="text-[8px] font-press text-gray-600">Take a photo of your passport</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleFileUpload}>
                <CardContent className="p-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Upload className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-press font-semibold text-[9px]">Upload File</h4>
                    <p className="text-[8px] font-press text-gray-600">Select passport image from device</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-[8px] font-press text-gray-500">
                🔒 Your passport data is encrypted and processed securely
              </p>
            </div>
          </div>
        )}

        {step === 'scanning' && (
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-black rounded-xl mx-auto flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary opacity-20"></div>
              <div className="absolute inset-2 border-2 border-primary rounded-lg animate-pulse"></div>
              <Camera className="w-6 h-6 text-primary z-10" />
            </div>
            <div>
              <h3 className="font-press font-semibold text-[10px] mb-0.5">Scanning Passport...</h3>
              <p className="text-[8px] font-press text-gray-600">Position your passport within the frame</p>
            </div>
            <div className="flex justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="font-press font-semibold text-[10px] mb-0.5">Processing Document...</h3>
              <p className="text-[8px] font-press text-gray-600">AI is verifying your passport authenticity</p>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[8px] font-press text-gray-500">
                <div className="w-0.5 h-0.5 bg-primary rounded-full"></div>
                Extracting passport data
              </div>
              <div className="flex items-center justify-center gap-1 text-[8px] font-press text-gray-500">
                <div className="w-0.5 h-0.5 bg-primary rounded-full animate-pulse"></div>
                Verifying authenticity
              </div>
              <div className="flex items-center justify-center gap-1 text-[8px] font-press text-gray-400">
                <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                Cross-checking databases
              </div>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="text-center space-y-2">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              verificationResult === 'success' ? 'bg-primary/10' : 'bg-red-100'
            }`}>
              {verificationResult === 'success' ? (
                <Check className="w-8 h-8 text-primary" />
              ) : (
                <X className="w-8 h-8 text-red-600" />
              )}
            </div>
            
            <div>
              <h3 className={`font-press font-semibold text-[10px] mb-0.5 ${
                verificationResult === 'success' ? 'text-primary' : 'text-red-800'
              }`}>
                {verificationResult === 'success' ? 'Verification Successful!' : 'Verification Failed'}
              </h3>
              <p className="text-[8px] font-press text-gray-600">
                {verificationResult === 'success' 
                  ? 'Your foreign status has been verified. You can now make KRW transactions.'
                  : 'Unable to verify your passport. Please try again with a clearer image.'}
              </p>
            </div>

            {verificationResult === 'success' && (
              <Badge className="bg-primary/10 text-primary px-1.5 py-0.5 text-[8px] font-press">
                ✅ Verified Foreign Visitor
              </Badge>
            )}

            <div className="space-y-1.5">
              {verificationResult === 'failed' && (
                <Button
                  onClick={handleRetry}
                  className="w-full bg-black hover:bg-gray-800 text-white border border-primary py-1 text-[9px] font-press font-semibold"
                >
                  Try Again
                </Button>
              )}
              <Button
                onClick={handleClose}
                variant="outline"
                className="w-full border-black text-black hover:bg-gray-100 py-1 text-[9px] font-press font-semibold"
              >
                {verificationResult === 'success' ? 'Continue' : 'Close'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
