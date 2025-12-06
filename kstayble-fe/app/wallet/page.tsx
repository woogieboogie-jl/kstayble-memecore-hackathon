"use client"

import { ArrowLeft, Bell, MoreHorizontal, Send, Download, ExternalLink, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Link from "next/link"
import { useWallet } from "@/hooks/use-wallet"
import { QRCode } from "@/components/qr-code"
import { TopUpModal } from "@/components/topup-modal"

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [showReceiveModal, setShowReceiveModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  
  const { wallet, mockTransaction } = useWallet()

  const handleTopUpComplete = async (amount: number, currency: string) => {
    console.log('Wallet page top-up initiated:', { amount, currency, currentBalance: wallet.balance })
    try {
      // Mock adding the amount to wallet balance
      await mockTransaction('receive', amount.toString())
      console.log('Wallet page top-up completed, new balance should be:', wallet.balance)
    } catch (error) {
      console.error('Wallet page top-up failed:', error)
    }
  }

  // Convert KRW to USD for display (approximate rate: 1 USD = 1300 KRW)
  const getUSDEquivalent = (krwBalance: string) => {
    const krwAmount = parseFloat(krwBalance.replace(/[₩,]/g, ''))
    const usdAmount = krwAmount / 1300
    return `$${usdAmount.toFixed(2)} USD`
  }

  const transactions = [
    {
      id: 1,
      name: "OLIVE YONG",
      date: "2023/07/23",
      time: "19:34 AM",
      amount: "-₩127,273",
      icon: "🛒",
      color: "bg-primary/10",
      txHash: "0x17c8b10c5c2142a854c869709fac7f47465e79e3ef1c11a0c6bac4f6f5c291e6",
    },
    {
      id: 2,
      name: "Baedal Minjok",
      date: "2023/07/23",
      time: "18:24 PM",
      amount: "-₩55,898",
      icon: "🛵",
      color: "bg-blue-100",
      txHash: "0xa8f2d9c7b4e1f6a3c8d5e9f2a7b4c1d8e5f2a9c6b3d0e7f4a1b8c5d2e9f6a3c0",
    },
    {
      id: 3,
      name: "National Museum Of Korea",
      date: "2023/07/23",
      time: "11:30 AM",
      amount: "-₩113,887",
      icon: "🏛️",
      color: "bg-gray-100",
      txHash: "0x3f7a8d2e9c6b1f4a7d0e3c6f9a2d5e8b1c4f7a0d3e6c9b2f5a8d1e4c7f0a3d6",
    },
  ]

  return (
    <div className="min-h-screen bg-[#ece9f7]">
      <div className="max-w-sm mx-auto bg-white border border-border shadow-md rounded-2xl">
        {/* Header */}
        <header className="flex items-center justify-between p-4 pt-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xs font-press font-semibold">Wallet</h1>
          <div className="flex items-center gap-3">
            <Link href="/alerts">
              <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            </Link>
            <Link href="/profile">
              <Avatar className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src="/abstract-profile.png" />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Wallet Balance Card */}
        <div className="mx-4 mb-6">
          <Card className="bg-black text-white border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50"></div>
            <CardContent className="py-2 px-3 relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[9px] font-press text-gray-400 whitespace-nowrap">WEB3 WALLET</p>
              </div>
              <div className="mb-2 min-w-0">
                <p className="text-lg font-press font-bold mb-1 truncate">{showBalance ? wallet.balance : "₩•••,•••"}</p>
                <p className="text-[9px] font-press text-gray-400 truncate">{showBalance ? getUSDEquivalent(wallet.balance) : "$•••.•• USD"}</p>
              </div>
              <div className="flex gap-1 min-w-0">
                <Button
                  className="flex-1 min-w-0 bg-primary text-black hover:bg-primary/80 font-press font-semibold text-[9px] py-1 px-1"
                  onClick={() => setShowSendModal(true)}
                >
                  <Send className="w-2 h-2 mr-0.5 flex-shrink-0" />
                  <span className="truncate">Send</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 min-w-0 border-primary text-primary hover:bg-primary hover:text-black bg-transparent font-press font-semibold text-[9px] py-1 px-1"
                  onClick={() => setShowReceiveModal(true)}
                >
                  <Download className="w-2 h-2 mr-0.5 flex-shrink-0" />
                  <span className="truncate">Receive</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 min-w-0 border-white text-black bg-white hover:bg-black hover:text-white hover:border-white font-press font-semibold text-[9px] py-1 px-1 transition-colors duration-200"
                  onClick={() => setShowTopUpModal(true)}
                >
                  <ArrowUpDown className="w-2 h-2 mr-0.5 flex-shrink-0" />
                  <span className="truncate">Top Up</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Last Transactions */}
        <div className="mx-4 mb-6">
          <h2 className="text-xs font-press font-semibold mb-3">Last Transactions</h2>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="border-0 shadow-sm">
                <CardContent className="py-2 px-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${transaction.color} rounded-full flex items-center justify-center text-sm`}
                    >
                      {transaction.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-press font-semibold text-[10px] leading-tight">{transaction.name}</h3>
                      <p className="text-[9px] font-press text-muted-foreground leading-tight">
                        {transaction.date} | {transaction.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-press font-semibold text-[10px] leading-tight">{transaction.amount}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto"
                        onClick={() => window.open(`https://insectarium.blockscout.memecore.com/tx/${transaction.txHash}`, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* T-Money Section */}
        <div className="mx-4 mb-20">
          <Card className="bg-blue-50 border-0">
            <CardContent className="py-2 px-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-press font-semibold text-[10px]">T-Money</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm">🚇</div>
                <div className="flex-1">
                  <h4 className="font-press font-medium text-[10px] leading-tight">Buy & Subway</h4>
                  <div className="w-12 h-0.5 bg-black rounded-full mt-0.5"></div>
                </div>
                <span className="text-xs font-medium">30day</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50">
          <div className="bg-black mx-4 mb-4 rounded-2xl p-4">
            <div className="flex items-center justify-around">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <Link href="/alerts">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <Bell className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Receive Modal */}
      <Dialog open={showReceiveModal} onOpenChange={setShowReceiveModal}>
        <DialogContent className="!w-[75vw] !max-w-[280px] mx-auto bg-white border-2 border-black rounded-lg p-5" style={{ minWidth: 'unset', width: '75vw', maxWidth: '280px' }}>
          <DialogHeader className="pb-0.5">
            <DialogTitle className="text-center text-[10px] font-press font-bold text-black">Receive Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-1">
            <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center p-1">
              {wallet.address ? (
                <QRCode value={wallet.address} size={96} className="border-primary" />
              ) : (
                <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-black rounded flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-0.5">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className={`w-0.5 h-0.5 ${Math.random() > 0.5 ? "bg-primary" : "bg-black"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-press font-bold text-[10px] text-black">{wallet.balance}</p>
              <p className="text-[8px] font-press text-gray-600">
                {wallet.address ? `Address: ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : "Connect wallet to show address"}
              </p>
            </div>
            <div className="w-full space-y-1">
              <Button className="w-full bg-black hover:bg-gray-900 text-white border border-primary py-1 text-[9px] font-press font-semibold rounded-lg">
                Share QR
              </Button>
              <Button
                variant="outline"
                className="w-full border border-black text-black hover:bg-gray-100 py-1 text-[9px] font-press font-semibold rounded-lg bg-transparent"
                onClick={() => setShowReceiveModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Updated Send Modal */}
      <Dialog open={showSendModal} onOpenChange={setShowSendModal}>
        <DialogContent className="!w-[75vw] !max-w-[280px] mx-auto bg-white border-2 border-black rounded-lg p-5" style={{ minWidth: 'unset', width: '75vw', maxWidth: '280px' }}>
          <DialogHeader className="pb-0.5">
            <DialogTitle className="text-center text-[10px] font-press font-bold text-black">Send Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-1">
            <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-gray-400 rounded-lg mx-auto mb-0.5 flex items-center justify-center">
                  <div className="w-5 h-5 border border-gray-400 rounded"></div>
                </div>
                <p className="text-[8px] font-press text-gray-600 font-medium">Scan QR code</p>
              </div>
            </div>
            <div className="text-center">
              <p className="font-press font-bold text-[10px] text-black">Available: ₩1,520,768</p>
              <p className="text-[8px] font-press text-gray-600">Ready to scan and send</p>
            </div>
            <div className="w-full space-y-1">
              <Button className="w-full bg-black hover:bg-gray-900 text-white border border-primary py-1 text-[9px] font-press font-semibold rounded-lg">
                Camera
              </Button>
              <Button
                variant="outline"
                className="w-full border border-black text-black hover:bg-gray-100 py-1 text-[9px] font-press font-semibold rounded-lg bg-transparent"
                onClick={() => setShowSendModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
                  </DialogContent>
        </Dialog>

        {/* Top Up Modal */}
        <TopUpModal
          open={showTopUpModal}
          onOpenChange={setShowTopUpModal}
          onTopUpComplete={handleTopUpComplete}
        />
      </div>
    )
}
