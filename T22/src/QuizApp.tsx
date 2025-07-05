import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  FaPlay,
  FaClock,
  FaTrophy,
  FaChartLine,
  FaCalendarAlt,
  FaQuestionCircle,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";

interface ScoreHistoryItem {
  date: string;
  score: number;
  time: number;
}

interface QuizData {
  averageScore: number;
  highestScore: number;
  averageTimeMinutes: number;
  totalQuizzes: number;
  streak: number;
  scoreHistory: ScoreHistoryItem[];
  quizDates: string[];
  todayQuizTaken: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface PerformanceCardProps {
  title: string;
  value: string;
  subtitle: string;
  chartData: ScoreHistoryItem[];
  chartType?: "line" | "bar";
  color?: string;
  icon: React.ReactNode;
  dataKey?: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number, timeTaken: number) => void;
}

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DayInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string | null;
  dayData: ScoreHistoryItem | null;
}

interface CalendarProps {
  quizDates: string[];
  scoreHistory: ScoreHistoryItem[];
}

interface TodayQuizButtonProps {
  isCompleted: boolean;
  onClick: () => void;
}

interface RecentQuizzesProps {
  scoreHistory: ScoreHistoryItem[];
}

const generateMockData = (): QuizData => {
  const today = new Date();
  const scoreHistory: ScoreHistoryItem[] = [];
  const quizDates: string[] = [];

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  for (let i = 7; i >= 1; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = formatDate(date);

    scoreHistory.push({
      date: dateStr,
      score: Math.floor(Math.random() * 25) + 75,
      time: Math.floor(Math.random() * 4) + 2,
    });
    quizDates.push(dateStr);
  }

  const averageScore =
    scoreHistory.length > 0
      ? scoreHistory.reduce((acc, item) => acc + item.score, 0) /
        scoreHistory.length
      : 0;

  return {
    averageScore,
    highestScore:
      scoreHistory.length > 0
        ? Math.max(...scoreHistory.map((item) => item.score))
        : 0,
    averageTimeMinutes:
      scoreHistory.length > 0
        ? scoreHistory.reduce((acc, item) => acc + item.time, 0) /
          scoreHistory.length
        : 0,
    totalQuizzes: scoreHistory.length,
    streak: scoreHistory.length,
    scoreHistory,
    quizDates,
    todayQuizTaken: false,
  };
};

const mockQuizData = generateMockData();

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    id: 3,
    question: "What is 15 + 27?",
    options: ["41", "42", "43", "44"],
    correct: 1,
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
    correct: 2,
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
];

const EnhancedChart = ({
  data,
  type = "line",
  color = "#6366f1",
  dataKey = "score",
}: {
  data: ScoreHistoryItem[];
  type?: "line" | "bar";
  color?: string;
  dataKey?: string;
}) => {
  const tooltipStyle = {
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    borderRadius: "12px",
    color: "#e5e7eb",
    padding: "8px 12px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  };

  const tooltipFormatter = (value: number, name: string) => [
    value,
    dataKey === "score" ? "Score" : "Time (min)",
  ];

  const tooltipLabelFormatter = (label: string) => `Date: ${label}`;

  if (type === "bar") {
    return (
      <ResponsiveContainer
        width="100%"
        height={120}
        style={{ outline: "none" }}
      >
        <BarChart
          data={data}
          style={{ outline: "none" }}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <XAxis dataKey="date" tick={false} axisLine={false} />
          <YAxis hide />
          <Tooltip
            cursor={false}
            contentStyle={tooltipStyle}
            formatter={tooltipFormatter}
            labelFormatter={tooltipLabelFormatter}
          />
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[4, 4, 0, 0]}
            style={{ outline: "none" }}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={120} style={{ outline: "none" }}>
      <LineChart
        data={data}
        style={{ outline: "none" }}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <XAxis dataKey="date" tick={false} axisLine={false} />
        <YAxis hide />
        <Tooltip
          cursor={false}
          contentStyle={tooltipStyle}
          formatter={tooltipFormatter}
          labelFormatter={tooltipLabelFormatter}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={3}
          dot={{ fill: color, r: 4, strokeWidth: 2, stroke: "#1f2937" }}
          activeDot={{
            r: 8,
            fill: color,
            strokeWidth: 2,
            stroke: "#6366f1",
            style: { outline: "none" },
          }}
          style={{ outline: "none" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  subtitle,
  chartData,
  chartType = "line",
  color = "#6366f1",
  icon,
  dataKey = "score",
}) => {
  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-all duration-300">
            {icon}
          </div>
          <div>
            <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
              {value}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <EnhancedChart
          data={chartData}
          type={chartType}
          color={color}
          dataKey={dataKey}
        />
      </div>
      <p className="text-gray-400 text-xs">{subtitle}</p>
    </div>
  );
};

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isOpen && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round(
      (correctAnswers / quizQuestions.length) * 100
    );
    const timeTakenInSeconds = 300 - timeLeft;
    setScore(finalScore);
    setShowResult(true);
    onComplete(finalScore, timeTakenInSeconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeLeft(300);
    setShowResult(false);
    setScore(0);
  };

  const progressPercentage = (currentQuestion / quizQuestions.length) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 transition-all duration-300 ease-in-out animate-fadeIn">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 animate-scaleIn mx-auto">
        {!showResult ? (
          <>
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-white">
                  Today's Quiz
                </h2>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <FaClock className="text-xs sm:text-sm lg:text-base" />
                    <span className="font-mono text-xs sm:text-sm lg:text-lg">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2">
                  <span>
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 lg:p-6">
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-white mb-3 sm:mb-4 lg:mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-2 sm:p-3 lg:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-indigo-500 bg-indigo-500/20 text-white"
                            : "border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700"
                        }`}
                      >
                        <span className="flex items-center gap-2 sm:gap-3">
                          <span
                            className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm ${
                              selectedAnswers[currentQuestion] === index
                                ? "border-indigo-500 bg-indigo-500 text-white"
                                : "border-gray-500"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-xs sm:text-sm lg:text-base">
                            {option}
                          </span>
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3">
                <button
                  onClick={() =>
                    setCurrentQuestion(Math.max(0, currentQuestion - 1))
                  }
                  disabled={currentQuestion === 0}
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-xs sm:text-sm lg:text-base cursor-pointer"
                >
                  <FaArrowLeft className="inline mr-2" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors text-xs sm:text-sm lg:text-base cursor-pointer"
                >
                  {currentQuestion === quizQuestions.length - 1
                    ? "Finish"
                    : "Next"}
                  <FaArrowRight className="inline ml-2" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <FaTrophy className="text-lg sm:text-2xl lg:text-4xl text-indigo-400" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                Quiz Complete!
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                Great job on completing today's quiz
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-indigo-400 mb-2">
                {score}%
              </div>
              <div className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">
                Your Score
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <div className="text-gray-400">Correct Answers</div>
                  <div className="text-white font-semibold">
                    {
                      selectedAnswers.filter(
                        (answer, index) =>
                          answer === quizQuestions[index].correct
                      ).length
                    }
                    /{quizQuestions.length}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Time Taken</div>
                  <div className="text-white font-semibold">
                    {formatTime(300 - timeLeft)}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                resetQuiz();
                onClose();
              }}
              className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-xs sm:text-sm lg:text-base cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out animate-fadeIn">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 animate-scaleIn">
        <div className="p-6 border-b border-gray-700 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              How to Use Quiz Analytics
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <FaPlay /> Taking Quizzes
            </h3>
            <p className="text-gray-300 mb-2">
              Click the "Take Today's Quiz" button to start your daily quiz. You
              have 5 minutes to complete 5 questions.
            </p>
            <p className="text-gray-400 text-sm">
              Note: You can only take one quiz per day. The button will be
              disabled after completion.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <FaChartLine /> Performance Cards
            </h3>
            <p className="text-gray-300 mb-2">
              Track your progress with three key metrics:
            </p>
            <ul className="text-gray-400 text-sm space-y-1 ml-4">
              <li>
                • Average Score: Your overall performance across all quizzes
              </li>
              <li>• Highest Score: Your personal best achievement</li>
              <li>• Average Time: How quickly you complete quizzes</li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">
              Tip: Hover over charts to see detailed data for each day.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <FaCalendarAlt /> Calendar View
            </h3>
            <p className="text-gray-300 mb-2">
              The calendar shows your quiz activity and streaks:
            </p>
            <ul className="text-gray-400 text-sm space-y-1 ml-4">
              <li>• Blue dots: Days you completed a quiz</li>
              <li>
                • Orange borders with blue background: Streak days (consecutive
                quiz days)
              </li>
              <li>• Click any date to see detailed information</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <FaTrophy /> Tips for Success
            </h3>
            <ul className="text-gray-300 text-sm space-y-2 ml-4">
              <li>• Take quizzes daily to build and maintain streaks</li>
              <li>• Try to improve your time while maintaining accuracy</li>
              <li>• Use the charts to identify patterns in your performance</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

const DayInfoModal: React.FC<DayInfoModalProps> = ({
  isOpen,
  onClose,
  date,
  dayData,
}) => {
  if (!isOpen || !date) return null;

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  const isFutureDate = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d > today;
  };

  const isFuture = isFutureDate(new Date(date + "T00:00:00"));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-indigo-500/30 rounded-2xl w-full max-w-sm transform transition-all duration-300 ease-in-out scale-95 animate-scaleIn shadow-2xl shadow-indigo-500/20">
        <div className="p-6 text-center">
          <div className="mb-6">
            <p className="text-sm text-indigo-400 font-medium">
              Quiz Details for
            </p>
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
              {formattedDate}
            </h2>
          </div>
          {isFuture ? (
            <div className="text-gray-400 py-4">
              <FaCalendarAlt className="mx-auto text-5xl text-gray-600 mb-4" />
              <p className="text-lg font-semibold text-yellow-400 mb-1">
                Patience, young learner!
              </p>
              <p className="text-sm text-gray-500">This day is yet to come.</p>
            </div>
          ) : dayData ? (
            <div className="space-y-4">
              <div className="bg-white/5 border border-indigo-500/20 rounded-xl p-4 flex flex-col items-center justify-center backdrop-blur-sm">
                <FaTrophy className="text-yellow-400 text-2xl mb-2" />
                <div className="text-4xl font-bold text-white">
                  {dayData.score}%
                </div>
                <div className="text-gray-400 text-sm">Quiz Score</div>
              </div>
              <div className="bg-white/5 border border-purple-500/20 rounded-xl p-4 flex flex-col items-center justify-center backdrop-blur-sm">
                <FaClock className="text-purple-400 text-2xl mb-2" />
                <div className="text-4xl font-bold text-white">
                  {dayData.time}m
                </div>
                <div className="text-gray-400 text-sm">Time Taken</div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 py-4">
              <FaQuestionCircle className="mx-auto text-5xl text-gray-600 mb-4" />
              <p className="text-lg font-semibold mb-1">A Day of Rest</p>
              <p className="text-sm">No quiz was taken on this day.</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-black/20 border-t border-indigo-500/20">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Calendar: React.FC<CalendarProps> = ({ quizDates, scoreHistory }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayInfo, setShowDayInfo] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (showDayInfo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDayInfo]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    const swipeThreshold = 50;

    if (deltaX > swipeThreshold) {
      navigateMonth("prev");
    } else if (deltaX < -swipeThreshold) {
      navigateMonth("next");
    }

    touchStartX.current = null;
  };

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const currentDay = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return dateOnly > todayOnly;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getStreakClass = (date: Date) => {
    if (isFutureDate(date)) return "";

    const dateStr = formatDate(date);
    const index = quizDates.indexOf(dateStr);
    if (index === -1) return "";

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);

    const hasNextDay =
      quizDates.includes(formatDate(nextDay)) && !isFutureDate(nextDay);
    const hasPrevDay = quizDates.includes(formatDate(prevDay));

    if (hasNextDay || hasPrevDay) {
      return "ring-2 ring-orange-400";
    }
    return "";
  };

  const handleDateClick = (date: Date) => {
    const dateStr = formatDate(date);
    setSelectedDate(dateStr);
    setShowDayInfo(true);
  };

  const selectedDayData = selectedDate
    ? scoreHistory.find((item) => item.date === selectedDate) || null
    : null;

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  return (
    <>
      <div
        className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 lg:p-6 w-full h-full transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Quiz Activity</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all cursor-pointer"
            >
              <FaArrowLeft className="w-3 h-3" />
            </button>
            <h3 className="text-sm font-semibold text-white min-w-[120px] text-center">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all cursor-pointer"
            >
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-gray-400 text-xs font-medium py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isCurrentMonthDate = isCurrentMonth(day);
            const quizForDay = isCurrentMonthDate
              ? scoreHistory.find((item) => item.date === formatDate(day))
              : null;
            const isQuiz = !!quizForDay;
            const isMilestone = quizForDay ? quizForDay.score > 90 : false;
            const isTodayDate = isToday(day);
            const streakClass = isCurrentMonthDate ? getStreakClass(day) : "";
            const isFuture = isFutureDate(day);

            return (
              <div
                key={index}
                onClick={
                  isCurrentMonthDate ? () => handleDateClick(day) : undefined
                }
                className={`
                  aspect-square flex items-center justify-center text-xs rounded-lg transition-all duration-200 m-0.5
                  ${isCurrentMonthDate ? "text-gray-300" : "text-gray-600"}
                  ${
                    isTodayDate && isCurrentMonthDate
                      ? "bg-indigo-500 text-white font-bold"
                      : ""
                  }
                  ${
                    isQuiz && !isTodayDate
                      ? "bg-indigo-600/60 text-white font-semibold hover:bg-indigo-500/80"
                      : ""
                  }
                  ${
                    !isQuiz && !isTodayDate && isCurrentMonthDate
                      ? "hover:bg-gray-700/50"
                      : ""
                  }
                  ${isFuture ? "opacity-50" : ""}
                  ${isCurrentMonthDate ? "cursor-pointer" : "cursor-default"}
                  ${streakClass}
                `}
              >
                {isMilestone ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  day.getDate()
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-600/60 rounded"></div>
            <span className="text-gray-400">Quiz Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-600/60 border-2 border-orange-400 rounded"></div>
            <span className="text-gray-400">Streak Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded"></div>
            <span className="text-gray-400">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="w-3 h-3 text-yellow-400" />
            <span className="text-gray-400">Milestone Day</span>
          </div>
        </div>
      </div>

      <DayInfoModal
        isOpen={showDayInfo}
        onClose={() => setShowDayInfo(false)}
        date={selectedDate}
        dayData={selectedDayData}
      />
    </>
  );
};

const TodayQuizButton: React.FC<TodayQuizButtonProps> = ({
  isCompleted,
  onClick,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={isCompleted ? undefined : onClick}
        disabled={isCompleted}
        className={`
          relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300
          ${
            isCompleted
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-2xl cursor-pointer"
          }
        `}
      >
        {!isCompleted && (
          <>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-75 animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400 animate-ping opacity-20"></div>
          </>
        )}
        <div
          className={`relative flex items-center gap-3 ${
            !isCompleted ? "animate-bounce" : ""
          }`}
        >
          <FaPlay className={isCompleted ? "text-gray-500" : "text-white"} />
          {isCompleted ? "Quiz Completed Today!" : "Take Today's Quiz"}
        </div>
      </button>
    </div>
  );
};

interface NewsletterProps {
  onSubscribe: (email: string) => boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const success = onSubscribe(email);

    if (success) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } else {
      setError("This email has already been subscribed.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-400/30 rounded-2xl p-6 text-center backdrop-blur-lg transition-all duration-300 hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/20">
      <div className="mb-4">
        <FaEnvelope className="text-3xl text-indigo-300 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
        <p className="text-indigo-100 text-sm">
          Get the latest quiz analytics insights delivered to your inbox
        </p>
      </div>

      {!subscribed ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-indigo-300/30 text-white placeholder-indigo-200 focus:outline-none focus:border-indigo-300 focus:bg-white/20 transition-all backdrop-blur-sm"
          />
          {error && <p className="text-red-400 text-xs text-left">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      ) : (
        <div className="text-indigo-200 font-semibold bg-green-500/20 border border-green-400/30 rounded-lg py-3">
          Thanks for subscribing!
        </div>
      )}
    </div>
  );
};

const RecentQuizzes: React.FC<RecentQuizzesProps> = ({ scoreHistory }) => {
  const sortedHistory = [...scoreHistory].sort(
    (a, b) =>
      new Date(b.date + "T00:00:00").getTime() -
      new Date(a.date + "T00:00:00").getTime()
  );

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 lg:p-6 w-full h-full transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 group">
      <h2 className="text-lg font-bold text-white mb-6">Recent Quizzes</h2>

      <div className="space-y-3 max-h-130 overflow-y-auto">
        {sortedHistory.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <FaQuestionCircle className="text-3xl mx-auto mb-3 opacity-50" />
            <p>No quizzes taken yet</p>
            <p className="text-sm">Take your first quiz to see it here!</p>
          </div>
        ) : (
          sortedHistory.map((quiz, index) => {
            const date = new Date(quiz.date + "T00:00:00");
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className="bg-gray-700/50 rounded-xl p-3 transition-all duration-200 hover:bg-gray-700/80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                        quiz.score >= 90
                          ? "bg-green-800"
                          : quiz.score >= 80
                          ? "bg-blue-800"
                          : quiz.score >= 70
                          ? "bg-yellow-800"
                          : "bg-red-800"
                      }`}
                    >
                      {quiz.score}%
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">
                        {isToday ? "Today" : formattedDate}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {quiz.time} minutes
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-sm font-semibold ${
                        quiz.score >= 90
                          ? "text-green-400"
                          : quiz.score >= 80
                          ? "text-blue-400"
                          : quiz.score >= 70
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {quiz.score >= 90
                        ? "Excellent"
                        : quiz.score >= 80
                        ? "Good"
                        : quiz.score >= 70
                        ? "Fair"
                        : "Needs Work"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {sortedHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-center text-gray-400 text-xs">
            Total: {sortedHistory.length} quiz
            {sortedHistory.length !== 1 ? "es" : ""} completed
          </div>
        </div>
      )}
    </div>
  );
};

const QuizApp: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [quizData, setQuizData] = useState(mockQuizData);
  const [showFirstTimeHelp, setShowFirstTimeHelp] = useState(false);
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);

    const hasVisited = localStorage.getItem("quiz-app-visited");
    if (!hasVisited) {
      setShowFirstTimeHelp(true);
      localStorage.setItem("quiz-app-visited", "true");
    }
  }, []);

  useEffect(() => {
    const isModalOpen = showQuizModal || showHelpModal || showFirstTimeHelp;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showQuizModal, showHelpModal, showFirstTimeHelp]);

  const handleSubscribe = (email: string): boolean => {
    if (subscribedEmails.includes(email.toLowerCase())) {
      return false;
    }
    setSubscribedEmails((prevEmails) => [...prevEmails, email.toLowerCase()]);
    return true;
  };

  const handleQuizComplete = (score: number, timeTakenInSeconds: number) => {
    const todayDate = new Date();
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const todayStr = formatDate(todayDate);
    const timeToComplete = Math.ceil(timeTakenInSeconds / 60) || 1;

    const newScoreHistory = [
      ...quizData.scoreHistory,
      { date: todayStr, score, time: timeToComplete },
    ];
    const newQuizDates = [...quizData.quizDates, todayStr];

    let newStreak = 0;
    const sortedDates = [...newQuizDates].sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    let checkDate = new Date();
    for (let i = 0; i < sortedDates.length; i++) {
      const checkDateStr = formatDate(checkDate);
      if (sortedDates.includes(checkDateStr)) {
        newStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    const newQuizData = {
      ...quizData,
      todayQuizTaken: true,
      totalQuizzes: newScoreHistory.length,
      quizDates: newQuizDates,
      scoreHistory: newScoreHistory,
      streak: newStreak,
    };

    newQuizData.averageScore =
      newScoreHistory.reduce((acc, item) => acc + item.score, 0) /
      newScoreHistory.length;
    newQuizData.highestScore = Math.max(
      ...newScoreHistory.map((item) => item.score)
    );
    newQuizData.averageTimeMinutes =
      newScoreHistory.reduce((acc, item) => acc + item.time, 0) /
      newScoreHistory.length;

    setQuizData(newQuizData);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Space Grotesk', sans-serif;
        }

        body {
          background: #1a1a1a;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #2d3748;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }

        .quiz-pattern {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.2) 0%, transparent 50%);
          background-size: 600px 600px, 800px 800px, 1000px 1000px;
          background-position: 0 0, 100% 100%, 50% 50%;
          animation: float 20s ease-in-out infinite;
          mask: radial-gradient(ellipse at center, black 60%, transparent 100%);
          -webkit-mask: radial-gradient(ellipse at center, black 60%, transparent 100%);
        }

        .quiz-pattern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(45deg, transparent 48%, rgba(99, 102, 241, 0.1) 49%, rgba(99, 102, 241, 0.1) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(139, 92, 246, 0.1) 49%, rgba(139, 92, 246, 0.1) 51%, transparent 52%);
          background-size: 60px 60px, 60px 60px;
        }

        @keyframes float {
          0%, 100% { 
            background-position: 0% 0%, 100% 100%, 50% 50%;
          }
          33% { 
            background-position: 30% 30%, 70% 70%, 80% 20%;
          }
          66% { 
            background-position: 70% 70%, 30% 30%, 20% 80%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 relative overflow-x-hidden">
        <div className="fixed inset-0 quiz-pattern opacity-60"></div>

        <div className="relative z-10 px-4 py-4 lg:py-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-8 lg:mb-12 animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1"></div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
                  Quiz Performance
                  <span className="block text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                    Analytics
                  </span>
                </h1>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => setShowHelpModal(true)}
                  className="p-3 rounded-full bg-gray-800 border-2 border-gray-700 text-indigo-400 hover:bg-gray-700 hover:text-indigo-300 transition-all duration-300 backdrop-blur-lg cursor-pointer"
                >
                  <FaQuestionCircle size={20} />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              Track your learning progress with detailed insights and
              performance metrics
            </p>
          </div>

          <TodayQuizButton
            isCompleted={quizData.todayQuizTaken}
            onClick={() => setShowQuizModal(true)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-2 border-indigo-500/50 rounded-2xl p-4 lg:p-6 text-center backdrop-blur-lg transition-all duration-300 hover:border-indigo-400/70 hover:shadow-2xl hover:shadow-indigo-500/20 group">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                {quizData.totalQuizzes}
              </div>
              <div className="text-indigo-400 text-sm font-medium">
                Total Quizzes
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border-2 border-emerald-500/50 rounded-2xl p-4 lg:p-6 text-center backdrop-blur-lg transition-all duration-300 hover:border-emerald-400/70 hover:shadow-2xl hover:shadow-emerald-500/20 group">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                {quizData.streak}
              </div>
              <div className="text-emerald-400 text-sm font-medium">
                Current Streak
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50 rounded-2xl p-4 lg:p-6 text-center backdrop-blur-lg transition-all duration-300 hover:border-purple-400/70 hover:shadow-2xl hover:shadow-purple-500/20 group">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {quizData.averageScore >= 90
                  ? "A"
                  : quizData.averageScore >= 80
                  ? "B"
                  : quizData.averageScore >= 70
                  ? "C"
                  : "D"}
                {quizData.averageScore >= 97
                  ? "+"
                  : quizData.averageScore >= 87
                  ? ""
                  : "-"}
              </div>
              <div className="text-purple-400 text-sm font-medium">
                Average Grade
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <PerformanceCard
              title="Average Score"
              value={`${Math.round(quizData.averageScore)}%`}
              subtitle="Trending upward this month"
              chartData={quizData.scoreHistory}
              chartType="line"
              color="#6366f1"
              dataKey="score"
              icon={<FaChartLine size={24} />}
            />

            <PerformanceCard
              title="Highest Score"
              value={`${quizData.highestScore}%`}
              subtitle="Personal best achievement"
              chartData={quizData.scoreHistory}
              chartType="bar"
              color="#f59e0b"
              dataKey="score"
              icon={<FaTrophy size={24} />}
            />

            <PerformanceCard
              title="Avg Time"
              value={`${Math.round(quizData.averageTimeMinutes)} min`}
              subtitle="Getting faster each week"
              chartData={quizData.scoreHistory}
              chartType="line"
              color="#8b5cf6"
              dataKey="time"
              icon={<FaClock size={24} />}
            />
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fadeIn">
              <Calendar
                quizDates={quizData.quizDates}
                scoreHistory={quizData.scoreHistory}
              />
              <RecentQuizzes scoreHistory={quizData.scoreHistory} />
            </div>
            <div className="animate-fadeIn">
              <Newsletter onSubscribe={handleSubscribe} />
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                {new Date().getFullYear()} Quiz Analytics Pro.
              </p>
              <p className="text-gray-500 text-xs">
                Keep up the great work! Your dedication to learning is
                impressive.
              </p>
            </div>
          </footer>
        </div>
      </div>

      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onComplete={handleQuizComplete}
      />

      <HelpModal
        isOpen={showHelpModal || showFirstTimeHelp}
        onClose={() => {
          setShowHelpModal(false);
          setShowFirstTimeHelp(false);
        }}
      />
    </>
  );
};

export default QuizApp;
