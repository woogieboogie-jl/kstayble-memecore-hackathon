"use client"

import { ArrowLeft, Bell, Check, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "transactions">("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "transaction",
      title: "Payment Successful",
      message: "You paid ₩127,273 to OLIVE YONG",
      time: "2 hours ago",
      read: false,
      icon: "✅",
      color: "bg-primary/10",
    },
    {
      id: 2,
      type: "promotion",
      title: "Special Offer",
      message: "Get 20% off on your next food delivery order",
      time: "4 hours ago",
      read: false,
      icon: "🎉",
      color: "bg-orange-100",
    },
    {
      id: 3,
      type: "security",
      title: "Login Alert",
      message: "New device login detected from Seoul, Korea",
      time: "1 day ago",
      read: true,
      icon: "🔒",
      color: "bg-blue-100",
    },
    {
      id: 4,
      type: "transaction",
      title: "Payment Received",
      message: "You received ₩50,000 from friend transfer",
      time: "2 days ago",
      read: true,
      icon: "💰",
      color: "bg-primary/10",
    },
    {
      id: 5,
      type: "system",
      title: "App Update Available",
      message: "Version 2.1.0 is now available with new features",
      time: "3 days ago",
      read: true,
      icon: "📱",
      color: "bg-purple-100",
    },
  ])

  const handleDismissAlert = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((notification) => !notification.read)
      case "transactions":
        return notifications.filter((notification) => notification.type === "transaction")
      default:
        return notifications
    }
  }

  const filteredNotifications = getFilteredNotifications()

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
          <h1 className="text-xs font-press font-semibold">Notifications</h1>
          <div className="w-5 h-5"></div>
        </header>

        {/* Filter Tabs */}
        <div className="mx-4 mb-6">
          <div className="flex gap-4">
            <button onClick={() => setActiveTab("all")} className="relative">
              <span
                className={`text-[10px] font-press font-semibold ${activeTab === "all" ? "text-foreground" : "text-muted-foreground"}`}
              >
                All
              </span>
              {activeTab === "all" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            <button onClick={() => setActiveTab("unread")} className="relative">
              <span
                className={`text-[10px] font-press ${activeTab === "unread" ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              >
                Unread
              </span>
              {activeTab === "unread" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            <button onClick={() => setActiveTab("transactions")} className="relative">
              <span
                className={`text-[10px] font-press ${activeTab === "transactions" ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              >
                Transactions
              </span>
              {activeTab === "transactions" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="mx-4 mb-20">
          <div className="space-y-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-0 shadow-sm transition-all duration-300 ease-in-out ${!notification.read ? "bg-blue-50" : ""}`}
                >
                  <CardContent className="py-0 px-2">
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-8 h-8 ${notification.color} rounded-full flex items-center justify-center text-xs flex-shrink-0`}
                      >
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-0">
                          <h3 className="font-press font-semibold text-[10px]">{notification.title}</h3>
                          {!notification.read && (
                            <Badge className="bg-primary text-primary-foreground text-xs ml-2">New</Badge>
                          )}
                        </div>
                        <p className="text-[10px] font-press text-muted-foreground mb-0 line-clamp-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-press text-muted-foreground">{notification.time}</span>
                          <div className="flex gap-1">
                            {!notification.read && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-0.5 h-auto"
                                  onClick={() => handleDismissAlert(notification.id)}
                                >
                                  <Check className="w-3 h-3 text-primary" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-0.5 h-auto"
                                  onClick={() => handleDismissAlert(notification.id)}
                                >
                                  <X className="w-3 h-3 text-red-600" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-[12px] text-muted-foreground">No notifications found</p>
              </div>
            )}
          </div>
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
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Bell className="w-5 h-5" />
              </Button>
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
    </div>
  )
}
