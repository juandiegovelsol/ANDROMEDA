import React, { useEffect, useRef, useState, useCallback } from "react";

type Direction = "H" | "V" | "D1" | "D2";
type Cell = {
  letter: string;
  row: number;
  col: number;
  highlighted: boolean;
  selected: boolean;
  found: boolean;
};

const GRID_SIZE = 10;

const WORDS = [
  "POWER",
  "JOURNAL",
  "BANANA",
  "CONCEPT",
  "NATURE",
  "LINK",
  "SPIRIT",
  "PUZZLE",
  "BRAIN",
  "HINT",
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const DIRS: Record<Direction, [number, number]> = {
  H: [0, 1],
  V: [1, 0],
  D1: [1, 1],
  D2: [1, -1],
};

function createPuzzle(words: string[], size: number): [Cell[][], PlacedWord[]] {
  let grid: Cell[][] = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => ({
      letter: "",
      row,
      col,
      highlighted: false,
      selected: false,
      found: false,
    }))
  );

  const directions: Direction[] = ["H", "V", "D1", "D2"];
  const placedWords: PlacedWord[] = [];

  for (const word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      const dir = directions[getRandomInt(directions.length)];
      const [dr, dc] = DIRS[dir];
      const startRow = dr === -1 ? word.length - 1 : 0;
      const endRow = dr === 1 ? size - word.length : size - 1;
      const startCol = dc === -1 ? word.length - 1 : 0;
      const endCol = dc === 1 ? size - word.length : size - 1;

      if (startRow > endRow || startCol > endCol) {
        attempts++;
        continue;
      }

      const row = getRandomInt(endRow - startRow + 1) + startRow;
      const col = getRandomInt(endCol - startCol + 1) + startCol;

      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        if (
          r < 0 ||
          r >= size ||
          c < 0 ||
          c >= size ||
          (grid[r][c].letter && grid[r][c].letter !== word[i])
        ) {
          fits = false;
          break;
        }
      }

      if (!fits) {
        attempts++;
        continue;
      }

      const positions: { row: number; col: number }[] = [];
      for (let i = 0; i < word.length; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        grid[r][c].letter = word[i];
        positions.push({ row: r, col: c });
      }
      placedWords.push({ word, positions, found: false });
      placed = true;
    }
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c].letter) {
        grid[r][c].letter = alphabet[getRandomInt(alphabet.length)];
      }
    }
  }

  return [grid, placedWords];
}

type PlacedWord = {
  word: string;
  positions: { row: number; col: number }[];
  found: boolean;
};

function samePos(
  a: { row: number; col: number },
  b: { row: number; col: number }
) {
  return a.row === b.row && a.col === b.col;
}

function posInArray(
  pos: { row: number; col: number },
  arr: { row: number; col: number }[]
) {
  return arr.some((p) => samePos(p, pos));
}

function getLinePath(
  start: { row: number; col: number },
  end: { row: number; col: number }
) {
  const path: { row: number; col: number }[] = [];
  const dr = end.row - start.row;
  const dc = end.col - start.col;
  const len = Math.max(Math.abs(dr), Math.abs(dc));

  if (len === 0) {
    path.push({ ...start });
    return path;
  }
  const stepR = dr / len;
  const stepC = dc / len;

  if (
    !(
      (dr === 0 && dc !== 0) ||
      (dc === 0 && dr !== 0) ||
      Math.abs(dr) === Math.abs(dc)
    )
  ) {
    return [];
  }

  for (let i = 0; i <= len; i++) {
    path.push({
      row: Math.round(start.row + stepR * i),
      col: Math.round(start.col + stepC * i),
    });
  }
  return path;
}

function arraysEqual(
  a: { row: number; col: number }[],
  b: { row: number; col: number }[]
) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!samePos(a[i], b[i])) return false;
  }
  return true;
}

const HINT_TIME = 10000;
const LOADING_DURATION = 3500;
const LOADING_STATUS_MESSAGES = [
  "INITIALIZING INTERFACE...",
  "GENERATING PUZZLE GRID...",
  "HIDING WORDS...",
  "PREPARING CHALLENGE...",
];

const Logo = ({ className = "" }) => (
  <svg
    className={className}
    width="48"
    height="48"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
  >
    <g>
      <path
        fill="#d8c4ff"
        d="M256,0C114.616,0,0,114.634,0,256.009S114.616,512,256,512c141.383,0,256-114.616,256-255.991S397.383,0,256,0 z M336.83,291.277c13.956-0.902,23.303-12.697,29.527-15.518c6.224-2.83,10.884,1.41,10.884,8.464 c0,7.063,1.821,55.098,1.821,55.098c0.25,7.553-7.142,16.375-19.357,14.071l-56.152-6.642c-11.365-1.616-13.624-1.902-18.187,3.116 c-5.313,5.857,9.295,12.804,9.295,29.197c0,19.356-17.313,35.071-38.661,35.071c-21.339,0-38.652-15.715-38.652-35.071 c0-16.393,14.608-23.34,9.286-29.197c-4.554-5.018-6.813-4.732-18.188-3.116l-56.152,6.642 c-12.214,2.304-19.607-6.518-19.357-14.071c0,0,1.821-48.036,1.821-55.098c0-7.054,4.661-11.294,10.885-8.464 c6.222,2.821,15.58,14.616,29.527,15.518c21.767,1.42,40.42-15.518,40.42-35.268c0-19.75-18.652-36.688-40.42-35.277 c-13.947,0.902-23.304,12.688-29.527,15.526c-6.224,2.822-10.885-1.428-10.885-8.482c0-7.044-1.821-55.098-1.821-55.098 c-0.25-7.536,7.143-16.375,19.357-14.063l56.152,6.652c11.366,1.616,13.624,1.902,18.188-3.117 c5.321-5.857-9.286-12.821-9.286-29.196c0-19.376,17.313-35.09,38.652-35.09c21.348,0,38.661,15.714,38.661,35.09 c0,16.375-14.608,23.339-9.295,29.196c4.553,5.019,6.812,4.732,18.187,3.117l56.152-6.652c12.215-2.312,19.608,6.527,19.357,14.063 c0,0-1.821,48.054-1.821,55.098c0,7.054-4.66,11.304-10.884,8.482c-6.224-2.839-15.571-14.625-29.527-15.526 c-21.768-1.411-40.42,15.526-40.42,35.277C296.41,275.759,315.062,292.697,336.83,291.277z"
      />
    </g>
  </svg>
);

const LoadingScreen = ({
  progress,
  statusText,
}: {
  progress: number;
  statusText: string;
}) => (
  <div className="fixed inset-0 z-[1001] flex flex-col items-center justify-center bg-[#191028] transition-opacity duration-500 ease-in-out">
    <div className="flex flex-col items-center gap-6">
      <Logo className="w-24 h-24 animate-loading-pulse" />
      <div className="w-64">
        <div className="h-2 rounded-full bg-[rgba(127,0,255,0.2)]">
          <div
            className="h-2 rounded-full bg-[#7f00ff] shadow-[0_0_10px_#7f00ff] transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-center font-mono text-lg font-bold text-[#d8c4ff]">
          {progress}%
        </p>
      </div>
      <p className="font-mono text-sm tracking-widest text-[#a084e8] opacity-70">
        {statusText}
      </p>
    </div>
  </div>
);

const WordSearch: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  const [selection, setSelection] = useState<
    { row: number; col: number }[] | null
  >(null);
  const [startCell, setStartCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [puzzleSeed, setPuzzleSeed] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatusText, setLoadingStatusText] = useState(
    LOADING_STATUS_MESSAGES[0]
  );
  const [hintAvailable, setHintAvailable] = useState(false);
  const [hintWord, setHintWord] = useState<string | null>(null);
  const [hintActive, setHintActive] = useState<boolean>(false);
  const hintTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const selecting = useRef(false);

  useEffect(() => {
    if (!isLoading) {
      startHintTimer();
      return;
    }

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + 100 / (LOADING_DURATION / 100);
        return Math.min(next, 100);
      });
    }, 100);

    const statusInterval = setInterval(() => {
      setLoadingStatusText((prev) => {
        const currentIndex = LOADING_STATUS_MESSAGES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % LOADING_STATUS_MESSAGES.length;
        return LOADING_STATUS_MESSAGES[nextIndex];
      });
    }, LOADING_DURATION / LOADING_STATUS_MESSAGES.length);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    }, LOADING_DURATION);

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [isLoading]);

  const triggerHint = useCallback(() => {
    const candidates = placedWords.filter((w) => !w.found);
    if (candidates.length === 0) return;
    const wordToHint = candidates[getRandomInt(candidates.length)];
    setHintWord(wordToHint.word);
    setHintActive(true);

    setHintAvailable(false);
    if (hintTimeoutId.current) {
      clearTimeout(hintTimeoutId.current);
    }
    const gameIsFinished = placedWords.filter((w) => !w.found).length === 1;
    if (!gameIsFinished) {
      hintTimeoutId.current = setTimeout(() => {
        setHintAvailable(true);
      }, HINT_TIME);
    }

    setGrid((old) =>
      old.map((row, ri) =>
        row.map((cell, ci) => ({
          ...cell,
          highlighted: posInArray({ row: ri, col: ci }, wordToHint.positions),
        }))
      )
    );
  }, [placedWords]);

  useEffect(() => {
    const chosenWords = [...WORDS]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(GRID_SIZE, WORDS.length));
    const [newGrid, newPlaced] = createPuzzle(chosenWords, GRID_SIZE);
    setGrid(newGrid);
    setPlacedWords(newPlaced);
    setSelection(null);
    setStartCell(null);
    setProgress(0);
    setHintWord(null);
    setHintAvailable(false);
    if (hintTimeoutId.current) clearTimeout(hintTimeoutId.current);
  }, [puzzleSeed]);

  useEffect(() => {
    setProgress(placedWords.filter((w) => w.found).length);
  }, [placedWords]);

  useEffect(() => {
    if (progress > 0 && progress === placedWords.length) {
      setHintAvailable(false);
      if (hintTimeoutId.current) clearTimeout(hintTimeoutId.current);
    }
  }, [progress, placedWords]);

  const startHintTimer = () => {
    if (hintTimeoutId.current) clearTimeout(hintTimeoutId.current);
    hintTimeoutId.current = setTimeout(() => {
      setHintAvailable(true);
    }, HINT_TIME);
  };

  function handleInteractionStart(r: number, c: number) {
    if (placedWords.every((w) => w.found) || isShuffling) return;
    selecting.current = true;
    setStartCell({ row: r, col: c });
    setSelection([{ row: r, col: c }]);
    setGrid((old) =>
      old.map((row) => row.map((cell) => ({ ...cell, highlighted: false })))
    );
  }

  function handleInteractionMove(r: number, c: number) {
    if (!selecting.current || !startCell) return;
    const path = getLinePath(startCell, { row: r, col: c });
    setSelection(path);
  }

  function handleInteractionEnd() {
    if (!selecting.current || !selection || selection.length < 2) {
      clearSelection();
      return;
    }

    let foundIndex = -1;
    for (let i = 0; i < placedWords.length; i++) {
      if (placedWords[i].found) continue;
      if (
        arraysEqual(selection, placedWords[i].positions) ||
        arraysEqual(selection, [...placedWords[i].positions].reverse())
      ) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex !== -1) {
      setPlacedWords((old) =>
        old.map((w, i) => (i === foundIndex ? { ...w, found: true } : w))
      );
      setGrid((old) =>
        old.map((row, ri) =>
          row.map((cell, ci) => {
            const isFoundCell = posInArray({ row: ri, col: ci }, selection);
            return isFoundCell
              ? { ...cell, found: true, highlighted: false }
              : cell;
          })
        )
      );

      if (hintWord && placedWords[foundIndex].word === hintWord) {
        setHintWord(null);
        setHintActive(false);
      }

      setHintAvailable(false);
      if (hintTimeoutId.current) clearTimeout(hintTimeoutId.current);
      hintTimeoutId.current = setTimeout(() => {
        if (placedWords.some((w) => !w.found)) setHintAvailable(true);
      }, HINT_TIME);

      setTimeout(() => clearSelection(), 200);
    } else {
      const gridDiv = document.getElementById("ws-grid");
      if (gridDiv) {
        gridDiv.classList.add("animate-shake");
        setTimeout(() => gridDiv.classList.remove("animate-shake"), 350);
      }
      setTimeout(() => clearSelection(), 350);
    }
    selecting.current = false;
  }

  function clearSelection() {
    setSelection(null);
    setStartCell(null);
  }

  function shufflePuzzle() {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setPuzzleSeed(Date.now() + getRandomInt(10000));
      if (hintTimeoutId.current) clearTimeout(hintTimeoutId.current);
      setHintAvailable(false);
      setHintActive(false);
      setHintWord(null);
      startHintTimer();
      setTimeout(() => setIsShuffling(false), 500);
    }, 400);
  }

  const Modal = ({ children, show, className = "" }) => (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(10,5,25,0.5)] transition-opacity duration-300 ease-in-out ${
        show ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`text-center backdrop-blur-[15px] transition-transform duration-300 ease-in-out bg-[rgba(25,16,40,0.6)] border border-[rgba(160,132,232,0.2)] rounded-[20px] py-8 px-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] ${
          show ? "scale-100" : "scale-95"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );

  const isGameWon = progress > 0 && progress === placedWords.length;

  useEffect(() => {
    if (isGameWon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isGameWon]);

  if (isLoading && !isShuffling) {
    return (
      <>
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Mohave:ital,wght@0,300..700;1,300..700&display=swap');
            body, html {
                margin: 0; padding: 0; background-color: #191028;
                background-image: radial-gradient(circle at 15% 20%, rgba(127,0,255, 0.1), transparent 50%), radial-gradient(circle at 85% 80%, rgba(160,132,232, 0.05), transparent 60%);
                font-family: 'Mohave', system-ui, sans-serif;
                -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
            }
            html {
              scrollbar-width: thin;
              scrollbar-color: #7f00ff #191028;
            }
            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: #191028; }
            ::-webkit-scrollbar-thumb { background-color: #7f00ff; border-radius: 10px; }
            ::-webkit-scrollbar-thumb:hover { background-color: #a084e8; }
            .font-sans { font-family: 'Mohave', system-ui, sans-serif; }
            .font-mono { font-family: 'Fira Code', monospace; }
            @keyframes loading-pulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.05); opacity: 1; }
            }
            .animate-loading-pulse { animation: loading-pulse 2s infinite ease-in-out; }
        `}</style>
        <LoadingScreen
          progress={Math.round(loadingProgress)}
          statusText={loadingStatusText}
        />
      </>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-[#191028] p-4 font-sans text-[#d8c4ff] animate-fade-in"
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mohave:ital,wght@0,300..700;1,300..700&display=swap');
        
        body, html {
            margin: 0; padding: 0; background-color: #191028;
            background-image: radial-gradient(circle at 15% 20%, rgba(127,0,255, 0.1), transparent 50%), radial-gradient(circle at 85% 80%, rgba(160,132,232, 0.05), transparent 60%);
            font-family: 'Mohave', system-ui, sans-serif;
            -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
        }

        html {
          scrollbar-width: thin;
          scrollbar-color: #7f00ff #191028;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #191028;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #7f00ff;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background-color: #a084e8;
        }

        .font-sans { font-family: 'Mohave', system-ui, sans-serif; }
        .font-mono { font-family: 'Fira Code', monospace; }
        
        .ws-cell-default {
            background-color: rgba(127, 0, 255, 0.1);
            border-color: #7f00ff;
            color: white;
            box-shadow: 0 0 12px rgba(127, 0, 255, 0.5);
        }

        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s; }

        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.2); box-shadow: 0 0 25px 8px #c5aeff; }
          100% { transform: scale(1); opacity: 1; box-shadow: none; }
        }
        .animate-pop-in { animation: popIn 0.4s ease-out; }

        @keyframes shuffle-effect {
          0% { transform: rotateY(0deg) scale(1); opacity: 1; }
          50% { transform: rotateY(90deg) scale(0.5); opacity: 0; }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        .animate-shuffle-cell {
          animation-name: shuffle-effect;
          animation-duration: 0.8s;
          animation-timing-function: ease-in-out;
        }
        
        @keyframes hint-pulse {
          0%, 100% { box-shadow: 0 0 12px 2px #d8c4ff; border-color: #d8c4ff; }
          50% { box-shadow: 0 0 20px 5px #d8c4ff; border-color: #d8c4ff; }
        }
        .animate-hint-pulse { animation: hint-pulse 1.5s infinite; }
        
        @keyframes hint-pulse-border {
          0%, 100% { border-color: #d8c4ff; }
          50% { border-color: white; }
        }
        .animate-hint-pulse-border { animation: hint-pulse-border 1.5s infinite; }

        @keyframes loading-pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-loading-pulse { animation: loading-pulse 2s infinite ease-in-out; }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50 bg-[#191028]/80 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Logo className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-[1px] bg-gradient-to-r from-white to-[#d8c4ff] bg-clip-text text-transparent">
              Word Search
            </h1>
          </div>
          <div className="text-right">
            <p className="font-mono text-lg font-semibold text-[#a084e8]">
              {progress}{" "}
              <span className="text-[#a084e8]/70">/ {placedWords.length}</span>
            </p>
            <p className="text-xs text-[#a084e8]/70 tracking-wider">
              WORDS FOUND
            </p>
          </div>
        </div>
      </header>

      <Modal show={progress > 0 && progress === placedWords.length}>
        <h2 className="mb-4 text-[2.5rem] font-bold leading-[3rem] bg-gradient-to-r from-[#d8c4ff] to-[#a084e8] bg-clip-text text-transparent">
          Congratulations!
        </h2>
        <p className="mb-8 text-[#a084e8]">You've found all the words!</p>
        <button
          className="rounded-full border-none bg-[#4a3d6f] py-3 px-7 font-semibold text-[#d8c4ff] shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(74,61,111,0.5)] active:translate-y-0 active:scale-95 active:brightness-90 active:shadow-[0_4px_15px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={shufflePuzzle}
        >
          Play Again
        </button>
      </Modal>

      <main className="flex w-full flex-col items-center pt-24">
        <div className="mb-8 flex w-full max-w-[520px] justify-center rounded-[24px] bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-transparent p-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div
            id="ws-grid"
            className="grid w-full max-w-[500px] select-none touch-none gap-1"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const elem = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              );
              const cellElem = elem?.closest(".ws-cell");
              if (!cellElem) return;
              const row = parseInt(cellElem.getAttribute("data-row")!);
              const col = parseInt(cellElem.getAttribute("data-col")!);
              handleInteractionStart(row, col);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const elem = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              );
              const cellElem = elem?.closest(".ws-cell");
              if (!cellElem) return;
              const row = parseInt(cellElem.getAttribute("data-row")!);
              const col = parseInt(cellElem.getAttribute("data-col")!);
              handleInteractionMove(row, col);
            }}
            onTouchEnd={handleInteractionEnd}
          >
            {grid.map((row, ri) =>
              row.map((cell, ci) => {
                const isSelected =
                  selection && posInArray({ row: ri, col: ci }, selection);
                const isHintPath =
                  hintActive &&
                  hintWord &&
                  placedWords.some(
                    (w) =>
                      w.word === hintWord &&
                      posInArray({ row: ri, col: ci }, w.positions)
                  );
                const baseClasses =
                  "ws-cell flex aspect-square w-full items-center justify-center rounded-xl border font-mono font-bold transition-all duration-200 ease-in-out max-sm:rounded-lg text-[clamp(0.75rem,4vw,1.5rem)]";

                let stateClasses = "";
                if (cell.found) {
                  stateClasses =
                    "cursor-default text-[#191028] border-[#a084e8] bg-gradient-to-br from-[#c5aeff] to-[#a084e8] animate-pop-in";
                } else if (isSelected) {
                  stateClasses =
                    "cursor-default text-[#191028] border-[#a084e8] bg-gradient-to-br from-[#c5aeff] to-[#a084e8]";
                } else {
                  stateClasses = "cursor-pointer ws-cell-default";
                }

                const hintClasses = isHintPath ? "animate-hint-pulse" : "";
                const shuffleClasses = isShuffling
                  ? "animate-shuffle-cell"
                  : "";

                return (
                  <div
                    key={`${ri}-${ci}`}
                    className={`${baseClasses} ${stateClasses} ${hintClasses} ${shuffleClasses}`}
                    style={
                      isShuffling
                        ? { animationDelay: `${(ri * 0.5 + ci) * 25}ms` }
                        : {}
                    }
                    data-row={ri}
                    data-col={ci}
                    onMouseDown={() => handleInteractionStart(ri, ci)}
                    onMouseEnter={() => handleInteractionMove(ri, ci)}
                  >
                    {cell.letter}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mb-8 flex max-w-[600px] flex-wrap justify-center gap-3">
          {placedWords.map((wordObj) => {
            const baseClasses =
              "font-mono rounded-[20px] border py-2 px-4 text-[0.95rem] tracking-[0.5px] transition-all duration-300 ease-in-out";
            let stateClasses = "";
            if (wordObj.found) {
              stateClasses =
                "line-through opacity-60 border-[#4a3d6f] bg-[#4a3d6f] text-[#c5aeff] decoration-[#c5aeff]";
            } else {
              stateClasses = "border-[#7f00ff] bg-[#7f00ff] text-white";
            }
            const hintClass =
              hintActive && hintWord === wordObj.word
                ? "animate-hint-pulse-border"
                : "";

            return (
              <div
                key={wordObj.word}
                className={`${baseClasses} ${stateClasses} ${hintClass}`}
              >
                {wordObj.word}
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 text-center max-sm:w-4/5 max-sm:max-w-[350px] max-sm:flex-col">
          <button
            className="w-full rounded-full border-none bg-[#4a3d6f] py-3 px-7 font-semibold text-[#d8c4ff] shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(74,61,111,0.5)] active:translate-y-0 active:scale-95 active:brightness-90 active:shadow-[0_4px_15px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-50 max-sm:w-full"
            onClick={shufflePuzzle}
            disabled={isShuffling}
          >
            {isShuffling ? "Shuffling..." : "Shuffle Puzzle"}
          </button>
          <button
            className="w-full rounded-full border-none bg-[#7f00ff] py-3 px-7 font-semibold text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(127,0,255,0.5)] active:translate-y-0 active:scale-95 active:brightness-90 active:shadow-[0_4px_15px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-50 max-sm:w-full"
            onClick={triggerHint}
            disabled={
              !hintAvailable ||
              hintActive ||
              isShuffling ||
              placedWords.every((w) => w.found)
            }
          >
            {hintActive
              ? "Hint Active"
              : hintAvailable
              ? "Get Hint"
              : "Loading Hint"}
          </button>
        </div>
      </main>

      <footer className="mt-auto w-full max-w-7xl pt-12 pb-6 text-center text-xs text-[#a084e8]/60">
        <p>Designed for mental agility and entertainment.</p>
        <p>{new Date().getFullYear()} | A Modern Intellectual Challenge.</p>
      </footer>
    </div>
  );
};

export default WordSearch;
