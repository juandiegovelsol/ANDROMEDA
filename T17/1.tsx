import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

// Constants
const C0 = 299792458; // Speed of light in vacuum (m/s)
const MU0 = 4 * Math.PI * 1e-7; // Permeability of free space (H/m)
const EPS0 = 8.854187817e-12; // Permittivity of free space (F/m)

const GRID_RESOLUTION = 50; // Resolution for heatmap
const HEATMAP_CANVAS_SIZE = 400; // Pixels
const CHART_CANVAS_WIDTH = 280;
const CHART_CANVAS_HEIGHT = 200;

// Colors
const COLORS = {
  background: "#1A202C", // Very dark blue/gray
  sidebarBg: "#2D3748", // Dark gray
  componentBg: "#252E3D",
  primary: "#4FD1C5", // Teal
  secondary: "#FF6B6B", // Coral
  text: "#E2E8F0", // Light gray/off-white
  textSecondary: "#A0AEC0", // Medium gray
  border: "#4A5568",
  shadow: "rgba(0, 0, 0, 0.3)",
  accentGradientStart: "#4FD1C5", // Teal
  accentGradientEnd: "#F687B3", // Pinkish (can be coral too)
};

// Types
interface CavityDimensions {
  a: number; // Width (x-axis) in cm
  b: number; // Height (y-axis) in cm
  d: number; // Length (z-axis) in cm
}

interface ModeSelection {
  type: "TE" | "TM";
  m: number;
  n: number;
  p: number;
}

interface VisualizationPlane {
  plane: "XY" | "XZ" | "YZ";
  slice: number; // Percentage (0 to 1) along the third axis
}

type FieldType = "E" | "H";

interface ResonantPeak {
  freq: number;
  mode: ModeSelection;
  strength: number; // For display purposes
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: COLORS.background,
    color: COLORS.text,
    fontFamily: "Arial, sans-serif",
    overflow: "hidden", // Prevent body scroll
  },
  header: {
    padding: "10px 20px",
    backgroundColor: COLORS.sidebarBg,
    boxShadow: `0 2px 4px ${COLORS.shadow}`,
    textAlign: "center",
    zIndex: 10, // Ensure header is above other content
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.5em",
    color: COLORS.primary,
  },
  mainContent: {
    display: "flex",
    flexGrow: 1,
    overflow: "hidden", // Allow sidebar and viz area to scroll independently if needed
  },
  sidebar: {
    width: "320px",
    padding: "20px",
    backgroundColor: COLORS.sidebarBg,
    boxShadow: `2px 0 5px ${COLORS.shadow}`,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  visualizationArea: {
    flexGrow: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  controlGroup: {
    backgroundColor: COLORS.componentBg,
    padding: "15px",
    borderRadius: "8px",
    boxShadow: `0 1px 3px ${COLORS.shadow}`,
  },
  controlGroupTitle: {
    margin: "0 0 10px 0",
    fontSize: "1.1em",
    color: COLORS.primary,
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: "5px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "0.9em",
    color: COLORS.textSecondary,
  },
  input: {
    width: "calc(100% - 20px)",
    padding: "8px 10px",
    marginBottom: "10px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "4px",
    backgroundColor: COLORS.background,
    color: COLORS.text,
    fontSize: "0.9em",
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: "10px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "4px",
    backgroundColor: COLORS.background,
    color: COLORS.text,
    fontSize: "0.9em",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`,
    color: "white",
    cursor: "pointer",
    fontSize: "1em",
    transition: "opacity 0.2s",
  },
  canvas: {
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    boxShadow: `0 0 10px ${COLORS.shadow}`,
  },
  note: {
    fontSize: "0.8em",
    color: COLORS.textSecondary,
    marginTop: "5px",
  },
};

// Physics and Drawing Helper Functions

const getResonantFrequency = (
  dims: CavityDimensions,
  mode: ModeSelection
): number => {
  const a_m = dims.a / 100; // cm to m
  const b_m = dims.b / 100; // cm to m
  const d_m = dims.d / 100; // cm to m

  if (a_m <= 0 || b_m <= 0 || d_m <= 0) return 0;

  // Validate mode indices
  if (mode.type === "TE") {
    if (mode.m === 0 && mode.n === 0) return 0; // TE00p not allowed
    if (mode.p === 0) return 0; // TEmn0 not resonant in typical cavity definition
  } else {
    // TM
    if (mode.m === 0 || mode.n === 0) return 0; // TMm0p or TM0np not allowed
    // TMmn0 is allowed
  }

  const term_m = (mode.m * Math.PI) / a_m;
  const term_n = (mode.n * Math.PI) / b_m;
  const term_p = (mode.p * Math.PI) / d_m;

  const k_sq = term_m ** 2 + term_n ** 2 + term_p ** 2;
  const f_resonant = (C0 / (2 * Math.PI)) * Math.sqrt(k_sq);
  return f_resonant / 1e9; // Hz to GHz
};

// Simplified field calculation (magnitude of dominant component or total)
// This is a highly simplified model for visualization purposes.
// x, y, z are normalized coordinates (0 to 1)
const calculateFieldMagnitude = (
  x: number,
  y: number,
  z: number, // Normalized coordinates (0-1)
  cavity: CavityDimensions, // actual dimensions in cm
  mode: ModeSelection,
  fieldType: FieldType,
  timeFactor: number // cos(omega*t)
): number => {
  const { m, n, p } = mode;
  const kx_norm = m * Math.PI; // kx * a = m * PI
  const ky_norm = n * Math.PI; // ky * b = n * PI
  const kz_norm = p * Math.PI; // kz * d = p * PI

  let Ex_amp = 0,
    Ey_amp = 0,
    Ez_amp = 0;
  let Hx_amp = 0,
    Hy_amp = 0,
    Hz_amp = 0;

  // These are spatial amplitude patterns. Normalization constants omitted for simplicity.
  if (mode.type === "TE") {
    // For TE modes, Ez = 0. H components are primary.
    // Example: TE101 (m=1, n=0, p=1)
    // H_z ~ cos(kx*x) * sin(kz*z)
    // H_x ~ sin(kx*x) * cos(kz*z)
    // E_y ~ sin(kx*x) * sin(kz*z)
    const k_c_sq_norm =
      kx_norm ** 2 / cavity.a ** 2 + ky_norm ** 2 / cavity.b ** 2; // Not fully normalized, just for relative strength
    if (k_c_sq_norm === 0 && (m !== 0 || n !== 0)) {
      /* This can happen if a or b is huge, effectively k_c approaches 0 for fixed m,n. Avoid division by zero. */
    }

    // Simplified H_z for TE
    Hz_amp =
      Math.cos(kx_norm * x) * Math.cos(ky_norm * y) * Math.sin(kz_norm * z);

    // Simplified E_x, E_y for TE
    Ex_amp =
      ky_norm *
      Math.cos(kx_norm * x) *
      Math.sin(ky_norm * y) *
      Math.sin(kz_norm * z);
    Ey_amp =
      -kx_norm *
      Math.sin(kx_norm * x) *
      Math.cos(ky_norm * y) *
      Math.sin(kz_norm * z);
    Ez_amp = 0;

    // Simplified H_x, H_y for TE
    Hx_amp =
      -kx_norm *
      kz_norm *
      Math.sin(kx_norm * x) *
      Math.cos(ky_norm * y) *
      Math.cos(kz_norm * z);
    Hy_amp =
      -ky_norm *
      kz_norm *
      Math.cos(kx_norm * x) *
      Math.sin(ky_norm * y) *
      Math.cos(kz_norm * z);
  } else {
    // TM
    // For TM modes, Hz = 0. E components are primary.
    // Example: TM110 (m=1, n=1, p=0)
    // E_z ~ sin(kx*x) * sin(ky*y)
    // Other components depend on p. If p=0, Ex, Ey (longitudinal) might be zero.
    Ez_amp =
      Math.sin(kx_norm * x) * Math.sin(ky_norm * y) * Math.cos(kz_norm * z);

    // Simplified E_x, E_y for TM
    Ex_amp =
      -kx_norm *
      kz_norm *
      Math.cos(kx_norm * x) *
      Math.sin(ky_norm * y) *
      Math.sin(kz_norm * z);
    Ey_amp =
      -ky_norm *
      kz_norm *
      Math.sin(kx_norm * x) *
      Math.cos(ky_norm * y) *
      Math.sin(kz_norm * z);

    // Simplified H_x, H_y for TM
    Hx_amp =
      ky_norm *
      Math.sin(kx_norm * x) *
      Math.cos(ky_norm * y) *
      Math.cos(kz_norm * z);
    Hy_amp =
      -kx_norm *
      Math.cos(kx_norm * x) *
      Math.sin(ky_norm * y) *
      Math.cos(kz_norm * z);
    Hz_amp = 0;
  }

  let magnitudeSq = 0;
  if (fieldType === "E") {
    magnitudeSq = Ex_amp ** 2 + Ey_amp ** 2 + Ez_amp ** 2;
  } else {
    // H
    magnitudeSq = Hx_amp ** 2 + Hy_amp ** 2 + Hz_amp ** 2;
  }

  return Math.sqrt(magnitudeSq) * timeFactor;
};

// Main Component
const MicrowaveCavityVisualizer: React.FC = () => {
  const [cavityDimensions, setCavityDimensions] = useState<CavityDimensions>({
    a: 10,
    b: 5,
    d: 15,
  });
  const [mode, setMode] = useState<ModeSelection>({
    type: "TE",
    m: 1,
    n: 0,
    p: 1,
  });
  const [currentFrequency, setCurrentFrequency] = useState<number>(1); // GHz
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(true);
  const [animationTime, setAnimationTime] = useState<number>(0);
  const [visualizationPlane, setVisualizationPlane] =
    useState<VisualizationPlane>({ plane: "XY", slice: 0.5 });
  const [fieldType, setFieldType] = useState<FieldType>("E");

  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);

  const resonantFrequency = useMemo(() => {
    return getResonantFrequency(cavityDimensions, mode);
  }, [cavityDimensions, mode]);

  // Update currentFrequency when mode or dimensions change to reflect new resonance
  useEffect(() => {
    const newResonantFreq = getResonantFrequency(cavityDimensions, mode);
    if (newResonantFreq > 0) {
      setCurrentFrequency(newResonantFreq);
    }
  }, [cavityDimensions, mode]);

  // Animation loop
  useEffect(() => {
    if (!animationEnabled) return;
    let frameId: number;
    const animate = () => {
      setAnimationTime((prevTime) => prevTime + 0.02); // Adjust speed of animation
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [animationEnabled]);

  // Generate field data for heatmap
  const fieldGrid = useMemo(() => {
    const grid: number[][] = Array(GRID_RESOLUTION)
      .fill(0)
      .map(() => Array(GRID_RESOLUTION).fill(0));
    const timeFactor = animationEnabled
      ? Math.cos(
          animationTime *
            (resonantFrequency > 0
              ? resonantFrequency * 1e9 * 2 * Math.PI * 1e-10
              : 1)
        )
      : 1; // Scaled time for visual effect

    for (let i = 0; i < GRID_RESOLUTION; i++) {
      for (let j = 0; j < GRID_RESOLUTION; j++) {
        let x_norm: number, y_norm: number, z_norm: number;
        // Map (i,j) to (x,y,z) normalized coordinates based on plane
        // (0,0) is typically bottom-left or top-left in canvas
        // Field equations assume (0,0,0) at one corner of cavity
        const u_norm = i / (GRID_RESOLUTION - 1); // First axis of the plane
        const v_norm = j / (GRID_RESOLUTION - 1); // Second axis of the plane

        if (visualizationPlane.plane === "XY") {
          // View along Z
          x_norm = u_norm;
          y_norm = v_norm;
          z_norm = visualizationPlane.slice;
        } else if (visualizationPlane.plane === "XZ") {
          // View along Y
          x_norm = u_norm;
          z_norm = v_norm;
          y_norm = visualizationPlane.slice;
        } else {
          // YZ plane, view along X
          y_norm = u_norm;
          z_norm = v_norm;
          x_norm = visualizationPlane.slice;
        }
        grid[j][i] = calculateFieldMagnitude(
          x_norm,
          y_norm,
          z_norm,
          cavityDimensions,
          mode,
          fieldType,
          timeFactor
        );
      }
    }
    return grid;
  }, [
    cavityDimensions,
    mode,
    fieldType,
    visualizationPlane,
    animationTime,
    animationEnabled,
    resonantFrequency,
  ]);

  // Draw Heatmap
  useEffect(() => {
    const canvas = heatmapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, HEATMAP_CANVAS_SIZE, HEATMAP_CANVAS_SIZE);

    const cellWidth = HEATMAP_CANVAS_SIZE / GRID_RESOLUTION;
    const cellHeight = HEATMAP_CANVAS_SIZE / GRID_RESOLUTION;

    let maxVal = 0;
    for (let r = 0; r < GRID_RESOLUTION; r++) {
      for (let c = 0; c < GRID_RESOLUTION; c++) {
        if (Math.abs(fieldGrid[r][c]) > maxVal) {
          maxVal = Math.abs(fieldGrid[r][c]);
        }
      }
    }
    if (maxVal === 0) maxVal = 1; // Avoid division by zero if field is all zeros

    for (let r = 0; r < GRID_RESOLUTION; r++) {
      // row, typically y in field data
      for (let c = 0; c < GRID_RESOLUTION; c++) {
        // col, typically x in field data
        const value = fieldGrid[r][c];
        const intensity = Math.abs(value) / maxVal; // Normalize to 0-1

        // Simple grayscale to teal/coral based on field type
        const baseHue = fieldType === "E" ? 170 : 0; // Teal for E, Red/Coral for H
        const lightness = 10 + intensity * 60; // from 10% (dark) to 70% (bright)
        ctx.fillStyle = `hsl(${baseHue}, 70%, ${lightness}%)`;

        // Canvas Y is inverted compared to typical math coords, so r is fine.
        ctx.fillRect(c * cellWidth, r * cellHeight, cellWidth, cellHeight);
      }
    }
  }, [fieldGrid, fieldType]);

  // Calculate resonant peaks for the chart
  const resonantPeaks = useMemo(() => {
    const peaks: ResonantPeak[] = [];
    const max_m = 3,
      max_n = 3,
      max_p = 3;
    const existingFreqs = new Set<string>();

    for (const type of ["TE", "TM"] as ("TE" | "TM")[]) {
      for (let m_idx = 0; m_idx <= max_m; m_idx++) {
        for (let n_idx = 0; n_idx <= max_n; n_idx++) {
          for (let p_idx = 0; p_idx <= max_p; p_idx++) {
            const currentTestMode: ModeSelection = {
              type,
              m: m_idx,
              n: n_idx,
              p: p_idx,
            };

            // Validate mode indices for resonance calculation
            if (type === "TE") {
              if ((m_idx === 0 && n_idx === 0) || p_idx === 0) continue;
            } else {
              // TM
              if (m_idx === 0 || n_idx === 0) continue;
              // TMmn0 is allowed (p_idx can be 0)
            }

            const freq = getResonantFrequency(
              cavityDimensions,
              currentTestMode
            );
            if (freq > 0 && freq < 50) {
              // Limit to 50 GHz and valid modes
              const freqKey = freq.toFixed(2);
              if (!existingFreqs.has(freqKey)) {
                peaks.push({ freq, mode: currentTestMode, strength: 1 });
                existingFreqs.add(freqKey);
              }
            }
          }
        }
      }
    }
    return peaks.sort((a, b) => a.freq - b.freq);
  }, [cavityDimensions]);

  // Draw Frequency Response Chart
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const padding = 30;
    const plotWidth = CHART_CANVAS_WIDTH - 2 * padding;
    const plotHeight = CHART_CANVAS_HEIGHT - 2 * padding;

    ctx.fillStyle = COLORS.componentBg;
    ctx.fillRect(0, 0, CHART_CANVAS_WIDTH, CHART_CANVAS_HEIGHT);

    // Determine frequency range
    const maxFreqVisible =
      resonantPeaks.length > 0
        ? Math.max(
            ...resonantPeaks.map((p) => p.freq),
            currentFrequency,
            resonantFrequency
          ) * 1.1
        : 20;
    const minFreqVisible = 0;

    // Draw axes
    ctx.strokeStyle = COLORS.border;
    ctx.fillStyle = COLORS.textSecondary;
    ctx.font = "10px Arial";

    // Y-axis (just a line, strength is conceptual)
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, CHART_CANVAS_HEIGHT - padding);
    ctx.stroke();
    ctx.fillText("Strength", padding - 25, padding - 10);

    // X-axis (Frequency)
    ctx.beginPath();
    ctx.moveTo(padding, CHART_CANVAS_HEIGHT - padding);
    ctx.lineTo(CHART_CANVAS_WIDTH - padding, CHART_CANVAS_HEIGHT - padding);
    ctx.stroke();
    ctx.fillText(
      "Freq (GHz)",
      CHART_CANVAS_WIDTH - padding - 10,
      CHART_CANVAS_HEIGHT - padding + 15
    );

    // X-axis labels
    const numTicks = 5;
    for (let i = 0; i <= numTicks; i++) {
      const freq =
        minFreqVisible + ((maxFreqVisible - minFreqVisible) * i) / numTicks;
      const x = padding + (plotWidth * i) / numTicks;
      ctx.fillText(freq.toFixed(1), x - 10, CHART_CANVAS_HEIGHT - padding + 15);
    }

    // Plot resonant peaks
    resonantPeaks.forEach((peak) => {
      if (peak.freq >= minFreqVisible && peak.freq <= maxFreqVisible) {
        const x =
          padding +
          (plotWidth * (peak.freq - minFreqVisible)) /
            (maxFreqVisible - minFreqVisible);
        const isSelectedMode =
          peak.mode.type === mode.type &&
          peak.mode.m === mode.m &&
          peak.mode.n === mode.n &&
          peak.mode.p === mode.p;

        ctx.beginPath();
        ctx.moveTo(x, CHART_CANVAS_HEIGHT - padding);
        ctx.lineTo(
          x,
          CHART_CANVAS_HEIGHT - padding - plotHeight * 0.8 * peak.strength
        ); // peak height
        ctx.strokeStyle = isSelectedMode ? COLORS.secondary : COLORS.primary;
        ctx.lineWidth = isSelectedMode ? 3 : 1.5;
        ctx.stroke();
      }
    });
    ctx.lineWidth = 1;

    // Plot current frequency line
    if (
      currentFrequency >= minFreqVisible &&
      currentFrequency <= maxFreqVisible
    ) {
      const x =
        padding +
        (plotWidth * (currentFrequency - minFreqVisible)) /
          (maxFreqVisible - minFreqVisible);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, CHART_CANVAS_HEIGHT - padding);
      ctx.strokeStyle = COLORS.secondary;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = COLORS.secondary;
      ctx.fillText("F_op", x + 3, padding + 10);
    }
  }, [resonantPeaks, currentFrequency, mode, resonantFrequency]);

  const handleDimensionChange = (
    dim: keyof CavityDimensions,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setCavityDimensions((prev) => ({ ...prev, [dim]: numValue }));
    }
  };

  const handleModeChange = (
    param: keyof ModeSelection,
    value: string | number
  ) => {
    setMode((prev) => {
      const newMode = {
        ...prev,
        [param]: param === "type" ? value : parseInt(value as string, 10),
      };

      // Basic validation for mode indices
      if (newMode.type === "TE") {
        if (newMode.m === 0 && newMode.n === 0) newMode.m = 1; // Avoid TE00p
        if (newMode.p === 0) newMode.p = 1; // Avoid TEmn0
      } else {
        // TM
        if (newMode.m === 0) newMode.m = 1; // Avoid TM0np
        if (newMode.n === 0) newMode.n = 1; // Avoid TMm0p
        // TMmn0 is allowed (p can be 0)
      }
      return newMode;
    });
  };

  const getMinModeVal = useCallback(
    (idx: "m" | "n" | "p"): number => {
      if (mode.type === "TE") {
        if (idx === "p") return 1;
        if (idx === "m" && mode.n === 0) return 1; // If n=0, m must be >0
        if (idx === "n" && mode.m === 0) return 1; // If m=0, n must be >0
        return 0;
      } else {
        // TM
        if (idx === "p") return 0;
        return 1; // m and n must be >=1 for TM
      }
    },
    [mode.type, mode.m, mode.n]
  );

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>
          Microwave Cavity Resonance Visualizer
        </h1>
      </header>
      <main style={styles.mainContent}>
        <aside style={styles.sidebar}>
          <div style={styles.controlGroup}>
            <h2 style={styles.controlGroupTitle}>Cavity Dimensions (cm)</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              {(["a", "b", "d"] as const).map((dimKey) => (
                <div key={dimKey} style={{ flex: 1 }}>
                  <label htmlFor={dimKey} style={styles.label}>
                    {dimKey === "a"
                      ? "Width"
                      : dimKey === "b"
                      ? "Height"
                      : "Length"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="range"
                      id={dimKey}
                      style={{
                        width: "100%",
                        height: "6px",
                        background: COLORS.border,
                        borderRadius: "3px",
                        outline: "none",
                        appearance: "none",
                      }}
                      value={cavityDimensions[dimKey]}
                      onChange={(e) =>
                        handleDimensionChange(dimKey, e.target.value)
                      }
                      min="1"
                      max={dimKey === "b" ? "100" : "50"}
                      step="0.1"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: COLORS.componentBg,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.8em",
                        color: COLORS.text,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cavityDimensions[dimKey].toFixed(1)} cm
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.controlGroup}>
            <h2 style={styles.controlGroupTitle}>Mode Selection</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="modeType" style={styles.label}>
                  Type
                </label>
                <div
                  style={{
                    display: "flex",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  {(["TE", "TM"] as const).map((type) => (
                    <button
                      key={type}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background:
                          mode.type === type
                            ? `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`
                            : COLORS.background,
                        color: mode.type === type ? "white" : COLORS.text,
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.9em",
                      }}
                      onClick={() => handleModeChange("type", type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {(["m", "n", "p"] as const).map((idxKey) => (
                <div key={idxKey} style={{ flex: 1 }}>
                  <label htmlFor={idxKey} style={styles.label}>
                    Index {idxKey.toUpperCase()}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="range"
                      id={idxKey}
                      style={{
                        width: "100%",
                        height: "6px",
                        background: COLORS.border,
                        borderRadius: "3px",
                        outline: "none",
                        appearance: "none",
                      }}
                      value={mode[idxKey]}
                      onChange={(e) => handleModeChange(idxKey, e.target.value)}
                      min={getMinModeVal(idxKey)}
                      max="10"
                      step="1"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: COLORS.componentBg,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.8em",
                        color: COLORS.text,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {mode[idxKey]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={styles.note}>
              Resonant Frequency:{" "}
              <strong>
                {resonantFrequency > 0 ? resonantFrequency.toFixed(3) : "N/A"}{" "}
                GHz
              </strong>
            </p>
          </div>

          <div style={styles.controlGroup}>
            <h2 style={styles.controlGroupTitle}>Frequency Sweep</h2>
            <div style={{ position: "relative" }}>
              <label htmlFor="currentFrequency" style={styles.label}>
                Operating: <strong>{currentFrequency.toFixed(2)} GHz</strong>
              </label>
              <input
                type="range"
                id="currentFrequency"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  borderRadius: "3px",
                  outline: "none",
                  appearance: "none",
                }}
                value={currentFrequency}
                onChange={(e) =>
                  setCurrentFrequency(parseFloat(e.target.value))
                }
                min="0.1"
                max={(resonantFrequency > 0
                  ? resonantFrequency * 2
                  : 20
                ).toFixed(1)}
                step="0.01"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "5px",
                  fontSize: "0.8em",
                  color: COLORS.textSecondary,
                }}
              >
                <span>0.1 GHz</span>
                <span>
                  {(resonantFrequency > 0 ? resonantFrequency * 2 : 20).toFixed(
                    1
                  )}{" "}
                  GHz
                </span>
              </div>
            </div>
          </div>

          <div style={styles.controlGroup}>
            <h2 style={styles.controlGroupTitle}>Visualization Settings</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="fieldType" style={styles.label}>
                  Field Type
                </label>
                <select
                  id="fieldType"
                  style={styles.select}
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value as FieldType)}
                >
                  <option value="E">E-Field</option>
                  <option value="H">H-Field</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="plane" style={styles.label}>
                  View Plane
                </label>
                <select
                  id="plane"
                  style={styles.select}
                  value={visualizationPlane.plane}
                  onChange={(e) =>
                    setVisualizationPlane((p) => ({
                      ...p,
                      plane: e.target.value as VisualizationPlane["plane"],
                    }))
                  }
                >
                  <option value="XY">XY</option>
                  <option value="XZ">XZ</option>
                  <option value="YZ">YZ</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="slice" style={styles.label}>
                Slice Position: {(visualizationPlane.slice * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                id="slice"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  borderRadius: "3px",
                  outline: "none",
                  appearance: "none",
                }}
                value={visualizationPlane.slice}
                onChange={(e) =>
                  setVisualizationPlane((p) => ({
                    ...p,
                    slice: parseFloat(e.target.value),
                  }))
                }
                min="0"
                max="1"
                step="0.01"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="animationEnabled"
                checked={animationEnabled}
                onChange={(e) => setAnimationEnabled(e.target.checked)}
                style={{
                  marginRight: "8px",
                  accentColor: COLORS.primary,
                }}
              />
              <label
                htmlFor="animationEnabled"
                style={{ ...styles.label, marginBottom: 0 }}
              >
                Enable Animation
              </label>
            </div>
          </div>

          <div style={styles.controlGroup}>
            <h2 style={styles.controlGroupTitle}>Frequency Response</h2>
            <canvas
              ref={chartCanvasRef}
              width={CHART_CANVAS_WIDTH}
              height={CHART_CANVAS_HEIGHT}
              style={styles.canvas}
            ></canvas>
          </div>
        </aside>

        <section style={styles.visualizationArea}>
          <canvas
            ref={heatmapCanvasRef}
            width={HEATMAP_CANVAS_SIZE}
            height={HEATMAP_CANVAS_SIZE}
            style={styles.canvas}
          ></canvas>
          <div
            style={{
              textAlign: "center",
              color: COLORS.textSecondary,
              marginTop: "10px",
            }}
          >
            Visualizing {fieldType}-Field on {visualizationPlane.plane} plane at{" "}
            {visualizationPlane.plane[0].toLowerCase()} ={" "}
            {(
              visualizationPlane.slice *
              (visualizationPlane.plane === "YZ"
                ? cavityDimensions.a
                : visualizationPlane.plane === "XZ"
                ? cavityDimensions.b
                : cavityDimensions.d)
            ).toFixed(1)}{" "}
            cm
          </div>
        </section>
      </main>
    </div>
  );
};

export default MicrowaveCavityVisualizer;

// To use this component in a React project (e.g. created with Create React App):
// 1. Save this entire code as `MicrowaveCavityVisualizer.tsx` in your `src` directory.
// 2. In your `App.tsx` or another component file, import it:
//    `import MicrowaveCavityVisualizer from './MicrowaveCavityVisualizer';`
// 3. Then render it:
//    `<MicrowaveCavityVisualizer />`
