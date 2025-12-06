"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Loader2 } from "lucide-react"

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMemeCoreConnect: () => Promise<void>
}

export function LoginModal({ open, onOpenChange, onMemeCoreConnect }: LoginModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null)

  const handleMemeCoreConnect = async () => {
    setIsConnecting(true)
    setConnectingProvider('memecore')
    try {
      await onMemeCoreConnect()
      onOpenChange(false)
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setIsConnecting(false)
      setConnectingProvider(null)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setConnectingProvider(provider)
    // Mock delay for social login (UI only)
    setTimeout(() => {
      alert(`${provider} login is demo-only. Please use MemeCore Wallet (MetaMask) for functional connection.`)
      setConnectingProvider(null)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[75vw] !max-w-[280px] mx-auto bg-white border-2 border-black rounded-lg p-5 max-h-[85vh] overflow-y-auto" style={{ minWidth: 'unset', width: '75vw', maxWidth: '280px' }}>
        <DialogHeader className="pb-1">
          <DialogTitle className="text-center text-[10px] font-press font-bold text-black">
            Connect to KStayble Wallet
          </DialogTitle>
          <p className="text-center text-[8px] font-press text-gray-600 mt-0.5">
            Connect your wallet or sign in
          </p>
        </DialogHeader>

        <div className="space-y-1.5">
          {/* MemeCore Wallet - Functional */}
          <Card className="border-2 border-primary hover:bg-primary/10 transition-colors">
            <CardContent className="p-1.5">
              <Button
                onClick={handleMemeCoreConnect}
                disabled={isConnecting}
                className="w-full bg-black hover:bg-gray-800 text-white border border-primary py-1 text-[9px] font-press font-semibold rounded-lg flex items-center justify-center gap-1"
              >
                {isConnecting && connectingProvider === 'memecore' ? (
                  <Loader2 className="w-2 h-2 animate-spin flex-shrink-0" />
                ) : (
                  <Wallet className="w-2 h-2 flex-shrink-0" />
                )}
                <span className="truncate">Connect MemeCore Wallet</span>
              </Button>
              <p className="text-[8px] font-press text-center text-gray-600 mt-0.5">
                ✅ Functional
              </p>
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-[8px] font-press uppercase">
              <span className="bg-white px-1 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons - Demo Only */}
          <div className="space-y-1.5">
            {/* Google */}
            <Button
              onClick={() => handleSocialLogin('Google')}
              disabled={connectingProvider === 'google'}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:bg-gray-50 py-1 text-[9px] font-press font-medium rounded-lg flex items-center justify-center gap-1"
            >
              {connectingProvider === 'google' ? (
                <Loader2 className="w-2 h-2 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-2 h-2 bg-red-500 rounded-full flex items-center justify-center text-white text-[7px] font-press font-bold flex-shrink-0">
                  G
                </div>
              )}
              <span className="truncate">Google</span>
            </Button>

            {/* Kakao */}
            <Button
              onClick={() => handleSocialLogin('Kakao')}
              disabled={connectingProvider === 'kakao'}
              variant="outline"
              className="w-full border-2 border-yellow-300 hover:bg-yellow-50 py-1 text-[9px] font-press font-medium rounded-lg flex items-center justify-center gap-1"
            >
              {connectingProvider === 'kakao' ? (
                <Loader2 className="w-2 h-2 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-2 h-2 bg-yellow-400 rounded flex items-center justify-center text-black text-[7px] font-press font-bold flex-shrink-0">
                  K
                </div>
              )}
              <span className="truncate">Continue with Kakao</span>
            </Button>

            {/* Naver */}
            <Button
              onClick={() => handleSocialLogin('Naver')}
              disabled={connectingProvider === 'naver'}
              variant="outline"
              className="w-full border-2 border-primary/40 hover:bg-primary/10 py-1 text-[9px] font-press font-medium rounded-lg flex items-center justify-center gap-1"
            >
              {connectingProvider === 'naver' ? (
                <Loader2 className="w-2 h-2 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-2 h-2 bg-primary rounded flex items-center justify-center text-white text-[7px] font-press font-bold flex-shrink-0">
                  N
                </div>
              )}
              <span className="truncate">Continue with Naver</span>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-[8px] font-press text-gray-500 leading-tight">
              🎭 Social logins are demo-only. Use MemeCore Wallet (MetaMask) for full functionality.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
