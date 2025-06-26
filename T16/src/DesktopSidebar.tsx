"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineProject,
  AiOutlineTeam,
  AiOutlineFile,
  AiOutlineDatabase,
  AiOutlineCloud,
  AiOutlineBarChart,
  AiOutlineCode,
  AiOutlineUser,
  AiOutlineKey,
  AiOutlineApi,
  AiOutlineLayout,
  AiOutlineAppstore,
  AiOutlineDashboard,
  AiOutlineControl,
  AiOutlineNodeIndex,
  AiOutlineCluster,
  AiOutlineCloudSync,
  AiOutlineClose,
  AiOutlineDrag,
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineBranches,
} from "react-icons/ai";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: string;
  keywords: string[];
  shortcut?: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: MenuItem[];
  order: number;
}

const DesktopSidebar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <AiOutlineDashboard />,
      color: "from-blue-500 to-blue-600",
      order: 0,
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: <AiOutlineHome />,
          category: "dashboard",
          keywords: ["home", "overview", "main"],
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <AiOutlineBarChart />,
          category: "dashboard",
          keywords: ["analytics", "charts", "data"],
        },
        {
          id: "reports",
          label: "Reports",
          icon: <AiOutlineFile />,
          category: "dashboard",
          keywords: ["reports", "documents"],
        },
      ],
    },
    {
      id: "projects",
      label: "Projects",
      icon: <AiOutlineProject />,
      color: "from-green-500 to-green-600",
      order: 1,
      items: [
        {
          id: "active-projects",
          label: "Active Projects",
          icon: <AiOutlineAppstore />,
          category: "projects",
          keywords: ["active", "current"],
        },
        {
          id: "archived",
          label: "Archived",
          icon: <AiOutlineDatabase />,
          category: "projects",
          keywords: ["archived", "old"],
        },
      ],
    },
    {
      id: "development",
      label: "Development",
      icon: <AiOutlineCode />,
      color: "from-purple-500 to-purple-600",
      order: 2,
      items: [
        {
          id: "repositories",
          label: "Repositories",
          icon: <AiOutlineNodeIndex />,
          category: "development",
          keywords: ["repos", "git", "code"],
        },
        {
          id: "apis",
          label: "APIs",
          icon: <AiOutlineApi />,
          category: "development",
          keywords: ["api", "endpoints"],
        },
        {
          id: "deployments",
          label: "Deployments",
          icon: <AiOutlineCloudSync />,
          category: "development",
          keywords: ["deploy", "release"],
        },
      ],
    },
    {
      id: "team",
      label: "Team",
      icon: <AiOutlineTeam />,
      color: "from-orange-500 to-orange-600",
      order: 3,
      items: [
        {
          id: "members",
          label: "Members",
          icon: <AiOutlineUser />,
          category: "team",
          keywords: ["team", "members", "people"],
        },
        {
          id: "roles",
          label: "Roles",
          icon: <AiOutlineKey />,
          category: "team",
          keywords: ["roles", "authorization"],
        },
      ],
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      icon: <AiOutlineCloud />,
      color: "from-cyan-500 to-cyan-600",
      order: 4,
      items: [
        {
          id: "clusters",
          label: "Clusters",
          icon: <AiOutlineCluster />,
          category: "infrastructure",
          keywords: ["clusters", "groups"],
        },
        {
          id: "monitoring",
          label: "Monitoring",
          icon: <AiOutlineControl />,
          category: "infrastructure",
          keywords: ["monitoring", "health"],
        },
      ],
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>("dashboard");
  const [activeItem, setActiveItem] = useState<string>("overview");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [draggedCategory, setDraggedCategory] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Monthly Performance Report",
      type: "Analytics",
      date: "2024-01-15",
      status: "Ready",
    },
    {
      id: 2,
      name: "User Activity Summary",
      type: "User Data",
      date: "2024-01-14",
      status: "Ready",
    },
    {
      id: 3,
      name: "Security Audit Report",
      type: "Security",
      date: "2024-01-13",
      status: "Processing",
    },
    {
      id: 4,
      name: "Financial Summary Q4",
      type: "Financial",
      date: "2024-01-12",
      status: "Ready",
    },
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>(
    {}
  );

  const handleDownloadReport = (reportName: string) => {
    console.log(`Downloading ${reportName}...`);

    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,Report: ${reportName}\nGenerated on: ${new Date().toLocaleDateString()}`;
    link.download = `${reportName.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteReport = (reportId: number) => {
    setReports(reports.filter((report) => report.id !== reportId));
    console.log(`Report ${reportId} deleted successfully`);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const normalizeText = (text: string) => {
    return text
      .normalize("NFD") // Separa los caracteres base de los diacríticos (tildes, etc.)
      .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
      .toLowerCase(); // Convierte a minúsculas
  };

  const LineChart: React.FC<{
    data: number[];
    color: string;
    height?: number;
  }> = ({ data, color, height = 200 }) => {
    const maxValue = Math.max(...data);
    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (value / maxValue) * 80;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="w-full" style={{ height }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`gradient-${color}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            points={points}
          />
          <polygon
            fill={`url(#gradient-${color})`}
            points={`0,100 ${points} 100,100`}
          />
        </svg>
      </div>
    );
  };

  const ProgressRing: React.FC<{
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }> = ({ percentage, size = 80, strokeWidth = 8, color = "#3b82f6" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
        <span className="absolute text-lg font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    );
  };

  useEffect(() => {
    const savedOrder = localStorage.getItem("sidebar-category-order");
    if (savedOrder) {
      try {
        const orderMap = JSON.parse(savedOrder);
        setCategories((prev) =>
          prev
            .map((cat) => ({ ...cat, order: orderMap[cat.id] ?? cat.order }))
            .sort((a, b) => a.order - b.order)
        );
      } catch (e) {
        console.error("Failed to load category order:", e);
      }
    }
  }, []);

  const saveCategoryOrder = useCallback((newCategories: Category[]) => {
    const orderMap = newCategories.reduce((acc, cat, index) => {
      acc[cat.id] = index;
      return acc;
    }, {} as Record<string, number>);
    localStorage.setItem("sidebar-category-order", JSON.stringify(orderMap));
  }, []);

  const handleCategoryKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    categoryId: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const category = categories.find((c) => c.id === categoryId);
      if (category) {
        setActiveCategory(category.id);
        if (category.items.length > 0) {
          setActiveItem(category.items[0].id);
        }
      }
      return;
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const direction = e.key === "ArrowUp" ? -1 : 1;
      const sorted = [...categories].sort((a, b) => a.order - b.order);
      const fromIndex = sorted.findIndex((c) => c.id === categoryId);

      const toIndex = fromIndex + direction;

      if (toIndex >= 0 && toIndex < sorted.length) {
        const newCategories = [...sorted];
        const [movedItem] = newCategories.splice(fromIndex, 1);
        newCategories.splice(toIndex, 0, movedItem);

        const updatedOrder = newCategories.map((cat, index) => ({
          ...cat,
          order: index,
        }));

        setCategories(updatedOrder);
        saveCategoryOrder(updatedOrder);

        setTimeout(() => {
          categoryButtonRefs.current[categoryId]?.focus();
        }, 0);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }

      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleDragStart = (e: React.DragEvent, categoryId: string) => {
    const clone = e.currentTarget.cloneNode(true) as HTMLElement;

    clone.className =
      e.currentTarget.className.replace("hover:bg-gray-50", "") + " active";

    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.width = `${e.currentTarget.clientWidth}px`;
    document.body.appendChild(clone);

    e.dataTransfer.setDragImage(
      clone,
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);

    setDraggedCategory(categoryId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", categoryId);
  };

  const handleDragOver = (e: React.DragEvent, targetCategoryId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (!draggedCategory || draggedCategory === targetCategoryId) {
      return;
    }
    const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
    const draggedIndex = sortedCategories.findIndex(
      (cat) => cat.id === draggedCategory
    );
    const targetIndex = sortedCategories.findIndex(
      (cat) => cat.id === targetCategoryId
    );

    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }

    const newCategories = [...sortedCategories];
    const [draggedItem] = newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, draggedItem);

    const updatedCategories = newCategories.map((cat, index) => ({
      ...cat,
      order: index,
    }));

    setCategories(updatedCategories);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    saveCategoryOrder(categories);
    setDraggedCategory(null);
  };

  const handleDragEnd = () => {
    setDraggedCategory(null);
  };

  const getAllItems = () => {
    return categories.flatMap((cat) => cat.items);
  };

  const filteredItems = searchTerm
    ? getAllItems().filter((item) => {
        const normalizedSearchTerm = normalizeText(searchTerm);

        const hasMatchInLabel = normalizeText(item.label).includes(
          normalizedSearchTerm
        );

        const hasMatchInKeywords = item.keywords.some((keyword) =>
          normalizeText(keyword).includes(normalizedSearchTerm)
        );

        return hasMatchInLabel || hasMatchInKeywords;
      })
    : [];

  const handleSearchItemClick = (item: MenuItem) => {
    setActiveCategory(item.category);
    setActiveItem(item.id);
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const currentCategory = categories.find((cat) => cat.id === activeCategory);
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  const getPageContent = () => {
    const currentItem = currentCategory?.items.find(
      (item) => item.id === activeItem
    );

    switch (activeItem) {
      case "overview":
        return {
          title: "Dashboard Overview",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90">
                    Total Projects
                  </h3>
                  <p className="text-3xl font-bold mt-2">24</p>
                  <p className="text-sm opacity-75 mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90">
                    Active Users
                  </h3>
                  <p className="text-3xl font-bold mt-2">1,283</p>
                  <p className="text-sm opacity-75 mt-1">+5% from last week</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90">
                    Deployments
                  </h3>
                  <p className="text-3xl font-bold mt-2">156</p>
                  <p className="text-sm opacity-75 mt-1">
                    +23% from last month
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90">
                    Server Uptime
                  </h3>
                  <p className="text-3xl font-bold mt-2">99.9%</p>
                  <p className="text-sm opacity-75 mt-1">
                    All systems operational
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      action: "New deployment to production",
                      time: "2 minutes ago",
                      user: "Sarah Chen",
                    },
                    {
                      action: "Code review completed",
                      time: "15 minutes ago",
                      user: "Mike Johnson",
                    },
                    {
                      action: "New team member added",
                      time: "1 hour ago",
                      user: "Admin",
                    },
                    {
                      action: "Security scan completed",
                      time: "2 hours ago",
                      user: "System",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        };

      case "analytics":
        return {
          title: "Analytics Dashboard",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <ProgressRing percentage={87} color="#3b82f6" />
                    <h4 className="font-medium text-gray-800 mt-3">
                      User Engagement
                    </h4>
                    <p className="text-sm text-gray-500">↑ 12% vs last month</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing percentage={94} color="#10b981" />
                    <h4 className="font-medium text-gray-800 mt-3">
                      System Uptime
                    </h4>
                    <p className="text-sm text-gray-500">↑ 2% vs last month</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing percentage={76} color="#8b5cf6" />
                    <h4 className="font-medium text-gray-800 mt-3">
                      Task Completion
                    </h4>
                    <p className="text-sm text-gray-500">↑ 8% vs last month</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Usage Trends
                    </h3>
                    <div className="flex space-x-2"></div>
                  </div>
                  <div className="h-64">
                    <LineChart
                      data={[
                        45, 52, 48, 61, 55, 67, 73, 69, 78, 82, 79, 85, 91, 88,
                        95,
                      ]}
                      color="#3b82f6"
                      height={200}
                      showDots={true}
                      showGrid={true}
                    />
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>Jan</span>
                    <span>Jul</span>
                    <span>Dec</span>
                  </div>
                  <div className="mt-4 flex justify-between text-xs text-gray-400">
                    <span>Peak: 95 users</span>
                    <span>Average: 72 users</span>
                    <span>Growth: +28%</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Traffic Sources
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Direct",
                        value: 45,
                        color: "#3b82f6",
                        count: "12,450",
                      },
                      {
                        name: "Search",
                        value: 30,
                        color: "#10b981",
                        count: "8,300",
                      },
                      {
                        name: "Social",
                        value: 15,
                        color: "#f59e0b",
                        count: "4,150",
                      },
                      {
                        name: "Email",
                        value: 10,
                        color: "#ef4444",
                        count: "2,767",
                      },
                    ].map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-3"
                              style={{ backgroundColor: source.color }}
                            ></div>
                            <span className="text-sm text-gray-600">
                              {source.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {source.value}%
                            </div>
                            <div className="text-xs text-gray-500">
                              {source.count} visits
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${source.value}%`,
                              backgroundColor: source.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Visitors</span>
                      <span className="font-medium">27,667</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Bounce Rate</span>
                      <span className="font-medium text-green-600">32% ↓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        };

      case "reports":
        return {
          title: "Reports",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Generated Reports
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage and download your reports
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Report Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Generated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {report.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {report.type}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {report.date}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                report.status === "Ready"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {report.status === "Ready" && (
                              <button
                                className="text-blue-600 hover:text-blue-800 cursor-pointer mr-3"
                                onClick={() =>
                                  handleDownloadReport(report.name)
                                }
                              >
                                <AiOutlineDownload className="w-4 h-4 inline mr-1" />
                              </button>
                            )}
                            <button
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <AiOutlineDelete className="w-4 h-4 inline mr-1" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ),
        };

      case "active-projects":
        return {
          title: "Active Projects",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Currently Active Projects
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "E-commerce Platform",
                      progress: 85,
                      daysLeft: 12,
                      priority: "High",
                    },
                    {
                      name: "Mobile App Redesign",
                      progress: 60,
                      daysLeft: 28,
                      priority: "Medium",
                    },
                    {
                      name: "Security Audit",
                      progress: 45,
                      daysLeft: 35,
                      priority: "High",
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {project.name}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            project.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {project.priority} Priority
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {project.progress}%
                        </span>
                        <span className="text-sm text-gray-500">
                          {project.daysLeft} days left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        };

      case "archived":
        return {
          title: "Archived Projects",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Completed & Archived Projects
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      name: "Website Redesign 2023",
                      completedDate: "2023-12-15",
                      duration: "4 months",
                    },
                    {
                      name: "Legacy System Migration",
                      completedDate: "2023-11-20",
                      duration: "6 months",
                    },
                    {
                      name: "Mobile App v2.0",
                      completedDate: "2023-10-10",
                      duration: "8 months",
                    },
                    {
                      name: "Database Optimization",
                      completedDate: "2023-09-05",
                      duration: "2 months",
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {project.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Completed on {project.completedDate} • Duration:{" "}
                            {project.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        };

      case "repositories":
        return {
          title: "Code Repositories",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Development Repositories
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage your code repositories and branches
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    name: "frontend-app",
                    language: "TypeScript",
                    branches: 8,
                    commits: 234,
                    lastCommit: "2 hours ago",
                  },
                  {
                    name: "backend-api",
                    language: "Python",
                    branches: 5,
                    commits: 156,
                    lastCommit: "4 hours ago",
                  },
                  {
                    name: "mobile-client",
                    language: "Swift",
                    branches: 3,
                    commits: 89,
                    lastCommit: "1 day ago",
                  },
                  {
                    name: "shared-components",
                    language: "JavaScript",
                    branches: 12,
                    commits: 67,
                    lastCommit: "3 days ago",
                  },
                ].map((repo, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {repo.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {repo.language} • Last commit: {repo.lastCommit}
                        </p>
                      </div>
                      <div className="flex space-x-2"></div>
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-600">
                      <span>
                        <AiOutlineBranches className="w-4 h-4 inline mr-1" />
                        {repo.branches} branches
                      </span>
                      <span>
                        <AiOutlineCode className="w-4 h-4 inline mr-1" />
                        {repo.commits} commits
                      </span>
                      <span className={`flex items-center`}>
                        <span
                          className={`w-3 h-3 rounded-full inline-block mr-1 ${
                            repo.language === "TypeScript"
                              ? "bg-blue-500"
                              : repo.language === "Python"
                              ? "bg-green-500"
                              : repo.language === "Swift"
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                          }`}
                        ></span>
                        {repo.language}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };

      case "apis":
        return {
          title: "API Management",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  API Endpoints
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      method: "GET",
                      endpoint: "/api/v1/users",
                      status: "Active",
                      response: "200ms",
                    },
                    {
                      method: "POST",
                      endpoint: "/api/v1/auth/login",
                      status: "Active",
                      response: "150ms",
                    },
                    {
                      method: "PUT",
                      endpoint: "/api/v1/projects",
                      status: "Active",
                      response: "300ms",
                    },
                    {
                      method: "DELETE",
                      endpoint: "/api/v1/users/{id}",
                      status: "Down",
                      response: "N/A",
                    },
                  ].map((api, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded ${
                            api.method === "GET"
                              ? "bg-green-100 text-green-800"
                              : api.method === "POST"
                              ? "bg-blue-100 text-blue-800"
                              : api.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {api.method}
                        </span>
                        <code className="text-sm font-mono text-gray-700">
                          {api.endpoint}
                        </code>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            api.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {api.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {api.response}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        };

      case "deployments":
        return {
          title: "Deployments",
          minWidth: "min-w-[390px]",
          content: (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Deployments
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      version: "v2.4.1",
                      environment: "Production",
                      status: "Success",
                      time: "2 hours ago",
                      author: "Sarah Chen",
                    },
                    {
                      version: "v2.4.0",
                      environment: "Staging",
                      status: "Success",
                      time: "1 day ago",
                      author: "Mike Johnson",
                    },
                    {
                      version: "v2.3.9",
                      environment: "Development",
                      status: "Failed",
                      time: "2 days ago",
                      author: "Alex Kim",
                    },
                    {
                      version: "v2.3.8",
                      environment: "Production",
                      status: "Success",
                      time: "5 days ago",
                      author: "Sarah Chen",
                    },
                  ].map((deployment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            deployment.status === "Success"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {deployment.version}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {deployment.environment} • {deployment.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            deployment.status === "Success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {deployment.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          by {deployment.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        };

      case "members":
        return {
          title: "Team Members",
          minWidth: "min-w-[390px]",
          content: (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Team Directory
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage team members and their roles
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  {
                    name: "Mike Johnson",
                    role: "Developer",
                    email: "mike@company.com",
                    status: "Online",
                    avatar:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                  },
                  {
                    name: "Alex Kim",
                    role: "Designer",
                    email: "alex@company.com",
                    status: "Away",
                    avatar:
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                  },
                  {
                    name: "Emma Wilson",
                    role: "Product Manager",
                    email: "emma@company.com",
                    status: "Offline",
                    avatar:
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                  },
                  {
                    name: "David Lee",
                    role: "DevOps Engineer",
                    email: "david@company.com",
                    status: "Online",
                    avatar:
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                  },
                  {
                    name: "Lisa Park",
                    role: "QA Engineer",
                    email: "lisa@company.com",
                    status: "Away",
                    avatar:
                      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="text-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h4 className="font-semibold text-gray-800">
                        {member.name}
                      </h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {member.email}
                      </p>
                      <div className="mt-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            member.status === "Online"
                              ? "bg-green-100 text-green-800"
                              : member.status === "Away"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-1 ${
                              member.status === "Online"
                                ? "bg-green-500"
                                : member.status === "Away"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          {member.status}
                        </span>
                      </div>
                      <div className="mt-4 flex space-x-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };

      case "roles":
        return {
          title: "Role Management",
          minWidth: "min-w-[390px]",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Administrator",
                    users: 2,
                    permissions: 15,
                    color: "bg-red-100 text-red-800",
                  },
                  {
                    name: "Team Lead",
                    users: 4,
                    permissions: 12,
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    name: "Developer",
                    users: 8,
                    permissions: 8,
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    name: "Designer",
                    users: 3,
                    permissions: 6,
                    color: "bg-purple-100 text-purple-800",
                  },
                  {
                    name: "Viewer",
                    users: 12,
                    permissions: 3,
                    color: "bg-gray-100 text-gray-800",
                  },
                ].map((role, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="mb-4">
                      <span
                        className={`px-3 py-1 text-xs xl:text-sm font-semibold rounded-full ${role.color}`}
                      >
                        {role.name}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs xl:text-sm">
                        <span className="text-gray-600">Users:</span>
                        <span className="font-medium">{role.users}</span>
                      </div>
                      <div className="flex justify-between text-xs xl:text-sm">
                        <span className="text-gray-600">Permissions:</span>
                        <span className="font-medium">{role.permissions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };

      case "clusters":
        return {
          title: "Cluster Management",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "Production Cluster",
                    nodes: 8,
                    status: "Healthy",
                    cpu: "67%",
                    memory: "54%",
                  },
                  {
                    name: "Staging Cluster",
                    nodes: 4,
                    status: "Healthy",
                    cpu: "34%",
                    memory: "28%",
                  },
                  {
                    name: "Development Cluster",
                    nodes: 6,
                    status: "Warning",
                    cpu: "89%",
                    memory: "76%",
                  },
                  {
                    name: "Testing Cluster",
                    nodes: 3,
                    status: "Healthy",
                    cpu: "23%",
                    memory: "31%",
                  },
                ].map((cluster, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {cluster.name}
                      </h3>
                      <span
                        className={`px-2 py-1 mt-3 lg:mt-0 text-xs font-semibold rounded-full ${
                          cluster.status === "Healthy"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {cluster.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Nodes:</span>
                        <span className="font-medium">{cluster.nodes}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">CPU Usage:</span>
                        <span className="font-medium">{cluster.cpu}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Mem. Usage:</span>
                        <span className="font-medium">{cluster.memory}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };

      case "monitoring":
        return {
          title: "System Monitoring",
          minWidth: "min-w-[380px]",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-4 text-center">
                    System Health
                  </h3>
                  <div className="text-center">
                    <div className="w-17 h-17 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-green-600">
                        98%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      All systems operational
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-4 text-center">
                    Response Time
                  </h3>
                  <div className="text-center">
                    <div className="w-17 h-17 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-blue-600">
                        45ms
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Average response time
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-4 text-center">
                    Error Rate
                  </h3>
                  <div className="text-center">
                    <div className="w-17 h-17 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-yellow-600">
                        0.2%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Within acceptable range
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Alerts
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      type: "Warning",
                      message: "High CPU usage on web-server-02",
                      time: "5 minutes ago",
                    },
                    {
                      type: "Info",
                      message: "Backup completed successfully",
                      time: "1 hour ago",
                    },
                    {
                      type: "Error",
                      message: "Database connection timeout",
                      time: "2 hours ago",
                    },
                    {
                      type: "Success",
                      message: "Security scan completed",
                      time: "4 hours ago",
                    },
                  ].map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          alert.type === "Error"
                            ? "bg-red-500"
                            : alert.type === "Warning"
                            ? "bg-yellow-500"
                            : alert.type === "Success"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          alert.type === "Error"
                            ? "bg-red-100 text-red-800"
                            : alert.type === "Warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : alert.type === "Success"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {alert.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        };

      default:
        return {
          title: currentItem?.label || "Dashboard",
          minWidth: "min-w-[700px]",
          content: (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Welcome to your workspace
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Use the sidebar to navigate between different sections. You can:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Drag and drop categories to reorder them
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Press Ctrl/Cmd + K to open search
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Use arrow keys to navigate categories
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Click the layout icon to collapse the sidebar
                </li>
              </ul>
            </div>
          ),
        };
    }
  };

  const pageContent = getPageContent();

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-quicksand">
      <div className="flex flex-1 overflow-hidden">
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

          .font-quicksand {
            font-family: "Quicksand", sans-serif;
          }

          /* Custom scrollbar styles */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
            transition: background 0.2s ease;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }

          .drag-handle {
            opacity: 0;
            transition: opacity 0.2s ease;
          }

          .category-item:hover .drag-handle {
            opacity: 1;
          }

          .category-item.active .drag-handle {
            opacity: 1;
            color: rgba(255, 255, 255, 0.8);
          }

          .dragging {
            background: #f8fafc;
            border: 2px dashed #e2e8f0;
          }

          .dragging > * {
            opacity: 0;
          }

          /* Cursor pointer for clickable elements */
          button,
          .category-item,
          [role="button"],
          [role="menuitem"],
          [role="option"] {
            cursor: pointer;
          }

          /* Backdrop blur effect */
          .backdrop-blur-custom {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
        `}</style>
        {/* Primary Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-white shadow-xl transition-all duration-300 ${
            isCollapsed ? "w-16" : "w-60"
          } flex flex-col border-r border-gray-200`}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 h-[88px] flex items-center">
            <div
              className={`flex items-center w-full ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              {!isCollapsed && (
                <h1 className="text-xl font-bold text-gray-800">Workspace</h1>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <AiOutlineLayout className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {!isCollapsed && (
            <div className="p-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
                aria-label="Open search (Ctrl+K)"
              >
                <AiOutlineSearch className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-500 text-sm flex-1 text-left">
                  Search items
                </span>
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono bg-white border border-gray-200 rounded">
                  ⌘K
                </kbd>
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
            <div className="space-y-2">
              {sortedCategories.map((category) => (
                <button
                  key={category.id}
                  ref={(el) => (categoryButtonRefs.current[category.id] = el)}
                  data-category-id={category.id}
                  className={`category-item group relative w-full flex items-center rounded-xl transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r " +
                        category.color +
                        " text-white shadow-lg active"
                      : "hover:bg-gray-200"
                  } ${draggedCategory === category.id ? "dragging" : ""} ${
                    !isCollapsed ? "justify-start" : "justify-center"
                  } ${isCollapsed ? "p-3" : "p-4"}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, category.id)}
                  onDragOver={(e) => handleDragOver(e, category.id)}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    setActiveCategory(category.id);
                    if (category.items.length > 0) {
                      setActiveItem(category.items[0].id);
                    }
                  }}
                  onKeyDown={(e) => handleCategoryKeyDown(e, category.id)}
                  aria-pressed={activeCategory === category.id}
                  aria-label={category.label}
                >
                  {!isCollapsed && (
                    <div className="drag-handle absolute left-2 top-1/2 transform -translate-y-1/2">
                      <AiOutlineDrag className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`flex items-center ${
                      !isCollapsed ? "ml-4" : ""
                    }`}
                  >
                    <div
                      className={`${isCollapsed ? "text-xl" : "text-2xl"} ${
                        !isCollapsed ? "mr-3" : ""
                      }`}
                    >
                      {category.icon}
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium">{category.label}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              {!isCollapsed && (
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="John Doe"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`
          flex flex-col bg-white shadow-lg border-r border-gray-200 
          transition-all duration-300
          w-20 lg:w-60
        `}
        >
          <div className="px-6 px-4 lg:px-6 py-5 border-b border-gray-100 h-[88px] flex items-center">
            <div className="flex items-center w-full justify-center lg:justify-start">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${currentCategory?.color} text-white mr-0 lg:mr-4`}
              >
                {currentCategory?.icon}
              </div>
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold text-gray-800">
                  {currentCategory?.label}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentCategory?.items.length} items
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Menu Items */}
          <div className="flex-1 custom-scrollbar p-4">
            <div className="space-y-1">
              {currentCategory?.items.map((item) => (
                <div key={item.id} className="group relative">
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`
                    w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left cursor-pointer
                    justify-center lg:justify-start
                    ${
                      activeItem === item.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 border-l-0 lg:border-l-4"
                        : "hover:bg-gray-200 text-gray-700"
                    }
                  `}
                    role="menuitem"
                    aria-selected={activeItem === item.id}
                    aria-label={item.label}
                  >
                    <div
                      className={`
                      text-xl lg:text-2xl opacity-75
                      mr-0 lg:mr-3
                    `}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 hidden lg:block">
                      <p className="font-medium">{item.label}</p>
                      {item.shortcut && (
                        <p className="text-xs opacity-60 mt-1">
                          {item.shortcut}
                        </p>
                      )}
                    </div>
                  </button>
                  <div
                    className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5
                    bg-gray-800 text-white text-sm font-medium rounded-md shadow-lg 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity pointer-events-none whitespace-nowrap
                    block lg:hidden z-20 
                  "
                    role="tooltip"
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-custom flex items-start justify-center pt-20 z-50"
            onClick={handleCloseSearch}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="search-dialog-title"
              aria-modal="true"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <AiOutlineSearch className="w-6 h-6 text-gray-400 mr-4 flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 text-lg outline-none placeholder-gray-400 bg-transparent"
                    aria-label="Search menu items"
                  />
                  <button
                    onClick={handleCloseSearch}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-4 cursor-pointer flex-shrink-0"
                    aria-label="Close search"
                  >
                    <AiOutlineClose className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {searchTerm && filteredItems.length > 0 ? (
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Found {filteredItems.length} result
                      {filteredItems.length !== 1 ? "s" : ""}
                    </p>
                    <div className="space-y-2">
                      {filteredItems.map((item) => {
                        const category = categories.find(
                          (cat) => cat.id === item.category
                        );
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSearchItemClick(item)}
                            className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors text-left cursor-pointer"
                            role="option"
                          >
                            <div className="text-lg mr-3 opacity-75">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {item.label}
                              </p>
                              <p className="text-sm text-gray-500">
                                {category?.label}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : searchTerm ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">
                      No results found for "{searchTerm}"
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">
                      Start typing to search menu items...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gray-50 overflow-auto custom-scrollbar">
          <div
            className={`max-w-7xl ${pageContent.minWidth || "min-w-[700px]"}`}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {pageContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
              This is the main content area for the selected menu item.
            </p>

            {pageContent.content}
          </div>
        </div>
      </div>
      <footer className="w-full bg-white border-t border-gray-200 p-4 text-center shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-sm text-gray-700 font-medium mr-2">
            Workspace App - Project Management Platform
          </p>
          <p className="text-xs text-gray-500 ml-2 text-center">
            Version 1.0.0 | Contact our team to get support
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DesktopSidebar;
