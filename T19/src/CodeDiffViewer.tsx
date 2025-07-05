"use client";

import type React from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface DiffLine {
  oldLineNumber: number | null;
  newLineNumber: number | null;
  type: "added" | "removed" | "modified" | "unchanged" | "conflict";
  oldContent: string;
  newContent: string;
  isCollapsed?: boolean;
  isConflict?: boolean;
}

interface DiffSection {
  id: string;
  startLine: number;
  endLine: number;
  isCollapsed: boolean;
  type: "unchanged" | "changed" | "conflict";
  lines: DiffLine[];
}

interface HistoryEntry {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  oldCode: string;
  newCode: string;
}

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    outline:
      "border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900/20 focus:ring-purple-500",
    ghost:
      "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:ring-slate-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
  className?: string;
}) => {
  const variants = {
    default:
      "bg-slate-100 text-black border border-slate-300 dark:bg-gray-800 dark:text-gray-200 dark:border-slate-600",
    success:
      "bg-green-100 text-black border border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-600",
    error:
      "bg-red-100 text-black border border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-600",
    warning:
      "bg-yellow-100 text-black border border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600",
    info: "bg-blue-100 text-black border border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-600",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const ChevronDown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const ChevronRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const Download = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ArrowUp = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 11l5-5m0 0l5 5m-5-5v12"
    />
  </svg>
);

const ArrowDown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 13l-5 5m0 0l-5-5m5 5V6"
    />
  </svg>
);

const AlertTriangle = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

const Edit3 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const Save = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);

const X = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Moon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const Sun = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const Code2 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const FileText = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const Zap = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const History = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Clock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Loader2 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={`${className} animate-spin`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const CheckCircle = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Menu = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const Info = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Upload = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const Folder = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const AnimatedLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <div
    className={`relative transition-all duration-300 ease-out ${className} group`}
  >
    <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/60 group-hover:scale-105">
      <div className="w-full h-full flex items-center justify-center">
        <span
          className={`text-white font-bold select-none transition-all duration-300 ease-in-out group-hover:scale-110 ${
            className?.includes("w-full") ? "text-3xl" : "text-base"
          }`}
          style={{
            textShadow: "none",
            transition: "all 0.3s ease",
            lineHeight: "1",
            fontFamily: "system-ui, -apple-system, sans-serif",
            display: "block",
            textAlign: "center",
            transform: "translateY(-1px) translateX(-1px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textShadow =
              "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textShadow = "none";
          }}
        >
          C
        </span>
      </div>
    </div>
  </div>
);

// Memoization cache for syntax highlighting
const syntaxCache = new Map<string, string>();

const highlightSyntax = (code: string): string => {
  // Check cache first for performance
  if (syntaxCache.has(code)) {
    return syntaxCache.get(code)!;
  }

  const result = code
    .replace(
      /\b(import|export|const|let|var|function|class|interface|type|enum|return|if|else|for|while|try|catch|finally|async|await|public|private|protected|static)\b/g,
      `<span class="syntax-keyword">$1</span>`
    )
    .replace(
      /\b(React|useState|useEffect|useCallback|useMemo|string|number|boolean|void|null|undefined|any|object)\b/g,
      `<span class="syntax-type">$1</span>`
    )
    .replace(/'([^']*)'/g, `<span class="syntax-string">'$1'</span>`)
    .replace(/"([^"]*)"/g, `<span class="syntax-string">"$1"</span>`)
    .replace(/`([^`]*)`/g, `<span class="syntax-string">\`$1\`</span>`)
    .replace(/(\/\/.*$)/gm, '<span class="syntax-comment">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>')
    .replace(/\b(\d+)\b/g, `<span class="syntax-number">$1</span>`);

  // Cache the result (limit cache size to prevent memory issues)
  if (syntaxCache.size > 1000) {
    syntaxCache.clear();
  }
  syntaxCache.set(code, result);

  return result;
};

const calculateDiff = (oldContent: string, newContent: string): DiffLine[] => {
  const oldLines = oldContent.split("\n");
  const newLines = newContent.split("\n");
  const diff: DiffLine[] = [];

  let oldIndex = 0;
  let newIndex = 0;

  while (oldIndex < oldLines.length || newIndex < newLines.length) {
    const oldLine = oldLines[oldIndex] || "";
    const newLine = newLines[newIndex] || "";

    if (oldIndex >= oldLines.length) {
      diff.push({
        oldLineNumber: null,
        newLineNumber: newIndex + 1,
        type: "added",
        oldContent: "",
        newContent: newLine,
      });
      newIndex++;
    } else if (newIndex >= newLines.length) {
      diff.push({
        oldLineNumber: oldIndex + 1,
        newLineNumber: null,
        type: "removed",
        oldContent: oldLine,
        newContent: "",
      });
      oldIndex++;
    } else if (oldLine === newLine) {
      diff.push({
        oldLineNumber: oldIndex + 1,
        newLineNumber: newIndex + 1,
        type: "unchanged",
        oldContent: oldLine,
        newContent: newLine,
      });
      oldIndex++;
      newIndex++;
    } else {
      const similarity = calculateSimilarity(oldLine, newLine);
      if (similarity > 0.3) {
        diff.push({
          oldLineNumber: oldIndex + 1,
          newLineNumber: newIndex + 1,
          type: "modified",
          oldContent: oldLine,
          newContent: newLine,
          isConflict: similarity < 0.7,
        });
        oldIndex++;
        newIndex++;
      } else {
        diff.push({
          oldLineNumber: oldIndex + 1,
          newLineNumber: null,
          type: "removed",
          oldContent: oldLine,
          newContent: "",
        });
        diff.push({
          oldLineNumber: null,
          newLineNumber: newIndex + 1,
          type: "added",
          oldContent: "",
          newContent: newLine,
        });
        oldIndex++;
        newIndex++;
      }
    }
  }

  return diff;
};

const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

const groupIntoSections = (diffLines: DiffLine[]): DiffSection[] => {
  const sections: DiffSection[] = [];
  let currentSection: DiffLine[] = [];
  let currentType: "unchanged" | "changed" | "conflict" = "unchanged";
  let sectionStart = 0;

  diffLines.forEach((line, index) => {
    const lineType =
      line.type === "unchanged"
        ? "unchanged"
        : line.isConflict
        ? "conflict"
        : "changed";

    if (lineType !== currentType || currentSection.length > 20) {
      if (currentSection.length > 0) {
        sections.push({
          id: `section-${sections.length}`,
          startLine: sectionStart,
          endLine: sectionStart + currentSection.length - 1,
          isCollapsed: currentType === "unchanged" && currentSection.length > 5,
          type: currentType,
          lines: currentSection,
        });
      }
      currentSection = [line];
      currentType = lineType;
      sectionStart = index;
    } else {
      currentSection.push(line);
    }
  });

  if (currentSection.length > 0) {
    sections.push({
      id: `section-${sections.length}`,
      startLine: sectionStart,
      endLine: sectionStart + currentSection.length - 1,
      isCollapsed: currentType === "unchanged" && currentSection.length > 5,
      type: currentType,
      lines: currentSection,
    });
  }

  return sections;
};

export default function CodeDiffViewer() {
  const [isDark, setIsDark] = useState(true);
  const [oldCode, setOldCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [sections, setSections] = useState<DiffSection[]>([]);
  const [currentChangeIndex, setCurrentChangeIndex] = useState<number>(0);
  const [editingLine, setEditingLine] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [showInputs, setShowInputs] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isHistoryAnimating, setIsHistoryAnimating] = useState(false);
  const [isShortcutsAnimating, setIsShortcutsAnimating] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "dummy-export-2",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toLocaleString(), // 30 minutes ago
      action: "Export",
      details: "Diff exported to code-diff-2025-01-02.txt",
      oldCode: "",
      newCode: "",
    },
    {
      id: "dummy-export-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toLocaleString(), // 2 hours ago
      action: "Export",
      details: "Diff exported to code-diff-comparison.txt",
      oldCode: "",
      newCode: "",
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDiffContent, setShowDiffContent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [lastSavedContent, setLastSavedContent] = useState<string>("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoadFiles, setShowLoadFiles] = useState(false);
  const [isEditingChangeIndex, setIsEditingChangeIndex] = useState(false);
  const [editChangeIndexValue, setEditChangeIndexValue] = useState("");
  const [uploadedOriginalFile, setUploadedOriginalFile] = useState<File | null>(
    null
  );
  const [uploadedModifiedFile, setUploadedModifiedFile] = useState<File | null>(
    null
  );
  const [showUploadAlert, setShowUploadAlert] = useState(false);
  const [showExportAlert, setShowExportAlert] = useState(false);
  const [showKeyFeatures, setShowKeyFeatures] = useState(true);
  const [showNavigationAlert, setShowNavigationAlert] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const changeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const originalFileInputRef = useRef<HTMLInputElement>(null);
  const modifiedFileInputRef = useRef<HTMLInputElement>(null);

  const sampleOldCode = `import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick
}) => {
  return (
    <button
      className={cn(
        'rounded-md font-medium',
        variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800',
        size === 'sm' ? 'px-2 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`;

  const sampleNewCode = `import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick
}) => {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        variant === 'primary' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 
        variant === 'destructive' ? 'bg-red-500 hover:bg-red-600 text-white' :
        'bg-gray-200 hover:bg-gray-300 text-gray-800',
        size === 'sm' ? 'px-2 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2',
        (disabled || loading) && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};`;

  useEffect(() => {
    if (!oldCode && !newCode) {
      setOldCode(sampleOldCode);
      setNewCode(sampleNewCode);
      setLastSavedContent("");
      setHasUnsavedChanges(true);
    }
  }, []);

  useEffect(() => {
    const progressSteps = [
      { progress: 30, delay: 200 },
      { progress: 60, delay: 500 },
      { progress: 100, delay: 800 },
    ];

    progressSteps.forEach(({ progress, delay }) => {
      setTimeout(() => {
        setLoadingProgress(progress);
      }, delay);
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (oldCode && newCode) {
      const diffLines = calculateDiff(oldCode, newCode);
      const diffSections = groupIntoSections(diffLines);
      setSections(diffSections);
      setCurrentChangeIndex(0);

      // Clear existing refs when sections change
      changeRefs.current = [];

      if (lastSavedContent === "") {
        setLastSavedContent(newCode);
      }
    }
  }, [oldCode, newCode, lastSavedContent]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.height = "auto";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = isDark ? "#0f172a" : "#f8fafc";
    document.body.style.overscrollBehavior = "none";

    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.height = "auto";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.backgroundColor = isDark
      ? "#0f172a"
      : "#f8fafc";
    document.documentElement.style.overscrollBehavior = "none";

    // Ensure page starts at the top
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
      document.body.style.height = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.overscrollBehavior = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowX = "";
      document.documentElement.style.height = "";
      document.documentElement.style.margin = "";
      document.documentElement.style.padding = "";
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [isDark]);

  const addToHistory = (action: string, details: string) => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      action,
      details,
      oldCode,
      newCode,
    };
    setHistory((prev) => [newEntry, ...prev.slice(0, 9)]);
  };

  const toggleHistory = () => {
    if (showHistory) {
      setIsHistoryAnimating(true);
      setTimeout(() => {
        setShowHistory(false);
        setIsHistoryAnimating(false);
      }, 300);
    } else {
      if (showShortcuts) {
        setIsShortcutsAnimating(true);
        setTimeout(() => {
          setShowShortcuts(false);
          setIsShortcutsAnimating(false);
        }, 300);
      }

      setShowHistory(true);
      setIsHistoryAnimating(true);
      setTimeout(() => setIsHistoryAnimating(false), 300);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleShortcuts = () => {
    if (showShortcuts) {
      setIsShortcutsAnimating(true);
      setTimeout(() => {
        setShowShortcuts(false);
        setIsShortcutsAnimating(false);
      }, 300);
    } else {
      if (showHistory) {
        setIsHistoryAnimating(true);
        setTimeout(() => {
          setShowHistory(false);
          setIsHistoryAnimating(false);
        }, 300);
      }

      setShowShortcuts(true);
      setIsShortcutsAnimating(true);
      setTimeout(() => setIsShortcutsAnimating(false), 300);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToastNotification = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const changes = useMemo(() => {
    const changeLines: number[] = [];
    // Pre-allocate array size for better performance
    let estimatedSize = 0;
    sections.forEach((section) => {
      if (section.type !== "unchanged") {
        estimatedSize += section.lines.length;
      }
    });

    sections.forEach((section, sectionIndex) => {
      if (section.type !== "unchanged") {
        section.lines.forEach((line, lineIndex) => {
          if (line.type !== "unchanged") {
            changeLines.push(sectionIndex * 1000 + lineIndex);
          }
        });
      }
    });
    return changeLines;
  }, [sections]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            if (showInputs || showLoadFiles) {
              setShowNavigationAlert(true);
            } else {
              navigateToChange("next");
            }
            break;
          case "ArrowUp":
            e.preventDefault();
            if (showInputs || showLoadFiles) {
              setShowNavigationAlert(true);
            } else {
              navigateToChange("prev");
            }
            break;
          case "s":
            e.preventDefault();
            if (editingLine !== null) {
              handleSave();
            } else {
              const currentCode = newCode || "";
              const savedCode = lastSavedContent || "";

              if (
                currentCode.trim() !== savedCode.trim() ||
                hasUnsavedChanges
              ) {
                const saveTime = new Date().toLocaleString();
                addToHistory("Save", `File saved at ${saveTime}`);
                setLastSavedTime(saveTime);
                setLastSavedContent(currentCode);
                setHasUnsavedChanges(false);
                showToastNotification("success", "File saved successfully!");
              } else {
                showToastNotification("info", "No changes to save");
              }
            }
            break;
          case "e":
            e.preventDefault();
            if (showInputs || showLoadFiles) {
              setShowExportAlert(true);
            } else {
              exportDiff();
            }
            break;
          case "h":
            e.preventDefault();
            toggleHistory();
            break;
        }
      }

      if (e.key === "Escape") {
        if (editingLine !== null) {
          setEditingLine(null);
          setEditContent("");
        } else if (isEditingChangeIndex) {
          cancelChangeIndexEdit();
        } else if (showExportAlert) {
          setShowExportAlert(false);
        } else if (showUploadAlert) {
          setShowUploadAlert(false);
        } else if (showNavigationAlert) {
          setShowNavigationAlert(false);
        } else if (showHistory) {
          setIsHistoryAnimating(true);
          setTimeout(() => {
            setShowHistory(false);
            setIsHistoryAnimating(false);
          }, 300);
        } else if (showShortcuts) {
          setIsShortcutsAnimating(true);
          setTimeout(() => {
            setShowShortcuts(false);
            setIsShortcutsAnimating(false);
          }, 300);
        } else if (showMobileMenu) {
          setShowMobileMenu(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentChangeIndex,
    changes.length,
    editingLine,
    isEditingChangeIndex,
    showMobileMenu,
    showShortcuts,
    showHistory,
    showExportAlert,
    showUploadAlert,
    showNavigationAlert,
    showInputs,
    showLoadFiles,
    sections.length,
    newCode,
    lastSavedContent,
    hasUnsavedChanges,
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showMobileMenu) {
        const target = e.target as HTMLElement;
        const mobileMenuContainer = document.querySelector(
          ".mobile-menu-container"
        );
        const mobileMenuContainerMd = document.querySelector(
          ".mobile-menu-container-md"
        );
        const mobileMenuDropdown = document.querySelector(
          ".mobile-menu-dropdown"
        );
        const mobileMenuDropdownMd = document.querySelector(
          ".mobile-menu-dropdown-md"
        );

        // Check if click is outside all mobile menu elements
        const isOutsideMenu =
          (!mobileMenuContainer || !mobileMenuContainer.contains(target)) &&
          (!mobileMenuContainerMd || !mobileMenuContainerMd.contains(target)) &&
          (!mobileMenuDropdown || !mobileMenuDropdown.contains(target)) &&
          (!mobileMenuDropdownMd || !mobileMenuDropdownMd.contains(target));

        if (isOutsideMenu) {
          setShowMobileMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileMenu]);

  useEffect(() => {
    const checkWindowHeight = () => {
      if (typeof window !== "undefined") {
        setShowKeyFeatures(window.innerHeight > 760);
      }
    };

    // Check initial height
    checkWindowHeight();

    // Add resize listener
    window.addEventListener("resize", checkWindowHeight);
    return () => window.removeEventListener("resize", checkWindowHeight);
  }, []);

  const navigateToChange = useCallback(
    (direction: "next" | "prev") => {
      if (changes.length === 0) return;

      let newIndex = currentChangeIndex;
      if (direction === "next") {
        newIndex = (currentChangeIndex + 1) % changes.length;
      } else {
        newIndex =
          currentChangeIndex === 0
            ? changes.length - 1
            : currentChangeIndex - 1;
      }

      const changeId = changes[newIndex];

      // Update index first
      setCurrentChangeIndex(newIndex);

      // Use requestAnimationFrame for smoother, immediate scrolling
      requestAnimationFrame(() => {
        const element = changeRefs.current[changeId];
        if (element) {
          const container = containerRef.current;
          if (container) {
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const scrollTop = container.scrollTop;
            const offset =
              elementRect.top -
              containerRect.top +
              scrollTop -
              container.clientHeight / 2 +
              element.clientHeight / 2;

            // Use instant scrolling for snappy navigation
            container.scrollTo({
              top: Math.max(0, offset),
              behavior: "instant",
            });
          } else {
            element.scrollIntoView({ behavior: "instant", block: "center" });
          }
        } else {
          // Simplified fallback
          const fallbackElement = document.querySelector(
            `[data-change-id="${changeId}"]`
          );
          if (fallbackElement) {
            fallbackElement.scrollIntoView({
              behavior: "instant",
              block: "center",
            });
          }
        }
      });
    },
    [currentChangeIndex, changes.length]
  );

  const startEditingChangeIndex = () => {
    setIsEditingChangeIndex(true);
    setEditChangeIndexValue((currentChangeIndex + 1).toString());
  };

  const cancelChangeIndexEdit = () => {
    setIsEditingChangeIndex(false);
    setEditChangeIndexValue("");
  };

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, isCollapsed: !section.isCollapsed }
          : section
      )
    );
  };

  const exportDiff = () => {
    const diffText = sections
      .map((section) => {
        let sectionText = `\n--- ${section.type.toUpperCase()} SECTION (Lines ${
          section.startLine + 1
        }-${section.endLine + 1}) ---\n`;

        section.lines.forEach((line) => {
          const prefix =
            line.type === "added"
              ? "+"
              : line.type === "removed"
              ? "-"
              : line.type === "modified"
              ? "~"
              : " ";

          if (line.oldContent && line.type !== "added") {
            sectionText += `${prefix} ${line.oldLineNumber || ""}: ${
              line.oldContent
            }\n`;
          }
          if (line.newContent && line.type !== "removed") {
            sectionText += `${prefix} ${line.newLineNumber || ""}: ${
              line.newContent
            }\n`;
          }
        });

        return sectionText;
      })
      .join("\n");

    const blob = new Blob([diffText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-diff-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    addToHistory("Export", "Diff exported to file");
    showToastNotification("success", "Downloaded successfully!");
  };

  const startEditing = (
    lineIndex: number,
    sectionIndex: number,
    content: string
  ) => {
    const globalLineIndex = sectionIndex * 1000 + lineIndex;
    setEditingLine(globalLineIndex);
    setEditContent(content);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    if (editingLine === null) return;

    const sectionIndex = Math.floor(editingLine / 1000);
    const lineIndex = editingLine % 1000;

    const currentContent = sections[sectionIndex].lines[lineIndex].newContent;
    if (editContent === currentContent) {
      showToastNotification("info", "No changes made");
      setEditingLine(null);
      setEditContent("");
      return;
    }

    setSections((prev) =>
      prev.map((section, sIdx) => {
        if (sIdx === sectionIndex) {
          return {
            ...section,
            lines: section.lines.map((line, lIdx) => {
              if (lIdx === lineIndex) {
                return { ...line, newContent: editContent };
              }
              return line;
            }),
          };
        }
        return section;
      })
    );

    const newLines = newCode.split("\n");
    const actualLineNumber =
      sections[sectionIndex].lines[lineIndex].newLineNumber;
    if (actualLineNumber) {
      newLines[actualLineNumber - 1] = editContent;
      const updatedNewCode = newLines.join("\n");
      setNewCode(updatedNewCode);
      setLastSavedContent(updatedNewCode);
    }

    addToHistory("Edit", `Modified line ${actualLineNumber}`);
    const saveTime = new Date().toLocaleString();
    addToHistory("Save", `File saved at ${saveTime}`);
    setLastSavedTime(saveTime);
    setHasUnsavedChanges(false);
    showToastNotification("success", "File saved successfully!");
    setEditingLine(null);
    setEditContent("");
  };

  const cancelEdit = () => {
    setEditingLine(null);
    setEditContent("");
  };

  const getLineClassName = useCallback(
    (line: DiffLine, isOld = false) => {
      const base =
        "font-mono text-sm leading-relaxed px-2 sm:px-4 py-1 border-l-4 transition-all duration-200 border";

      if (line.isConflict) {
        return `${base} ${
          isDark
            ? "bg-red-950/50 border-l-red-400 border-red-500/30 text-red-100"
            : "bg-red-100/80 border-l-red-600 border-red-200 text-red-900"
        }`;
      }

      switch (line.type) {
        case "added":
          return `${base} ${
            isDark
              ? "bg-green-950/50 border-l-green-400 border-green-500/30 text-green-100"
              : "bg-green-100/80 border-l-green-600 border-green-200 text-green-900"
          }`;
        case "removed":
          return `${base} ${
            isDark
              ? "bg-red-950/50 border-l-red-400 border-red-500/30 text-red-100"
              : "bg-red-100/80 border-l-red-600 border-red-200 text-red-900"
          }`;
        case "modified":
          return `${base} ${
            isOld
              ? isDark
                ? "bg-yellow-950/50 border-l-yellow-400 border-yellow-500/30 text-yellow-100"
                : "bg-yellow-100/80 border-l-yellow-600 border-yellow-200 text-yellow-900"
              : isDark
              ? "bg-purple-950/50 border-l-purple-400 border-purple-500/30 text-purple-100"
              : "bg-purple-100/80 border-l-purple-600 border-purple-200 text-purple-900"
          }`;
        default:
          return `${base} ${
            isDark
              ? "bg-gray-900/50 border-l-gray-600 border-gray-600/30 text-gray-100"
              : "bg-slate-50/90 border-l-slate-400 border-slate-200 text-slate-800"
          }`;
      }
    },
    [isDark]
  );

  const generateDiff = async () => {
    if (!oldCode.trim() || !newCode.trim()) {
      alert("Please enter both old and new code versions");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowInputs(false);

    setTimeout(() => {
      setShowDiffContent(true);
      setIsGenerating(false);

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }, 300);

    addToHistory("Generate", "New diff comparison created");
    setHasUnsavedChanges(true);
  };

  const resetDiff = () => {
    setShowMobileMenu(false);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Set inputs to true immediately to prevent flicker
    setShowInputs(true);
    setShowDiffContent(false);
    setShowLoadFiles(false);
    setSections([]);
    setEditingLine(null);
    setCurrentChangeIndex(0);
    setIsGenerating(false);
    setLastSavedContent("");
    setHasUnsavedChanges(false);
    setUploadedOriginalFile(null);
    setUploadedModifiedFile(null);

    // Ensure scroll to top after brief delay for smooth transition
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleFileUpload = (type: "original" | "modified") => {
    const fileInput =
      type === "original"
        ? originalFileInputRef.current
        : modifiedFileInputRef.current;
    fileInput?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "original" | "modified"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = [
      "text/plain",
      "text/javascript",
      "text/x-typescript",
      "application/javascript",
      "application/typescript",
    ];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = [
      "txt",
      "js",
      "jsx",
      "ts",
      "tsx",
      "py",
      "java",
      "cpp",
      "c",
      "html",
      "css",
      "json",
      "xml",
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension || "")
    ) {
      showToastNotification(
        "error",
        "Please upload a text or code file (txt, js, jsx, ts, tsx, py, java, cpp, c, html, css, json, xml)"
      );
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToastNotification(
        "error",
        "File size too large. Please upload a file smaller than 10MB."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      if (type === "original") {
        setUploadedOriginalFile(file);
        setOldCode(content);
      } else {
        setUploadedModifiedFile(file);
        setNewCode(content);
      }

      setHasUnsavedChanges(true);
      showToastNotification("success", `${file.name} uploaded successfully!`);
    };

    reader.onerror = () => {
      showToastNotification("error", "Error reading file. Please try again.");
    };

    reader.readAsText(file);

    // Reset the input value to allow re-uploading the same file
    event.target.value = "";
  };

  const handleGenerateFromFiles = async () => {
    if (!uploadedOriginalFile || !uploadedModifiedFile) {
      setShowUploadAlert(true);
      return;
    }

    setIsGenerating(true);

    // Simulate processing time for better UX
    setTimeout(() => {
      setShowLoadFiles(false);
      setShowInputs(false);
      setShowDiffContent(true);
      addToHistory("Load Files", "Files loaded and processed for comparison");
      showToastNotification("success", "Files loaded successfully!");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <>
      {/* Animated background elements - Only show after loading */}
      {!isLoading && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0">
            {/* Floating orbs with Tailwind animations */}
            <div
              className={`absolute w-64 h-64 rounded-full animate-bounce ${
                isDark
                  ? "bg-gradient-to-br from-purple-500/30 to-blue-500/30"
                  : "bg-gradient-to-br from-purple-400/25 to-blue-400/25"
              }`}
              style={{
                top: "10%",
                left: "5%",
                filter: "blur(1px)",
                animation: "bounce 3s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />

            <div
              className={`absolute w-48 h-48 rounded-full animate-pulse ${
                isDark
                  ? "bg-gradient-to-br from-blue-500/35 to-indigo-500/35"
                  : "bg-gradient-to-br from-blue-300/30 to-indigo-300/30"
              }`}
              style={{
                top: "60%",
                right: "10%",
                filter: "blur(0.5px)",
                animation: "pulse 4s ease-in-out infinite",
                animationDelay: "1s",
              }}
            />

            <div
              className={`absolute w-32 h-32 rounded-full animate-ping ${
                isDark
                  ? "bg-gradient-to-br from-indigo-500/40 to-purple-500/40"
                  : "bg-gradient-to-br from-indigo-300/35 to-purple-300/35"
              }`}
              style={{
                top: "30%",
                right: "25%",
                filter: "blur(0.8px)",
                animation: "ping 2.5s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            />

            <div
              className={`absolute w-40 h-40 rounded-full animate-bounce ${
                isDark
                  ? "bg-gradient-to-br from-purple-600/25 to-pink-500/25"
                  : "bg-gradient-to-br from-purple-300/30 to-pink-300/30"
              }`}
              style={{
                bottom: "20%",
                left: "15%",
                filter: "blur(1.5px)",
                animation: "bounce 3.5s ease-in-out infinite",
                animationDelay: "2s",
              }}
            />

            <div
              className={`absolute w-56 h-56 rounded-full animate-pulse ${
                isDark
                  ? "bg-gradient-to-br from-blue-600/20 to-cyan-500/20"
                  : "bg-gradient-to-br from-blue-300/25 to-cyan-300/25"
              }`}
              style={{
                top: "5%",
                right: "5%",
                filter: "blur(2px)",
                animation: "pulse 5s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            />

            <div
              className={`absolute w-20 h-20 rounded-full animate-ping ${
                isDark
                  ? "bg-gradient-to-br from-cyan-500/45 to-blue-500/45"
                  : "bg-gradient-to-br from-cyan-300/40 to-blue-300/40"
              }`}
              style={{
                top: "45%",
                left: "8%",
                filter: "blur(0.3px)",
                animation: "ping 2s ease-in-out infinite",
                animationDelay: "0.8s",
              }}
            />

            <div
              className={`absolute w-28 h-28 rounded-full animate-bounce ${
                isDark
                  ? "bg-gradient-to-br from-pink-500/35 to-purple-500/35"
                  : "bg-gradient-to-br from-pink-300/35 to-purple-300/35"
              }`}
              style={{
                bottom: "35%",
                right: "30%",
                filter: "blur(1.2px)",
                animation: "bounce 4s ease-in-out infinite",
                animationDelay: "2.5s",
              }}
            />

            {/* Central orb */}
            <div
              className={`absolute w-96 h-96 rounded-full animate-pulse ${
                isDark
                  ? "bg-gradient-to-br from-purple-400/50 to-blue-400/50"
                  : "bg-gradient-to-br from-purple-500/40 to-blue-500/40"
              }`}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                filter: "blur(2px)",
                animation: "pulse 6s ease-in-out infinite",
              }}
            />

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-br from-purple-900/15 via-blue-900/10 to-indigo-900/15"
                  : "bg-gradient-to-br from-purple-200/20 via-blue-200/15 to-indigo-200/20"
              }`}
            />
          </div>
        </div>
      )}
      {/* Export Alert */}
      {showExportAlert && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] transition-all duration-300 ease-out"
            onClick={() => setShowExportAlert(false)}
          />

          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] z-[10000] transition-all duration-300 ease-out">
            <div
              className={`rounded-2xl border shadow-2xl backdrop-blur-xl ${
                isDark
                  ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-600/50"
                  : "bg-gradient-to-br from-white via-white to-yellow-50/30 border-yellow-200/60"
              }`}
            >
              <div
                className={`px-6 py-5 border-b ${
                  isDark
                    ? "border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-yellow-900/20"
                    : "border-yellow-200/50 bg-gradient-to-r from-white/80 to-yellow-100/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        isDark
                          ? "bg-gradient-to-br from-yellow-600/25 to-yellow-700/25 text-yellow-300 border border-yellow-500/20"
                          : "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 border border-yellow-300/40 shadow-sm"
                      }`}
                    >
                      <Info className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          isDark
                            ? "text-white"
                            : "bg-gradient-to-r from-yellow-700 to-yellow-600 bg-clip-text text-transparent"
                        }`}
                      >
                        Export Not Available
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          isDark ? "text-gray-400" : "text-slate-600"
                        }`}
                      >
                        Feature not available on this screen
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowExportAlert(false)}
                    className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-yellow-100 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-gray-300" : "text-slate-600"
                    }`}
                  >
                    The export diff feature is only available after generating a
                    code comparison. Please generate or view a diff first, then
                    use{" "}
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                      Ctrl+E
                    </span>{" "}
                    to export.
                  </p>

                  <div
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? "bg-purple-900/20 border-purple-500/30 text-purple-200"
                        : "bg-purple-100/60 border-purple-300/50 text-purple-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isDark
                            ? "bg-purple-600/25 text-purple-300"
                            : "bg-purple-200/60 text-purple-600"
                        }`}
                      >
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          Available Actions:
                        </h4>
                        <ul className="text-xs space-y-1 opacity-90">
                          <li>• Generate a diff comparison first</li>
                          <li>• View the diff results</li>
                          <li>• Then use Ctrl+E to export</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    onClick={() => setShowExportAlert(false)}
                    className="px-6"
                  >
                    Got It
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Navigation Alert */}
      {showNavigationAlert && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] transition-all duration-300 ease-out"
            onClick={() => setShowNavigationAlert(false)}
          />

          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] z-[10000] transition-all duration-300 ease-out">
            <div
              className={`rounded-2xl border shadow-2xl backdrop-blur-xl ${
                isDark
                  ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-600/50"
                  : "bg-gradient-to-br from-white via-white to-yellow-50/30 border-yellow-200/60"
              }`}
            >
              <div
                className={`px-6 py-5 border-b ${
                  isDark
                    ? "border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-yellow-900/20"
                    : "border-yellow-200/50 bg-gradient-to-r from-white/80 to-yellow-100/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        isDark
                          ? "bg-gradient-to-br from-yellow-600/25 to-yellow-700/25 text-yellow-300 border border-yellow-500/20"
                          : "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 border border-yellow-300/40 shadow-sm"
                      }`}
                    >
                      <Info className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          isDark
                            ? "text-white"
                            : "bg-gradient-to-r from-yellow-700 to-yellow-600 bg-clip-text text-transparent"
                        }`}
                      >
                        Navigation Not Available
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          isDark ? "text-gray-400" : "text-slate-600"
                        }`}
                      >
                        Feature not available on this screen
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNavigationAlert(false)}
                    className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-yellow-100 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-gray-300" : "text-slate-600"
                    }`}
                  >
                    The navigation shortcuts{" "}
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                      Ctrl+↑
                    </span>{" "}
                    and{" "}
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                      Ctrl+↓
                    </span>{" "}
                    are only available after generating a code comparison.
                    Please generate or view a diff first.
                  </p>

                  <div
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? "bg-purple-900/20 border-purple-500/30 text-purple-200"
                        : "bg-purple-100/60 border-purple-300/50 text-purple-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isDark
                            ? "bg-purple-600/25 text-purple-300"
                            : "bg-purple-200/60 text-purple-600"
                        }`}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          Navigation Shortcuts:
                        </h4>
                        <ul className="text-xs space-y-1 opacity-90">
                          <li>
                            • <span className="font-mono">Ctrl+↑</span> -
                            Previous change
                          </li>
                          <li>
                            • <span className="font-mono">Ctrl+↓</span> - Next
                            change
                          </li>
                          <li>• Only work in diff comparison view</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    onClick={() => setShowNavigationAlert(false)}
                    className="px-6"
                  >
                    Got It
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Global styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Funnel+Sans:opsz,wght@8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');

          * {
            font-family: 'Funnel Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            font-optical-sizing: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          .font-display {
            font-family: 'Funnel Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
            font-weight: 600;
            letter-spacing: -0.01em;
          }

          .font-mono {
            font-family: 'Source Code Pro', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
          }

          html, body {
            margin: 0;
            padding: 0;
            overscroll-behavior: none;
            background-color: ${isDark ? "#0f172a" : "#f8fafc"};
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            scroll-behavior: smooth;
          }
          
          #root {
            position: relative;
            overflow-x: hidden;
          }

          /* Custom scrollbars */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: ${isDark ? "#0f172a" : "#f8fafc"};
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: ${isDark ? "#6366f1" : "#8b5cf6"};
            border-radius: 4px;
            transition: all 0.2s ease;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: ${isDark ? "#7c3aed" : "#7c3aed"};
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: ${isDark ? "#1e293b" : "#e2e8f0"};
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${isDark ? "#6366f1" : "#8b5cf6"};
            border-radius: 3px;
          }

          .code-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          .code-scrollbar::-webkit-scrollbar-track {
            background: ${isDark ? "#1e293b" : "#f1f5f9"};
            border-radius: 3px;
            border: 1px solid ${isDark ? "#334155" : "#e2e8f0"};
          }

          .code-scrollbar::-webkit-scrollbar-thumb {
            background: ${
              isDark
                ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                : "linear-gradient(135deg, #8b5cf6, #6366f1)"
            };
            border-radius: 3px;
            border: 1px solid ${isDark ? "#475569" : "#cbd5e1"};
            transition: all 0.2s ease;
          }

          .code-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${
              isDark
                ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                : "linear-gradient(135deg, #7c3aed, #5b21b6)"
            };
            transform: scale(1.05);
          }

          .code-scrollbar::-webkit-scrollbar-corner {
            background: ${isDark ? "#1e293b" : "#f1f5f9"};
          }

          /* Syntax highlighting */
          .syntax-keyword {
            color: ${isDark ? "#c084fc" : "#7c3aed"};
            font-weight: 600;
          }

          .syntax-type {
            color: ${isDark ? "#93c5fd" : "#2563eb"};
          }

          .syntax-string {
            color: ${isDark ? "#86efac" : "#16a34a"};
          }

          .syntax-comment {
            color: ${isDark ? "#9ca3af" : "#6b7280"};
            font-style: italic;
          }

          .syntax-number {
            color: ${isDark ? "#fdba74" : "#ea580c"};
          }

          /* Hide number input spinner buttons */
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }



          /* Toast progress animation */
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }

          /* History entry animation */
          @keyframes slideUp {
            from { 
              transform: translateY(10px); 
              opacity: 0; 
            }
            to { 
              transform: translateY(0); 
              opacity: 1; 
            }
          }



          .diff-line {
            will-change: transform, background-color, box-shadow;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        `,
        }}
      />
      {isLoading && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
            isDark ? "bg-slate-900" : "bg-slate-50"
          }`}
        >
          <div className="text-center space-y-6">
            <div
              className={`w-16 h-16 mx-auto p-3 rounded-xl ${
                isDark
                  ? "bg-purple-600/20 text-purple-400"
                  : "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700"
              }`}
            >
              <AnimatedLogo className="w-full h-full" />
            </div>

            <h1
              className={`text-xl font-display font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}
            >
              Code Diff Viewer
            </h1>

            <div className="w-48 mx-auto space-y-2">
              <div
                className={`w-full h-1 rounded-full overflow-hidden ${
                  isDark ? "bg-slate-800" : "bg-gray-200"
                }`}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main App Container - Flexbox Layout */}
      <div
        className={`h-screen flex flex-col transition-all duration-700 ease-out ${
          isDark
            ? "bg-slate-900/60 text-white backdrop-blur-sm"
            : "bg-slate-50/60 text-slate-900 backdrop-blur-sm"
        } ${
          isLoading
            ? "opacity-0 scale-95 translate-y-5"
            : "opacity-100 scale-100 translate-y-0"
        }`}
        style={{
          overscrollBehavior: "none",
        }}
      >
        {/* Top Navbar - Fixed height */}
        <header
          className={`flex-shrink-0 z-[60] border-b transition-all duration-300 backdrop-blur-md ${
            isDark
              ? "bg-slate-800/95 border-slate-700"
              : "bg-gradient-to-r from-white/95 via-purple-50/30 to-white/95 border-purple-200 shadow-sm"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Title - Never truncated */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isDark
                      ? "bg-purple-600/20 text-purple-400"
                      : "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 border border-purple-300 shadow-md"
                  }`}
                >
                  <AnimatedLogo className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-display font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
                    Code Diff Viewer
                  </h1>
                  <p
                    className={`text-xs sm:text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-slate-600"
                    } hidden sm:block`}
                  >
                    Professional code comparison and analysis
                  </p>
                </div>
              </div>

              {/* Right Section - Responsive Menu System */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Responsive Menu Items - Theme, History, Info (hide at lg breakpoint) */}
                <div className="hidden lg:flex items-center gap-2 lg:gap-3">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className={`group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      isDark
                        ? "bg-gradient-to-br from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/30 hover:border-purple-400/50"
                        : "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 hover:border-purple-300"
                    } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                    title={
                      isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
                    }
                  >
                    <div
                      className={`transition-all duration-300 ${
                        isDark ? "text-purple-300" : "text-purple-600"
                      }`}
                    >
                      {isDark ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                      }`}
                    />
                  </button>

                  <button
                    onClick={toggleHistory}
                    className={`group relative px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      isDark
                        ? "bg-gradient-to-br from-purple-600/15 to-purple-700/15 hover:from-purple-600/25 hover:to-purple-700/25 border border-purple-500/25 hover:border-purple-400/40"
                        : "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 hover:border-purple-300"
                    } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <History
                        className={`h-4 w-4 transition-colors duration-300 ${
                          isDark
                            ? "text-purple-300 group-hover:text-purple-200"
                            : "text-purple-600 group-hover:text-purple-700"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark
                            ? "text-purple-300 group-hover:text-purple-200"
                            : "text-purple-600 group-hover:text-purple-700"
                        }`}
                      >
                        History
                      </span>
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                      }`}
                    />
                  </button>

                  <button
                    onClick={toggleShortcuts}
                    className={`group relative px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      isDark
                        ? "bg-gradient-to-br from-purple-600/15 to-purple-700/15 hover:from-purple-600/25 hover:to-purple-700/25 border border-purple-500/25 hover:border-purple-400/40"
                        : "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 hover:border-purple-300"
                    } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <Info
                        className={`h-4 w-4 transition-colors duration-300 ${
                          isDark
                            ? "text-purple-300 group-hover:text-purple-200"
                            : "text-purple-600 group-hover:text-purple-700"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark
                            ? "text-purple-300 group-hover:text-purple-200"
                            : "text-purple-600 group-hover:text-purple-700"
                        }`}
                      >
                        Info
                      </span>
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                      }`}
                    />
                  </button>
                </div>

                {/* Load Files and Load Text Buttons - Hide at md breakpoint */}
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (showHistory) {
                        setIsHistoryAnimating(true);
                        setTimeout(() => {
                          setShowHistory(false);
                          setIsHistoryAnimating(false);
                        }, 300);
                      }
                      if (showShortcuts) {
                        setIsShortcutsAnimating(true);
                        setTimeout(() => {
                          setShowShortcuts(false);
                          setIsShortcutsAnimating(false);
                        }, 300);
                      }
                      setShowLoadFiles(true);
                      setShowInputs(false);
                      setShowDiffContent(false);
                      // Scroll to top when Load Files page loads
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 100);
                    }}
                    className={`group relative px-2 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ml-1 ${
                      isDark
                        ? "bg-gradient-to-br from-emerald-600/15 to-emerald-700/15 hover:from-emerald-600/25 hover:to-emerald-700/25 border border-emerald-500/25 hover:border-emerald-400/40"
                        : "bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-emerald-200 hover:border-emerald-300"
                    } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <Folder
                        className={`h-4 w-4 transition-colors duration-300 ${
                          isDark
                            ? "text-emerald-300 group-hover:text-emerald-200"
                            : "text-emerald-600 group-hover:text-emerald-700"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark
                            ? "text-emerald-300 group-hover:text-emerald-200"
                            : "text-emerald-600 group-hover:text-emerald-700"
                        }`}
                      >
                        Choose Files
                      </span>
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-emerald-400/5" : "bg-emerald-600/5"
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => {
                      if (showHistory) {
                        setIsHistoryAnimating(true);
                        setTimeout(() => {
                          setShowHistory(false);
                          setIsHistoryAnimating(false);
                        }, 300);
                      }
                      if (showShortcuts) {
                        setIsShortcutsAnimating(true);
                        setTimeout(() => {
                          setShowShortcuts(false);
                          setIsShortcutsAnimating(false);
                        }, 300);
                      }
                      resetDiff();
                    }}
                    className={`group relative px-2 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      isDark
                        ? "bg-gradient-to-br from-amber-600/15 to-amber-700/15 hover:from-amber-600/25 hover:to-amber-700/25 border border-amber-500/25 hover:border-amber-400/40"
                        : "bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border border-amber-200 hover:border-amber-300"
                    } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText
                        className={`h-4 w-4 transition-colors duration-300 ${
                          isDark
                            ? "text-amber-300 group-hover:text-amber-200"
                            : "text-amber-600 group-hover:text-amber-700"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark
                            ? "text-amber-300 group-hover:text-amber-200"
                            : "text-amber-600 group-hover:text-amber-700"
                        }`}
                      >
                        Load Text
                      </span>
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-amber-400/5" : "bg-amber-600/5"
                      }`}
                    />
                  </button>
                  {showDiffContent && (
                    <button
                      onClick={exportDiff}
                      className={`group relative px-2 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ml-1 ${
                        isDark
                          ? "bg-gradient-to-br from-blue-600/15 to-blue-700/15 hover:from-blue-600/25 hover:to-blue-700/25 border border-blue-500/25 hover:border-blue-400/40"
                          : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 hover:border-blue-300"
                      } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                      title="Export diff to file"
                    >
                      <div className="flex items-center gap-2">
                        <Download
                          className={`h-4 w-4 transition-colors duration-300 ${
                            isDark
                              ? "text-blue-300 group-hover:text-blue-200"
                              : "text-blue-600 group-hover:text-blue-700"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isDark
                              ? "text-blue-300 group-hover:text-blue-200"
                              : "text-blue-600 group-hover:text-blue-700"
                          }`}
                        >
                          Export
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Hamburger Menu - Shows based on screen size */}
                <div className="md:hidden relative mobile-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMobileMenu(!showMobileMenu);
                    }}
                    className={`group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      isDark
                        ? "bg-gradient-to-br from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/30 hover:border-purple-400/50"
                        : "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 hover:border-purple-300"
                    } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                    title="Menu"
                  >
                    <div
                      className={`transition-all duration-300 ${
                        isDark ? "text-purple-300" : "text-purple-600"
                      }`}
                    >
                      <Menu className="h-5 w-5" />
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                      }`}
                    />
                  </button>

                  {showDiffContent && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        exportDiff();
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                        isDark
                          ? "hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 text-gray-200 hover:text-white"
                          : "hover:bg-gradient-to-r hover:from-blue-100/80 hover:to-blue-200/80 text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <div
                        className={`transition-all duration-300 ${
                          isDark
                            ? "text-blue-400 group-hover:text-blue-300"
                            : "text-blue-600 group-hover:text-blue-700"
                        }`}
                      >
                        <Download className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Export Diff</span>
                    </button>
                  )}

                  {showMobileMenu && (
                    <div
                      className={`absolute right-0 top-12 w-52 z-[70] rounded-2xl border shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 fade-in duration-300 mobile-menu-dropdown ${
                        isDark
                          ? "bg-gradient-to-br from-slate-800/95 via-slate-800/95 to-slate-900/95 border-slate-600/50"
                          : "bg-gradient-to-br from-white/95 via-white/95 to-purple-50/30 border-purple-200/60"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="py-3">
                        {/* Theme Toggle */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDark(!isDark);
                            setShowMobileMenu(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-purple-100/80 hover:to-purple-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-purple-400 group-hover:text-purple-300"
                                : "text-purple-600 group-hover:text-purple-700"
                            }`}
                          >
                            {isDark ? (
                              <Sun className="h-4 w-4" />
                            ) : (
                              <Moon className="h-4 w-4" />
                            )}
                          </div>
                          <span className="font-medium">
                            {isDark ? "Light Mode" : "Dark Mode"}
                          </span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                            }`}
                          />
                        </button>

                        {/* History */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleHistory();
                            setShowMobileMenu(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-purple-100/80 hover:to-purple-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-purple-400 group-hover:text-purple-300"
                                : "text-purple-600 group-hover:text-purple-700"
                            }`}
                          >
                            <History className="h-4 w-4" />
                          </div>
                          <span className="font-medium">History</span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                            }`}
                          />
                        </button>

                        {/* Info */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleShortcuts();
                            setShowMobileMenu(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-indigo-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-indigo-100/80 hover:to-indigo-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-indigo-400 group-hover:text-indigo-300"
                                : "text-indigo-600 group-hover:text-indigo-700"
                            }`}
                          >
                            <Info className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Info</span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-indigo-400/5" : "bg-indigo-600/5"
                            }`}
                          />
                        </button>

                        {/* Load Files - Only show in hamburger on screens < 768px */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Close any open panels
                            if (showHistory) {
                              setIsHistoryAnimating(true);
                              setTimeout(() => {
                                setShowHistory(false);
                                setIsHistoryAnimating(false);
                              }, 300);
                            }
                            if (showShortcuts) {
                              setIsShortcutsAnimating(true);
                              setTimeout(() => {
                                setShowShortcuts(false);
                                setIsShortcutsAnimating(false);
                              }, 300);
                            }
                            // Navigate to Load Files
                            setShowLoadFiles(true);
                            setShowInputs(false);
                            setShowDiffContent(false);
                            setShowMobileMenu(false);
                            setTimeout(() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 100);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-emerald-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-emerald-100/80 hover:to-emerald-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-emerald-400 group-hover:text-emerald-300"
                                : "text-emerald-600 group-hover:text-emerald-700"
                            }`}
                          >
                            <Folder className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Load Files</span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-emerald-400/5" : "bg-emerald-600/5"
                            }`}
                          />
                        </button>

                        {/* Load Text - Only show in hamburger on screens < 768px */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Close any open panels
                            if (showHistory) {
                              setIsHistoryAnimating(true);
                              setTimeout(() => {
                                setShowHistory(false);
                                setIsHistoryAnimating(false);
                              }, 300);
                            }
                            if (showShortcuts) {
                              setIsShortcutsAnimating(true);
                              setTimeout(() => {
                                setShowShortcuts(false);
                                setIsShortcutsAnimating(false);
                              }, 300);
                            }
                            // Reset to Load Text view
                            resetDiff();
                            setShowMobileMenu(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-amber-600/20 hover:to-amber-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-amber-100/80 hover:to-amber-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-amber-400 group-hover:text-amber-300"
                                : "text-amber-600 group-hover:text-amber-700"
                            }`}
                          >
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Load Text</span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-amber-400/5" : "bg-amber-600/5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hamburger Menu for theme/history/info - Shows between md and lg */}
                <div className="hidden md:block lg:hidden relative mobile-menu-container-md">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMobileMenu(!showMobileMenu);
                    }}
                    className={`group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      isDark
                        ? "bg-gradient-to-br from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/30 hover:border-purple-400/50"
                        : "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 hover:border-purple-300"
                    } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                    title="Menu"
                  >
                    <div
                      className={`transition-all duration-300 ${
                        isDark ? "text-purple-300" : "text-purple-600"
                      }`}
                    >
                      <Menu className="h-5 w-5" />
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                      }`}
                    />
                  </button>

                  {showMobileMenu && (
                    <div
                      className={`absolute right-0 top-12 w-52 z-[70] rounded-2xl border shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 fade-in duration-300 mobile-menu-dropdown-md ${
                        isDark
                          ? "bg-gradient-to-br from-slate-800/95 via-slate-800/95 to-slate-900/95 border-slate-600/50"
                          : "bg-gradient-to-br from-white/95 via-white/95 to-purple-50/30 border-purple-200/60"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="py-3">
                        {/* Theme Toggle */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDark(!isDark);
                            setShowMobileMenu(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-purple-100/80 hover:to-purple-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-purple-400 group-hover:text-purple-300"
                                : "text-purple-600 group-hover:text-purple-700"
                            }`}
                          >
                            {isDark ? (
                              <Sun className="h-4 w-4" />
                            ) : (
                              <Moon className="h-4 w-4" />
                            )}
                          </div>
                          <span className="font-medium">
                            {isDark ? "Light Mode" : "Dark Mode"}
                          </span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                            }`}
                          />
                        </button>

                        {/* History */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleHistory();
                            setShowMobileMenu(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-purple-100/80 hover:to-purple-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-purple-400 group-hover:text-purple-300"
                                : "text-purple-600 group-hover:text-purple-700"
                            }`}
                          >
                            <History className="h-4 w-4" />
                          </div>
                          <span className="font-medium">History</span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-purple-400/5" : "bg-purple-600/5"
                            }`}
                          />
                        </button>

                        {/* Info */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleShortcuts();
                            setShowMobileMenu(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isDark
                              ? "hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-indigo-700/20 text-gray-200 hover:text-white"
                              : "hover:bg-gradient-to-r hover:from-indigo-100/80 hover:to-indigo-200/80 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isDark
                                ? "text-indigo-400 group-hover:text-indigo-300"
                                : "text-indigo-600 group-hover:text-indigo-700"
                            }`}
                          >
                            <Info className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Info</span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDark ? "bg-indigo-400/5" : "bg-indigo-600/5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Flexible */}
        <main
          className="flex-1 overflow-y-auto w-full max-w-full relative z-50"
          style={{
            overscrollBehavior: "none",
          }}
        >
          {showLoadFiles ? (
            <div
              className={`w-full transition-all duration-700 ${
                showLoadFiles
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div
                      className={`rounded-xl border transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl ${
                        isDark
                          ? "bg-slate-800 border-slate-700"
                          : "bg-gradient-to-br from-white to-blue-50/20 border-blue-200 shadow-lg shadow-blue-100/50"
                      }`}
                    >
                      <div
                        className={`p-6 border-b transition-colors duration-300 ${
                          isDark ? "border-slate-700" : "border-gray-200"
                        }`}
                      >
                        <h3 className="font-display font-bold text-xl flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-sm" />
                          <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                            Original File
                          </span>
                        </h3>
                        <p
                          className={`text-sm mt-2 transition-colors duration-300 ${
                            isDark ? "text-gray-400" : "text-slate-600"
                          }`}
                        >
                          Upload your original code file
                        </p>
                      </div>
                      <div className="p-6">
                        <div
                          onClick={() => handleFileUpload("original")}
                          className={`w-full h-[450px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-purple-400 hover:bg-purple-50/10 cursor-pointer ${
                            uploadedOriginalFile
                              ? isDark
                                ? "border-green-500 bg-green-900/20 text-green-300"
                                : "border-green-400 bg-green-50 text-green-700"
                              : isDark
                              ? "border-slate-600 bg-slate-900/50 text-gray-300 hover:border-purple-500"
                              : "border-slate-300 bg-slate-50 text-slate-600 hover:bg-purple-50"
                          }`}
                        >
                          {uploadedOriginalFile ? (
                            <>
                              <div
                                className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
                                  isDark
                                    ? "bg-green-600/20 text-green-400"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                <CheckCircle className="h-8 w-8" />
                              </div>
                              <h4 className="text-lg font-semibold mb-2">
                                File Uploaded Successfully!
                              </h4>
                              <p className="text-sm opacity-75 mb-2 font-medium">
                                {uploadedOriginalFile.name}
                              </p>
                              <p className="text-xs opacity-60 mb-4">
                                {(uploadedOriginalFile.size / 1024).toFixed(1)}{" "}
                                KB • Click to replace
                              </p>
                              <Button size="sm" variant="outline">
                                Replace File
                              </Button>
                            </>
                          ) : (
                            <>
                              <div
                                className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
                                  isDark
                                    ? "bg-red-600/20 text-red-400"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                <Upload className="h-8 w-8" />
                              </div>
                              <h4 className="text-lg font-semibold mb-2">
                                Upload Original File
                              </h4>
                              <p className="text-sm opacity-75 mb-4">
                                Click to browse and select a file
                              </p>
                              <Button size="sm" variant="outline">
                                Choose File
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`rounded-xl border transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl ${
                        isDark
                          ? "bg-slate-800 border-slate-700"
                          : "bg-gradient-to-br from-white to-green-50/20 border-green-200 shadow-lg shadow-green-100/50"
                      }`}
                    >
                      <div
                        className={`p-6 border-b transition-colors duration-300 ${
                          isDark ? "border-slate-700" : "border-gray-200"
                        }`}
                      >
                        <h3 className="font-display font-bold text-xl flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-sm" />
                          <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                            Modified File
                          </span>
                        </h3>
                        <p
                          className={`text-sm mt-2 transition-colors duration-300 ${
                            isDark ? "text-gray-400" : "text-slate-600"
                          }`}
                        >
                          Upload your modified code file
                        </p>
                      </div>
                      <div className="p-6">
                        <div
                          onClick={() => handleFileUpload("modified")}
                          className={`w-full h-[450px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-purple-400 hover:bg-purple-50/10 cursor-pointer ${
                            uploadedModifiedFile
                              ? isDark
                                ? "border-green-500 bg-green-900/20 text-green-300"
                                : "border-green-400 bg-green-50 text-green-700"
                              : isDark
                              ? "border-slate-600 bg-slate-900/50 text-gray-300 hover:border-purple-500"
                              : "border-slate-300 bg-slate-50 text-slate-600 hover:bg-purple-50"
                          }`}
                        >
                          {uploadedModifiedFile ? (
                            <>
                              <div
                                className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
                                  isDark
                                    ? "bg-green-600/20 text-green-400"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                <CheckCircle className="h-8 w-8" />
                              </div>
                              <h4 className="text-lg font-semibold mb-2">
                                File Uploaded Successfully!
                              </h4>
                              <p className="text-sm opacity-75 mb-2 font-medium">
                                {uploadedModifiedFile.name}
                              </p>
                              <p className="text-xs opacity-60 mb-4">
                                {(uploadedModifiedFile.size / 1024).toFixed(1)}{" "}
                                KB • Click to replace
                              </p>
                              <Button size="sm" variant="outline">
                                Replace File
                              </Button>
                            </>
                          ) : (
                            <>
                              <div
                                className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
                                  isDark
                                    ? "bg-green-600/20 text-green-400"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                <Upload className="h-8 w-8" />
                              </div>
                              <h4 className="text-lg font-semibold mb-2">
                                Upload Modified File
                              </h4>
                              <p className="text-sm opacity-75 mb-4">
                                Click to browse and select a file
                              </p>
                              <Button size="sm" variant="outline">
                                Choose File
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 mb-8 text-center">
                    <Button
                      onClick={handleGenerateFromFiles}
                      disabled={isGenerating}
                      size="lg"
                      className={`px-12 py-4 text-lg font-bold transition-all duration-300 ${
                        isGenerating ? "opacity-75" : ""
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                          Generating Diff...
                        </>
                      ) : (
                        <>
                          <Zap className="h-6 w-6 mr-3" />
                          Generate Professional Diff
                        </>
                      )}
                    </Button>
                    <p
                      className={`mt-4 text-sm transition-all duration-300 ${
                        isDark ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Compare your uploaded files with professional diff
                      analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : showInputs ? (
            <div
              className={`w-full transition-all duration-700 ${
                showInputs
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div
                      className={`rounded-xl border transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl ${
                        isDark
                          ? "bg-slate-800 border-slate-700"
                          : "bg-gradient-to-br from-white to-red-50/20 border-red-200 shadow-lg shadow-red-100/50"
                      }`}
                    >
                      <div
                        className={`p-6 border-b transition-colors duration-300 ${
                          isDark ? "border-slate-700" : "border-gray-200"
                        }`}
                      >
                        <h3 className="font-display font-bold text-xl flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-sm" />
                          <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                            Original Code
                          </span>
                        </h3>
                        <p
                          className={`text-sm mt-2 transition-colors duration-300 ${
                            isDark ? "text-gray-400" : "text-slate-600"
                          }`}
                        >
                          Paste your original code version here
                        </p>
                      </div>
                      <div className="p-6">
                        <textarea
                          value={oldCode}
                          onChange={(e) => {
                            setOldCode(e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Paste your original code here..."
                          className={`w-full h-[450px] font-mono text-sm resize-y border rounded-lg p-4 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none custom-scrollbar ${
                            isDark
                              ? "bg-slate-900 text-gray-100 placeholder-gray-500 border-slate-600"
                              : "bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300"
                          }`}
                        />
                      </div>
                    </div>

                    <div
                      className={`rounded-xl border transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl ${
                        isDark
                          ? "bg-slate-800 border-slate-700"
                          : "bg-gradient-to-br from-white to-green-50/20 border-green-200 shadow-lg shadow-green-100/50"
                      }`}
                    >
                      <div
                        className={`p-6 border-b transition-colors duration-300 ${
                          isDark ? "border-slate-700" : "border-gray-200"
                        }`}
                      >
                        <h3 className="font-display font-bold text-xl flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-sm" />
                          <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                            Modified Code
                          </span>
                        </h3>
                        <p
                          className={`text-sm mt-2 transition-colors duration-300 ${
                            isDark ? "text-gray-400" : "text-slate-600"
                          }`}
                        >
                          Paste your modified code version here
                        </p>
                      </div>
                      <div className="p-6">
                        <textarea
                          value={newCode}
                          onChange={(e) => {
                            setNewCode(e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Paste your modified code here..."
                          className={`w-full h-[450px] font-mono text-sm resize-y border rounded-lg p-4 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none custom-scrollbar ${
                            isDark
                              ? "bg-slate-900 text-gray-100 placeholder-gray-500 border-slate-600"
                              : "bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 mb-8 text-center">
                    <Button
                      onClick={generateDiff}
                      disabled={isGenerating}
                      size="lg"
                      className={`px-12 py-4 text-lg font-bold transition-all duration-300 ${
                        isGenerating ? "opacity-75" : ""
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                          Generating Diff...
                        </>
                      ) : (
                        <>
                          <Zap className="h-6 w-6 mr-3" />
                          Generate Professional Diff
                        </>
                      )}
                    </Button>
                    <p
                      className={`mt-4 text-sm transition-all duration-300 ${
                        isDark ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Compare your code versions with professional diff analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`transition-all duration-700 ${
                showDiffContent
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              } flex flex-col h-full`}
            >
              {/* Diff Toolbar - Fixed height */}
              <div
                className={`flex-shrink-0 z-[70] border-b backdrop-blur-xl transition-all duration-300 ${
                  isDark
                    ? "bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-slate-600/50 shadow-xl shadow-black/20"
                    : "bg-gradient-to-r from-white/95 via-purple-50/95 to-white/95 border-purple-200/50 shadow-lg shadow-purple-100/50"
                }`}
              >
                <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-center justify-between gap-6">
                    {/* Center Section: Stats Badges */}
                    <div className="flex items-center justify-center flex-1 gap-3">
                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-500/30"
                            : "bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            isDark
                              ? "bg-green-900/60 border border-green-500/30 text-green-200"
                              : "bg-white/80 border border-green-300/40 text-green-800 shadow-sm"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isDark ? "bg-green-400" : "bg-green-500"
                            } animate-pulse`}
                          />
                          <span className="font-bold text-sm tabular-nums">
                            +
                            {sections.reduce(
                              (acc, s) =>
                                acc +
                                s.lines.filter((l) => l.type === "added")
                                  .length,
                              0
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-r from-red-600/20 to-pink-600/20 hover:from-red-500/30 hover:to-pink-500/30"
                            : "bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            isDark
                              ? "bg-red-900/60 border border-red-500/30 text-red-200"
                              : "bg-white/80 border border-red-300/40 text-red-800 shadow-sm"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isDark ? "bg-red-400" : "bg-red-500"
                            } animate-pulse`}
                          />
                          <span className="font-bold text-sm tabular-nums">
                            -
                            {sections.reduce(
                              (acc, s) =>
                                acc +
                                s.lines.filter((l) => l.type === "removed")
                                  .length,
                              0
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-500/30 hover:to-indigo-500/30"
                            : "bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            isDark
                              ? "bg-blue-900/60 border border-blue-500/30 text-blue-200"
                              : "bg-white/80 border border-blue-300/40 text-blue-800 shadow-sm"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isDark ? "bg-blue-400" : "bg-blue-500"
                            } animate-pulse`}
                          />
                          <span className="font-bold text-sm tabular-nums">
                            ~
                            {sections.reduce(
                              (acc, s) =>
                                acc +
                                s.lines.filter((l) => l.type === "modified")
                                  .length,
                              0
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          sections.filter((s) => s.type === "conflict").length >
                          0
                            ? isDark
                              ? "bg-gradient-to-r from-yellow-600/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-500/30"
                              : "bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200"
                            : isDark
                            ? "bg-gradient-to-r from-gray-700/20 to-gray-600/20"
                            : "bg-gradient-to-r from-gray-100 to-gray-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            sections.filter((s) => s.type === "conflict")
                              .length > 0
                              ? isDark
                                ? "bg-yellow-900/60 border border-yellow-500/30 text-yellow-200"
                                : "bg-white/80 border border-yellow-300/40 text-yellow-800 shadow-sm"
                              : isDark
                              ? "bg-gray-800/60 border border-gray-600/30 text-gray-400"
                              : "bg-white/60 border border-gray-300/40 text-gray-600 shadow-sm"
                          }`}
                        >
                          <AlertTriangle
                            className={`h-4 w-4 transition-all duration-300 ${
                              sections.filter((s) => s.type === "conflict")
                                .length > 0
                                ? isDark
                                  ? "text-yellow-400 animate-pulse"
                                  : "text-yellow-600 animate-pulse"
                                : isDark
                                ? "text-gray-500"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="font-bold text-sm tabular-nums">
                            {
                              sections.filter((s) => s.type === "conflict")
                                .length
                            }{" "}
                            Conflicts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Responsive Layout for Medium and Small Screens */}
                  <div className="lg:hidden space-y-4">
                    {/* Top Row: Stats Badges */}
                    <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-500/30"
                            : "bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            isDark
                              ? "bg-green-900/60 border border-green-500/30 text-green-200"
                              : "bg-white/80 border border-green-300/40 text-green-800 shadow-sm"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isDark ? "bg-green-400" : "bg-green-500"
                            } animate-pulse`}
                          />
                          <span className="font-bold text-xs sm:text-sm tabular-nums">
                            +
                            {sections.reduce(
                              (acc, s) =>
                                acc +
                                s.lines.filter((l) => l.type === "added")
                                  .length,
                              0
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-r from-red-600/20 to-pink-600/20 hover:from-red-500/30 hover:to-pink-500/30"
                            : "bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            isDark
                              ? "bg-red-900/60 border border-red-500/30 text-red-200"
                              : "bg-white/80 border border-red-300/40 text-red-800 shadow-sm"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isDark ? "bg-red-400" : "bg-red-500"
                            } animate-pulse`}
                          />
                          <span className="font-bold text-xs sm:text-sm tabular-nums">
                            -
                            {sections.reduce(
                              (acc, s) =>
                                acc +
                                s.lines.filter((l) => l.type === "removed")
                                  .length,
                              0
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-500/30 hover:to-indigo-500/30"
                            : "bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            isDark
                              ? "bg-blue-900/60 border border-blue-500/30 text-blue-200"
                              : "bg-white/80 border border-blue-300/40 text-blue-800 shadow-sm"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isDark ? "bg-blue-400" : "bg-blue-500"
                            } animate-pulse`}
                          />
                          <span className="font-bold text-xs sm:text-sm tabular-nums">
                            ~
                            {sections.reduce(
                              (acc, s) =>
                                acc +
                                s.lines.filter((l) => l.type === "modified")
                                  .length,
                              0
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`group relative rounded-2xl p-0.5 transition-all duration-300 hover:scale-105 ${
                          sections.filter((s) => s.type === "conflict").length >
                          0
                            ? isDark
                              ? "bg-gradient-to-r from-yellow-600/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-500/30"
                              : "bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200"
                            : isDark
                            ? "bg-gradient-to-r from-gray-700/20 to-gray-600/20"
                            : "bg-gradient-to-r from-gray-100 to-gray-200"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-[14px] backdrop-blur-sm transition-all duration-300 ${
                            sections.filter((s) => s.type === "conflict")
                              .length > 0
                              ? isDark
                                ? "bg-yellow-900/60 border border-yellow-500/30 text-yellow-200"
                                : "bg-white/80 border border-yellow-300/40 text-yellow-800 shadow-sm"
                              : isDark
                              ? "bg-gray-800/60 border border-gray-600/30 text-gray-400"
                              : "bg-white/60 border border-gray-300/40 text-gray-600 shadow-sm"
                          }`}
                        >
                          <AlertTriangle
                            className={`h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 ${
                              sections.filter((s) => s.type === "conflict")
                                .length > 0
                                ? isDark
                                  ? "text-yellow-400 animate-pulse"
                                  : "text-yellow-600 animate-pulse"
                                : isDark
                                ? "text-gray-500"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="font-bold text-xs sm:text-sm tabular-nums">
                            {
                              sections.filter((s) => s.type === "conflict")
                                .length
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diff Content Area - Flexible */}
              <div
                className={`flex-1 overflow-hidden w-full pb-4 transition-all duration-700 delay-300 ${
                  showDiffContent
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="w-full px-4 py-8 relative z-10 overflow-hidden">
                  <div
                    className={`rounded-xl w-full transition-all duration-300 overflow-hidden ${
                      isDark
                        ? "bg-slate-800 border border-slate-700 shadow-lg"
                        : "bg-white border border-gray-200 shadow-lg"
                    }`}
                  >
                    <div
                      className={`flex rounded-t-xl transition-colors duration-300 ${
                        isDark
                          ? "bg-slate-800 border-b border-slate-700"
                          : "bg-slate-50 border-b border-slate-200"
                      }`}
                    >
                      <div className="w-1/2 px-6 py-4">
                        <h3
                          className={`font-bold text-lg flex items-center gap-3 ${
                            isDark ? "text-white" : "text-slate-800"
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-sm" />
                          <span
                            className={
                              isDark
                                ? "text-white"
                                : "bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent"
                            }
                          >
                            Original Code
                          </span>
                        </h3>
                      </div>
                      <div
                        className={`w-1/2 px-6 py-4 ${
                          isDark
                            ? "border-l border-slate-700"
                            : "border-l border-slate-200"
                        }`}
                      >
                        <h3
                          className={`font-bold text-lg flex items-center gap-3 ${
                            isDark ? "text-white" : "text-slate-800"
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-sm" />
                          <span
                            className={
                              isDark
                                ? "text-white"
                                : "bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent"
                            }
                          >
                            Modified Code
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div
                      className="overflow-x-hidden overflow-y-auto w-full code-scrollbar rounded-b-xl max-h-[70vh]"
                      ref={containerRef}
                    >
                      {sections.map((section, sectionIndex) => (
                        <div
                          key={section.id}
                          className="transition-all duration-300"
                        >
                          {section.type !== "unchanged" && (
                            <div
                              className={`px-6 py-3 text-xs font-bold border-b border-t transition-colors duration-300 ${
                                isDark
                                  ? "bg-slate-700 text-gray-300 border-slate-600"
                                  : "bg-gray-100 text-gray-700 border-gray-300"
                              }`}
                            >
                              {section.type.toUpperCase()} SECTION
                              {section.type === "conflict" && (
                                <AlertTriangle className="inline h-3 w-3 ml-2 text-red-500" />
                              )}
                            </div>
                          )}

                          {section.isCollapsed ? (
                            <div
                              className={`px-6 py-4 cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                                isDark
                                  ? "bg-slate-800 hover:bg-slate-700 text-gray-400"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                              }`}
                              onClick={() => toggleSection(section.id)}
                            >
                              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                              <span className="text-sm font-medium">
                                {section.lines.length} unchanged lines hidden
                              </span>
                            </div>
                          ) : (
                            <>
                              {section.type === "unchanged" &&
                                section.lines.length > 5 && (
                                  <div
                                    className={`px-6 py-3 cursor-pointer transition-all duration-300 flex items-center gap-3 border-b ${
                                      isDark
                                        ? "bg-slate-800 hover:bg-slate-700 text-gray-400 border-slate-600"
                                        : "bg-gray-50 hover:bg-gray-100 text-gray-500 border-gray-300"
                                    }`}
                                    onClick={() => toggleSection(section.id)}
                                  >
                                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                    <span className="text-xs font-medium">
                                      Collapse unchanged
                                    </span>
                                  </div>
                                )}

                              {section.lines.map((line, lineIndex) => {
                                const globalIndex =
                                  sectionIndex * 1000 + lineIndex;
                                const isEditing = editingLine === globalIndex;
                                const isChange = line.type !== "unchanged";
                                const isCurrentChange =
                                  isChange &&
                                  changes[currentChangeIndex] === globalIndex;

                                // Build classes more efficiently to reduce re-renders
                                const baseClasses =
                                  "diff-line flex w-full relative";
                                const currentClasses = isCurrentChange
                                  ? "ring-4 ring-purple-500/70 ring-inset shadow-lg shadow-purple-500/20 bg-gradient-to-r from-purple-50/20 via-purple-100/10 to-purple-50/20 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-purple-900/30 scale-[1.015] z-10 transition-all duration-200 ease-out"
                                  : "transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5";

                                const finalClassName = `${baseClasses} ${currentClasses}`;

                                return (
                                  <div
                                    key={globalIndex}
                                    className={`${finalClassName} overflow-hidden`}
                                    ref={
                                      isChange
                                        ? (el) => {
                                            changeRefs.current[globalIndex] =
                                              el;
                                          }
                                        : undefined
                                    }
                                    data-change-id={
                                      isChange ? globalIndex : undefined
                                    }
                                    style={{ maxWidth: "100%", width: "100%" }}
                                  >
                                    {/* Static highlight indicator */}
                                    {isCurrentChange && (
                                      <div className="absolute left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 shadow-lg shadow-purple-500/50 rounded-r-sm z-10" />
                                    )}
                                    {/* Old Code Side */}
                                    <div
                                      className={`w-1/2 flex min-w-0 overflow-hidden ${getLineClassName(
                                        line,
                                        true
                                      )}`}
                                      style={{ maxWidth: "50%" }}
                                    >
                                      <div
                                        className={`w-12 text-right text-xs py-2 pr-3 select-none flex-shrink-0 font-medium border-r ${
                                          isDark
                                            ? "text-gray-500 border-gray-600/50"
                                            : "text-gray-400 border-gray-300/50"
                                        }`}
                                      >
                                        {line.oldLineNumber}
                                      </div>
                                      <div
                                        className="flex-1 whitespace-pre-wrap break-all overflow-hidden py-1 px-3 min-w-0"
                                        style={{
                                          wordBreak: "break-all",
                                          overflowWrap: "break-word",
                                          maxWidth: "calc(100% - 3rem)",
                                        }}
                                        dangerouslySetInnerHTML={{
                                          __html: highlightSyntax(
                                            line.oldContent || ""
                                          ),
                                        }}
                                      />
                                    </div>
                                    {/* New Code Side */}
                                    <div
                                      className={`w-1/2 flex min-w-0 overflow-hidden ${getLineClassName(
                                        line,
                                        false
                                      )} ${
                                        isDark
                                          ? "border-l border-slate-700"
                                          : "border-l border-slate-200"
                                      }`}
                                      style={{ maxWidth: "50%" }}
                                    >
                                      <div
                                        className={`w-12 text-right text-xs py-2 pr-3 select-none flex-shrink-0 font-medium border-r ${
                                          isDark
                                            ? "text-gray-500 border-gray-600/50"
                                            : "text-gray-400 border-gray-300/50"
                                        }`}
                                      >
                                        {line.newLineNumber}
                                      </div>
                                      <div
                                        className="flex-1 relative group px-3 min-w-0 overflow-hidden"
                                        style={{
                                          maxWidth: "calc(100% - 3rem)",
                                        }}
                                      >
                                        {isEditing ? (
                                          <div className="flex items-start gap-3 p-2">
                                            <textarea
                                              value={editContent}
                                              onChange={(e) =>
                                                setEditContent(e.target.value)
                                              }
                                              className={`flex-1 min-h-[2rem] font-mono text-sm resize-none rounded-lg p-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none min-w-0 ${
                                                isDark
                                                  ? "bg-slate-900 border border-slate-600 text-gray-100"
                                                  : "bg-white border border-gray-300 text-gray-900"
                                              }`}
                                              autoFocus
                                            />
                                            <div className="flex flex-col gap-2 flex-shrink-0">
                                              <Button
                                                size="sm"
                                                onClick={handleSave}
                                                className="h-8 w-8 p-0"
                                              >
                                                <Save className="h-3 w-3" />
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={cancelEdit}
                                                className="h-8 w-8 p-0"
                                              >
                                                <X className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        ) : (
                                          <>
                                            <div
                                              className="whitespace-pre-wrap break-all py-1 overflow-hidden min-w-0"
                                              style={{
                                                wordBreak: "break-all",
                                                overflowWrap: "break-word",
                                                maxWidth: "100%",
                                              }}
                                              dangerouslySetInnerHTML={{
                                                __html: highlightSyntax(
                                                  line.newContent || ""
                                                ),
                                              }}
                                            />
                                            {line.type !== "removed" && (
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                className={`absolute right-2 top-1 opacity-0 group-hover:opacity-100 transition-all duration-300 h-6 w-6 p-0 ${
                                                  isDark
                                                    ? "hover:bg-slate-700 text-gray-400"
                                                    : "hover:bg-gray-100 text-gray-600"
                                                }`}
                                                onClick={() =>
                                                  startEditing(
                                                    lineIndex,
                                                    sectionIndex,
                                                    line.newContent
                                                  )
                                                }
                                              >
                                                <Edit3 className="h-3 w-3" />
                                              </Button>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer
            className={`flex-shrink-0 relative z-30 border-t transition-all duration-300 pb-4 ${
              showDiffContent ? "mt-8" : ""
            } ${
              isDark
                ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50"
                : "bg-gradient-to-br from-white via-purple-50/30 to-white border-purple-200/50"
            }`}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                {/* Logo and Branding */}
                <div className="flex flex-col items-center md:items-start justify-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isDark
                          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                          : "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                      }`}
                    >
                      <AnimatedLogo className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                        Code Diff Viewer
                      </h3>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? "text-gray-400" : "text-slate-600"
                        }`}
                      >
                        Professional Code Analysis
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Features - Hidden on md, shown on lg+ */}
                <div className="text-center hidden lg:block">
                  <h4
                    className={`text-sm font-display font-semibold mb-3 ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs max-w-56 mx-auto">
                    <div
                      className={`flex items-center justify-start gap-2 ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex-shrink-0" />
                      <span className="text-left whitespace-nowrap">
                        Side-by-side
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-start gap-2 ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex-shrink-0" />
                      <span className="text-left whitespace-nowrap">
                        Syntax highlight
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-start gap-2 ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                      <span className="text-left whitespace-nowrap">
                        Inline editing
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-start gap-2 ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0" />
                      <span className="text-left whitespace-nowrap">
                        Export diff
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Stats - Moved to right side on md+ */}
                <div className="flex flex-col items-center md:items-center">
                  <h4
                    className={`text-sm font-display font-semibold mb-3 text-center ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Built With
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-center gap-1.5">
                      <Badge variant="info" className="text-xs px-2 py-1">
                        React
                      </Badge>
                      <Badge variant="warning" className="text-xs px-2 py-1">
                        TypeScript
                      </Badge>
                    </div>
                    <div className="flex justify-center gap-1.5">
                      <Badge variant="success" className="text-xs px-2 py-1">
                        Tailwind CSS
                      </Badge>
                      <Badge variant="error" className="text-xs px-2 py-1">
                        Modern UI
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
        {isGenerating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-500">
            <div
              className={`fixed left-1/2 top-32 transform -translate-x-1/2 rounded-2xl p-8 text-center transition-all duration-700 ${
                isDark
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-slate-200"
              } shadow-xl`}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-purple-600">
                    Analyzing Code Differences
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Processing your code comparison...
                  </p>
                </div>
                <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showUploadAlert && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] transition-all duration-300 ease-out"
              onClick={() => setShowUploadAlert(false)}
            />

            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] z-[10000] transition-all duration-300 ease-out">
              <div
                className={`rounded-2xl border shadow-2xl backdrop-blur-xl ${
                  isDark
                    ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-600/50"
                    : "bg-gradient-to-br from-white via-white to-red-50/30 border-red-200/60"
                }`}
              >
                <div
                  className={`px-6 py-5 border-b ${
                    isDark
                      ? "border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-red-900/20"
                      : "border-red-200/50 bg-gradient-to-r from-white/80 to-red-100/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-2xl ${
                          isDark
                            ? "bg-gradient-to-br from-red-600/25 to-red-700/25 text-red-300 border border-red-500/20"
                            : "bg-gradient-to-br from-red-100 to-red-200 text-red-700 border border-red-300/40 shadow-sm"
                        }`}
                      >
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-bold ${
                            isDark
                              ? "text-white"
                              : "bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent"
                          }`}
                        >
                          Files Required
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-slate-600"
                          }`}
                        >
                          Please upload both files to continue
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowUploadAlert(false)}
                      className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${
                        isDark
                          ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                          : "hover:bg-red-100 text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      You need to upload both the original file and the modified
                      file before generating a diff comparison.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          uploadedOriginalFile
                            ? isDark
                              ? "bg-green-900/20 border-green-500/30 text-green-300"
                              : "bg-green-100/60 border-green-300/50 text-green-700"
                            : isDark
                            ? "bg-red-900/20 border-red-500/30 text-red-300"
                            : "bg-red-100/60 border-red-300/50 text-red-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {uploadedOriginalFile ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              <span>Original</span>
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4" />
                              <span>Original</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          uploadedModifiedFile
                            ? isDark
                              ? "bg-green-900/20 border-green-500/30 text-green-300"
                              : "bg-green-100/60 border-green-300/50 text-green-700"
                            : isDark
                            ? "bg-red-900/20 border-red-500/30 text-red-300"
                            : "bg-red-100/60 border-red-300/50 text-red-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {uploadedModifiedFile ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              <span>Modified</span>
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4" />
                              <span>Modified</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowUploadAlert(false)}
                      className="px-6"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setShowUploadAlert(false)}
                      className="px-6"
                    >
                      Continue Uploading
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {(showHistory || isHistoryAnimating) && (
          <>
            <div
              className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[9998] transition-all duration-300 ease-out ${
                showHistory && !isHistoryAnimating ? "opacity-100" : "opacity-0"
              }`}
              onClick={toggleHistory}
            />

            <div
              className={`fixed left-1/2 top-24 transform -translate-x-1/2 w-96 max-w-[90vw] max-h-[calc(100vh-7rem)] z-[9999] transition-all duration-300 ease-out ${
                showHistory && !isHistoryAnimating
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 -translate-y-4"
              } ${
                isDark
                  ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-600/50"
                  : "bg-gradient-to-br from-white via-white to-purple-50/30 border border-purple-200/60"
              } shadow-2xl backdrop-blur-xl rounded-3xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`px-6 py-5 border-b ${
                  isDark
                    ? "border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-purple-900/20"
                    : "border-purple-200/50 bg-gradient-to-r from-white/80 to-purple-100/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        isDark
                          ? "bg-gradient-to-br from-purple-600/25 to-purple-700/25 text-purple-300 border border-purple-500/20"
                          : "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                      }`}
                    >
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          isDark
                            ? "text-white"
                            : "bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent"
                        }`}
                      >
                        Change History
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          isDark ? "text-gray-400" : "text-slate-600"
                        }`}
                      >
                        Track all your changes and saves
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleHistory}
                    className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-purple-100 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {history.length === 0 ? (
                    <div
                      className={`text-center py-12 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                          isDark ? "bg-slate-700/50" : "bg-purple-100/60"
                        }`}
                      >
                        <Clock className="h-8 w-8 opacity-60" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">
                        No history available
                      </h4>
                      <p className="text-sm opacity-75">
                        Start making changes to see them here
                      </p>
                    </div>
                  ) : (
                    history.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={`group p-5 rounded-2xl transition-all duration-300 ${
                          isDark
                            ? "bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-slate-600/40"
                            : "bg-gradient-to-br from-white to-purple-50/50 border border-purple-200/50 shadow-sm"
                        } transform translate-y-0 opacity-100`}
                        style={{
                          animationDelay: `${index * 80}ms`,
                          animation: "slideUp 0.3s ease-out forwards",
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-2.5 rounded-xl ${
                                entry.action === "Save"
                                  ? isDark
                                    ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                    : "bg-green-100 text-green-700 border border-green-200"
                                  : entry.action === "Edit"
                                  ? isDark
                                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                    : "bg-blue-100 text-blue-700 border border-blue-200"
                                  : entry.action === "Generate"
                                  ? isDark
                                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                                    : "bg-purple-100 text-purple-700 border border-purple-200"
                                  : isDark
                                  ? "bg-gray-600/20 text-gray-400 border border-gray-500/30"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {entry.action === "Save" && (
                                <Save className="h-4 w-4" />
                              )}
                              {entry.action === "Edit" && (
                                <Edit3 className="h-4 w-4" />
                              )}
                              {entry.action === "Generate" && (
                                <Zap className="h-4 w-4" />
                              )}
                              {entry.action === "Load" && (
                                <Download className="h-4 w-4" />
                              )}
                              {entry.action === "Export" && (
                                <FileText className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <span
                                className={`font-bold text-base ${
                                  isDark ? "text-white" : "text-slate-800"
                                }`}
                              >
                                {entry.action}
                              </span>
                              <div
                                className={`text-sm mt-1 ${
                                  isDark ? "text-gray-400" : "text-slate-500"
                                }`}
                              >
                                {new Date(entry.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p
                          className={`text-sm leading-relaxed ${
                            isDark ? "text-gray-300" : "text-slate-600"
                          }`}
                        >
                          {entry.details}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {(showShortcuts || isShortcutsAnimating) && (
          <>
            <div
              className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[9996] transition-all duration-300 ease-out ${
                showShortcuts && !isShortcutsAnimating
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              onClick={toggleShortcuts}
            />

            <div
              className={`fixed left-1/2 top-24 transform -translate-x-1/2 w-[420px] max-w-[90vw] max-h-[calc(100vh-7rem)] z-[9997] transition-all duration-300 ease-out ${
                showShortcuts && !isShortcutsAnimating
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 -translate-y-4"
              } ${
                isDark
                  ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-600/50"
                  : "bg-gradient-to-br from-white via-white to-purple-50/30 border border-purple-200/60"
              } shadow-2xl backdrop-blur-xl rounded-3xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`px-6 py-5 border-b ${
                  isDark
                    ? "border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-purple-900/20"
                    : "border-purple-200/50 bg-gradient-to-r from-white/80 to-purple-100/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        isDark
                          ? "bg-gradient-to-br from-purple-600/25 to-purple-700/25 text-purple-300 border border-purple-500/20"
                          : "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                      }`}
                    >
                      <Info className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          isDark
                            ? "text-white"
                            : "bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent"
                        }`}
                      >
                        Keyboard Shortcuts
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          isDark ? "text-gray-400" : "text-slate-600"
                        }`}
                      >
                        Quick actions for faster workflow
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleShortcuts}
                    className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-purple-100 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <div
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                        isDark
                          ? "hover:bg-slate-700/40"
                          : "hover:bg-purple-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Save
                          className={`h-4 w-4 ${
                            isDark ? "text-green-400" : "text-green-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}
                        >
                          Save changes
                        </span>
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                          isDark
                            ? "bg-gradient-to-r from-slate-700 to-slate-600 text-purple-300 border border-slate-500/50"
                            : "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                        }`}
                      >
                        Ctrl + S
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                        isDark
                          ? "hover:bg-slate-700/40"
                          : "hover:bg-purple-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Download
                          className={`h-4 w-4 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}
                        >
                          Export diff
                        </span>
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                          isDark
                            ? "bg-gradient-to-r from-slate-700 to-slate-600 text-purple-300 border border-slate-500/50"
                            : "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                        }`}
                      >
                        Ctrl + E
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                        isDark
                          ? "hover:bg-slate-700/40"
                          : "hover:bg-purple-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <History
                          className={`h-4 w-4 ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}
                        >
                          View history
                        </span>
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                          isDark
                            ? "bg-gradient-to-r from-slate-700 to-slate-600 text-purple-300 border border-slate-500/50"
                            : "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                        }`}
                      >
                        Ctrl + H
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                        isDark
                          ? "hover:bg-slate-700/40"
                          : "hover:bg-purple-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ArrowUp
                          className={`h-4 w-4 ${
                            isDark ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}
                        >
                          Previous change
                        </span>
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                          isDark
                            ? "bg-gradient-to-r from-slate-700 to-slate-600 text-purple-300 border border-slate-500/50"
                            : "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                        }`}
                      >
                        Ctrl + ↑
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                        isDark
                          ? "hover:bg-slate-700/40"
                          : "hover:bg-purple-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ArrowDown
                          className={`h-4 w-4 ${
                            isDark ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}
                        >
                          Next change
                        </span>
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                          isDark
                            ? "bg-gradient-to-r from-slate-700 to-slate-600 text-purple-300 border border-slate-500/50"
                            : "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                        }`}
                      >
                        Ctrl + ↓
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                        isDark
                          ? "hover:bg-slate-700/40"
                          : "hover:bg-purple-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <X
                          className={`h-4 w-4 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}
                        >
                          Close panels
                        </span>
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                          isDark
                            ? "bg-gradient-to-r from-slate-700 to-slate-600 text-purple-300 border border-slate-500/50"
                            : "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300/40 shadow-sm"
                        }`}
                      >
                        Escape
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {showToast && (
          <div className="fixed top-24 right-6 z-[99999] pointer-events-auto">
            <div
              className={`relative rounded-lg shadow-xl border-2 min-w-[320px] max-w-md transform transition-all duration-300 ease-out animate-in slide-in-from-right ${
                showToast
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-full opacity-0 scale-95"
              } ${
                toastType === "success"
                  ? isDark
                    ? "bg-green-800 border-green-500 text-green-100"
                    : "bg-green-100 border-green-400 text-green-900"
                  : toastType === "info"
                  ? isDark
                    ? "bg-blue-800 border-blue-500 text-blue-100"
                    : "bg-blue-100 border-blue-400 text-blue-900"
                  : toastType === "warning"
                  ? isDark
                    ? "bg-yellow-800 border-yellow-500 text-yellow-100"
                    : "bg-yellow-100 border-yellow-400 text-yellow-900"
                  : isDark
                  ? "bg-red-800 border-red-500 text-red-100"
                  : "bg-red-100 border-red-400 text-red-900"
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <div
                  className={`flex-shrink-0 ${
                    toastType === "success"
                      ? isDark
                        ? "text-green-300"
                        : "text-green-600"
                      : toastType === "info"
                      ? isDark
                        ? "text-blue-300"
                        : "text-blue-600"
                      : toastType === "warning"
                      ? isDark
                        ? "text-yellow-300"
                        : "text-yellow-600"
                      : isDark
                      ? "text-red-300"
                      : "text-red-600"
                  }`}
                >
                  {toastType === "success" && (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  {toastType === "info" && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {toastType === "warning" && (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                  {toastType === "error" && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-sm">{toastMessage}</p>
                </div>

                <button
                  onClick={() => setShowToast(false)}
                  className={`flex-shrink-0 p-1 rounded transition-colors cursor-pointer ${
                    isDark
                      ? "hover:bg-white/10 text-gray-300 hover:text-white"
                      : "hover:bg-black/5 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                className={`absolute bottom-0 left-0 h-1 rounded-b-lg animate-pulse ${
                  toastType === "success"
                    ? isDark
                      ? "bg-green-400"
                      : "bg-green-500"
                    : toastType === "info"
                    ? isDark
                      ? "bg-blue-400"
                      : "bg-blue-500"
                    : toastType === "warning"
                    ? isDark
                      ? "bg-yellow-400"
                      : "bg-yellow-500"
                    : isDark
                    ? "bg-red-400"
                    : "bg-red-500"
                }`}
                style={{
                  width: "100%",
                  animation: "shrink 3000ms linear forwards",
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Hidden file inputs for upload dialogs */}
      <input
        ref={originalFileInputRef}
        type="file"
        accept=".txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.json,.xml"
        onChange={(e) => handleFileChange(e, "original")}
        style={{ display: "none" }}
      />
      <input
        ref={modifiedFileInputRef}
        type="file"
        accept=".txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.json,.xml"
        onChange={(e) => handleFileChange(e, "modified")}
        style={{ display: "none" }}
      />
      {showDiffContent && (
        <div className="fixed bottom-6 right-6 z-[80] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div
            className={`flex items-center rounded-2xl p-1.5 transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg border border-slate-600/50 shadow-2xl shadow-black/30"
                : "bg-gradient-to-r from-white/80 to-purple-50/80 backdrop-blur-lg border border-purple-200/60 shadow-2xl shadow-purple-200/50"
            }`}
          >
            <button
              onClick={() => navigateToChange("prev")}
              disabled={changes.length === 0}
              className={`group relative p-3 rounded-xl transition-all duration-300 ${
                changes.length === 0
                  ? "opacity-40 cursor-not-allowed"
                  : isDark
                  ? "hover:bg-purple-600/20 active:scale-95"
                  : "hover:bg-purple-100/70 active:scale-95"
              }`}
              title="Previous change (Ctrl+↑)"
            >
              <ArrowUp
                className={`h-5 w-5 transition-colors duration-300 ${
                  changes.length === 0
                    ? isDark
                      ? "text-gray-600"
                      : "text-gray-400"
                    : isDark
                    ? "text-purple-300 group-hover:text-purple-200"
                    : "text-purple-600 group-hover:text-purple-700"
                }`}
              />
            </button>

            <div
              className={`mx-2 px-4 py-2 rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
                isDark
                  ? "bg-slate-900/50 text-purple-200"
                  : "bg-purple-100/60 text-purple-800"
              }`}
            >
              <div className="flex items-center tabular-nums">
                {changes.length > 0 ? (
                  <>
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={startEditingChangeIndex}
                      title="Click to jump to a specific change"
                    >
                      {currentChangeIndex + 1}
                    </span>
                    <span>/{changes.length}</span>
                  </>
                ) : (
                  "0/0"
                )}
              </div>
            </div>

            <button
              onClick={() => navigateToChange("next")}
              disabled={changes.length === 0}
              className={`group relative p-3 rounded-xl transition-all duration-300 ${
                changes.length === 0
                  ? "opacity-40 cursor-not-allowed"
                  : isDark
                  ? "hover:bg-purple-600/20 active:scale-95"
                  : "hover:bg-purple-100/70 active:scale-95"
              }`}
              title="Next change (Ctrl+↓)"
            >
              <ArrowDown
                className={`h-5 w-5 transition-colors duration-300 ${
                  changes.length === 0
                    ? isDark
                      ? "text-gray-600"
                      : "text-gray-400"
                    : isDark
                    ? "text-purple-300 group-hover:text-purple-200"
                    : "text-purple-600 group-hover:text-purple-700"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
