"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { LoginPage } from "@/components/login-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Star,
  Code,
  Zap,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Play,
  Lock,
  CheckCircle,
  FlameIcon as Fire,
} from "lucide-react"

export default function CodingPlatform() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "dashboard">("landing")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("codequest-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setCurrentView("dashboard")
    }
  }, [])

  const handleGetStarted = () => {
    setCurrentView("login")
  }

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem("codequest-user", JSON.stringify(userData))
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("codequest-user")
    setCurrentView("landing")
  }

  const userStats = {
    level: 12,
    xp: 2450,
    xpToNext: 550,
    streak: 7,
    challengesCompleted: 34,
    totalChallenges: 120,
  }

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first challenge", icon: Trophy, earned: true },
    { id: 2, name: "Speed Demon", description: "Solve 5 challenges in under 10 minutes", icon: Zap, earned: true },
    { id: 3, name: "Streak Master", description: "Maintain a 7-day streak", icon: Fire, earned: true },
    { id: 4, name: "Algorithm Expert", description: "Master all sorting algorithms", icon: Target, earned: false },
    { id: 5, name: "Code Warrior", description: "Complete 50 challenges", icon: Award, earned: false },
  ]

  const challenges = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      xp: 50,
      completed: true,
      description: "Find two numbers that add up to a target sum",
      tags: ["Arrays", "Hash Table"],
      timeEstimate: "15 min",
    },
    {
      id: 2,
      title: "Binary Search",
      difficulty: "Medium",
      xp: 100,
      completed: true,
      description: "Implement binary search algorithm",
      tags: ["Search", "Algorithms"],
      timeEstimate: "25 min",
    },
    {
      id: 3,
      title: "Merge Sort",
      difficulty: "Medium",
      xp: 120,
      completed: false,
      description: "Implement the merge sort algorithm",
      tags: ["Sorting", "Recursion"],
      timeEstimate: "30 min",
    },
    {
      id: 4,
      title: "Dynamic Programming",
      difficulty: "Hard",
      xp: 200,
      completed: false,
      locked: true,
      description: "Solve the classic knapsack problem",
      tags: ["DP", "Optimization"],
      timeEstimate: "45 min",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (currentView === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  if (currentView === "login") {
    return <LoginPage onLogin={handleLogin} onBack={() => setCurrentView("landing")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CodeQuest
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                <Fire className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">{userStats.streak} day streak</span>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userStats.level}</div>
                  <div className="text-sm opacity-90 mt-1">
                    {userStats.xp} / {userStats.xp + userStats.xpToNext} XP
                  </div>
                  <Progress
                    value={(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}
                    className="mt-2 bg-purple-400"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userStats.challengesCompleted}</div>
                  <div className="text-sm opacity-90 mt-1">of {userStats.totalChallenges} completed</div>
                  <Progress
                    value={(userStats.challengesCompleted / userStats.totalChallenges) * 100}
                    className="mt-2 bg-blue-400"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-center gap-2">
                    {userStats.streak}
                    <Fire className="w-8 h-8" />
                  </div>
                  <div className="text-sm opacity-90 mt-1">days in a row</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total XP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userStats.xp.toLocaleString()}</div>
                  <div className="text-sm opacity-90 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +150 this week
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements
                    .filter((a) => a.earned)
                    .slice(0, 3)
                    .map((achievement) => {
                      const Icon = achievement.icon
                      return (
                        <div
                          key={achievement.id}
                          className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                        >
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{achievement.name}</div>
                            <div className="text-xs text-gray-600">{achievement.description}</div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenges
                    .filter((c) => !c.completed && !c.locked)
                    .slice(0, 2)
                    .map((challenge) => (
                      <div key={challenge.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Star className="w-4 h-4" />
                            {challenge.xp} XP
                          </div>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Coding Challenges</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="outline" size="sm">
                  Easy
                </Button>
                <Button variant="outline" size="sm">
                  Medium
                </Button>
                <Button variant="outline" size="sm">
                  Hard
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`transition-all hover:shadow-lg ${challenge.completed ? "bg-green-50 border-green-200" : challenge.locked ? "opacity-60" : "hover:scale-105"}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {challenge.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {challenge.locked && <Lock className="w-5 h-5 text-gray-400" />}
                        {challenge.title}
                      </CardTitle>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {challenge.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {challenge.xp} XP
                        </div>
                        <div>{challenge.timeEstimate}</div>
                      </div>

                      <Button
                        className="w-full"
                        disabled={challenge.locked}
                        variant={challenge.completed ? "outline" : "default"}
                      >
                        {challenge.locked ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </>
                        ) : challenge.completed ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Challenge
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-2xl font-bold">Achievements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card
                    key={achievement.id}
                    className={`transition-all ${achievement.earned ? "bg-yellow-50 border-yellow-200" : "opacity-60"}`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.earned ? "bg-yellow-100" : "bg-gray-100"}`}
                        >
                          <Icon className={`w-6 h-6 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.name}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={achievement.earned ? "default" : "secondary"}>
                        {achievement.earned ? "Earned" : "Locked"}
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <h2 className="text-2xl font-bold">Leaderboard</h2>

            <Card>
              <CardHeader>
                <CardTitle>Top Coders This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: "Alex Chen", xp: 3250, avatar: "AC" },
                    { rank: 2, name: "Sarah Kim", xp: 2890, avatar: "SK" },
                    { rank: 3, name: "You", xp: 2450, avatar: "JD", isUser: true },
                    { rank: 4, name: "Mike Johnson", xp: 2340, avatar: "MJ" },
                    { rank: 5, name: "Emma Davis", xp: 2180, avatar: "ED" },
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${user.isUser ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : user.rank === 2
                              ? "bg-gray-100 text-gray-800"
                              : user.rank === 3
                                ? "bg-orange-100 text-orange-800"
                                : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {user.rank}
                      </div>
                      <Avatar>
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.xp.toLocaleString()} XP</div>
                      </div>
                      {user.rank <= 3 && (
                        <Trophy
                          className={`w-5 h-5 ${
                            user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-orange-500"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

