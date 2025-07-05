"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  Legend,
} from "recharts";

// SVG Icon Components Replacement
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Plus: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path
      d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z"
      fill="currentColor"
    />
  </svg>
);

const Download: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path
      d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
      stroke="currentColor"
    />
    <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="currentColor" />
  </svg>
);

const Edit2: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
      fill="currentColor"
    />
  </svg>
);

const Clock: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
  </svg>
);

const BarChart3: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    {...props}
  >
    <path
      d="M7 19V11M12 19V7M17 19V15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PieChart: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.2544 1.36453C13.1584 1.05859 12.132 1.38932 11.4026 2.05955C10.6845 2.71939 10.25 3.70552 10.25 4.76063V11.4551C10.25 12.7226 11.2775 13.75 12.5449 13.75H19.2394C20.2945 13.75 21.2806 13.3156 21.9405 12.5974C22.6107 11.868 22.9414 10.8416 22.6355 9.74563C21.5034 5.69003 18.31 2.49663 14.2544 1.36453ZM11.75 4.76063C11.75 4.10931 12.0201 3.52918 12.4175 3.16407C12.8035 2.80935 13.3035 2.65643 13.8511 2.8093C17.4013 3.80031 20.1997 6.59875 21.1907 10.1489C21.3436 10.6965 21.1907 11.1965 20.8359 11.5825C20.4708 11.9799 19.8907 12.25 19.2394 12.25H12.5449C12.1059 12.25 11.75 11.8941 11.75 11.4551V4.76063Z"
      fill="#1C274C"
    />
    <path
      d="M8.67232 4.71555C9.0675 4.59143 9.28724 4.17045 9.16312 3.77527C9.039 3.38009 8.61803 3.16036 8.22285 3.28447C4.18231 4.55353 1.25 8.32793 1.25 12.7892C1.25 18.2904 5.70962 22.75 11.2108 22.75C15.6721 22.75 19.4465 19.8177 20.7155 15.7772C20.8397 15.382 20.6199 14.961 20.2247 14.8369C19.8296 14.7128 19.4086 14.9325 19.2845 15.3277C18.2061 18.761 14.9982 21.25 11.2108 21.25C6.53805 21.25 2.75 17.462 2.75 12.7892C2.75 9.00185 5.23899 5.79389 8.67232 4.71555Z"
      fill="currentColor"
    />
  </svg>
);

const X: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    {...props}
  >
    <path
      d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
      fill="currentColor"
    />
  </svg>
);

const RotateCcw: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.23706 2.0007C6.78897 2.02117 7.21978 2.48517 7.19931 3.03708L7.10148 5.67483C8.45455 4.62548 10.154 4.00001 12 4.00001C16.4183 4.00001 20 7.58174 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68631 15.3137 6.00001 12 6.00001C10.4206 6.00001 8.98317 6.60994 7.91098 7.60891L11.3161 8.00677C11.8646 8.07087 12.2573 8.56751 12.1932 9.11607C12.1291 9.66462 11.6325 10.0574 11.0839 9.99326L5.88395 9.38567C5.36588 9.32514 4.98136 8.87659 5.00069 8.35536L5.20069 2.96295C5.22116 2.41104 5.68516 1.98023 6.23706 2.0007Z"
      fill="currentColor"
    />
  </svg>
);

const Timer: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 2H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.24 10.76L12 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Target: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.2"
    className={className}
    {...props}
  >
    <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21ZM12,4.5A7.5,7.5,0,1,0,19.5,12,7.508,7.508,0,0,0,12,4.5Zm0,13A5.5,5.5,0,1,1,17.5,12,5.506,5.506,0,0,1,12,17.5ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
  </svg>
);

const TrendingUp: React.FC<IconProps> = ({
  className,
  size = 24,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path
      id="primary"
      d="M21,7l-6.79,6.79a1,1,0,0,1-1.42,0l-2.58-2.58a1,1,0,0,0-1.42,0L3,17"
    ></path>
    <polyline
      id="primary-2"
      data-name="primary"
      points="21 11 21 7 17 7"
    ></polyline>
  </svg>
);

const Trash2: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" />
  </svg>
);

const Save: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
    />
  </svg>
);

const Play: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z"
      fill="#0F0F0F"
    />
  </svg>
);

const Square: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="#currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Zap: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path
      d="M17.7634 10.7614L17.8704 10.5979C17.9261 10.5129 17.8651 10.4 17.7634 10.4H13.5C13.3817 10.4 13.2857 10.3041 13.2857 10.1857V4.23047V4.21257C13.2857 4.14957 13.2038 4.12513 13.1693 4.17784L7.18868 13.3118L7.10336 13.4421C7.05895 13.51 7.10761 13.6 7.18868 13.6H11.4488H11.5027C11.6196 13.6 11.7143 13.6947 11.7143 13.8116V19.6027C11.7143 19.7205 11.8683 19.7647 11.9328 19.6662L17.7634 10.7614Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const User: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
  </svg>
);

const Activity: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);

// Time tracking interfaces
interface TimeEntry {
  id: string;
  name: string;
  duration: number;
  category: string;
  color: string;
  isActive: boolean;
  startTime?: Date;
  endTime?: Date;
  status: "ongoing" | "completed" | "scheduled";
  scheduledTime?: Date;
  description?: string;
  startHour?: number;
  endHour?: number;
  actualStartTime?: Date;
  isCurrentlyTracking?: boolean;
}

interface SnackbarMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface KeyboardShortcut {
  key: string;
  description: string;
  action: () => void;
}

interface ExportData {
  date: string;
  entries: TimeEntry[];
  totalTime: number;
  summary: {
    categories: { [key: string]: number };
    dailyBreakdown: { hour: number; duration: number }[];
  };
}

interface FilterOptions {
  category: string;
  status: "all" | "ongoing" | "completed" | "scheduled";
  timeRange: "today" | "week" | "month";
}

// Chart data
interface ChartDataPoint {
  name: string;
  value: number;
  color: string;
  category?: string;
}

// Modal interface
interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: {
    name: string;
    category: string;
    startHour: number;
    duration: number;
  }) => void;
  initialHour?: number;
}

// Add new interfaces for mobile
interface DraggablePanelState {
  isDragging: boolean;
  startY: number;
  currentHeight: number;
}

// Update TimelineRow props interface
interface TimelineRowProps {
  entry: TimeEntry;
  index: number;
  hasConflict: boolean;
  onUpdateTimeSlot: (
    taskId: string,
    newStartHour: number,
    newDuration?: number
  ) => void;
  onUpdateDuration: (id: string, hours: number) => void;
  onDeleteTask: (id: string) => void;
  onSelectEntry: (id: string | null) => void;
  formatTime: (minutes: number) => string;
  showSnackbar: (message: string, type?: SnackbarMessage["type"]) => void;
  setEntries: React.Dispatch<React.SetStateAction<TimeEntry[]>>;
  onStartTracking: (id: string) => void;
  onStopTracking: () => void;
  isMobile: boolean;
}

// Update TaskCard props interface
interface TaskCardProps {
  entry: TimeEntry;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  editingEntry?: string | null;
  editValue?: string;
  setEditValue?: (value: string) => void;
  saveEditedEntry?: () => void;
}

const fontStyles = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');

body {
font-family: 'Manrope', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
font-family: 'Outfit', sans-serif;
}

button {
font-family: 'Manrope', sans-serif;
}
`;

const FontStyles: React.FC = () => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = fontStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return null;
};

// Utility functions
const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Update throttle type definition
const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check task trackability
const isTaskTrackable = (entry: TimeEntry): boolean => {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  if (entry.startHour !== undefined && entry.endHour !== undefined) {
    // Check time window
    return (
      currentHour >= entry.startHour - 0.5 && currentHour <= entry.endHour + 0.5
    );
  }

  // Default tracking rules
  return entry.status === "ongoing" || entry.status === "scheduled";
};

// Check task conflicts
const checkTaskConflicts = (entries: TimeEntry[]): string[] => {
  const conflicts: string[] = [];

  entries.forEach((entry, index) => {
    if (entry.startHour !== undefined && entry.endHour !== undefined) {
      entries.slice(index + 1).forEach((otherEntry) => {
        if (
          otherEntry.startHour !== undefined &&
          otherEntry.endHour !== undefined
        ) {
          // Check overlap
          if (
            entry.startHour! < otherEntry.endHour! &&
            entry.endHour! > otherEntry.startHour!
          ) {
            if (!conflicts.includes(entry.id)) conflicts.push(entry.id);
            if (!conflicts.includes(otherEntry.id))
              conflicts.push(otherEntry.id);
          }
        }
      });
    }
  });

  return conflicts;
};

// App header
const AppBar = () => {
  return (
    <div className="bg-gray-900/20 backdrop-blur-2xl border-b border-gray-700/30 px-6 py-4 sticky top-0 z-50 shadow-2xl">
      <div className="flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg ring-1 ring-orange-400/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">INEXTURE</h1>
              <p className="text-xs text-gray-400">Time Tracking Dashboard</p>
            </div>
          </div>
        </div>

        {/* User avatar */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center ring-2 ring-orange-400/20">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Task Modal Component
const AddTaskModal = ({
  isOpen,
  onClose,
  onAdd,
  initialHour = 9,
  editingTask,
}: AddTaskModalProps & { editingTask?: TimeEntry }) => {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("work");
  const [startHour, setStartHour] = useState(initialHour);
  const [duration, setDuration] = useState(1);

  const categories = [
    { value: "work", label: "Work", color: "#3b82f6" },
    { value: "personal", label: "Personal", color: "#10b981" },
    { value: "learning", label: "Learning", color: "#8b5cf6" },
    { value: "exercise", label: "Exercise", color: "#f59e0b" },
    { value: "break", label: "Break", color: "#ef4444" },
    { value: "meeting", label: "Meeting", color: "#06b6d4" },
  ];

  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        setTaskName(editingTask.name);
        setCategory(editingTask.category);
        setStartHour(editingTask.startHour || initialHour);
        setDuration(
          (editingTask.endHour || editingTask.startHour || 1) -
            (editingTask.startHour || 0) || 1
        );
      } else {
        setStartHour(initialHour);
        setTaskName("");
        setCategory("work");
        setDuration(1);
      }
    }
  }, [isOpen, initialHour, editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAdd({
        name: taskName.trim(),
        category,
        startHour,
        duration,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl border border-gray-700/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white placeholder-gray-400"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white"
            >
              {categories.map((cat) => (
                <option
                  key={cat.value}
                  value={cat.value}
                  className="bg-gray-700 text-white"
                >
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Time
              </label>
              <select
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i} className="bg-gray-700 text-white">
                    {i.toString().padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Duration (hours)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white"
              >
                <option value={0.25} className="bg-gray-700 text-white">
                  15 minutes
                </option>
                <option value={0.5} className="bg-gray-700 text-white">
                  30 minutes
                </option>
                <option value={1} className="bg-gray-700 text-white">
                  1 hour
                </option>
                <option value={1.5} className="bg-gray-700 text-white">
                  1.5 hours
                </option>
                <option value={2} className="bg-gray-700 text-white">
                  2 hours
                </option>
                <option value={3} className="bg-gray-700 text-white">
                  3 hours
                </option>
                <option value={4} className="bg-gray-700 text-white">
                  4 hours
                </option>
                <option value={6} className="bg-gray-700 text-white">
                  6 hours
                </option>
                <option value={8} className="bg-gray-700 text-white">
                  8 hours
                </option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskName.trim()}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Save size={16} />
              <span>{editingTask ? "Update Task" : "Add Task"}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const getStatusForTime = (
  startHour: number,
  endHour: number,
  isCurrentlyTracking: boolean
): TimeEntry["status"] => {
  if (isCurrentlyTracking) {
    return "ongoing";
  }
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  if (currentHour > endHour) {
    return "completed";
  }
  if (currentHour < startHour) {
    return "scheduled";
  }
  return "ongoing";
};

// Timeline row component
const TimelineRow = ({
  entry,
  index,
  hasConflict,
  onDeleteTask,
  formatTime,
  showSnackbar,
  setEntries,
  onStartTracking,
  onStopTracking,
  isMobile,
}: TimelineRowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const startHour = entry.startHour ?? 9; // Default to 9 AM if not set
  const endHour = entry.endHour ?? startHour + entry.duration / 60;
  const durationHours = endHour - startHour;

  const isTrackable = isTaskTrackable(entry);
  const isCurrentlyTracking = entry.isCurrentlyTracking || false;

  // Debounced notifications
  const debouncedNotification = useMemo(
    () =>
      debounce(
        (
          message: string,
          type: "success" | "error" | "info" | "warning" = "info"
        ) => {
          showSnackbar(message, type);
        },
        1000
      ), // 1 second debounce
    [showSnackbar]
  );

  // Smooth dragging updates
  const throttledUpdate = useMemo(
    () => throttle((updateFn: () => void) => updateFn(), 16), // ~60fps
    []
  );

  const handleMouseDown = (
    e: React.MouseEvent,
    action: "drag" | "resize-left" | "resize-right"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const timelineElement = e.currentTarget.closest(".timeline-container");
    const timelineRect = timelineElement?.getBoundingClientRect();

    if (!timelineRect) return;

    const timelineWidth = timelineRect.width;
    const hoursPerPixel = 24 / timelineWidth;

    if (action === "drag") {
      setIsDragging(true);
    } else {
      setIsResizing(true);
    }

    const originalStartHour = startHour;
    const originalDuration = durationHours;

    let scrollInterval: ReturnType<typeof setInterval> | null = null;
    const scrollSpeed = 15;
    const scrollThreshold = 100;

    const handleMouseMove = throttle((e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaHours = deltaX * hoursPerPixel;

      if (scrollInterval) clearInterval(scrollInterval);

      const container = timelineElement?.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const mouseX = e.clientX;

        if (mouseX - containerRect.left < scrollThreshold) {
          scrollInterval = setInterval(() => {
            container.scrollLeft -= scrollSpeed;
          }, 16);
        } else if (containerRect.right - mouseX < scrollThreshold) {
          scrollInterval = setInterval(() => {
            container.scrollLeft += scrollSpeed;
          }, 16);
        }
      }

      if (Math.abs(deltaHours) < 0.1) return;

      if (action === "drag") {
        const newStartHour = originalStartHour + deltaHours;
        const constrainedStartHour = Math.max(
          0,
          Math.min(24 - originalDuration, newStartHour)
        );
        const roundedStartHour = Math.round(constrainedStartHour * 4) / 4;

        throttledUpdate(() => {
          setEntries((prev) =>
            prev.map((currentEntry) => {
              if (currentEntry.id === entry.id) {
                const newStart = roundedStartHour;
                const newEnd = roundedStartHour + originalDuration;
                const tempNewEntry = {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                };
                const shouldStopTracking =
                  currentEntry.isCurrentlyTracking &&
                  !isTaskTrackable(tempNewEntry);
                const newIsCurrentlyTracking = shouldStopTracking
                  ? false
                  : currentEntry.isCurrentlyTracking;

                return {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                  isCurrentlyTracking: newIsCurrentlyTracking,
                  status: getStatusForTime(
                    newStart,
                    newEnd,
                    newIsCurrentlyTracking
                  ),
                };
              }
              return currentEntry;
            })
          );
        });
      } else if (action === "resize-right") {
        const newDuration = originalDuration + deltaHours;
        const maxDuration = 24 - originalStartHour;
        const constrainedDuration = Math.max(
          0.25,
          Math.min(maxDuration, newDuration)
        );
        const roundedDuration = Math.round(constrainedDuration * 4) / 4;

        throttledUpdate(() => {
          setEntries((prev) =>
            prev.map((currentEntry) => {
              if (currentEntry.id === entry.id) {
                const newStart = originalStartHour;
                const newEnd = originalStartHour + roundedDuration;
                const tempNewEntry = {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                };
                const shouldStopTracking =
                  currentEntry.isCurrentlyTracking &&
                  !isTaskTrackable(tempNewEntry);
                const newIsCurrentlyTracking = shouldStopTracking
                  ? false
                  : currentEntry.isCurrentlyTracking;

                return {
                  ...currentEntry,
                  endHour: newEnd,
                  duration: roundedDuration * 60,
                  isCurrentlyTracking: newIsCurrentlyTracking,
                  status: getStatusForTime(
                    newStart,
                    newEnd,
                    newIsCurrentlyTracking
                  ),
                };
              }
              return currentEntry;
            })
          );
        });
      } else if (action === "resize-left") {
        const newStartHour = Math.min(
          Math.max(0, originalStartHour + deltaHours),
          (endHour * 60 - 15) / 60
        );
        const constrainedStartHour = Math.max(0, newStartHour);
        const constrainedDuration = endHour - newStartHour;

        const finalStartHour = Math.min(
          constrainedStartHour,
          24 - constrainedDuration
        );

        const roundedStartHour = Math.round(finalStartHour * 4) / 4;

        throttledUpdate(() => {
          setEntries((prev) =>
            prev.map((currentEntry) => {
              if (currentEntry.id === entry.id) {
                const newStart = roundedStartHour;
                const newEnd = endHour;
                const tempNewEntry = {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                };
                const shouldStopTracking =
                  currentEntry.isCurrentlyTracking &&
                  !isTaskTrackable(tempNewEntry);
                const newIsCurrentlyTracking = shouldStopTracking
                  ? false
                  : currentEntry.isCurrentlyTracking;

                return {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                  duration: (newEnd - newStart) * 60,
                  isCurrentlyTracking: newIsCurrentlyTracking,
                  status: getStatusForTime(
                    newStart,
                    newEnd,
                    newIsCurrentlyTracking
                  ),
                };
              }
              return currentEntry;
            })
          );
        });
      }
    }, 16);

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      if (scrollInterval) clearInterval(scrollInterval);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const currentStartHour = entry.startHour ?? 9;
      const currentDuration = entry.duration / 60;

      if (
        Math.abs(currentStartHour - originalStartHour) > 0.1 ||
        Math.abs(currentDuration - originalDuration) > 0.1
      ) {
        debouncedNotification(`Task "${entry.name}" updated`, "success");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (
    e: React.TouchEvent,
    action: "drag" | "resize-left" | "resize-right"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const startX = touch.clientX;
    const timelineElement = e.currentTarget.closest(".timeline-container");
    const timelineRect = timelineElement?.getBoundingClientRect();

    if (!timelineRect) return;

    const timelineWidth = timelineRect.width;
    const hoursPerPixel = 24 / timelineWidth;

    if (action === "drag") {
      setIsDragging(true);
    } else {
      setIsResizing(true);
    }

    const originalStartHour = startHour;
    const originalDuration = durationHours;

    const handleTouchMove = throttle((e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaHours = deltaX * hoursPerPixel;

      if (Math.abs(deltaHours) < 0.1) return;

      if (action === "drag") {
        const newStartHour = originalStartHour + deltaHours;
        const constrainedStartHour = Math.max(
          0,
          Math.min(24 - originalDuration, newStartHour)
        );
        const roundedStartHour = Math.round(constrainedStartHour * 4) / 4;

        throttledUpdate(() => {
          setEntries((prev) =>
            prev.map((currentEntry) => {
              if (currentEntry.id === entry.id) {
                const newStart = roundedStartHour;
                const newEnd = roundedStartHour + originalDuration;
                const tempNewEntry = {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                };
                const shouldStopTracking =
                  currentEntry.isCurrentlyTracking &&
                  !isTaskTrackable(tempNewEntry);
                const newIsCurrentlyTracking = shouldStopTracking
                  ? false
                  : currentEntry.isCurrentlyTracking;

                return {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                  isCurrentlyTracking: newIsCurrentlyTracking,
                  status: getStatusForTime(
                    newStart,
                    newEnd,
                    newIsCurrentlyTracking
                  ),
                };
              }
              return currentEntry;
            })
          );
        });
      } else if (action === "resize-right") {
        const newDuration = originalDuration + deltaHours;
        const maxDuration = 24 - originalStartHour;
        const constrainedDuration = Math.max(
          0.25,
          Math.min(maxDuration, newDuration)
        );
        const roundedDuration = Math.round(constrainedDuration * 4) / 4;

        throttledUpdate(() => {
          setEntries((prev) =>
            prev.map((currentEntry) => {
              if (currentEntry.id === entry.id) {
                const newStart = originalStartHour;
                const newEnd = originalStartHour + roundedDuration;
                const tempNewEntry = {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                };
                const shouldStopTracking =
                  currentEntry.isCurrentlyTracking &&
                  !isTaskTrackable(tempNewEntry);
                const newIsCurrentlyTracking = shouldStopTracking
                  ? false
                  : currentEntry.isCurrentlyTracking;

                return {
                  ...currentEntry,
                  endHour: newEnd,
                  duration: roundedDuration * 60,
                  isCurrentlyTracking: newIsCurrentlyTracking,
                  status: getStatusForTime(
                    newStart,
                    newEnd,
                    newIsCurrentlyTracking
                  ),
                };
              }
              return currentEntry;
            })
          );
        });
      } else if (action === "resize-left") {
        const newStartHour = Math.min(
          Math.max(0, originalStartHour + deltaHours),
          (endHour * 60 - 15) / 60
        );
        const constrainedStartHour = Math.max(0, newStartHour);
        const constrainedDuration = endHour - newStartHour;

        const finalStartHour = Math.min(
          constrainedStartHour,
          24 - constrainedDuration
        );

        const roundedStartHour = Math.round(finalStartHour * 4) / 4;

        throttledUpdate(() => {
          setEntries((prev) =>
            prev.map((currentEntry) => {
              if (currentEntry.id === entry.id) {
                const newStart = roundedStartHour;
                const newEnd = endHour;
                const tempNewEntry = {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                };
                const shouldStopTracking =
                  currentEntry.isCurrentlyTracking &&
                  !isTaskTrackable(tempNewEntry);
                const newIsCurrentlyTracking = shouldStopTracking
                  ? false
                  : currentEntry.isCurrentlyTracking;

                return {
                  ...currentEntry,
                  startHour: newStart,
                  endHour: newEnd,
                  duration: (newEnd - newStart) * 60,
                  isCurrentlyTracking: newIsCurrentlyTracking,
                  status: getStatusForTime(
                    newStart,
                    newEnd,
                    newIsCurrentlyTracking
                  ),
                };
              }
              return currentEntry;
            })
          );
        });
      }
    }, 16);

    const handleTouchEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      const currentStartHour = entry.startHour ?? 9;
      const currentDuration = entry.duration / 60;

      if (
        Math.abs(currentStartHour - originalStartHour) > 0.1 ||
        Math.abs(currentDuration - originalDuration) > 0.1
      ) {
        debouncedNotification(`Task "${entry.name}" updated`, "success");
      }
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <motion.div
      key={entry.id}
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.05 * index }}
      className="flex items-center space-x-2 group relative h-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Task info and controls */}
      <div className="w-24 md:w-32 flex items-center space-x-2 flex-shrink-0">
        <div className="flex items-center space-x-1">
          <div
            className={`w-3 h-3 rounded-full flex-shrink-0 ${
              isCurrentlyTracking ? "animate-pulse ring-2 ring-green-400" : ""
            }`}
            style={{ backgroundColor: entry.color }}
          />
          {/* Tracking controls */}
          {isTrackable && (
            <button
              onClick={() =>
                isCurrentlyTracking
                  ? onStopTracking()
                  : onStartTracking(entry.id)
              }
              className={`p-1 rounded transition-colors cursor-pointer ${
                isCurrentlyTracking
                  ? "bg-red-100 hover:bg-red-200 text-red-600"
                  : "bg-green-100 hover:bg-green-200 text-green-600"
              }`}
              title={isCurrentlyTracking ? "Stop tracking" : "Start tracking"}
            >
              {isCurrentlyTracking ? <Square size={10} /> : <Play size={10} />}
            </button>
          )}
        </div>
        <div className="truncate min-w-0">
          <div
            className={`text-xs font-medium truncate ${
              isCurrentlyTracking
                ? "text-green-300 font-semibold"
                : "text-gray-200"
            }`}
          >
            {entry.name}
            {isCurrentlyTracking && (
              <span className="ml-1 text-green-400">●</span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            {formatTime(entry.duration)}
          </div>
        </div>
      </div>

      {/* Timeline grid with mobile-optimized hour markers */}
      <div className="flex-1 relative h-16 bg-gray-900 rounded-lg border border-gray-600 timeline-container">
        {/* Hour markers grid */}
        <div className="absolute inset-0 grid grid-cols-24">
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="border-r border-gray-600 relative">
              {/* Hour markers  */}
              <span
                className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] md:text-xs text-gray-500 font-mono ${
                  isMobile ? (hour % 3 === 0 ? "block" : "hidden") : "block"
                }`}
              >
                {hour.toString().padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        {/* Task block */}
        <div
          className={`absolute top-2 h-12 rounded-lg transition-all duration-150 ${
            hasConflict
              ? "bg-red-500/90 border-2 border-red-400 shadow-red-500/50"
              : isCurrentlyTracking
              ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/50 animate-pulse ring-2 ring-green-400/50"
              : "bg-gradient-to-r from-blue-500 to-purple-600 shadow-blue-500/30"
          } ${
            isDragging || isResizing
              ? "shadow-2xl scale-105 z-30 ring-2 ring-white/50"
              : isHovered
              ? "shadow-lg scale-102 z-20"
              : "shadow-md z-10"
          } cursor-move group/task overflow-hidden touch-none`}
          style={{
            left: `${(startHour / 24) * 100}%`,
            width: `${Math.max((durationHours / 24) * 100, 3)}%`,
            minWidth: "30px",
          }}
          onMouseDown={(e) => {
            const target = e.target as HTMLElement;
            if (
              target.closest(".resize-handle") ||
              target.closest(".delete-btn")
            ) {
              return;
            }
            handleMouseDown(e, "drag");
          }}
          onTouchStart={(e) => {
            const target = e.target as HTMLElement;
            if (
              target.closest(".resize-handle") ||
              target.closest(".delete-btn")
            ) {
              return;
            }
            handleTouchStart(e, "drag");
          }}
          title={`${entry.name} (${formatTime(entry.duration)})${
            isCurrentlyTracking ? " - NOW TRACKING" : ""
          }`}
        >
          {/* Left resize handle with touch support */}
          <div
            className={`resize-handle absolute left-0 top-0 w-3 h-full cursor-ew-resize bg-white/40 hover:bg-white/60 rounded-l-lg transition-all ${
              isHovered || isDragging || isResizing
                ? "opacity-100"
                : "opacity-0"
            } flex items-center justify-center touch-none`}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e, "resize-left");
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleTouchStart(e, "resize-left");
            }}
          >
            <div className="w-0.5 h-4 bg-white/80 rounded"></div>
          </div>

          {/* Task content */}
          <div className="px-3 py-1 text-white text-xs font-medium h-full flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="truncate font-semibold flex items-center space-x-1">
                <span>{entry.name}</span>
                {isCurrentlyTracking && (
                  <Zap size={10} className="animate-pulse" />
                )}
              </div>
              <div className="text-xs text-white/80 truncate">
                {Math.floor(startHour).toString().padStart(2, "0")}:
                {((startHour % 1) * 60).toString().padStart(2, "0")} -{" "}
                {Math.floor(endHour).toString().padStart(2, "0")}:
                {((endHour % 1) * 60).toString().padStart(2, "0")}
              </div>
            </div>

            {/* Delete button - only show on hover */}
            {isHovered && (
              <button
                className="delete-btn ml-2 p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(entry.id);
                  debouncedNotification(`Task "${entry.name}" deleted`, "info");
                }}
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>

          {/* Right resize handle with touch support */}
          <div
            className={`resize-handle absolute right-0 top-0 w-3 h-full cursor-ew-resize bg-white/40 hover:bg-white/60 rounded-r-lg transition-all ${
              isHovered || isDragging || isResizing
                ? "opacity-100"
                : "opacity-0"
            } flex items-center justify-center touch-none`}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e, "resize-right");
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleTouchStart(e, "resize-right");
            }}
          >
            <div className="w-0.5 h-4 bg-white/80 rounded"></div>
          </div>

          {/* Conflict indicator */}
          {hasConflict && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse z-10 flex items-center justify-center"></div>
          )}

          {/* Live tracking indicator */}
          {isCurrentlyTracking && (
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse z-10 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Task card component
const TaskCard = ({ entry, onEdit, onDelete }: TaskCardProps) => {
  const isTrackable = isTaskTrackable(entry);
  const isCurrentlyTracking = entry.isCurrentlyTracking || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`group p-4 rounded-2xl border cursor-pointer transition-all duration-200 shadow-xl backdrop-blur-xl ${
        isCurrentlyTracking
          ? "border-green-500/60 bg-gray-700/50 shadow-2xl ring-1 ring-green-400/40"
          : entry.status === "completed"
          ? "border-gray-600/50 bg-gray-700/40 opacity-80"
          : isTrackable
          ? "border-blue-500/60 bg-gray-700/50 hover:shadow-2xl hover:border-blue-400/80 hover:bg-gray-600/60"
          : "border-gray-600/50 bg-gray-700/50 hover:shadow-xl hover:border-gray-500/60 hover:bg-gray-600/60"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div
              className={`w-4 h-4 rounded-full ${
                isCurrentlyTracking
                  ? "animate-pulse ring-2 ring-green-400/50"
                  : ""
              }`}
              style={{ backgroundColor: entry.color }}
            />
            {isCurrentlyTracking && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 flex-1">
                <h3
                  className={`text-sm font-medium truncate ${
                    isCurrentlyTracking
                      ? "text-green-300 font-semibold"
                      : "text-gray-200"
                  }`}
                >
                  {entry.name}
                </h3>
                {!isTrackable && entry.startHour !== undefined && (
                  <span className="text-xs text-amber-400 bg-amber-900/30 px-1.5 py-0.5 rounded-full border border-amber-500/30 flex-shrink-0">
                    Not current
                  </span>
                )}
                {isCurrentlyTracking && (
                  <Zap
                    size={12}
                    className="text-green-400 animate-pulse flex-shrink-0"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-gray-400 capitalize">
                {entry.category}
              </p>
              {entry.status === "scheduled" &&
                entry.startHour !== undefined && (
                  <span className="text-xs text-blue-400 font-mono">
                    {Math.floor(entry.startHour).toString().padStart(2, "0")}:
                    {Math.floor((entry.startHour % 1) * 60)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="text-right">
            <span
              className={`text-sm font-semibold ${
                isCurrentlyTracking ? "text-green-300" : "text-gray-200"
              }`}
            >
              {entry.duration > 0
                ? Math.floor(entry.duration / 60) +
                  "h " +
                  (entry.duration % 60) +
                  "m"
                : "0m"}
            </span>
            {isCurrentlyTracking && (
              <div className="text-xs text-green-400 font-mono">Live</div>
            )}
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(entry.id);
                }}
                className="p-1.5 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
                title="Edit task"
              >
                <Edit2 className="w-3 h-3 text-gray-400 hover:text-orange-400" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(entry.id);
                }}
                className="p-1.5 hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                title="Delete task"
              >
                <X className="w-3 h-3 text-red-400 hover:text-red-300" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Add this component before the App component
const ClientTime = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      suppressHydrationWarning
      className="text-sm text-orange-400 font-mono"
    >
      {time}
    </span>
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

function Dashboard() {
  // Add window size hook call at the beginning of the component
  const windowSize = useWindowSize();

  // Sample data initialization
  const [entries, setEntries] = useState<TimeEntry[]>(() => {
    const now = new Date();
    const currentHour = Math.floor(now.getHours() + now.getMinutes() / 60);

    return [
      {
        id: "1",
        name: "Development",
        duration: 180,
        category: "work",
        color: "#3b82f6",
        isActive: false,
        status: "completed",
        startHour: Math.max(0, currentHour - 3),
        endHour: Math.max(3, currentHour),
        isCurrentlyTracking: false,
      },
      {
        id: "2",
        name: "Team Meeting",
        duration: 90,
        category: "meeting",
        color: "#06b6d4",
        isActive: false,
        status: "ongoing",
        startHour: Math.max(0, currentHour - 0.5),
        endHour: Math.min(24, currentHour + 1),
        isCurrentlyTracking: true,
      },
      {
        id: "3",
        name: "UI Design",
        duration: 120,
        category: "work",
        color: "#8b5cf6",
        isActive: false,
        status: "scheduled",
        startHour: Math.min(22, currentHour + 2),
        endHour: Math.min(24, currentHour + 4),
        isCurrentlyTracking: false,
      },
      {
        id: "4",
        name: "Coffee Break",
        duration: 30,
        category: "break",
        color: "#ef4444",
        isActive: false,
        status: "scheduled",
        scheduledTime: new Date(Date.now() + 3600000),
        startHour: Math.min(23.5, currentHour + 4.5),
        endHour: Math.min(24, currentHour + 5),
        isCurrentlyTracking: false,
      },
    ];
  });

  const [activeEntry, setActiveEntry] = useState<string | null>(null);
  const [newEntryName, setNewEntryName] = useState("");
  const [newEntryCategory, setNewEntryCategory] = useState("work");
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "all",
    status: "all",
    timeRange: "today",
  });
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [timelineConflicts, setTimelineConflicts] = useState<string[]>([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [addTaskHour, setAddTaskHour] = useState(9);

  // Add state for mobile panel
  const [isMobile, setIsMobile] = useState(false);
  const showMobilePanel = false;
  const [panelState, setPanelState] = useState<DraggablePanelState>({
    isDragging: false,
    startY: 0,
    currentHeight: 50, // Default height percentage
  });

  const newEntryInputRef = useRef<HTMLInputElement>(null);
  const categories = [
    "work",
    "personal",
    "learning",
    "exercise",
    "break",
    "meeting",
  ];

  // Real time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update tracking duration
      setEntries((prev) =>
        prev.map((entry) =>
          entry.isCurrentlyTracking
            ? { ...entry, duration: entry.duration + 1 }
            : entry
        )
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Check conflicts on change
  useEffect(() => {
    const conflicts = checkTaskConflicts(entries);
    setTimelineConflicts(conflicts);
  }, [entries]);

  // Show snackbar notification
  const showSnackbar = useCallback(
    (message: string, type: SnackbarMessage["type"] = "info") => {
      const id = Date.now().toString();
      setSnackbars((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== id));
      }, 3000);
    },
    []
  );

  // Remove snackbar manually
  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Stop current tracking
  const stopTracking = useCallback(() => {
    const trackingEntry = entries.find((e) => e.isCurrentlyTracking);
    if (trackingEntry) {
      setEntries((prev) =>
        prev.map((e) =>
          e.isCurrentlyTracking
            ? {
                ...e,
                isCurrentlyTracking: false,
                endTime: new Date(),
                status: "completed" as const,
              }
            : e
        )
      );
      setActiveEntry(null);
      showSnackbar(`Stopped tracking: ${trackingEntry.name}`, "info");
    }
  }, [entries, showSnackbar]);

  // Start tracking activity with smart logic
  const startTracking = useCallback(
    (entryId: string) => {
      const entry = entries.find((e) => e.id === entryId);
      if (!entry) return;

      // Check if task is trackable
      if (!isTaskTrackable(entry)) {
        showSnackbar(
          `Cannot track "${entry.name}" - not in current time window`,
          "warning"
        );
        return;
      }

      // Stop any currently tracking task
      setEntries((prev) =>
        prev.map((e) => ({ ...e, isCurrentlyTracking: false }))
      );

      // Start tracking the selected task
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? {
                ...e,
                isCurrentlyTracking: true,
                actualStartTime: new Date(),
                status: "ongoing" as const,
              }
            : e
        )
      );

      setActiveEntry(entryId);
      showSnackbar(`Started tracking: ${entry.name}`, "success");
    },
    [entries, showSnackbar]
  );

  // Add new activity
  const addNewEntry = useCallback(() => {
    if (!newEntryName.trim()) return;

    const colors = [
      "#f59e0b",
      "#3b82f6",
      "#10b981",
      "#ef4444",
      "#8b5cf6",
      "#f97316",
    ];
    const defaultStartHour = Math.max(8, Math.min(20, new Date().getHours()));
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      name: newEntryName,
      duration: 60, // Default 1 hour
      category: newEntryCategory,
      color: colors[entries.length % colors.length],
      isActive: false,
      status: "scheduled",
      startHour: defaultStartHour,
      endHour: defaultStartHour + 1,
    };

    setEntries((prev) => [...prev, newEntry]);
    setNewEntryName("");
    showSnackbar(`Added: ${newEntry.name}`, "success");
  }, [newEntryName, newEntryCategory, entries, showSnackbar]);

  // Add task from modal
  const addTaskFromModal = useCallback(
    (task: {
      name: string;
      category: string;
      startHour: number;
      duration: number;
    }) => {
      const colors = {
        work: "#3b82f6",
        personal: "#10b981",
        learning: "#8b5cf6",
        exercise: "#f59e0b",
        break: "#ef4444",
        meeting: "#06b6d4",
      };

      if (editingEntry) {
        setEntries((prev) =>
          prev.map((entry) => {
            if (entry.id === editingEntry) {
              const newStartHour = task.startHour;
              const newEndHour = task.startHour + task.duration;

              const tempUpdatedEntry: TimeEntry = {
                ...entry,
                startHour: newStartHour,
                endHour: newEndHour,
              };

              const shouldStopTracking =
                entry.isCurrentlyTracking && !isTaskTrackable(tempUpdatedEntry);
              const newIsCurrentlyTracking = shouldStopTracking
                ? false
                : entry.isCurrentlyTracking;

              const newStatus = getStatusForTime(
                newStartHour,
                newEndHour,
                newIsCurrentlyTracking
              );

              if (shouldStopTracking) {
                showSnackbar(
                  `Stopped tracking "${entry.name}" due to time change.`,
                  "warning"
                );
              }

              return {
                ...entry,
                name: task.name,
                category: task.category,
                color:
                  colors[task.category as keyof typeof colors] || entry.color,
                startHour: newStartHour,
                endHour: newEndHour,
                duration: task.duration * 60,
                isCurrentlyTracking: newIsCurrentlyTracking,
                status: newStatus,
              };
            }
            return entry;
          })
        );
        showSnackbar(`Updated: ${task.name}`, "success");
        setEditingEntry(null);
      } else {
        const newStartHour = task.startHour;
        const newEndHour = task.startHour + task.duration;
        const newStatus = getStatusForTime(newStartHour, newEndHour, false);

        const newEntry: TimeEntry = {
          id: Date.now().toString(),
          name: task.name,
          duration: task.duration * 60,
          category: task.category,
          color: colors[task.category as keyof typeof colors] || "#3b82f6",
          isActive: false,
          status: newStatus,
          startHour: newStartHour,
          endHour: newEndHour,
        };

        setEntries((prev) => [...prev, newEntry]);
        showSnackbar(`Added: ${newEntry.name}`, "success");
      }
    },
    [editingEntry, showSnackbar]
  );

  // Open add task modal for specific hour
  const openAddTaskModal = useCallback((hour: number) => {
    setAddTaskHour(hour);
    setShowAddTaskModal(true);
  }, []);

  // Delete activity entry
  const deleteEntry = useCallback(
    (entryId: string) => {
      const entry = entries.find((e) => e.id === entryId);
      if (activeEntry === entryId) {
        stopTracking();
      }
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      showSnackbar(`Deleted: ${entry?.name}`, "error");
    },
    [entries, activeEntry, stopTracking, showSnackbar]
  );

  // Start editing entry - open modal with pre-populated data
  const startEditingEntry = useCallback(
    (entryId: string) => {
      const entry = entries.find((e) => e.id === entryId);
      if (entry) {
        setEditingEntry(entryId);
        setAddTaskHour(entry.startHour || 9);
        setShowAddTaskModal(true);
      }
    },
    [entries]
  );

  // Save edited entry
  const saveEditedEntry = useCallback(() => {
    if (!editingEntry || !editValue.trim()) return;

    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === editingEntry ? { ...entry, name: editValue } : entry
      )
    );

    setEditingEntry(null);
    setEditValue("");
    showSnackbar("Entry updated", "success");
  }, [editingEntry, editValue, showSnackbar]);

  // Check for timeline conflicts
  const checkTimelineConflicts = useCallback(() => {
    const conflicts: string[] = [];
    entries.forEach((entry, index) => {
      const entryStartHour = entry.startHour ?? 0;
      const entryEndHour = entry.endHour ?? 0;

      if (entry.startHour !== undefined && entry.endHour !== undefined) {
        entries.slice(index + 1).forEach((otherEntry) => {
          const otherStartHour = otherEntry.startHour ?? 0;
          const otherEndHour = otherEntry.endHour ?? 0;

          if (
            otherEntry.startHour !== undefined &&
            otherEntry.endHour !== undefined
          ) {
            if (
              entryStartHour < otherEndHour &&
              entryEndHour > otherStartHour
            ) {
              if (!conflicts.includes(entry.id)) conflicts.push(entry.id);
              if (!conflicts.includes(otherEntry.id))
                conflicts.push(otherEntry.id);
            }
          }
        });
      }
    });
    setTimelineConflicts(conflicts);
  }, [entries]);

  // Debounced snackbar to prevent spam
  const debouncedSnackbar = useMemo(
    () =>
      debounce(
        (
          message: string,
          type: "success" | "error" | "info" | "warning" = "info"
        ) => {
          showSnackbar(message, type);
        },
        800
      ), // 800ms debounce
    [showSnackbar]
  );

  // Update task time slot
  const updateTaskTimeSlot = useCallback(
    (taskId: string, newStartHour: number, newDuration?: number) => {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === taskId
            ? {
                ...entry,
                startHour: Math.max(0, Math.min(23, newStartHour)),
                endHour: Math.max(
                  0,
                  Math.min(
                    24,
                    newStartHour + (newDuration || entry.duration / 60)
                  )
                ),
                duration: newDuration ? newDuration * 60 : entry.duration,
              }
            : entry
        )
      );
      setTimeout(() => checkTimelineConflicts(), 100);
      debouncedSnackbar("Task rescheduled", "success");
    },
    [checkTimelineConflicts, debouncedSnackbar]
  );

  // Update task duration (resize)
  const updateTaskDuration = useCallback(
    (taskId: string, newDurationHours: number) => {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === taskId
            ? {
                ...entry,
                duration: Math.max(15, newDurationHours * 60), // Minimum 15 minutes
                endHour:
                  (entry.startHour ?? 0) + Math.max(0.25, newDurationHours),
              }
            : entry
        )
      );
      setTimeout(() => checkTimelineConflicts(), 100);
      debouncedSnackbar("Task duration updated", "success");
    },
    [checkTimelineConflicts, debouncedSnackbar]
  );

  // Delete task from timeline
  const deleteTaskFromTimeline = useCallback(
    (taskId: string) => {
      deleteEntry(taskId);
    },
    [deleteEntry]
  );

  // Export data functionality
  const exportData = useCallback(() => {
    const categorySummary = entries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + entry.duration;
      return acc;
    }, {} as { [key: string]: number });

    const hourlyBreakdown = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      duration: entries
        .filter((e) => {
          if (!e.startTime) return false;
          return new Date(e.startTime).getHours() === hour;
        })
        .reduce((sum, e) => sum + e.duration, 0),
    }));

    const exportData: ExportData = {
      date: new Date().toISOString().split("T")[0],
      entries: entries,
      totalTime: entries.reduce((sum, entry) => sum + entry.duration, 0),
      summary: {
        categories: categorySummary,
        dailyBreakdown: hourlyBreakdown,
      },
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `time-tracking-${exportData.date}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showSnackbar("Data exported successfully", "success");
  }, [entries, showSnackbar]);

  // Reset all data
  const resetData = useCallback(() => {
    if (activeEntry) stopTracking();
    setEntries([]);
    showSnackbar("All data cleared", "info");
  }, [activeEntry, stopTracking, showSnackbar]);

  // Format time display
  const formatTime = useCallback((minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }, []);

  // CSV export
  const exportCSV = useCallback(() => {
    const csvContent = [
      [
        "Name",
        "Category",
        "Duration (minutes)",
        "Status",
        "Start Time",
        "End Time",
      ],
      ...entries.map((entry) => [
        entry.name,
        entry.category,
        entry.duration.toString(),
        entry.status,
        entry.startTime?.toISOString() || "",
        entry.endTime?.toISOString() || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `time-tracking-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showSnackbar("CSV exported successfully", "success");
  }, [entries, showSnackbar]);

  // Navigate entries with arrow keys
  const navigateEntries = useCallback(
    (direction: "up" | "down") => {
      const currentIndex = selectedEntry
        ? entries.findIndex((e) => e.id === selectedEntry)
        : -1;
      let newIndex: number;

      if (direction === "up") {
        newIndex = currentIndex <= 0 ? entries.length - 1 : currentIndex - 1;
      } else {
        newIndex = currentIndex >= entries.length - 1 ? 0 : currentIndex + 1;
      }

      if (entries[newIndex]) {
        setSelectedEntry(entries[newIndex].id);
      }
    },
    [selectedEntry, entries]
  );

  // Keyboard shortcuts setup
  const keyboardShortcuts: KeyboardShortcut[] = useMemo(
    () => [
      {
        key: "Enter",
        description: "Start selected task",
        action: () => selectedEntry && startTracking(selectedEntry),
      },
      {
        key: "Space",
        description: "Stop selected tracking",
        action: () => (activeEntry ? stopTracking() : {}),
      },
      {
        key: "N",
        description: "New task",
        action: () => newEntryInputRef.current?.focus(),
      },
      { key: "E", description: "Export JSON", action: exportData },
      { key: "W", description: "Export CSV", action: exportCSV },
      { key: "R", description: "Reset data", action: resetData },
      {
        key: "H",
        description: "Toggle help",
        action: () => setShowKeyboardHelp((prev) => !prev),
      },

      {
        key: "ArrowUp",
        description: "Navigate up",
        action: () => navigateEntries("up"),
      },
      {
        key: "ArrowDown",
        description: "Navigate down",
        action: () => navigateEntries("down"),
      },
    ],
    [
      activeEntry,
      stopTracking,
      exportData,
      exportCSV,
      resetData,
      navigateEntries,
      selectedEntry,
      startTracking,
    ]
  );

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      const shortcut = keyboardShortcuts.find((s) => {
        if (s.key === "Space" && e.code === "Space") return true;
        if (s.key === "ArrowUp" && e.key === "ArrowUp") return true;
        if (s.key === "ArrowDown" && e.key === "ArrowDown") return true;
        if (s.key === "Delete" && e.key === "Delete") return true;
        if (s.key === "Enter" && e.key === "Enter") return true;
        return e.key.toLowerCase() === s.key.toLowerCase();
      });

      if (shortcut) {
        e.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardShortcuts]);

  // Filtered entries based on filters
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (
        filters.category !== "all" &&
        entry.category.toLowerCase() !== filters.category.toLowerCase()
      )
        return false;
      if (filters.status !== "all" && entry.status !== filters.status)
        return false;
      return true;
    });
  }, [entries, filters]);

  // Chart data preparation
  const chartData: ChartDataPoint[] = filteredEntries.map((entry) => ({
    name: entry.name,
    value: entry.duration,
    color: entry.color,
    category: entry.category,
  }));

  // Calculate hourly data for bar chart
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, "0")}:00`,
      duration: 0,
      tasks: 0,
      activities: [] as string[],
    }));

    filteredEntries.forEach((entry) => {
      if (entry.startHour !== undefined && entry.endHour !== undefined) {
        const startHour = Math.floor(entry.startHour);
        const endHour = Math.ceil(entry.endHour);
        for (let hour = startHour; hour < endHour && hour < 24; hour++) {
          const overlap =
            Math.min(hour + 1, entry.endHour!) -
            Math.max(hour, entry.startHour!);
          if (overlap > 0) {
            hours[hour].duration += overlap * 60; // Convert to minutes
            hours[hour].tasks += 1;
            if (!hours[hour].activities.includes(entry.name)) {
              hours[hour].activities.push(entry.name);
            }
          }
        }
      } else if (entry.startTime) {
        // Fallback to startTime if startHour not set
        const hour = new Date(entry.startTime).getHours();
        hours[hour].duration += entry.duration;
        hours[hour].tasks += 1;
        if (!hours[hour].activities.includes(entry.name)) {
          hours[hour].activities.push(entry.name);
        }
      }
    });

    return hours;
  }, [filteredEntries]);

  const totalTime = filteredEntries.reduce(
    (sum, entry) => sum + entry.duration,
    0
  );

  // Status-based entry groups
  const ongoingEntries = entries.filter(
    (e) => e.status === "ongoing" || e.isActive
  );
  const completedEntries = entries.filter((e) => e.status === "completed");
  const scheduledEntries = entries.filter((e) => e.status === "scheduled");

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(windowSize.width < 768);
    };
    checkMobile();
  }, [windowSize.width]);

  // Handle panel drag
  const handlePanelDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setPanelState((prev) => ({
      ...prev,
      isDragging: true,
      startY: clientY,
    }));
  };

  const handlePanelDragMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!panelState.isDragging) return;

      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - panelState.startY;
      const windowHeight = windowSize.height;
      const newHeight = Math.max(
        20,
        Math.min(80, panelState.currentHeight - (deltaY / windowHeight) * 100)
      );

      setPanelState((prev) => ({
        ...prev,
        currentHeight: newHeight,
      }));
    },
    [
      panelState.isDragging,
      panelState.startY,
      panelState.currentHeight,
      windowSize.height,
    ]
  );

  const handlePanelDragEnd = () => {
    setPanelState((prev) => ({
      ...prev,
      isDragging: false,
    }));
  };

  useEffect(() => {
    if (panelState.isDragging) {
      window.addEventListener("mousemove", handlePanelDragMove);
      window.addEventListener("mouseup", handlePanelDragEnd);
      window.addEventListener("touchmove", handlePanelDragMove);
      window.addEventListener("touchend", handlePanelDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handlePanelDragMove);
      window.removeEventListener("mouseup", handlePanelDragEnd);
      window.removeEventListener("touchmove", handlePanelDragMove);
      window.removeEventListener("touchend", handlePanelDragEnd);
    };
  }, [panelState.isDragging, handlePanelDragMove]);

  return (
    <>
      <FontStyles />
      <style>
        {`
       /* Custom Dark Theme Scrollbars */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
  border: 1px solid #374151;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background: #f97316;
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: #1f2937;
}

/* Orange accent scrollbar for special areas */
.custom-scrollbar-orange {
  scrollbar-width: thin;
  scrollbar-color: #f97316 #1f2937;
}

.custom-scrollbar-orange::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar-orange::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

.custom-scrollbar-orange::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 4px;
  border: 1px solid #ea580c;
}

.custom-scrollbar-orange::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}

.custom-scrollbar-orange::-webkit-scrollbar-corner {
  background: #1f2937;
}

@media (max-width: 768px) {
  .mobile-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 40;
    transition: transform 0.3s ease-in-out, height 0.3s ease-in-out;
    transform: translateY(${showMobilePanel ? "0" : "100%"});
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  }
  
  .panel-handle {
    width: 40px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    margin: 12px auto;
    position: relative;
  }

  .panel-handle::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 25px;
    cursor: grab;
  }

  .panel-handle:active {
    background-color: rgba(255, 255, 255, 0.4);
    cursor: grabbing;
  }

  /* Add extra padding at the bottom of timeline for mobile */
  .timeline-container {
    padding-bottom: 60px;
  }

  /* Adjust timeline spacing for mobile */
  .timeline-row-container {
    margin-bottom: 1rem;
  }

  /* Hide certain hour markers on mobile */
  .hour-marker:not(:nth-child(3n)) {
    display: none;
  }
}
      `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
        {/* Background overlay for glassmorphism */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-800/80 via-gray-800/60 to-gray-900/80 backdrop-blur-3xl"></div>

        {/* App Bar */}
        <AppBar />

        <div className="flex relative z-10 h-[calc(100vh-80px)] md:flex-row flex-col">
          {/* Left Panel */}
          <motion.div
            initial={{ x: isMobile ? 0 : -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`${
              isMobile
                ? "mobile-panel bg-gray-800/95 backdrop-blur-xl"
                : "w-1/4 min-w-80 max-w-96 bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50"
            }  relative z-10 shadow-2xl overflow-y-auto custom-scrollbar`}
            style={
              isMobile
                ? {
                    height: `${panelState.currentHeight}vh`,
                    maxHeight: "80vh",
                  }
                : undefined
            }
          >
            {isMobile && (
              <div
                className="panel-handle cursor-grab"
                onMouseDown={handlePanelDragStart}
                onTouchStart={handlePanelDragStart}
              />
            )}
            {/* Current time and tracking */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-gray-200">
                    Current Time
                  </span>
                </div>
                <ClientTime />
              </div>

              {/* Active tracking display */}
              {(() => {
                const trackingEntry = entries.find(
                  (e) => e.isCurrentlyTracking
                );
                return (
                  trackingEntry && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-900/30 border border-green-500/30 rounded-xl"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-2 h-2 bg-green-400 rounded-full"
                          />
                          <span className="text-xs font-medium text-green-300">
                            NOW TRACKING: {trackingEntry.name}
                          </span>
                        </div>
                        <span className="text-xs text-green-400 font-mono">
                          {Math.floor(trackingEntry.duration / 60)}h{" "}
                          {trackingEntry.duration % 60}m
                        </span>
                      </div>
                    </motion.div>
                  )
                );
              })()}
            </div>

            {/* Export controls */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-white mb-3">
                Export Options
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={exportData}
                  className="flex items-center justify-center space-x-1 py-2 px-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-orange-400 transition-all duration-200 text-xs font-medium border border-gray-600 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>JSON</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={exportCSV}
                  className="flex items-center justify-center space-x-1 py-2 px-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-orange-400 transition-all duration-200 text-xs font-medium border border-gray-600 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>CSV</span>
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={resetData}
                className="w-full flex items-center justify-center space-x-1 py-2 px-3 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-red-400 transition-all duration-200 text-xs font-medium border border-gray-600 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Data</span>
              </motion.button>
            </div>

            {/* Filter controls */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
              <div className="space-y-2">
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all" className="bg-gray-700 text-gray-200">
                    All Categories
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-gray-700 text-gray-200"
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: e.target.value as FilterOptions["status"],
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all" className="bg-gray-700 text-gray-200">
                    All Status
                  </option>
                  <option value="ongoing" className="bg-gray-700 text-gray-200">
                    Ongoing
                  </option>
                  <option
                    value="completed"
                    className="bg-gray-700 text-gray-200"
                  >
                    Completed
                  </option>
                  <option
                    value="scheduled"
                    className="bg-gray-700 text-gray-200"
                  >
                    Scheduled
                  </option>
                </select>
              </div>
            </div>

            {/* Add new task */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-white mb-3">
                Add New Task
              </h3>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    ref={newEntryInputRef}
                    type="text"
                    value={newEntryName}
                    onChange={(e) => setNewEntryName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNewEntry()}
                    placeholder="Add activity..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white transition-all duration-200 placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addNewEntry}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <select
                  value={newEntryCategory}
                  onChange={(e) => setNewEntryCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-gray-700 text-gray-200"
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Task lists */}
            <div className="p-4 space-y-4">
              {/* Ongoing Tasks */}
              {ongoingEntries.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    ONGOING ({ongoingEntries.length})
                  </h4>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {ongoingEntries.map((entry) => (
                        <div
                          key={entry.id}
                          onClick={() =>
                            entry.isActive
                              ? stopTracking()
                              : startTracking(entry.id)
                          }
                          className="cursor-pointer"
                        >
                          <TaskCard
                            entry={entry}
                            onEdit={startEditingEntry}
                            onDelete={deleteEntry}
                            editingEntry={editingEntry}
                            editValue={editValue}
                            setEditValue={setEditValue}
                            saveEditedEntry={saveEditedEntry}
                          />
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Scheduled Tasks */}
              {scheduledEntries.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                    SCHEDULED ({scheduledEntries.length})
                  </h4>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {scheduledEntries.map((entry) => (
                        <div
                          key={entry.id}
                          onClick={() =>
                            entry.isActive
                              ? stopTracking()
                              : startTracking(entry.id)
                          }
                          className="cursor-pointer"
                        >
                          <TaskCard
                            entry={entry}
                            onEdit={startEditingEntry}
                            onDelete={deleteEntry}
                            editingEntry={editingEntry}
                            editValue={editValue}
                            setEditValue={setEditValue}
                            saveEditedEntry={saveEditedEntry}
                          />
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {completedEntries.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                    COMPLETED ({completedEntries.length})
                  </h4>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {completedEntries.map((entry) => (
                        <div
                          key={entry.id}
                          onClick={() =>
                            entry.isActive
                              ? stopTracking()
                              : startTracking(entry.id)
                          }
                          className="cursor-pointer"
                        >
                          <TaskCard
                            entry={entry}
                            onEdit={startEditingEntry}
                            onDelete={deleteEntry}
                            editingEntry={editingEntry}
                            editValue={editValue}
                            setEditValue={setEditValue}
                            saveEditedEntry={saveEditedEntry}
                          />
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Keyboard shortcuts */}
              <div className="p-4 mt-auto border-t border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setShowKeyboardHelp(true)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-orange-400 transition-all duration-200 text-sm font-medium border border-gray-600 cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Keyboard Shortcuts</span>
                </motion.button>
                <div className="mt-3 text-xs text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Quick Add:</span>
                    <kbd className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-orange-400">
                      N
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Start:</span>
                    <kbd className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-orange-400">
                      Enter
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Stop:</span>
                    <kbd className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-orange-400">
                      Space
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Delete:</span>
                    <kbd className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-orange-400">
                      Del
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Export JSON:</span>
                    <kbd className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-orange-400">
                      E
                    </kbd>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ x: isMobile ? 0 : 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="flex-1 bg-gray-900/20 backdrop-blur-xl relative z-10 overflow-y-auto custom-scrollbar"
          >
            <div className="p-6">
              {/* Statistics cards  */}
              <div className="mb-6 flex-shrink-0">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:shadow-2xl hover:border-orange-500/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                        <Timer className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">
                          Total Time
                        </p>
                        <p className="text-2xl font-bold text-orange-400">
                          {formatTime(totalTime)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Target className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">
                          Activities
                        </p>
                        <p className="text-2xl font-bold text-blue-400">
                          {entries.length}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:shadow-2xl hover:border-green-500/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">
                          Active Now
                        </p>
                        <p className="text-lg font-semibold text-green-400 truncate">
                          {(() => {
                            const trackingEntry = entries.find(
                              (e) => e.isCurrentlyTracking
                            );
                            return trackingEntry ? trackingEntry.name : "None";
                          })()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Analytics charts */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Analytics Dashboard
                </h2>
                {chartData.length === 0 ? (
                  <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-xl h-80">
                    <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
                      <BarChart3 className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-lg font-medium">No data to display</p>
                      <p className="text-sm">Add activities to see analytics</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Distribution - Pie Chart */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-800/50 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-700/50 shadow-xl w-full"
                    >
                      <div className="flex items-center space-x-2 mb-3 sm:mb-4 bg-opacity-0">
                        <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                        <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                          Category Distribution
                        </h3>
                      </div>
                      <div className="h-48 sm:h-60 relative w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                          >
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              outerRadius={windowSize.width < 640 ? 70 : 90}
                              innerRadius={windowSize.width < 640 ? 30 : 40}
                              dataKey="value"
                              label={false}
                              labelLine={false}
                            >
                              {chartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(
                                value: number,
                                name: string,
                                props: {
                                  payload: { category: string; name?: string };
                                }
                              ) => {
                                if (!props || !props.payload)
                                  return [value, name];
                                const entry = props.payload;
                                return [
                                  <div key="tooltip" className="space-y-1">
                                    <div className="font-medium">
                                      {formatTime(value)}
                                    </div>
                                    <div className="text-xs text-gray-300">
                                      {entry.category &&
                                        `Category: ${entry.category}`}
                                    </div>
                                  </div>,
                                  entry.name || name,
                                ];
                              }}
                              contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.95)",
                                border: "1px solid #f97316",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                                fontSize: "12px",
                                color: "#f3f4f6",
                                backdropFilter: "blur(10px)",
                                padding: "8px 12px",
                              }}
                              labelStyle={{
                                color: "#f3f4f6",
                                fontWeight: "600",
                                marginBottom: "4px",
                              }}
                              itemStyle={{ color: "#f3f4f6" }}
                            />
                            {windowSize.width >= 440 && (
                              <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                height={36}
                                wrapperStyle={{
                                  padding: 12,
                                  color: "#f3f4f6",
                                  fontSize: 13,
                                  fontFamily: "Manrope, sans-serif",
                                  background: "none",
                                  display: "flex",
                                  flexWrap: "wrap",
                                  justifyContent: "center",
                                  gap: 8,
                                }}
                                payload={chartData.map((entry) => ({
                                  id: entry.name,
                                  type: "circle",
                                  value: `${entry.name} (${formatTime(
                                    entry.value
                                  )})`,
                                  color: entry.color,
                                }))}
                              />
                            )}
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    {/* Hourly Activity - Bar Chart */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 shadow-xl"
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">
                          Hourly Activity
                        </h3>
                      </div>
                      <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={hourlyData}
                            margin={{
                              top: 10,
                              right: 15,
                              left: 15,
                              bottom: 10,
                            }}
                          >
                            <XAxis
                              dataKey="hour"
                              tick={{ fill: "#9ca3af", fontSize: 9 }}
                              axisLine={{ stroke: "#4b5563" }}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis
                              tickFormatter={(value) =>
                                `${Math.floor(value / 60)}h`
                              }
                              tick={{ fill: "#9ca3af", fontSize: 10 }}
                              axisLine={{ stroke: "#4b5563" }}
                            />
                            <Tooltip
                              formatter={(value: number, name: string) => [
                                `${Math.floor(value / 60)}h ${value % 60}m`,
                                name === "duration" ? "Duration" : name,
                              ]}
                              labelFormatter={(label) => `${label}`}
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-gray-800/95 border border-orange-500 rounded-lg p-3 shadow-xl backdrop-blur-sm">
                                      <p className="text-orange-400 font-medium text-sm mb-2">
                                        {label}
                                      </p>
                                      <p className="text-gray-200 text-sm mb-2">
                                        Duration:{" "}
                                        {Math.floor(data.duration / 60)}h{" "}
                                        {data.duration % 60}m
                                      </p>
                                      {data.activities &&
                                        data.activities.length > 0 && (
                                          <div>
                                            <p className="text-gray-300 text-xs font-medium mb-1">
                                              Activities:
                                            </p>
                                            <div className="space-y-1">
                                              {data.activities.map(
                                                (
                                                  activity: string,
                                                  index: number
                                                ) => (
                                                  <div
                                                    key={index}
                                                    className="text-xs text-gray-400 flex items-center"
                                                  >
                                                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                                                    {activity}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Bar
                              dataKey="duration"
                              radius={[4, 4, 0, 0]}
                              fill="#f97316"
                              fillOpacity={0.8}
                            ></Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Timeline Editor  */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/40 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-gray-700/50 shadow-2xl mb-20 md:mb-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Interactive Timeline
                      </h3>
                      <p className="text-sm text-gray-400">
                        {filters.category !== "all" ||
                        filters.status !== "all" ? (
                          <span>
                            Showing filtered tasks ({filteredEntries.length} of{" "}
                            {entries.length})
                          </span>
                        ) : (
                          "Drag tasks to reschedule"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Show reset filters button when filters are active */}
                  {(filters.category !== "all" || filters.status !== "all") && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() =>
                        setFilters({
                          category: "all",
                          status: "all",
                          timeRange: "today",
                        })
                      }
                      className="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors text-sm font-medium flex items-center space-x-2 cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>Reset Filters</span>
                    </motion.button>
                  )}
                </div>

                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">No matching tasks</p>
                    <p className="text-xs">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="space-y-4 relative">
                    {/* Timeline Header */}
                    <div className="sticky top-0 z-30 bg-gray-800/95 backdrop-blur-xl py-4 -mx-4 px-4 md:-mx-6 md:px-6 border-b border-white/20">
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-24 md:w-32 flex-shrink-0 text-gray-400 font-medium">
                          Task
                        </div>
                        <div className="flex-1 relative">
                          <div className="grid grid-cols-24 h-12">
                            {Array.from({ length: 24 }, (_, i) => (
                              <div
                                key={i}
                                className="relative hover:bg-blue-100/10 transition-colors cursor-pointer group/hour border-r border-gray-200/20"
                                onClick={() => openAddTaskModal(i)}
                                title={`Add task at ${i
                                  .toString()
                                  .padStart(2, "0")}:00`}
                              >
                                <div
                                  className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] md:text-xs font-mono text-gray-400 ${
                                    isMobile
                                      ? i % 3 === 0
                                        ? "block"
                                        : "hidden"
                                      : "block"
                                  }`}
                                >
                                  {i.toString().padStart(2, "0")}
                                </div>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 opacity-0 group-hover/hour:opacity-100 transition-opacity">
                                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                    <Plus size={10} className="text-white" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Timeline scale */}
                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-600"></div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Rows */}
                    <div className="space-y-8 pb-32 md:pb-20">
                      {filteredEntries.map((entry, index) => (
                        <TimelineRow
                          key={entry.id}
                          entry={entry}
                          index={index}
                          hasConflict={timelineConflicts.includes(entry.id)}
                          onUpdateTimeSlot={updateTaskTimeSlot}
                          onUpdateDuration={updateTaskDuration}
                          onDeleteTask={deleteTaskFromTimeline}
                          onSelectEntry={setSelectedEntry}
                          formatTime={formatTime}
                          showSnackbar={showSnackbar}
                          setEntries={setEntries}
                          onStartTracking={startTracking}
                          onStopTracking={stopTracking}
                          isMobile={isMobile}
                        />
                      ))}
                    </div>

                    {/* Live tracking indicator */}
                    {activeEntry &&
                      filteredEntries.find((e) => e.id === activeEntry) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center mt-10 space-x-2 p-2 bg-green-100/30 rounded-lg border border-green-300/50"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs font-medium text-green-300">
                            Currently tracking:{" "}
                            {entries.find((e) => e.id === activeEntry)?.name}
                          </span>
                          <div className="text-xs text-green-600 ml-auto font-mono">
                            <ClientTime />
                          </div>
                        </motion.div>
                      )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Snackbar Notifications */}
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          <AnimatePresence>
            {snackbars.map((snackbar, idx) => (
              <motion.div
                key={`${snackbar.id}-${idx}`}
                initial={{ opacity: 0, x: 200, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 200, scale: 0.9 }}
                className={`flex items-center justify-between p-4 rounded-xl border min-w-64 shadow-2xl backdrop-blur-xl ${
                  snackbar.type === "success"
                    ? "bg-green-900/70 border-green-500/60 text-green-300"
                    : snackbar.type === "error"
                    ? "bg-red-900/70 border-red-500/60 text-red-300"
                    : snackbar.type === "warning"
                    ? "bg-amber-900/70 border-amber-500/60 text-amber-300"
                    : "bg-blue-900/70 border-blue-500/60 text-blue-300"
                }`}
              >
                <span className="text-sm font-medium">{snackbar.message}</span>
                <button
                  onClick={() => removeSnackbar(snackbar.id)}
                  className="ml-3 p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={showAddTaskModal}
          onClose={() => {
            setShowAddTaskModal(false);
            setEditingEntry(null);
          }}
          onAdd={addTaskFromModal}
          initialHour={addTaskHour}
          editingTask={
            editingEntry
              ? entries.find((e) => e.id === editingEntry)
              : undefined
          }
        />

        {/* Keyboard Help Modal */}
        <AnimatePresence>
          {showKeyboardHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowKeyboardHelp(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-800/60 backdrop-blur-2xl p-6 rounded-2xl border border-gray-700/50 max-w-sm w-full mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Keyboard Shortcuts
                  </h3>
                  <button
                    onClick={() => setShowKeyboardHelp(false)}
                    className="p-1 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-3">
                  {keyboardShortcuts.map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-300">
                        {shortcut.description}
                      </span>
                      <kbd className="px-3 py-1 bg-gray-700 rounded-md text-xs font-mono text-orange-400 border border-gray-600">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile floating action button */}
        {isMobile && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const currentHour = new Date().getHours();
              setAddTaskHour(currentHour);
              setShowAddTaskModal(true);
            }}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full shadow-xl ring-4 ring-orange-500/30 flex items-center justify-center"
          >
            <Plus className="w-6 h-6 text-white" />
            <span className="sr-only">Add New Task</span>
          </motion.button>
        )}
      </div>
    </>
  );
}

export default Dashboard;
