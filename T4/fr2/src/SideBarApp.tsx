import React, { useState, useEffect, useRef } from "react";

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

const FileText = ({ size = 20, color = "#007EA7", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 8C5 5.17157 5 3.75736 5.87868 2.87868C6.75736 2 8.17157 2 11 2H13C15.8284 2 17.2426 2 18.1213 2.87868C19 3.75736 19 5.17157 19 8V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V8Z"
      stroke={color}
      strokeWidth="2.5"
    />
    <path
      d="M5 4.07617C4.02491 4.17208 3.36857 4.38885 2.87868 4.87873C2 5.75741 2 7.17163 2 10.0001V14.0001C2 16.8285 2 18.2427 2.87868 19.1214C3.36857 19.6113 4.02491 19.828 5 19.9239"
      stroke={color}
      strokeWidth="2.5"
    />
    <path
      d="M19 4.07617C19.9751 4.17208 20.6314 4.38885 21.1213 4.87873C22 5.75741 22 7.17163 22 10.0001V14.0001C22 16.8285 22 18.2427 21.1213 19.1214C20.6314 19.6113 19.9751 19.828 19 19.9239"
      stroke={color}
      strokeWidth="2.5"
    />
    <path d="M9 13H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 9H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 17H12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const BarChart = ({ size = 20, color = "#007EA7", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 14V18M12 10V18M17 6V18"
      stroke={color}
      strokeWidth="2.5"
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

const Mail = ({ size = 20, color = "#007EA7", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 4C21.6569 4 23 5.34315 23 7V17C23 18.6569 21.6569 20 20 20H4C2.34315 20 1 18.6569 1 17V7C1 5.34315 2.34315 4 4 4H20ZM19.2529 6H4.74718L11.3804 11.2367C11.7437 11.5236 12.2563 11.5236 12.6197 11.2367L19.2529 6ZM3 7.1688V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7.16882L13.8589 12.8065C12.769 13.667 11.231 13.667 10.1411 12.8065L3 7.1688Z"
      fill={color}
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75ZM6.25 12C6.25 8.82436 8.82436 6.25 12 6.25C15.1756 6.25 17.75 8.82436 17.75 12C17.75 15.1756 15.1756 17.75 12 17.75C8.82436 17.75 6.25 15.1756 6.25 12ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"
      fill={color}
      stroke={color}
    />
  </svg>
);

const XButton = ({ size = 20, color = "#007EA7", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
      fill={color}
    />
  </svg>
);

const Menu = ({ size = 20, color = "#007EA7", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
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
  border: string;
  iconColor: string;
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

// THEME DEFINITIONS

const lightTheme: Theme = {
  name: "light",
  background: "#F8F9FA",
  surface: "#FFFFFF",
  primary: "#007EA7",
  primaryTransparent: "rgba(0, 126, 167, 0.1)",
  textPrimary: "#003249",
  textSecondary: "#6C757D",
  border: "#CCDBDC",
  iconColor: "#007EA7",
};

const darkTheme: Theme = {
  name: "dark",
  background: "#121212",
  surface: "#1E1E1E",
  primary: "#80CED7",
  primaryTransparent: "rgba(0, 168, 232, 0.15)",
  textPrimary: "#CCDBDC",
  textSecondary: "#9AD1D4",
  border: "#343A40",
  iconColor: "#CCDBDC",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [showTooltip, setShowTooltip] = useState(false);
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

  // STATE AND HANDLERS FOR THE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "PDF",
    size: "",
  });
  const [formErrors, setFormErrors] = useState({ name: "", size: "" });

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

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewDocument({ name: "", type: "PDF", size: "" });
    setFormErrors({ name: "", size: "" });
  };

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
      errors.name = "El nombre del archivo es obligatorio.";
      isValid = false;
    }
    if (!newDocument.size.trim()) {
      errors.size = "El tamaño del archivo es obligatorio.";
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

  // SUBMIT HANDLER
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

  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setActiveTheme(isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleSubmenu = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getMenuItems = (): MenuItem[] => {
    const iconsColor = activeTheme.primary;
    const subIconColor = activeTheme.textSecondary;

    const baseItems: MenuItem[] = [
      { id: "home", label: "Home", icon: <Home color={iconsColor} /> },
      {
        id: "files",
        label: "Files",
        icon: <FileText color={iconsColor} />,
      },
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

  // RENDER SPECIFIC CONTENT FOR EACH PAGE
  const renderPageContent = ({
    files,
    teamMembers,
  }: {
    files: DocumentItem[];
    teamMembers: TeamMember[];
  }) => {
    switch (activePage) {
      case "home":
        return (
          <div className="space-y-6">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: activeTheme.textPrimary }}
            >
              Dashboard Overview
            </h1>
            <p className="text-lg" style={{ color: activeTheme.textSecondary }}>
              Welcome back! Here's what's happening with your projects today.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="border rounded-xl py-6 px-6 md:px-4 lg:px-6"
                style={{
                  backgroundColor: activeTheme.primaryTransparent,
                  borderColor: activeTheme.border,
                }}
              >
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <BarChart size={32} color={activeTheme.primary} />
                  <h3
                    className="mt-2 sm:mt-0 ml-4 md:ml-1 lg:ml-4 text-xl md:text-lg lg:text-xl font-semibold break-words"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    Projects
                  </h3>
                </div>
                <div
                  className="mt-4 text-3xl font-bold"
                  style={{ color: activeTheme.primary }}
                >
                  24
                </div>
                <p
                  className="mt-2"
                  style={{ color: activeTheme.textSecondary }}
                >
                  Active projects
                </p>
              </div>

              <div
                className="border rounded-xl py-6 px-6 md:px-4 lg:px-6"
                style={{
                  backgroundColor: activeTheme.primaryTransparent,
                  borderColor: activeTheme.border,
                }}
              >
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <Users size={32} color={activeTheme.primary} />
                  <h3
                    className="mt-2 sm:mt-0 ml-4 md:ml-1 lg:ml-4 text-xl md:text-lg lg:text-xl font-semibold break-words"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    Team
                  </h3>
                </div>
                <div
                  className="mt-4 text-3xl font-bold"
                  style={{ color: activeTheme.primary }}
                >
                  {teamMembers.length}
                </div>
                <p
                  className="mt-2"
                  style={{ color: activeTheme.textSecondary }}
                >
                  Active members
                </p>
              </div>

              <div
                className="border rounded-xl p-6 py-6 px-6 md:px-4 lg:px-6"
                style={{
                  backgroundColor: activeTheme.primaryTransparent,
                  borderColor: activeTheme.border,
                }}
              >
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <FileText size={32} color={activeTheme.primary} />
                  <h3
                    className="mt-2 sm:mt-0 ml-4 md:ml-1 lg:ml-4 text-xl md:text-lg lg:text-xl font-semibold break-words"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    Files
                  </h3>
                </div>
                <div
                  className="mt-4 text-3xl font-bold"
                  style={{ color: activeTheme.primary }}
                >
                  {files.length}
                </div>
                <p
                  className="mt-2"
                  style={{ color: activeTheme.textSecondary }}
                >
                  Total files
                </p>
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
                  className="px-4 py-2 rounded-lg font-medium hover:cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.primary,
                    color: "#FFF",
                  }}
                >
                  Enter File Data
                </button>
              </div>

              <div
                className="border rounded-xl overflow-hidden"
                style={{ borderColor: activeTheme.border }}
              >
                <table className="w-full">
                  <thead
                    style={{ backgroundColor: activeTheme.primaryTransparent }}
                  >
                    <tr>
                      <th
                        className="text-left p-4"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Name
                      </th>
                      <th
                        className="text-left p-4"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Type
                      </th>
                      <th
                        className="text-left p-4"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Size
                      </th>
                      <th
                        className="text-left p-4 hidden sm:block"
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
                        style={{ borderColor: activeTheme.border }}
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
                          className="p-4 hidden sm:block"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div
                className="border rounded-xl p-6"
                style={{
                  backgroundColor: activeTheme.surface,
                  borderColor: activeTheme.border,
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Daily Traffic Overview
                </h3>
                <div className="flex items-end h-40 gap-2 mt-6">
                  {[65, 80, 60, 72, 68, 90, 85].map((value, index) => (
                    <div
                      key={index}
                      className="flex-1"
                      style={{
                        height: `${value}%`,
                        backgroundColor: activeTheme.primary,
                        borderRadius: "4px",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <span
                        key={day}
                        style={{ color: activeTheme.textSecondary }}
                      >
                        {day}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div
                id="metrics"
                className="border rounded-xl p-6"
                style={{
                  backgroundColor: activeTheme.surface,
                  borderColor: activeTheme.border,
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: activeTheme.textPrimary }}
                >
                  User Engagement Daily Variations
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      metric: "Avg. Active Users",
                      value: "1,248",
                      change: "+12.4%",
                    },
                    {
                      metric: "Avg. Session Duration",
                      value: "4m 32s",
                      change: "+3.2%",
                    },
                    { metric: "Bounce Rate", value: "28.3%", change: "-2.1%" },
                    {
                      metric: "Conversion Rate",
                      value: "5.7%",
                      change: "+1.8%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span style={{ color: activeTheme.textPrimary }}>
                        {item.metric}
                      </span>
                      <div className="flex items-center">
                        <span
                          className="font-semibold mr-2"
                          style={{ color: activeTheme.textPrimary }}
                        >
                          {item.value}
                        </span>
                        <span
                          style={{
                            color: item.change.startsWith("+")
                              ? "#10B981"
                              : "#EF4444",
                            backgroundColor: item.change.startsWith("+")
                              ? "rgba(16, 185, 129, 0.1)"
                              : "rgba(239, 68, 68, 0.1)",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "0.875rem",
                          }}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
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
              Team Review
            </h1>
            <p className="text-lg" style={{ color: activeTheme.textSecondary }}>
              Review your team members and their roles within the organization.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {teamMembers.map((member: TeamMember, index: number) => (
                <div
                  key={index}
                  className="border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 transition-transform hover:scale-[1.02] min-w-[260px]"
                  style={{
                    backgroundColor: activeTheme.surface,
                    borderColor: activeTheme.border,
                  }}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={member.imageURL}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-2"
                      style={{ borderColor: activeTheme.primary }}
                    />
                  </div>
                  <div className="text-center sm:text-left">
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
                      className="text-sm mt-1"
                      style={{ color: activeTheme.primary }}
                    >
                      {member.email}
                    </p>
                  </div>
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
                className="border rounded-xl p-6 min-w-[240px]"
                style={{
                  backgroundColor: activeTheme.surface,
                  borderColor: activeTheme.border,
                }}
              >
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div
                      className="mr-4 p-3 rounded-full"
                      style={{
                        backgroundColor: activeTheme.primaryTransparent,
                      }}
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
                      <p
                        className="mt-2 text-sm"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Typically responds within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div
                      className="mr-4 p-3 rounded-full"
                      style={{
                        backgroundColor: activeTheme.primaryTransparent,
                      }}
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
                      <p
                        className="mt-2 text-sm"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Get help from our user community
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div
                      className="mr-4 p-3 rounded-full"
                      style={{
                        backgroundColor: activeTheme.primaryTransparent,
                      }}
                    >
                      <FileText size={24} color={activeTheme.primary} />
                    </div>
                    <div>
                      <h3
                        className="font-medium"
                        style={{ color: activeTheme.textPrimary }}
                      >
                        Knowledge Base
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        docs.nexusapp.com
                      </p>
                      <p
                        className="mt-2 text-sm"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Guides and documentation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="border rounded-xl p-6 min-w-[240px]"
                style={{
                  backgroundColor: activeTheme.surface,
                  borderColor: activeTheme.border,
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
                        className="block mb-1"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 rounded-lg border"
                        style={{
                          backgroundColor: activeTheme.background,
                          borderColor: contactErrors.name
                            ? "#EF4444"
                            : activeTheme.border,
                          color: activeTheme.textPrimary,
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
                        className="block mb-1"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 rounded-lg border"
                        style={{
                          backgroundColor: activeTheme.background,
                          borderColor: contactErrors.email
                            ? "#EF4444"
                            : activeTheme.border,
                          color: activeTheme.textPrimary,
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
                        className="block mb-1"
                        style={{ color: activeTheme.textSecondary }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full p-3 rounded-lg border"
                        style={{
                          backgroundColor: activeTheme.background,
                          borderColor: contactErrors.message
                            ? "#EF4444"
                            : activeTheme.border,
                          color: activeTheme.textPrimary,
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
                        className="px-4 py-2 rounded-lg font-medium flex items-center justify-center min-w-[150px] transition-all hover:cursor-pointer"
                        style={{
                          backgroundColor: isSubmitted
                            ? "#10B981"
                            : activeTheme.primary,
                          color: "#FFF",
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
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: activeTheme.textPrimary }}
            >
              Dashboard
            </h1>
            <p
              className="text-lg mt-2"
              style={{ color: activeTheme.textSecondary }}
            >
              Welcome to the application dashboard.
            </p>
          </div>
        );
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      <style>
        {`
        /* cyrillic-ext */
        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCm3FwrK3iLTcvnUwkT9nA2.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCm3FwrK3iLTcvnUwAT9nA2.woff2) format('woff2');
          unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* greek-ext */
        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCm3FwrK3iLTcvnUwgT9nA2.woff2) format('woff2');
          unicode-range: U+1F00-1FFF;
        }
        /* greek */
        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCm3FwrK3iLTcvnUwcT9nA2.woff2) format('woff2');
          unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCm3FwrK3iLTcvnUwsT9nA2.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCm3FwrK3iLTcvnUwoT9nA2.woff2) format('woff2');
          unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCm3FwrK3iLTcvnUwQT9g.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvvYwYL8g.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvmYwYL8g.woff2) format('woff2');
          unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* greek-ext */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvuYwYL8g.woff2) format('woff2');
          unicode-range: U+1F00-1FFF;
        }
        /* greek */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvhYwYL8g.woff2) format('woff2');
          unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvtYwYL8g.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvsYwYL8g.woff2) format('woff2');
          unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcviYwY.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* Aplicación de la fuente a la app */
        :root, body, button, input, select, textarea {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
      </style>
      <div
        className="flex h-screen transition-colors duration-300"
        style={{ backgroundColor: activeTheme.background }}
      >
        {/* MOBILE MENU TOGGLE */}
        <button
          className={`fixed top-4 z-50 md:hidden p-3 rounded-xl shadow-lg hover:cursor-pointer transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "left-[13.5rem]" : "left-4"
          }`}
          style={{
            backgroundColor: activeTheme.surface,
            border: `1px solid ${activeTheme.border}`,
          }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XButton size={24} color={activeTheme.primary} />
          ) : (
            <Menu size={24} color={activeTheme.primary} />
          )}
        </button>

        {/* SIDEBAR */}
        <div
          className={`fixed md:relative z-40 h-screen transition-all duration-300 ease-in-out shadow-xl
          ${isCollapsed ? "w-20" : "w-72"} 
          ${isMobileMenuOpen ? "left-0" : "-left-full md:left-0"}
          border-r md:max-w-[240px] lg:max-w-[287px]`}
          style={{
            backgroundColor: activeTheme.surface,
            borderColor: activeTheme.border,
          }}
        >
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: activeTheme.border }}
          >
            {!isCollapsed && (
              <div
                className="text-2xl font-bold"
                style={{ color: activeTheme.primary }}
              >
                NexusApp
              </div>
            )}
            <button
              className="p-2 rounded-lg transition-all hidden md:block hover:bg-opacity-20 hover:cursor-pointer"
              style={{ backgroundColor: activeTheme.primaryTransparent }}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight color={activeTheme.primary} />
              ) : (
                <ChevronLeft color={activeTheme.primary} />
              )}
            </button>
          </div>

          <div className="py-4 overflow-y-auto h-[calc(100vh-180px)]">
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
                    setIsMobileMenuOpen(false);
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
                    <div className="flex items-center justify-between w-full">
                      <span>{item.label}</span>
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
                          setIsMobileMenuOpen(false);
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

          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="relative group">
              <button
                className="flex items-center justify-center w-full p-3 rounded-xl transition-all border hover:bg-opacity-20 hover:cursor-pointer"
                style={{
                  backgroundColor: activeTheme.surface,
                  borderColor: activeTheme.border,
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
                {!isCollapsed && (
                  <span
                    className="ml-3 font-medium"
                    style={{ color: activeTheme.textPrimary }}
                  >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                )}
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
                    color: activeTheme.surface,
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
        </div>

        {/* MAIN CONTENT */}
        <main
          className={`flex-1 transition-all duration-300 overflow-y-auto`}
          style={{ backgroundColor: activeTheme.background }}
        >
          <div className="p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
              <div
                className="border rounded-2xl p-8 shadow-lg mb-8"
                style={{
                  backgroundColor: activeTheme.surface,
                  borderColor: activeTheme.border,
                }}
              >
                {renderPageContent({ files, teamMembers })}
              </div>
            </div>
          </div>
        </main>
        {/* MODAL FORM */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div
              className="rounded-2xl shadow-xl w-full max-w-lg mx-4"
              style={{
                backgroundColor: activeTheme.surface,
                border: `1px solid ${activeTheme.border}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER*/}
              <div
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: activeTheme.border }}
              >
                <h2
                  className="text-2xl font-bold"
                  style={{ color: activeTheme.textPrimary }}
                >
                  Add New File Data
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full hover:bg-opacity-20 hover:cursor-pointer"
                  style={{ backgroundColor: activeTheme.primaryTransparent }}
                >
                  <XButton size={20} color={activeTheme.primary} />
                </button>
              </div>

              {/* MODAL BODY FORM*/}
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
                        backgroundColor: activeTheme.background,
                        borderColor: formErrors.name
                          ? "#EF4444"
                          : activeTheme.border,
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
                        className="w-full p-3 rounded-lg border appearance-none"
                        style={{
                          backgroundColor: activeTheme.background,
                          borderColor: activeTheme.border,
                          color: activeTheme.textPrimary,
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236c757d' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option>PDF</option>
                        <option>DOCX</option>
                        <option>XLSX</option>
                        <option>ZIP</option>
                        <option>OTHER</option>
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
                          backgroundColor: activeTheme.background,
                          borderColor: formErrors.size
                            ? "#EF4444"
                            : activeTheme.border,
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

                {/* MODAL FOOTER */}
                <div
                  className="flex justify-end p-6 border-t space-x-4"
                  style={{
                    borderColor: activeTheme.border,
                    backgroundColor: activeTheme.background,
                    borderBottomLeftRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 rounded-lg font-medium hover:bg-opacity-20 hover:cursor-pointer"
                    style={{
                      backgroundColor: activeTheme.surface,
                      color: activeTheme.textPrimary,
                      border: `1px solid ${activeTheme.border}`,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg font-medium hover:bg-opacity-20 hover:cursor-pointer"
                    style={{
                      backgroundColor: activeTheme.primary,
                      color: "#FFFFFF",
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
