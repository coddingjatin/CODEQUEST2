"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Code,
  ChevronDown,
  Settings,
  Trophy,
  Zap,
  Users,
  Star,
  Play,
  BookOpen,
  Target,
  Award,
  Gamepad2,
  Sword,
  Shield,
  Crown,
  Github,
  Twitter,
  DiscIcon as Discord,
  X,
  MessageCircle,
  Send,
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle chat message
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-20 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center shadow-lg">
                  <Code className="w-5 h-5 text-slate-900" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-wide">CodeQuest</h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-1 text-white hover:text-yellow-400 cursor-pointer transition-colors font-medium">
                  <span>Learn</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-white hover:text-yellow-400 cursor-pointer transition-colors font-medium">
                  <span>Practice</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="text-white hover:text-yellow-400 cursor-pointer transition-colors font-medium">
                  Build
                </div>
                <div className="flex items-center gap-1 text-white hover:text-yellow-400 cursor-pointer transition-colors font-medium">
                  <span>Community</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="text-white hover:text-yellow-400 cursor-pointer transition-colors font-medium">
                  Pricing
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Settings className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer transition-colors" />
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-6 py-2 rounded-lg shadow-lg border-2 border-yellow-600 hover:border-yellow-700 transition-all transform hover:scale-105"
                onClick={onGetStarted}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Pixel Landscape Background */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Pixel Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/pixel-landscape.png')`,
            imageRendering: "pixelated",
          }}
        />

        {/* Animated overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col justify-center min-h-screen pt-20">
          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span
                className="text-white block mb-3 drop-shadow-2xl"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  textShadow: "0 4px 8px rgba(0,0,0,0.8)",
                }}
              >
                START YOUR
              </span>
              <span
                className="text-yellow-400 block drop-shadow-2xl"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  textShadow: "0 6px 12px rgba(0,0,0,0.9), 0 0 30px rgba(251, 191, 36, 0.4)",
                }}
              >
                Coding
              </span>
              <span
                className="text-yellow-400 block drop-shadow-2xl"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  textShadow: "0 6px 12px rgba(0,0,0,0.9), 0 0 30px rgba(251, 191, 36, 0.4)",
                }}
              >
                Adventure
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            The most fun and beginner-friendly way to learn to code. Build real projects, earn XP, and level up your
            skills! ⚡️✨
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 px-12 text-xl rounded-xl shadow-2xl border-3 border-yellow-600 hover:border-yellow-700 transform hover:scale-105 transition-all duration-200"
              style={{
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3), 0 0 0 1px rgba(251, 191, 36, 0.5)",
              }}
              onClick={onGetStarted}
            >
              <Play className="w-6 h-6 mr-2" />
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold py-4 px-12 text-xl rounded-xl"
            >
              <Gamepad2 className="w-6 h-6 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Active Learners", value: "50K+" },
              { icon: Trophy, label: "Challenges", value: "500+" },
              { icon: Crown, label: "Achievements", value: "100+" },
              { icon: Zap, label: "XP Earned", value: "10M+" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-300 text-sm font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating pixels */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/40 rounded-sm animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-slate-900 py-24 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h3
              className="text-5xl md:text-6xl font-black text-white mb-6"
              style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
            >
              LEVEL UP YOUR SKILLS
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Master programming through gamified challenges, earn XP, unlock achievements, and compete with fellow
              coders in the most engaging way possible!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
            {[
              {
                icon: Sword,
                title: "Epic Challenges",
                description:
                  "Battle through coding challenges from beginner to legendary difficulty. Each challenge is crafted to teach you real programming skills.",
                color: "from-red-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "Skill Building",
                description:
                  "Build your coding armor with comprehensive learning paths, interactive tutorials, and hands-on projects.",
                color: "from-blue-500 to-cyan-600",
              },
              {
                icon: Crown,
                title: "Achievement System",
                description:
                  "Unlock rare achievements, earn badges, and climb the leaderboards to become a coding legend in our community.",
                color: "from-purple-500 to-indigo-600",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h4
                      className="text-2xl font-bold text-white mb-4"
                      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
                    >
                      {feature.title}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: BookOpen, title: "Interactive Lessons", desc: "Learn by doing with hands-on coding exercises" },
              {
                icon: Target,
                title: "Skill Tracking",
                desc: "Monitor your progress across different programming languages",
              },
              { icon: Users, title: "Community", desc: "Connect with fellow learners and share your journey" },
              { icon: Award, title: "Certificates", desc: "Earn certificates to showcase your achievements" },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/50 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                  <h5 className="text-lg font-bold text-white mb-2">{item.title}</h5>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-slate-800 to-slate-900 py-20 border-t border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3
              className="text-4xl md:text-5xl font-black text-white mb-6"
              style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
            >
              READY TO START YOUR
              <br />
              <span className="text-yellow-400">CODING QUEST?</span>
            </h3>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of developers who are already building their skills in the most fun way possible!
            </p>
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-6 px-16 text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
              onClick={onGetStarted}
            >
              <Star className="w-6 h-6 mr-2" />
              BEGIN YOUR JOURNEY
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 border-t border-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
                  <Code className="w-6 h-6 text-slate-900" />
                </div>
                <h4 className="text-2xl font-bold text-white">CodeQuest</h4>
              </div>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                The most engaging way to learn programming. Build real projects, earn XP, and level up your coding
                skills through gamified challenges.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Twitter className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Discord className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                {["Learn", "Practice", "Build", "Community", "Pricing", "About"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="text-white font-bold mb-4">Support</h5>
              <ul className="space-y-2">
                {["Help Center", "Contact Us", "Bug Reports", "Feature Requests", "Status"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">© 2024 CodeQuest. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-yellow-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-30">
        {chatOpen && (
          <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-yellow-400 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h6 className="font-bold text-slate-900">CodeQuest Assistant</h6>
                  <p className="text-xs text-slate-700">Online</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-slate-900 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-64 overflow-y-auto bg-slate-50">
              <div className="mb-4">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-700">
                    Hi! I'm your CodeQuest assistant. How can I help you start your coding journey today? 🚀
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110"
        >
          {chatOpen ? <X className="w-6 h-6 text-slate-900" /> : <MessageCircle className="w-6 h-6 text-slate-900" />}
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
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
