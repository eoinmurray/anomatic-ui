"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Copy, ChevronRight, ChevronDown, Maximize, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"

type ObjectRendererProps = {
  data: any
  height?: string | number
  label?: string | null
  width?: string | number
  className?: string
  defaultExpanded?: boolean
}

export default function ObjectRenderer({
  data,
  height = "auto",
  width = "100%",
  label = null,
  className,
  defaultExpanded = true,
}: ObjectRendererProps) {
  const getAllPaths = useCallback((obj: any, currentPath = ""): string[] => {
    if (!obj || typeof obj !== "object") return []
    let paths: string[] = currentPath ? [currentPath] : []
    Object.keys(obj).forEach((key) => {
      const newPath = currentPath ? `${currentPath}.${key}` : key
      paths.push(newPath)
      if (obj[key] && typeof obj[key] === "object") {
        paths = [...paths, ...getAllPaths(obj[key], newPath)]
      }
    })
    return paths
  }, [])

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => {
    return defaultExpanded ? new Set(["root", ...getAllPaths(data)]) : new Set()
  })
  const [allExpanded, setAllExpanded] = useState(defaultExpanded)

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (defaultExpanded) {
      const paths = new Set(["root", ...getAllPaths(data)])
      setExpandedKeys(paths)
      setAllExpanded(true)
    } else {
      setExpandedKeys(new Set())
      setAllExpanded(false)
    }
  }, [data, defaultExpanded, getAllPaths])

  const objectString = useMemo(() => JSON.stringify(data, null, 2), [data])

  const toggleExpand = useCallback((path: string) => {
    setExpandedKeys((prev) => {
      const newSet = new Set(prev)
      newSet.has(path) ? newSet.delete(path) : newSet.add(path)
      return newSet
    })
  }, [])

  const toggleExpandAll = useCallback(() => {
    if (allExpanded) {
      setExpandedKeys(new Set())
    } else {
      const paths = new Set(["root", ...getAllPaths(data)])
      setExpandedKeys(paths)
    }
    setAllExpanded(!allExpanded)
  }, [allExpanded, data, getAllPaths])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(objectString)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }, [objectString])

  const renderValue = useCallback(
    (value: any, path = "root", level = 0) => {
      const indent = "  ".repeat(level)
      const nextLevel = level + 1
      const isArray = Array.isArray(value)

      if (value === null) return <span className="text-gray-500">null</span>
      if (value === undefined) return <span className="text-gray-500">undefined</span>
      if (typeof value === "string") return <span className="text-green-600 dark:text-green-400">"{value}"</span>
      if (typeof value === "number") return <span className="text-orange-600 dark:text-orange-400">{value}</span>
      if (typeof value === "boolean") return <span className="text-purple-600 dark:text-purple-400">{value.toString()}</span>

      if (typeof value === "object") {
        const keys = Object.keys(value)
        if (keys.length === 0) return <span>{isArray ? "[]" : "{}"}</span>

        const isExpanded = expandedKeys.has(path)

        if (!isExpanded) {
          return (
            <span
              className="text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-1 "
              onClick={() => toggleExpand(path)}
            >
              {isArray ? "[...]" : "{...}"}
            </span>
          )
        }

        return (
          <>
            <span
              className="text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-1 "
              onClick={() => toggleExpand(path)}
            >
              {isArray ? "[" : "{"}
            </span>
            <div className="pl-4">
              {keys.map((key, i) => {
                const val = value[key]
                const childPath = path === "root" ? key : `${path}.${key}`
                const isLast = i === keys.length - 1
                return (
                  <div key={childPath}>
                    {!isArray && (
                      <>
                        {(() => {
                          const isExpandable = val && typeof val === "object" && Object.keys(val).length > 0
                          return (
                            <span
                              className={cn(
                                "text-blue-600 dark:text-blue-400",
                                isExpandable && "cursor-pointer hover:underline hover:font-semibold"
                              )}
                              onClick={() => {
                                if (isExpandable) toggleExpand(childPath)
                              }}
                            >
                              "{key}"
                            </span>
                          )
                        })()}
                        <span className="text-gray-500">: </span>
                      </>
                    )}
                    {isArray && <span className="text-gray-500">- </span>}
                    {renderValue(val, childPath, nextLevel)}
                    {!isLast && <span className="text-gray-500">,</span>}
                  </div>
                )
              })}
            </div>
            <span
              className="text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-1 "
              onClick={() => toggleExpand(path)}
            >
              {isArray ? "]" : "}"}
            </span>
          </>
        )
      }

      return <span>{String(value)}</span>
    },
    [expandedKeys, toggleExpand]
  )

  return (
    <div
      suppressHydrationWarning
      className={cn("border -md overflow-auto bg-white dark:bg-gray-950 font-mono text-xs", className)}
      style={{ height, width }}
    >
      <div className="sticky top-0 z-10 flex justify-between gap-2 items-center p-2 border-b bg-gray-50 dark:bg-gray-900">
        <div className="text-lg font-mono font-bold">{label}</div>

        <div className="flex gap-2">
          <button
            onClick={toggleExpandAll}
            className="flex items-center text-xs px-2 py-1  hover:font-semibold hover:underline"
          >
          {allExpanded ? (
            <>
              <Minimize className="h-3 w-3 mr-1" />
              Collapse All
            </>
          ) : (
            <>
              <Maximize className="h-3 w-3 mr-1" />
              Expand All
            </>
          )}
        </button>
        <button
          onClick={copyToClipboard}
          className="flex items-center text-xs px-2 py-1  hover:font-semibold hover:underline"
        >
          {copied ? (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </button>
        </div>
      </div>
      <div className="p-2">{renderValue(data)}</div>
    </div>
  )
}
