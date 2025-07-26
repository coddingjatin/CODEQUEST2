"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Code, User, Mail, Lock, Sparkles, Trophy, Zap } from "lucide-react"

interface LoginPageProps {
  onLogin: (userData: any) => void
  onBack: () => void
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "", confirmPassword: "" })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("codequest-users") || "[]")
    const user = existingUsers.find((u: any) => u.email === loginForm.email)

    if (user && user.password === loginForm.password) {
      onLogin({
        ...user,
        lastLogin: new Date().toISOString(),
      })
    } else {
      // For demo purposes, create a default user
      const defaultUser = {
        id: Date.now(),
        username: "CodeWarrior",
        email: loginForm.email,
        level: 12,
        xp: 2450,
        streak: 7,
        challengesCompleted: 34,
        achievements: ["first-steps", "speed-demon", "streak-master"],
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }
      onLogin(defaultUser)
    }

    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser = {
      id: Date.now(),
      username: signupForm.username,
      email: signupForm.email,
      password: signupForm.password,
      level: 1,
      xp: 0,
      streak: 0,
      challengesCompleted: 0,
      achievements: [],
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    // Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem("codequest-users") || "[]")
    existingUsers.push(newUser)
    localStorage.setItem("codequest-users", JSON.stringify(existingUsers))

    onLogin(newUser)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating code blocks */}
      <div className="absolute inset-0 pointer-events-none">
        {["{}", "[]", "()", "</>", "&&", "||", "===", "!=="].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-white/10 text-4xl font-mono animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back button */}
          <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl transform rotate-12">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">CodeQuest</h1>
            <p className="text-white/70">Begin your coding adventure</p>
          </div>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Welcome Back, Coder!</CardTitle>
              <CardDescription className="text-white/70">Sign in to continue your programming journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
                  <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Signing In...
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white">
                        Username
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Choose a username"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          value={signupForm.username}
                          onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Creating Account...
                        </div>
                      ) : (
                        <>
                          <Trophy className="w-4 h-4 mr-2" />
                          Start Adventure
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-white/70 text-sm text-center mb-2">Demo Credentials:</p>
                <p className="text-white/60 text-xs text-center">Email: demo@codequest.com | Password: demo123</p>
              </div>
            </CardContent>
          </Card>

          {/* Features preview */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Trophy, label: "Achievements" },
              { icon: Zap, label: "XP System" },
              { icon: Code, label: "Challenges" },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10"
                >
                  <Icon className="w-6 h-6 text-white/70 mx-auto mb-2" />
                  <p className="text-white/60 text-xs">{feature.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
