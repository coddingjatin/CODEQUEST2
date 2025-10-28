"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Zap, BookOpen, Brain } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Algorithm =
  | "bubble"
  | "merge"
  | "quick"
  | "insertion"
  | "selection"
  | "bfs"
  | "dfs"
  | "dijkstra"
  | "inorder"
  | "preorder"
  | "postorder"
  | "bst"

interface ArrayElement {
  value: number
  status: "default" | "comparing" | "sorted" | "pivot" | "visited" | "current"
}

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
  x?: number
  y?: number
  status?: "default" | "visiting" | "visited"
}

interface GraphNode {
  id: number
  x: number
  y: number
  distance: number
  status: "unvisited" | "visiting" | "visited"
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  algorithm: string
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the time complexity of Bubble Sort in the worst case?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correct: 2,
    algorithm: "Sorting",
    explanation: "Bubble Sort has O(n²) time complexity because it compares every element with every other element.",
  },
  {
    id: 2,
    question: "Which sorting algorithm uses the divide-and-conquer approach?",
    options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    correct: 1,
    algorithm: "Sorting",
    explanation: "Merge Sort divides the array into halves, sorts them recursively, and merges them back.",
  },
  {
    id: 3,
    question: "What does BFS stand for?",
    options: ["Binary First Search", "Breadth-First Search", "Best-First Search", "Backward First Search"],
    correct: 1,
    algorithm: "Graph",
    explanation: "BFS stands for Breadth-First Search, which explores nodes level by level.",
  },
  {
    id: 4,
    question: "In-order traversal of a BST produces elements in which order?",
    options: ["Random order", "Sorted order", "Reverse sorted order", "Level order"],
    correct: 1,
    algorithm: "Tree",
    explanation: "In-order traversal (Left-Root-Right) of a BST produces elements in sorted order.",
  },
  {
    id: 5,
    question: "Which algorithm finds the shortest path in a weighted graph?",
    options: ["BFS", "DFS", "Dijkstra's Algorithm", "Bubble Sort"],
    correct: 2,
    algorithm: "Graph",
    explanation: "Dijkstra's Algorithm finds the shortest path from a source to all other nodes in a weighted graph.",
  },
  {
    id: 6,
    question: "What is the average time complexity of Quick Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
    correct: 1,
    algorithm: "Sorting",
    explanation: "Quick Sort has an average time complexity of O(n log n) due to its divide-and-conquer approach.",
  },
  {
    id: 7,
    question: "Which traversal is useful for deleting a tree?",
    options: ["In-order", "Pre-order", "Post-order", "Level-order"],
    correct: 2,
    algorithm: "Tree",
    explanation:
      "Post-order traversal (Left-Right-Root) is useful for deletion as it processes children before the parent.",
  },
  {
    id: 8,
    question: "DFS uses which data structure?",
    options: ["Queue", "Stack", "Heap", "Priority Queue"],
    correct: 1,
    algorithm: "Graph",
    explanation: "DFS uses a Stack (or recursion) to explore nodes deeply before backtracking.",
  },
]

export function AlgoVisualizer() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble")
  const [arraySize, setArraySize] = useState(20)
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [array, setArray] = useState<ArrayElement[]>([])
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [treeRoot, setTreeRoot] = useState<TreeNode | null>(null)
  const [traversalOrder, setTraversalOrder] = useState<number[]>([])
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>([])
  const [graphEdges, setGraphEdges] = useState<[number, number, number][]>([])
  const [activeTab, setActiveTab] = useState("visualizer")
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showQuizResults, setShowQuizResults] = useState(false)

  // Initialize array
  useEffect(() => {
    if (["bubble", "merge", "quick", "insertion", "selection"].includes(algorithm)) {
      generateRandomArray()
    } else if (["inorder", "preorder", "postorder", "bst"].includes(algorithm)) {
      generateBST()
    } else if (["bfs", "dfs", "dijkstra"].includes(algorithm)) {
      generateGraph()
    }
  }, [arraySize, algorithm])

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, (_, i) => ({
      value: Math.floor(Math.random() * 100) + 1,
      status: "default" as const,
    }))
    setArray(newArray)
    setComparisons(0)
    setSwaps(0)
    setTimeElapsed(0)
  }

  const generateBST = () => {
    let root: TreeNode | null = null
    const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)

    const insert = (node: TreeNode | null, value: number): TreeNode => {
      if (node === null) {
        return { value, left: null, right: null, status: "default" }
      }
      if (value < node.value) {
        node.left = insert(node.left, value)
      } else {
        node.right = insert(node.right, value)
      }
      return node
    }

    values.forEach((val) => {
      root = insert(root, val)
    })

    setTreeRoot(root)
    setTraversalOrder([])
    setComparisons(0)
    setSwaps(0)
    setTimeElapsed(0)
  }

  const generateGraph = () => {
    const nodeCount = 6
    const nodes: GraphNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: 100 + (i % 3) * 150,
      y: 100 + Math.floor(i / 3) * 150,
      distance: i === 0 ? 0 : Number.POSITIVE_INFINITY,
      status: "unvisited" as const,
    }))

    const edges: [number, number, number][] = [
      [0, 1, 4],
      [0, 2, 2],
      [1, 2, 1],
      [1, 3, 5],
      [2, 3, 8],
      [2, 4, 10],
      [3, 4, 2],
      [3, 5, 6],
      [4, 5, 3],
    ]

    setGraphNodes(nodes)
    setGraphEdges(edges)
    setComparisons(0)
    setSwaps(0)
    setTimeElapsed(0)
  }

  useEffect(() => {
    if (["bubble", "merge", "quick", "insertion", "selection"].includes(algorithm)) {
      generateRandomArray()
    } else if (["inorder", "preorder", "postorder", "bst"].includes(algorithm)) {
      generateBST()
    } else if (["bfs", "dfs", "dijkstra"].includes(algorithm)) {
      generateGraph()
    }
  }, [arraySize, algorithm])

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const bubbleSort = async () => {
    const arr = [...array]
    let comps = 0
    let swpCount = 0
    const speed_ms = 101 - speed

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (!isRunning) return

        arr[j].status = "comparing"
        arr[j + 1].status = "comparing"
        setArray([...arr])
        setComparisons(comps++)
        await sleep(speed_ms)

        if (arr[j].value > arr[j + 1].value) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          swpCount++
          setSwaps(swpCount)
        }

        arr[j].status = "default"
        arr[j + 1].status = "default"
      }
      arr[arr.length - i - 1].status = "sorted"
    }

    arr.forEach((el) => (el.status = "sorted"))
    setArray([...arr])
  }

  const mergeSort = async () => {
    const arr = [...array]
    let comps = 0
    const speed_ms = 101 - speed

    const merge = async (left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1)
      const rightArr = arr.slice(mid + 1, right + 1)
      let i = 0,
        j = 0,
        k = left

      while (i < leftArr.length && j < rightArr.length) {
        arr[k].status = "comparing"
        setArray([...arr])
        setComparisons(comps++)
        await sleep(speed_ms)

        if (leftArr[i].value <= rightArr[j].value) {
          arr[k] = leftArr[i]
          i++
        } else {
          arr[k] = rightArr[j]
          j++
        }
        arr[k].status = "default"
        k++
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i]
        i++
        k++
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j]
        j++
        k++
      }

      setArray([...arr])
    }

    const mergeSortHelper = async (left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2)
        await mergeSortHelper(left, mid)
        await mergeSortHelper(mid + 1, right)
        await merge(left, mid, right)
      }
    }

    await mergeSortHelper(0, arr.length - 1)
    arr.forEach((el) => (el.status = "sorted"))
    setArray([...arr])
  }

  const quickSort = async () => {
    const arr = [...array]
    let comps = 0
    const speed_ms = 101 - speed

    const partition = async (low: number, high: number) => {
      const pivot = arr[high]
      arr[high].status = "pivot"
      let i = low - 1

      for (let j = low; j < high; j++) {
        if (!isRunning) return i + 1

        arr[j].status = "comparing"
        setArray([...arr])
        setComparisons(comps++)
        await sleep(speed_ms)

        if (arr[j].value < pivot.value) {
          i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          setSwaps((s) => s + 1)
        }
        arr[j].status = "default"
      }
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setSwaps((s) => s + 1)
      arr[i + 1].status = "sorted"
      setArray([...arr])
      return i + 1
    }

    const quickSortHelper = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high)
        await quickSortHelper(low, pi - 1)
        await quickSortHelper(pi + 1, high)
      } else if (low === high) {
        arr[low].status = "sorted"
      }
    }

    await quickSortHelper(0, arr.length - 1)
    arr.forEach((el) => (el.status = "sorted"))
    setArray([...arr])
  }

  const inorderTraversal = async (node: TreeNode | null, result: number[] = []): Promise<number[]> => {
    if (node === null) return result
    await inorderTraversal(node.left, result)
    result.push(node.value)
    setTraversalOrder([...result])
    await sleep(101 - speed)
    await inorderTraversal(node.right, result)
    return result
  }

  const preorderTraversal = async (node: TreeNode | null, result: number[] = []): Promise<number[]> => {
    if (node === null) return result
    result.push(node.value)
    setTraversalOrder([...result])
    await sleep(101 - speed)
    await preorderTraversal(node.left, result)
    await preorderTraversal(node.right, result)
    return result
  }

  const postorderTraversal = async (node: TreeNode | null, result: number[] = []): Promise<number[]> => {
    if (node === null) return result
    await postorderTraversal(node.left, result)
    await postorderTraversal(node.right, result)
    result.push(node.value)
    setTraversalOrder([...result])
    await sleep(101 - speed)
    return result
  }

  const bfsAlgorithm = async () => {
    const nodes = graphNodes.map((n) => ({ ...n }))
    const queue: number[] = [0]
    nodes[0].status = "visiting"
    let visited = 0

    while (queue.length > 0) {
      const current = queue.shift()!
      nodes[current].status = "visited"
      visited++
      setGraphNodes([...nodes])
      setComparisons(visited)
      await sleep(101 - speed)

      const neighbors = graphEdges.filter(([from]) => from === current).map(([, to]) => to)

      for (const neighbor of neighbors) {
        if (nodes[neighbor].status === "unvisited") {
          nodes[neighbor].status = "visiting"
          queue.push(neighbor)
        }
      }
    }
  }

  const dfsAlgorithm = async () => {
    const nodes = graphNodes.map((n) => ({ ...n }))
    let visited = 0

    const dfs = async (nodeId: number) => {
      nodes[nodeId].status = "visiting"
      visited++
      setGraphNodes([...nodes])
      setComparisons(visited)
      await sleep(101 - speed)

      nodes[nodeId].status = "visited"
      setGraphNodes([...nodes])

      const neighbors = graphEdges.filter(([from]) => from === nodeId).map(([, to]) => to)

      for (const neighbor of neighbors) {
        if (nodes[neighbor].status === "unvisited") {
          await dfs(neighbor)
        }
      }
    }

    await dfs(0)
  }

  const dijkstraAlgorithm = async () => {
    const nodes = graphNodes.map((n) => ({ ...n }))
    const visited = new Set<number>()
    let steps = 0

    nodes[0].status = "visiting"
    setGraphNodes([...nodes])

    while (visited.size < nodes.length) {
      let minNode = -1
      let minDist = Number.POSITIVE_INFINITY

      for (let i = 0; i < nodes.length; i++) {
        if (!visited.has(i) && nodes[i].distance < minDist) {
          minDist = nodes[i].distance
          minNode = i
        }
      }

      if (minNode === -1) break

      visited.add(minNode)
      nodes[minNode].status = "visited"
      steps++
      setGraphNodes([...nodes])
      setComparisons(steps)
      await sleep(101 - speed)

      const neighbors = graphEdges.filter(([from]) => from === minNode)

      for (const [, to, weight] of neighbors) {
        if (!visited.has(to)) {
          const newDist = nodes[minNode].distance + weight
          if (newDist < nodes[to].distance) {
            nodes[to].distance = newDist
            nodes[to].status = "visiting"
          }
        }
      }

      setGraphNodes([...nodes])
    }
  }

  const handleStart = async () => {
    setIsRunning(true)
    setComparisons(0)
    setSwaps(0)

    const startTime = Date.now()

    switch (algorithm) {
      case "bubble":
        await bubbleSort()
        break
      case "merge":
        await mergeSort()
        break
      case "quick":
        await quickSort()
        break
      case "inorder":
        if (treeRoot) await inorderTraversal(treeRoot)
        break
      case "preorder":
        if (treeRoot) await preorderTraversal(treeRoot)
        break
      case "postorder":
        if (treeRoot) await postorderTraversal(treeRoot)
        break
      case "bfs":
        await bfsAlgorithm()
        break
      case "dfs":
        await dfsAlgorithm()
        break
      case "dijkstra":
        await dijkstraAlgorithm()
        break
      default:
        break
    }

    setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
    setIsRunning(false)
  }

  const getBarColor = (status: string) => {
    switch (status) {
      case "comparing":
        return "bg-red-500"
      case "sorted":
        return "bg-green-500"
      case "pivot":
        return "bg-yellow-500"
      case "visited":
        return "bg-green-500"
      case "visiting":
        return "bg-orange-500"
      default:
        return "bg-blue-500"
    }
  }

  const algorithmInfo: Record<Algorithm, { name: string; description: string; complexity: string; category: string }> =
    {
      bubble: {
        name: "Bubble Sort",
        description:
          "Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.",
        complexity: "O(n²)",
        category: "Sorting",
      },
      merge: {
        name: "Merge Sort",
        description:
          "Divide-and-conquer algorithm that divides the array in half, recursively sorts them, then merges them back.",
        complexity: "O(n log n)",
        category: "Sorting",
      },
      quick: {
        name: "Quick Sort",
        description: "Divide-and-conquer algorithm that picks a pivot element and partitions the array around it.",
        complexity: "O(n log n) avg",
        category: "Sorting",
      },
      insertion: {
        name: "Insertion Sort",
        description: "Builds the sorted array one item at a time by inserting elements into their correct position.",
        complexity: "O(n²)",
        category: "Sorting",
      },
      selection: {
        name: "Selection Sort",
        description: "Repeatedly finds the minimum element and places it at the beginning of the unsorted portion.",
        complexity: "O(n²)",
        category: "Sorting",
      },
      inorder: {
        name: "In-Order Traversal",
        description: "Traverses the tree in left-root-right order, producing sorted output for BST.",
        complexity: "O(n)",
        category: "Tree",
      },
      preorder: {
        name: "Pre-Order Traversal",
        description: "Traverses the tree in root-left-right order, useful for copying the tree.",
        complexity: "O(n)",
        category: "Tree",
      },
      postorder: {
        name: "Post-Order Traversal",
        description: "Traverses the tree in left-right-root order, useful for deleting the tree.",
        complexity: "O(n)",
        category: "Tree",
      },
      bst: {
        name: "Binary Search Tree",
        description: "A tree data structure where each node has at most two children, with left < parent < right.",
        complexity: "O(log n) avg",
        category: "Tree",
      },
      bfs: {
        name: "Breadth-First Search",
        description: "Explores vertices in layers, visiting all neighbors before moving to the next level.",
        complexity: "O(V + E)",
        category: "Graph",
      },
      dfs: {
        name: "Depth-First Search",
        description: "Explores as far as possible along each branch before backtracking.",
        complexity: "O(V + E)",
        category: "Graph",
      },
      dijkstra: {
        name: "Dijkstra's Algorithm",
        description: "Finds the shortest path from a source node to all other nodes in a weighted graph.",
        complexity: "O(V²)",
        category: "Graph",
      },
    }

  const calculateQuizScore = () => {
    let correct = 0
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) {
        correct++
      }
    })
    return correct
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-50 to-purple-50 p-1 rounded-lg">
          <TabsTrigger value="visualizer" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Visualizer
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visualizer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Algorithm Visualizer
                  </CardTitle>
                  <CardDescription>{algorithmInfo[algorithm].name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Array Visualization with Numbers */}
                  {["bubble", "merge", "quick", "insertion", "selection"].includes(algorithm) && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-8 rounded-lg min-h-80 flex items-end justify-center gap-1">
                        {array.map((el, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <div
                              className={`${getBarColor(el.status)} transition-all duration-100 rounded-t flex items-end justify-center font-bold text-white text-xs`}
                              style={{
                                height: `${(el.value / 100) * 200}px`,
                                width: `${100 / arraySize}%`,
                                minWidth: "2px",
                              }}
                            >
                              {arraySize <= 30 && el.value}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {array.map((el, idx) => (
                          <Badge
                            key={idx}
                            className={`${
                              el.status === "sorted"
                                ? "bg-green-500"
                                : el.status === "comparing"
                                  ? "bg-red-500"
                                  : el.status === "pivot"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                            } text-white`}
                          >
                            {el.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tree Visualization */}
                  {["inorder", "preorder", "postorder", "bst"].includes(algorithm) && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-8 rounded-lg min-h-64 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2">Binary Search Tree</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {treeRoot ? "Tree Generated" : "No Tree"}
                          </div>
                        </div>
                      </div>
                      {traversalOrder.length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                          <div className="text-sm font-medium mb-3">Traversal Order:</div>
                          <div className="flex flex-wrap gap-2">
                            {traversalOrder.map((val, idx) => (
                              <Badge key={idx} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                {val}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Graph Visualization */}
                  {["bfs", "dfs", "dijkstra"].includes(algorithm) && (
                    <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-8 rounded-lg min-h-64 relative">
                      <svg width="100%" height="250" className="absolute inset-0">
                        {graphEdges.map(([from, to, weight], idx) => {
                          const fromNode = graphNodes[from]
                          const toNode = graphNodes[to]
                          return (
                            <g key={idx}>
                              <line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke="#ccc"
                                strokeWidth="2"
                              />
                              <text
                                x={(fromNode.x + toNode.x) / 2}
                                y={(fromNode.y + toNode.y) / 2}
                                fontSize="12"
                                fill="#666"
                              >
                                {weight}
                              </text>
                            </g>
                          )
                        })}
                      </svg>
                      <div className="relative z-10">
                        {graphNodes.map((node) => (
                          <div
                            key={node.id}
                            className={`absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                              node.status === "visited"
                                ? "bg-green-500"
                                : node.status === "visiting"
                                  ? "bg-orange-500"
                                  : "bg-blue-500"
                            }`}
                            style={{ left: `${node.x}px`, top: `${node.y}px` }}
                          >
                            {node.id}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={handleStart}
                        disabled={isRunning}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                      <Button
                        onClick={() => setIsRunning(false)}
                        disabled={!isRunning}
                        variant="outline"
                        className="flex-1"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                      <Button
                        onClick={() => {
                          if (["bubble", "merge", "quick", "insertion", "selection"].includes(algorithm)) {
                            generateRandomArray()
                          } else if (["inorder", "preorder", "postorder", "bst"].includes(algorithm)) {
                            generateBST()
                          } else {
                            generateGraph()
                          }
                        }}
                        disabled={isRunning}
                        variant="outline"
                        className="flex-1"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-3">
                      {["bubble", "merge", "quick", "insertion", "selection"].includes(algorithm) && (
                        <div>
                          <label className="text-sm font-medium">Array Size: {arraySize}</label>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            value={arraySize}
                            onChange={(e) => setArraySize(Number(e.target.value))}
                            disabled={isRunning}
                            className="w-full"
                          />
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium">Speed: {speed}</label>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={speed}
                          onChange={(e) => setSpeed(Number(e.target.value))}
                          disabled={isRunning}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                        <div className="text-xs text-gray-600 font-medium">Comparisons</div>
                        <div className="text-lg font-bold text-blue-600">{comparisons}</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                        <div className="text-xs text-gray-600 font-medium">Swaps</div>
                        <div className="text-lg font-bold text-purple-600">{swaps}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                        <div className="text-xs text-gray-600 font-medium">Time (s)</div>
                        <div className="text-lg font-bold text-green-600">{timeElapsed}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Algorithm Selection */}
            <div className="space-y-4">
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Algorithms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  {/* Sorting Algorithms */}
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-2 uppercase">Sorting</div>
                    <div className="space-y-2">
                      {(["bubble", "merge", "quick"] as Algorithm[]).map((algo) => (
                        <button
                          key={algo}
                          onClick={() => {
                            setAlgorithm(algo)
                            generateRandomArray()
                          }}
                          disabled={isRunning}
                          className={`w-full text-left p-2 rounded text-sm transition-all ${
                            algorithm === algo
                              ? "bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-500 shadow-md"
                              : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                          } disabled:opacity-50`}
                        >
                          <div className="font-medium">{algorithmInfo[algo].name}</div>
                          <div className="text-xs text-gray-600">{algorithmInfo[algo].complexity}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tree Algorithms */}
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-2 uppercase">Tree</div>
                    <div className="space-y-2">
                      {(["inorder", "preorder", "postorder"] as Algorithm[]).map((algo) => (
                        <button
                          key={algo}
                          onClick={() => {
                            setAlgorithm(algo)
                            generateBST()
                          }}
                          disabled={isRunning}
                          className={`w-full text-left p-2 rounded text-sm transition-all ${
                            algorithm === algo
                              ? "bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 shadow-md"
                              : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                          } disabled:opacity-50`}
                        >
                          <div className="font-medium">{algorithmInfo[algo].name}</div>
                          <div className="text-xs text-gray-600">{algorithmInfo[algo].complexity}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Graph Algorithms */}
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-2 uppercase">Graph</div>
                    <div className="space-y-2">
                      {(["bfs", "dfs", "dijkstra"] as Algorithm[]).map((algo) => (
                        <button
                          key={algo}
                          onClick={() => {
                            setAlgorithm(algo)
                            generateGraph()
                          }}
                          disabled={isRunning}
                          className={`w-full text-left p-2 rounded text-sm transition-all ${
                            algorithm === algo
                              ? "bg-gradient-to-r from-purple-100 to-purple-200 border-2 border-purple-500 shadow-md"
                              : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                          } disabled:opacity-50`}
                        >
                          <div className="font-medium">{algorithmInfo[algo].name}</div>
                          <div className="text-xs text-gray-600">{algorithmInfo[algo].complexity}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardTitle className="text-lg">About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  <div>
                    <div className="text-sm font-medium mb-1">Algorithm</div>
                    <div className="text-sm text-gray-600">{algorithmInfo[algorithm].name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Category</div>
                    <Badge className="bg-blue-100 text-blue-800">{algorithmInfo[algorithm].category}</Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Description</div>
                    <div className="text-xs text-gray-600">{algorithmInfo[algorithm].description}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Time Complexity</div>
                    <Badge className="bg-green-100 text-green-800">{algorithmInfo[algorithm].complexity}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-6">
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Algorithm Quiz
              </CardTitle>
              <CardDescription>Test your knowledge of algorithms and data structures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {!showQuizResults ? (
                <>
                  {quizQuestions.map((question, idx) => (
                    <div key={question.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{question.question}</h3>
                          <Badge className="mt-2 bg-purple-100 text-purple-800">{question.algorithm}</Badge>
                        </div>
                      </div>
                      <div className="space-y-2 ml-11">
                        {question.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [question.id]: optIdx })}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              quizAnswers[question.id] === optIdx
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  quizAnswers[question.id] === optIdx
                                    ? "border-purple-500 bg-purple-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {quizAnswers[question.id] === optIdx && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <span className="text-gray-700">{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => setShowQuizResults(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white mt-6"
                  >
                    Submit Quiz
                  </Button>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg text-center border-2 border-purple-200">
                    <div className="text-5xl font-bold text-purple-600 mb-2">
                      {calculateQuizScore()}/{quizQuestions.length}
                    </div>
                    <div className="text-lg text-gray-700">
                      {calculateQuizScore() === quizQuestions.length
                        ? "Perfect Score! You're an algorithm master!"
                        : calculateQuizScore() >= quizQuestions.length * 0.7
                          ? "Great job! You have a solid understanding!"
                          : "Good effort! Keep learning!"}
                    </div>
                  </div>

                  {quizQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-2 ${
                        quizAnswers[question.id] === question.correct
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                            quizAnswers[question.id] === question.correct ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {quizAnswers[question.id] === question.correct ? "✓" : "✗"}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{question.question}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Your answer:{" "}
                            <span className="font-medium">{question.options[quizAnswers[question.id]]}</span>
                          </p>
                          {quizAnswers[question.id] !== question.correct && (
                            <p className="text-sm text-gray-600 mt-1">
                              Correct answer:{" "}
                              <span className="font-medium text-green-600">{question.options[question.correct]}</span>
                            </p>
                          )}
                          <p className="text-sm text-gray-700 mt-2 italic">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={() => {
                      setShowQuizResults(false)
                      setQuizAnswers({})
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
