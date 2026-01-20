"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot, User, Phone, Mail, Clock } from "lucide-react"

interface ClientChatProps {
  onBack: () => void
}

const initialMessages = [
  {
    id: 1,
    type: "bot",
    message:
      "Bonjour! Je suis l'assistant virtuel de A VISUEL Express. Comment puis-je vous aider aujourd'hui?",
    time: "14:30",
  },
  {
    id: 2,
    type: "user",
    message: "J'ai un problème avec ma dernière livraison",
    time: "14:31",
  },
  {
    id: 3,
    type: "bot",
    message:
      "Je suis désolé d'apprendre cela. Pouvez-vous me donner plus de détails sur le problème rencontré avec votre livraison?",
    time: "14:31",
  },
]

const quickReplies = [
  "Problème de livraison",
  "Modifier ma commande",
  "Demande de remboursement",
  "Contacter un agent",
]

export default function ClientChat({ onBack }: ClientChatProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: input,
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        message:
          "Merci pour votre message. Un de nos agents va prendre en charge votre demande dans les plus brefs délais. Temps d'attente estimé: 2-3 minutes.",
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-white/10"
          onClick={onBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Assistance</h1>
            <p className="text-green-500 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              En ligne
            </p>
          </div>
        </div>
      </div>

      {/* Contact options */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Card className="bg-white/5 border-white/10 p-3 flex items-center gap-2 min-w-max">
          <Phone className="w-4 h-4 text-orange-500" />
          <span className="text-gray-300 text-sm">+243 800 123 456</span>
        </Card>
        <Card className="bg-white/5 border-white/10 p-3 flex items-center gap-2 min-w-max">
          <Mail className="w-4 h-4 text-orange-500" />
          <span className="text-gray-300 text-sm">support@avisuel.cd</span>
        </Card>
        <Card className="bg-white/5 border-white/10 p-3 flex items-center gap-2 min-w-max">
          <Clock className="w-4 h-4 text-orange-500" />
          <span className="text-gray-300 text-sm">24h/24</span>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === "bot"
                  ? "bg-gradient-to-br from-orange-500 to-red-500"
                  : "bg-white/10"
              }`}
            >
              {msg.type === "bot" ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.type === "bot"
                  ? "bg-white/10 text-gray-200 rounded-bl-none"
                  : "bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-br-none"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.type === "bot" ? "text-gray-500" : "text-white/70"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick replies */}
      <div className="flex gap-2 overflow-x-auto pb-3">
        {quickReplies.map((reply) => (
          <Button
            key={reply}
            variant="ghost"
            size="sm"
            className="bg-white/5 hover:bg-white/10 text-gray-300 rounded-full whitespace-nowrap"
            onClick={() => handleQuickReply(reply)}
          >
            {reply}
          </Button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <Input
          placeholder="Écrivez votre message..."
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          className="h-12 w-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          onClick={handleSend}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
