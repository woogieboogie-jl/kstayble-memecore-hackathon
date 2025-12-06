"use client"

import { ArrowLeft, ChevronRight, CreditCard, Shield, Bell, HelpCircle, LogOut, LogIn, Edit, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { PassportVerification } from "@/components/passport-verification"

export default function ProfilePage() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  
  const { wallet, setVerified, disconnect, connectMemeCoreWallet } = useWallet()

  const handleDemoClick = () => {
    setToastMessage("Demo purpose only, please use intended path for testing out KRW stablecoin payments")
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSignOut = () => {
    disconnect()
    setToastMessage("Successfully signed out from KStayble Wallet")
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSignIn = async () => {
    try {
      await connectMemeCoreWallet()
      setToastMessage("Successfully signed in! 🎉")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      setToastMessage("Sign in failed. Please try again.")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const menuItems = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Payment Methods",
      subtitle: "Manage cards and accounts",
      hasChevron: true,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Security & Privacy",
      subtitle: "2FA, biometrics, permissions",
      hasChevron: true,
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Notifications",
      subtitle: "Push, email, SMS preferences",
      hasChevron: true,
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Help & Support",
      subtitle: "FAQ, contact us, feedback",
      hasChevron: true,
    },
  ]

  const stats = [
    { label: "Total Spent", value: "₩2,847,392", period: "This month" },
    { label: "Transactions", value: "47", period: "This month" },
    { label: "Saved", value: "₩156,890", period: "With rewards" },
  ]

  return (
    <div className="min-h-screen bg-[#ece9f7]">
      <div className="max-w-sm mx-auto bg-white border border-border shadow-md rounded-2xl">
        {showToast && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-black px-3 py-1.5 rounded-lg shadow-lg max-w-xs text-center text-[10px] font-press border-2 border-black animate-in slide-in-from-top-2 duration-300">
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between p-4 pt-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xs font-press font-semibold">My Profile</h1>
          <div className="w-5 h-5"></div>
        </header>

        {/* Profile Card */}
        <div className="mx-4 mb-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="py-2 px-4">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="w-14 h-14 flex-shrink-0">
                  <AvatarImage src="/abstract-profile.png" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-press font-semibold truncate">Peter Parker</h2>
                  <p className="text-[10px] font-press text-muted-foreground truncate">peter.parker@email.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-primary/10 text-primary text-[9px] font-press py-0 px-1">Verified</Badge>
                    <Badge className="bg-blue-100 text-blue-800 text-[9px] font-press py-0 px-1">Premium</Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                  onClick={handleDemoClick}
                >
                  <Edit className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
                    onClick={handleDemoClick}
                  >
                    <p className="text-[10px] font-press font-bold">{stat.value}</p>
                    <p className="text-[9px] font-press text-muted-foreground">{stat.label}</p>
                    <p className="text-[9px] font-press text-muted-foreground">{stat.period}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Foreign Status Verification */}
        <div className="mx-4 mb-4">
          <Card className={`border-2 transition-all duration-200 ${
            wallet.isVerified 
              ? 'border-primary bg-primary/10' 
              : 'border-primary bg-primary/10 cursor-pointer hover:bg-primary/15'
          }`}
          onClick={wallet.isVerified ? undefined : () => setShowVerificationModal(true)}
          >
            <CardContent className="py-2 px-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  wallet.isVerified ? 'bg-primary/10' : 'bg-primary/15'
                }`}>
                  <FileCheck className={`w-4 h-4 ${
                    wallet.isVerified ? 'text-primary' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-press font-semibold text-[10px] leading-tight">Foreign Status Verification</h3>
                  <p className="text-[9px] font-press text-gray-600 leading-tight">
                    {wallet.isVerified 
                      ? 'Your foreign status is verified ✅' 
                      : 'Verify your passport to enable transactions'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {wallet.isVerified ? (
                    <Badge className="bg-primary/10 text-primary text-[9px] font-press py-0 px-1">Verified</Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800 text-[9px] font-press py-0 px-1">Pending</Badge>
                  )}
                  {!wallet.isVerified && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
              {!wallet.isVerified && (
                <div className="mt-1 pt-1 border-t border-primary/40">
                  <p className="text-[9px] font-press text-gray-600 leading-tight">
                    🛂 Required for KRW transactions in compliance with Korean regulations
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="mx-4 mb-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-50 transition-all duration-200"
                onClick={handleDemoClick}
              >
                <CardContent className="py-0.5 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-press font-semibold text-[10px]">{item.title}</h3>
                      <p className="text-[9px] font-press text-muted-foreground">{item.subtitle}</p>
                    </div>
                    {item.hasChevron && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>



        {/* Logout */}
        <div className="mx-4 mb-20">
          {wallet.isConnected ? (
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent transition-all duration-200"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full text-primary border-primary/40 hover:bg-primary/10 hover:border-primary/80 bg-transparent transition-all duration-200"
              onClick={handleSignIn}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
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
              <Link href="/wallet">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
              <Link href="/alerts">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <Bell className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Passport Verification Modal */}
      <PassportVerification
        open={showVerificationModal}
        onOpenChange={setShowVerificationModal}
        onVerificationComplete={(verified) => {
          setVerified(verified)
          if (verified) {
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000)
          }
        }}
      />
    </div>
  )
}
