"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface Conversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
}

interface UserContextType {
  user: User | null
  isAuthenticated: boolean
  conversations: Conversation[]
  currentConversation: Conversation | null
  login: (email: string, password: string, name?: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  createConversation: () => Conversation
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  updateConversation: (id: string, messages: ChatMessage[]) => void
  renameConversation: (id: string, title: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  useEffect(() => {
    // Cargar usuario y conversaciones del localStorage
    const savedUser = localStorage.getItem("catholic_user")
    const savedConversations = localStorage.getItem("catholic_conversations")
    const savedCurrentId = localStorage.getItem("catholic_current_conversation")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedConversations) {
      const convs = JSON.parse(savedConversations).map((c: Conversation) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
        messages: c.messages.map((m: ChatMessage) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }))
      setConversations(convs)
      if (savedCurrentId) {
        const current = convs.find((c: Conversation) => c.id === savedCurrentId)
        if (current) setCurrentConversation(current)
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("catholic_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("catholic_user")
    }
  }, [user])

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("catholic_conversations", JSON.stringify(conversations))
    }
  }, [conversations])

  useEffect(() => {
    if (currentConversation) {
      localStorage.setItem("catholic_current_conversation", currentConversation.id)
    }
  }, [currentConversation])

  const login = async (email: string, password: string, name?: string): Promise<boolean> => {
    // Simular login - conectar con tu backend
    const savedUsers = JSON.parse(localStorage.getItem("catholic_users") || "[]")
    const existingUser = savedUsers.find((u: { email: string; password: string }) => u.email === email)

    if (existingUser && existingUser.password === password) {
      setUser({ id: existingUser.id, name: existingUser.name, email: existingUser.email })
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const savedUsers = JSON.parse(localStorage.getItem("catholic_users") || "[]")
    const existingUser = savedUsers.find((u: { email: string }) => u.email === email)

    if (existingUser) {
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    savedUsers.push(newUser)
    localStorage.setItem("catholic_users", JSON.stringify(savedUsers))
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email })
    return true
  }

  const logout = () => {
    setUser(null)
    setConversations([])
    setCurrentConversation(null)
    localStorage.removeItem("catholic_user")
    localStorage.removeItem("catholic_conversations")
    localStorage.removeItem("catholic_current_conversation")
  }

  const createConversation = (): Conversation => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "Nueva conversación",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations((prev) => [newConversation, ...prev])
    setCurrentConversation(newConversation)
    return newConversation
  }

  const selectConversation = (id: string) => {
    const conv = conversations.find((c) => c.id === id)
    if (conv) setCurrentConversation(conv)
  }

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (currentConversation?.id === id) {
      setCurrentConversation(null)
    }
  }

  const updateConversation = (id: string, messages: ChatMessage[]) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const title = messages[0]?.content.slice(0, 30) + "..." || "Nueva conversación"
          return { ...c, messages, title, updatedAt: new Date() }
        }
        return c
      }),
    )
    if (currentConversation?.id === id) {
      setCurrentConversation((prev) => (prev ? { ...prev, messages, updatedAt: new Date() } : null))
    }
  }

  const renameConversation = (id: string, title: string) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title, updatedAt: new Date() } : c)))
    if (currentConversation?.id === id) {
      setCurrentConversation((prev) => (prev ? { ...prev, title } : null))
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        conversations,
        currentConversation,
        login,
        register,
        logout,
        createConversation,
        selectConversation,
        deleteConversation,
        updateConversation,
        renameConversation,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
