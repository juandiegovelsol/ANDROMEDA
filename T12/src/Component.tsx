"use client";
import React from "react";
import { useState, useCallback, useRef, useEffect, useContext } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  Controls,
  useNodesState,
  useEdgesState,
  type Connection,
  ReactFlowProvider,
  Handle,
  Position,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import ReactDOM from "react-dom";

const IconAlert = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconChevronRight = ({ size = 14, className = "" }) => (
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
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const IconDatabase = ({ size = 16, className = "" }) => (
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
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const IconEye = ({ size = 14, className = "" }) => (
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
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const IconGlobe = ({ size = 16, className = "" }) => (
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
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const IconMenu = ({ size = 16, className = "" }) => (
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
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const IconPlay = ({ size = 16, className = "" }) => (
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
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const IconRefreshCw = ({ size = 16, className = "" }) => (
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
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const IconSave = ({ size = 14, className = "" }) => (
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
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const IconWrench = ({ size = 16, className = "" }) => (
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
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const IconX = ({ size = 16, className = "" }) => (
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
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconClock = ({ size = 16, className = "" }) => (
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
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const IconBarChart = ({ size = 16, className = "" }) => (
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
  >
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const IconClipboard = ({ size = 16, className = "" }) => (
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
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

// Custom Dropdown Component
const Dropdown: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ trigger, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Element)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}
    >
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8),8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-100">
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

const DropdownItem: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}> = ({ children, onClick, variant = "default" }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer rounded-sm focus:outline-none
        ${
          variant === "danger"
            ? "bg-gradient-to-br from-red-400 to-red-600 text-white hover:from-red-400 hover:to-red-500 hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.1)]"
            : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]"
        }
      `}
    >
      {children}
    </button>
  );
};

// Toast notification system
interface Toast {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

interface WorkflowStep {
  id: string;
  type: "api" | "transform" | "filter";
  name: string;
  config: any;
  response?: any;
  timestamp?: number;
  status: "pending" | "running" | "success" | "error";
  input?: any;
}

interface ExecutionHistory {
  id: string;
  timestamp: number;
  steps: WorkflowStep[];
  duration: number;
  status: "success" | "error";
}

interface InheritedParameter {
  path: string;
  value: any;
  type: string;
  source: string;
  description?: string;
}

// Toast Context
const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Automatically remove toast after 2 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed top-16 left-0 right-0 z-50 p-4 max-w-full w-full md:max-w-sm md:left-auto md:right-4 pointer-events-none flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg 
            transform transition-all duration-300 ease-in-out
            ${
              toast.type === "success"
                ? "bg-white border-l-4 border-gray-800"
                : toast.type === "error"
                ? "bg-white border-l-4 border-gray-800"
                : toast.type === "warning"
                ? "bg-white border-l-4 border-gray-600"
                : "bg-white border-l-4 border-gray-400"
            }
          `}
          style={{
            maxWidth: "100%",
            width: "100%",
            fontFamily: "Oswald, sans-serif",
          }}
        >
          <div
            className={`
            flex-shrink-0 w-5 h-5
            ${
              toast.type === "success"
                ? "text-gray-800"
                : toast.type === "error"
                ? "text-gray-800"
                : toast.type === "warning"
                ? "text-gray-600"
                : "text-gray-400"
            }
          `}
          >
            {toast.type === "success" && <IconCheck />}
            {toast.type === "error" && <IconAlert />}
            {toast.type === "warning" && <IconAlert />}
            {toast.type === "info" && <IconAlert />}
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="font-medium text-gray-900">{toast.title}</h3>
            {toast.description && (
              <p className="text-sm text-gray-600 mt-1 break-words">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IconX size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
}> = ({
  children,
  onClick,
  disabled,
  size = "md",
  variant = "default",
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 font-['Oswald'] relative overflow-hidden group cursor-pointer";

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base",
  };

  const variantClasses = {
    default:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg",
    outline:
      "border border-indigo-300 bg-white text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-500 shadow-sm hover:shadow-md",
    ghost:
      "text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-500 hover:shadow-sm",
    secondary:
      "bg-indigo-100 text-indigo-900 hover:bg-indigo-200 focus:ring-indigo-500 shadow-sm hover:shadow-md",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${
        variantClasses[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};

const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}> = ({ children, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-indigo-100 text-indigo-800",
    secondary: "bg-purple-100 text-purple-800",
    outline: "border border-indigo-300 text-indigo-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-['Oswald'] ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}> = ({ children, className = "", hoverable = false }) => {
  return (
    <div
      className={`
        bg-white rounded-lg border border-indigo-100 shadow-sm font-['Oswald']
        transition-all duration-300 ease-in-out
        ${
          hoverable
            ? "hover:shadow-md hover:-translate-y-1 hover:border-indigo-200"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 border-b border-indigo-100 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-semibold text-indigo-900 ${className}`}>
      {children}
    </h3>
  );
};

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

const Tabs: React.FC<{
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}> = ({ children, defaultValue, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              activeTab,
              setActiveTab,
            })
          : child
      )}
    </div>
  );
};

const TabsList: React.FC<{
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}> = ({ children, className = "", activeTab, setActiveTab }) => {
  return (
    <div className={`flex space-x-1 rounded-lg bg-indigo-50 p-1 ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              activeTab,
              setActiveTab,
            })
          : child
      )}
    </div>
  );
};

const TabsTrigger: React.FC<{
  children: React.ReactNode;
  value: string;
  className?: string;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}> = ({ children, value, className = "", activeTab, setActiveTab }) => {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab?.(value)}
      className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 font-['Oswald'] cursor-pointer ${
        isActive
          ? "bg-white text-indigo-900 shadow-sm"
          : "text-indigo-600 hover:text-indigo-900"
      } ${className}`}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<{
  children: React.ReactNode;
  value: string;
  className?: string;
  activeTab?: string;
}> = ({ children, value, className = "", activeTab }) => {
  if (activeTab !== value) return null;

  return <div className={`${className}`}>{children}</div>;
};

const templateRegex = /\{\{([^}]+)\}\}/g;
const getValueByPath = (obj: any, path: string): any => {
  if (!obj) return undefined;

  const parts = path.split(".");
  let current = obj;

  for (const part of parts) {
    const match = part.match(/^([^[]+)(?:\[(\d+)\])?$/);
    if (!match) return undefined;

    const [_, key, index] = match;

    if (current[key] === undefined) return undefined;
    current = current[key];

    if (index !== undefined && Array.isArray(current)) {
      const idx = Number.parseInt(index);
      if (idx >= 0 && idx < current.length) {
        current = current[idx];
      } else {
        return undefined;
      }
    }
  }

  return current;
};
const resolveTemplateExpressions = (template: string, data: any): string => {
  if (!template) return template;

  return template.replace(templateRegex, (match, path) => {
    const value = getValueByPath(data, path.trim());
    return value !== undefined ? String(value) : match;
  });
};
const resolveTemplateObject = (obj: any, data: any): any => {
  if (!obj) return obj;

  if (typeof obj === "string") {
    return resolveTemplateExpressions(obj, data);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveTemplateObject(item, data));
  }

  if (typeof obj === "object") {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = resolveTemplateObject(value, data);
    }
    return result;
  }

  return obj;
};

const TemplateHighlighter: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  templateRegex.lastIndex = 0;

  while ((match = templateRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }

    parts.push(
      <span
        key={`template-${match.index}`}
        className="bg-gray-200 text-gray-800 px-1 rounded font-mono"
      >
        {match[0]}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
    );
  }

  return <>{parts}</>;
};

const ParameterHelper: React.FC<{
  inheritedData: any;
  onInsertParameter: (path: string) => void;
  targetField?: string;
}> = ({ inheritedData, onInsertParameter, targetField }) => {
  if (!inheritedData) {
    return (
      <div className="bg-gray-50 p-3 rounded-lg text-center text-gray-500 text-sm">
        No input data available. Connect this node to another node to access
        parameters.
      </div>
    );
  }

  return (
    <Card className="mt-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Available Parameters</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="p-2 bg-gray-100 rounded text-xs">
          <div className="font-medium mb-1">Raw Data:</div>
          <pre className="overflow-auto max-h-48 text-xs">
            {JSON.stringify(inheritedData, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};
const ParameterInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inheritedData?: any;
  className?: string;
  multiline?: boolean;
}> = ({
  value,
  onChange,
  placeholder,
  inheritedData,
  className,
  multiline = false,
}) => {
  const [showHelper, setShowHelper] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const insertParameter = (paramPath: string) => {
    const input = multiline ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const newValue =
      value.slice(0, start) + `{{${paramPath}}}` + value.slice(end);

    onChange(newValue);
    setShowHelper(false);

    setTimeout(() => {
      input.focus();
      const newCursorPos = start + paramPath.length + 4;
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${className} rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all duration-200`}
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${className} rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all duration-200`}
        />
      )}

      {inheritedData && (
        <button
          onClick={() => setShowHelper(!showHelper)}
          className="absolute top-1 right-1 bg-gray-100 hover:bg-gray-200 rounded p-1 transition-colors duration-200 cursor-pointer"
        >
          <IconDatabase size={14} className="text-gray-500" />
        </button>
      )}

      {showHelper && (
        <div className="absolute top-full left-0 mt-2 w-full z-10 animate-in slide-in-from-top-2 duration-200">
          <ParameterHelper
            inheritedData={inheritedData}
            onInsertParameter={insertParameter}
          />
        </div>
      )}
    </div>
  );
};

const CustomSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}> = ({ value, onChange, options, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Element)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 text-xs border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 font-['Oswald'] text-gray-900"
      >
        <span>{selectedOption?.label || value}</span>
        <IconChevronRight
          size={12}
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors duration-200 ${
                option.value === value
                  ? "bg-indigo-50 text-indigo-900"
                  : "text-gray-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ApiNode = React.forwardRef<HTMLDivElement, NodeProps>(
  ({ data, selected, id }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState(data);
    const [showPreview, setShowPreview] = useState(false);
    const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
    const [headersText, setHeadersText] = useState(
      data.headers ? JSON.stringify(data.headers, null, 2) : "{}"
    );
    const [bodyText, setBodyText] = useState(
      data.body ? JSON.stringify(data.body, null, 2) : ""
    );
    const nodeRef = useRef<HTMLDivElement>(null);
    const { addToast } = useToast();

    useEffect(() => {
      setFormData(data);
      setHeadersText(
        data.headers ? JSON.stringify(data.headers, null, 2) : "{}"
      );
      setBodyText(data.body ? JSON.stringify(data.body, null, 2) : "");
    }, [data]);

    const updatePreviewPosition = () => {
      if (nodeRef.current) {
        const rect = nodeRef.current.getBoundingClientRect();
        setPreviewPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
        });
      }
    };

    useEffect(() => {
      if (showPreview) {
        updatePreviewPosition();
        window.addEventListener("scroll", updatePreviewPosition);
        window.addEventListener("resize", updatePreviewPosition);
        return () => {
          window.removeEventListener("scroll", updatePreviewPosition);
          window.removeEventListener("resize", updatePreviewPosition);
        };
      }
    }, [showPreview]);

    const handleDelete = () => {
      if (data.onDelete) {
        data.onDelete(id);
        addToast({
          title: "Node Deleted",
          description: `${data.label} has been removed from the workflow`,
          type: "info",
        });
      }
    };

    const handleSave = () => {
      if (data.onUpdate) {
        // Parse JSON strings when saving
        let parsedHeaders = {};
        let parsedBody = null;

        try {
          if (headersText.trim()) {
            parsedHeaders = JSON.parse(headersText);
          }
        } catch (err) {
          addToast({
            title: "Invalid Headers JSON",
            description: "Please fix the JSON syntax in headers",
            type: "error",
          });
          return;
        }

        try {
          if (bodyText.trim()) {
            parsedBody = JSON.parse(bodyText);
          }
        } catch (err) {
          addToast({
            title: "Invalid Body JSON",
            description: "Please fix the JSON syntax in body",
            type: "error",
          });
          return;
        }

        const updatedFormData = {
          ...formData,
          headers: parsedHeaders,
          body: parsedBody,
        };

        data.onUpdate(id, updatedFormData);
        addToast({
          title: "Configuration Saved",
          description: `${formData.label} settings have been updated`,
          type: "success",
        });
      }
      setIsExpanded(false);
    };

    const handleCancel = () => {
      setFormData(data);
      setHeadersText(
        data.headers ? JSON.stringify(data.headers, null, 2) : "{}"
      );
      setBodyText(data.body ? JSON.stringify(data.body, null, 2) : "");
      setIsExpanded(false);
    };

    return (
      <>
        <div
          ref={(el) => {
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
            nodeRef.current = el;
          }}
          className={`
          relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 
          shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] 
          border-2 transition-all duration-300 
          hover:shadow-[12px_12px_20px_rgba(0,0,0,0.12),-12px_-12px_20px_rgba(255,255,255,0.9)] font-['Oswald']
          ${
            selected
              ? "border-blue-400 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] scale-105"
              : "border-blue-200 hover:scale-102"
          }
          ${isExpanded ? "min-w-[80vw] md:min-w-[500px]" : "min-w-[200px]"}
        `}
        >
          <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-indigo-400 border-2 border-white transition-all duration-300 hover:scale-125"
          />

          <div className="absolute -top-2 -right-2 z-10">
            <Dropdown
              className="py-0"
              trigger={
                <button className="w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-500 hover:shadow-lg transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer min-w-[32px] min-h-[32px]">
                  <IconChevronRight size={14} className="rotate-90" />
                </button>
              }
            >
              <DropdownItem onClick={handleDelete} variant="danger">
                <IconX size={14} className="text-white" />
                Delete
              </DropdownItem>
            </Dropdown>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <IconGlobe
                className="text-white transition-transform duration-300 group-hover:scale-110"
                size={16}
              />
            </div>
            <span className="font-semibold text-indigo-900">{data.label}</span>
            {data.inheritedData && (
              <Badge
                variant="secondary"
                className="text-xs bg-indigo-100 text-indigo-700 animate-pulse"
              >
                <IconDatabase size={10} className="mr-1" /> Connected
              </Badge>
            )}
          </div>

          {!isExpanded ? (
            <>
              <div className="text-xs text-gray-700 mb-2">
                <div>Method: {data.method || "GET"}</div>
                <div className="truncate">
                  URL: {data.url || "https://api.example.com"}
                </div>
                {data.headers && (
                  <div>Headers: {Object.keys(data.headers).length} items</div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowPreview(!showPreview);
                    if (!showPreview) {
                      updatePreviewPosition();
                      setIsExpanded(false);
                    }
                  }}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs shadow-md hover:shadow-lg hover:bg-indigo-200 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer min-h-[32px] min-w-[60px]"
                >
                  <IconEye size={12} className="inline mr-1" /> Preview
                </button>
                <button
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    if (!isExpanded) {
                      setShowPreview(false);
                    }
                  }}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs shadow-md hover:shadow-lg hover:bg-indigo-200 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer min-h-[32px] min-w-[60px]"
                >
                  <IconWrench size={12} className="inline mr-1" /> Config
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">
                  Node Name
                </label>
                <input
                  type="text"
                  value={formData.label || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 font-['Oswald'] hover:border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">
                  Method
                </label>
                <CustomSelect
                  value={formData.method || "GET"}
                  onChange={(value) =>
                    setFormData({ ...formData, method: value })
                  }
                  options={[
                    { value: "GET", label: "GET" },
                    { value: "POST", label: "POST" },
                    { value: "PUT", label: "PUT" },
                    { value: "DELETE", label: "DELETE" },
                    { value: "PATCH", label: "PATCH" },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">
                  URL
                  <span className="text-gray-500 ml-1">
                    (Use {`{{input.field}}`} for parameters)
                  </span>
                </label>
                <ParameterInput
                  value={formData.url || ""}
                  onChange={(value) => setFormData({ ...formData, url: value })}
                  placeholder="https://api.example.com/users/{{input.params.userId}}"
                  inheritedData={data.inheritedData}
                  className="p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">
                  Headers (JSON)
                </label>
                <ParameterInput
                  value={headersText}
                  onChange={setHeadersText}
                  placeholder='{"Authorization": "Bearer {{input.response.token}}"}'
                  inheritedData={data.inheritedData}
                  className="p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent font-mono transition-all duration-200 hover:border-gray-400 text-gray-900"
                  multiline
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">
                  Body (JSON)
                </label>
                <ParameterInput
                  value={bodyText}
                  onChange={setBodyText}
                  placeholder='{"userId": "{{input.response.id}}", "data": "{{input.params.data}}"}'
                  inheritedData={data.inheritedData}
                  className="p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent font-mono transition-all duration-200 hover:border-gray-400 text-gray-900"
                  multiline
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <IconSave size={14} className="inline mr-1" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium shadow-md hover:shadow-lg hover:bg-gray-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <IconX size={14} className="inline mr-1" /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {showPreview &&
          ReactDOM.createPortal(
            <div
              className="fixed bg-white rounded-xl p-3 shadow-lg border border-gray-200 z-50 min-w-[250px] animate-in slide-in-from-top-2 duration-200"
              style={{
                top: `${previewPosition.top}px`,
                left: `${previewPosition.left}px`,
              }}
            >
              <div className="text-xs font-medium text-gray-800 mb-2">
                Response Preview:
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                <pre className="text-xs bg-gray-50 p-2 rounded-lg text-gray-900 font-mono whitespace-pre-wrap">
                  {JSON.stringify(
                    data.response || { status: "pending" },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);
ApiNode.displayName = "ApiNode";

const TransformNode = React.forwardRef<HTMLDivElement, NodeProps>(
  ({ data, selected, id }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState(data);
    const { addToast } = useToast();

    useEffect(() => {
      setFormData(data);
    }, [data]);

    const handleDelete = () => {
      if (data.onDelete) {
        data.onDelete(id);
        addToast({
          title: "Node Deleted",
          description: `${data.label} has been removed from the workflow`,
          type: "info",
        });
      }
    };

    const handleSave = () => {
      if (data.onUpdate) {
        data.onUpdate(id, formData);
        addToast({
          title: "Configuration Saved",
          description: `${formData.label} settings have been updated`,
          type: "success",
        });
      }
      setIsExpanded(false);
    };

    const handleCancel = () => {
      setFormData(data);
      setIsExpanded(false);
    };

    return (
      <div
        ref={ref}
        className={`
        relative bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-4 
        shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] 
        border-2 transition-all duration-300 
        hover:shadow-[12px_12px_20px_rgba(0,0,0,0.12),-12px_-12px_20px_rgba(255,255,255,0.9)] font-['Oswald']
        ${
          selected
            ? "border-teal-400 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] scale-105"
            : "border-teal-200 hover:scale-102"
        }
        ${isExpanded ? "min-w-[80vw] md:min-w-[500px]" : "min-w-[200px]"}
      `}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-teal-400 border-2 border-white transition-all duration-300 hover:scale-125"
        />

        <div className="absolute -top-2 -right-2 z-10">
          <Dropdown
            trigger={
              <button className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center shadow-md hover:bg-teal-500 hover:shadow-lg transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer min-w-[32px] min-h-[32px]">
                <IconChevronRight size={14} className="rotate-90" />
              </button>
            }
          >
            <DropdownItem onClick={handleDelete} variant="danger">
              <IconX size={14} className="text-white" />
              Delete
            </DropdownItem>
          </Dropdown>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <IconRefreshCw
              className="text-white transition-transform duration-300 group-hover:scale-110"
              size={16}
            />
          </div>
          <span className="font-semibold text-teal-900">{data.label}</span>
          {data.inheritedData && (
            <Badge
              variant="secondary"
              className="text-xs bg-teal-100 text-teal-700 animate-pulse"
            >
              <IconDatabase size={10} className="mr-1" /> Connected
            </Badge>
          )}
        </div>

        {!isExpanded ? (
          <>
            <div className="text-xs text-gray-700 mb-2">
              <div className="truncate">
                Transform: {data.transform || "data.map(x => x.value)"}
              </div>
              {data.language && <div>Language: {data.language}</div>}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-1 bg-teal-100 text-teal-700 rounded-lg text-xs shadow-md hover:shadow-lg hover:bg-teal-200 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer min-h-[32px] min-w-[60px]"
              >
                <IconWrench size={12} className="inline mr-1" /> Config
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                Node Name
              </label>
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 font-['Oswald'] hover:border-gray-400 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                Language
              </label>
              <CustomSelect
                value={formData.language || "javascript"}
                onChange={(value) =>
                  setFormData({ ...formData, language: value })
                }
                options={[
                  { value: "javascript", label: "JavaScript" },
                  { value: "python", label: "Python" },
                  { value: "jq", label: "jq" },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                Transform Code
                <span className="text-gray-500 ml-1">
                  (Access input data with input.response, input.params)
                </span>
              </label>
              <ParameterInput
                value={formData.transform || ""}
                onChange={(value) =>
                  setFormData({ ...formData, transform: value })
                }
                placeholder="// Transform the input data
input.response.data.map(item => ({
  id: item.id,
  name: item.name.toUpperCase(),
  processed: true
}))"
                inheritedData={data.inheritedData}
                className="p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent font-mono transition-all duration-200 hover:border-gray-400 text-gray-900"
                multiline
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-2 bg-teal-600 text-white rounded-lg text-xs font-medium shadow-md hover:shadow-lg hover:bg-teal-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <IconSave size={14} className="inline mr-1" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium shadow-md hover:shadow-lg hover:bg-gray-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <IconX size={14} className="inline mr-1" /> Cancel
              </button>
            </div>
          </div>
        )}

        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-teal-400 border-2 border-white transition-all duration-300 hover:scale-125"
        />
      </div>
    );
  }
);
TransformNode.displayName = "TransformNode";

const DatabaseNode = React.forwardRef<HTMLDivElement, NodeProps>(
  ({ data, selected, id }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState(data);
    const { addToast } = useToast();

    useEffect(() => {
      setFormData(data);
    }, [data]);

    const handleDelete = () => {
      if (data.onDelete) {
        data.onDelete(id);
        addToast({
          title: "Node Deleted",
          description: `${data.label} has been removed from the workflow`,
          type: "info",
        });
      }
    };

    const handleSave = () => {
      if (data.onUpdate) {
        data.onUpdate(id, formData);
        addToast({
          title: "Configuration Saved",
          description: `${formData.label} settings have been updated`,
          type: "success",
        });
      }
      setIsExpanded(false);
    };

    const handleCancel = () => {
      setFormData(data);
      setIsExpanded(false);
    };

    return (
      <div
        ref={ref}
        className={`
        relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 
        shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] 
        border-2 transition-all duration-300 
        hover:shadow-[12px_12px_20px_rgba(0,0,0,0.12),-12px_-12px_20px_rgba(255,255,255,0.9)] font-['Oswald']
        ${
          selected
            ? "border-purple-400 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] scale-105"
            : "border-purple-200 hover:scale-102"
        }
        ${isExpanded ? "min-w-[80vw] md:min-w-[500px]" : "min-w-[200px]"}
      `}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-purple-400 border-2 border-white transition-all duration-300 hover:scale-125"
        />

        <div className="absolute -top-2 -right-2 z-10">
          <Dropdown
            trigger={
              <button className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center shadow-md hover:bg-purple-500 hover:shadow-lg transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer min-w-[32px] min-h-[32px]">
                <IconChevronRight size={14} className="rotate-90" />
              </button>
            }
          >
            <DropdownItem onClick={handleDelete} variant="danger">
              <IconX size={14} className="text-white" />
              Delete
            </DropdownItem>
          </Dropdown>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <IconDatabase
              className="text-white transition-transform duration-300 group-hover:scale-110"
              size={16}
            />
          </div>
          <span className="font-semibold text-purple-900">{data.label}</span>
          {data.inheritedData && (
            <Badge
              variant="secondary"
              className="text-xs bg-purple-100 text-purple-700 animate-pulse"
            >
              <IconDatabase size={10} className="mr-1" /> Connected
            </Badge>
          )}
        </div>

        {!isExpanded ? (
          <>
            <div className="text-xs text-gray-700 mb-2">
              <div>Operation: {data.operation || "INSERT"}</div>
              {data.table && <div>Table: {data.table}</div>}
              {data.query && (
                <div className="truncate">
                  Query: {data.query.substring(0, 30)}...
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs shadow-md hover:shadow-lg hover:bg-purple-200 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer min-h-[32px] min-w-[60px]"
              >
                <IconWrench size={12} className="inline mr-1" /> Config
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                Node Name
              </label>
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 font-['Oswald'] hover:border-gray-400 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                Operation
              </label>
              <CustomSelect
                value={formData.operation || "INSERT"}
                onChange={(value) =>
                  setFormData({ ...formData, operation: value })
                }
                options={[
                  { value: "INSERT", label: "INSERT" },
                  { value: "UPDATE", label: "UPDATE" },
                  { value: "DELETE", label: "DELETE" },
                  { value: "SELECT", label: "SELECT" },
                ]}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                Table
              </label>
              <ParameterInput
                value={formData.table || ""}
                onChange={(value) => setFormData({ ...formData, table: value })}
                placeholder="users_{{input.params.environment}}"
                inheritedData={data.inheritedData}
                className="p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                SQL Query
                <span className="text-gray-500 ml-1">
                  (Use {`{{input.field}}`} for parameters)
                </span>
              </label>
              <ParameterInput
                value={formData.query || ""}
                onChange={(value) => setFormData({ ...formData, query: value })}
                placeholder="INSERT INTO users (name, email, data) VALUES ('{{input.response.name}}', '{{input.response.email}}', '{{input.response.data}}')"
                inheritedData={data.inheritedData}
                className="p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent font-mono transition-all duration-200 hover:border-gray-400 text-gray-900"
                multiline
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-xs font-medium shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <IconSave size={14} className="inline mr-1" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium shadow-md hover:shadow-lg hover:bg-gray-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <IconX size={14} className="inline mr-1" /> Cancel
              </button>
            </div>
          </div>
        )}

        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-gray-400 border-2 border-white transition-all duration-300 hover:scale-125"
        />
      </div>
    );
  }
);
DatabaseNode.displayName = "DatabaseNode";

const nodeTypes = {
  apiNode: ApiNode,
  transformNode: TransformNode,
  databaseNode: DatabaseNode,
};

const Timeline: React.FC<{
  history: ExecutionHistory[];
  expandedItems: Set<string>;
  onToggleExpanded: (id: string) => void;
}> = React.memo(({ history, expandedItems, onToggleExpanded }) => {
  console.log("Timeline rendering with history:", history.length);

  return (
    <div className="space-y-4">
      {history.map((execution, index) => (
        <div
          key={execution.id}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => onToggleExpanded(execution.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  execution.status === "success"
                    ? "bg-emerald-500"
                    : "bg-rose-500"
                }`}
              />
              <span className="font-medium text-gray-800">
                Execution #{history.length - index}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(execution.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {execution.duration}ms
              </span>
              <span
                className={`text-gray-400 text-sm transition-transform duration-200 ${
                  expandedItems.has(execution.id) ? "rotate-90" : ""
                }`}
              >
                <IconChevronRight size={14} />
              </span>
            </div>
          </div>

          {expandedItems.has(execution.id) && (
            <div className="mt-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
              {execution.steps.map((step, stepIndex) => (
                <div
                  key={step.id}
                  className="flex items-center gap-3 p-3 bg-gray-50/50 backdrop-blur-sm rounded-lg hover:bg-gray-100/50 transition-colors duration-200 hover:shadow-sm border border-gray-100"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      step.status === "success"
                        ? "bg-emerald-500"
                        : step.status === "error"
                        ? "bg-rose-500"
                        : step.status === "running"
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {step.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 ml-auto">
                    {step.type}
                  </span>
                  {step.input && (
                    <span className="text-xs text-gray-600 bg-gray-100 p-1 rounded">
                      <IconDatabase size={10} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

Timeline.displayName = "Timeline";

const Tooltip: React.FC<{
  children: React.ReactNode;
  content: string;
}> = ({ children, content }) => {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(true);
    }, 500); // Show after 0.5 seconds
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShow(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50">
          {content}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45" />
        </div>
      )}
    </div>
  );
};

const FloatingActionButton: React.FC<{
  onAddNode: (type: string) => void;
  onShowResult: () => void;
  isNewResultAvailable: boolean;
}> = ({ onAddNode, onShowResult, isNewResultAvailable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Element)
      ) {
        setIsOpen(false);
      }
      if (
        showGuide &&
        guideRef.current &&
        !guideRef.current.contains(event.target as Element)
      ) {
        setShowGuide(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showGuide]);

  return (
    <>
      <div
        ref={buttonRef}
        className="fixed right-4 bottom-16 z-50 flex flex-row items-center gap-2"
      >
        <div
          className={`flex flex-row gap-2 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          <Tooltip content="API Request Node (Input) - Start your workflow with an API call">
            <button
              onClick={() => onAddNode("api")}
              className="w-12 h-12 bg-indigo-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-600 transition-all duration-200 hover:scale-110 cursor-pointer relative"
            >
              <IconGlobe size={20} />
            </button>
          </Tooltip>
          <Tooltip content="Transform Node (Process) - Transform data between nodes">
            <button
              onClick={() => onAddNode("transform")}
              className="w-12 h-12 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-teal-600 transition-all duration-200 hover:scale-110 cursor-pointer relative"
            >
              <IconRefreshCw size={20} />
            </button>
          </Tooltip>
          <Tooltip content="Database Node (Output) - Store or retrieve data">
            <button
              onClick={() => onAddNode("database")}
              className="w-12 h-12 bg-purple-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-purple-600 transition-all duration-200 hover:scale-110 cursor-pointer relative"
            >
              <IconDatabase size={20} />
              {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" /> */}
            </button>
          </Tooltip>
        </div>
        <Tooltip content="Add Node">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 bg-indigo-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-600 transition-all duration-200 hover:scale-110 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </Tooltip>
        <Tooltip content="User Guide">
          <button
            onClick={() => setShowGuide(true)}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all duration-200 hover:scale-110 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
        </Tooltip>
        <Tooltip content="Last Result">
          <button
            onClick={onShowResult}
            className={`relative w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all duration-200 hover:scale-110 cursor-pointer`}
          >
            <IconClipboard size={20} />
            {isNewResultAvailable && (
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
            )}
          </button>
        </Tooltip>
      </div>

      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            ref={guideRef}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-indigo-900">
                API Workflow Designer Guide
              </h2>
              <button
                onClick={() => setShowGuide(false)}
                className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors duration-200 cursor-pointer"
              >
                <IconX size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  What is API Workflow Designer?
                </h3>
                <p className="text-gray-700">
                  API Workflow Designer is a visual tool that helps you create
                  and manage API workflows. You can connect different types of
                  nodes to create complex data processing pipelines.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  Node Types and Data Flow
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconGlobe className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-900">
                        API Request Node (Input)
                      </h4>
                      <p className="text-gray-700">
                        Start your workflow by making HTTP requests to external
                        APIs. This node has an output connection point at the
                        bottom to send data to other nodes. Configure methods,
                        URLs, headers, and request bodies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconRefreshCw className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-900">
                        Transform Node (Process)
                      </h4>
                      <p className="text-gray-700">
                        Process data between nodes. This node has connection
                        points at both top (input) and bottom (output).
                        Transform and manipulate data using JavaScript
                        expressions. Map, filter, or modify data structures.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconDatabase className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-900">
                        Database Node (Output)
                      </h4>
                      <p className="text-gray-700">
                        End your workflow by storing or retrieving data. This
                        node has an input connection point at the top to receive
                        data from other nodes. Perform operations like insert,
                        update, delete, or query data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  How to Use
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Click the + button to add nodes to your workflow</li>
                  <li>
                    Connect nodes by dragging from one node's output handle
                    (bottom) to another node's input handle (top)
                  </li>
                  <li>Configure each node by clicking the Config button</li>
                  <li>Run your workflow to test the connections</li>
                  <li>View execution history in the Timeline tab</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  Data Flow Tips
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Always start with an API Request Node to fetch data</li>
                  <li>
                    Use Transform Nodes to process data between API and Database
                    nodes
                  </li>
                  <li>
                    End your workflow with a Database Node to store the results
                  </li>
                  <li>
                    Data flows from top to bottom through the connection points
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const WorkflowStats: React.FC<{
  nodes: Node[];
  edges: Edge[];
  executionHistory: ExecutionHistory[];
}> = ({ nodes, edges, executionHistory }) => {
  const totalNodes = nodes.length;
  const totalConnections = edges.length;
  const successRate =
    executionHistory.length > 0
      ? (
          (executionHistory.filter((h) => h.status === "success").length /
            executionHistory.length) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-indigo-100 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-14">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-sm font-medium text-indigo-900">
                {totalNodes} Nodes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-sm font-medium text-teal-900">
                {totalConnections} Connections
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm font-medium text-purple-900">
                {successRate}% Success Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  execution: ExecutionHistory | null;
}> = ({ isOpen, onClose, execution }) => {
  if (!isOpen || !execution) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-900">
            Workflow Execution Result
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors duration-200 cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-700 p-3 bg-gray-50 rounded-lg">
            <span>
              Status:{" "}
              {execution.status === "success" ? (
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                  Success
                </span>
              ) : (
                <span className="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-800">
                  Error
                </span>
              )}
            </span>
            <span>
              Duration:{" "}
              <span className="font-semibold">{execution.duration}ms</span>
            </span>
            <span>
              Timestamp:{" "}
              <span className="font-semibold">
                {new Date(execution.timestamp).toLocaleString()}
              </span>
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-indigo-800">
              Execution Steps
            </h3>
            {execution.steps.map((step) => (
              <div
                key={step.id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <h4 className="font-semibold text-indigo-900">
                  {step.name}{" "}
                  <span className="text-xs font-normal text-gray-500">
                    ({step.type})
                  </span>
                </h4>
                <div className="mt-2">
                  <h5 className="text-sm font-medium text-gray-700">
                    Response:
                  </h5>
                  <pre className="text-xs bg-gray-50 p-2 rounded-md mt-1 overflow-auto max-h-60 text-gray-900 font-mono">
                    {JSON.stringify(step.response, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApiWorkflowDesigner: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<"workflow" | "timeline">(
    "workflow"
  );
  const [executionHistory, setExecutionHistory] = useState<ExecutionHistory[]>(
    []
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [latestExecution, setLatestExecution] =
    useState<ExecutionHistory | null>(null);
  const [isNewResultAvailable, setIsNewResultAvailable] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();
  const [globalConfig, setGlobalConfig] = useState<number>(0);

  const handleToggleExpanded = useCallback((id: string) => {
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  }, []);

  const handleShowResult = () => {
    if (latestExecution) {
      setIsResultModalOpen(true);
      setIsNewResultAvailable(false);
    } else {
      addToast({
        title: "No Result Available",
        description: "Run a workflow to see the result.",
        type: "info",
      });
    }
  };

  // Add effect to track execution history changes
  useEffect(() => {
    console.log("Execution history changed:", executionHistory.length);
  }, [executionHistory]);

  // Add effect to track active view changes
  useEffect(() => {
    console.log("Active view changed:", activeView);
  }, [activeView]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !reactFlowWrapper.current) return;

    const wrapper = reactFlowWrapper.current;
    let lastTouchEnd = 0;
    let touchStartTime = 0;
    let touchStartPosition = { x: 0, y: 0 };
    const DOUBLE_TAP_DELAY = 200;
    const TOUCH_MOVE_THRESHOLD = 10;

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      const timeSinceStart = now - touchStartTime;

      // Only prevent default for actual double-taps (not just rapid single taps)
      if (now - lastTouchEnd <= DOUBLE_TAP_DELAY && timeSinceStart < 200) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartTime = Date.now();
      if (e.touches.length === 1) {
        touchStartPosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }

      // Only stop propagation for multi-touch gestures
      if (e.touches.length > 1) {
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Only prevent default for multi-touch gestures or significant movement
      if (e.touches.length > 1) {
        e.preventDefault();
        return;
      }

      // Check if touch has moved significantly (indicating a drag/pan gesture)
      if (e.touches.length === 1) {
        const currentPosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        const distance = Math.sqrt(
          Math.pow(currentPosition.x - touchStartPosition.x, 2) +
            Math.pow(currentPosition.y - touchStartPosition.y, 2)
        );

        // If significant movement detected, allow it (this is likely a pan gesture)
        if (distance > TOUCH_MOVE_THRESHOLD) {
          // Don't prevent default - let ReactFlow handle the pan
          return;
        }
      }
    };

    wrapper.addEventListener("touchend", handleTouchEnd, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      wrapper.removeEventListener("touchend", handleTouchEnd);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMobile]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge(params, eds));
      addToast({
        title: "Connection Created",
        description: "Nodes have been connected successfully",
        type: "success",
      });
    },
    [setEdges, addToast]
  );

  const handleNodeDelete = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  const handleNodeUpdate = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...newData,
                  onDelete: handleNodeDelete,
                  onUpdate: handleNodeUpdate,
                  onDuplicate: handleNodeDuplicate,
                },
              }
            : node
        )
      );
    },
    [setNodes, handleNodeDelete]
  );

  const handleNodeDuplicate = useCallback(
    (nodeId: string) => {
      const nodeToDuplicate = nodes.find((node) => node.id === nodeId);
      if (!nodeToDuplicate) return;

      const newNode: Node = {
        ...nodeToDuplicate,
        id: `${nodeToDuplicate.type?.replace("Node", "")}-${Date.now()}`,
        position: {
          x: nodeToDuplicate.position.x + 50,
          y: nodeToDuplicate.position.y + 50,
        },
        data: {
          ...nodeToDuplicate.data,
          label: `${nodeToDuplicate.data.label} (Copy)`,
          onDelete: handleNodeDelete,
          onUpdate: handleNodeUpdate,
          onDuplicate: handleNodeDuplicate,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, handleNodeDelete, handleNodeUpdate]
  );

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: `${type}Node`,
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        method: type === "api" ? "GET" : undefined,
        url: type === "api" ? "https://api.example.com/data" : undefined,
        transform: type === "transform" ? "data.map(x => x.value)" : undefined,
        operation: type === "database" ? "INSERT" : undefined,
        onDelete: handleNodeDelete,
        onUpdate: handleNodeUpdate,
        onDuplicate: handleNodeDuplicate,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    addToast({
      title: "Node Added",
      description: `New ${type} node has been added to the workflow`,
      type: "success",
    });
    // Close sidebar in mobile view after adding node
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const getNodeInput = (nodeId: string, executionResults: Map<string, any>) => {
    const inputEdges = edges.filter((edge) => edge.target === nodeId);
    if (inputEdges.length === 0) return null;
    const sourceNodeId = inputEdges[0].source;
    const sourceNode = nodes.find((n) => n.id === sourceNodeId);
    const executionResult = executionResults.get(sourceNodeId);

    return executionResult
      ? {
          response: executionResult,
          params: sourceNode?.data || null,
          nodeId: sourceNodeId,
          nodeType: sourceNode?.type?.replace("Node", "") || "unknown",
        }
      : null;
  };

  const runWorkflow = async () => {
    if (isRunning) return;

    // Validate node connections
    const validationErrors: string[] = [];
    const helpfulTips: string[] = [];

    // First check if we have any nodes at all
    if (nodes.length === 0) {
      addToast({
        title: "Workflow Error",
        description:
          "Start by adding nodes to your workflow using the sidebar or + button.",
        type: "error",
      });
      return;
    }

    // Check if we have any connections at all
    if (edges.length === 0) {
      // Check what types of nodes we have to provide relevant advice
      const nodeTypes = nodes.map((node) => node.type);
      let helpfulMessage =
        "Connect your nodes by dragging from one node's output (bottom) to another node's input (top).";

      if (
        nodeTypes.includes("transformNode") &&
        nodeTypes.includes("apiNode")
      ) {
        helpfulMessage +=
          " Try connecting an API node to a Transform node to process the API response.";
      } else if (
        nodeTypes.includes("databaseNode") &&
        nodeTypes.includes("apiNode")
      ) {
        helpfulMessage +=
          " Try connecting an API node to a Database node to store the API data.";
      }

      addToast({
        title: "No Connections Found",
        description: helpfulMessage,
        type: "error",
      });
      return;
    }

    // Count nodes of each type
    const nodeTypeCounts = {
      api: nodes.filter((n) => n.type === "apiNode").length,
      transform: nodes.filter((n) => n.type === "transformNode").length,
      database: nodes.filter((n) => n.type === "databaseNode").length,
    };

    // Validate Transform and Database nodes have input connections
    nodes.forEach((node) => {
      if (node.type === "transformNode" || node.type === "databaseNode") {
        const inputEdges = edges.filter((edge) => edge.target === node.id);
        if (inputEdges.length === 0) {
          const nodeType =
            node.type === "transformNode" ? "Transform" : "Database";
          validationErrors.push(
            `${nodeType} node "${node.data.label}" has no input connection`
          );

          // Add specific guidance based on node type
          if (node.type === "transformNode") {
            if (nodeTypeCounts.api > 0) {
              helpfulTips.push(
                `Connect an API node to the Transform node "${node.data.label}" to process its data`
              );
            } else {
              helpfulTips.push(
                `Add an API node and connect it to the Transform node "${node.data.label}"`
              );
            }
          } else if (node.type === "databaseNode") {
            if (nodeTypeCounts.transform > 0) {
              helpfulTips.push(
                `Connect a Transform node to the Database node "${node.data.label}"`
              );
            } else if (nodeTypeCounts.api > 0) {
              helpfulTips.push(
                `Connect an API node to the Database node "${node.data.label}" to store its data`
              );
            } else {
              helpfulTips.push(
                `Add an API or Transform node and connect it to the Database node "${node.data.label}"`
              );
            }
          }
        }
      }
    });

    // Check for circular dependencies
    const visited = new Set<string>();
    const temp = new Set<string>();

    const hasCycle = (nodeId: string): boolean => {
      if (temp.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;

      temp.add(nodeId);

      const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
      for (const edge of outgoingEdges) {
        if (hasCycle(edge.target)) return true;
      }

      temp.delete(nodeId);
      visited.add(nodeId);
      return false;
    };

    // Check each node for cycles
    for (const node of nodes) {
      if (hasCycle(node.id)) {
        validationErrors.push("Circular connections detected");
        helpfulTips.push(
          "Remove any circular connections where data flows back to a previous node. Workflows must flow in one direction."
        );
        break;
      }
    }

    if (validationErrors.length > 0) {
      addToast({
        title: "Workflow Validation Failed",
        description:
          validationErrors.join(". ") +
          "\n\nHow to fix:\n" +
          helpfulTips.join("\n"),
        type: "error",
      });
      return;
    }

    setIsRunning(true);
    if (isMobile) {
      setSidebarOpen(false);
    }

    const startTime = Date.now();
    const executionResults = new Map<string, any>();
    const steps: WorkflowStep[] = [];

    const sortedNodes = [...nodes].sort((a, b) => {
      const aHasInput = edges.some((edge) => edge.target === a.id);
      const bHasInput = edges.some((edge) => edge.target === b.id);
      if (!aHasInput && bHasInput) return -1;
      if (aHasInput && !bHasInput) return 1;
      return 0;
    });

    // Validate that we have at least one node
    if (sortedNodes.length === 0) {
      addToast({
        title: "Workflow Error",
        description: "No nodes found in the workflow",
        type: "error",
      });
      setIsRunning(false);
      return;
    }

    // Validate that we have at least one edge
    if (edges.length === 0) {
      addToast({
        title: "Workflow Error",
        description: "No connections found in the workflow",
        type: "error",
      });
      setIsRunning(false);
      return;
    }

    for (const node of sortedNodes) {
      const stepIndex = steps.length;
      steps.push({
        id: node.id,
        type: node.type?.replace("Node", "") as "api" | "transform" | "filter",
        name: node.data.label,
        config: node.data,
        status: "running",
        input: null,
      });

      const inputData = getNodeInput(node.id, executionResults);
      steps[stepIndex].input = inputData;

      await new Promise((resolve) => setTimeout(resolve, 500)); // Shorter delay
      const resolvedConfig = inputData
        ? resolveTemplateObject(node.data, inputData)
        : node.data;

      const success = node.type === "apiNode" || inputData !== null;
      steps[stepIndex].status = success ? "success" : "error";
      steps[stepIndex].timestamp = Date.now();

      let response: any = null;
      if (success) {
        if (node.type === "apiNode") {
          response = {
            status: 200,
            data: inputData
              ? { ...inputData, apiResult: "processed" }
              : {
                  users: [
                    { id: 1, name: "John", email: "john@example.com" },
                    { id: 2, name: "Jane", email: "jane@example.com" },
                  ],
                },
            timestamp: steps[stepIndex].timestamp,
            resolvedUrl: resolvedConfig.url,
          };
        } else if (node.type === "transformNode") {
          let transformedData;
          if (inputData) {
            if (Array.isArray(inputData.response?.data)) {
              transformedData = inputData.response.data.map((item: any) => ({
                ...item,
                transformed: true,
              }));
            } else if (inputData.response?.data) {
              transformedData = {
                ...inputData.response.data,
                transformed: true,
              };
            } else {
              transformedData = { ...inputData, transformed: true };
            }
          } else {
            transformedData = { processed: true };
          }

          response = {
            transformedData,
            timestamp: steps[stepIndex].timestamp,
            resolvedTransform: resolvedConfig.transform,
          };
        } else if (node.type === "databaseNode") {
          response = {
            rowsAffected: inputData
              ? Array.isArray(inputData.response?.data)
                ? inputData.response.data.length
                : 1
              : 1,
            insertId: Math.floor(Math.random() * 1000),
            timestamp: steps[stepIndex].timestamp,
            resolvedQuery: resolvedConfig.query,
            resolvedTable: resolvedConfig.table,
          };
        }
      } else {
        response = {
          error: "Execution failed - No valid input data",
          timestamp: steps[stepIndex].timestamp,
        };
      }

      steps[stepIndex].response = response;
      if (response) {
        executionResults.set(node.id, response);
      }

      // Correctly update node state to trigger re-render
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? {
                ...n,
                data: {
                  ...n.data,
                  response: response,
                  inheritedData: inputData,
                },
              }
            : n
        )
      );
    }

    const execution: ExecutionHistory = {
      id: `exec-${Date.now()}`,
      timestamp: Date.now(),
      steps,
      duration: Date.now() - startTime,
      status: steps.every((s) => s.status === "success") ? "success" : "error",
    };

    setExecutionHistory((prev) => [execution, ...prev].slice(0, 10));
    setLatestExecution(execution);
    setIsNewResultAvailable(true);
    setIsRunning(false);

    addToast({
      title:
        execution.status === "success"
          ? "Workflow Completed"
          : "Workflow Failed",
      description: `Execution finished in ${execution.duration}ms`,
      type: execution.status === "success" ? "success" : "error",
    });
  };

  const Sidebar = () => (
    <div
      className={`${
        isMobile
          ? `fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`
          : "w-80"
      } bg-gradient-to-b from-indigo-50 via-purple-50 to-teal-50 border-r border-indigo-100 flex flex-col font-['Oswald']`}
    >
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-indigo-100">
          <h2 className="text-lg font-semibold text-indigo-900">
            Workflow Designer
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg bg-rose-100 shadow-md text-rose-600 font-bold hover:bg-rose-200 transition-colors duration-200"
          >
            <IconX size={16} />
          </button>
        </div>
      )}

      <div className="p-4 border-b border-indigo-100">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveView("workflow")}
            className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeView === "workflow"
                ? "bg-teal-200 text-teal-900 shadow-inner"
                : "bg-teal-50 text-teal-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            <IconWrench size={14} className="inline mr-1" /> Workflow
          </button>
          <button
            onClick={() => setActiveView("timeline")}
            className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeView === "timeline"
                ? "bg-purple-200 text-purple-900 shadow-inner"
                : "bg-purple-50 text-purple-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            <IconClock size={14} className="inline mr-1" /> Timeline
          </button>
        </div>

        {activeView === "workflow" && (
          <div className="space-y-3">
            <h3 className="font-semibold text-indigo-900 mb-3">Add Nodes</h3>
            <button
              onClick={() => addNode("api")}
              className="w-full flex items-center gap-3 p-3 bg-indigo-100 rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-200 transition-all duration-300 text-left hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                <IconGlobe className="text-white" size={16} />
              </div>
              <span className="text-indigo-900 font-medium">API Request</span>
            </button>
            <button
              onClick={() => addNode("transform")}
              className="w-full flex items-center gap-3 p-3 bg-teal-100 rounded-xl shadow-md hover:shadow-lg hover:bg-teal-200 transition-all duration-300 text-left hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-md">
                <IconRefreshCw className="text-white" size={16} />
              </div>
              <span className="text-teal-900 font-medium">Transform Data</span>
            </button>
            <button
              onClick={() => addNode("database")}
              className="w-full flex items-center gap-3 p-3 bg-purple-100 rounded-xl shadow-md hover:shadow-lg hover:bg-purple-200 transition-all duration-300 text-left hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                <IconDatabase className="text-white" size={16} />
              </div>
              <span className="text-purple-900 font-medium">Database</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {activeView === "workflow" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-900 mb-2">
                Workflow Controls
              </h4>
              <button
                onClick={runWorkflow}
                disabled={isRunning || nodes.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  isRunning || nodes.length === 0
                    ? "bg-rose-100 text-rose-400 cursor-not-allowed"
                    : "bg-teal-600 text-white shadow-md hover:shadow-lg hover:bg-teal-700 cursor-pointer"
                }`}
              >
                {isRunning ? (
                  <>
                    <span className="animate-spin">
                      <IconRefreshCw size={16} />
                    </span>
                    Running...
                  </>
                ) : (
                  <>
                    <IconPlay size={16} />
                    Run Workflow
                  </>
                )}
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                <IconBarChart size={16} />
                Workflow Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-indigo-700">
                  <IconDatabase size={12} />
                  Nodes: {nodes.length}
                </div>
                <div className="flex items-center gap-2 text-teal-700">
                  <IconRefreshCw size={12} />
                  Connections: {edges.length}
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <IconClock size={12} />
                  Executions: {executionHistory.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === "timeline" && (
          <div>
            <h3 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
              <IconClock size={18} />
              Execution History
            </h3>
            {executionHistory.length > 0 ? (
              <Timeline
                history={executionHistory}
                expandedItems={expandedItems}
                onToggleExpanded={handleToggleExpanded}
              />
            ) : (
              <div className="text-center text-purple-500 py-8">
                No executions yet. Run a workflow to see history.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50"
      style={{ fontFamily: "Oswald, sans-serif" }}
    >
      <div className="h-16 w-full bg-white border-b border-indigo-100 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-teal-100 shadow-md text-teal-700 font-bold hover:bg-teal-200 transition-colors duration-200 hover:scale-105"
            >
              <IconMenu size={16} />
            </button>
          )}

          <h1
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-bold text-indigo-900 flex items-center gap-2`}
          >
            <IconWrench size={20} />
            {isMobile ? "Workflow" : "API Workflow Designer"}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={runWorkflow}
            disabled={isRunning || nodes.length === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              isRunning || nodes.length === 0
                ? "bg-rose-100 text-rose-400 cursor-not-allowed"
                : "bg-teal-600 text-white shadow-md hover:shadow-lg hover:bg-teal-700 cursor-pointer"
            }`}
          >
            {isRunning ? (
              <>
                <span className="animate-spin">
                  <IconRefreshCw size={16} />
                </span>
                Running...
              </>
            ) : (
              <>
                <IconPlay size={16} />
                Run Workflow
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <div
            className={`flex-1 relative ${isMobile ? "" : ""}`}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2, minZoom: 0.5, maxZoom: 1 }}
              className="!bg-transparent"
              panOnScroll={false}
              panOnDrag={true}
              zoomOnScroll={false}
              zoomOnPinch={true}
              zoomOnDoubleClick={false}
              minZoom={0.1}
              maxZoom={2}
              zoomActivationKeyCode={null}
              panActivationKeyCode={null}
              selectionKeyCode={null}
              multiSelectionKeyCode={null}
              deleteKeyCode={null}
              onPaneClick={() => {
                if (isMobile) {
                  setSidebarOpen(false);
                }
              }}
              onNodeClick={(event, node) => {
                // Ensure node clicks work properly on mobile
                if (isMobile) {
                  event.stopPropagation();
                }
              }}
            >
              <Controls
                className={`bg-white shadow-lg rounded-xl border border-gray-200 ${
                  isMobile
                    ? "fixed bottom-40 left-4 z-50 !static-none !w-auto !transform-none"
                    : "!bottom-16"
                }`}
              />
            </ReactFlow>
          </div>
        </div>
      </div>

      <WorkflowStats
        nodes={nodes}
        edges={edges}
        executionHistory={executionHistory}
      />
      <FloatingActionButton
        onAddNode={addNode}
        onShowResult={handleShowResult}
        isNewResultAvailable={isNewResultAvailable}
      />
      <ResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        execution={latestExecution}
      />

      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default function Component() {
  return (
    <ReactFlowProvider>
      <ToastProvider>
        <div className="w-full h-screen">
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <ApiWorkflowDesigner />
          <ToastContainer />
          <style jsx global>{`
            .react-flow__node {
              background: none !important;
              border: none !important;
              box-shadow: none !important;
            }

            .react-flow__pane {
              background-color: #ffffff;
              background-image: linear-gradient(
                  rgba(0, 0, 0, 0.05) 1px,
                  transparent 1px
                ),
                linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
              background-size: 20px 20px;
            }

            @media (max-width: 768px) {
              .react-flow__panel {
                margin-bottom: 70px;
              }

              .react-flow__node {
                touch-action: manipulation;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }

              .react-flow__pane {
                touch-action: pan-x pan-y;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }

              button,
              input,
              textarea,
              select {
                touch-action: manipulation;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }

              button {
                min-height: 44px;
                min-width: 44px;
              }
            }
          `}</style>
        </div>
      </ToastProvider>
    </ReactFlowProvider>
  );
}
