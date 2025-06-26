"use client";

import React, { useState, useRef, useEffect, TouchEvent } from "react";

const LoadingScreen = () => {
  return (
    <>
      <style>{`
        .loading-bar-inner {
          animation: loading-progress 3s ease-in-out forwards;
        }
        @keyframes loading-progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#5D2E46] text-[#E8D6CB]">
        <div className="flex items-center gap-4 mb-4">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g fill="#E8D6CB" fill-rule="evenodd" clip-rule="evenodd">
              <path d="M8.302 3.288A3.633 3.633 0 002.756 7.76c.124.237.112.49.102.61a2.984 2.984 0 01-.084.468 7.853 7.853 0 01-.2.655c.26-.09.52-.17.75-.223a.7.7 0 11.312 1.365c-.34.078-.837.258-1.278.434a23.211 23.211 0 00-.701.295l-.042.018-.01.005-.003.001a.7.7 0 01-.925-.927v-.001l.002-.004.008-.018.03-.07a21.252 21.252 0 00.43-1.047c.113-.3.211-.592.27-.822.021-.09.034-.157.041-.205a5.033 5.033 0 017.74-6.082.7.7 0 01-.896 1.076zM1.463 8.226v0z" />
              <path d="M4.75 9.333a5.083 5.083 0 119.657 2.221c.006.033.015.077.029.133.05.197.14.453.248.734.087.223.178.443.262.646l.06.146c.049.118.094.23.131.326.03.082.074.2.097.306a.75.75 0 01-.734.905c-.169 0-.332-.04-.447-.072a4.867 4.867 0 01-.394-.134c-.188-.072-.402-.162-.606-.248l-.216-.09a7.634 7.634 0 00-.705-.265 1.739 1.739 0 00-.095-.026A5.083 5.083 0 014.75 9.333zm1.5 0a3.583 3.583 0 116.763 1.654c-.124.239-.12.485-.11.614.01.155.043.313.08.456.054.214.132.448.216.676a7.37 7.37 0 00-.643-.231 2.456 2.456 0 00-.443-.093 1.113 1.113 0 00-.626.104 3.583 3.583 0 01-5.237-3.18zm8.15 2.16l-.001-.012v.013z" />
            </g>
          </svg>
          <h1 className="text-3xl font-bold tracking-wider">Community</h1>
        </div>
        <div className="w-64 mt-4 bg-[#E8D6CB]/20 rounded-full h-2.5">
          <div className="bg-[#E8D6CB] h-2.5 rounded-full loading-bar-inner"></div>
        </div>
      </div>
    </>
  );
};

const CommunityListFooter = () => (
  <footer className="text-center p-4 text-xs text-[#5D2E46]/60">
    <p className="font-semibold">Community Messenger v1.0</p>
    <p>Your secure & private connection.</p>
  </footer>
);

const MaterialIcons = {
  Send: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  ),
  Attach: () => (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="style=linear">
        <g id="attach">
          <path
            id="vector"
            d="M20.6475 10.6158L11.8855 19.3778C9.93289 21.3304 6.76706 21.3304 4.81444 19.3778C2.86182 17.4252 2.86182 14.2594 4.81444 12.3068L12.9462 4.17503C14.313 2.80819 16.5291 2.80819 17.8959 4.17503C19.2628 5.54186 19.2628 7.75794 17.8959 9.12478L10.1024 16.9183C9.32132 17.6994 8.05499 17.6994 7.27394 16.9183C6.4929 16.1373 6.49289 14.8709 7.27394 14.0899L14.468 6.89585"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
          />
        </g>
      </g>
    </svg>
  ),
  Mic: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
    </svg>
  ),
  Reply: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
    </svg>
  ),
  Forward: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8V4l8 8-8 8v-4H4v-8z" />
    </svg>
  ),
  Delete: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  ),
  Back: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  ),
  Search: () => (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  Add: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  ),
  Settings: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  ),
  Help: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  ),
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  userName: string;
  audioUrl?: string;
  imageUrl?: string;
  replyingTo?: { id: string; userName: string; text: string } | null;
  forwardedFrom?: { userName: string; timestamp: Date } | null;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar: string;
  isGroup: boolean;
  members?: string[];
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
}

const CustomTextInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}> = ({ value, onChange, onSend }) => {
  const [inputHeight, setInputHeight] = useState(56);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const newValue = target.textContent || "";
    onChange(newValue);

    target.style.height = "auto";
    const scrollHeight = target.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, 56), 128);
    setInputHeight(newHeight);
    target.style.height = `${newHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  React.useEffect(() => {
    if (inputRef.current && inputRef.current.textContent !== value) {
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
      const currentTextLength = inputRef.current.textContent?.length || 0;
      const isAtEnd = range && range.endOffset === currentTextLength;

      inputRef.current.textContent = value;

      if (!value) {
        setInputHeight(56);
        if (inputRef.current) {
          inputRef.current.style.height = "56px";
        }
      }

      if (isAtEnd && value) {
        const newRange = document.createRange();
        newRange.selectNodeContents(inputRef.current);
        newRange.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(newRange);
      }
    }
  }, [value]);

  return (
    <div className="relative flex-1 min-w-0">
      <div
        ref={inputRef}
        contentEditable
        role="textbox"
        aria-placeholder="Type a message..."
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl text-[#5D2E46] focus:outline-none focus:ring-2 focus:ring-[#AD6A6C] focus:border-transparent shadow-inner break-words"
        style={{
          height: `${inputHeight}px`,
          minHeight: "56px",
          maxHeight: "128px",
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
          overflowY: "hidden",
        }}
      />
      {!value && (
        <div className="absolute left-4 top-4 text-[#AD6A6C]/80 pointer-events-none">
          Type a message...
        </div>
      )}
    </div>
  );
};

const AudioPlayer: React.FC<{ src: string; sender: "user" | "other" }> = ({
  src,
  sender,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        if (audio && isFinite(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      const setAudioTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnd = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener("loadedmetadata", setAudioData);
      audio.addEventListener("durationchange", setAudioData);
      audio.addEventListener("timeupdate", setAudioTime);
      audio.addEventListener("ended", handleEnd);

      if (audio.readyState > 0) {
        setAudioData();
      }

      return () => {
        audio.removeEventListener("loadedmetadata", setAudioData);
        audio.removeEventListener("durationchange", setAudioData);
        audio.removeEventListener("timeupdate", setAudioTime);
        audio.removeEventListener("ended", handleEnd);
      };
    }
  }, [src]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    if (progressBar && audio && duration > 0) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (!isFinite(timeInSeconds) || timeInSeconds < 0) {
      return "0:00";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
  const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );

  const buttonColor = sender === "user" ? "text-white" : "text-white";
  const buttonBgColor =
    sender === "user"
      ? "bg-white/30 hover:bg-white/50"
      : "bg-[#AD6A6C]/80 hover:bg-[#AD6A6C]";
  const progressTrackColor =
    sender === "user" ? "bg-white/20" : "bg-[#5D2E46]/20";
  const progressFillColor = sender === "user" ? "bg-white/80" : "bg-[#AD6A6C]";
  const timeColor = sender === "user" ? "text-white/70" : "text-[#B58D86]";

  return (
    <div className="flex items-center gap-3 w-full max-w-[250px]">
      <audio ref={audioRef} src={src} preload="metadata" className="hidden" />
      <button
        onClick={togglePlayPause}
        className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${buttonBgColor} ${buttonColor}`}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="flex-grow flex flex-col justify-center">
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className={`h-2 rounded-full cursor-pointer w-full ${progressTrackColor}`}
        >
          <div
            className={`h-full rounded-full ${progressFillColor}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className={`text-xs mt-1 text-right ${timeColor}`}>
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

const ChatApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Jessica Miller",
      lastMessage: "Sounds great! See you then.",
      timestamp: new Date(Date.now() - 500000),
      unreadCount: 1,
      avatar: "https://i.imghippo.com/files/WiD2072mSA.jpg",
      isGroup: false,
    },
    {
      id: "2",
      name: "Alex Johnson",
      lastMessage: "Just sent you the project files.",
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 0,
      avatar: "https://i.imghippo.com/files/xSlQ3437.jpg",
      isGroup: false,
    },
    {
      id: "3",
      name: "Emily Carter",
      lastMessage: "Let's catch up for coffee soon!",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 1,
      avatar: "https://i.imghippo.com/files/MqPt8642Ybg.jpg",
      isGroup: false,
    },
    {
      id: "4",
      name: "Michael Chen",
      lastMessage: "Did you see that movie I recommended?",
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 0,
      avatar: "https://i.imghippo.com/files/Uqb1323Ch.jpg",
      isGroup: false,
    },
  ]);

  const [allMessages, setAllMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1-1",
        text: "Hey! Are you free this weekend? I was thinking we could go for a hike.",
        sender: "other",
        timestamp: new Date(Date.now() - 7200000),
        userName: "Jessica Miller",
      },
      {
        id: "1-2",
        text: "A hike sounds amazing! I'm free on Saturday. What time were you thinking?",
        sender: "user",
        timestamp: new Date(Date.now() - 7000000),
        userName: "You",
      },
      {
        id: "1-3",
        text: "Great! How about we meet at the trailhead around 9 AM?",
        sender: "other",
        timestamp: new Date(Date.now() - 6800000),
        userName: "Jessica Miller",
      },
      {
        id: "1-4",
        text: "9 AM works perfectly for me. Should I bring snacks?",
        sender: "user",
        timestamp: new Date(Date.now() - 6600000),
        userName: "You",
      },
      {
        id: "1-5",
        text: "Yes, please! I'll bring water for both of us. Can't wait!",
        sender: "other",
        timestamp: new Date(Date.now() - 500000),
        userName: "Jessica Miller",
      },
    ],
    "2": [
      {
        id: "2-1",
        text: "Just sent you the project files.",
        sender: "other",
        timestamp: new Date(Date.now() - 1800000),
        userName: "Alex Johnson",
      },
      {
        id: "2-2",
        text: "Got them, thanks! I'll take a look tonight.",
        sender: "user",
        timestamp: new Date(Date.now() - 1700000),
        userName: "You",
      },
    ],
    "3": [
      {
        id: "3-1",
        text: "Let's catch up for coffee soon!",
        sender: "other",
        timestamp: new Date(Date.now() - 3600000),
        userName: "Emily Carter",
      },
    ],
    "4": [
      {
        id: "4-1",
        text: "Did you see that movie I recommended?",
        sender: "other",
        timestamp: new Date(Date.now() - 7200000),
        userName: "Michael Chen",
      },
      {
        id: "4-2",
        text: "Not yet, but it's on my list for this weekend!",
        sender: "user",
        timestamp: new Date(Date.now() - 7100000),
        userName: "You",
      },
    ],
  });
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [showChatList, setShowChatList] = useState(true);
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [swipedMessageId, setSwipedMessageId] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAddChat, setShowAddChat] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [messagesToForward, setMessagesToForward] = useState<Message[]>([]);
  const [contacts] = useState<Contact[]>([
    {
      id: "contact-1",
      name: "Olivia Garcia",
      avatar: "https://i.imghippo.com/files/CPla8897cRw.jpg",
    },
    {
      id: "contact-2",
      name: "Ben Carter",
      avatar: "https://i.imghippo.com/files/UUOn1018CS.jpg",
    },
    {
      id: "contact-3",
      name: "Sophia Rodriguez",
      avatar: "https://i.imghippo.com/files/iaFb1057Aag.jpg",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const swipeThreshold = 80;

  const chatFooterRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.fontFamily =
      'Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const checkScrollability = () => {
      if (chatContainerRef.current) {
        const { scrollHeight, clientHeight } = chatContainerRef.current;
        setIsContentScrollable(scrollHeight > clientHeight);
      }
    };
    if (!showChatList) {
      checkScrollability();
      scrollToBottom();
      window.addEventListener("resize", checkScrollability);
      return () => {
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [allMessages, activeChat, showChatList]);

  useEffect(() => {
    if (chatFooterRef.current) {
      setFooterHeight(chatFooterRef.current.offsetHeight);
    }
  }, [inputText, replyingTo, isSelectionModeActive, activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const position = scrollTop / (scrollHeight - clientHeight);
      setScrollPosition(position);
    }
  };

  const handleChatSelect = (chat: Chat) => {
    setActiveChat(chat);
    setShowChatList(false);
    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    setChats(updatedChats);
  };

  const handleBackToChats = () => {
    setShowChatList(true);
    setActiveChat(null);
    setReplyingTo(null);
    setInputText("");
    setIsSelectionModeActive(false);
    setSelectedMessageIds([]);
  };

  const handleTouchStart = (e: TouchEvent, messageId: string) => {
    if (isSelectionModeActive) return;
    if (swipedMessageId && swipedMessageId !== messageId) {
      const previousMessageElement = document.getElementById(
        `message-${swipedMessageId}`
      );
      if (previousMessageElement) {
        previousMessageElement.style.transform = "translateX(0)";
        previousMessageElement.style.transition = "transform 0.3s ease";
      }
      setSwipedMessageId(null);
    }
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent, messageId: string) => {
    if (isSelectionModeActive) return;
    touchCurrentX.current = e.touches[0].clientX;
    const diffOthers = touchCurrentX.current - touchStartX.current;
    const diffUser = touchStartX.current - touchCurrentX.current;
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement) {
      const isUserMessage =
        (allMessages[activeChat?.id || ""] || []).find(
          (msg) => msg.id === messageId
        )?.sender === "user";
      const translateX = isUserMessage
        ? Math.max(-swipeThreshold * 2.25, Math.min(0, -diffUser))
        : Math.min(swipeThreshold, Math.max(0, diffOthers));
      messageElement.style.transform = `translateX(${translateX}px)`;
      const diff = isUserMessage ? diffUser : diffOthers;
      if (Math.abs(diff) > swipeThreshold / 2) {
        setSwipedMessageId(messageId);
      } else {
        setSwipedMessageId(null);
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent, messageId: string) => {
    if (isSelectionModeActive) return;
    const messageElement = document.getElementById(`message-${messageId}`);
    const isUserMessage =
      (allMessages[activeChat?.id || ""] || []).find(
        (msg) => msg.id === messageId
      )?.sender === "user";
    const diff = isUserMessage
      ? touchStartX.current - touchCurrentX.current
      : touchCurrentX.current - touchStartX.current;
    if (messageElement) {
      if (Math.abs(diff) > swipeThreshold / 2) {
        const translateX = isUserMessage
          ? -swipeThreshold * 2.25
          : swipeThreshold * 2.25;
        messageElement.style.transform = `translateX(${translateX}px)`;
        setSwipedMessageId(messageId);
      } else {
        messageElement.style.transform = "translateX(0)";
        setSwipedMessageId(null);
      }
      messageElement.style.transition = "transform 0.3s ease";
    }
  };

  const resetSwipe = () => {
    if (swipedMessageId) {
      const messageElement = document.getElementById(
        `message-${swipedMessageId}`
      );
      if (messageElement) {
        messageElement.style.transform = "translateX(0)";
        messageElement.style.transition = "transform 0.3s ease";
      }
      setSwipedMessageId(null);
    }
  };

  const handleSend = () => {
    if (inputText.trim() && activeChat) {
      const newMessage: Message = {
        id: `${activeChat.id}-${Date.now()}`,
        text: inputText,
        sender: "user",
        timestamp: new Date(),
        userName: "You",
        replyingTo: replyingTo
          ? {
              id: replyingTo.id,
              userName: replyingTo.userName,
              text: replyingTo.text,
            }
          : null,
      };
      const currentMessages = allMessages[activeChat.id] || [];
      setAllMessages({
        ...allMessages,
        [activeChat.id]: [...currentMessages, newMessage],
      });
      setInputText("");
      setReplyingTo(null);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    setInputText("");
    resetSwipe();
    document.querySelector<HTMLDivElement>('[role="textbox"]')?.focus();
  };

  const handleForward = (message: Message) => {
    setMessagesToForward([message]);
    setShowForwardModal(true);
    resetSwipe();
  };

  const handleForwardToChat = (targetChatForForward: Chat) => {
    if (messagesToForward.length === 0 || !targetChatForForward) return;

    const chatId = targetChatForForward.id;

    const newMessagesForChat: Message[] = [];
    messagesToForward.forEach((messageToForward) => {
      const forwardedMessage: Message = {
        ...messageToForward,
        id: `${chatId}-${Date.now()}-${Math.random()}`,
        sender: "user",
        userName: "You",
        timestamp: new Date(),
        replyingTo: null,
        forwardedFrom: {
          userName: messageToForward.userName,
          timestamp: messageToForward.timestamp,
        },
      };
      newMessagesForChat.push(forwardedMessage);
    });

    setAllMessages((prevMessages) => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), ...newMessagesForChat],
    }));

    const lastForwardedMessage =
      newMessagesForChat[newMessagesForChat.length - 1];
    const lastMessageText = lastForwardedMessage.imageUrl
      ? "Image"
      : lastForwardedMessage.audioUrl
      ? "Audio message"
      : lastForwardedMessage.text;

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: lastMessageText,
              timestamp: lastForwardedMessage.timestamp,
            }
          : chat
      )
    );

    const forwardCount = messagesToForward.length;
    showNotification(
      `Forwarded ${forwardCount} message${forwardCount > 1 ? "s" : ""} to ${
        targetChatForForward.name
      }!`,
      "success"
    );

    setShowForwardModal(false);
    setMessagesToForward([]);
    setIsSelectionModeActive(false);
    setSelectedMessageIds([]);
  };

  const handleForwardToContact = (contact: Contact) => {
    if (messagesToForward.length === 0) return;

    let targetChat = chats.find((chat) => chat.name === contact.name);

    const lastForwardedMessage =
      messagesToForward[messagesToForward.length - 1];
    const lastMessageText = lastForwardedMessage.imageUrl
      ? "Image"
      : lastForwardedMessage.audioUrl
      ? "Audio message"
      : lastForwardedMessage.text;

    if (!targetChat) {
      const newChat: Chat = {
        id: Date.now().toString(),
        name: contact.name,
        lastMessage: lastMessageText,
        timestamp: new Date(),
        unreadCount: 0,
        avatar: contact.avatar,
        isGroup: false,
      };

      setChats((prevChats) => [newChat, ...prevChats]);
      setAllMessages((prevMessages) => ({
        ...prevMessages,
        [newChat.id]: [],
      }));
      targetChat = newChat;
    }

    handleForwardToChat(targetChat);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (activeChat) {
      const updatedMessages = (allMessages[activeChat.id] || []).filter(
        (m) => m.id !== messageId
      );
      setAllMessages({
        ...allMessages,
        [activeChat.id]: updatedMessages,
      });
      resetSwipe();
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionModeActive(!isSelectionModeActive);
    setSelectedMessageIds([]);
  };

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessageIds((prevSelected) =>
      prevSelected.includes(messageId)
        ? prevSelected.filter((id) => id !== messageId)
        : [...prevSelected, messageId]
    );
  };

  const handleBulkDelete = () => {
    if (activeChat && selectedMessageIds.length > 0) {
      const updatedMessages = (allMessages[activeChat.id] || []).filter(
        (m) => !selectedMessageIds.includes(m.id)
      );
      setAllMessages({
        ...allMessages,
        [activeChat.id]: updatedMessages,
      });
      setIsSelectionModeActive(false);
      setSelectedMessageIds([]);
    }
  };

  const handleHeaderReply = () => {
    if (selectedMessageIds.length !== 1 || !activeChat) return;
    const messageToReply = (allMessages[activeChat.id] || []).find(
      (m) => m.id === selectedMessageIds[0]
    );
    if (messageToReply) {
      handleReply(messageToReply);
    }
    toggleSelectionMode();
  };

  const handleHeaderForward = () => {
    if (selectedMessageIds.length === 0 || !activeChat) return;
    const messages = (allMessages[activeChat.id] || []).filter((m) =>
      selectedMessageIds.includes(m.id)
    );
    if (messages.length > 0) {
      setMessagesToForward(messages);
      setShowForwardModal(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeChat || !file.type.startsWith("image/")) {
      if (file && !file.type.startsWith("image/")) {
        showNotification("Only image files are allowed.", "error");
      }
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    const newMessage: Message = {
      id: `${activeChat.id}-${Date.now()}`,
      text: "Image",
      sender: "user",
      timestamp: new Date(),
      userName: "You",
      imageUrl: imageUrl,
    };
    const currentMessages = allMessages[activeChat.id] || [];
    setAllMessages({
      ...allMessages,
      [activeChat.id]: [...currentMessages, newMessage],
    });
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (activeChat) {
          const newMessage: Message = {
            id: `${activeChat.id}-${Date.now()}`,
            text: "Audio sent",
            sender: "user",
            timestamp: new Date(),
            userName: "You",
            audioUrl: audioUrl,
          };
          const currentMessages = allMessages[activeChat.id] || [];
          setAllMessages({
            ...allMessages,
            [activeChat.id]: [...currentMessages, newMessage],
          });
        }
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
        mediaRecorderRef.current = null;
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const getSmartActionIcon = () => {
    if (scrollPosition < 0.3) return <MaterialIcons.Mic />;
    if (scrollPosition < 0.7) return <MaterialIcons.Attach />;
    return <MaterialIcons.Send />;
  };

  const handleSmartAction = () => {
    if (scrollPosition < 0.3) {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    } else if (scrollPosition < 0.7) {
      handleAttachFile();
    } else {
      if (inputText.trim()) {
        handleSend();
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) {
      return formatTime(date);
    }
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    if (isYesterday) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleCreateChatFromContact = (contact: Contact) => {
    const chatExists = chats.some((chat) => chat.name === contact.name);

    if (chatExists) {
      showNotification(
        `You already have a chat with ${contact.name}.`,
        "error"
      );
      setShowAddChat(false);
      return;
    }

    const newChat: Chat = {
      id: Date.now().toString(),
      name: contact.name,
      lastMessage: "",
      timestamp: new Date(),
      unreadCount: 0,
      avatar: contact.avatar,
      isGroup: false,
    };

    setChats((prevChats) => [newChat, ...prevChats]);
    setAllMessages((prevMessages) => ({
      ...prevMessages,
      [newChat.id]: [],
    }));

    setShowAddChat(false);
    showNotification(`Chat with ${contact.name} created!`, "success");
  };

  const renderSmartActionButtons = () => {
    if (inputText.trim()) {
      return (
        <button
          onClick={handleSend}
          className="h-[56px] w-14 rounded-2xl shadow-xl flex items-center justify-center text-white bg-gradient-to-br from-[#AD6A6C]/80 to-[#5D2E46]/80 backdrop-blur-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <MaterialIcons.Send />
        </button>
      );
    }

    if (!isContentScrollable) {
      return (
        <>
          <button
            onClick={handleAttachFile}
            className="h-[56px] w-14 rounded-2xl shadow-xl flex items-center justify-center text-white bg-gradient-to-r from-[#AD6A6C]/80 to-[#5D2E46]/80 backdrop-blur-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <MaterialIcons.Attach />
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`h-[56px] w-14 rounded-2xl shadow-xl flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 flex-shrink-0 ${
              isRecording
                ? "bg-gradient-to-r from-[#AD6A6C]/80 to-[#5D2E46]/80 animate-pulse"
                : "bg-gradient-to-br from-[#AD6A6C]/80 to-[#5D2E46]/80 backdrop-blur-sm hover:shadow-2xl"
            }`}
          >
            <MaterialIcons.Mic />
          </button>
        </>
      );
    }

    return (
      <button
        onClick={handleSmartAction}
        className={`h-[56px] w-14 rounded-2xl shadow-xl flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 flex-shrink-0 ${
          isRecording
            ? "bg-gradient-to-r from-[#AD6A6C]/80 to-[#5D2E46]/80 animate-pulse"
            : "bg-gradient-to-br from-[#AD6A6C]/80 to-[#5D2E46]/80 backdrop-blur-sm hover:shadow-2xl"
        }`}
      >
        {getSmartActionIcon()}
      </button>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(
            93,
            46,
            70,
            0.1
          );
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #ad6a6c; 
          border-radius: 10px;
          border: 2px solid transparent; 
          background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #5d2e46;
        }
      `}</style>
      <div
        className="h-screen w-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://i.imghippo.com/files/Clb2406aDQ.jpg')",
        }}
      >
        {showChatList ? (
          <div className="relative h-screen">
            <div className="absolute top-0 left-0 right-0 z-20 bg-[#5D2E46]/80 backdrop-blur-md px-4 pt-4 pb-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                    >
                      <g fill="#E8D6CB" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M8.302 3.288A3.633 3.633 0 002.756 7.76c.124.237.112.49.102.61a2.984 2.984 0 01-.084.468 7.853 7.853 0 01-.2.655c.26-.09.52-.17.75-.223a.7.7 0 11.312 1.365c-.34.078-.837.258-1.278.434a23.211 23.211 0 00-.701.295l-.042.018-.01.005-.003.001a.7.7 0 01-.925-.927v-.001l.002-.004.008-.018.03-.07a21.252 21.252 0 00.43-1.047c.113-.3.211-.592.27-.822.021-.09.034-.157.041-.205a5.033 5.033 0 017.74-6.082.7.7 0 01-.896 1.076zM1.463 8.226v0z" />

                        <path d="M4.75 9.333a5.083 5.083 0 119.657 2.221c.006.033.015.077.029.133.05.197.14.453.248.734.087.223.178.443.262.646l.06.146c.049.118.094.23.131.326.03.082.074.2.097.306a.75.75 0 01-.734.905c-.169 0-.332-.04-.447-.072a4.867 4.867 0 01-.394-.134c-.188-.072-.402-.162-.606-.248l-.216-.09a7.634 7.634 0 00-.705-.265 1.739 1.739 0 00-.095-.026A5.083 5.083 0 014.75 9.333zm1.5 0a3.583 3.583 0 116.763 1.654c-.124.239-.12.485-.11.614.01.155.043.313.08.456.054.214.132.448.216.676a7.37 7.37 0 00-.643-.231 2.456 2.456 0 00-.443-.093 1.113 1.113 0 00-.626.104 3.583 3.583 0 01-5.237-3.18zm8.15 2.16l-.001-.012v.013z" />
                      </g>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-[#E8D6CB] tracking-wide">
                    Community
                  </h1>
                </div>

                <button
                  onClick={() => setShowHelpModal(true)}
                  className="p-2 hover:bg-[#AD6A6C]/80 rounded-xl transition-colors text-[#E8D6CB]"
                >
                  <MaterialIcons.Help />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-12 pr-4 py-3 bg-[#E8D6CB]/80 backdrop-blur-lg border border-transparent rounded-2xl text-[#5D2E46] placeholder-[#5D2E46]/70 focus:outline-none focus:ring-2 focus:ring-[#AD6A6C] shadow-inner font-medium transition"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5D2E46]/70">
                  <MaterialIcons.Search />
                </div>
              </div>
            </div>

            <div className="h-full overflow-y-auto p-4 space-y-3 pt-[160px] pb-[80px]">
              {filteredChats.map((chat) => {
                const chatMessages = allMessages[chat.id] || [];
                const lastMessageObject =
                  chatMessages.length > 0
                    ? chatMessages[chatMessages.length - 1]
                    : null;

                const displayText = lastMessageObject
                  ? lastMessageObject.audioUrl
                    ? "Voice note sent"
                    : lastMessageObject.text
                  : "No messages yet";

                const displayTimestamp = lastMessageObject
                  ? lastMessageObject.timestamp
                  : chat.timestamp;

                return (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-black/20 hover:bg-white/50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-14 h-14 rounded-2xl object-cover shadow-md flex items-center justify-center bg-white/30 text-xs font-medium text-center text-[#5D2E46]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-[#AD6A6C] truncate">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-[#5D2E46] font-medium">
                            {formatDate(displayTimestamp)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[#5D2E46] truncate">
                            {displayText}
                          </p>
                          {chat.unreadCount > 0 && (
                            <span className="bg-gradient-to-r from-[#AD6A6C] to-[#5D2E46] text-white text-xs font-bold px-3 py-1 rounded-full min-w-[24px] text-center shadow-md">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/40 backdrop-blur-md">
              <CommunityListFooter />
            </div>

            <button
              onClick={() => setShowAddChat(true)}
              className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#AD6A6C]/80 to-[#5D2E46]/80 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 hover:shadow-2xl z-20"
            >
              <MaterialIcons.Add />
            </button>
          </div>
        ) : (
          <div className="relative h-screen">
            <div className="absolute top-0 left-0 right-0 z-20 bg-[#5D2E46]/80 backdrop-blur-md px-4 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={
                    isSelectionModeActive
                      ? toggleSelectionMode
                      : handleBackToChats
                  }
                  className="p-2 hover:bg-[#AD6A6C]/20 rounded-xl transition-colors text-[#E8D6CB]"
                >
                  {isSelectionModeActive ? (
                    <MaterialIcons.Close />
                  ) : (
                    <MaterialIcons.Back />
                  )}
                </button>

                {isSelectionModeActive ? (
                  <div className="flex-1 min-w-0">
                    <h1 className="font-semibold text-[#E8D6CB] truncate">
                      {selectedMessageIds.length} selected
                    </h1>
                  </div>
                ) : (
                  <>
                    {activeChat?.avatar && (
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="w-12 h-12 rounded-2xl object-cover shadow-md flex items-center justify-center bg-white/30 text-xs font-medium text-center text-[#5D2E46]"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h1 className="font-semibold text-[#E8D6CB] truncate">
                        {activeChat?.name}
                      </h1>
                      <p className="text-xs text-[#D0ADA7]">
                        {activeChat?.isGroup
                          ? `${activeChat.members?.length} members`
                          : "online"}
                      </p>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2">
                  {isSelectionModeActive ? (
                    <>
                      <button
                        onClick={handleHeaderReply}
                        disabled={selectedMessageIds.length !== 1}
                        className="p-2 rounded-xl transition-colors text-[#E8D6CB] disabled:text-[#E8D6CB]/40 disabled:cursor-not-allowed hover:enabled:bg-[#AD6A6C]/20"
                      >
                        <MaterialIcons.Reply />
                      </button>
                      <button
                        onClick={handleHeaderForward}
                        disabled={selectedMessageIds.length === 0}
                        className="p-2 rounded-xl transition-colors text-[#E8D6CB] disabled:text-[#E8D6CB]/40 disabled:cursor-not-allowed hover:enabled:bg-[#AD6A6C]/20"
                      >
                        <MaterialIcons.Forward />
                      </button>
                      <button
                        onClick={handleBulkDelete}
                        disabled={selectedMessageIds.length === 0}
                        className="p-2 rounded-xl transition-colors text-[#E8D6CB] disabled:text-[#E8D6CB]/40 disabled:cursor-not-allowed hover:enabled:bg-[#AD6A6C]/20"
                      >
                        <MaterialIcons.Delete />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={toggleSelectionMode}
                      className="p-2 rounded-xl hidden md:block transition-colors hover:bg-[#AD6A6C]/20 text-[#E8D6CB]"
                    >
                      <MaterialIcons.Menu />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="h-full overflow-y-auto px-4 py-4 space-y-2 overflow-x-hidden"
              onClick={resetSwipe}
              style={{
                paddingTop: "88px",
                paddingBottom: `${footerHeight}px`,
              }}
            >
              <div className="max-w-4xl mx-auto space-y-2">
                {(allMessages[activeChat?.id || ""] || []).map((message) => (
                  <div
                    key={message.id}
                    className={`relative flex items-center gap-3 transition-all duration-200 ${
                      isSelectionModeActive ? "cursor-pointer" : ""
                    } ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    onClick={
                      isSelectionModeActive
                        ? () => handleSelectMessage(message.id)
                        : undefined
                    }
                  >
                    {isSelectionModeActive && (
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedMessageIds.includes(message.id)
                            ? "bg-[#AD6A6C] border-[#5D2E46]"
                            : "bg-white/50 border-[#AD6A6C]"
                        } ${
                          message.sender === "user"
                            ? "order-last ml-3"
                            : "order-first"
                        }`}
                      >
                        {selectedMessageIds.includes(message.id) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </div>
                    )}

                    <div
                      className={`absolute top-1/2 -translate-y-1/2 h-full flex items-center gap-2 px-4 transition-opacity md:hidden ${
                        message.sender === "user" ? "right-0" : "left-0"
                      } ${
                        swipedMessageId === message.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <button
                        onClick={() => handleReply(message)}
                        className="w-12 h-12 bg-[#B58D86]/80 backdrop-blur-sm hover:bg-[#AD6A6C]/80 rounded-2xl flex items-center justify-center shadow-xl transition-all hover:scale-110 text-white"
                      >
                        <MaterialIcons.Reply />
                      </button>
                      <button
                        onClick={() => handleForward(message)}
                        className="w-12 h-12 bg-[#AD6A6C]/80 backdrop-blur-sm hover:bg-[#5D2E46]/80 rounded-2xl flex items-center justify-center shadow-xl transition-all hover:scale-110 text-white"
                      >
                        <MaterialIcons.Forward />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="w-12 h-12 bg-[#5D2E46]/80 backdrop-blur-sm hover:bg-[#AD6A6C]/80 rounded-2xl flex items-center justify-center shadow-xl transition-all hover:scale-110 text-white"
                      >
                        <MaterialIcons.Delete />
                      </button>
                    </div>

                    <div
                      id={`message-${message.id}`}
                      className={`relative transition-transform z-10 ${
                        isSelectionModeActive
                          ? ""
                          : message.sender === "user"
                          ? "ml-auto"
                          : "mr-auto"
                      } max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
                      onTouchStart={(e) => handleTouchStart(e, message.id)}
                      onTouchMove={(e) => handleTouchMove(e, message.id)}
                      onTouchEnd={(e) => handleTouchEnd(e, message.id)}
                    >
                      <div
                        className={`p-4 rounded-2xl shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#AD6A6C]/60 to-[#5D2E46]/60 backdrop-blur-sm text-white"
                            : "bg-white/60 backdrop-blur-lg text-[#5D2E46] border border-black/20"
                        }`}
                      >
                        {message.forwardedFrom && (
                          <div
                            className={`p-3 mb-3 rounded-xl text-sm shadow-inner flex flex-col gap-1 ${
                              message.sender === "user"
                                ? "bg-white/15 text-white/90 border border-black/10"
                                : "bg-white/15 text-[#5D2E46] border border-black/20"
                            }`}
                          >
                            <p className="font-medium text-xs opacity-90">
                              Forwarded Message
                            </p>
                            {message.forwardedFrom.userName !== "You" && (
                              <p className="font-semibold text-xs">
                                From: {message.forwardedFrom.userName}
                              </p>
                            )}
                          </div>
                        )}

                        {message.replyingTo && (
                          <div
                            className={`p-3 mb-3 rounded-xl text-sm shadow-inner ${
                              message.sender === "user"
                                ? "bg-white/15 text-white/90 border border-black/10"
                                : "bg-white/15 text-[#5D2E46] border border-black/20"
                            }`}
                          >
                            <p className="font-medium text-xs opacity-75 mb-1">
                              Replying to {message.replyingTo.userName}
                            </p>
                            <p className="break-words">
                              {message.replyingTo.text}
                            </p>
                          </div>
                        )}

                        {message.sender === "other" && (
                          <p className="font-semibold text-sm mb-2 text-[#AD6A6C]">
                            {message.userName}
                          </p>
                        )}

                        {message.imageUrl ? (
                          <img
                            src={message.imageUrl}
                            alt="Sent content"
                            className="rounded-lg max-w-full h-auto min-h-[100px] cursor-pointer flex items-center justify-center bg-white/30 text-xs font-medium text-center text-[#5D2E46]"
                            onClick={() =>
                              window.open(message.imageUrl, "_blank")
                            }
                          />
                        ) : message.audioUrl ? (
                          <AudioPlayer
                            src={message.audioUrl}
                            sender={message.sender}
                          />
                        ) : (
                          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                            {message.text}
                          </p>
                        )}

                        <p
                          className={`text-xs mt-2 text-right ${
                            message.sender === "user"
                              ? "text-white/70"
                              : "text-[#B58D86]"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div
              ref={chatFooterRef}
              className="absolute bottom-0 left-0 right-0 z-10 bg-white/50 backdrop-blur-lg border-t border-white/20 px-4 pt-4 pb-2"
            >
              <div className="max-w-4xl mx-auto">
                {isSelectionModeActive ? (
                  <div className="flex items-center justify-center h-[56px]">
                    <p className="font-semibold text-[#AD6A6C]">
                      Select messages to reply, forward, or delete.
                    </p>
                  </div>
                ) : (
                  <>
                    {replyingTo && (
                      <div className="mb-4 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-[#AD6A6C] mb-1">
                              Replying to {replyingTo.userName}
                            </p>
                            <p className="text-sm text-[#5D2E46] break-words">
                              {replyingTo.text}
                            </p>
                          </div>
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="p-2 hover:bg-black/20 rounded-xl transition-colors text-[#AD6A6C]"
                          >
                            <MaterialIcons.Close />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-end gap-3">
                      <CustomTextInput
                        value={inputText}
                        onChange={(newValue) => setInputText(newValue)}
                        onSend={handleSend}
                      />
                      {renderSmartActionButtons()}
                    </div>
                  </>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
        )}

        {showHelpModal && (
          <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 m-4 max-w-sm w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#5D2E46]">
                  Help & Support
                </h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-2 hover:bg-[#5D2E46]/20 rounded-xl transition-colors text-[#5D2E46]"
                >
                  <MaterialIcons.Close />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-[#B58D86]/20 backdrop-blur-sm rounded-xl border border-white/20">
                  <h4 className="font-semibold mb-2 text-[#AD6A6C]">
                    Getting Started
                  </h4>
                  <p className="text-xs text-[#5D2E46]/90">
                    Click the '+' button to start a new chat from your contacts.
                    Swipe on messages for quick actions like reply, forward, or
                    delete.
                  </p>
                </div>
                <div className="p-4 bg-[#B58D86]/20 backdrop-blur-sm rounded-xl border border-white/20">
                  <h4 className="font-semibold mb-2 text-[#AD6A6C]">
                    Frequently Asked Questions
                  </h4>
                  <p className="text-xs text-[#5D2E46]/90 font-medium mb-1">
                    How do I send a voice note?
                  </p>
                  <p className="text-xs text-[#5D2E46]/90">
                    Tap the microphone icon in the input area to start and stop
                    recording.
                  </p>
                  <p className="text-xs mt-3 text-[#5D2E46]/90 font-medium mb-1">
                    How do I attach an image?
                  </p>
                  <p className="text-xs text-[#5D2E46]/90">
                    Tap the attach icon in the input area and select the image
                    to upload.
                  </p>
                </div>
                <div className="p-4 bg-[#B58D86]/20 backdrop-blur-sm rounded-xl border border-white/20">
                  <h4 className="font-semibold mb-2 text-[#AD6A6C]">
                    Contact Us
                  </h4>
                  <p className="text-xs text-[#5D2E46]/90">
                    For support, please email{" "}
                    <a
                      href="mailto:support@community.app"
                      className="font-medium underline"
                    >
                      support@community.app
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddChat && (
          <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 m-4 max-w-sm w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#5D2E46]">
                  Create Chat from Contacts
                </h3>
                <button
                  onClick={() => setShowAddChat(false)}
                  className="p-2 hover:bg-[#5D2E46]/20 rounded-xl transition-colors text-[#5D2E46]"
                >
                  <MaterialIcons.Close />
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleCreateChatFromContact(contact)}
                    className="w-full flex items-center gap-4 p-3 text-left bg-[#B58D86]/20 hover:bg-[#B58D86]/50 border border-white/20 rounded-xl text-[#AD6A6C] transition-colors"
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-2xl object-cover flex items-center justify-center bg-white/30 text-xs font-medium text-center text-[#5D2E46]"
                    />
                    <span className="font-semibold text-lg">
                      {contact.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showForwardModal && (
          <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 m-4 max-w-sm w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#5D2E46]">
                  Forward Message
                </h3>
                <button
                  onClick={() => {
                    setShowForwardModal(false);
                    setMessagesToForward([]);
                  }}
                  className="p-2 hover:bg-[#5D2E46]/20 rounded-xl transition-colors text-[#5D2E46]"
                >
                  <MaterialIcons.Close />
                </button>
              </div>
              <div className="space-y-4">
                {messagesToForward.length > 0 && (
                  <div className="p-4 bg-[#B58D86]/20 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="text-xs text-[#5D2E46]/90 font-medium">
                      {`Forwarding ${messagesToForward.length} message${
                        messagesToForward.length > 1 ? "s" : ""
                      }`}
                    </p>
                  </div>
                )}
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  <div>
                    <h4 className="font-semibold mb-2 text-[#AD6A6C]">
                      Existing Chats
                    </h4>
                    {chats.map((chat) => (
                      <button
                        key={`chat-${chat.id}`}
                        onClick={() => handleForwardToChat(chat)}
                        className="w-full flex items-center gap-4 p-3 text-left bg-[#B58D86]/20 hover:bg-[#B58D86]/50 border border-white/20 rounded-xl text-[#AD6A6C] transition-colors mb-2"
                      >
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-12 h-12 rounded-2xl object-cover flex items-center justify-center bg-white/30"
                        />
                        <span className="font-semibold text-lg">
                          {chat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[#AD6A6C]">
                      Contacts
                    </h4>
                    {contacts.map((contact) => (
                      <button
                        key={`contact-${contact.id}`}
                        onClick={() => handleForwardToContact(contact)}
                        className="w-full flex items-center gap-4 p-3 text-left bg-[#B58D86]/20 hover:bg-[#B58D86]/50 border border-white/20 rounded-xl text-[#AD6A6C] transition-colors mb-2"
                      >
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-2xl object-cover flex items-center justify-center bg-white/30"
                        />
                        <span className="font-semibold text-lg">
                          {contact.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {notification.show && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] p-4 rounded-2xl shadow-2xl border-2 transition-all duration-300 ease-out min-w-[320px] backdrop-blur-lg ${
              notification.type === "success"
                ? "bg-green-500/30 border-green-500/50 text-white"
                : "bg-red-500/30 border-red-500/50 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  notification.type === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></div>
              <p className="font-bold text-sm flex-1">{notification.message}</p>
              <button
                onClick={() =>
                  setNotification({ show: false, message: "", type: "success" })
                }
                className="text-white/70 hover:text-white transition-colors"
              >
                <MaterialIcons.Close />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatApp;
