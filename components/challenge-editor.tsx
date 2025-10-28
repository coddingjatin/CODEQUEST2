"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Play, Copy, RotateCcw, CheckCircle, XCircle, Clock, Zap } from "lucide-react"

interface ChallengeEditorProps {
  challenge: {
    id: number
    title: string
    difficulty: string
    xp: number
    description: string
    problemStatement: string
    exampleInput: string
    exampleOutput: string
    testCases: Array<{ input: string; output: string; hidden: boolean }>
    boilerplateCode: string
    hints: string[]
  }
  onSubmit?: (code: string) => void
}

export function ChallengeEditor({ challenge, onSubmit }: ChallengeEditorProps) {
  const [code, setCode] = useState(challenge.boilerplateCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; actual: string }>
  >([])
  const [activeTab, setActiveTab] = useState("problem")
  const [showHints, setShowHints] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const runCode = async () => {
    setIsRunning(true)
    try {
      // Simulate code execution
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock test results
      const results = challenge.testCases.map((testCase) => ({
        passed: Math.random() > 0.3,
        input: testCase.input,
        expected: testCase.output,
        actual: testCase.output,
      }))

      setTestResults(results)
      const passedCount = results.filter((r) => r.passed).length
      setOutput(`Passed ${passedCount}/${results.length} test cases`)
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(challenge.boilerplateCode)
    setOutput("")
    setTestResults([])
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const submitCode = () => {
    if (onSubmit) {
      onSubmit(code)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Problem Statement */}
      <div className="space-y-4">
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {challenge.title}
                  <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                </CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  {challenge.xp} XP
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
              </TabsList>

              <TabsContent value="problem" className="space-y-4 mt-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{challenge.problemStatement}</p>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-1">Input:</p>
                    <code className="text-sm bg-white p-2 rounded block font-mono">{challenge.exampleInput}</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-900 mb-1">Output:</p>
                    <code className="text-sm bg-white p-2 rounded block font-mono">{challenge.exampleOutput}</code>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hints" className="space-y-3 mt-4">
                {challenge.hints.map((hint, index) => (
                  <div key={index} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-900 mb-1">Hint {index + 1}:</p>
                    <p className="text-sm text-yellow-800">{hint}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults.length > 0 && (
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 flex items-start gap-3 ${
                    result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  {result.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${result.passed ? "text-green-900" : "text-red-900"}`}>
                      Test Case {index + 1} {result.passed ? "Passed" : "Failed"}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Input: {result.input}</p>
                    <p className="text-xs text-gray-600">Expected: {result.expected}</p>
                    {!result.passed && <p className="text-xs text-gray-600">Got: {result.actual}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Panel - Code Editor */}
      <div className="space-y-4">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyCode}
                  className="gap-1 bg-transparent"
                  title="Copy code to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetCode}
                  className="gap-1 bg-transparent"
                  title="Reset to boilerplate"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col gap-4">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
              <div className="bg-gray-900 text-gray-300 px-4 py-2 text-xs font-mono flex items-center justify-between">
                <span>JavaScript</span>
                <span className="text-gray-500">{code.split("\n").length} lines</span>
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 font-mono text-sm border-0 rounded-none resize-none focus:ring-0 bg-gray-50"
                placeholder="Write your code here..."
              />
            </div>

            {/* Output */}
            {output && (
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm max-h-24 overflow-y-auto">
                <p className="text-green-400">{output}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={runCode}
                disabled={isRunning}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2"
              >
                <Play className="w-4 h-4" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              <Button
                onClick={submitCode}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
