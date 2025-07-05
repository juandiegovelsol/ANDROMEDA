"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

type TrajectoryPoint = { x: number; y: number; t: number };
type Energy = { ke: number; pe: number; te: number };
type SpaceDust = {
  x: number;
  y: number;
  r: number;
  color: string;
  isBig: boolean;
};

function generateSpaceDust(
  count: number,
  width: number,
  height: number
): SpaceDust[] {
  const colorChoices = [
    "rgba(80,255,255,0.19)",
    "rgba(110,180,255,0.15)",
    "rgba(200,255,255,0.14)",
    "rgba(19,241,231,0.17)",
    "rgba(255,255,255,0.13)",
    "rgba(135,255,255,0.16)",
    "rgba(33,140,240,0.12)",
  ];
  return Array.from({ length: count }, () => {
    const isBig = Math.random() > 0.78;
    const r = isBig ? 8 + Math.random() * 10 : 2 + Math.random() * 6;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r,
      color: colorChoices[Math.floor(Math.random() * colorChoices.length)],
      isBig,
    };
  });
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dust: SpaceDust[],
  dustOffset: { x: number; y: number }
) {
  ctx.fillStyle = "#111214";
  ctx.fillRect(0, 0, width, height);

  for (const d of dust) {
    const x = (d.x + width - (dustOffset.x % width)) % width;
    const y = (d.y + height - (dustOffset.y % height)) % height;
    const r = d.r;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
    glow.addColorStop(0, d.color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
  }
}

const BASE_CANVAS_WIDTH = 1200;
const BASE_CANVAS_HEIGHT = 700;
const PADDING = 60;
const MASS = 1;

const COLORS = {
  background: "#23262B",
  accent: "#FFB951",
  accentSoft: "#FFE4B1",
  border: "#FFD789",
  text: "#FFD789",
  ke: "#19F1E7",
  pe: "#C876F7",
  te: "#66FF7F",
};

const Header = () => (
  <header className="w-full bg-[#181A1F] text-[#FFD789] p-4 flex justify-between items-center z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1),_inset_0_-3px_6px_rgba(0,0,0,0.3)]">
    <div className="flex items-center gap-4">
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={COLORS.accent}
          strokeWidth="8"
          fill="none"
          strokeDasharray="20 15"
          transform="rotate(-45 50 50)"
        />
        <circle cx="50" cy="50" r="10" fill={COLORS.ke} />
      </svg>
      <h1 className="text-2xl font-bold">Projectile Motion Simulator</h1>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-sm hidden sm:inline">Service Status:</span>
      <div
        className="w-4 h-4 rounded-full"
        style={{
          backgroundColor: COLORS.te,
        }}
      ></div>
      <span className="font-semibold" style={{ color: COLORS.te }}>
        Operational
      </span>
    </div>
  </header>
);

const Footer = () => (
  <footer className="w-full bg-[#181A1F] text-center text-zinc-400 p-4 text-xs shadow-[0_-4px_12px_rgba(0,0,0,0.1),_inset_0_3px_6px_rgba(0,0,0,0.3)]">
    <p>Simulation v1.2.0 | For educational and demonstration purposes.</p>
    <p className="mt-1">
      Calculations are based on idealized physics models, ignoring air
      resistance.
    </p>
  </footer>
);

const SliderControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({ label, value, min, max, step, unit, onChange, disabled }) => (
  <div className="flex flex-col gap-2">
    <label className="flex justify-between text-sm font-medium text-[#FFD789]">
      <span>{label}</span>
      <span className="font-bold text-[#FFB951]">
        {value.toFixed(1)} {unit}
      </span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full h-2 bg-[#d1d9e6] rounded-lg appearance-none outline-none slider-thumb"
      style={{
        accentColor: "#FFB951",
      }}
    />
  </div>
);

const EnergyBar: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color: string;
}> = ({ label, value, maxValue, color }) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-[#FFD789]">
        <span>{label}</span>
        <span>{value.toFixed(0)} J</span>
      </div>
      <div className="w-full h-3 bg-[#181A1F] rounded-lg overflow-hidden mt-1">
        <div
          className="h-full rounded-lg transition-all duration-100"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color} 0%, #fff0 80%)`,
            minWidth: value > 0 ? "2px" : "0px",
          }}
        />
      </div>
    </div>
  );
};

export default function Projectile() {
  const [gravity, setGravity] = useState(9.8);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(70);
  const [isSimulating, setIsSimulating] = useState(false);
  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);
  const [currentEnergy, setCurrentEnergy] = useState<Energy>({
    ke: 0,
    pe: 0,
    te: 0,
  });
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [canvasSize, setCanvasSize] = useState({
    width: BASE_CANVAS_WIDTH,
    height: BASE_CANVAS_HEIGHT,
  });
  const [graphBounds, setGraphBounds] = useState({
    maxX: BASE_CANVAS_WIDTH - PADDING * 2,
    maxY: BASE_CANVAS_HEIGHT - PADDING * 2,
  });
  const [previewTrajectory, setPreviewTrajectory] = useState<TrajectoryPoint[]>(
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const currentEnergyRef = useRef<Energy>({ ke: 0, pe: 0, te: 0 });
  const dustOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dust] = useState(() =>
    generateSpaceDust(38, BASE_CANVAS_WIDTH, BASE_CANVAS_HEIGHT)
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const frameIndex = useRef(0);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = canvasWrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width: availableWidth, height: availableHeight } =
          entries[0].contentRect;
        const aspectRatio = BASE_CANVAS_WIDTH / BASE_CANVAS_HEIGHT;

        let newWidth = availableWidth;
        let newHeight = newWidth / aspectRatio;

        if (newHeight > availableHeight) {
          newHeight = availableHeight;
          newWidth = newHeight * aspectRatio;
        }

        setCanvasSize({ width: newWidth, height: newHeight });
      }
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSimulating) {
      setPreviewTrajectory([]);
      return;
    }

    const points: TrajectoryPoint[] = [];
    const rad = angle * (Math.PI / 180);
    const v0x = velocity * Math.cos(rad);
    const v0y = velocity * Math.sin(rad);
    const g = gravity;
    if (g <= 0) return;
    const timeOfFlight = (2 * v0y) / g;
    const dt = 0.02;

    for (let t = 0; t <= timeOfFlight; t += dt) {
      const x = v0x * t;
      const y = v0y * t - 0.5 * g * t * t;
      if (y < 0) break;
      points.push({ x, y, t });
    }
    const finalTime = timeOfFlight;
    points.push({ x: v0x * finalTime, y: 0, t: finalTime });

    if (points.length > 0) {
      const peakX = Math.max(...points.map((p) => p.x));
      const peakY = Math.max(...points.map((p) => p.y));

      const needsRescale = peakX > graphBounds.maxX || peakY > graphBounds.maxY;

      if (needsRescale) {
        const newMaxX = Math.max(graphBounds.maxX, peakX * 1.15);
        const newMaxY = Math.max(graphBounds.maxY, peakY * 1.15);
        setGraphBounds({ maxX: newMaxX, maxY: newMaxY });
      }
    }

    setPreviewTrajectory(points);
  }, [gravity, angle, velocity, isSimulating, graphBounds]);

  const calculateTrajectory = useCallback(
    (g: number, v0: number, deg: number): Promise<TrajectoryPoint[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const points: TrajectoryPoint[] = [];
          const rad = deg * (Math.PI / 180);
          const v0x = v0 * Math.cos(rad);
          const v0y = v0 * Math.sin(rad);
          const timeOfFlight = (2 * v0y) / g;
          const dt = 0.02;
          for (let t = 0; t <= timeOfFlight; t += dt) {
            const x = v0x * t;
            const y = v0y * t - 0.5 * g * t * t;
            if (y < 0) break;
            points.push({ x, y, t });
          }
          const finalTime = timeOfFlight;
          points.push({ x: v0x * finalTime, y: 0, t: finalTime });
          resolve(points);
        }, 300);
      });
    },
    []
  );

  const handleLaunch = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentEnergy({ ke: 0, pe: 0, te: 0 });
    currentEnergyRef.current = { ke: 0, pe: 0, te: 0 };
    dustOffsetRef.current = { x: 0, y: 0 };
    frameIndex.current = 0;

    const newTrajectory = await calculateTrajectory(gravity, velocity, angle);

    if (newTrajectory.length > 0) {
      const peakX = Math.max(...newTrajectory.map((p) => p.x));
      const peakY = Math.max(...newTrajectory.map((p) => p.y));

      const newMaxX = Math.max(BASE_CANVAS_WIDTH - PADDING * 2, peakX * 1.15);
      const newMaxY = Math.max(BASE_CANVAS_HEIGHT - PADDING * 2, peakY * 1.15);
      setGraphBounds({ maxX: newMaxX, maxY: newMaxY });
    }

    const initialKE = 0.5 * MASS * velocity * velocity;
    const initialPE = 0;
    const totalEnergy = initialKE + initialPE;
    setMaxEnergy(totalEnergy > 0 ? totalEnergy : 1000);
    setTrajectory(newTrajectory);
    setShouldAnimate(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelScaleX = canvas.width / BASE_CANVAS_WIDTH;
    const pixelScaleY = canvas.height / BASE_CANVAS_HEIGHT;

    function toCanvasCoords(x: number, y: number): [number, number] {
      const canvasX =
        PADDING + (x / graphBounds.maxX) * (BASE_CANVAS_WIDTH - PADDING * 2);
      const canvasY =
        BASE_CANVAS_HEIGHT -
        PADDING -
        (y / graphBounds.maxY) * (BASE_CANVAS_HEIGHT - PADDING * 2);
      return [canvasX * pixelScaleX, canvasY * pixelScaleY];
    }

    const getNiceStep = (range: number) => {
      if (range === 0) return 1;
      const exponent = Math.floor(Math.log10(range));
      const powerOf10 = Math.pow(10, exponent);
      const significant = range / powerOf10;
      if (significant < 1.5) return 0.2 * powerOf10;
      if (significant < 3) return 0.5 * powerOf10;
      if (significant < 7) return 1 * powerOf10;
      return 2 * powerOf10;
    };

    const drawGridAndAxes = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement
    ) => {
      ctx.strokeStyle = "rgba(255, 200, 120, 0.09)";
      ctx.lineWidth = 1.5 * pixelScaleX;
      ctx.font = `${12 * pixelScaleX}px 'Space Grotesk'`;
      ctx.fillStyle = "rgba(255, 200, 120, 0.4)";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const xStep = getNiceStep(graphBounds.maxX);
      for (let i = 0; i * xStep <= graphBounds.maxX; i++) {
        const xVal = i * xStep;
        const [cx] = toCanvasCoords(xVal, 0);
        ctx.beginPath();
        ctx.moveTo(cx, PADDING * pixelScaleY);
        ctx.lineTo(cx, (BASE_CANVAS_HEIGHT - PADDING) * pixelScaleY);
        ctx.stroke();
        if (xVal > 0) {
          ctx.fillText(
            xVal.toFixed(0) + "m",
            cx,
            (BASE_CANVAS_HEIGHT - PADDING + 8) * pixelScaleY
          );
        }
      }

      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      const yStep = getNiceStep(graphBounds.maxY);
      for (let i = 0; i * yStep <= graphBounds.maxY; i++) {
        const yVal = i * yStep;
        const [, cy] = toCanvasCoords(0, yVal);
        ctx.beginPath();
        ctx.moveTo(PADDING * pixelScaleX, cy);
        ctx.lineTo((BASE_CANVAS_WIDTH - PADDING) * pixelScaleX, cy);
        ctx.stroke();
        if (yVal > 0) {
          ctx.fillText(yVal.toFixed(0) + "m", (PADDING - 8) * pixelScaleX, cy);
        }
      }

      ctx.strokeStyle = "#FFB951";
      ctx.lineWidth = 2.8 * pixelScaleX;
      ctx.beginPath();
      ctx.moveTo(
        PADDING * pixelScaleX,
        (BASE_CANVAS_HEIGHT - PADDING) * pixelScaleY
      );
      ctx.lineTo(
        (BASE_CANVAS_WIDTH - PADDING) * pixelScaleX,
        (BASE_CANVAS_HEIGHT - PADDING) * pixelScaleY
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(
        PADDING * pixelScaleX,
        (BASE_CANVAS_HEIGHT - PADDING) * pixelScaleY
      );
      ctx.lineTo(PADDING * pixelScaleX, PADDING * pixelScaleY);
      ctx.stroke();
    };

    const drawPreviewTrajectory = (
      ctx: CanvasRenderingContext2D,
      points: TrajectoryPoint[]
    ) => {
      if (points.length < 2) return;
      ctx.save();
      const [startX, startY] = toCanvasCoords(points[0].x, points[0].y);
      ctx.setLineDash([8 * pixelScaleX, 12 * pixelScaleX]);
      ctx.strokeStyle = "rgba(255, 185, 81, 0.6)";
      ctx.lineWidth = 2.5 * pixelScaleX;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      for (const point of points) {
        const [cx, cy] = toCanvasCoords(point.x, point.y);
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawFullTrajectoryPath = (
      ctx: CanvasRenderingContext2D,
      points: TrajectoryPoint[]
    ) => {
      if (points.length < 2) return;
      ctx.save();
      const [startX, startY] = toCanvasCoords(points[0].x, points[0].y);

      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = "#19F1E7";
      ctx.shadowColor = "#19F1E7";
      ctx.shadowBlur = 22 * pixelScaleX;
      ctx.lineWidth = 12 * pixelScaleX;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      for (const point of points) {
        const [cx, cy] = toCanvasCoords(point.x, point.y);
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      ctx.globalAlpha = 0.32;
      ctx.strokeStyle = "#53FFE2";
      ctx.shadowColor = "#53FFE2";
      ctx.shadowBlur = 7 * pixelScaleX;
      ctx.lineWidth = 5.5 * pixelScaleX;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      for (const point of points) {
        const [cx, cy] = toCanvasCoords(point.x, point.y);
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      ctx.globalAlpha = 0.94;
      ctx.strokeStyle = "#19F1E7";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.lineWidth = 2.7 * pixelScaleX;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      for (const point of points) {
        const [cx, cy] = toCanvasCoords(point.x, point.y);
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawProjectile = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number
    ) => {
      const [cx, cy] = toCanvasCoords(x, y);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 34 * pixelScaleX, 0, 2 * Math.PI);
      const glowGradient = ctx.createRadialGradient(
        cx,
        cy,
        6 * pixelScaleX,
        cx,
        cy,
        34 * pixelScaleX
      );
      glowGradient.addColorStop(0, "rgba(25,241,231,0.55)");
      glowGradient.addColorStop(0.35, "rgba(25,241,231,0.36)");
      glowGradient.addColorStop(0.7, "rgba(25,241,231,0.14)");
      glowGradient.addColorStop(1, "rgba(25,241,231,0)");
      ctx.fillStyle = glowGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5 * pixelScaleX, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.shadowColor = "#aaffff";
      ctx.shadowBlur = 6 * pixelScaleX;
      ctx.fill();
      ctx.restore();
    };

    const drawFrame = (point: TrajectoryPoint, frameIdx: number) => {
      drawBackground(
        ctx,
        canvas.width,
        canvas.height,
        dust,
        dustOffsetRef.current
      );
      drawGridAndAxes(ctx, canvas);
      drawFullTrajectoryPath(ctx, trajectory.slice(0, frameIdx + 1));
      drawProjectile(ctx, point.x, point.y);
    };

    if (!shouldAnimate) {
      drawBackground(
        ctx,
        canvas.width,
        canvas.height,
        dust,
        dustOffsetRef.current
      );
      drawGridAndAxes(ctx, canvas);

      if (trajectory.length > 0) {
        drawFullTrajectoryPath(ctx, trajectory);
        const lastPoint = trajectory[trajectory.length - 1];
        if (lastPoint) drawProjectile(ctx, lastPoint.x, lastPoint.y);
      }

      if (!isSimulating) {
        drawPreviewTrajectory(ctx, previewTrajectory);
      }
      return;
    }

    const animate = () => {
      if (frameIndex.current >= trajectory.length) {
        setIsSimulating(false);
        setShouldAnimate(false);
        setCurrentEnergy({ ke: 0, pe: 0, te: 0 });
        return;
      }
      const point = trajectory[frameIndex.current];
      drawFrame(point, frameIndex.current);
      let dx = 0;
      let dy = 0;
      if (frameIndex.current > 0) {
        const prev = trajectory[frameIndex.current - 1];
        dx = point.x - prev.x;
        dy = point.y - prev.y;
      } else {
        const rad = angle * (Math.PI / 180);
        dx = Math.cos(rad);
        dy = Math.sin(rad);
      }
      const mag = Math.sqrt(dx * dx + dy * dy) || 1;
      const dustDx = -dx / mag;
      const dustDy = -dy / mag;
      const DUST_SPEED = 1.4;
      dustOffsetRef.current = {
        x: dustOffsetRef.current.x - dustDx * DUST_SPEED,
        y: dustOffsetRef.current.y + dustDy * DUST_SPEED,
      };

      const totalEnergy = 0.5 * MASS * velocity * velocity;
      const pe = MASS * gravity * point.y;
      const ke = totalEnergy - pe;
      currentEnergyRef.current = { ke, pe, te: totalEnergy };

      frameIndex.current += 2;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    shouldAnimate,
    trajectory,
    previewTrajectory,
    isSimulating,
    angle,
    gravity,
    velocity,
    dust,
    canvasSize.width,
    canvasSize.height,
    graphBounds,
  ]);

  useEffect(() => {
    if (!shouldAnimate) return;
    let mounted = true;
    function syncState() {
      setCurrentEnergy({ ...currentEnergyRef.current });
      if (mounted && shouldAnimate) setTimeout(syncState, 33);
    }
    syncState();
    return () => {
      mounted = false;
    };
  }, [shouldAnimate]);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap");
        html,
        body {
          font-family: "Space Grotesk", system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
            sans-serif !important;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #ffb951;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #23262b;
          box-shadow: 2px 2px 5px #16181c, -2px -2px 5px #383c44;
          transition: all 0.2s ease;
        }
        input[type="range"]:focus {
          outline: none;
        }
        input[type="range"]:disabled::-webkit-slider-thumb {
          background: #b8a35e;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #ffb951;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #23262b;
          box-shadow: 2px 2px 5px #16181c, -2px -2px 5px #383c44;
        }
        input[type="range"]::-ms-thumb {
          width: 20px;
          height: 20px;
          background: #ffb951;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #23262b;
          box-shadow: 2px 2px 5px #16181c, -2px -2px 5px #383c44;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ffb951 #23262b;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #ffb951;
          border-radius: 20px;
          border: 3px solid #23262b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #ffe4b1;
        }
      `}</style>
      <div className="flex flex-col min-h-screen w-full bg-[#23262B] text-[#FFD789] font-['Space_Grotesk']">
        <Header />
        <main className="flex-grow h-70 flex justify-center items-stretch p-6 md:p-8">
          <div
            className="flex flex-row gap-8 w-full max-w-[1700px] box-border items-stretch"
            ref={containerRef}
          >
            <div className="flex flex-col min-w-[320px] max-w-[370px] w-[350px] rounded-[15px] shadow-[7px_7px_15px_#16181C,-7px_-7px_15px_#383C44] bg-[#23262B] overflow-hidden">
              <div className="custom-scrollbar overflow-y-auto h-full flex flex-col gap-6 p-7">
                <h2 className="text-[20px] font-bold text-center text-[#FFD789] bg-[#23262B] rounded-[15px] py-4 mb-2 shadow-[7px_7px_15px_#16181C,-7px_-7px_15px_#383C44]">
                  Simulation Controls
                </h2>
                <div className="flex flex-col gap-5 bg-[#23262B] rounded-[15px] shadow-[inset_7px_7px_15px_#16181C,inset_-7px_-7px_15px_#383C44] p-5">
                  <SliderControl
                    label="Gravity"
                    value={gravity}
                    min={1}
                    max={30}
                    step={0.1}
                    unit="m/s²"
                    onChange={(e) => setGravity(parseFloat(e.target.value))}
                    disabled={isSimulating}
                  />
                  <SliderControl
                    label="Launch Angle"
                    value={angle}
                    min={1}
                    max={90}
                    step={1}
                    unit="°"
                    onChange={(e) => setAngle(parseFloat(e.target.value))}
                    disabled={isSimulating}
                  />
                  <SliderControl
                    label="Initial Velocity"
                    value={velocity}
                    min={10}
                    max={120}
                    step={1}
                    unit="m/s"
                    onChange={(e) => setVelocity(parseFloat(e.target.value))}
                    disabled={isSimulating}
                  />
                </div>
                <button
                  className={`rounded-[15px] p-4 text-lg font-bold text-[#FFD789] bg-[#23262B] mt-2 shadow-[7px_7px_15px_#16181C,-7px_-7px_15px_#383C44,0_2px_12px_#ffffff22] transition duration-150 outline-none border-0
      ${
        isSimulating
          ? "opacity-70 cursor-not-allowed"
          : "hover:shadow-[7px_7px_15px_#16181C,-7px_-7px_15px_#383C44,0_2px_22px_#fff4] active:shadow-[inset_3px_3px_7px_#16181C,inset_-3px_-3px_7px_#383C44] cursor-pointer"
      }
    `}
                  onClick={handleLaunch}
                  disabled={isSimulating}
                  type="button"
                  tabIndex={0}
                >
                  {isSimulating ? "Simulating..." : "Launch"}
                </button>
                <div className="mt-auto flex flex-col gap-4 pt-8 border-t border-[#16181C]">
                  <h2 className="text-lg font-bold text-center text-[#FFD789] mb-2">
                    Energy Distribution
                  </h2>
                  <EnergyBar
                    label="Kinetic"
                    value={currentEnergy.ke}
                    maxValue={maxEnergy}
                    color={COLORS.ke}
                  />
                  <EnergyBar
                    label="Potential"
                    value={currentEnergy.pe}
                    maxValue={maxEnergy}
                    color={COLORS.pe}
                  />
                  <EnergyBar
                    label="Total"
                    value={currentEnergy.te}
                    maxValue={maxEnergy}
                    color={COLORS.te}
                  />
                </div>
              </div>
            </div>
            <div
              ref={canvasWrapperRef}
              className="flex-1 min-w-0 flex items-center justify-center rounded-[15px] shadow-[7px_7px_15px_#16181C,-7px_-7px_15px_#383C44] bg-[#23262B] p-5"
            >
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="block rounded-[10px] bg-gradient-to-br from-[#272A30] to-[#181A1F] shadow-[inset_0_6px_30px_#16181C,0_2px_10px_#0008] border border-[#FFD789] max-w-full max-h-full"
                style={{
                  width: `${canvasSize.width}px`,
                  height: `${canvasSize.height}px`,
                  aspectRatio: `${BASE_CANVAS_WIDTH} / ${BASE_CANVAS_HEIGHT}`,
                }}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
