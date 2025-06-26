import React, { useState, useEffect, useRef, useCallback } from "react";

// ICON COMPONENTS
const ChevronLeft = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="transparent" />
    <path
      d="M14.5 17L9.5 12L14.5 7"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChevronRight = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="transparent" />
    <path
      d="M9.5 7L14.5 12L9.5 17"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const Home = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_15_3)">
      <rect width="24" height="24" fill="transparent" />
      <path
        d="M9 21H4C3.44772 21 3 20.5523 3 20V12.4142C3 12.149 3.10536 11.8946 3.29289 11.7071L11.2929 3.70711C11.6834 3.31658 12.3166 3.31658 12.7071 3.70711L20.7071 11.7071C20.8946 11.8946 21 12.149 21 12.4142V20C21 20.5523 20.5523 21 20 21H15M9 21H15M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </g>
    <defs>
      <clipPath id="clip0_15_3">
        <rect width="24" height="24" fill="transparent" />
      </clipPath>
    </defs>
  </svg>
);

const FileText = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 13H8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17H8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 9H8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BarChart = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 20V10M12 20V4M6 20V14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Users = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Mail = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 6L12 13L2 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Moon = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
      fill={color}
      stroke={color}
    />
  </svg>
);

const Sun = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1V3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21V23"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.21973 4.21973L5.63973 5.63973"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3604 18.3604L19.7804 19.7804"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 12H3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H23"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.21973 19.7804L5.63973 18.3604"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3604 5.63973L19.7804 4.21973"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XButton = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Menu = ({ size = 20, color = "#007EA7" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDown = ({ size = 20, color = "#007EA7", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RefreshCw = ({ size = 20, color = "#007EA7", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C9.69494 21 7.59227 20.1334 6 18.7083L3 16M3 12C3 7.02944 7.02944 3 12 3C14.3051 3 16.4077 3.86656 18 5.29168L21 8M3 21V16M3 16H8M21 3V8M21 8H16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// INTERFACES
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
}
interface Theme {
  name: "light" | "dark";
  background: string;
  surface: string;
  primary: string;
  primaryTransparent: string;
  textPrimary: string;
  textSecondary: string;
  glassBorder: string;
  iconColor: string;
  backgroundImg: string;
}
interface DocumentItem {
  name: string;
  type: "PDF" | "DOCX" | "XLSX" | "ZIP" | "OTHER";
  size: string;
  modified: string;
}
interface TeamMember {
  name: string;
  role: string;
  email: string;
  imageURL: string;
}
interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  time: number;
  userImage: string;
}
interface QuickAccessItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
interface KeyMetric {
  metric: string;
  value: number;
  change: number;
  baseValue: number;
}

// THEME DEFINITIONS
// Color Palette: #CCDBDC, #9AD1D4, #80CED7, #007EA7, #003249
const lightTheme: Theme = {
  name: "light",
  background: "#F8F9FA",
  surface: "rgba(204, 219, 220, 0.7)", // transparent #CCDBDC
  primary: "#007EA7",
  primaryTransparent: "rgba(0, 126, 167, 0.1)",
  textPrimary: "#003249",
  textSecondary: "#6C757D",
  glassBorder: "rgba(0, 50, 73, 0.2)",
  iconColor: "#007EA7",
  backgroundImg: "url(https://i.imghippo.com/files/ksZ5619bP.jpg)",
};

const darkTheme: Theme = {
  name: "dark",
  background: "#121212",
  surface: "rgba(0, 50, 73, 0.75)", // transparent #003249
  primary: "#80CED7",
  primaryTransparent: "rgba(128, 206, 215, 0.15)",
  textPrimary: "#CCDBDC",
  textSecondary: "#9AD1D4",
  glassBorder: "rgba(154, 209, 212, 0.3)",
  iconColor: "#CCDBDC",
  backgroundImg: "url(https://i.imghippo.com/files/Lcyg9697pnw.jpg)",
};

const SideBarApp: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [activeTheme, setActiveTheme] = useState<Theme>(lightTheme);
  const [activePage, setActivePage] = useState<string>("home");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, setTick] = useState(0);

  // DATA
  const [files, setFiles] = useState<DocumentItem[]>([
    {
      name: "Annual Report",
      type: "PDF",
      size: "2.4 MB",
      modified: "2 days ago",
    },
    {
      name: "Project Proposal",
      type: "DOCX",
      size: "1.2 MB",
      modified: "3 days ago",
    },
    {
      name: "Budget Spreadsheet",
      type: "XLSX",
      size: "3.1 MB",
      modified: "1 week ago",
    },
    {
      name: "Design Assets",
      type: "ZIP",
      size: "15.7 MB",
      modified: "2 weeks ago",
    },
  ]);
  const [teamMembers] = useState<TeamMember[]>([
    {
      name: "Alex Johnson",
      role: "Project Manager",
      email: "alex@nexusapp.com",
      imageURL: "https://i.imghippo.com/files/LSnJ6925gAU.jpg",
    },
    {
      name: "Maria Garcia",
      role: "UX Designer",
      email: "maria@nexusapp.com",
      imageURL: "https://i.imghippo.com/files/Ilt9825GiY.jpg",
    },
    {
      name: "David Ruiz",
      role: "Frontend Developer",
      email: "david@nexusapp.com",
      imageURL: "https://i.imghippo.com/files/xSlQ3437.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Backend Developer",
      email: "sarah@nexusapp.com",
      imageURL: "https://i.imghippo.com/files/WiD2072mSA.jpg",
    },
    {
      name: "James Wilson",
      role: "QA Engineer",
      email: "james@nexusapp.com",
      imageURL: "https://i.imghippo.com/files/Uqb1323Ch.jpg",
    },
    {
      name: "Emma Thompson",
      role: "DevOps Specialist",
      email: "emma@nexusapp.com",
      imageURL: "https://i.imghippo.com/files/MqPt8642Ybg.jpg",
    },
  ]);
  const [activities] = useState<ActivityItem[]>([
    {
      id: 1,
      user: "Maria Garcia",
      action: "commented on",
      target: "Homepage Redesign",
      time: Date.now() - 15000,
      userImage: "https://i.imghippo.com/files/Ilt9825GiY.jpg",
    },
    {
      id: 2,
      user: "Alex Johnson",
      action: "added a new task to",
      target: "Q3 Sprint",
      time: Date.now() - 45000 * 60,
      userImage: "https://i.imghippo.com/files/LSnJ6925gAU.jpg",
    },
    {
      id: 3,
      user: "David Ruiz",
      action: "pushed a commit to",
      target: "Feature/Auth-UI",
      time: Date.now() - 60000 * 60,
      userImage: "https://i.imghippo.com/files/xSlQ3437.jpg",
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "deployed new version of",
      target: "API Gateway",
      time: Date.now() - 180000 * 60,
      userImage: "https://i.imghippo.com/files/WiD2072mSA.jpg",
    },
    {
      id: 5,
      user: "Maria Garcia",
      action: "pushed a commit on",
      target: "Homepage Redesign",
      time: Date.now() - 250000 * 60,
      userImage: "https://i.imghippo.com/files/Ilt9825GiY.jpg",
    },
    {
      id: 6,
      user: "David Ruiz",
      action: "created a new branch",
      target: "Feature/Auth-UI",
      time: Date.now() - 360000 * 60,
      userImage: "https://i.imghippo.com/files/xSlQ3437.jpg",
    },
    {
      id: 7,
      user: "Emma Thompson",
      action: "Finished CI/CD pipeline on",
      target: "API Gateway",
      time: Date.now() - 400000 * 60,
      userImage: "https://i.imghippo.com/files/MqPt8642Ybg.jpg",
    },
  ]);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const [keyMetrics, setKeyMetrics] = useState<KeyMetric[]>([
    { metric: "Avg. Active Users", value: 8248, change: 0, baseValue: 8200 },
    { metric: "Avg. Session Duration", value: 272, change: 0, baseValue: 270 },
    { metric: "Bounce Rate", value: 28.3, change: 0, baseValue: 28.5 },
    { metric: "Conversion Rate", value: 5.7, change: 0, baseValue: 5.5 },
    { metric: "New Signups", value: 112, change: 0, baseValue: 110 },
  ]);
  const [isUpdatingMetrics, setIsUpdatingMetrics] = useState(false);

  const trafficData = [
    { day: "Mon", value: 6500 },
    { day: "Tue", value: 8200 },
    { day: "Wed", value: 7100 },
    { day: "Thu", value: 9400 },
    { day: "Fri", value: 8800 },
    { day: "Sat", value: 11500 },
    { day: "Sun", value: 10200 },
  ];

  const quickAccessItems: QuickAccessItem[] = [
    {
      id: "files",
      label: "My Files",
      icon: <FileText color={activeTheme.primary} />,
    },
    {
      id: "team",
      label: "Team Members",
      icon: <Users color={activeTheme.primary} />,
    },
    {
      id: "contact",
      label: "Help Center",
      icon: <Mail color={activeTheme.primary} />,
    },
  ];

  const maxValue = Math.max(...trafficData.map((d) => d.value));

  // MODAL STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "PDF",
    size: "",
  });
  const [formErrors, setFormErrors] = useState({ name: "", size: "" });
  const fileTypes = ["PDF", "DOCX", "XLSX", "ZIP", "OTHER"];

  // FORM STATES
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateMetrics = useCallback(() => {
    setIsUpdatingMetrics(true);
    setKeyMetrics((currentMetrics) =>
      currentMetrics.map((metric) => {
        const previousValue = metric.value;
        const fluctuation = (Math.random() - 0.5) * 0.2;
        let newValue = metric.baseValue * (1 + fluctuation);

        if (
          metric.metric.includes("Users") ||
          metric.metric.includes("Signups")
        ) {
          newValue = Math.round(newValue);
        }

        const changePercentage =
          ((newValue - previousValue) / previousValue) * 100;

        return {
          ...metric,
          value: newValue,
          change: changePercentage,
        };
      })
    );
    setTimeout(() => setIsUpdatingMetrics(false), 300);
  }, []);

  // EFFECTS
  useEffect(() => {
    setActiveTheme(isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prevTick) => prevTick + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      updateMetrics();
    }, 10000);

    return () => {
      clearInterval(metricsInterval);
    };
  }, [updateMetrics]);

  // HANDLERS
  const toggleSubmenu = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getMenuItems = (): MenuItem[] => {
    const iconsColor = activeTheme.primary;
    const subIconColor = activeTheme.textSecondary;
    const baseItems: MenuItem[] = [
      { id: "home", label: "Home", icon: <Home color={iconsColor} /> },
      { id: "files", label: "Files", icon: <FileText color={iconsColor} /> },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart color={iconsColor} />,
      },
      { id: "team", label: "Team", icon: <Users color={iconsColor} /> },
      { id: "contact", label: "Contact", icon: <Mail color={iconsColor} /> },
    ];
    if (activePage === "files") {
      baseItems[1].subItems = [
        {
          id: "recent",
          label: "Stored Data",
          icon: <FileText size={16} color={subIconColor} />,
        },
      ];
    } else if (activePage === "analytics") {
      baseItems[2].subItems = [
        {
          id: "metrics",
          label: "Metrics",
          icon: <BarChart size={16} color={subIconColor} />,
        },
      ];
    }
    return baseItems;
  };

  const handleMouseEnter = () => {
    if (hideTooltipTimeout.current) {
      clearTimeout(hideTooltipTimeout.current);
    }
    tooltipTimeout.current = setTimeout(() => setShowTooltip(true), 500);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    if (hideTooltipTimeout.current) clearTimeout(hideTooltipTimeout.current);
    setShowTooltip(false);
  };

  const handleThemeToggleClick = () => {
    setIsDarkMode((prev) => !prev);
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    if (hideTooltipTimeout.current) clearTimeout(hideTooltipTimeout.current);
    setShowTooltip(true);
    hideTooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewDocument({ name: "", type: "PDF", size: "" });
    setFormErrors({ name: "", size: "" });
  };

  const elapsedTime = (timestamp: number): string => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
      return `${seconds} sec`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    return `${hours} h`;
  };

  // FORM VALIDATION AND SUBMISSION
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDocument((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = { name: "", size: "" };
    let isValid = true;
    if (!newDocument.name.trim()) {
      errors.name = "File name is required.";
      isValid = false;
    }
    if (!newDocument.size.trim()) {
      errors.size = "File size is required.";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const docToAdd: DocumentItem = {
        name: newDocument.name,
        type: newDocument.type as DocumentItem["type"],
        size: newDocument.size,
        modified: "Just now",
      };
      setFiles((prevDocs) => [docToAdd, ...prevDocs]);
      handleCloseModal();
    }
  };

  const validateContactForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };
    if (!contactForm.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!contactForm.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }
    if (!contactForm.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }
    setContactErrors(newErrors);
    return isValid;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContactForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setContactForm({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 2000);
      }, 1500);
    }
  };

  // RENDER SPECIFIC CONTENT FOR EACH PAGE
  const renderPageContent = ({
    files,
    teamMembers,
    activities,
  }: {
    files: DocumentItem[];
    teamMembers: TeamMember[];
    activities: ActivityItem[];
  }) => {
    switch (activePage) {
      case "home":
        return (
          <div className="space-y-8">
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ color: activeTheme.textPrimary }}
              >
                Dashboard Overview
              </h1>
              <p
                className="text-lg mt-2"
                style={{ color: activeTheme.textSecondary }}
              >
                Welcome back! Here's a snapshot of your workspace.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Quick Access
                </h2>
                <div className="space-y-3">
                  {" "}
                  {quickAccessItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      className="p-4 rounded-xl flex items-center cursor-pointer transition-all hover:bg-opacity-80"
                      style={{
                        backgroundColor: activeTheme.primaryTransparent,
                        border: `1px solid ${activeTheme.glassBorder}`,
                      }}
                    >
                      <span className="mr-4"> {item.icon}</span>
                      <span
                        className="font-medium"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <img
                        src={activity.userImage}
                        alt={activity.user}
                        className="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0"
                        style={{ borderColor: activeTheme.primary }}
                      />
                      <div className="flex-1 min-w-0">
                        {" "}
                        <p
                          style={{ color: activeTheme.textPrimary }}
                          className="break-words"
                        >
                          {" "}
                          <span className="font-semibold">
                            {activity.user}
                          </span>{" "}
                          {activity.action}{" "}
                          <span
                            className="font-semibold"
                            style={{ color: activeTheme.primary }}
                          >
                            {activity.target}
                          </span>
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: activeTheme.textSecondary }}
                        >
                          {elapsedTime(activity.time)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "files":
        return (
          <div className="space-y-6">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: activeTheme.textPrimary }}
            >
              File Management
            </h1>
            <p className="text-lg" style={{ color: activeTheme.textSecondary }}>
              Manage all your files in one place. Enter new file's data.
            </p>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2
                  id="recent"
                  className="text-xl font-semibold"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Stored Data
                </h2>
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: activeTheme.primary,
                    color: activeTheme.name === "dark" ? "#003249" : "#FFFFFF",
                  }}
                >
                  Enter File Data
                </button>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: activeTheme.primaryTransparent,
                      }}
                    >
                      <th
                        className="text-left p-4 font-semibold"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Name
                      </th>
                      <th
                        className="text-left p-4 font-semibold"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Type
                      </th>
                      <th
                        className="text-left p-4 font-semibold"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Size
                      </th>
                      <th
                        className="text-left p-4 font-semibold"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Modified
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr
                        key={index}
                        className="border-t"
                        style={{ borderColor: activeTheme.glassBorder }}
                      >
                        <td
                          className="p-4"
                          style={{ color: activeTheme.textPrimary }}
                        >
                          {file.name}
                        </td>
                        <td
                          className="p-4"
                          style={{ color: activeTheme.textSecondary }}
                        >
                          {file.type}
                        </td>
                        <td
                          className="p-4"
                          style={{ color: activeTheme.textSecondary }}
                        >
                          {file.size}
                        </td>
                        <td
                          className="p-4"
                          style={{ color: activeTheme.textSecondary }}
                        >
                          {file.modified}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: activeTheme.textPrimary }}
            >
              Performance Analytics
            </h1>
            <p className="text-lg" style={{ color: activeTheme.textSecondary }}>
              Analyze your key metrics to optimize performance.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
              <div className="lg:col-span-3">
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Daily Traffic Overview
                </h3>
                <div
                  className="flex h-80 px-5 py-8 rounded-xl"
                  style={{
                    backgroundColor: activeTheme.primaryTransparent,
                    border: `1px solid ${activeTheme.glassBorder}`,
                  }}
                >
                  <div
                    className="flex flex-col justify-between text-xs mr-6 font-medium"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    <span>{Math.round(maxValue / 1000)}k</span>
                    <span>{Math.round((maxValue * 0.66) / 1000)}k</span>
                    <span>{Math.round((maxValue * 0.33) / 1000)}k</span>
                    <span>0</span>
                  </div>
                  <div className="flex-1 grid grid-cols-7 gap-2 items-end">
                    {trafficData.map((data, index) => (
                      <div
                        key={index}
                        className="relative h-full flex items-end justify-center"
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div
                          className="w-3/4 bg-gradient-to-t from-transparent to-current rounded-t-md transition-all duration-300"
                          style={{
                            height: `${(data.value / maxValue) * 100}%`,
                            color: activeTheme.primary,
                            opacity:
                              hoveredBar === index || hoveredBar === null
                                ? 1
                                : 0.5,
                          }}
                        ></div>
                        {hoveredBar === index && (
                          <div
                            className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-md shadow-lg text-xs whitespace-nowrap"
                            style={{
                              backgroundColor: activeTheme.textPrimary,
                              color: activeTheme.background,

                              bottom: `${(data.value / maxValue) * 100 + 5}%`,
                              transition: "bottom 0.2s ease-out",
                            }}
                          >
                            {data.value.toLocaleString()}
                            <div
                              className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                              style={{
                                backgroundColor: activeTheme.textPrimary,
                              }}
                            ></div>
                          </div>
                        )}
                        <span
                          className="absolute -bottom-3 text-xs font-medium"
                          style={{ color: activeTheme.textPrimary }}
                        >
                          {data.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div id="metrics" className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    Key Metrics
                  </h3>
                  <button
                    onClick={updateMetrics}
                    disabled={isUpdatingMetrics}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: activeTheme.primaryTransparent,
                      color: activeTheme.primary,
                    }}
                    title="Refresh Metrics"
                  >
                    <RefreshCw
                      size={18}
                      className={isUpdatingMetrics ? "animate-spin" : ""}
                    />
                  </button>
                </div>
                <div className="space-y-4">
                  {keyMetrics.map((item, index) => {
                    const isPositive = item.change >= 0;
                    let displayValue = "";
                    if (item.metric.includes("Duration")) {
                      const minutes = Math.floor(item.value / 60);
                      const seconds = Math.round(item.value % 60);
                      displayValue = `${minutes}m ${seconds}s`;
                    } else if (item.metric.includes("Rate")) {
                      displayValue = `${item.value.toFixed(1)}%`;
                    } else {
                      displayValue = item.value.toLocaleString();
                    }

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 rounded-xl"
                        style={{
                          backgroundColor: activeTheme.primaryTransparent,
                          border: `1px solid ${activeTheme.glassBorder}`,
                        }}
                      >
                        <span style={{ color: activeTheme.textPrimary }}>
                          {item.metric}
                        </span>
                        <div className="flex items-center">
                          <span
                            className="font-semibold mr-2"
                            style={{ color: activeTheme.textPrimary }}
                          >
                            {displayValue}
                          </span>
                          <span
                            style={{
                              color: isPositive ? "#10B981" : "#EF4444",
                              backgroundColor: isPositive
                                ? "rgba(16, 185, 129, 0.1)"
                                : "rgba(239, 68, 68, 0.1)",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "0.875rem",
                              width: "60px",
                              textAlign: "center",
                            }}
                          >
                            {item.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case "team":
        return (
          <div className="space-y-6">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: activeTheme.textPrimary }}
            >
              Team Members
            </h1>
            <p className="text-lg" style={{ color: activeTheme.textSecondary }}>
              These are your team members and their roles within the
              organization.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member: TeamMember, index: number) => (
                <div
                  key={index}
                  className="p-6 rounded-xl flex flex-col items-center text-center transition-transform hover:scale-[1.03]"
                  style={{
                    backgroundColor: activeTheme.surface,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: `1px solid ${activeTheme.glassBorder}`,
                  }}
                >
                  <img
                    src={member.imageURL}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-2 mb-4"
                    style={{ borderColor: activeTheme.primary }}
                  />
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: activeTheme.textSecondary }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-sm mt-2 font-medium"
                    style={{ color: activeTheme.primary }}
                  >
                    {member.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: activeTheme.textPrimary }}
            >
              Contact Support
            </h1>
            <p className="text-lg" style={{ color: activeTheme.textSecondary }}>
              Have questions? Our support team is here to help you.
            </p>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: activeTheme.surface,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: `1px solid ${activeTheme.glassBorder}`,
                }}
              >
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Send Us a Message
                </h2>
                <form onSubmit={handleContactSubmit} noValidate>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block mb-1 text-sm"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 rounded-lg border"
                        style={{
                          backgroundColor: `rgba(0,0,0,0.1)`,
                          borderColor: contactErrors.name
                            ? "#EF4444"
                            : activeTheme.glassBorder,
                          color: activeTheme.textPrimary,
                          outline: "none",
                        }}
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                      />
                      {contactErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block mb-1 text-sm"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 rounded-lg border"
                        style={{
                          backgroundColor: `rgba(0,0,0,0.1)`,
                          borderColor: contactErrors.email
                            ? "#EF4444"
                            : activeTheme.glassBorder,
                          color: activeTheme.textPrimary,
                          outline: "none",
                        }}
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                      />
                      {contactErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block mb-1 text-sm"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full p-3 rounded-lg border"
                        style={{
                          backgroundColor: `rgba(0,0,0,0.1)`,
                          borderColor: contactErrors.message
                            ? "#EF4444"
                            : activeTheme.glassBorder,
                          color: activeTheme.textPrimary,
                          outline: "none",
                        }}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                      />
                      {contactErrors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactErrors.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className="px-4 py-2 rounded-lg font-medium flex items-center justify-center min-w-[150px] transition-all"
                        style={{
                          backgroundColor: isSubmitted
                            ? "#10B981"
                            : activeTheme.primary,
                          color:
                            activeTheme.name === "dark" ? "#003249" : "#FFFFFF",
                          transform: isSubmitting ? "scale(0.98)" : "scale(1)",
                          opacity: isSubmitting ? 0.8 : 1,
                        }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </div>
                        ) : isSubmitted ? (
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Sent!
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="space-y-6">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Contact Information
                </h2>
                <div
                  className="p-6 rounded-xl flex items-start space-x-4"
                  style={{
                    backgroundColor: activeTheme.surface,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: `1px solid ${activeTheme.glassBorder}`,
                  }}
                >
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: activeTheme.primaryTransparent }}
                  >
                    <Mail size={24} color={activeTheme.primary} />
                  </div>
                  <div>
                    <h3
                      className="font-medium"
                      style={{ color: activeTheme.textPrimary }}
                    >
                      Email Support
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: activeTheme.textSecondary }}
                    >
                      support@nexusapp.com
                    </p>
                  </div>
                </div>
                <div
                  className="p-6 rounded-xl flex items-start space-x-4"
                  style={{
                    backgroundColor: activeTheme.surface,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: `1px solid ${activeTheme.glassBorder}`,
                  }}
                >
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: activeTheme.primaryTransparent }}
                  >
                    <Users size={24} color={activeTheme.primary} />
                  </div>
                  <div>
                    <h3
                      className="font-medium"
                      style={{ color: activeTheme.textPrimary }}
                    >
                      Community Forum
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: activeTheme.textSecondary }}
                    >
                      community.nexusapp.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1 style={{ color: activeTheme.textPrimary }}>Page Not Found</h1>
          </div>
        );
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      <style>{`
        /* Import Inter font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body, :root {
            font-family: 'Inter', sans-serif;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
            
        /* For WebKit Browsers (Chrome, Safari, Edge) */
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${activeTheme.primaryTransparent};
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${activeTheme.primary};
          border-radius: 10px;
          border: 2px solid ${activeTheme.surface};
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: ${activeTheme.textPrimary};
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-color: ${activeTheme.primary} ${activeTheme.primaryTransparent};
        }
      `}</style>
      <div
        className="flex h-screen w-screen overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: activeTheme.background,
          backgroundImage: `${activeTheme.backgroundImg}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* MOBILE MENU TOGGLE */}
        <button
          className={`fixed top-4 z-50 md:hidden p-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
            isCollapsed ? "left-4" : "left-[13.5rem]"
          }`}
          style={{
            backgroundColor: activeTheme.surface,
            border: `1px solid ${activeTheme.glassBorder}`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Menu size={24} color={activeTheme.primary} />
          ) : (
            <XButton size={24} color={activeTheme.primary} />
          )}
        </button>

        {/* SIDEBAR */}
        <div
          className={`fixed md:relative z-40 h-full flex flex-col transition-all duration-300 ease-in-out
                      md:${isCollapsed ? "w-20" : "w-60"} w-60
                      ${!isCollapsed ? "left-0" : "-left-full"} md:left-auto
                      border-r`}
          style={{
            backgroundColor: activeTheme.surface,
            borderColor: activeTheme.glassBorder,
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
          }}
        >
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: activeTheme.glassBorder }}
          >
            <div
              className="flex items-center text-2xl font-bold"
              style={{ color: activeTheme.primary }}
            >
              <span>N</span>
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                  isCollapsed
                    ? "grid-cols-[0fr] opacity-0"
                    : "grid-cols-[1fr] opacity-100"
                }`}
              >
                <span className="whitespace-nowrap">exusApp</span>
              </div>
            </div>
          </div>

          <div className="py-4 overflow-y-auto flex-grow">
            {menuItems.map((item) => (
              <div key={item.id} className="px-4">
                <div
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all mb-1 font-medium`}
                  style={
                    activePage === item.id
                      ? {
                          backgroundColor: activeTheme.primaryTransparent,
                          borderLeft: `4px solid ${activeTheme.primary}`,
                          color: activeTheme.primary,
                          paddingLeft: "12px",
                        }
                      : {
                          color: activeTheme.textPrimary,
                          borderLeft: "4px solid transparent",
                        }
                  }
                  onClick={() => {
                    setActivePage(item.id);
                    setIsCollapsed(false);
                    if (item.subItems) toggleSubmenu(item.id);
                  }}
                >
                  <span className={`${isCollapsed ? "" : "mr-3"}`}>
                    {React.cloneElement(item.icon as React.ReactElement, {
                      color:
                        activePage === item.id
                          ? activeTheme.primary
                          : activeTheme.textSecondary,
                    })}
                  </span>
                  {!isCollapsed && (
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-in-out w-full
                      ${
                        isCollapsed
                          ? "grid-cols-[0fr] opacity-0"
                          : "grid-cols-[1fr] opacity-100"
                      }`}
                    >
                      <div className="flex items-center justify-between overflow-hidden">
                        <span className="whitespace-nowrap">{item.label}</span>
                        {item.subItems && (
                          <ChevronDown
                            size={16}
                            color={activeTheme.textSecondary}
                            className={`transition-transform ${
                              expandedItems[item.id] ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {!isCollapsed && item.subItems && (
                  <div
                    className={`ml-8 mt-1 overflow-hidden transition-all duration-300 ${
                      expandedItems[item.id] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.id}
                        className="flex items-center p-2 pl-3 rounded-lg cursor-pointer"
                        style={{ color: activeTheme.textSecondary }}
                        onClick={() => {
                          setActivePage(item.id);
                          setIsCollapsed(false);
                          setTimeout(() => {
                            const section = document.getElementById(subItem.id);
                            if (section) {
                              section.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }
                          }, 0);
                        }}
                      >
                        <span className="mr-2">{subItem.icon}</span>
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className={`p-4 flex transition-all duration-300 ease-in-out ${
              isCollapsed ? "justify-end" : "justify-center"
            }`}
          >
            <div className="relative group w-full">
              <button
                className={`flex items-center p-3 rounded-xl transition-all duration-300 ease-in-out border hover:opacity-80 ${
                  isCollapsed ? "w-12 justify-center" : "w-full justify-center"
                }`}
                style={{
                  backgroundColor: `rgba(0,0,0,0.1)`,
                  borderColor: activeTheme.glassBorder,
                }}
                onClick={handleThemeToggleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isDarkMode ? (
                  <Sun color={activeTheme.primary} />
                ) : (
                  <Moon color={activeTheme.primary} />
                )}

                <div
                  className={`grid overflow-hidden transition-all ease-in-out ${
                    isCollapsed
                      ? "grid-cols-[0fr] opacity-0 ml-0 duration-200"
                      : "grid-cols-[1fr] opacity-100 ml-3 duration-300 delay-100"
                  }`}
                >
                  <span
                    className="whitespace-nowrap font-medium overflow-hidden"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </div>
              </button>

              {isCollapsed && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 left-full ml-4 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-opacity duration-300 ${
                    showTooltip
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                  style={{
                    backgroundColor: activeTheme.textPrimary,
                    color: activeTheme.background,
                  }}
                >
                  {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-[-6px] w-3 h-3 rotate-45"
                    style={{ backgroundColor: activeTheme.textPrimary }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* ADAPTABLE TOGGLE BUTTON */}
          <button
            className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 rounded-full shadow-lg transition-all duration-300 ease-in-out z-50 hover:scale-110"
            style={{
              backgroundColor: activeTheme.surface,
              border: `1px solid ${activeTheme.glassBorder}`,
              backdropFilter: "blur(5px)",
            }}
            onClick={handleToggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight color={activeTheme.primary} />
            ) : (
              <ChevronLeft color={activeTheme.primary} />
            )}
          </button>
        </div>

        {/* MAIN CONTENT */}
        <main className={`flex-1 transition-all duration-300 overflow-y-auto`}>
          <div className="p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div
                className="border rounded-2xl p-6 sm:p-8 shadow-lg mb-8"
                style={{
                  backgroundColor: activeTheme.surface,
                  borderColor: activeTheme.glassBorder,
                  backdropFilter: "blur(15px)",
                  WebkitBackdropFilter: "blur(15px)",
                }}
              >
                {renderPageContent({ files, teamMembers, activities })}
              </div>
            </div>
          </div>
        </main>

        {/* MODAL FORM */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div
              className="rounded-2xl shadow-xl w-full max-w-lg mx-4"
              style={{
                backgroundColor: activeTheme.surface,
                border: `1px solid ${activeTheme.glassBorder}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: activeTheme.glassBorder }}
              >
                <h2
                  className="text-2xl font-bold"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Add New File Data
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: activeTheme.primaryTransparent }}
                >
                  <XButton size={20} color={activeTheme.primary} />
                </button>
              </div>
              <form onSubmit={handleAddDocument} noValidate>
                <div className="p-6 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 font-medium"
                      style={{ color: activeTheme.textSecondary }}
                    >
                      File Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newDocument.name}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-opacity-50"
                      style={{
                        backgroundColor: `rgba(0,0,0,0.1)`,
                        borderColor: formErrors.name
                          ? "#EF4444"
                          : activeTheme.glassBorder,
                        color: activeTheme.textPrimary,
                        outline: "none",
                        boxShadow: formErrors.name
                          ? `0 0 0 2px rgba(239, 68, 68, 0.4)`
                          : `0 0 0 0px ${activeTheme.primary}`,
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      placeholder="e.g., Quarterly Report"
                    />
                    {formErrors.name && (
                      <p className="mt-2 text-sm text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="type"
                        className="block mb-2 font-medium"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        File Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={newDocument.type}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border appearance-none text-sm"
                        style={{
                          backgroundColor:
                            activeTheme.name === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.05)",
                          borderColor: activeTheme.glassBorder,
                          color: activeTheme.textPrimary,
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${activeTheme.textSecondary.replace(
                            "#",
                            "%23"
                          )}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {fileTypes.map((type) => (
                          <option
                            key={type}
                            value={type}
                            style={{
                              backgroundColor: activeTheme.background,
                              color: activeTheme.textPrimary,
                              padding: "10px",
                            }}
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="size"
                        className="block mb-2 font-medium"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        File Size
                      </label>
                      <input
                        type="text"
                        id="size"
                        name="size"
                        value={newDocument.size}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border"
                        style={{
                          backgroundColor: `rgba(0,0,0,0.1)`,
                          borderColor: formErrors.size
                            ? "#EF4444"
                            : activeTheme.glassBorder,
                          color: activeTheme.textPrimary,
                          outline: "none",
                          boxShadow: formErrors.size
                            ? `0 0 0 2px rgba(239, 68, 68, 0.4)`
                            : `0 0 0 0px ${activeTheme.primary}`,
                          transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                        placeholder="e.g., 5.2 MB"
                      />
                      {formErrors.size && (
                        <p className="mt-2 text-sm text-red-500">
                          {formErrors.size}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="flex justify-end p-6 border-t space-x-4"
                  style={{
                    borderColor: activeTheme.glassBorder,
                    backgroundColor: "transparent",
                    borderBottomLeftRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: "transparent",
                      color: activeTheme.textPrimary,
                      border: `1px solid ${activeTheme.glassBorder}`,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: activeTheme.primary,
                      color:
                        activeTheme.name === "dark" ? "#003249" : "#FFFFFF",
                    }}
                  >
                    Add Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBarApp;
