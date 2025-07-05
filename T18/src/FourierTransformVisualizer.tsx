import React, { useState, useEffect, useCallback, useRef } from "react";
import Plot from "react-plotly.js";

// Complex number class
class Complex {
  constructor(public re: number, public im: number = 0) {}

  add(other: Complex): Complex {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  sub(other: Complex): Complex {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  mul(other: Complex): Complex {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  }

  magnitude(): number {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }
}

// FFT function
function fft(x: Complex[]): Complex[] {
  const N = x.length;

  if (N <= 1) return x;

  const even: Complex[] = [];
  const odd: Complex[] = [];
  for (let i = 0; i < N / 2; i++) {
    even.push(x[i * 2]);
    odd.push(x[i * 2 + 1]);
  }

  const Y_even = fft(even);
  const Y_odd = fft(odd);

  const Y = new Array<Complex>(N);
  for (let k = 0; k < N / 2; k++) {
    const t = new Complex(
      Math.cos((-2 * Math.PI * k) / N),
      Math.sin((-2 * Math.PI * k) / N)
    ).mul(Y_odd[k]);
    Y[k] = Y_even[k].add(t);
    Y[k + N / 2] = Y_even[k].sub(t);
  }
  return Y;
}

// Adapted FFT calculation for signal processing
function calculateFFTAdapted(
  signal: number[],
  sampleRate: number
): { frequencies: number[]; magnitudes: number[] } {
  const N_orig = signal.length;
  let N = 1;
  while (N < N_orig) N <<= 1;

  const paddedSignal = [...signal];
  while (paddedSignal.length < N) paddedSignal.push(0);

  const complexSignal: Complex[] = paddedSignal.map((s) => new Complex(s, 0));
  const result = fft(complexSignal);

  const frequencies: number[] = [];
  const magnitudes: number[] = [];

  for (let k = 0; k < N / 2; k++) {
    frequencies.push((k * sampleRate) / N);
    magnitudes.push((result[k].magnitude() * 2) / N);
  }

  return { frequencies, magnitudes };
}

// Signal Parameters Interface
type WaveformType = "sine" | "square" | "sawtooth";

interface ComponentParameters {
  id: number;
  amplitude: number;
  frequency: number;
  phase: number;
  waveformType: WaveformType;
}

interface GlobalSignalParameters {
  sampleRate: number;
  duration: number;
  noise: number;
}

type Theme = "dark" | "light";

// Main React Component
const FourierTransformVisualizer: React.FC = () => {
  const [globalSignalParams, setGlobalSignalParams] =
    useState<GlobalSignalParameters>({
      sampleRate: 256,
      duration: 1.0,
      noise: 0.1,
    });

  const [components, setComponents] = useState<ComponentParameters[]>([
    { id: 1, amplitude: 1.0, frequency: 5.0, phase: 0, waveformType: "sine" },
  ]);

  const [rawSignal, setRawSignal] = useState<number[]>([]);
  const [fftData, setFftData] = useState<{
    frequencies: number[];
    magnitudes: number[];
  }>({
    frequencies: [],
    magnitudes: [],
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>("dark");
  const [openSections, setOpenSections] = useState({
    global: true,
    presets: true,
    component: true,
  });

  const toggleSection = (sectionName: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [currentWaveformName, setCurrentWaveformName] =
    useState<WaveformType>("sine");

  const themeColors = {
    dark: {
      "--bg-color": "#0A0A0F",
      "--primary-bg": "#151520",
      "--secondary-bg": "#1E1E2E",
      "--sidebar-toggle-bg": "#1A1A25",
      "--titlebar-bg": "#151520",
      "--text-color": "#F0F0F6",
      "--accent-color": "#00D4FF",
      "--primary-accent-color": "#6C5CE7",
      "--border-color": "#2E2E40",
      "--shadow-color": "rgba(0, 0, 0, 0.7)",
      "--graph-bg-color": "#151520",
      "--graph-axis-color": "rgba(200, 200, 220, 0.8)",
      "--graph-grid-color": "rgba(100, 100, 130, 0.3)",
      "--graph-text-color": "#F0F0F6",
      "--slider-track-bg": "#2E2E40",
      "--slider-thumb-bg": "#6C5CE7",
      "--heading-color": "#FFFFFF",
      "--explanation-color": "#A0A0B0",
    },
    light: {
      "--bg-color": "#FAFBFF",
      "--primary-bg": "#FFFFFF",
      "--secondary-bg": "#F4F6FF",
      "--sidebar-toggle-bg": "#E8ECFF",
      "--titlebar-bg": "#FFFFFF",
      "--text-color": "#1A1A2E",
      "--accent-color": "#FF6B6B",
      "--primary-accent-color": "#4ECDC4",
      "--border-color": "#E1E5F2",
      "--shadow-color": "rgba(26, 26, 46, 0.12)",
      "--graph-bg-color": "#FFFFFF",
      "--graph-axis-color": "#4A4A5A",
      "--graph-grid-color": "rgba(74, 74, 90, 0.15)",
      "--graph-text-color": "#2A2A3A",
      "--slider-track-bg": "#E1E5F2",
      "--slider-thumb-bg": "#4ECDC4",
      "--heading-color": "#1A1A2E",
      "--explanation-color": "#5A5A6A",
    },
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themeColors[theme];
    for (const [key, value] of Object.entries(currentTheme)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  const generateWaveform = useCallback(
    (
      amplitude: number,
      frequency: number,
      phase: number,
      sampleRate: number,
      duration: number,
      type: WaveformType
    ): number[] => {
      const numSamples = Math.floor(sampleRate * duration);
      const data: number[] = new Array(numSamples);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let value: number;

        switch (type) {
          case "sine":
            value = amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
            break;
          case "square":
            value =
              amplitude *
              Math.sign(Math.sin(2 * Math.PI * frequency * t + phase));
            break;
          case "sawtooth":
            const normalizedTime = (t * frequency + phase / (2 * Math.PI)) % 1;
            value = amplitude * (2 * normalizedTime - 1);
            break;
          default:
            value = 0;
        }
        data[i] = value;
      }
      return data;
    },
    []
  );

  const updateSignalAndFFT = useCallback(() => {
    const { sampleRate, duration, noise } = globalSignalParams;
    const numSamples = Math.floor(sampleRate * duration);
    const summedSignal = new Array(numSamples).fill(0);

    if (components.length > 0) {
      const mainComponent = components[0];
      const componentSignal = generateWaveform(
        mainComponent.amplitude,
        mainComponent.frequency,
        mainComponent.phase,
        sampleRate,
        duration,
        mainComponent.waveformType
      );
      for (let i = 0; i < numSamples; i++) {
        if (i < componentSignal.length) {
          summedSignal[i] += componentSignal[i];
        }
      }
    }

    const signalWithNoise = summedSignal.map(
      (value) => value + (Math.random() - 0.5) * noise * 2
    );

    setRawSignal(signalWithNoise);
    const newFftData = calculateFFTAdapted(signalWithNoise, sampleRate);
    setFftData(newFftData);
  }, [globalSignalParams, components, generateWaveform]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(updateSignalAndFFT, 100);

    updateSignalAndFFT();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateSignalAndFFT]);

  const handleGlobalParamChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setGlobalSignalParams((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    },
    []
  );

  const handleComponentParamChange = useCallback(
    (id: number, name: "amplitude" | "frequency" | "phase", value: string) => {
      setComponents((prevComponents) =>
        prevComponents.map((comp) =>
          comp.id === id ? { ...comp, [name]: parseFloat(value) } : comp
        )
      );
    },
    []
  );

  const handlePresetWaveform = useCallback((type: WaveformType) => {
    setComponents((prevComponents) => {
      const targetComponent = prevComponents[0] || {
        id: 1,
        amplitude: 0,
        frequency: 0,
        phase: 0,
        waveformType: "sine",
      };

      const newComponent = { ...targetComponent, waveformType: type };
      setCurrentWaveformName(type);

      if (type === "sine") {
        newComponent.amplitude = 1.0;
        newComponent.frequency = 5.0;
        newComponent.phase = 0;
      } else if (type === "square") {
        newComponent.amplitude = 0.8;
        newComponent.frequency = 7.0;
        newComponent.phase = 0;
      } else if (type === "sawtooth") {
        newComponent.amplitude = 0.9;
        newComponent.frequency = 6.0;
        newComponent.phase = 0;
      }
      return [newComponent];
    });
    setGlobalSignalParams((prev) => ({ ...prev, noise: 0.1 }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const scrollbarStyles = `
    /* For Webkit-based browsers (Chrome, Safari, Edge, Opera) */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: var(--secondary-bg);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--primary-accent-color);
      border-radius: 10px;
      border: 2px solid var(--secondary-bg);
      transition: background-color 0.2s ease-in-out;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--accent-color);
    }

    /* For Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: var(--primary-accent-color) var(--secondary-bg);
    }
  `;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: '"Carlito", sans-serif',
        background: "var(--bg-color)",
        color: "var(--text-color)",
        overflow: "hidden",
        transition: "background 0.5s ease",
      }}
    >
      <style>{scrollbarStyles}</style>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      </style>
      <header className="flex flex-shrink-0 items-center justify-between border-b z-10 bg-[var(--titlebar-bg)] px-[30px] py-[15px] border-[var(--border-color)] shadow-[0_2px_8px_var(--shadow-color)] transition-all duration-300">
        <h1
          style={{
            margin: 0,
            fontSize: "1.8em",
            fontWeight: 700,
            color: "var(--text-color)",
            letterSpacing: "0.05em",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Fourier Series Transform
        </h1>
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent-color)",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "background-color 0.2s ease, transform 0.1s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "scale(1)";
          }}
          title={
            theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"
          }
        >
          {theme === "dark" ? (
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 3V0H9V3H7Z" fill="currentColor" />
              <path d="M9 13V16H7V13H9Z" fill="currentColor" />
              <path
                d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                fill="currentColor"
              />
              <path d="M0 9H3V7H0V9Z" fill="currentColor" />
              <path d="M16 7H13V9H16V7Z" fill="currentColor" />
              <path
                d="M3.75735 5.17157L1.63603 3.05025L3.05025 1.63603L5.17157 3.75735L3.75735 5.17157Z"
                fill="currentColor"
              />
              <path
                d="M12.2426 10.8284L14.364 12.9497L12.9497 14.364L10.8284 12.2426L12.2426 10.8284Z"
                fill="currentColor"
              />
              <path
                d="M3.05025 14.364L5.17157 12.2426L3.75735 10.8284L1.63603 12.9498L3.05025 14.364Z"
                fill="currentColor"
              />
              <path
                d="M12.9497 1.63604L10.8284 3.75736L12.2426 5.17158L14.364 3.05026L12.9497 1.63604Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </header>

      <main
        style={{
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: isSidebarOpen ? "300px" : "0",
            background: "var(--primary-bg)",
            padding: isSidebarOpen ? "15px" : "0",
            boxShadow: isSidebarOpen
              ? "4px 0 10px var(--shadow-color)"
              : "none",
            transition:
              "width 0.3s ease-in-out, padding 0.3s ease-in-out, background 0.3s ease, box-shadow 0.3s ease",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            borderRadius: isSidebarOpen ? "0 8px 8px 0" : "0",
          }}
        >
          {isSidebarOpen && (
            <div
              style={{ flexGrow: 1, overflowY: "auto", paddingRight: "10px" }}
            >
              <h2
                style={{
                  color: "var(--heading-color)",
                  marginBottom: "20px",
                  fontSize: "1.5em",
                  fontWeight: 600,
                }}
              >
                Controls
              </h2>

              <div style={{ marginBottom: "15px" }}>
                <h3
                  onClick={() => toggleSection("global")}
                  style={{
                    color: "var(--heading-color)",
                    marginBottom: "15px",
                    fontSize: "1em",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Global Signal Parameters
                  <span
                    style={{
                      transition: "transform 0.3s ease",
                      transform: openSections.global
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </span>
                </h3>
                <div
                  style={{
                    maxHeight: openSections.global ? "500px" : "0",
                    opacity: openSections.global ? 1 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 0.4s ease-in-out, opacity 0.3s ease",
                  }}
                >
                  {[
                    {
                      label: "Sample Rate (Hz)",
                      name: "sampleRate",
                      min: 64,
                      max: 1024,
                      step: 64,
                      display: globalSignalParams.sampleRate,
                    },
                    {
                      label: "Duration (s)",
                      name: "duration",
                      min: 0.1,
                      max: 5.0,
                      step: 0.1,
                      display: globalSignalParams.duration.toFixed(1),
                    },
                    {
                      label: "Noise Level",
                      name: "noise",
                      min: 0,
                      max: 1.0,
                      step: 0.05,
                      display: globalSignalParams.noise.toFixed(2),
                    },
                  ].map((param) => (
                    <div key={param.name} style={{ marginBottom: "20px" }}>
                      <label
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                          fontSize: "0.8em",
                        }}
                      >
                        <span>{param.label}:</span>
                        <span
                          style={{
                            color: "var(--accent-color)",
                            fontWeight: "bold",
                          }}
                        >
                          {param.display}
                        </span>
                      </label>
                      <input
                        type="range"
                        name={param.name}
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        value={(globalSignalParams as any)[param.name]}
                        onChange={handleGlobalParamChange}
                        style={
                          {
                            width: "100%",
                            height: "8px",
                            borderRadius: "4px",
                            background: "var(--slider-track-bg)",
                            outline: "none",
                            WebkitAppearance: "none",
                            appearance: "none",
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                            "--webkit-slider-runnable-track":
                              "var(--slider-track-bg)",
                            "--moz-range-track": "var(--slider-track-bg)",
                            "--webkit-slider-thumb": "var(--slider-thumb-bg)",
                            "--moz-range-thumb": "var(--slider-thumb-bg)",
                          } as React.CSSProperties & { [key: string]: string }
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <h3
                  onClick={() => toggleSection("presets")}
                  style={{
                    color: "var(--heading-color)",
                    marginBottom: "15px",
                    fontSize: "1em",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Base Waveform Presets
                  <span
                    style={{
                      transition: "transform 0.3s ease",
                      transform: openSections.presets
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </span>
                </h3>
                <div
                  style={{
                    maxHeight: openSections.presets ? "500px" : "0",
                    opacity: openSections.presets ? 1 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 0.4s ease-in-out, opacity 0.3s ease",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {["sine", "square", "sawtooth"].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          handlePresetWaveform(type as WaveformType)
                        }
                        style={{
                          padding: "10px 15px",
                          borderRadius: "6px",
                          backgroundColor: "var(--primary-accent-color)",
                          color: "white",
                          fontWeight: 500,
                          fontSize: "0.8em",
                          cursor: "pointer",
                          transition:
                            "background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--accent-color)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--primary-accent-color)";
                        }}
                      >
                        {capitalize(type)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <h3
                  onClick={() => toggleSection("component")}
                  style={{
                    color: "var(--heading-color)",
                    marginBottom: "15px",
                    fontSize: "1em",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Signal Component
                  <span
                    style={{
                      transition: "transform 0.3s ease",
                      transform: openSections.component
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </span>
                </h3>
                <div
                  style={{
                    maxHeight: openSections.component ? "500px" : "0",
                    opacity: openSections.component ? 1 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 0.4s ease-in-out, opacity 0.3s ease",
                  }}
                >
                  {components.map((comp) => (
                    <div
                      key={comp.id}
                      style={{
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "15px",
                        background: "var(--secondary-bg)",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        transition:
                          "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "0.9em",
                            color: "var(--text-color)",
                          }}
                        >
                          {capitalize(currentWaveformName)} Wave
                        </h4>
                      </div>

                      {[
                        {
                          label: "Amplitude",
                          name: "amplitude",
                          min: 0.01,
                          max: 2.0,
                          step: 0.01,
                          display: comp.amplitude.toFixed(2),
                        },
                        {
                          label: "Frequency (Hz)",
                          name: "frequency",
                          min: 0.1,
                          max: 50,
                          step: 0.1,
                          display: comp.frequency.toFixed(1),
                        },
                        {
                          label: "Phase (rad)",
                          name: "phase",
                          min: 0,
                          max: 2 * Math.PI,
                          step: 0.1,
                          display: comp.phase.toFixed(2),
                        },
                      ].map((param) => (
                        <div key={param.name} style={{ marginBottom: "15px" }}>
                          <label
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "5px",
                              fontSize: "0.8em",
                            }}
                          >
                            <span>{param.label}:</span>
                            <span
                              style={{
                                color: "var(--accent-color)",
                                fontWeight: "bold",
                              }}
                            >
                              {param.display}
                            </span>
                          </label>
                          <input
                            type="range"
                            name={param.name}
                            min={param.min}
                            max={param.max}
                            step={param.step}
                            value={(comp as any)[param.name]}
                            onChange={(e) =>
                              handleComponentParamChange(
                                comp.id,
                                param.name as
                                  | "amplitude"
                                  | "frequency"
                                  | "phase",
                                e.target.value
                              )
                            }
                            style={
                              {
                                width: "100%",
                                height: "8px",
                                borderRadius: "4px",
                                background: "var(--slider-track-bg)",
                                outline: "none",
                                WebkitAppearance: "none",
                                appearance: "none",
                                cursor: "pointer",
                                "--webkit-slider-runnable-track":
                                  "var(--slider-track-bg)",
                                "--moz-range-track": "var(--slider-track-bg)",
                                "--webkit-slider-thumb":
                                  "var(--slider-thumb-bg)",
                                "--moz-range-thumb": "var(--slider-thumb-bg)",
                              } as React.CSSProperties & {
                                [key: string]: string;
                              }
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "var(--sidebar-toggle-bg)",
            padding: "20px 0",
            boxShadow: "2px 0 5px var(--shadow-color)",
            flexShrink: 0,
            width: "50px",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            minHeight: "100%",
            position: "relative",
          }}
        >
          <button
            onClick={toggleSidebar}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-color)",
              fontSize: "24px",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            title={isSidebarOpen ? "Collapse Controls" : "Expand Controls"}
          >
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            )}
          </button>
        </div>

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflowY: "auto",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              flex: "1",
              minHeight: "calc(50% - 10px)",
              background: "var(--primary-bg)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 16px var(--shadow-color)",
              border: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              transition:
                "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div
              style={{
                padding: "15px 20px 10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.4em",
                  color: "var(--heading-color)",
                  fontWeight: 600,
                }}
              >
                Time Domain Signal
              </h3>
            </div>
            <p
              style={{
                margin: "5px 0 0 20px",
                fontSize: "0.9em",
                color: "var(--explanation-color)",
              }}
            >
              This chart shows the signal's amplitude as it changes over time.
            </p>
            <Plot
              data={[
                {
                  x: Array.from(
                    { length: rawSignal.length },
                    (_, i) => i / globalSignalParams.sampleRate
                  ),
                  y: rawSignal,
                  type: "scatter",
                  mode: "lines",
                  name: "Signal",
                  line: {
                    color: "var(--accent-color)",
                    width: 2,
                  },
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 60, r: 30, b: 50, t: 20, pad: 4 },
                plot_bgcolor: themeColors[theme]["--graph-bg-color"],
                paper_bgcolor: "transparent",
                font: {
                  color: themeColors[theme]["--graph-text-color"],
                  family: '"Roboto Mono", monospace',
                },
                xaxis: {
                  title: "Time (s)",
                  gridcolor: themeColors[theme]["--graph-grid-color"],
                  linecolor: themeColors[theme]["--graph-axis-color"],
                  autorange: true,
                },
                yaxis: {
                  title: "Amplitude",
                  gridcolor: themeColors[theme]["--graph-grid-color"],
                  linecolor: themeColors[theme]["--graph-axis-color"],
                  autorange: true,
                },
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
              config={{ staticPlot: true, displayModeBar: false }}
            />
          </div>

          <div
            style={{
              flex: "1",
              minHeight: "calc(50% - 10px)",
              background: "var(--primary-bg)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 16px var(--shadow-color)",
              border: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              transition:
                "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div
              style={{
                padding: "15px 20px 10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.4em",
                  color: "var(--heading-color)",
                  fontWeight: 600,
                }}
              >
                Frequency Domain (FFT)
              </h3>
            </div>
            <p
              style={{
                margin: "5px 0 0 20px",
                fontSize: "0.9em",
                color: "var(--explanation-color)",
              }}
            >
              This chart shows the signal broken down into its constituent
              frequencies.
            </p>
            <Plot
              data={[
                {
                  x: fftData.frequencies,
                  y: fftData.magnitudes,
                  type: "bar",
                  name: "Magnitude",
                  marker: {
                    color: "var(--primary-accent-color)",
                  },
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 60, r: 30, b: 50, t: 20, pad: 4 },
                plot_bgcolor: themeColors[theme]["--graph-bg-color"],
                paper_bgcolor: "transparent",
                font: {
                  color: themeColors[theme]["--graph-text-color"],
                  family: '"Roboto Mono", monospace',
                },
                xaxis: {
                  title: "Frequency (Hz)",
                  gridcolor: themeColors[theme]["--graph-grid-color"],
                  linecolor: themeColors[theme]["--graph-axis-color"],
                },
                yaxis: {
                  title: "Magnitude",
                  gridcolor: themeColors[theme]["--graph-grid-color"],
                  linecolor: themeColors[theme]["--graph-axis-color"],
                },
                bargap: 0.05,
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
              config={{ staticPlot: true, displayModeBar: false }}
            />
          </div>
        </div>
      </main>

      <footer className="flex-shrink-0 border-t p-[15px] text-center text-[0.85em] bg-[var(--titlebar-bg)] border-[var(--border-color)] text-[var(--explanation-color)] shadow-[0_-2px_8px_var(--shadow-color)]">
        <p style={{ margin: 0 }}>
          Created with React & Plotly.js | An interactive tool for exploring
          Fourier analysis.
        </p>
      </footer>
    </div>
  );
};

export default FourierTransformVisualizer;
