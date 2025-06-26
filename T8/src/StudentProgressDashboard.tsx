import React, { useState, useMemo, useEffect, useRef, forwardRef } from "react";

// TYPE DEFINITIONS
type Subject = "Reading" | "Writing" | "Math" | "Science";
interface StudentProgress {
  comprehension: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
}
interface Student {
  id: number;
  name: string;
  avatarUrl: string;
  progress: Record<Subject, number>;
  readingSkills: StudentProgress;
}

// SVG ICON COMPONENTS
const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="#9810fa"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.2083 7.82141L12.5083 12.2814C12.1983 12.4614 11.8083 12.4614 11.4883 12.2814L3.78826 7.82141C3.23826 7.50141 3.09826 6.75141 3.51826 6.28141C3.80826 5.95141 4.13826 5.68141 4.48826 5.49141L9.90826 2.49141C11.0683 1.84141 12.9483 1.84141 14.1083 2.49141L19.5283 5.49141C19.8783 5.68141 20.2083 5.96141 20.4983 6.28141C20.8983 6.75141 20.7583 7.50141 20.2083 7.82141Z"
      fill="#9810fa"
    />
    <path
      d="M11.4305 14.1389V20.9589C11.4305 21.7189 10.6605 22.2189 9.98047 21.8889C7.92047 20.8789 4.45047 18.9889 4.45047 18.9889C3.23047 18.2989 2.23047 16.5589 2.23047 15.1289V9.9689C2.23047 9.1789 3.06047 8.6789 3.74047 9.0689L10.9305 13.2389C11.2305 13.4289 11.4305 13.7689 11.4305 14.1389Z"
      fill="#9810fa"
    />
    <path
      d="M12.5703 14.1389V20.9589C12.5703 21.7189 13.3403 22.2189 14.0203 21.8889C16.0803 20.8789 19.5503 18.9889 19.5503 18.9889C20.7703 18.2989 21.7703 16.5589 21.7703 15.1289V9.9689C21.7703 9.1789 20.9403 8.6789 20.2603 9.0689L13.0703 13.2389C12.7703 13.4289 12.5703 13.7689 12.5703 14.1389Z"
      fill="#9810fa"
    />
  </svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16m-7 6h7"
    />{" "}
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />{" "}
  </svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />{" "}
  </svg>
);
const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    />{" "}
  </svg>
);
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
    />{" "}
  </svg>
);
const UserPlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.75 20.25a7.5 7.5 0 0 1 15 0"
    />{" "}
  </svg>
);

// SVG ICON COMPONENTS
const ShareIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9810fa"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9810fa"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CommunityIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9810fa"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// MOCK DATA
const initialStudentsData: Student[] = [
  {
    id: 1,
    name: "Olivia Chen",
    avatarUrl: `https://i.imghippo.com/files/WiD2072mSA.jpg`,
    progress: { Reading: 85, Writing: 92, Math: 78, Science: 88 },
    readingSkills: {
      comprehension: 90,
      fluency: 80,
      grammar: 88,
      vocabulary: 82,
    },
  },
  {
    id: 2,
    name: "Benjamin Carter",
    avatarUrl: `https://i.imghippo.com/files/Uqb1323Ch.jpg`,
    progress: { Reading: 78, Writing: 85, Math: 95, Science: 82 },
    readingSkills: {
      comprehension: 75,
      fluency: 85,
      grammar: 80,
      vocabulary: 72,
    },
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    avatarUrl: `https://i.imghippo.com/files/MqPt8642Ybg.jpg`,
    progress: { Reading: 92, Writing: 88, Math: 81, Science: 90 },
    readingSkills: {
      comprehension: 95,
      fluency: 90,
      grammar: 85,
      vocabulary: 94,
    },
  },
];
const classAchievements = [
  {
    title: "Top Readers",
    icon: BookOpenIcon,
    description: "Recognized consistent reading progress.",
  },
  {
    title: "Math Whizzes",
    icon: ChartBarIcon,
    description: "Showcasing exceptional analytical skills.",
  },
  {
    title: "Creative Writers",
    icon: SparklesIcon,
    description: "Praised for exceptional storytelling ability.",
  },
];
const subjectColors: Record<
  Subject,
  { light: string; dark: string; extraLight: string; textColor: string }
> = {
  Reading: {
    extraLight: "bg-purple-200",
    light: "bg-purple-400",
    dark: "bg-purple-600",
    textColor: "text-purple-600",
  },
  Writing: {
    extraLight: "bg-indigo-200",
    light: "bg-indigo-400",
    dark: "bg-indigo-600",
    textColor: "text-indigo-600",
  },
  Math: {
    extraLight: "bg-sky-200",
    light: "bg-sky-400",
    dark: "bg-sky-600",
    textColor: "text-sky-600",
  },
  Science: {
    extraLight: "bg-teal-200",
    light: "bg-teal-400",
    dark: "bg-teal-600",
    textColor: "text-teal-600",
  },
};
const ALL_SUBJECTS = Object.keys(subjectColors) as Subject[];

// HELPER COMPONENTS
const ProgressBar = ({
  value,
  colorClass,
}: {
  value: number;
  colorClass: string;
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 50);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
      {" "}
      <div
        className={`${colorClass} h-2.5 rounded-full`}
        style={{
          width: `${animatedValue}%`,
          transition: "width 1000ms ease-out",
        }}
      ></div>{" "}
    </div>
  );
};

const ComparisonBar = ({
  studentValue,
  averageValue,
  studentColorClass,
  averageColorClass = "bg-slate-400",
}: {
  studentValue: number;
  averageValue: number;
  studentColorClass: string;
  averageColorClass?: string;
}) => {
  const [animatedStudentValue, setAnimatedStudentValue] = useState(0);
  const [animatedAverageValue, setAnimatedAverageValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStudentValue(studentValue);
      setAnimatedAverageValue(averageValue);
    }, 50);
    return () => clearTimeout(timer);
  }, [studentValue, averageValue]);

  return (
    <div className="w-full bg-white border border-slate-300 rounded-full h-4 relative overflow-hidden">
      <div
        className={`${averageColorClass} h-full rounded-full absolute top-0 left-0`}
        style={{
          width: `${animatedAverageValue}%`,
          transition: "width 1000ms ease-out",
        }}
      />
      <div
        className={`${studentColorClass} h-full rounded-full absolute top-0 left-0`}
        style={{
          width: `${animatedStudentValue}%`,
          transition: "width 1000ms ease-out",
        }}
      />
    </div>
  );
};

// HEADER COMPONENT
const AppHeader = forwardRef<HTMLElement, { onNavigate: (id: string) => void }>(
  ({ onNavigate }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
      { id: "class-overview", label: "Class Overview" },
      { id: "class-achievements", label: "Class Achievements" },
      { id: "add-student", label: "Add Student" },
      { id: "student-review", label: "Student Review" },
    ];

    const handleNavClick = (id: string) => {
      onNavigate(id);
      setIsMenuOpen(false);
    };

    return (
      <header ref={ref} className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-5xl lg:max-w-7xl 2xl:max-w-screen-2xl">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <LogoIcon className="h-8 w-8" />
              <span className="text-xl font-bold text-slate-800">
                Learnlytics
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                <span className="sr-only">Open menu</span>
                {isMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    );
  }
);
AppHeader.displayName = "AppHeader";

// FOOTER COMPONENT
const AppFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-5xl lg:max-w-7xl 2xl:max-w-screen-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <div className="flex items-center gap-4">
            <p className="p-2 text-md">Follow us on</p>
            <div className="p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors">
              <ShareIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors">
              <MessageIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors">
              <CommunityIcon className="w-5 h-5 text-slate-500" />
            </div>
          </div>

          <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-600">
                Platform Status:
              </p>
              <span className="text-sm font-medium text-purple-600">
                Operational
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Secure & Encrypted Data Environment
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// MAIN APP COMPONENT
const StudentProgressDashboard = () => {
  const [students, setStudents] = useState(initialStudentsData);
  const [selectedStudentId, setSelectedStudentId] = useState<number>(
    students[0]?.id
  );
  const [isReadingSkillsOpen, setReadingSkillsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [studentDetailOpacity, setStudentDetailOpacity] = useState(0);

  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentScores, setNewStudentScores] = useState<
    Record<Subject, string>
  >({ Reading: "", Writing: "", Math: "", Science: "" });
  const [errors, setErrors] = useState<
    Partial<Record<Subject | "name", string>>
  >({});

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedStudentId),
    [selectedStudentId, students]
  );

  const classAverageProgress = useMemo(() => {
    const totals: Record<Subject, number> = {
      Reading: 0,
      Writing: 0,
      Math: 0,
      Science: 0,
    };
    const averages: Record<Subject, number> = {
      Reading: 0,
      Writing: 0,
      Math: 0,
      Science: 0,
    };
    const studentCount = students.length;
    if (studentCount === 0) return averages;
    for (const student of students) {
      for (const subject of ALL_SUBJECTS) {
        totals[subject] += student.progress[subject];
      }
    }
    for (const subject of ALL_SUBJECTS) {
      averages[subject] = Math.round(totals[subject] / studentCount);
    }
    return averages;
  }, [students]);

  useEffect(() => {
    setStudentDetailOpacity(0);
    const timer = setTimeout(() => {
      setStudentDetailOpacity(1);
    }, 100);
    if (!students.find((s) => s.id === selectedStudentId)) {
      setSelectedStudentId(students[0]?.id);
    }
    return () => clearTimeout(timer);
  }, [selectedStudent, students, selectedStudentId]);

  const averageStudentScore = useMemo(() => {
    if (!selectedStudent) return 0;
    const scores = Object.values(selectedStudent.progress);
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }, [selectedStudent]);

  const validateForm = () => {
    const newErrors: Partial<Record<Subject | "name", string>> = {};
    if (!newStudentName.trim()) {
      newErrors.name = "Enter a name.";
    }
    for (const subject of ALL_SUBJECTS) {
      const score = newStudentScores[subject];
      if (!score.trim()) {
        newErrors[subject] = "Required Grade.";
      } else if (isNaN(Number(score))) {
        newErrors[subject] = "It must be a number.";
      } else if (Number(score) < 0 || Number(score) > 100) {
        newErrors[subject] = "The number range is 0-100.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const readingScore = Number(newStudentScores.Reading);
    const generateBalancedSkills = (baseScore: number): StudentProgress => {
      const totalPoints = baseScore * 4;
      const skills: number[] = [];
      let remainingPoints = totalPoints;

      for (let i = 0; i < 3; i++) {
        const remainingSlots = 4 - i;
        const max = Math.min(100, remainingPoints - 0 * (remainingSlots - 1));
        const min = Math.max(0, remainingPoints - 100 * (remainingSlots - 1));
        const skillValue = Math.round(Math.random() * (max - min) + min);

        skills.push(skillValue);
        remainingPoints -= skillValue;
      }
      skills.push(remainingPoints);
      for (let i = skills.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [skills[i], skills[j]] = [skills[j], skills[i]];
      }

      return {
        comprehension: skills[0],
        fluency: skills[1],
        grammar: skills[2],
        vocabulary: skills[3],
      };
    };

    const newId = Date.now();
    const newStudent: Student = {
      id: newId,
      name: newStudentName.trim(),
      avatarUrl: `https://i.imghippo.com/files/xSlQ3437.jpg`,
      progress: {
        Reading: readingScore,
        Writing: Number(newStudentScores.Writing),
        Math: Number(newStudentScores.Math),
        Science: Number(newStudentScores.Science),
      },
      readingSkills: generateBalancedSkills(readingScore),
    };

    setStudents([...students, newStudent]);
    setSelectedStudentId(newId);
    setReadingSkillsOpen(true);
    setNewStudentName("");
    setNewStudentScores({ Reading: "", Writing: "", Math: "", Science: "" });
    setErrors({});
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;

      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>
        {`
            /* Import Jost font */
            @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');
            
            body, :root {
                font-family: 'Jost', sans-serif;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                
                scrollbar-color: #9333ea #e2e8f0;
                scrollbar-width: thin;
            }

            body {
                overflow-x: hidden;
            }
            
            ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }

            ::-webkit-scrollbar-track {
                background: #e2e8f0;
            }

            ::-webkit-scrollbar-thumb {
                background-color: #9333ea; 
                border-radius: 20px;
                border: 2px solid #e2e8f0;
            }

            ::-webkit-scrollbar-thumb:hover {
                background-color: #7e22ce;
            }
            `}
      </style>
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <AppHeader ref={headerRef} onNavigate={handleScrollToSection} />

        <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 md:max-w-5xl lg:max-w-7xl 2xl:max-w-screen-2xl">
          <main className="flex flex-col md:flex-row md:justify-center md:items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 pt-6">
            <div className="w-full md:w-[469px] lg:w-[629px] xl:w-[789px] 2xl:w-[949px] flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 transition-all duration-500 ease-in-out">
              <div
                id="class-overview"
                className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
                  isMounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h2 className="text-xl font-bold mb-1">Class Overview</h2>
                <p className="text-slate-500 mb-6 text-sm">
                  Average performance across all subjects.
                </p>

                <div className="mt-2 space-y-5">
                  <div className="flex w-full h-4 rounded-full overflow-hidden bg-slate-200">
                    {Object.entries(classAverageProgress).map(
                      ([subject, score]) => (
                        <div
                          key={subject}
                          className={`${
                            subjectColors[subject as Subject].dark
                          } transition-all duration-500 ease-out`}
                          style={{ width: `${score}%` }}
                        ></div>
                      )
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
                    {Object.entries(classAverageProgress).map(
                      ([subject, score]) => (
                        <div key={subject} className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-sm ${
                              subjectColors[subject as Subject].dark
                            }`}
                          ></div>
                          <div>
                            <p className="font-semibold text-slate-700 text-sm">
                              {subject}
                            </p>
                            <p className="text-slate-500 text-sm font-medium">
                              {score}%
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div
                id="class-achievements"
                className={`bg-white p-6 rounded-2xl shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
                  isMounted
                    ? "opacity-100 translate-y-0 delay-300"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">Class Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {classAchievements.map((ach, index) => (
                    <div
                      key={index}
                      className="flex items-start md:flex-col md:items-center lg:flex-row lg:items-start gap-4 p-2 rounded-lg transition-colors hover:bg-slate-50 group"
                    >
                      {" "}
                      <div className="flex-shrink-0 bg-purple-100 text-purple-600 rounded-lg p-3 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-5deg]">
                        {" "}
                        <ach.icon className="w-6 h-6" />{" "}
                      </div>{" "}
                      <div className="md:text-center lg:text-left">
                        {" "}
                        <h3 className="font-semibold text-slate-800">
                          {ach.title}
                        </h3>{" "}
                        <p className="text-sm text-slate-500 mt-1">
                          {ach.description}
                        </p>{" "}
                      </div>{" "}
                    </div>
                  ))}
                </div>
              </div>

              <div
                id="add-student"
                className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
                  isMounted
                    ? "opacity-100 translate-y-0 delay-[450ms]"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-shrink-0 bg-purple-100 text-purple-600 rounded-lg p-3">
                    <UserPlusIcon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold">Add New Student</h2>
                </div>
                <form onSubmit={handleAddStudent} noValidate>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="studentName"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Student Name
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        className="w-full bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                        placeholder="e.g., Alex Doe"
                        maxLength={15}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {ALL_SUBJECTS.map((subject) => (
                        <div key={subject}>
                          {" "}
                          <label
                            htmlFor={subject}
                            className="block text-sm font-medium text-slate-700 mb-1"
                          >
                            {subject}
                          </label>{" "}
                          <input
                            type="number"
                            id={subject}
                            value={newStudentScores[subject]}
                            onChange={(e) =>
                              setNewStudentScores({
                                ...newStudentScores,
                                [subject]: e.target.value,
                              })
                            }
                            className="w-full bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                            placeholder="0-100"
                            min="0"
                            max="100"
                          />
                          {errors[subject] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[subject]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm">A placeholder image will be added</p>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                    >
                      Add Student
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full md:w-[219px] lg:w-[299px] xl:w-[379px] 2xl:w-[459px] transition-all duration-500 ease-in-out">
              <div
                id="student-review"
                className={`bg-white p-6 rounded-2xl shadow-sm transition-all duration-700 ease-out hover:shadow-lg ${
                  isMounted
                    ? "opacity-100 translate-y-0 delay-[600ms]"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">Student Review</h2>
                <div className="relative">
                  <select
                    value={selectedStudentId || ""}
                    onChange={(e) => {
                      setReadingSkillsOpen(false);
                      setSelectedStudentId(Number(e.target.value));
                    }}
                    className="w-full appearance-none bg-slate-100 border border-slate-200 text-slate-700 text-sm py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  >
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <ChevronDownIcon className="h-5 w-5" />
                  </div>
                </div>
                {selectedStudent && (
                  <div
                    key={selectedStudent.id}
                    style={{
                      transition: "opacity 400ms ease-in-out",
                      opacity: studentDetailOpacity,
                    }}
                  >
                    {" "}
                    <div className="flex items-center md:flex-col lg:flex-row gap-4 mt-6">
                      {" "}
                      <img
                        src={selectedStudent.avatarUrl}
                        alt={selectedStudent.name}
                        className="w-16 h-16 rounded-full shadow-md object-cover border-2 border-white bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-semibold"
                      />{" "}
                      <div className="md:text-center lg:text-left">
                        {" "}
                        <h3 className="text-lg font-bold text-slate-900">
                          {selectedStudent.name}
                        </h3>{" "}
                        <p className="text-sm text-slate-500">
                          Overall Score:{" "}
                          <span className="font-bold text-purple-600">
                            {averageStudentScore.toFixed(0)}%
                          </span>
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="border-t border-slate-200 my-6"></div>{" "}
                    <div>
                      <h3 className="text-lg font-bold mb-4">
                        Progress Comparison
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-slate-600 mb-5">
                        <div className="flex items-center gap-2">
                          <div className="flex w-12 h-3 rounded-sm overflow-hidden">
                            {(Object.keys(subjectColors) as Subject[]).map(
                              (subject) => (
                                <div
                                  key={subject}
                                  className={`w-1/4 h-full ${subjectColors[subject].dark}`}
                                />
                              )
                            )}
                          </div>
                          <span>Student Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-slate-400"></div>
                          <span>Class Average</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {(
                          Object.keys(selectedStudent.progress) as Subject[]
                        ).map((subject) => (
                          <div key={subject}>
                            <div className="flex justify-between items-baseline mb-2">
                              <h4 className="text-md font-semibold text-slate-800">
                                {subject}
                              </h4>
                              <div className="text-xs font-medium space-x-2">
                                <span
                                  className={`font-bold ${subjectColors[subject].textColor}`}
                                >
                                  {selectedStudent.progress[subject]}%
                                </span>
                                <span className="text-slate-400">/</span>
                                <span className="text-slate-500">
                                  {classAverageProgress[subject]}%
                                </span>
                              </div>
                            </div>
                            <ComparisonBar
                              studentValue={selectedStudent.progress[subject]}
                              averageValue={classAverageProgress[subject]}
                              studentColorClass={subjectColors[subject].dark}
                            />
                          </div>
                        ))}
                      </div>
                    </div>{" "}
                    <div className="border-t border-slate-200 my-6"></div>{" "}
                    <div>
                      {" "}
                      <button
                        className="w-full flex justify-between items-center p-2 text-left rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        onClick={() =>
                          setReadingSkillsOpen(!isReadingSkillsOpen)
                        }
                        aria-expanded={isReadingSkillsOpen}
                        aria-controls="reading-skills-panel"
                      >
                        {" "}
                        <h2 className="text-lg font-bold">
                          Reading Skills Details
                        </h2>{" "}
                        <ChevronDownIcon
                          className={`w-6 h-6 text-slate-500 transition-transform duration-300 ease-in-out ${
                            isReadingSkillsOpen ? "rotate-180" : ""
                          }`}
                        />{" "}
                      </button>{" "}
                      <div
                        id="reading-skills-panel"
                        className={`transition-all duration-500 ease-in-out grid ${
                          isReadingSkillsOpen
                            ? "grid-rows-[1fr] opacity-100 mt-2"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        {" "}
                        <div className="overflow-hidden">
                          {" "}
                          <div className="pt-2 pb-2 px-2 grid grid-cols-1 gap-x-8 gap-y-4">
                            {Object.entries(selectedStudent.readingSkills).map(
                              ([skill, value]) => (
                                <div key={`${selectedStudent.id}-${skill}`}>
                                  {" "}
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-slate-600 capitalize">
                                      {skill}
                                    </span>
                                    <span className="text-sm font-bold text-slate-800">
                                      {value}%
                                    </span>
                                  </div>{" "}
                                  <ProgressBar
                                    value={value}
                                    colorClass={subjectColors["Reading"].dark}
                                  />{" "}
                                </div>
                              )
                            )}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        <AppFooter />
      </div>
    </>
  );
};

export default StudentProgressDashboard;
