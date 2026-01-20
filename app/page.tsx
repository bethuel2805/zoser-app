"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import Onboarding from "@/components/onboarding"
import ProfileSelection from "@/components/profile-selection"
import ClientDashboard from "@/components/client/client-dashboard"
import DriverDashboard from "@/components/driver/driver-dashboard"
import VendorDashboard from "@/components/vendor/vendor-dashboard"
import AdminDashboard from "@/components/admin/admin-dashboard"

export type UserProfile = "client" | "driver" | "vendor" | "admin" | null
export type AppScreen = "splash" | "onboarding" | "profile-selection" | "dashboard"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash")
  const [userProfile, setUserProfile] = useState<UserProfile>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentScreen("onboarding")
        setIsAnimating(false)
      }, 500)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleOnboardingComplete = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentScreen("profile-selection")
      setIsAnimating(false)
    }, 300)
  }

  const handleProfileSelect = (profile: UserProfile) => {
    setUserProfile(profile)
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentScreen("dashboard")
      setIsAnimating(false)
    }, 300)
  }

  const handleLogout = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setUserProfile(null)
      setCurrentScreen("profile-selection")
      setIsAnimating(false)
    }, 300)
  }

  const renderDashboard = () => {
    switch (userProfile) {
      case "client":
        return <ClientDashboard onLogout={handleLogout} />
      case "driver":
        return <DriverDashboard onLogout={handleLogout} />
      case "vendor":
        return <VendorDashboard onLogout={handleLogout} />
      case "admin":
        return <AdminDashboard onLogout={handleLogout} />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
        {currentScreen === "splash" && <SplashScreen />}
        {currentScreen === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}
        {currentScreen === "profile-selection" && <ProfileSelection onSelect={handleProfileSelect} />}
        {currentScreen === "dashboard" && renderDashboard()}
      </div>
    </main>
  )
}
