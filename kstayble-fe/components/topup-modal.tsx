"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Loader2, DollarSign, Bitcoin, CreditCard } from "lucide-react"

interface TopUpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTopUpComplete: (amount: number, currency: string) => void
}

export function TopUpModal({ open, onOpenChange, onTopUpComplete }: TopUpModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'JPY'>('USD')
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock foreign currency balances
  const balances = {
    USD: 1250.00,
    EUR: 1100.50,
    JPY: 185000
  }

  const topUpAmounts = [
    { krw: 50000, usd: 38, eur: 35, jpy: 5400 },
    { krw: 100000, usd: 76, eur: 70, jpy: 10800 },
    { krw: 200000, usd: 152, eur: 140, jpy: 21600 },
    { krw: 500000, usd: 380, eur: 350, jpy: 54000 }
  ]

  const handleTopUp = async () => {
    console.log('handleTopUp called, selectedAmount:', selectedAmount)
    if (selectedAmount === null) {
      console.log('No amount selected, returning')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const amount = topUpAmounts[selectedAmount]
    console.log('Processing top up:', amount, selectedCurrency)
    onTopUpComplete(amount.krw, selectedCurrency)
    setIsProcessing(false)
    onOpenChange(false)
    setSelectedAmount(null)
  }

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD': return <DollarSign className="w-3 h-3 flex-shrink-0" />
      case 'EUR': return <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px] font-press font-bold flex-shrink-0">€</div>
      case 'JPY': return <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-press font-bold flex-shrink-0">¥</div>
      default: return <CreditCard className="w-3 h-3 flex-shrink-0" />
    }
  }

  const formatBalance = (currency: string) => {
    switch (currency) {
      case 'USD': return `$${balances.USD.toLocaleString()}`
      case 'EUR': return `€${balances.EUR.toLocaleString()}`
      case 'JPY': return `¥${balances.JPY.toLocaleString()}`
      default: return '0'
    }
  }

  const getAmountInCurrency = (index: number) => {
    const amount = topUpAmounts[index]
    switch (selectedCurrency) {
      case 'USD': return `$${amount.usd}`
      case 'EUR': return `€${amount.eur}`
      case 'JPY': return `¥${amount.jpy}`
      default: return '$0'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[75vw] !max-w-[280px] mx-auto bg-white border-2 border-black rounded-lg p-5 max-h-[85vh] overflow-y-auto" style={{ minWidth: 'unset', width: '75vw', maxWidth: '280px' }}>
        <DialogHeader className="pb-1">
          <DialogTitle className="text-center text-[10px] font-press font-bold text-black flex items-center justify-center gap-1">
            <ArrowUpDown className="w-2.5 h-2.5 text-primary" />
            Top Up KRW Wallet
          </DialogTitle>
          <p className="text-center text-[8px] font-press text-gray-600 mt-0.5">
            Convert your crypto to KRW
          </p>
        </DialogHeader>

        {!isProcessing ? (
          <div className="space-y-2">
            {/* Currency Selection */}
            <div>
              <h3 className="text-[9px] font-press font-semibold mb-1">Select Currency</h3>
              <div className="flex gap-1">
                {(['USD', 'EUR', 'JPY'] as const).map((currency) => (
                  <Button
                    key={currency}
                    variant={selectedCurrency === currency ? 'default' : 'outline'}
                    size="sm"
                    className={`flex-1 text-[8px] font-press py-0.5 px-0.5 min-w-0 ${
                      selectedCurrency === currency 
                        ? 'bg-primary text-black hover:bg-primary/80' 
                        : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => setSelectedCurrency(currency)}
                  >
                    <span className="truncate">{getCurrencyIcon(currency)}</span>
                    <span className="ml-0.5 truncate">{currency}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Balance Display */}
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[8px] font-press text-gray-600">Available Balance:</span>
                  <span className="text-[9px] font-press font-semibold truncate">{formatBalance(selectedCurrency)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Amount Selection */}
            <div>
              <h3 className="text-[9px] font-press font-semibold mb-1">Select Amount</h3>
              <div className="grid grid-cols-2 gap-1">
                {topUpAmounts.map((amount, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedAmount === index 
                        ? 'border-2 border-primary bg-primary/10' 
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      console.log('Amount selected:', index, amount)
                      setSelectedAmount(index)
                    }}
                  >
                    <CardContent className="p-1 text-center">
                      <p className="text-[9px] font-press font-semibold leading-tight">₩{amount.krw.toLocaleString()}</p>
                      <p className="text-[8px] font-press text-gray-600 leading-tight">{getAmountInCurrency(index)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedAmount !== null && (
              <Card className="bg-primary/10 border-2 border-primary">
                <CardContent className="p-1">
                  <div className="text-center">
                    <p className="text-[8px] font-press text-gray-600">You will receive:</p>
                    <p className="text-xs font-press font-bold text-black leading-tight">₩{topUpAmounts[selectedAmount].krw.toLocaleString()}</p>
                    <p className="text-[8px] font-press text-gray-600 leading-tight">
                      From {getAmountInCurrency(selectedAmount)} {selectedCurrency}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-1">
              <Button
                onClick={handleTopUp}
                disabled={selectedAmount === null}
                className={`w-full py-1 text-[9px] font-press font-semibold rounded-lg ${
                  selectedAmount === null 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300' 
                    : 'bg-black hover:bg-gray-800 text-white border border-primary hover:border-primary/80'
                }`}
              >
                {selectedAmount === null ? 'Select Amount First' : 'Confirm Top Up'}
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="w-full border-black text-black hover:bg-gray-100 py-1 text-[9px] font-press font-semibold rounded-lg"
              >
                Cancel
              </Button>
            </div>

            <div className="text-center">
              <p className="text-[8px] font-press text-gray-500">
                🔄 Powered by MemeCore Network technology
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2 py-2">
            <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="font-press font-semibold text-[10px] mb-0.5">Processing Transaction...</h3>
              <p className="text-[8px] font-press text-gray-600">Converting {selectedCurrency} to KRW on blockchain</p>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[8px] font-press text-gray-500">
                <div className="w-0.5 h-0.5 bg-primary rounded-full animate-pulse"></div>
                Confirming transaction
              </div>
              <div className="flex items-center justify-center gap-1 text-[8px] font-press text-gray-500">
                <div className="w-0.5 h-0.5 bg-primary rounded-full animate-pulse"></div>
                MemeCore Network processing
              </div>
              <div className="flex items-center justify-center gap-1 text-[8px] font-press text-gray-400">
                <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                Updating KRW balance
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
