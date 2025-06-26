"use client";

import React, { useState, useEffect, useRef } from "react";

const Icon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  fill = "none",
  children,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

const Heart = ({ ...props }) => (
  <Icon {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Icon>
);

const Star = ({ ...props }) => (
  <Icon {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);

const ShoppingBag = ({ ...props }) => (
  <Icon {...props}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </Icon>
);

const User = ({ ...props }) => (
  <Icon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

const Search = ({ ...props }) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

const MapPin = ({ ...props }) => (
  <Icon {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

const Gift = ({ ...props }) => (
  <Icon {...props}>
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </Icon>
);

const Sparkles = ({ color = "currentColor", ...props }) => (
  <Icon {...props} viewBox="0 0 16 16" fill={color} stroke="none">
    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
  </Icon>
);

const ChevronLeft = ({ ...props }) => (
  <Icon {...props}>
    <path d="m15 18-6-6 6-6" />
  </Icon>
);

const ChevronRight = ({ ...props }) => (
  <Icon {...props}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);

const Plus = ({ ...props }) => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

const Minus = ({ ...props }) => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

const Check = ({ ...props }) => (
  <Icon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

const X = ({ ...props }) => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

const CreditCard = ({ ...props }) => (
  <Icon {...props}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </Icon>
);

const Shield = ({ ...props }) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Icon>
);

const Fingerprint = ({ ...props }) => (
  <Icon {...props}>
    <path d="M6.89258 17.7897C6.9083 17.7633 6.92441 17.7369 6.9409 17.7107C8.14358 15.7988 8.8398 13.5379 8.8398 11.1034C8.8398 9.14189 10.4299 7.55176 12.3915 7.55176C14.353 7.55176 15.9431 9.14189 15.9431 11.1034C15.9431 12.0065 15.8816 12.8957 15.7626 13.7672M13.8825 19.8437C14.4257 18.7596 14.871 17.6179 15.2069 16.4309M18.6156 17.4359C19.1883 15.4236 19.4949 13.2993 19.4949 11.1033C19.4949 7.18026 16.3147 4 12.3916 4C11.0978 4 9.88477 4.34591 8.83997 4.9503M4.40039 14.9783C4.96924 13.8073 5.28831 12.4926 5.28831 11.1033C5.28831 9.8095 5.63422 8.59646 6.2386 7.55166M12.3915 11.1035C12.3915 14.2265 11.4958 17.1403 9.94727 19.6019" />
  </Icon>
);

interface Artist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  images: string[];
  bio: string;
  experience: string;
  location: string;
  availability: string[];
}

interface Service {
  id: string;
  name: string;
  basePrice: number;
  duration: number;
  category: string;
  description: string;
  addOns: { name: string; price: number }[];
}

interface CartItem {
  artistId: string;
  serviceId: string;
  customizations: Record<string, number>;
  addOns: string[];
  totalPrice: number;
}

const artists: Artist[] = [
  {
    id: "1",
    name: "Isabella Chen",
    specialty: "Luxury Facial Specialist",
    rating: 4.9,
    reviews: 247,
    price: 180,
    images: [
      "https://images.pexels.com/photos/6635922/pexels-photo-6635922.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/12008270/pexels-photo-12008270.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6417957/pexels-photo-6417957.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    bio: "Award-winning aesthetician with 8+ years specializing in anti-aging treatments and luxury skincare.",
    experience: "8 years",
    location: "Beverly Hills, CA",
    availability: ["Today 2:00 PM", "Tomorrow 10:00 AM", "Wed 3:30 PM"],
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    specialty: "Master Hair Stylist",
    rating: 4.8,
    reviews: 189,
    price: 220,
    images: [
      "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    bio: "Celebrity hair stylist known for cutting-edge color techniques and precision cuts.",
    experience: "12 years",
    location: "West Hollywood, CA",
    availability: ["Today 4:00 PM", "Tomorrow 11:00 AM", "Thu 1:00 PM"],
  },
  {
    id: "3",
    name: "Sophia Laurent",
    specialty: "Nails Art Virtuoso",
    rating: 4.9,
    reviews: 312,
    price: 95,
    images: [
      "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/887352/pexels-photo-887352.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    bio: "International nail artist specializing in intricate designs and luxury manicures.",
    experience: "6 years",
    location: "Santa Monica, CA",
    availability: ["Today 1:00 PM", "Tomorrow 9:00 AM", "Wed 2:00 PM"],
  },
];

const services: Service[] = [
  {
    id: "1",
    name: "Signature Hydrafacial",
    basePrice: 180,
    duration: 75,
    category: "Facial",
    description: "Deep cleansing, exfoliation, and hydration treatment",
    addOns: [
      { name: "LED Light Therapy", price: 45 },
      { name: "Lymphatic Drainage", price: 35 },
      { name: "Dermaplane Add-on", price: 50 },
    ],
  },
  {
    id: "2",
    name: "Precision Cut & Style",
    basePrice: 220,
    duration: 120,
    category: "Hair",
    description: "Consultation, precision cut, and professional styling",
    addOns: [
      { name: "Deep Conditioning", price: 40 },
      { name: "Scalp Treatment", price: 55 },
      { name: "Blowout Styling", price: 65 },
    ],
  },
  {
    id: "3",
    name: "Luxury Gel Manicure",
    basePrice: 95,
    duration: 60,
    category: "Nails",
    description: "Premium gel manicure with nail art options",
    addOns: [
      { name: "Hand Massage", price: 25 },
      { name: "Cuticle Treatment", price: 20 },
      { name: "Nail Art Design", price: 35 },
    ],
  },
  {
    id: "4",
    name: "Color & Highlights",
    basePrice: 280,
    duration: 180,
    category: "Hair",
    description: "Professional hair coloring with highlights",
    addOns: [
      { name: "Toner Treatment", price: 45 },
      { name: "Hair Gloss", price: 35 },
      { name: "Keratin Treatment", price: 85 },
    ],
  },
  {
    id: "5",
    name: "Anti-Aging Facial",
    basePrice: 250,
    duration: 90,
    category: "Facial",
    description: "Advanced anti-aging treatment with peptides",
    addOns: [
      { name: "Microcurrent Therapy", price: 60 },
      { name: "Collagen Mask", price: 40 },
      { name: "Eye Treatment", price: 35 },
    ],
  },
  {
    id: "6",
    name: "Luxury Pedicure",
    basePrice: 85,
    duration: 75,
    category: "Nails",
    description: "Relaxing pedicure with foot massage",
    addOns: [
      { name: "Paraffin Treatment", price: 25 },
      { name: "Callus Removal", price: 20 },
      { name: "Foot Scrub", price: 15 },
    ],
  },
  {
    id: "7",
    name: "Bridal Hair & Makeup",
    basePrice: 450,
    duration: 240,
    category: "Hair",
    description: "Complete bridal styling package",
    addOns: [
      { name: "Trial Session", price: 150 },
      { name: "Hair Extensions", price: 100 },
      { name: "Touch-up Kit", price: 75 },
    ],
  },
];

export default function BeautyBookingApp() {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [customizations, setCustomizations] = useState<Record<string, number>>(
    {}
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [pointsEarnedOnPurchase, setPointsEarnedOnPurchase] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCart]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const toggleFavorite = (artistId: string) => {
    setFavorites((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId]
    );
  };

  const handleBiometricAuth = () => {
    setShowBiometric(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsGuest(false);
      setShowBiometric(false);
    }, 2000);
  };

  const handleGuestMode = () => {
    setIsGuest(true);
    setIsAuthenticated(false);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === 0 || touchEndX.current === 0) return;
    const swipeDistance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) {
      nextImage();
    } else if (swipeDistance < -swipeThreshold) {
      prevImage();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const addToCart = (artistId: string, serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    let totalPrice = service.basePrice;

    // Add customization costs
    Object.values(customizations).forEach((value) => {
      totalPrice += value * 10; // $10 per customization level
    });

    // Add add-on costs
    selectedAddOns.forEach((addOnName) => {
      const addOn = service.addOns.find((a) => a.name === addOnName);
      if (addOn) totalPrice += addOn.price;
    });

    const cartItem: CartItem = {
      artistId,
      serviceId,
      customizations: { ...customizations },
      addOns: [...selectedAddOns],
      totalPrice,
    };

    setCart((prev) => [...prev, cartItem]);
    setCustomizations({});
    setSelectedAddOns([]);
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    if (newCart.length === 0) {
      setShowCart(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getCartItemCount = () => {
    return cart.length;
  };

  const getDiscountedTotal = () => {
    const total = getCartTotal();
    const discount = pointsToUse / 10; // 1 points = $0.1
    return Math.max(0, total - discount);
  };

  const getMaxPointsToUse = () => {
    const total = getCartTotal();
    return Math.min(loyaltyPoints, total * 10); // Can't use more points than total cost allows
  };

  const handleBooking = () => {
    if (cart.length === 0) return;

    const pointsEarned = isAuthenticated
      ? Math.floor(getDiscountedTotal() * 0.1)
      : 0;

    if (isAuthenticated) {
      setLoyaltyPoints((prev) => prev - pointsToUse + pointsEarned);
      setPointsEarnedOnPurchase(pointsEarned);
    }

    setCart([]);
    setPointsToUse(0);
    setShowCart(false);
    setShowBookingSuccess(true);

    setTimeout(() => {
      setShowBookingSuccess(false);
    }, 4000);
  };

  const nextImage = () => {
    if (selectedArtist) {
      setCurrentImageIndex((prev) =>
        prev === selectedArtist.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedArtist) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedArtist.images.length - 1 : prev - 1
      );
    }
  };

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || artist.specialty.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const themeStyles = {
    background: isDark
      ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
      : "linear-gradient(135deg, #ffeef8 0%, #f0f4ff 50%, #e8f5ff 100%)",
    cardBg: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.9)",
    headerBg: isDark ? "rgba(22, 33, 62, 0.2)" : "rgba(255, 255, 255, 0.7)",
    text: isDark ? "#ffffff" : "#1a1a2e",
    textSecondary: isDark ? "#b8b8d1" : "#6b7280",
    border: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    accent: "linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #6c5ce7 100%)",
    accentHover:
      "linear-gradient(135deg, #ff8fab 0%, #d55a7a 50%, #7d6ef0 100%)",
  };

  if (!isAuthenticated && !isGuest) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: themeStyles.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: themeStyles.cardBg,
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "40px",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
            border: `1px solid ${themeStyles.border}`,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: themeStyles.accent,
              borderRadius: "50%",
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={40} color="white" />
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: themeStyles.text,
              marginBottom: "8px",
            }}
          >
            Welcome to Luxe Beauty
          </h1>

          <p
            style={{
              color: themeStyles.textSecondary,
              marginBottom: "32px",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            Premium beauty services at your fingertips
          </p>

          {showBiometric ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: themeStyles.accent,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "pulse 2s infinite",
                }}
              >
                <Fingerprint size={30} color="white" />
              </div>
              <p style={{ color: themeStyles.text }}>Authenticating...</p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <button
                onClick={handleBiometricAuth}
                style={{
                  background: themeStyles.accent,
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  padding: "16px 32px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = themeStyles.accentHover)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = themeStyles.accent)
                }
              >
                <Shield size={20} />
                Secure Login
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  margin: "8px 0",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: themeStyles.border,
                  }}
                />
                <span
                  style={{
                    color: themeStyles.textSecondary,
                    fontSize: "14px",
                  }}
                >
                  or
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: themeStyles.border,
                  }}
                />
              </div>

              <button
                onClick={handleGuestMode}
                style={{
                  background: "transparent",
                  color: themeStyles.text,
                  border: `2px solid ${themeStyles.border}`,
                  borderRadius: "16px",
                  padding: "16px 32px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = themeStyles.cardBg;
                  e.currentTarget.style.borderColor = themeStyles.text;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = themeStyles.border;
                }}
              >
                <User size={20} />
                Continue as Guest
              </button>

              <p
                style={{
                  color: themeStyles.textSecondary,
                  fontSize: "12px",
                  marginTop: "8px",
                  lineHeight: "1.4",
                }}
              >
                Guest mode: No loyalty points or saved preferences
              </p>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `}</style>
      </div>
    );
  }
  if (currentView === "artist" && selectedArtist) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: themeStyles.background,
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
        }}
      >
        {currentView === "artist" && selectedArtist ? (
          <div>
            <div
              style={{
                background: themeStyles.headerBg,
                backdropFilter: "blur(20px)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${themeStyles.border}`,
                position: "sticky",
                top: 0,
                zIndex: 100,
              }}
            >
              <button
                onClick={() => setCurrentView("home")}
                style={{
                  background: "none",
                  border: "none",
                  color: themeStyles.text,
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "12px",
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <h2
                style={{
                  color: themeStyles.text,
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                {selectedArtist.name}
              </h2>
              <button
                onClick={() => toggleFavorite(selectedArtist.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "12px",
                }}
              >
                <Heart
                  size={24}
                  color={
                    favorites.includes(selectedArtist.id)
                      ? "#ff6b9d"
                      : themeStyles.textSecondary
                  }
                  fill={
                    favorites.includes(selectedArtist.id) ? "#ff6b9d" : "none"
                  }
                />
              </button>
            </div>

            <div
              style={{
                position: "relative",
                height: "300px",
                overflow: "hidden",
                cursor: "grab",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {selectedArtist.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      flexShrink: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${selectedArtist.name} ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={prevImage}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                <ChevronLeft size={20} color="white" />
              </button>
              <button
                onClick={nextImage}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                <ChevronRight size={20} color="white" />
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "8px",
                  zIndex: 2,
                }}
              >
                {selectedArtist.images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background:
                        index === currentImageIndex
                          ? "white"
                          : "rgba(255, 255, 255, 0.5)",
                      cursor: "pointer",
                      transition: "background 0.3s",
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div style={{ padding: "24px 20px" }}>
              <div
                style={{
                  background: themeStyles.cardBg,
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  padding: "24px",
                  border: `1px solid ${themeStyles.border}`,
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color: themeStyles.text,
                        fontSize: "24px",
                        fontWeight: "700",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {selectedArtist.name}
                    </h3>
                    <p
                      style={{
                        color: themeStyles.textSecondary,
                        fontSize: "16px",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {selectedArtist.specialty}
                    </p>
                  </div>
                  <div
                    style={{
                      background: themeStyles.accent,
                      borderRadius: "12px",
                      padding: "8px 12px",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    ${selectedArtist.price}+
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Star size={16} color="#ffd700" fill="#ffd700" />
                    <span
                      style={{
                        color: themeStyles.text,
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {selectedArtist.rating}
                    </span>
                    <span
                      style={{
                        color: themeStyles.textSecondary,
                        fontSize: "14px",
                      }}
                    >
                      ({selectedArtist.reviews} reviews)
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <MapPin size={16} color={themeStyles.textSecondary} />
                    <span
                      style={{
                        color: themeStyles.textSecondary,
                        fontSize: "14px",
                      }}
                    >
                      {selectedArtist.location}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    color: themeStyles.text,
                    fontSize: "14px",
                    lineHeight: "1.5",
                    marginBottom: "16px",
                  }}
                >
                  {selectedArtist.bio}
                </p>
                <div
                  style={{
                    background: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderRadius: "12px",
                    padding: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <h4
                    style={{
                      color: themeStyles.text,
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "0 0 8px 0",
                    }}
                  >
                    Next Available
                  </h4>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {selectedArtist.availability.map((slot, index) => (
                      <div
                        key={index}
                        style={{
                          background: themeStyles.accent,
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: themeStyles.cardBg,
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  padding: "24px",
                  border: `1px solid ${themeStyles.border}`,
                }}
              >
                <h4
                  style={{
                    color: themeStyles.text,
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 16px 0",
                  }}
                >
                  Services & Customization
                </h4>
                {services
                  .filter((service) =>
                    selectedArtist.specialty.includes(service.category)
                  )
                  .map((service) => (
                    <div
                      key={service.id}
                      style={{
                        border: `1px solid ${themeStyles.border}`,
                        borderRadius: "16px",
                        padding: "20px",
                        marginBottom: "16px",
                        background: isDark
                          ? "rgba(255, 255, 255, 0.02)"
                          : "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "12px",
                        }}
                      >
                        <div>
                          <h5
                            style={{
                              color: themeStyles.text,
                              fontSize: "16px",
                              fontWeight: "600",
                              margin: "0 0 4px 0",
                            }}
                          >
                            {service.name}
                          </h5>
                          <p
                            style={{
                              color: themeStyles.textSecondary,
                              fontSize: "14px",
                              margin: "0 0 8px 0",
                            }}
                          >
                            {service.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <span
                              style={{
                                color: themeStyles.text,
                                fontSize: "18px",
                                fontWeight: "700",
                              }}
                            >
                              ${service.basePrice}
                            </span>
                            <span
                              style={{
                                color: themeStyles.textSecondary,
                                fontSize: "14px",
                              }}
                            >
                              {service.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <h6
                          style={{
                            color: themeStyles.text,
                            fontSize: "14px",
                            fontWeight: "600",
                            margin: "0 0 12px 0",
                          }}
                        >
                          Intensity Level (+$10 per level)
                        </h6>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() =>
                              setCustomizations((prev) => ({
                                ...prev,
                                [service.id]: Math.max(
                                  0,
                                  (prev[service.id] || 0) - 1
                                ),
                              }))
                            }
                            style={{
                              background: themeStyles.accent,
                              border: "none",
                              borderRadius: "8px",
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <Minus size={16} color="white" />
                          </button>
                          <div
                            style={{
                              flex: 1,
                              height: "8px",
                              background: isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)",
                              borderRadius: "4px",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                width: `${
                                  ((customizations[service.id] || 0) / 5) * 100
                                }%`,
                                height: "100%",
                                background: themeStyles.accent,
                                borderRadius: "4px",
                                transition: "width 0.3s ease",
                              }}
                            />
                          </div>
                          <button
                            onClick={() =>
                              setCustomizations((prev) => ({
                                ...prev,
                                [service.id]: Math.min(
                                  5,
                                  (prev[service.id] || 0) + 1
                                ),
                              }))
                            }
                            style={{
                              background: themeStyles.accent,
                              border: "none",
                              borderRadius: "8px",
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <Plus size={16} color="white" />
                          </button>
                          <span
                            style={{
                              color: themeStyles.text,
                              fontSize: "14px",
                              fontWeight: "600",
                              minWidth: "20px",
                            }}
                          >
                            {customizations[service.id] || 0}
                          </span>
                        </div>
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <h6
                          style={{
                            color: themeStyles.text,
                            fontSize: "14px",
                            fontWeight: "600",
                            margin: "0 0 12px 0",
                          }}
                        >
                          Add-ons
                        </h6>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {service.addOns.map((addOn) => (
                            <label
                              key={addOn.name}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                cursor: "pointer",
                                padding: "8px",
                                borderRadius: "8px",
                                background: selectedAddOns.includes(addOn.name)
                                  ? isDark
                                    ? "rgba(255, 107, 157, 0.1)"
                                    : "rgba(255, 107, 157, 0.1)"
                                  : "transparent",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedAddOns.includes(addOn.name)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAddOns((prev) => [
                                      ...prev,
                                      addOn.name,
                                    ]);
                                  } else {
                                    setSelectedAddOns((prev) =>
                                      prev.filter((name) => name !== addOn.name)
                                    );
                                  }
                                }}
                                style={{ display: "none" }}
                              />
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "4px",
                                  border: `2px solid ${
                                    selectedAddOns.includes(addOn.name)
                                      ? "#ff6b9d"
                                      : themeStyles.border
                                  }`,
                                  background: selectedAddOns.includes(
                                    addOn.name
                                  )
                                    ? "#ff6b9d"
                                    : "transparent",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {selectedAddOns.includes(addOn.name) && (
                                  <Check size={12} color="white" />
                                )}
                              </div>
                              <span
                                style={{
                                  color: themeStyles.text,
                                  fontSize: "14px",
                                  flex: 1,
                                }}
                              >
                                {addOn.name}
                              </span>
                              <span
                                style={{
                                  color: themeStyles.text,
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                +${addOn.price}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          background: themeStyles.accent,
                          borderRadius: "12px",
                          padding: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            Total Price
                          </span>
                          <span
                            style={{
                              color: "white",
                              fontSize: "18px",
                              fontWeight: "700",
                            }}
                          >
                            $
                            {service.basePrice +
                              (customizations[service.id] || 0) * 10 +
                              selectedAddOns.reduce((sum, addOnName) => {
                                const addOn = service.addOns.find(
                                  (a) => a.name === addOnName
                                );
                                return sum + (addOn ? addOn.price : 0);
                              }, 0)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(selectedArtist.id, service.id)}
                        style={{
                          background: themeStyles.accent,
                          color: "white",
                          border: "none",
                          borderRadius: "12px",
                          padding: "12px 24px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                background: themeStyles.cardBg,
                backdropFilter: "blur(20px)",
                padding: "20px",
                borderBottom: `1px solid ${themeStyles.border}`,
                position: "sticky",
                top: 0,
                zIndex: 100,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h1
                    style={{
                      color: themeStyles.text,
                      fontSize: "28px",
                      fontWeight: "700",
                      margin: "0 0 4px 0",
                      background: themeStyles.accent,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Luxe Beauty
                  </h1>

                  <p
                    style={{
                      color: themeStyles.textSecondary,
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    Premium beauty services
                  </p>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {isAuthenticated ? (
                    <div
                      style={{
                        background: themeStyles.accent,
                        borderRadius: "12px",
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Gift size={16} color="white" />

                      <span
                        style={{
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {loyaltyPoints} pts
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        background: isDark
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <User size={16} color={themeStyles.text} />

                      <span
                        style={{
                          color: themeStyles.text,
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        Guest
                      </span>
                    </div>
                  )}

                  <button
                    onClick={toggleTheme}
                    style={{
                      background: isDark
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.2)",
                      border: "none",
                      borderRadius: "12px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    {isDark ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 3V0H9V3H7Z" fill="#ff8fab" />
                        <path d="M9 13V16H7V13H9Z" fill="#ff8fab" />
                        <path
                          d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                          fill="#ff8fab"
                        />
                        <path d="M0 9H3V7H0V9Z" fill="#ff8fab" />
                        <path d="M16 7H13V9H16V7Z" fill="#ff8fab" />
                        <path
                          d="M3.75735 5.17157L1.63603 3.05025L3.05025 1.63603L5.17157 3.75735L3.75735 5.17157Z"
                          fill="#ff8fab"
                        />
                        <path
                          d="M12.2426 10.8284L14.364 12.9497L12.9497 14.364L10.8284 12.2426L12.2426 10.8284Z"
                          fill="#ff8fab"
                        />
                        <path
                          d="M3.05025 14.364L5.17157 12.2426L3.75735 10.8284L1.63603 12.9498L3.05025 14.364Z"
                          fill="#ff8fab"
                        />
                        <path
                          d="M12.9497 1.63604L10.8284 3.75736L12.2426 5.17158L14.364 3.05026L12.9497 1.63604Z"
                          fill="#ff8fab"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          fill={themeStyles.text}
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  marginBottom: "16px",
                }}
              >
                <Search
                  size={20}
                  color={themeStyles.textSecondary}
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <input
                  type="text"
                  placeholder="Search artists or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px 16px 16px 48px",
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: "16px",
                    background: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",

                    color: themeStyles.text,
                    fontSize: "16px",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  paddingBottom: "4px",
                }}
              >
                {["All", "Facial", "Hair", "Nails"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      background:
                        selectedCategory === category
                          ? themeStyles.accent
                          : "transparent",

                      color:
                        selectedCategory === category
                          ? "white"
                          : themeStyles.text,

                      border:
                        selectedCategory === category
                          ? "none"
                          : `1px solid ${themeStyles.border}`,

                      borderRadius: "20px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {filteredArtists.map((artist, index) => (
                  <div
                    key={artist.id}
                    onClick={() => {
                      setSelectedArtist(artist);
                      setCurrentView("artist");
                      setCurrentImageIndex(0);
                    }}
                    style={{
                      background: themeStyles.cardBg,
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      overflow: "hidden",
                      border: `1px solid ${themeStyles.border}`,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div style={{ position: "relative", height: "200px" }}>
                      <img
                        src={artist.images[0]}
                        alt={artist.name}
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          toggleFavorite(artist.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "rgba(0, 0, 0, 0.5)",
                          border: "none",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Heart
                          size={18}
                          color={
                            favorites.includes(artist.id) ? "#ff6b9d" : "white"
                          }
                          fill={
                            favorites.includes(artist.id) ? "#ff6b9d" : "none"
                          }
                        />
                      </button>

                      <div
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          left: "12px",
                          background: themeStyles.accent,
                          borderRadius: "8px",
                          padding: "4px 8px",
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        ${artist.price}+
                      </div>
                    </div>

                    <div style={{ padding: "20px" }}>
                      <h3
                        style={{
                          color: themeStyles.text,
                          fontSize: "18px",
                          fontWeight: "700",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {artist.name}
                      </h3>

                      <p
                        style={{
                          color: themeStyles.textSecondary,
                          fontSize: "14px",
                          margin: "0 0 12px 0",
                        }}
                      >
                        {artist.specialty}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Star size={14} color="#ffd700" fill="#ffd700" />

                          <span
                            style={{
                              color: themeStyles.text,
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {artist.rating}
                          </span>

                          <span
                            style={{
                              color: themeStyles.textSecondary,
                              fontSize: "12px",
                            }}
                          >
                            ({artist.reviews})
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <MapPin size={12} color={themeStyles.textSecondary} />

                          <span
                            style={{
                              color: themeStyles.textSecondary,
                              fontSize: "12px",
                            }}
                          >
                            {artist.location.split(",")[0]}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          background: isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.05)",

                          borderRadius: "8px",
                          padding: "8px",
                          fontSize: "12px",
                          color: themeStyles.textSecondary,
                        }}
                      >
                        Next: {artist.availability[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {getCartItemCount() > 0 && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              background: themeStyles.accent,
              borderRadius: "20px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
            onClick={() => setShowCart(true)}
          >
            <ShoppingBag size={20} color="white" />
            <div style={{ color: "white" }}>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                {getCartItemCount()} item{getCartItemCount() !== 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700" }}>
                ${getCartTotal()}
              </div>
            </div>
          </div>
        )}

        {showCart && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(12, 18, 34, 0.8)",
              display: "flex",
              alignItems: "flex-end",
              zIndex: 2000,
            }}
          >
            <div
              style={{
                background: themeStyles.headerBg,
                backdropFilter: "blur(20px)",
                borderRadius: "24px 24px 0 0",
                padding: "24px",
                width: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    color: themeStyles.text,
                    fontSize: "20px",
                    fontWeight: "700",
                    margin: 0,
                  }}
                >
                  Your Cart
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: themeStyles.text,
                    cursor: "pointer",
                    padding: "8px",
                  }}
                >
                  <X size={24} />
                </button>
              </div>
              {cart.map((item, index) => {
                const artist = artists.find((a) => a.id === item.artistId);
                const service = services.find((s) => s.id === item.serviceId);
                return (
                  <div
                    key={index}
                    style={{
                      border: `1px solid ${themeStyles.border}`,
                      borderRadius: "16px",
                      padding: "16px",
                      marginBottom: "12px",
                      background: isDark
                        ? "rgba(255, 255, 255, 0.02)"
                        : "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            color: themeStyles.text,
                            fontSize: "16px",
                            fontWeight: "600",
                            margin: "0 0 4px 0",
                          }}
                        >
                          {service?.name}
                        </h4>
                        <p
                          style={{
                            color: themeStyles.textSecondary,
                            fontSize: "14px",
                            margin: "0 0 4px 0",
                          }}
                        >
                          with {artist?.name}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: themeStyles.text,
                            fontSize: "16px",
                            fontWeight: "700",
                          }}
                        >
                          ${item.totalPrice}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          style={{
                            background: "rgba(255, 107, 157, 0.1)",
                            border: "none",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <X size={16} color="#ff6b9d" />
                        </button>
                      </div>
                    </div>
                    {item.addOns.length > 0 && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: themeStyles.textSecondary,
                          marginTop: "8px",
                        }}
                      >
                        Add-ons: {item.addOns.join(", ")}
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                style={{
                  borderTop: `1px solid ${themeStyles.border}`,
                  paddingTop: "16px",
                  marginTop: "16px",
                }}
              >
                {isAuthenticated && loyaltyPoints >= 0 && (
                  <div
                    style={{
                      background: themeStyles.accent,
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <div style={{ color: "white" }}>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>
                          Use Loyalty Points
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.9 }}>
                          1 point = $0.1 discount
                        </div>
                      </div>
                      <div style={{ color: "white", fontSize: "12px" }}>
                        Available: {loyaltyPoints} pts
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <button
                        onClick={() =>
                          setPointsToUse(Math.max(0, pointsToUse - 100))
                        }
                        style={{
                          background: "rgba(255, 255, 255, 0.2)",
                          border: "none",
                          borderRadius: "8px",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Minus size={16} color="white" />
                      </button>
                      <div
                        style={{
                          flex: 1,
                          height: "8px",
                          background: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "4px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: `${
                              (pointsToUse / getMaxPointsToUse()) * 100
                            }%`,
                            height: "100%",
                            background: "white",
                            borderRadius: "4px",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                      <button
                        onClick={() =>
                          setPointsToUse(
                            Math.min(getMaxPointsToUse(), pointsToUse + 100)
                          )
                        }
                        style={{
                          background: "rgba(255, 255, 255, 0.2)",
                          border: "none",
                          borderRadius: "8px",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Plus size={16} color="white" />
                      </button>
                      <span
                        style={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "600",
                          minWidth: "60px",
                        }}
                      >
                        {pointsToUse} pts
                      </span>
                    </div>
                    {pointsToUse > 0 && (
                      <div
                        style={{
                          color: "white",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        Discount: -${(pointsToUse / 10).toFixed(2)}
                      </div>
                    )}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      color: themeStyles.textSecondary,
                      fontSize: "16px",
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      color: themeStyles.text,
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    ${getCartTotal()}
                  </span>
                </div>
                {pointsToUse > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ color: "#ff6b9d", fontSize: "16px" }}>
                      Points Discount
                    </span>
                    <span
                      style={{
                        color: "#ff6b9d",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      -${(pointsToUse / 10).toFixed(2)}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    paddingTop: "8px",
                    borderTop: `1px solid ${themeStyles.border}`,
                  }}
                >
                  <span
                    style={{
                      color: themeStyles.text,
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      color: themeStyles.text,
                      fontSize: "24px",
                      fontWeight: "700",
                    }}
                  >
                    ${getDiscountedTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={cart.length === 0}
                  style={{
                    background: themeStyles.accent,
                    color: "white",
                    border: "none",
                    borderRadius: "16px",
                    padding: "16px",
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: cart.length === 0 ? "not-allowed" : "pointer",
                    opacity: cart.length === 0 ? 0.6 : 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <CreditCard size={20} />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}

        {showBookingSuccess && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3000,
            }}
          >
            <div
              style={{
                background: themeStyles.cardBg,
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: "40px",
                textAlign: "center",
                maxWidth: "400px",
                width: "90%",
                border: `1px solid ${themeStyles.border}`,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                  borderRadius: "50%",
                  margin: "0 auto 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "successPulse 2s ease-out",
                }}
              >
                <Check size={40} color="white" />
              </div>
              <h3
                style={{
                  color: themeStyles.text,
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "0 0 12px 0",
                }}
              >
                Booking Confirmed!
              </h3>
              <p
                style={{
                  color: themeStyles.textSecondary,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  margin: "0 0 16px 0",
                }}
              >
                Your appointment has been successfully booked. You'll receive a
                confirmation email shortly.
              </p>
              {isAuthenticated && (
                <div
                  style={{
                    background: themeStyles.accent,
                    borderRadius: "12px",
                    padding: "12px",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  You earned {pointsEarnedOnPurchase} loyalty points!
                </div>
              )}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes successPulse {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: themeStyles.background,
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`}</style>
      <div
        style={{
          background: themeStyles.headerBg,
          backdropFilter: "blur(20px)",
          padding: "20px",
          borderBottom: `1px solid ${themeStyles.border}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1
              style={{
                color: themeStyles.text,
                fontSize: "28px",
                fontWeight: "700",
                margin: "0 0 4px 0",
                background: themeStyles.accent,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Luxe Beauty
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Premium beauty services
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div
                style={{
                  background: themeStyles.accent,
                  borderRadius: "12px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Gift size={16} color="white" />
                <span className="text-xs font-semibold text-white">
                  {loyaltyPoints} pts
                </span>
              </div>
            ) : (
              <div
                style={{
                  background: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",

                  borderRadius: "12px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <User size={16} color={themeStyles.text} />
                <span
                  style={{
                    color: themeStyles.text,
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Guest
                </span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              style={{
                background: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",

                border: "none",
                borderRadius: "12px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {isDark ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3V0H9V3H7Z" fill="#ff8fab" />
                  <path d="M9 13V16H7V13H9Z" fill="#ff8fab" />
                  <path
                    d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                    fill="#ff8fab"
                  />
                  <path d="M0 9H3V7H0V9Z" fill="#ff8fab" />
                  <path d="M16 7H13V9H16V7Z" fill="#ff8fab" />
                  <path
                    d="M3.75735 5.17157L1.63603 3.05025L3.05025 1.63603L5.17157 3.75735L3.75735 5.17157Z"
                    fill="#ff8fab"
                  />
                  <path
                    d="M12.2426 10.8284L14.364 12.9497L12.9497 14.364L10.8284 12.2426L12.2426 10.8284Z"
                    fill="#ff8fab"
                  />
                  <path
                    d="M3.05025 14.364L5.17157 12.2426L3.75735 10.8284L1.63603 12.9498L3.05025 14.364Z"
                    fill="#ff8fab"
                  />
                  <path
                    d="M12.9497 1.63604L10.8284 3.75736L12.2426 5.17158L14.364 3.05026L12.9497 1.63604Z"
                    fill="#ff8fab"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#c44569"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="relative mb-4">
          <Search
            size={20}
            color={themeStyles.textSecondary}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            placeholder="Search artists or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 16px 16px 48px",
              border: `1px solid ${themeStyles.border}`,
              borderRadius: "16px",
              background: isDark
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.8)",
              color: themeStyles.text,
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-5 flex justify-center gap-2 overflow-x-auto pb-1">
          {["All", "Facial", "Hair", "Nails"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background:
                  selectedCategory === category
                    ? themeStyles.accent
                    : "transparent",
                color:
                  selectedCategory === category ? "white" : themeStyles.text,
                border:
                  selectedCategory === category
                    ? "none"
                    : `1px solid ${themeStyles.border}`,
                borderRadius: "20px",
                padding: "8px 16px",
                margin: "3px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Artists Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredArtists.map((artist, index) => (
            <div
              key={artist.id}
              onClick={() => {
                setSelectedArtist(artist);
                setCurrentView("artist");
                setCurrentImageIndex(0);
              }}
              style={{
                background: themeStyles.cardBg,
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                overflow: "hidden",
                border: `1px solid ${themeStyles.border}`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={{ position: "relative", height: "200px" }}>
                <img
                  src={artist.images[0]}
                  alt={artist.name}
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(artist.id);
                  }}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(0, 0, 0, 0.5)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Heart
                    size={18}
                    color={favorites.includes(artist.id) ? "#ff6b9d" : "white"}
                    fill={favorites.includes(artist.id) ? "#ff6b9d" : "none"}
                  />
                </button>

                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: themeStyles.accent,
                    borderRadius: "8px",
                    padding: "4px 8px",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  ${artist.price}+
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    color: themeStyles.text,
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 0 4px 0",
                  }}
                >
                  {artist.name}
                </h3>

                <p
                  style={{
                    color: themeStyles.textSecondary,
                    fontSize: "14px",
                    margin: "0 0 12px 0",
                  }}
                >
                  {artist.specialty}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Star size={14} color="#ffd700" fill="#ffd700" />
                    <span
                      style={{
                        color: themeStyles.text,
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {artist.rating}
                    </span>
                    <span
                      style={{
                        color: themeStyles.textSecondary,
                        fontSize: "12px",
                      }}
                    >
                      ({artist.reviews})
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <MapPin size={12} color={themeStyles.textSecondary} />
                    <span
                      style={{
                        color: themeStyles.textSecondary,
                        fontSize: "12px",
                      }}
                    >
                      {artist.location.split(",")[0]}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderRadius: "8px",
                    padding: "8px",
                    fontSize: "12px",
                    color: themeStyles.textSecondary,
                  }}
                >
                  Next: {artist.availability[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {getCartItemCount() > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: themeStyles.accent,
            borderRadius: "20px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
          onClick={() => setShowCart(true)}
        >
          <ShoppingBag size={20} color="white" />
          <div style={{ color: "white" }}>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              {getCartItemCount()} item{getCartItemCount() !== 1 ? "s" : ""}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700" }}>
              ${getCartTotal()}
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: themeStyles.headerBg,
              backdropFilter: "blur(20px)",
              borderRadius: "24px 24px 0 0",
              padding: "24px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  color: themeStyles.text,
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: 0,
                }}
              >
                Your Cart
              </h3>

              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: themeStyles.text,
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                <X size={24} />
              </button>
            </div>

            {cart.map((item, index) => {
              const artist = artists.find((a) => a.id === item.artistId);
              const service = services.find((s) => s.id === item.serviceId);

              return (
                <div
                  key={index}
                  style={{
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: "16px",
                    padding: "16px",
                    marginBottom: "12px",
                    background: isDark
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          color: themeStyles.text,
                          fontSize: "16px",
                          fontWeight: "600",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {service?.name}
                      </h4>
                      <p
                        style={{
                          color: themeStyles.textSecondary,
                          fontSize: "14px",
                          margin: "0 0 4px 0",
                        }}
                      >
                        with {artist?.name}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          color: themeStyles.text,
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        ${item.totalPrice}
                      </span>

                      <button
                        onClick={() => removeFromCart(index)}
                        style={{
                          background: "rgba(255, 107, 157, 0.1)",
                          border: "none",
                          borderRadius: "8px",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X size={16} color="#ff6b9d" />
                      </button>
                    </div>
                  </div>

                  {item.addOns.length > 0 && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: themeStyles.textSecondary,
                        marginTop: "8px",
                      }}
                    >
                      Add-ons: {item.addOns.join(", ")}
                    </div>
                  )}
                </div>
              );
            })}

            <div
              style={{
                borderTop: `1px solid ${themeStyles.border}`,
                paddingTop: "16px",
                marginTop: "16px",
              }}
            >
              {isAuthenticated && loyaltyPoints >= 100 && (
                <div
                  style={{
                    background: themeStyles.accent,
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ color: "white" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>
                        Use Loyalty Points
                      </div>
                      <div style={{ fontSize: "12px", opacity: 0.9 }}>
                        1 point = $0.1 discount
                      </div>
                    </div>
                    <div style={{ color: "white", fontSize: "12px" }}>
                      Available: {loyaltyPoints} pts
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <button
                      onClick={() =>
                        setPointsToUse(Math.max(0, pointsToUse - 100))
                      }
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        border: "none",
                        borderRadius: "8px",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={16} color="white" />
                    </button>

                    <div
                      style={{
                        flex: 1,
                        height: "8px",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "4px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: `${
                            (pointsToUse / getMaxPointsToUse()) * 100
                          }%`,
                          height: "100%",
                          background: "white",
                          borderRadius: "4px",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>

                    <button
                      onClick={() =>
                        setPointsToUse(
                          Math.min(getMaxPointsToUse(), pointsToUse + 100)
                        )
                      }
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        border: "none",
                        borderRadius: "8px",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={16} color="white" />
                    </button>

                    <span
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                        minWidth: "60px",
                      }}
                    >
                      {pointsToUse} pts
                    </span>
                  </div>

                  {pointsToUse > 0 && (
                    <div
                      style={{
                        color: "white",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      Discount: -${(pointsToUse / 10).toFixed(2)}
                    </div>
                  )}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    color: themeStyles.textSecondary,
                    fontSize: "16px",
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    color: themeStyles.text,
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  ${getCartTotal()}
                </span>
              </div>

              {pointsToUse > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      color: "#ff6b9d",
                      fontSize: "16px",
                    }}
                  >
                    Points Discount
                  </span>
                  <span
                    style={{
                      color: "#ff6b9d",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    -${(pointsToUse / 10).toFixed(2)}
                  </span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  paddingTop: "8px",
                  borderTop: `1px solid ${themeStyles.border}`,
                }}
              >
                <span
                  style={{
                    color: themeStyles.text,
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    color: themeStyles.text,
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  ${getDiscountedTotal().toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleBooking}
                style={{
                  background: themeStyles.accent,
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  padding: "16px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <CreditCard size={20} />
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      {showBookingSuccess && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
          }}
        >
          <div
            style={{
              background: themeStyles.cardBg,
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
              border: `1px solid ${themeStyles.border}`,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                borderRadius: "50%",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "successPulse 2s ease-out",
              }}
            >
              <Check size={40} color="white" />
            </div>

            <h3
              style={{
                color: themeStyles.text,
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 0 12px 0",
              }}
            >
              Booking Confirmed!
            </h3>

            <p
              style={{
                color: themeStyles.textSecondary,
                fontSize: "16px",
                lineHeight: "1.5",
                margin: "0 0 16px 0",
              }}
            >
              Your appointment has been successfully booked. You'll receive a
              confirmation email shortly.
            </p>

            {isAuthenticated && (
              <div
                style={{
                  background: themeStyles.accent,
                  borderRadius: "12px",
                  padding: "12px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                You earned {pointsEarnedOnPurchase} loyalty points!
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes successPulse {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
