"use client";
import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineRestaurantMenu, MdChair } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiChefToque } from "react-icons/gi";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  category: "starters" | "mains" | "desserts" | "drinks";
  imageUrl: string;
  isSpecial?: boolean;
}

interface OrderOptions {
  quantity: number;
  portionSize: string;
  specialRequests: string;
}

interface ChefSpecialsSectionProps {
  darkMode: boolean;
  menuData: Dish[];
  handleDishClick: (dish: Dish) => void;
  searchQuery: string;
}

interface CartItem {
  dish: Dish;
  quantity: number;
  portionSize: string;
  specialRequests: string;
  finalPrice: number;
}

const ChefSpecialsSection: React.FC<ChefSpecialsSectionProps> = ({
  darkMode,
  menuData,
  handleDishClick,
  searchQuery,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (searchQuery) {
    return null;
  }

  return (
    <section
      className={`mb-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute inset-4 sm:inset-2 bg-[#FEF2F2] rounded-2xl transform -rotate-1"></div>
      <div className="absolute inset-4 sm:inset-2 bg-[#FEF2F2] rounded-2xl transform rotate-1"></div>
      <div className="relative bg-[#FEF2F2] rounded-2xl p-8 shadow-2xl border border-[#FED7D7]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#C83F12] mb-2">
            Chef's Specials
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mx-auto rounded-full"></div>
          <p className="text-[#E53E3E]/80 mt-4">
            Our culinary masterpieces, crafted with passion and expertise
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {menuData
            .filter((dish) => dish.isSpecial)
            .map((dish, index) => (
              <div
                key={dish.id}
                className={`bg-white/95 border-slate-200/50 backdrop-blur-sm rounded-xl p-0 cursor-pointer transform transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] hover:scale-[1.035] hover:shadow-2xl hover:z-10 border text-center group relative overflow-hidden ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  boxShadow:
                    "0 2px 8px 0 rgba(200,63,18,0.04), 0 8px 32px 0 rgba(200,63,18,0.08)",
                  transitionDelay: isVisible
                    ? `${1200 + index * 150}ms`
                    : "0ms",
                }}
                onClick={() => handleDishClick(dish)}
              >
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -top-0 -right-0 bg-[#C83F12] text-white px-2 sm:px-4 py-0.5 sm:py-1 rounded-bl-xl text-xs sm:text-sm font-semibold shadow-lg z-10">
                    Special
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-xl md:text-2xl font-semibold text-slate-800 group-hover:text-[#C83F12] mb-2 sm:mb-3 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-slate-600/80 mb-3 sm:mb-4 line-clamp-2 text-xs sm:text-base">
                    {dish.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-6">
                    {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 bg-[#FEF2F2] text-[#C83F12] rounded-full text-xs sm:text-sm`}
                      >
                        {ingredient}
                      </span>
                    ))}
                    {dish.ingredients.length > 3 && (
                      <span className="px-2 py-1 bg-[#FED7D7] text-[#C83F12] rounded-full text-xs sm:text-sm font-medium">
                        +{dish.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

const CustomCalendar: React.FC<{
  value: string;
  onChange: (date: string) => void;
}> = ({ value, onChange }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) return new Date(value);
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() =>
    value ? new Date(value) : null
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(date);
    onChange(date.toISOString().split("T")[0]);
    setShowCalendar(false);
  };

  const isPast = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return (
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".custom-calendar-container")) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [showCalendar]);

  return (
    <div className="relative custom-calendar-container">
      <div
        className={`w-full px-4 py-3 rounded-lg bg-slate-200 text-slate-800 cursor-pointer focus:border-[#C83F12] font-sans text-base border border-slate-300 transition-colors flex justify-between items-center ${
          showCalendar ? "border-[#C83F12]" : ""
        }`}
        onClick={() => setShowCalendar((v) => !v)}
      >
        <span className="flex-1 text-left">
          {selectedDate
            ? selectedDate.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Select date"}
        </span>
        <div className="text-[#C83F12] flex-shrink-0 ml-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      {showCalendar && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-[#FED7D7] rounded-xl shadow-xl z-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              className="px-2 py-1 rounded hover:bg-[#FEF2F2] text-[#C83F12]"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1,
                    1
                  )
                )
              }
              disabled={
                currentMonth.getFullYear() === today.getFullYear() &&
                currentMonth.getMonth() === today.getMonth()
              }
            >
              &lt;
            </button>
            <span className="font-bold text-[#C83F12]">
              {currentMonth.toLocaleString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              className="px-2 py-1 rounded hover:bg-[#FEF2F2] text-[#C83F12]"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1
                  )
                )
              }
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-xs font-semibold text-[#E53E3E]">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={i} className="py-2"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === currentMonth.getFullYear() &&
                selectedDate.getMonth() === currentMonth.getMonth() &&
                selectedDate.getDate() === day;
              return (
                <button
                  key={day}
                  type="button"
                  className={`py-2 rounded-full w-8 h-8 mx-auto text-sm font-semibold transition-colors
                    ${
                      isPast(day)
                        ? "text-slate-300 cursor-not-allowed"
                        : isSelected
                        ? "bg-[#C83F12] text-white"
                        : "hover:bg-[#FEF2F2] text-slate-800"
                    }`}
                  onClick={() => !isPast(day) && handleDateClick(day)}
                  disabled={isPast(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  formTouched: boolean;
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  formTouched,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={`w-full appearance-none cursor-pointer rounded-lg bg-slate-200 py-3 pl-4 pr-4 font-sans text-base text-slate-800 transition-all duration-300 flex justify-between items-center ${
          formTouched && error
            ? "border-2 border-[#E53E3E]"
            : "border border-slate-300"
        } ${isOpen ? "border-[#C83F12]" : "border-slate-300"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-1 text-left">
          {selectedOption ? selectedOption.label : "Select..."}
        </span>
        <div className="pointer-events-none text-[#C83F12] flex-shrink-0 ml-2">
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-3 cursor-pointer text-slate-800 hover:bg-[#FEF2F2] hover:text-[#C83F12] ${
                option.value === value ? "bg-[#C83F12] text-white" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const RestaurantMenu: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const [reservationName, setReservationName] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationPartySize, setReservationPartySize] = useState("2");
  const [reservationRequests, setReservationRequests] = useState("");

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(17);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("PM");

  const [activeCategory, setActiveCategory] = useState<Dish["category"] | null>(
    "starters"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [orderOptions, setOrderOptions] = useState<OrderOptions>({
    quantity: 1,
    portionSize: "full",
    specialRequests: "",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [dishModalVisible, setDishModalVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);

  const [cardsVisible, setCardsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    setCardsVisible(false);
    const timeout = setTimeout(() => {
      setCardsVisible(true);
      setIsTransitioning(false);
    }, 150);
    return () => clearTimeout(timeout);
  }, [activeCategory, searchQuery]);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formTouched, setFormTouched] = useState(false);

  const partySizeOptions: CustomSelectOption[] = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 People" },
    { value: "3", label: "3 People" },
    { value: "4", label: "4 People" },
    { value: "5", label: "5 People" },
    { value: "6", label: "6+ People" },
  ];

  interface PortionOption extends CustomSelectOption {
    multiplier: number;
  }

  const portionSizeOptions = React.useMemo((): PortionOption[] => {
    if (!selectedDish) return [];

    const baseOptions: PortionOption[] = [
      { value: "full", label: "Full Portion", multiplier: 1.0 },
      { value: "half", label: "Half Portion", multiplier: 0.65 },
    ];

    switch (selectedDish.category) {
      case "drinks":
        return [
          ...baseOptions,
          { value: "250ml", label: "250ml", multiplier: 0.8 },
          { value: "500ml", label: "500ml", multiplier: 1.2 },
          { value: "1l", label: "1 Liter", multiplier: 2.0 },
        ];
      case "desserts":
        return [
          ...baseOptions,
          { value: "100g", label: "100g", multiplier: 0.9 },
          { value: "200g", label: "200g", multiplier: 1.5 },
        ];
      case "mains":
        return [
          ...baseOptions,
          { value: "small", label: "Small", multiplier: 0.8 },
          { value: "large", label: "Large", multiplier: 1.3 },
        ];
      default:
        return baseOptions;
    }
  }, [selectedDish]);

  const selectedPortion = portionSizeOptions.find(
    (opt) => opt.value === orderOptions.portionSize
  );
  const priceMultiplier = selectedPortion ? selectedPortion.multiplier : 1;
  const finalPricePerItem = selectedDish
    ? selectedDish.price * priceMultiplier
    : 0;

  const formatTime = (
    hour: number,
    minute: number,
    period: "AM" | "PM"
  ): string => {
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  const convertTo24Hour = (hour: number, period: "AM" | "PM"): number => {
    if (period === "AM") {
      return hour === 12 ? 0 : hour;
    } else {
      return hour === 12 ? 12 : hour + 12;
    }
  };

  const handleTimeSelect = () => {
    const hour24 = convertTo24Hour(selectedHour, selectedPeriod);
    const timeString = `${hour24.toString().padStart(2, "0")}:${selectedMinute
      .toString()
      .padStart(2, "0")}`;
    setReservationTime(timeString);
    setShowTimePicker(false);
  };

  const handleReservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormTouched(true);
    const errors: { [key: string]: string } = {};
    if (!reservationName.trim()) {
      errors.name = "Please enter your name.";
    }
    if (
      !reservationEmail.trim() ||
      !reservationEmail.includes("@") ||
      !reservationEmail.includes(".")
    ) {
      errors.email = "Please enter a valid email address.";
    }
    if (!reservationDate) {
      errors.date = "Please select a date.";
    }
    if (!reservationTime) {
      errors.time = "Please select a time.";
    }
    if (!reservationPartySize) {
      errors.partySize = "Please select a party size.";
    }
    if (reservationDate && reservationTime) {
      const now = new Date();
      const selectedDateTime = new Date(
        `${reservationDate}T${reservationTime}`
      );
      if (selectedDateTime < now) {
        errors.date = "Reservation time cannot be in the past.";
      }
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors in the form.");
      return;
    }
    toast.success("Reservation booked successfully!");
    setReservationName("");
    setReservationEmail("");
    setReservationDate("");
    setReservationTime("");
    setReservationPartySize("2");
    setReservationRequests("");
    setFormErrors({});
    setFormTouched(false);
  };

  const menuData: Dish[] = [
    {
      id: 1,
      name: "Garlic Bread",
      description: "Freshly baked bread with garlic butter",
      price: 4.99,
      ingredients: ["Bread", "Garlic", "Butter", "Parsley"],
      category: "starters",
      imageUrl:
        "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Mozzarella Sticks",
      description: "Breaded and deep-fried mozzarella with marinara sauce",
      price: 6.99,
      ingredients: ["Mozzarella", "Eggs", "Breadcrumbs", "Marinara sauce"],
      category: "starters",
      imageUrl:
        "https://images.unsplash.com/photo-1734774924912-dcbb467f8599?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Bruschetta",
      description:
        "Toasted bread topped with tomatoes, garlic, and fresh basil",
      price: 5.99,
      ingredients: ["Bread", "Tomatoes", "Garlic", "Basil", "Olive oil"],
      category: "starters",
      imageUrl:
        "https://images.unsplash.com/photo-1734774924912-dcbb467f8599?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 15,
      name: "Caprese Salad",
      description:
        "Fresh mozzarella, tomatoes, and basil drizzled with olive oil",
      price: 7.49,
      ingredients: [
        "Mozzarella",
        "Tomatoes",
        "Basil",
        "Olive oil",
        "Salt",
        "Pepper",
      ],
      category: "starters",
      imageUrl:
        "https://images.unsplash.com/photo-1723985021773-d1f4c4ebfdd1?q=80&w=668&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 16,
      name: "Stuffed Mushrooms",
      description:
        "Mushrooms stuffed with cheese and herbs, baked to perfection",
      price: 6.49,
      ingredients: ["Mushrooms", "Cheese", "Herbs", "Breadcrumbs"],
      category: "starters",
      imageUrl:
        "https://images.unsplash.com/photo-1622268805718-ca073548d4ad?q=80&w=1305&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Mushroom Risotto",
      description: "Creamy risotto with wild mushrooms and parmesan",
      price: 14.99,
      ingredients: [
        "Arborio rice",
        "Wild mushrooms",
        "Onion",
        "White wine",
        "Parmesan",
      ],
      category: "mains",
      isSpecial: true,
      imageUrl:
        "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Grilled Salmon",
      description: "Fresh salmon fillet with lemon butter sauce and vegetables",
      price: 18.99,
      ingredients: [
        "Salmon",
        "Butter",
        "Lemon",
        "Seasonal vegetables",
        "Herbs",
      ],
      category: "mains",
      imageUrl:
        "https://images.unsplash.com/photo-1676300185165-3f543c1fcb72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      name: "Beef Burger",
      description:
        "Angus beef patty with cheese, lettuce, tomato, and special sauce",
      price: 12.99,
      ingredients: [
        "Beef patty",
        "Cheese",
        "Lettuce",
        "Tomato",
        "Special sauce",
        "Brioche bun",
      ],
      category: "mains",
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      name: "Chicken Alfredo",
      description:
        "Fettuccine pasta with creamy alfredo sauce and grilled chicken",
      price: 15.99,
      ingredients: [
        "Fettuccine",
        "Chicken breast",
        "Heavy cream",
        "Parmesan",
        "Garlic",
      ],
      category: "mains",
      imageUrl:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 9,
      name: "Tiramisu",
      description:
        "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 7.99,
      ingredients: [
        "Ladyfingers",
        "Mascarpone",
        "Coffee",
        "Cocoa",
        "Eggs",
        "Sugar",
      ],
      category: "desserts",
      imageUrl:
        "https://images.unsplash.com/photo-1639744211487-b27e3551b07c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 10,
      name: "Chocolate Lava Cake",
      description:
        "Warm chocolate cake with a molten center, served with vanilla ice cream",
      price: 8.99,
      ingredients: [
        "Chocolate",
        "Butter",
        "Eggs",
        "Flour",
        "Vanilla ice cream",
      ],
      category: "desserts",
      isSpecial: true,
      imageUrl:
        "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 11,
      name: "Cheesecake",
      description:
        "Creamy cheesecake with a graham cracker crust and berry compote",
      price: 7.99,
      ingredients: [
        "Cream cheese",
        "Graham crackers",
        "Sugar",
        "Eggs",
        "Mixed berries",
      ],
      category: "desserts",
      imageUrl:
        "https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?q=80&w=789&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 12,
      name: "Fresh Lemonade",
      description: "Freshly squeezed lemons with sugar and mint",
      price: 3.99,
      ingredients: ["Lemons", "Sugar", "Water", "Mint"],
      category: "drinks",
      imageUrl:
        "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?q=80&w=693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 13,
      name: "Iced Tea",
      description: "House-brewed black tea served over ice with lemon",
      price: 2.99,
      ingredients: ["Black tea", "Lemon", "Sugar", "Water"],
      category: "drinks",
      imageUrl:
        "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 14,
      name: "Espresso Martini",
      description:
        "Vodka-based cocktail with coffee liqueur and freshly brewed espresso",
      price: 9.99,
      ingredients: ["Vodka", "Coffee liqueur", "Espresso", "Simple syrup"],
      category: "drinks",
      isSpecial: true,
      imageUrl:
        "https://images.unsplash.com/photo-1607687633950-c745bdb4da70?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const filteredDishes = menuData.filter((dish) => {
    const matchesCategory = !activeCategory || dish.category === activeCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return searchQuery ? matchesSearch : matchesCategory;
  });

  const searchSuggestions = searchQuery
    ? menuData
        .filter((dish) =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setOrderOptions({ quantity: 1, portionSize: "full", specialRequests: "" });
    setDishModalVisible(true);
    setTimeout(() => setDishModalOpen(true), 10);
  };

  const closeModal = () => {
    setDishModalOpen(false);
    setTimeout(() => {
      setDishModalVisible(false);
      setSelectedDish(null);
    }, 300);
  };

  const addToOrder = () => {
    if (!selectedDish) return;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.dish.id === selectedDish.id &&
          item.portionSize === orderOptions.portionSize &&
          item.specialRequests === orderOptions.specialRequests
      );

      if (existingItemIndex !== -1) {
        return prevCart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + orderOptions.quantity,
            };
          }
          return item;
        });
      } else {
        return [
          ...prevCart,
          {
            dish: selectedDish,
            quantity: orderOptions.quantity,
            portionSize: orderOptions.portionSize,
            specialRequests: orderOptions.specialRequests,
            finalPrice: finalPricePerItem,
          },
        ];
      }
    });

    toast.success(
      `Added ${orderOptions.quantity} ${selectedDish?.name} to your order!`
    );
    closeModal();
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    toast.success("Order placed successfully!");
    setCart([]);
    setCartModalVisible(false);
  };

  const openCart = () => {
    setCartModalVisible(true);
    setTimeout(() => setCartModalOpen(true), 10);
  };
  const closeCart = () => {
    setCartModalOpen(false);
    setTimeout(() => {
      setCartModalVisible(false);
    }, 300);
  };

  useEffect(() => {
    const body = document.body;
    if (dishModalVisible || cartModalVisible) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [dishModalVisible, cartModalVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showTimePicker && !target.closest(".time-picker-container")) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTimePicker]);

  useEffect(() => {
    const loaderTimer = setTimeout(() => setShowLoader(false), 2000);

    const timer1 = setTimeout(() => setHeaderVisible(true), 2200);
    const timer2 = setTimeout(() => setSearchVisible(true), 2400);
    const timer3 = setTimeout(() => setNavVisible(true), 2600);
    const timer4 = setTimeout(() => setIsLoaded(true), 2800);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#FEF2F2] via-slate-50 to-[#FEF2F2]">
      {showLoader && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ease-out ${
            showLoader ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #FEF2F2 0%, #FED7D7 50%, #FEF2F2 100%)",
          }}
        >
          <div className="text-center">
            <div className="relative mb-8 flex justify-center">
              <div className="loader-chef-hat relative">
                <svg
                  viewBox="0 0 100 100"
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto"
                  fill="none"
                >
                  <path
                    d="M50 15c-8 0-15 4-19 10-2-1-4-1-6-1-8 0-15 7-15 15s7 15 15 15h50c8 0 15-7 15-15s-7-15-15-15c-2 0-4 0-6 1-4-6-11-10-19-10z"
                    fill="#FEF2F2"
                    stroke="#C83F12"
                    strokeWidth="2"
                    className="hat-top"
                  />
                  <path
                    d="M25 54h50v25c0 3-2 5-5 5H30c-3 0-5-2-5-5V54z"
                    fill="#C83F12"
                    className="hat-band"
                  />
                  <path
                    d="M35 25c0 3 2 5 5 5s5-2 5-5"
                    fill="none"
                    stroke="#C83F12"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="hat-detail"
                  />
                  <path
                    d="M55 25c0 3 2 5 5 5s5-2 5-5"
                    fill="none"
                    stroke="#C83F12"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="hat-detail"
                  />
                  <circle
                    cx="50"
                    cy="35"
                    r="2"
                    fill="#C83F12"
                    className="hat-accent"
                  />
                </svg>

                <div className="absolute -top-4 -left-4 w-3 h-3 bg-[#C83F12] rounded-full floating-element-1"></div>
                <div className="absolute -top-2 -right-6 w-2 h-2 bg-[#E53E3E] rounded-full floating-element-2"></div>
                <div className="absolute -bottom-2 -left-6 w-2.5 h-2.5 bg-[#C83F12] rounded-full floating-element-3"></div>
                <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-[#E53E3E] rounded-full floating-element-4"></div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#C83F12] font-serif tracking-wide">
                Gourmet Delights
              </h2>
              <p className="text-lg md:text-xl text-[#E53E3E] font-medium animate-pulse">
                Preparing your culinary experience...
              </p>

              <div className="flex justify-center space-x-2 mt-6">
                <div className="loading-dot loading-dot-1"></div>
                <div className="loading-dot loading-dot-2"></div>
                <div className="loading-dot loading-dot-3"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`transition-all duration-700 ease-out ${
          !showLoader ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-orange-50/60 via-amber-100/40 to-transparent blur-2xl dark:hidden"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-orange-100/40 via-amber-200/30 to-transparent blur-2xl dark:hidden"></div>
          <div className="absolute top-1/2 left-1/3 w-1/4 h-1/4 bg-gradient-to-br from-orange-200/30 to-transparent blur-2xl dark:hidden"></div>
          <div className="hidden dark:block absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-orange-900/40 via-amber-900/30 to-transparent blur-2xl"></div>
          <div className="hidden dark:block absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-slate-800/60 via-orange-900/20 to-transparent blur-2xl"></div>
          <div className="hidden dark:block absolute top-1/2 left-1/3 w-1/4 h-1/4 bg-gradient-to-br from-amber-900/30 to-transparent blur-2xl"></div>
        </div>
        <header
          className={`relative py-20 mb-0 overflow-hidden transition-all duration-1000 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="text-center mb-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mb-6">
                <div
                  className={`transition-all duration-700 ease-out hover:scale-110 hover:rotate-6 hover:drop-shadow-lg cursor-pointer group floating-chef-cap ${
                    headerVisible
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-75 -rotate-12"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300 ease-out"
                    fill="none"
                  >
                    <path
                      d="M50 15c-8 0-15 4-19 10-2-1-4-1-6-1-8 0-15 7-15 15s7 15 15 15h50c8 0 15-7 15-15s-7-15-15-15c-2 0-4 0-6 1-4-6-11-10-19-10z"
                      fill="#FEF2F2"
                      stroke="#C83F12"
                      strokeWidth="2"
                      className="group-hover:fill-white transition-colors duration-300"
                    />
                    <path
                      d="M25 54h50v25c0 3-2 5-5 5H30c-3 0-5-2-5-5V54z"
                      fill="#C83F12"
                      className="group-hover:fill-[#E53E3E] transition-colors duration-300"
                    />

                    <path
                      d="M35 25c0 3 2 5 5 5s5-2 5-5"
                      fill="none"
                      stroke="#C83F12"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="group-hover:stroke-[#E53E3E] transition-colors duration-300"
                    />
                    <path
                      d="M55 25c0 3 2 5 5 5s5-2 5-5"
                      fill="none"
                      stroke="#C83F12"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="group-hover:stroke-[#E53E3E] transition-colors duration-300"
                    />
                    <circle
                      cx="50"
                      cy="35"
                      r="2"
                      fill="#C83F12"
                      className="group-hover:fill-[#E53E3E] transition-colors duration-300"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold tracking-tight text-[#C83F12] drop-shadow-lg font-serif text-balance text-center md:text-left">
                  Gourmet Delights
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-[#E53E3E] mb-8 max-w-2xl mx-auto font-medium leading-relaxed tracking-normal text-pretty">
                Experience the finest culinary journey with our carefully
                curated menu
              </p>
              <div className="mx-auto max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-0">
                {[
                  {
                    icon: IoFastFoodOutline,
                    title: "Today's Popular Dish",
                    content: "Mushroom Risotto",
                  },
                  {
                    icon: MdChair,
                    title: "Comfortable Place",
                    content: "The best of the best",
                  },
                  {
                    icon: GiChefToque,
                    title: "Chef on Duty",
                    content: "Chef Antonio Rossi",
                  },
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl shadow-lg p-6 flex flex-col items-center bg-white border border-[#FED7D7] transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl ${
                        headerVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${600 + index * 150}ms` }}
                    >
                      <IconComponent className="text-4xl mb-2 text-[#C83F12]" />
                      <div className="text-lg font-bold text-[#E53E3E] tracking-wide font-serif">
                        {item.title}
                      </div>
                      <div className="text-base text-slate-600 mt-1 font-sans">
                        {item.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#FEF2F2] to-transparent"></div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8">
          <div
            className={`relative mb-4 transition-all duration-700 ease-out ${
              searchVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search our menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 bg-white/90 text-slate-800 placeholder-slate-400 focus:ring-[#C83F12] focus:border-[#C83F12] transition duration-200 shadow-lg backdrop-blur-sm`}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className={`w-5 h-5 text-[#C83F12]`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center text-[#C83F12] hover:text-[#E53E3E] transition-colors`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {showSuggestions && searchSuggestions.length > 0 && (
                <ul
                  className={`absolute left-0 right-0 mt-2 z-20 bg-white border border-[#FED7D7] rounded-xl shadow-lg max-h-60 overflow-auto`}
                >
                  {searchSuggestions.map((dish) => (
                    <li
                      key={dish.id}
                      className={`px-6 py-3 cursor-pointer hover:bg-[#C83F12] hover:text-white transition-colors text-slate-700`}
                      onMouseDown={() => {
                        setSearchQuery(dish.name);
                        setShowSuggestions(false);
                      }}
                    >
                      {dish.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <nav
            className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 mt-4 transition-all duration-700 ease-out ${
              navVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {(
              ["starters", "mains", "desserts", "drinks"] as Array<
                Dish["category"]
              >
            ).map((category, index) => (
              <button
                key={category}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-out cursor-pointer 
      font-serif text-sm tracking-wide transform
      ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      ${
        activeCategory === category
          ? "bg-[#C83F12] text-white shadow-lg scale-110 font-bold ring-2 ring-[#C83F12] ring-opacity-30"
          : `bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 hover:shadow-md hover:scale-105 hover:-translate-y-0.5 font-medium`
      }`}
                style={{
                  transitionDelay: navVisible ? `${index * 100}ms` : "0ms",
                }}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category ? null : category
                  )
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </nav>

          <section
            className={`relative transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="absolute inset-2 sm:inset-0 rounded-2xl transform -rotate-1"
              style={{
                background: "linear-gradient(135deg, #FEF2F2 0%, #FED7D7 100%)",
              }}
            ></div>
            <div
              className="absolute inset-2 sm:inset-0 rounded-2xl transform rotate-1"
              style={{
                background: "linear-gradient(135deg, #FEF2F2 0%, #FED7D7 100%)",
              }}
            ></div>
            <div
              className="relative rounded-2xl p-8 shadow-2xl border transition-all duration-700"
              style={{
                background: "linear-gradient(135deg, #FEF2F2 0%, #FED7D7 100%)",
                boxShadow:
                  "0 4px 24px 0 rgba(200,63,18,0.06), 0 16px 48px 0 rgba(200,63,18,0.10)",
              }}
            >
              <div
                className={`text-center mb-8 transition-all duration-700 ${
                  isTransitioning
                    ? "opacity-50 transform translate-y-2"
                    : "opacity-100 transform translate-y-0"
                } ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mb-2 font-serif tracking-tight text-balance">
                  {searchQuery
                    ? "Search Results"
                    : activeCategory
                    ? activeCategory.charAt(0).toUpperCase() +
                      activeCategory.slice(1)
                    : "Our Menu"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mx-auto rounded-full"></div>
                <p className="text-slate-700/80 mt-4 leading-relaxed text-lg font-sans">
                  {searchQuery
                    ? "Find your perfect dish from our extensive menu"
                    : activeCategory
                    ? `Explore our delicious ${activeCategory} selection`
                    : "Explore our entire delicious selection"}
                </p>
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-500 ease-out ${
                  isTransitioning
                    ? "opacity-0 transform translate-y-8 scale-95"
                    : "opacity-100 transform translate-y-0 scale-100"
                }`}
                key={activeCategory + searchQuery}
              >
                {filteredDishes.length > 0 ? (
                  filteredDishes.map((dish, idx) => (
                    <div
                      key={dish.id}
                      className={`group bg-slate-100/90 backdrop-blur-sm rounded-xl p-0 cursor-pointer transform transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.035] hover:shadow-2xl hover:z-10 relative border overflow-hidden ${
                        dish.isSpecial ? "border-[#C83F12]" : "border-slate-300"
                      } ${
                        cardsVisible && isLoaded
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-8 scale-95"
                      }`}
                      style={{
                        boxShadow:
                          "0 2px 8px 0 rgba(200,63,18,0.04), 0 8px 32px 0 rgba(200,63,18,0.08)",
                        transitionDelay:
                          cardsVisible && isLoaded
                            ? `${800 + idx * 80}ms`
                            : "0ms",
                      }}
                      onClick={() => handleDishClick(dish)}
                    >
                      <div className="relative">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        {dish.isSpecial && (
                          <div className="absolute top-0 right-0 bg-[#C83F12] text-white px-3 sm:px-4 py-1 rounded-bl-xl text-xs sm:text-sm font-semibold shadow-lg z-10">
                            Special
                          </div>
                        )}
                      </div>
                      <div className="p-4 sm:p-6 flex flex-col h-full">
                        <h3
                          className={`text-lg sm:text-xl font-bold text-slate-800 group-hover:text-[#C83F12] mb-2 sm:mb-3 transition-colors font-serif tracking-wide`}
                        >
                          {dish.name}
                        </h3>
                        <p
                          className={`text-slate-600/80 mb-3 sm:mb-4 flex-grow line-clamp-2 leading-snug font-sans text-sm sm:text-base`}
                        >
                          {dish.description}
                        </p>
                        <div
                          className={`flex items-start justify-between mt-auto pt-3 sm:pt-4 border-t ${
                            dish.isSpecial
                              ? "border-[#C83F12]"
                              : "border-slate-300"
                          }`}
                        >
                          <div className="flex flex-wrap gap-1 items-center">
                            {dish.ingredients
                              .slice(0, 3)
                              .map((ingredient, index) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 bg-[#FEF2F2] text-[#C83F12] rounded-full text-xs sm:text-sm`}
                                >
                                  {ingredient}
                                </span>
                              ))}
                            {dish.ingredients.length > 3 && (
                              <span className="px-2 py-1 bg-[#FED7D7] text-[#C83F12] rounded-full text-xs sm:text-sm font-medium">
                                +{dish.ingredients.length - 3} more
                              </span>
                            )}
                          </div>
                          <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E] ml-2 sm:ml-4">
                            ${dish.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <svg
                      className={`w-16 h-16 mx-auto text-slate-500 mb-4`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-slate-500 text-lg">
                      No dishes found. Try a different search term.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {dishModalVisible && selectedDish && (
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors duration-300`}
            onClick={closeModal}
          >
            <div
              className={`bg-white backdrop-blur-md rounded-[2rem] p-0 max-w-[320px] sm:max-w-lg w-full max-h-[75vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border relative transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
                dishModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                boxShadow:
                  "0 8px 32px 0 rgba(200,63,18,0.10), 0 32px 64px 0 rgba(200,63,18,0.12)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-500 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer z-20"
                onClick={closeModal}
                aria-label="Close Dish Details"
              >
                <span className="text-2xl -mt-1">×</span>
              </button>

              <div className="modal-scrollbar overflow-y-auto max-h-[75vh] sm:max-h-[90vh]">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={selectedDish.imageUrl}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedDish.isSpecial && (
                    <span className="absolute bottom-3 right-3 bg-[#C83F12] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Chef's Special
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mb-3 font-serif tracking-tight text-balance">
                      {selectedDish.name}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                      {selectedDish.description}
                    </p>
                  </div>
                  <div className="mb-4 sm:mb-6">
                    <h3
                      className={`text-base sm:text-lg font-bold text-slate-800 mb-3 flex items-center font-serif tracking-wide`}
                    >
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#C83F12]`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Ingredients
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedDish.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 bg-slate-100 p-2 rounded-lg`}
                        >
                          <svg
                            className={`w-4 h-4 text-[#C83F12]`}
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
                          <span className={`text-slate-700 text-sm font-sans`}>
                            {ingredient}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`border-t pt-4 sm:pt-6`}>
                    <h3
                      className={`text-base sm:text-lg font-bold text-slate-800 mb-4 flex items-center font-serif tracking-wide`}
                    >
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#C83F12]`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Order Options
                    </h3>
                    <div className="space-y-4">
                      <div
                        className={`flex items-center justify-between bg-slate-100 p-4 rounded-lg`}
                      >
                        <label
                          className={`text-slate-800 font-semibold font-sans`}
                        >
                          Quantity:
                        </label>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              setOrderOptions((prev) => ({
                                ...prev,
                                quantity: Math.max(1, prev.quantity - 1),
                              }))
                            }
                            className={`w-7 h-7 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 hover:bg-slate-300 cursor-pointer`}
                          >
                            -
                          </button>
                          <span
                            className={`w-8 text-center font-semibold text-slate-800`}
                          >
                            {orderOptions.quantity}
                          </span>
                          <button
                            onClick={() =>
                              setOrderOptions((prev) => ({
                                ...prev,
                                quantity: prev.quantity + 1,
                              }))
                            }
                            className={`w-7 h-7 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 hover:bg-slate-300 cursor-pointer`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-100 p-3 rounded-lg">
                        <label className="block text-slate-800 font-semibold mb-2 font-sans text-sm">
                          Portion Size:
                        </label>
                        <CustomSelect
                          options={portionSizeOptions}
                          value={orderOptions.portionSize}
                          onChange={(value) =>
                            setOrderOptions({
                              ...orderOptions,
                              portionSize: value,
                            })
                          }
                          formTouched={false}
                        />
                      </div>

                      <div className={`bg-slate-100 p-3 rounded-lg`}>
                        <label
                          className={`block text-slate-800 font-semibold mb-2 font-sans text-sm`}
                        >
                          Special Requests:
                        </label>
                        <textarea
                          placeholder="Any allergies or special preparation requests?"
                          value={orderOptions.specialRequests}
                          onChange={(e) =>
                            setOrderOptions({
                              ...orderOptions,
                              specialRequests: e.target.value,
                            })
                          }
                          className={`w-full px-4 py-2 border bg-white text-slate-800 placeholder-slate-400 rounded-lg focus:border-[#C83F12] min-h-[80px] text-sm`}
                        />
                      </div>
                      <div className="text-center space-y-3">
                        <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E]">
                          Total: $
                          {(finalPricePerItem * orderOptions.quantity).toFixed(
                            2
                          )}
                        </div>
                        <button
                          className={`w-full bg-[#C83F12] hover:bg-[#E53E3E] text-white py-3 rounded-lg font-semibold transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer text-sm`}
                          onClick={addToOrder}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>Add to Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <ChefSpecialsSection
          darkMode={false}
          menuData={menuData}
          handleDishClick={handleDishClick}
          searchQuery={searchQuery}
        />

        <section
          className={`py-16 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-12 transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1200ms" }}
            >
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mb-4">
                What Our Customers Say
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  rating: 5,
                  comment:
                    "The mushroom risotto was absolutely divine! The flavors were perfectly balanced.",
                  date: "2 days ago",
                  image: "https://i.pravatar.cc/150?img=1",
                },
                {
                  name: "Michael Chen",
                  rating: 5,
                  comment:
                    "Best Italian restaurant in town! The service was impeccable and the food was outstanding.",
                  date: "1 week ago",
                  image: "https://i.pravatar.cc/150?img=2",
                },
                {
                  name: "Emma Thompson",
                  rating: 4,
                  comment:
                    "Loved the ambiance and the chef's specials. Will definitely come back!",
                  date: "3 days ago",
                  image: "https://i.pravatar.cc/150?img=3",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className={`bg-slate-100/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] hover:shadow-2xl hover:-translate-y-2 hover:border-[#C83F12] ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } flex flex-col h-full`}
                  style={{ transitionDelay: `${1400 + index * 150}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3
                        className={`font-bold text-slate-800 font-serif tracking-wide`}
                      >
                        {review.name}
                      </h3>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`text-slate-600/80 mb-4 leading-relaxed font-sans italic flex-grow`}
                  >
                    {review.comment}
                  </p>
                  <p className={`text-slate-500 text-sm font-mono mt-auto`}>
                    {review.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className={`py-16 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-12 transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1800ms" }}
            >
              <h2
                className={`text-4xl font-extrabold text-[#C83F12] mb-4 font-serif tracking-tight text-balance`}
              >
                Make a Reservation
              </h2>
              <p
                className={`text-[#E53E3E]/80 max-w-2xl mx-auto leading-relaxed text-lg font-sans`}
              >
                Book your table online and enjoy a memorable dining experience
              </p>
            </div>
            <div
              className={`bg-slate-100/70 backdrop-blur-sm rounded-xl p-8 border shadow-lg transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: "2000ms" }}
            >
              <form className="space-y-6" onSubmit={handleReservationSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`block text-[#E53E3E] mb-2 font-semibold font-sans`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={reservationName}
                      onChange={(e) => setReservationName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#C83F12] font-sans text-base ${
                        formTouched && formErrors.name
                          ? "border-2 border-[#E53E3E]"
                          : ""
                      }`}
                      placeholder="Your name"
                    />
                    {formTouched && formErrors.name && (
                      <div className="text-[#E53E3E] text-sm mt-1">
                        {formErrors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-[#E53E3E] mb-2 font-semibold font-sans`}
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      value={reservationEmail}
                      onChange={(e) => setReservationEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#C83F12] font-sans text-base ${
                        formTouched && formErrors.email
                          ? "border-2 border-[#E53E3E]"
                          : ""
                      }`}
                      placeholder="Your email"
                    />
                    {formTouched && formErrors.email && (
                      <div className="text-[#E53E3E] text-sm mt-1">
                        {formErrors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-[#E53E3E] mb-2 font-semibold font-sans`}
                    >
                      Date
                    </label>
                    <CustomCalendar
                      value={reservationDate}
                      onChange={setReservationDate}
                    />
                    {formTouched && formErrors.date && (
                      <div className="text-[#E53E3E] text-sm mt-1">
                        {formErrors.date}
                      </div>
                    )}
                  </div>
                  <div className="relative time-picker-container">
                    <label
                      className={`block text-[#E53E3E] mb-2 font-semibold font-sans`}
                    >
                      Time
                    </label>
                    <div
                      className={`w-full px-4 py-3 rounded-lg bg-slate-200 text-slate-800 cursor-pointer focus:border-[#C83F12] font-sans text-base border transition-colors flex justify-between items-center ${
                        formTouched && formErrors.time
                          ? "border-2 border-[#E53E3E]"
                          : "border-slate-300"
                      } ${showTimePicker ? "border-[#C83F12]" : ""}`}
                      onClick={() => setShowTimePicker(!showTimePicker)}
                    >
                      <span className="flex-1 text-left">
                        {reservationTime
                          ? formatTime(
                              selectedHour,
                              selectedMinute,
                              selectedPeriod
                            )
                          : "Select time"}
                      </span>
                      <div className="text-[#C83F12] flex-shrink-0 ml-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {formTouched && formErrors.time && (
                      <div className="text-[#E53E3E] text-sm mt-1">
                        {formErrors.time}
                      </div>
                    )}

                    {showTimePicker && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#FED7D7] rounded-xl shadow-xl z-50 p-4">
                        <div className="flex flex-row gap-4 mb-4 items-stretch">
                          <div className="text-center flex-1 flex flex-col h-full">
                            <div className="text-sm font-semibold text-[#E53E3E] mb-2">
                              Hour
                            </div>
                            <div className="max-h-32 overflow-y-auto custom-scrollbar bg-slate-50 rounded-lg p-1 h-full">
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                (hour) => (
                                  <div
                                    key={hour}
                                    className={`py-2 px-3 text-center cursor-pointer rounded transition-colors ${
                                      selectedHour === hour
                                        ? "bg-[#C83F12] text-white"
                                        : "hover:bg-[#C83F12] hover:text-white text-slate-700"
                                    }`}
                                    onClick={() => setSelectedHour(hour)}
                                  >
                                    {hour.toString().padStart(2, "0")}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="text-center flex-1 flex flex-col h-full">
                            <div className="text-sm font-semibold text-[#E53E3E] mb-2">
                              Minute
                            </div>
                            <div className="max-h-32 overflow-y-auto custom-scrollbar bg-slate-50 rounded-lg p-1 h-full">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                (minute) => (
                                  <div
                                    key={minute}
                                    className={`py-2 px-3 text-center cursor-pointer rounded transition-colors ${
                                      selectedMinute === minute
                                        ? "bg-[#C83F12] text-white"
                                        : "hover:bg-[#C83F12] hover:text-white text-slate-700"
                                    }`}
                                    onClick={() => setSelectedMinute(minute)}
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="text-center flex-1 flex flex-col h-full">
                            <div className="text-sm font-semibold text-[#E53E3E] mb-2">
                              Period
                            </div>
                            <div className="h-full flex flex-col justify-center">
                              {["AM", "PM"].map((period) => (
                                <div
                                  key={period}
                                  className={`py-2 px-3 text-center cursor-pointer rounded transition-colors border-2 ${
                                    selectedPeriod === period
                                      ? "border-[#C83F12] text-[#C83F12] bg-transparent"
                                      : "border-transparent text-slate-700 hover:bg-[#C83F12] hover:text-white bg-slate-50"
                                  }`}
                                  onClick={() =>
                                    setSelectedPeriod(period as "AM" | "PM")
                                  }
                                >
                                  {period}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between pt-3 border-t border-slate-200">
                          <button
                            type="button"
                            className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                            onClick={() => setShowTimePicker(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 bg-[#C83F12] text-white rounded-lg hover:bg-[#E53E3E] transition-colors"
                            onClick={handleTimeSelect}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-[#E53E3E] mb-2 font-semibold font-sans`}
                    >
                      Party Size
                    </label>
                    <CustomSelect
                      options={partySizeOptions}
                      value={reservationPartySize}
                      onChange={setReservationPartySize}
                      formTouched={formTouched}
                      error={formErrors.partySize}
                    />
                    {formTouched && formErrors.partySize && (
                      <div className="text-[#E53E3E] text-sm mt-1">
                        {formErrors.partySize}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-[#E53E3E] mb-2 font-semibold font-sans`}
                    >
                      Special Requests
                    </label>
                    <input
                      type="text"
                      value={reservationRequests}
                      onChange={(e) => setReservationRequests(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#C83F12] font-sans text-base`}
                      placeholder="Any special requests?"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className={`bg-[#C83F12] hover:bg-[#E53E3E] text-white px-8 py-3 rounded-lg font-semibold transition duration-200 shadow-lg hover:shadow-xl cursor-pointer`}
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section
          className={`py-16 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-12 transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "2200ms" }}
            >
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mb-4">
                Today's Special Offers
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Happy Hour",
                  description: "Enjoy 50% off on all drinks and appetizers",
                  time: "4:00 PM - 6:00 PM",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "Weekend Brunch",
                  description: "Free dessert with any main course purchase",
                  time: "Saturday & Sunday",
                  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
              ].map((offer, index) => (
                <div
                  key={index}
                  className={`bg-slate-100 backdrop-blur-sm rounded-xl p-8 shadow-xl border relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] transform hover:scale-[1.025] hover:shadow-2xl hover:z-10 hover:border-[#C83F12] ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    boxShadow:
                      "0 2px 8px 0 rgba(200,63,18,0.04), 0 8px 32px 0 rgba(200,63,18,0.08)",
                    transitionDelay: `${2400 + index * 150}ms`,
                  }}
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-[#FED7D7] to-[#E53E3E] rounded-full opacity-20 dark:opacity-30"></div>
                  <h3 className={`text-2xl font-bold text-slate-800 mb-4`}>
                    {offer.title}
                  </h3>
                  <p className={`text-slate-600/80 mb-4`}>
                    {offer.description}
                  </p>
                  <div className={`flex items-center space-x-2 text-[#C83F12]`}>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={offer.icon}
                      />
                    </svg>
                    <span>{offer.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <footer
          className={`mt-16 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div
              className={`flex flex-col md:flex-row md:items-start md:gap-16 gap-12 transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "2600ms" }}
            >
              <div className="space-y-4 flex-1 flex flex-col items-center md:items-start">
                <h3
                  className={`text-2xl font-extrabold text-slate-800 mb-6 font-serif tracking-wide text-center md:text-left`}
                >
                  Contact Us
                </h3>
                <div className="flex flex-col items-center md:items-start gap-4 text-slate-600">
                  <p className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>123 Gourmet Street, Foodville</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>(555) 123-4567</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>info@gourmetdelights.com</span>
                  </p>
                </div>
              </div>
              <div className="space-y-4 flex-1 flex flex-col items-center md:items-start">
                <h3
                  className={`text-2xl font-extrabold text-slate-800 mb-6 font-serif tracking-wide text-center md:text-left`}
                >
                  Opening Hours
                </h3>
                <div className="space-y-2 w-full max-w-xs text-slate-600">
                  <p className="flex justify-between text-center md:text-left">
                    <span>Monday - Friday</span>
                    <span>11:00 AM - 10:00 PM</span>
                  </p>
                  <p className="flex justify-between text-center md:text-left">
                    <span>Saturday</span>
                    <span>10:00 AM - 11:00 PM</span>
                  </p>
                  <p className="flex justify-between text-center md:text-left">
                    <span>Sunday</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <button
          className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 flex items-center min-w-fit px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-full shadow-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] cursor-pointer bg-[#C83F12] text-white hover:bg-[#E53E3E] hover:shadow-2xl transform hover:scale-105 ${
            headerVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-75"
          }`}
          style={{ transitionDelay: "200ms" }}
          onClick={openCart}
          aria-label="View Order"
        >
          <MdOutlineRestaurantMenu className="mr-1.5 sm:mr-2 text-base sm:text-lg md:text-2xl" />
          View Order
          {cart.length > 0 && (
            <span className="ml-2 sm:ml-3 bg-white text-[#C83F12] rounded-full px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm font-bold">
              {cart.length}
            </span>
          )}
        </button>

        {cartModalVisible && (
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors duration-300 overflow-hidden`}
            onClick={closeCart}
          >
            <div
              className={`relative bg-white rounded-2xl sm:rounded-[2rem] max-w-lg w-full max-h-[90vh] shadow-2xl border transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] flex flex-col ${
                cartModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                boxShadow:
                  "0 8px 32px 0 rgba(200,63,18,0.10), 0 32px 64px 0 rgba(200,63,18,0.12)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 pb-4 flex-shrink-0">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E] mb-2 font-serif tracking-tight">
                    Your Order
                  </h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto modal-scrollbar px-6">
                {cart.length === 0 ? (
                  <div className="text-center text-slate-500 py-16 font-sans">
                    Your order is empty.
                  </div>
                ) : (
                  <div>
                    <ul className="space-y-4 mb-6">
                      {cart.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start justify-between p-4 rounded-lg bg-slate-100"
                        >
                          <div className="flex-1 pr-4">
                            <div className="font-bold text-slate-800 font-serif text-lg">
                              {item.dish.name}
                            </div>
                            <div className="text-sm text-slate-500 font-sans">
                              {item.quantity} × ${item.finalPrice.toFixed(2)}
                            </div>
                            {item.specialRequests && (
                              <div className="text-xs text-[#C83F12] font-sans italic mt-1">
                                "{item.specialRequests}"
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="font-semibold text-slate-700 font-sans text-base">
                              ${(item.finalPrice * item.quantity).toFixed(2)}
                            </div>
                            <button
                              onClick={() => removeFromCart(idx)}
                              className="p-2 rounded-full hover:bg-red-100 transition-colors group cursor-pointer"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="text-slate-400 group-hover:text-red-500 transition-colors" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 pt-4 flex-shrink-0 bg-white border-t border-slate-200 rounded-b-2xl sm:rounded-b-[2rem]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center font-sans">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="text-slate-800 font-medium">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-sans">
                      <span className="text-slate-600">Taxes & Fees</span>
                      <span className="text-slate-800 font-medium">
                        ${(cartTotal * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-300 pt-4 mt-4">
                      <span className="text-lg font-bold text-slate-800 font-serif">
                        Total
                      </span>
                      <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C83F12] to-[#E53E3E]">
                        ${(cartTotal * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className={`w-full bg-[#C83F12] hover:bg-[#E53E3E] text-white py-3 rounded-lg font-semibold transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer ${
                        cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      <span>Proceed to Checkout</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                className={`absolute top-4 right-4 text-slate-800 hover:text-slate-600 text-2xl transition-colors cursor-pointer z-10`}
                onClick={closeCart}
                aria-label="Close Cart"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <style>{`

        .Toastify__toast--success {
        background: #C83F12 !important;
        }

        .Toastify__toast--error {
        background: #E53E3E !important;
        }

        .Toastify__progress-bar {
        background: rgba(255, 255, 255, 0.7) !important;
        }
        .loader-chef-hat {
          animation: gentleFloat 2s ease-in-out infinite;
        }
        
        .hat-top {
          animation: breathe 2.5s ease-in-out infinite;
        }
        
        .hat-band {
          animation: pulseColor 2s ease-in-out infinite;
        }
        
        .floating-element-1 {
          animation: float1 3s ease-in-out infinite;
        }
        
        .floating-element-2 {
          animation: float2 2.5s ease-in-out infinite 0.5s;
        }
        
        .floating-element-3 {
          animation: float3 3.5s ease-in-out infinite 1s;
        }
        
        .floating-element-4 {
          animation: float4 2.8s ease-in-out infinite 1.5s;
        }
        
        .loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C83F12;
          animation: loadingDots 1.5s ease-in-out infinite;
        }
        
        .loading-dot-1 {
          animation-delay: 0s;
        }
        
        .loading-dot-2 {
          animation-delay: 0.2s;
        }
        
        .loading-dot-3 {
          animation-delay: 0.4s;
        }
        
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }
        
        @keyframes breathe {
          0%, 100% {
            fill: #FEF2F2;
          }
          50% {
            fill: #FFFFFF;
          }
        }
        
        @keyframes pulseColor {
          0%, 100% {
            fill: #C83F12;
          }
          50% {
            fill: #E53E3E;
          }
        }
        
        @keyframes float1 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-3px);
          }
        }
        
        @keyframes float2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-8px) translateX(-6px);
          }
        }
        
        @keyframes float3 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          40% {
            transform: translateY(6px) translateX(4px);
          }
          80% {
            transform: translateY(-4px) translateX(-2px);
          }
        }
        
        @keyframes float4 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          60% {
            transform: translateY(-7px) translateX(3px);
          }
        }
        
        @keyframes loadingDots {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
                  }
          
          .floating-chef-cap {
            animation: headerFloat 3s ease-in-out infinite;
          }
          
          @keyframes headerFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }
  
          @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gentleBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-3px);
          }
          60% {
            transform: translateY(-2px);
          }
        }

        .animate-on-scroll {
          animation: fadeInUp 0.6s ease-out forwards;
        }


        html {
          scrollbar-width: thin;
          scrollbar-color: #C83F12 #f8fafc;
        }
        html.dark {
          scrollbar-color: #C83F12 #1e293b;
        }
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        ::-webkit-scrollbar-thumb {
          background: #C83F12;
          border-radius: 8px;
        }
        ::-webkit-scrollbar-track {
          background: linear-gradient(135deg, #FEF2F2 0%, #FED7D7 100%);
          border-radius: 8px;
        }
        html.dark ::-webkit-scrollbar-track {
          background: #1e293b;
        }

        .specials-scrollbar { scrollbar-width: thin; }
        .specials-scrollbar::-webkit-scrollbar { height: 10px; }
        .specials-scrollbar::-webkit-scrollbar-thumb { background: #C83F12; border-radius: 8px; }
        
        .modal-scrollbar { scrollbar-width: thin; border-radius: 2rem; }
        .modal-scrollbar::-webkit-scrollbar { width: 10px; border-radius: 2rem; }
        .modal-scrollbar::-webkit-scrollbar-thumb { background: #C83F12; border-radius: 2rem; }
        .modal-scrollbar::-webkit-scrollbar-track { background: linear-gradient(135deg, #FEF2F2 0%, #FED7D7 100%); border-radius: 2rem; }

        .custom-scrollbar { scrollbar-width: thin; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C83F12; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: linear-gradient(135deg, #FEF2F2 0%, #FED7D7 100%); border-radius: 6px; }


        html.dark .specials-scrollbar { scrollbar-color: #C83F12 #1e293b; 
        html:not(.dark) .specials-scrollbar { scrollbar-color: #C83F12 #f8fafc; }
        html.dark .specials-scrollbar::-webkit-scrollbar-track { background: #1e293b; border-radius: 8px; }
        html:not(.dark) .specials-scrollbar::-webkit-scrollbar-track { background: linear-gradient(135deg, #FEF2F2 0%, #FED7D7 100%); border-radius: 8px; }
        
        html.dark input[type="date"]::-webkit-calendar-picker-indicator,
        html.dark input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
        html.dark input[type="date"], html.dark input[type="time"] {
           color-scheme: dark;
        }
        .themed-select option {
          background-color: white !important;
          color: #1e293b !important;
        }
        .themed-select option:checked,
        .themed-select option:hover {
          background-color: #C83F12 !important;
          color: white !important;
        }


        @media (max-width: 640px) {
          .Toastify__toast-container {
            width: calc(100vw - 2rem) !important;
            left: 1rem !important;
            right: 1rem !important;
            top: 1rem !important;
            padding: 0 !important;
          }
          .Toastify__toast {
            margin-bottom: 0.5rem !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            padding: 12px 16px !important;
            min-height: auto !important;
            box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15) !important;
          }
          .Toastify__toast-body {
            padding: 0 !important;
            margin: 0 !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
          }
          .Toastify__close-button {
            width: 18px !important;
            height: 18px !important;
            font-size: 14px !important;
          }
          .Toastify__progress-bar {
            height: 3px !important;
          }
        }

  
        @media (min-width: 641px) {
          .Toastify__toast-container {
            width: 320px !important;
          }
          .Toastify__toast {
            border-radius: 12px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </div>
    </div>
  );
};

export default RestaurantMenu;
