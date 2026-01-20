"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-red-500/20 to-orange-600/20 blur-3xl animate-pulse delay-1000" />
        {/* Animated lines representing roads/routes */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            fill="none"
            className="animate-[dash_3s_ease-in-out_infinite]"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <path
            d="M0,60 Q25,40 50,60 T100,60"
            stroke="url(#gradient2)"
            strokeWidth="0.3"
            fill="none"
            className="animate-[dash_3s_ease-in-out_infinite_0.5s]"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F26522" />
              <stop offset="100%" stopColor="#ED1C24" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ED1C24" />
              <stop offset="100%" stopColor="#F26522" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logo and branding */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* Logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-2xl opacity-50 animate-pulse" />
          <Image
            src="/images/logo-groupe-a-visuel.png"
            alt="A VISUEL Logo"
            width={180}
            height={180}
            className="relative z-10 drop-shadow-2xl"
            priority
          />
        </div>

        {/* App name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          A VISUEL{" "}
          <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Express</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">Transport & Livraison</p>

        {/* Loading indicator */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">Chargement...</span>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`absolute bottom-8 text-center transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-gray-500 text-xs">Powered by</p>
        <p className="text-gray-400 text-sm font-medium">Maison Mère A VISUEL</p>
        <p className="text-gray-600 text-xs mt-1">Communication • Transport • Logistique</p>
      </div>
    </div>
  )
}
