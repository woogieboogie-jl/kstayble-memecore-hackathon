"use client"

import {
  Bell,
  Home,
  Wallet,
  User,
  CreditCard,
  Car,
  Heart,
  Gamepad2,
  QrCode,
  Star,
  Send,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Link from "next/link"
import { useWallet } from "@/hooks/use-wallet"
import { LoginModal } from "@/components/login-modal"
import { TopUpModal } from "@/components/topup-modal"

export default function KoreanCryptoWallet() {
  const [showReceiveModal, setShowReceiveModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const [activeTab, setActiveTab] = useState("food")
  const [scrollPosition, setScrollPosition] = useState(0)
  
  const { wallet, connectMemeCoreWallet, disconnect, mockTransaction } = useWallet()

  const handleTopUpComplete = async (amount: number, currency: string) => {
    console.log('Top-up initiated:', { amount, currency, currentBalance: wallet.balance })
    try {
      // Mock adding the amount to wallet balance
      await mockTransaction('receive', amount.toString())
      console.log('Top-up completed, new balance should be:', wallet.balance)
    } catch (error) {
      console.error('Top-up failed:', error)
    }
  }

  const foodItems = [
    {
      id: 1,
      name: "Korean chicken",
      location: "Seodaemun-gu, Seoul",
      price: "₩65,000",
      time: "30min",
      rating: 4.9,
      image: "/korean-fried-chicken.png",
      url: "https://www.baemin.com/",
    },
    {
      id: 2,
      name: "Tteokbokki",
      location: "Seoul",
      price: "₩32,500",
      time: "20min",
      rating: 4.7,
      image: "/korean-tteokbokki.png",
      url: "https://www.yogiyo.co.kr/",
    },
    {
      id: 3,
      name: "Ssamgyeopsal",
      location: "Pyeong-Chang, Gangwondo",
      price: "₩48,000",
      time: "230min",
      rating: 2.8,
      image: "/placeholder-j9gan.png",
      url: "https://www.baemin.com/",
    },
    {
      id: 4,
      name: "Bibimbap",
      location: "Jongno-gu, Seoul",
      price: "₩28,000",
      time: "25min",
      rating: 4.6,
      image: "/korean-bibimbap.png",
      url: "https://www.coupangeats.com/",
    },
    {
      id: 5,
      name: "Kimchi Jjigae",
      location: "Gangnam-gu, Seoul",
      price: "₩22,000",
      time: "35min",
      rating: 4.4,
      image: "/korean-kimchi-stew.png",
      url: "https://www.yogiyo.co.kr/",
    },
    {
      id: 6,
      name: "Bulgogi",
      location: "Itaewon, Seoul",
      price: "₩55,000",
      time: "40min",
      rating: 4.8,
      image: "/korean-bulgogi.png",
      url: "https://www.baemin.com/",
    },
  ]

  const shoppingItems = [
    {
      id: 1,
      name: "K-Beauty Set",
      location: "Myeongdong, Seoul",
      price: "₩85,000",
      time: "1 day",
      rating: 4.9,
      image: "/placeholder-mh6gw.png",
    },
    {
      id: 2,
      name: "Hanbok Rental",
      location: "Bukchon, Seoul",
      price: "₩45,000",
      time: "4 hours",
      rating: 4.7,
      image: "/traditional-korean-hanbok.png",
    },
    {
      id: 3,
      name: "K-Pop Merchandise",
      location: "Hongdae, Seoul",
      price: "₩35,000",
      time: "2 hours",
      rating: 4.8,
      image: "/korean-pop-merchandise.png",
    },
    {
      id: 4,
      name: "Korean Tea Set",
      location: "Insadong, Seoul",
      price: "₩120,000",
      time: "3 hours",
      rating: 4.5,
      image: "/korean-tea-ceremony.png",
    },
  ]

  const medicalItems = [
    {
      id: 1,
      name: "Health Checkup",
      location: "Gangnam Medical Center",
      price: "₩180,000",
      time: "2 hours",
      rating: 4.9,
      image: "/medical-health-checkup.png",
    },
    {
      id: 2,
      name: "Dental Cleaning",
      location: "Seoul Dental Clinic",
      price: "₩95,000",
      time: "1 hour",
      rating: 4.6,
      image: "/dental-cleaning-teeth-care.png",
    },
    {
      id: 3,
      name: "Eye Examination",
      location: "Vision Care Seoul",
      price: "₩65,000",
      time: "45min",
      rating: 4.7,
      image: "/placeholder.svg?height=64&width=160",
    },
    {
      id: 4,
      name: "Skin Treatment",
      location: "K-Beauty Clinic",
      price: "₩250,000",
      time: "90min",
      rating: 4.8,
      image: "/placeholder.svg?height=64&width=160",
    },
  ]

  const getCurrentItems = () => {
    switch (activeTab) {
      case "food":
        return foodItems
      case "shopping":
        return shoppingItems
      case "medical":
        return medicalItems
      default:
        return foodItems
    }
  }

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1))
  }

  const scrollRight = () => {
    const maxScroll = Math.max(0, getCurrentItems().length - 2)
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1))
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setScrollPosition(0)
  }

  return (
    <div className="min-h-screen bg-[#ece9f7]">
      {/* Mobile Container */}
      <div className="max-w-sm mx-auto bg-white border border-border shadow-md rounded-2xl">
        {/* Header */}
        <header className="flex items-center justify-between p-3 pt-8">
          <div className="flex items-center gap-2">
            <span className="text-xl">👋</span>
            <span className="font-press text-xs text-foreground">
              {wallet.isConnected ? `Hello, ${wallet.address?.slice(0, 6)}...` : "Hello, Guest"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {wallet.isConnected ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnect}
                className="text-red-600 hover:bg-red-50 p-1"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLoginModal(true)}
                className="text-primary hover:bg-primary/10 p-1"
              >
                <LogIn className="w-4 h-4" />
              </Button>
            )}
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

        {/* Promotional Banner */}
        <div className="mx-4 mb-4">
          <Card
            className="bg-black border-0 cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden"
            onClick={() => window.open('https://ticket.yes24.com/Perf/54907?Gcode=009_217_001', '_blank')}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{
                backgroundImage: "url('/memecore_banner_wide.jpeg')",
              }}
            />
            <CardContent className="p-1 flex items-center gap-3 relative z-10">
              <img src="/placeholder-logo.png" alt="Magpie & Tiger Badge" className="w-8 h-8 rounded" />
              <div className="flex-1">
                <p className="text-xs font-press text-white">MemeCore Island</p>
                <p className="text-[10px] font-press text-gray-200">Travel + memes in one place</p>
              </div>
            </CardContent>
          </Card>
        </div>



        {/* Wallet Balance */}
        <div className="mx-4 mb-4 flex gap-2">
          <Link href="/wallet" className="flex-1">
            <Card className="flex-1 bg-black text-white border-0 cursor-pointer hover:bg-gray-900 hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl h-[108px]">
              <CardContent className="py-1.5 px-3 h-full flex flex-col justify-center">
                <p className="text-[10px] font-press text-gray-400 mb-1">Web3 Wallet</p>
                <p className="text-sm font-press font-bold mb-1">{wallet.balance}</p>
                <p className="text-[10px] font-press text-gray-400">{(() => {
                  const krwAmount = parseFloat(wallet.balance.replace(/[₩,]/g, ''))
                  const usdAmount = krwAmount / 1300
                  return `$${usdAmount.toFixed(2)} USD`
                })()}</p>
              </CardContent>
            </Card>
          </Link>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setShowReceiveModal(true)}
              className="w-16 h-[53px] bg-black hover:bg-gray-900 border border-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              variant="ghost"
            >
              <QrCode className="w-6 h-6 text-primary" />
            </Button>
            <Button
              onClick={() => setShowSendModal(true)}
              className="w-16 h-[53px] bg-black hover:bg-gray-900 border border-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              variant="ghost"
            >
              <Send className="w-6 h-6 text-primary" />
            </Button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="mx-4 mb-4">
          <div className="grid grid-cols-4 gap-3">
            <div 
              className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setShowTopUpModal(true)}
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center hover:bg-orange-200 transition-colors duration-200">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-[11px] text-muted-foreground font-press">Top up</span>
            </div>
            <div 
              className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => window.open('https://www.socar.kr/', '_blank')}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors duration-200">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <span className="text-[11px] font-press text-muted-foreground">Mobility</span>
            </div>
            <div 
              className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => window.open('https://www.mohw.go.kr/', '_blank')}
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center hover:bg-red-200 transition-colors duration-200">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-[11px] text-muted-foreground font-press">Medical</span>
            </div>
            <div 
              className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => window.open('https://superwalk.io/', '_blank')}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-200">
                <Gamepad2 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-[11px] font-press text-muted-foreground">Travel game</span>
            </div>
          </div>
        </div>

        {/* Service Tabs */}
        <div className="mx-4 mb-3">
          <div className="flex gap-6">
            <div
              className={`relative cursor-pointer ${activeTab === "food" ? "" : "text-muted-foreground"}`}
              onClick={() => handleTabChange("food")}
            >
              <span className="text-[10px] font-press font-semibold">Food Delivery</span>
              {activeTab === "food" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              )}
            </div>
            <div
              className={`relative cursor-pointer ${activeTab === "shopping" ? "text-foreground" : "text-muted-foreground"}`}
              onClick={() => handleTabChange("shopping")}
            >
              <span className="text-[10px] font-press font-semibold">Shopping</span>
              {activeTab === "shopping" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              )}
            </div>
            <div
              className={`relative cursor-pointer ${activeTab === "medical" ? "text-foreground" : "text-muted-foreground"}`}
              onClick={() => handleTabChange("medical")}
            >
              <span className="text-[10px] font-press font-semibold">Medical</span>
              {activeTab === "medical" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-4 mb-4">
          <div className="relative">
            {/* Carousel Content */}
            <div className="overflow-hidden relative">
              <div
                className="flex gap-3 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${scrollPosition * 50}%)` }}
              >
                {getCurrentItems().map((item) => (
                  <Card 
                    key={item.id} 
                    className="border-0 shadow-sm flex-shrink-0 w-[calc(50%-6px)] cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                    onClick={() => (item as any).url && window.open((item as any).url, '_blank')}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-16 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          {item.rating}
                        </Badge>
                      </div>
                      <div className="px-1 py-0.5">
                        <h3 className="font-press font-semibold text-[10px] mb-1">{item.name}</h3>
                        <p className="text-[9px] font-press text-muted-foreground mb-1">📍 {item.location}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-press font-bold text-[10px]">{item.price}</span>
                          <span className="text-[9px] font-press text-muted-foreground">/{item.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollLeft}
                disabled={scrollPosition === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 p-0 rounded-full bg-white shadow-md disabled:opacity-50 z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollRight}
                disabled={scrollPosition >= getCurrentItems().length - 2}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 p-0 rounded-full bg-white shadow-md disabled:opacity-50 z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* MemeCore Banner (pre) */}
        <div className="mx-4 mb-4">
          <Card
            className="border-0 cursor-pointer hover:opacity-95 transition-all duration-200 relative overflow-hidden"
            onClick={() => window.open('https://memecore.com/', '_blank')}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/memecore_banner_wide.jpeg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent" />
            <CardContent className="p-4 flex items-center gap-3 relative z-0 text-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/40">
                <span className="text-primary font-bold text-xs font-press">MC</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-press drop-shadow-md">MEMECORE ISLAND</p>
                <p className="text-[9px] font-press text-white/90 drop-shadow-sm">TRAVEL + MEMES IN ONE PLACE</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Mindeu Banner */}
        <div className="mx-4 mb-6 -mt-2">
          <Card
            className="bg-black border-0 cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-[1.01] relative overflow-hidden"
            onClick={() => window.open('https://www.youtube.com/watch?v=ptjfKigk8GA', '_blank')}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: "url('/openmindeu.jpeg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <CardContent className="p-4 flex items-center gap-3 relative z-0">
              <div className="w-12 h-12 bg-black/80 rounded-lg flex items-center justify-center border border-white/30 backdrop-blur-sm">
                <span className="text-white text-sm font-press font-bold">?</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-press font-bold text-white drop-shadow">OPEN MINDEU?</p>
                <p className="text-[9px] font-press text-gray-200 drop-shadow">DISCOVER THE MINDSET REVOLUTION</p>
              </div>
              <div className="text-right">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* MemeCore Banner (post) */}
        <div className="mx-4 mb-6">
          <Card
            className="border-0 cursor-pointer hover:opacity-95 transition-all duration-200 relative overflow-hidden"
            onClick={() => window.open("https://memecore.com/", "_blank")}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/memecore_banner_square.jpeg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/70 to-transparent" />
            <CardContent className="p-4 flex items-center gap-3 relative z-0 text-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/40">
                <span className="text-primary font-bold text-xs font-press">MC</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-press drop-shadow-md">WHAT'S TRENDING NOW</p>
                <p className="text-[9px] font-press text-white/90 drop-shadow-sm">TIKTOK MEMES VS ON-CHAIN MEMES</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50">
          <div className="bg-black mx-4 mb-4 rounded-2xl p-4">
            <div className="flex items-center justify-around">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Home className="w-5 h-5" />
              </Button>
              <Link href="/wallet">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <Wallet className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/alerts">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <Bell className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Receive Payment Modal */}
      <Dialog open={showReceiveModal} onOpenChange={setShowReceiveModal}>
        <DialogContent className="!w-[75vw] !max-w-[280px] mx-auto bg-white border-2 border-black rounded-xl p-5" style={{ minWidth: 'unset', width: '75vw', maxWidth: '280px' }}>
          <DialogHeader className="pb-0.5">
            <DialogTitle className="text-center text-[10px] font-press font-bold text-black">Receive Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-1 py-0.5">
            <div className="w-20 h-20 bg-black border-2 border-primary rounded-lg flex items-center justify-center">
              <QrCode className="w-14 h-14 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-press font-bold text-[10px] text-black mb-0.5">{wallet.balance}</p>
              <p className="text-[8px] font-press text-gray-600">Scan to send payment to your wallet</p>
            </div>
            <div className="w-full space-y-1">
              <Button className="w-full bg-black hover:bg-gray-900 text-white border border-primary py-1 text-[9px] font-press font-semibold rounded-md">
                Share QR Code
              </Button>
              <Button
                variant="outline"
                className="w-full border border-black text-black hover:bg-gray-100 py-1 text-[9px] font-press font-semibold rounded-md bg-transparent"
                onClick={() => setShowReceiveModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Payment Modal */}
      <Dialog open={showSendModal} onOpenChange={setShowSendModal}>
        <DialogContent className="!w-[75vw] !max-w-[280px] mx-auto bg-white border-2 border-black rounded-xl p-5" style={{ minWidth: 'unset', width: '75vw', maxWidth: '280px' }}>
          <DialogHeader className="pb-0.5">
            <DialogTitle className="text-center text-[10px] font-press font-bold text-black">Send Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-1 py-0.5">
            <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-10 h-10 text-gray-400 mx-auto mb-0.5" />
                <p className="text-[8px] font-press text-gray-600 font-medium">Scan QR Code</p>
              </div>
            </div>
            <div className="text-center">
              <p className="font-press font-bold text-[10px] text-black mb-0.5">{wallet.balance}</p>
              <p className="text-[8px] font-press text-gray-600">Ready to send</p>
            </div>
            <div className="w-full space-y-1">
              <Button className="w-full bg-black hover:bg-gray-900 text-white border border-primary py-1 text-[9px] font-press font-semibold rounded-md">
                Open Camera
              </Button>
              <Button
                variant="outline"
                className="w-full border border-black text-black hover:bg-gray-100 py-1 text-[9px] font-press font-semibold rounded-md bg-transparent"
                onClick={() => setShowSendModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onMemeCoreConnect={connectMemeCoreWallet}
      />

      {/* Top Up Modal */}
      <TopUpModal
        open={showTopUpModal}
        onOpenChange={setShowTopUpModal}
        onTopUpComplete={handleTopUpComplete}
      />
    </div>
  )
}
