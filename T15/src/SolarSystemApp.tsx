import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaBroom,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaInfo,
  FaEye,
  FaEyeSlash,
  FaCog,
  FaGamepad,
  FaRocket,
  FaMoon,
  FaSun,
  FaCamera,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaGlobe,
  FaQuestion,
} from "react-icons/fa";
import {
  MdSpeed,
  MdVisibility,
  MdSettings,
  MdAdd,
  MdDelete,
  MdEdit,
  MdSave,
  MdCancel,
} from "react-icons/md";
import { GiTrail } from "react-icons/gi";
import { IoPlanet } from "react-icons/io5";

// Enhanced Color Palette - Dark Space Theme
const SPACE_COLORS = {
  // Deep space backgrounds
  deepSpace: "#0a0a0f",
  spaceNavy: "#1a1a2e",
  spacePurple: "#16213e",

  // UI Colors
  sidebarBg: "rgba(26, 26, 46, 0.95)",
  sidebarBorder: "#3a3a5c",
  cardBg: "rgba(35, 35, 65, 0.9)",
  cardBorder: "#4a4a7c",

  // Text colors
  textPrimary: "#ffffff",
  textSecondary: "#b8b8d6",
  textMuted: "#8a8ab5",

  // Accent colors
  accent: "#00d4ff",
  accentHover: "#00b8e6",
  success: "#00ff88",
  warning: "#ffaa00",
  danger: "#ff4466",

  // Button colors
  buttonPrimary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  buttonSecondary: "linear-gradient(135deg, #434343 0%, #000000 100%)",
  buttonDanger: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",

  // Trail and orbit colors
  trailDefault: "#ffffff",
  orbitalRing: "rgba(255, 255, 255, 0.6)",

  // Planet specific colors (brighter for visibility)
  sun: "#FFC649",
  mercury: "#D4A574",
  venus: "#FFE066",
  earth: "#4FC3F7",
  mars: "#FF7043",
  jupiter: "#FFB74D",
  saturn: "#F9A825",
  uranus: "#26C6DA",
  neptune: "#42A5F5",
  moon: "#E0E0E0",
};

// InfoButton Component with better styling
interface InfoButtonProps {
  onClick: () => void;
  size?: "small" | "large";
}

const InfoButton: React.FC<InfoButtonProps> = ({ onClick, size = "small" }) => {
  const iconSize = size === "small" ? 14 : 18;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      style={{
        background: SPACE_COLORS.buttonPrimary,
        border: `1px solid ${SPACE_COLORS.cardBorder}`,
        borderRadius: "50%",
        width: size === "small" ? "28px" : "36px",
        height: size === "small" ? "28px" : "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: SPACE_COLORS.textPrimary,
        transition: "all 0.3s ease",
        marginLeft: "8px",
        padding: "0",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        zIndex: 1001,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
      }}
      title="Click for help"
    >
      <FaQuestion size={iconSize} />
    </button>
  );
};

// Types (same as before)
interface CelestialBody {
  id: string;
  name: string;
  type: "star" | "planet" | "moon";
  mass: number;
  radius: number;
  color: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  trailPoints: THREE.Vector3[];
  parentId?: string;
}

type CameraViewMode = "perspective" | "top-down";

interface ThreeJSResources {
  mesh: THREE.Mesh;
  trailLine: THREE.Line;
  velocityArrow: THREE.ArrowHelper;
  orbitalRing?: THREE.Line;
}

// Constants
const G = 1;
const TIME_STEP = 0.01;
const MAX_TRAIL_POINTS = 200;
const VELOCITY_ARROW_SCALE = 15;

// Material creation functions (same as before - keeping them for brevity)
const createStarMaterial = (color: string, radius: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d")!;

  const solarColors = {
    core: { r: 255, g: 255, b: 240 },
    surface: { r: 255, g: 220, b: 120 },
    granules: { r: 255, g: 200, b: 100 },
    hotSpots: { r: 255, g: 240, b: 160 },
    prominence: { r: 255, g: 140, b: 80 },
  };

  const imageData = context.createImageData(1024, 512);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % 1024;
    const y = Math.floor(i / 4 / 1024);

    const granule1 = Math.sin(x * 0.02) * Math.cos(y * 0.02);
    const granule2 = Math.sin(x * 0.035 + 50) * Math.cos(y * 0.035 + 50);
    const granule3 = Math.sin(x * 0.055 + 100) * Math.cos(y * 0.055 + 100);
    const turbulence = Math.sin(x * 0.008) * Math.cos(y * 0.012);

    const granulation = (granule1 + granule2 * 0.6 + granule3 * 0.4) / 2;
    const brightness =
      0.8 + Math.abs(granulation) * 0.3 + Math.abs(turbulence) * 0.1;

    const surfaceWeight = 0.7 + granulation * 0.3;
    const granuleWeight = 1 - surfaceWeight;

    data[i] = Math.min(
      255,
      (solarColors.surface.r * surfaceWeight +
        solarColors.granules.r * granuleWeight) *
        brightness
    );
    data[i + 1] = Math.min(
      255,
      (solarColors.surface.g * surfaceWeight +
        solarColors.granules.g * granuleWeight) *
        brightness
    );
    data[i + 2] = Math.min(
      255,
      (solarColors.surface.b * surfaceWeight +
        solarColors.granules.b * granuleWeight) *
        brightness
    );
    data[i + 3] = 255;
  }

  context.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(2.0, 2.0, 1.8),
    map: texture,
    transparent: false,
    depthTest: true,
    depthWrite: true,
    side: THREE.FrontSide,
  });
};

const createPlanetMaterial = (color: string, radius: number) => {
  const baseColor = new THREE.Color(color);
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d")!;

  // Simplified planet material for brevity
  context.fillStyle = color;
  context.fillRect(0, 0, 1024, 512);

  const texture = new THREE.CanvasTexture(canvas);
  const brightColor = baseColor.clone().multiplyScalar(2.2);

  return new THREE.MeshStandardMaterial({
    color: brightColor,
    map: texture,
    roughness: 0.8,
    metalness: 0.05,
    emissive: baseColor.clone().multiplyScalar(0.2),
    emissiveIntensity: 0.5,
  });
};

const createMoonMaterial = (color: string, radius: number) => {
  const baseColor = new THREE.Color(color);
  baseColor.multiplyScalar(1.8);

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d")!;

  context.fillStyle = baseColor.getHexString();
  context.fillRect(0, 0, 512, 256);

  const texture = new THREE.CanvasTexture(canvas);

  return new THREE.MeshStandardMaterial({
    color: baseColor,
    map: texture,
    roughness: 1.0,
    metalness: 0.0,
    emissive: baseColor.clone().multiplyScalar(0.1),
    emissiveIntensity: 0.2,
  });
};

const createOrbitalRing = (radius: number, color: string = "#ffffff") => {
  const points = [];
  const segments = 128;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.8,
    linewidth: 4,
  });

  return new THREE.Line(geometry, material);
};

// Enhanced Custom Slider Component
const CustomSlider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  icon?: React.ReactNode;
}> = ({ value, onChange, min, max, step, label, icon }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ margin: "20px 0" }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
          fontSize: "14px",
          color: SPACE_COLORS.textPrimary,
          fontWeight: "600",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {icon}
        {label}: <span style={{ color: SPACE_COLORS.accent }}>{value}</span>
      </label>
      <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            WebkitAppearance: "none",
            appearance: "none",
            width: "100%",
            height: "10px",
            borderRadius: "50px",
            background: `linear-gradient(to right, ${SPACE_COLORS.accent} 0%, ${SPACE_COLORS.accent} ${percentage}%, rgba(255, 255, 255, 0.2) ${percentage}%, rgba(255, 255, 255, 0.2) 100%)`,
            outline: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow:
              "inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.1)",
            border: `1px solid ${SPACE_COLORS.cardBorder}`,
          }}
        />
        <style>{`
                    input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: ${SPACE_COLORS.buttonPrimary};
                        cursor: pointer;
                        border: 2px solid ${SPACE_COLORS.textPrimary};
                        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.3);
                        transition: all 0.3s ease;
                    }
                    input[type="range"]::-webkit-slider-thumb:hover {
                        transform: scale(1.2);
                        box-shadow: 0 4px 16px rgba(0, 212, 255, 0.6);
                    }
                    input[type="range"]::-moz-range-thumb {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: ${SPACE_COLORS.buttonPrimary};
                        cursor: pointer;
                        border: 2px solid ${SPACE_COLORS.textPrimary};
                        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
                    }
                `}</style>
      </div>
    </div>
  );
};

const SolarSystemApp: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const perspectiveCameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const orthographicCameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const threeObjectsMapRef = useRef<Map<string, ThreeJSResources>>(new Map());
  const previewLineRef = useRef<THREE.Line | null>(null);

  // Enhanced state management
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showVelocityVectors, setShowVelocityVectors] = useState<boolean>(true);
  const [stableOrbits, setStableOrbits] = useState<boolean>(true);
  const [showFeatureInfo, setShowFeatureInfo] = useState<string | null>(null);
  const [showTrails, setShowTrails] = useState<boolean>(true);
  const [showColoredRings, setShowColoredRings] = useState<boolean>(true);

  // Enhanced default solar system with proper colors
  const [bodies, setBodies] = useState<CelestialBody[]>([
    {
      id: "sun",
      name: "Sun",
      type: "star",
      mass: 1000,
      radius: 15,
      color: SPACE_COLORS.sun,
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "mercury",
      name: "Mercury",
      type: "planet",
      mass: 0.33,
      radius: 3,
      color: SPACE_COLORS.mercury,
      position: new THREE.Vector3(50, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 50), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "venus",
      name: "Venus",
      type: "planet",
      mass: 4.87,
      radius: 5,
      color: SPACE_COLORS.venus,
      position: new THREE.Vector3(75, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 75), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "earth",
      name: "Earth",
      type: "planet",
      mass: 6,
      radius: 5,
      color: SPACE_COLORS.earth,
      position: new THREE.Vector3(100, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 100), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "mars",
      name: "Mars",
      type: "planet",
      mass: 0.64,
      radius: 4,
      color: SPACE_COLORS.mars,
      position: new THREE.Vector3(135, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 135), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "jupiter",
      name: "Jupiter",
      type: "planet",
      mass: 318,
      radius: 12,
      color: SPACE_COLORS.jupiter,
      position: new THREE.Vector3(200, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 200), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "saturn",
      name: "Saturn",
      type: "planet",
      mass: 95,
      radius: 10,
      color: SPACE_COLORS.saturn,
      position: new THREE.Vector3(280, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 280), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "uranus",
      name: "Uranus",
      type: "planet",
      mass: 14,
      radius: 7,
      color: SPACE_COLORS.uranus,
      position: new THREE.Vector3(380, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 380), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
    {
      id: "neptune",
      name: "Neptune",
      type: "planet",
      mass: 17,
      radius: 7,
      color: SPACE_COLORS.neptune,
      position: new THREE.Vector3(480, 0, 0),
      velocity: new THREE.Vector3(0, Math.sqrt(1000 / 480), 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    },
  ]);

  const [selectedBodyId, setSelectedBodyId] = useState<string | null>(null);
  const [cameraView, setCameraView] = useState<CameraViewMode>("perspective");
  const [trailLength, setTrailLength] = useState<number>(MAX_TRAIL_POINTS);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);

  const [isAddingBody, setIsAddingBody] = useState<boolean>(false);
  const [newBodyType, setNewBodyType] = useState<"planet" | "moon">("planet");
  const [newBodyParentId, setNewBodyParentId] = useState<string | undefined>(
    undefined
  );

  // Form state for adding new bodies
  const [newBodyForm, setNewBodyForm] = useState({
    name: "",
    mass: "10",
    radius: "5",
    color: SPACE_COLORS.earth,
    velX: "",
    velY: "",
    velZ: "0",
    posX: "",
    posY: "",
    posZ: "0",
  });

  const selectedBody = bodies.find((b) => b.id === selectedBodyId);

  // Mobile state management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Touch gesture state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  // Drag-to-position state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<THREE.Vector3 | null>(null);
  const [dragCurrent, setDragCurrent] = useState<THREE.Vector3 | null>(null);
  const [draggedBodyId, setDraggedBodyId] = useState<string | null>(null);
  const [previewVelocity, setPreviewVelocity] = useState<THREE.Vector3 | null>(
    null
  );
  const [hoveredBodyId, setHoveredBodyId] = useState<string | null>(null);
  const lastHoverCheck = useRef<number>(0);

  const getWorldPosition = (
    event: React.MouseEvent<HTMLDivElement> | MouseEvent
  ): THREE.Vector3 | null => {
    if (
      !mountRef.current ||
      (!perspectiveCameraRef.current && !orthographicCameraRef.current)
    )
      return null;

    const canvas = rendererRef.current?.domElement;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const mouse = new THREE.Vector2(normalizedX, normalizedY);

    const activeCamera =
      cameraView === "perspective"
        ? perspectiveCameraRef.current
        : orthographicCameraRef.current;
    if (!activeCamera) return null;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, activeCamera);

    if (cameraView === "top-down" && orthographicCameraRef.current) {
      const frustumSize = 1200;
      const aspect = rect.width / rect.height;
      const worldX = normalizedX * ((frustumSize * aspect) / 2);
      const worldY = -normalizedY * (frustumSize / 2);
      return new THREE.Vector3(worldX, worldY, 0);
    } else {
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersectPoint = new THREE.Vector3();

      if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
        const distanceFromOrigin = intersectPoint.length();
        const maxDistance = 2000;

        if (distanceFromOrigin > maxDistance) {
          intersectPoint.normalize().multiplyScalar(maxDistance);
        }
        return intersectPoint;
      }
    }
    return null;
  };

  // Enhanced body detection for existing bodies
  const getBodyAtPosition = (
    event: React.MouseEvent<HTMLDivElement>
  ): string | null => {
    if (!mountRef.current || !sceneRef.current || !rendererRef.current)
      return null;

    const canvas = rendererRef.current.domElement;
    const rect = canvas.getBoundingClientRect();

    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const activeCamera =
      cameraView === "perspective"
        ? perspectiveCameraRef.current
        : orthographicCameraRef.current;
    if (!activeCamera) return null;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, activeCamera);

    const meshes: THREE.Mesh[] = [];
    const meshToBodyId = new Map<THREE.Mesh, string>();

    threeObjectsMapRef.current.forEach((resources, bodyId) => {
      meshes.push(resources.mesh);
      meshToBodyId.set(resources.mesh, bodyId);
    });

    const intersects = raycaster.intersectObjects(meshes);
    if (intersects.length > 0) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      return meshToBodyId.get(intersectedMesh) || null;
    }

    return null;
  };

  // Convert touch events to mouse-like events
  const convertTouchToMouse = (
    touchEvent: React.TouchEvent<HTMLDivElement>,
    type: "down" | "move" | "up"
  ) => {
    if (touchEvent.touches.length !== 1 && type !== "up") return null;

    const touch =
      type === "up" ? touchEvent.changedTouches[0] : touchEvent.touches[0];
    if (!touch) return null;

    return {
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => touchEvent.preventDefault(),
      stopPropagation: () => touchEvent.stopPropagation(),
    };
  };

  // Enhanced pointer down handler
  const handlePointerDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    let pointerEvent = event as React.MouseEvent<HTMLDivElement>;

    if ("touches" in event) {
      const converted = convertTouchToMouse(event, "down");
      if (!converted) return;
      pointerEvent = converted as any;
    }

    const worldPos = getWorldPosition(pointerEvent);
    if (!worldPos) return;

    // Check if we're clicking on an existing body (for dragging existing objects)
    const bodyId = getBodyAtPosition(pointerEvent);

    if (bodyId && !isAddingBody) {
      // Disable camera controls during drag
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      // Start dragging existing body
      setIsDragging(true);
      setDraggedBodyId(bodyId);
      setDragStart(worldPos);
      setDragCurrent(worldPos);
      try {
        pointerEvent.preventDefault();
      } catch (e) {
        // Ignore passive listener errors
      }
      return;
    }

    if (isAddingBody) {
      // Disable camera controls during drag
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      // Start drag-to-place new body
      setIsDragging(true);
      setDragStart(worldPos);
      setDragCurrent(worldPos);

      // Update form position immediately
      setNewBodyForm((prev) => ({
        ...prev,
        posX: (Math.round(worldPos.x * 10) / 10).toString(),
        posY: (Math.round(worldPos.y * 10) / 10).toString(),
        posZ: (Math.round(worldPos.z * 10) / 10).toString(),
      }));
      try {
        pointerEvent.preventDefault();
        if ("stopPropagation" in pointerEvent) {
          pointerEvent.stopPropagation();
        }
      } catch (e) {
        // Ignore passive listener errors
      }
    }
  };

  // Enhanced pointer move handler
  const handlePointerMove = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    let pointerEvent = event as React.MouseEvent<HTMLDivElement>;

    if ("touches" in event) {
      const converted = convertTouchToMouse(event, "move");
      if (!converted) return;
      pointerEvent = converted as any;
    }

    // Handle hover detection with throttling (only for mouse, not touch)
    if (!isDragging && !isAddingBody && !("touches" in event)) {
      const now = Date.now();
      if (now - lastHoverCheck.current > 100) {
        const hoveredBody = getBodyAtPosition(pointerEvent);
        setHoveredBodyId(hoveredBody);
        lastHoverCheck.current = now;
      }
    }

    if (!isDragging || !dragStart) return;

    const worldPos = getWorldPosition(pointerEvent);
    if (!worldPos) return;

    setDragCurrent(worldPos);

    if (isAddingBody) {
      // Calculate velocity vector from drag
      const velocity = worldPos.clone().sub(dragStart);
      velocity.multiplyScalar(0.5); // Scale down for reasonable velocities
      setPreviewVelocity(velocity);

      // Update form with velocity
      setNewBodyForm((prev) => ({
        ...prev,
        velX: (Math.round(velocity.x * 100) / 100).toString(),
        velY: (Math.round(velocity.y * 100) / 100).toString(),
        velZ: (Math.round(velocity.z * 100) / 100).toString(),
      }));
    } else if (draggedBodyId) {
      // Update position of dragged body in real-time
      setBodies((prev) =>
        prev.map((body) =>
          body.id === draggedBodyId
            ? { ...body, position: worldPos.clone() }
            : body
        )
      );
    }

    if (isDragging) {
      try {
        pointerEvent.preventDefault();
      } catch (e) {
        // Ignore passive listener errors
      }
    }
  };

  // Enhanced pointer up handler
  const handlePointerUp = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    let pointerEvent = event as React.MouseEvent<HTMLDivElement>;

    if ("touches" in event) {
      const converted = convertTouchToMouse(event, "up");
      if (!converted) return;
      pointerEvent = converted as any;
    }

    // Re-enable camera controls immediately
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }

    if (isAddingBody && dragStart && dragCurrent) {
      // Auto-submit the form when drag is complete for new bodies
      setTimeout(() => handleFormSubmit(), 100);
    }

    // Reset drag state
    setIsDragging(false);
    setDragStart(null);
    setDragCurrent(null);
    setDraggedBodyId(null);
    setPreviewVelocity(null);

    if (isDragging || isAddingBody) {
      try {
        pointerEvent.preventDefault();
        if ("stopPropagation" in pointerEvent) {
          pointerEvent.stopPropagation();
        }
      } catch (e) {
        // Ignore passive listener errors
      }
    }
  };

  // Unified click/tap handler
  const handleCanvasPointerClick = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (isDragging) return;

    let pointerEvent = event as React.MouseEvent<HTMLDivElement>;

    if ("touches" in event) {
      const converted = convertTouchToMouse(event, "up");
      if (!converted) return;
      pointerEvent = converted as any;
    }

    if (isAddingBody) {
      const worldPos = getWorldPosition(pointerEvent);
      if (!worldPos) return;

      // Update form position with clicked coordinates
      setNewBodyForm((prev) => ({
        ...prev,
        posX: (Math.round(worldPos.x * 10) / 10).toString(),
        posY: (Math.round(worldPos.y * 10) / 10).toString(),
        posZ: (Math.round(worldPos.z * 10) / 10).toString(),
      }));
    } else {
      // Check if a planet was clicked for selection
      const clickedBodyId = getBodyAtPosition(pointerEvent);
      if (clickedBodyId) {
        setSelectedBodyId(clickedBodyId);
        setIsEditing(true);
        setIsAddingBody(false);
      } else {
        setSelectedBodyId(null);
        setIsEditing(false);
      }
    }
  };

  // Drag preview line effect
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (isDragging && dragStart && dragCurrent && isAddingBody) {
      if (!previewLineRef.current) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          dragStart,
          dragCurrent,
        ]);
        const material = new THREE.LineBasicMaterial({
          color: SPACE_COLORS.accent,
          linewidth: 5,
          transparent: true,
          opacity: 0.9,
        });
        previewLineRef.current = new THREE.Line(geometry, material);
        scene.add(previewLineRef.current);
      } else {
        const positions = new Float32Array([
          dragStart.x,
          dragStart.y,
          dragStart.z,
          dragCurrent.x,
          dragCurrent.y,
          dragCurrent.z,
        ]);
        previewLineRef.current.geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
      }
      previewLineRef.current.visible = true;
    } else if (previewLineRef.current) {
      previewLineRef.current.visible = false;
    }
  }, [isDragging, dragStart, dragCurrent, isAddingBody]);

  // Global mouse up listener to ensure camera controls are always re-enabled
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
        setIsDragging(false);
        setDragStart(null);
        setDragCurrent(null);
        setDraggedBodyId(null);
        setPreviewVelocity(null);
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Enhanced Button component with proper event handling
  const Button: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    icon?: React.ReactNode;
  }> = ({
    onClick,
    children,
    variant = "primary",
    size = "medium",
    disabled = false,
    icon,
  }) => {
    const getButtonStyle = () => {
      const baseStyle: CSSProperties = {
        border: "none",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "600",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        opacity: disabled ? 0.6 : 1,
        fontSize:
          size === "small" ? "12px" : size === "large" ? "16px" : "14px",
        padding:
          size === "small"
            ? "8px 12px"
            : size === "large"
            ? "16px 24px"
            : "12px 18px",
        color: SPACE_COLORS.textPrimary,
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
        gap: "6px",
        zIndex: 1000,
        position: "relative",
      };

      switch (variant) {
        case "primary":
          return { ...baseStyle, background: SPACE_COLORS.buttonPrimary };
        case "secondary":
          return { ...baseStyle, background: SPACE_COLORS.buttonSecondary };
        case "danger":
          return { ...baseStyle, background: SPACE_COLORS.buttonDanger };
        default:
          return { ...baseStyle, background: SPACE_COLORS.buttonPrimary };
      }
    };

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!disabled) {
            onClick();
          }
        }}
        style={getButtonStyle()}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.4)";
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
          }
        }}
      >
        {icon}
        {children}
      </button>
    );
  };

  // Enhanced Input component
  const Input: React.FC<{
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
  }> = ({ type = "text", value, onChange, placeholder, disabled = false }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px 16px",
          border: `2px solid ${SPACE_COLORS.cardBorder}`,
          borderRadius: "8px",
          background: SPACE_COLORS.cardBg,
          color: SPACE_COLORS.textPrimary,
          fontSize: "14px",
          fontWeight: "500",
          outline: "none",
          transition: "all 0.3s ease",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = SPACE_COLORS.accent;
          e.currentTarget.style.boxShadow = `inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(0, 212, 255, 0.1)`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = SPACE_COLORS.cardBorder;
          e.currentTarget.style.boxShadow =
            "inset 0 2px 4px rgba(0, 0, 0, 0.2)";
        }}
      />
    );
  };

  // Three.js setup (keeping existing setup code)
  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(SPACE_COLORS.deepSpace);

    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });

    const containerWidth = currentMount.clientWidth || window.innerWidth;
    const containerHeight = currentMount.clientHeight || window.innerHeight;

    rendererRef.current.setSize(containerWidth, containerHeight, false);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current.setClearColor(
      new THREE.Color(SPACE_COLORS.deepSpace),
      1
    );

    const canvas = rendererRef.current.domElement;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "100";
    canvas.style.pointerEvents = "auto";
    canvas.style.display = "block";

    currentMount.appendChild(canvas);

    // Camera setup
    const containerAspect = containerWidth / containerHeight;
    perspectiveCameraRef.current = new THREE.PerspectiveCamera(
      75,
      containerAspect,
      1,
      10000
    );
    perspectiveCameraRef.current.lookAt(0, 0, 0);

    const frustumSize = 1200;
    orthographicCameraRef.current = new THREE.OrthographicCamera(
      (frustumSize * containerAspect) / -2,
      (frustumSize * containerAspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      10000
    );

    orthographicCameraRef.current.position.set(0, 0, 600);
    orthographicCameraRef.current.lookAt(0, 0, 0);
    orthographicCameraRef.current.up.set(0, 1, 0);
    orthographicCameraRef.current.zoom = 1.0;
    orthographicCameraRef.current.updateProjectionMatrix();

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    sceneRef.current.add(directionalLight);

    // Add starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      transparent: true,
      opacity: 0.8,
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 20000;
      const y = (Math.random() - 0.5) * 20000;
      const z = (Math.random() - 0.5) * 20000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    sceneRef.current.add(stars);

    // Point lights for depth
    const pointLight1 = new THREE.PointLight(0x4080ff, 0.2, 1000);
    pointLight1.position.set(-100, 100, 100);
    sceneRef.current.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff8040, 0.2, 800);
    pointLight2.position.set(100, -50, -100);
    sceneRef.current.add(pointLight2);

    // Enhanced renderer settings
    rendererRef.current.shadowMap.enabled = true;
    rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current.sortObjects = true;
    rendererRef.current.autoClear = true;

    // Controls setup
    controlsRef.current = new OrbitControls(
      perspectiveCameraRef.current,
      rendererRef.current.domElement
    );
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;

    const isMobileDevice = window.innerWidth <= 768;
    if (isMobileDevice) {
      controlsRef.current.enablePan = true;
      controlsRef.current.enableZoom = true;
      controlsRef.current.enableRotate = true;

      controlsRef.current.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };

      controlsRef.current.zoomSpeed = 2.0;
      controlsRef.current.panSpeed = 1.5;
      controlsRef.current.rotateSpeed = 1.0;
      controlsRef.current.minDistance = 100;
      controlsRef.current.maxDistance = 3000;

      perspectiveCameraRef.current.position.set(1800, 1400, 1800);
    } else {
      controlsRef.current.zoomSpeed = 1.0;
      controlsRef.current.panSpeed = 1.0;
      controlsRef.current.rotateSpeed = 1.0;
      controlsRef.current.minDistance = 50;
      controlsRef.current.maxDistance = 2000;

      perspectiveCameraRef.current.position.set(400, 300, 500);
    }

    // Handle window resize
    const handleResize = () => {
      if (
        !rendererRef.current ||
        !perspectiveCameraRef.current ||
        !orthographicCameraRef.current ||
        !mountRef.current
      )
        return;

      const containerRect = mountRef.current.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;
      const newAspect = width / height;

      rendererRef.current.setSize(width, height, false);

      perspectiveCameraRef.current.aspect = newAspect;
      perspectiveCameraRef.current.updateProjectionMatrix();

      const orthoFrustumSize = 1200;
      orthographicCameraRef.current.left = (orthoFrustumSize * newAspect) / -2;
      orthographicCameraRef.current.right = (orthoFrustumSize * newAspect) / 2;
      orthographicCameraRef.current.top = orthoFrustumSize / 2;
      orthographicCameraRef.current.bottom = orthoFrustumSize / -2;
      orthographicCameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      threeObjectsMapRef.current.forEach((resources) => {
        if (sceneRef.current) {
          disposeThreeJSResources(resources, sceneRef.current);
        }
      });
      threeObjectsMapRef.current.clear();
    };
  }, []);

  // Animation loop and physics (keeping existing code but adding the missing parts)
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!rendererRef.current || !sceneRef.current) return;

      const activeCamera =
        cameraView === "perspective"
          ? perspectiveCameraRef.current
          : orthographicCameraRef.current;
      if (!activeCamera) return;

      if (cameraView === "perspective" && controlsRef.current) {
        controlsRef.current.update();
      }

      rendererRef.current.render(sceneRef.current, activeCamera);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [cameraView]);

  // Physics and other functions (keeping existing implementations)
  const updatePhysics = useCallback(() => {
    setBodies((prevBodies) => {
      const newBodies = prevBodies.map((b) => ({
        ...b,
        position: b.position.clone(),
        velocity: b.velocity.clone(),
        acceleration: new THREE.Vector3(),
      }));

      if (stableOrbits) {
        return newBodies.map((body) => {
          if (body.type === "planet") {
            const radius = body.position.length();
            if (radius > 0) {
              const angularVelocity = Math.sqrt(
                (G * 1000) / (radius * radius * radius)
              );
              const currentAngle = Math.atan2(body.position.y, body.position.x);
              const newAngle =
                currentAngle + angularVelocity * TIME_STEP * simulationSpeed;

              const newPosition = new THREE.Vector3(
                Math.cos(newAngle) * radius,
                Math.sin(newAngle) * radius,
                0
              );

              const newVelocity = new THREE.Vector3(
                -Math.sin(newAngle) * angularVelocity * radius,
                Math.cos(newAngle) * angularVelocity * radius,
                0
              );

              const newTrailPoints = [...body.trailPoints, newPosition.clone()];
              if (newTrailPoints.length > trailLength) {
                newTrailPoints.splice(0, newTrailPoints.length - trailLength);
              }

              return {
                ...body,
                position: newPosition,
                velocity: newVelocity,
                trailPoints: newTrailPoints,
              };
            }
          }
          return body;
        });
      } else {
        // Realistic physics mode
        for (let i = 0; i < newBodies.length; i++) {
          for (let j = i + 1; j < newBodies.length; j++) {
            const bodyA = newBodies[i];
            const bodyB = newBodies[j];

            const distanceVector = new THREE.Vector3().subVectors(
              bodyB.position,
              bodyA.position
            );
            const distanceSq = distanceVector.lengthSq();
            if (distanceSq === 0) continue;

            const forceMagnitude = (G * bodyA.mass * bodyB.mass) / distanceSq;
            const forceVector = distanceVector
              .normalize()
              .multiplyScalar(forceMagnitude);

            bodyA.acceleration.add(
              forceVector.clone().divideScalar(bodyA.mass)
            );
            bodyB.acceleration.add(
              forceVector.clone().multiplyScalar(-1).divideScalar(bodyB.mass)
            );
          }
        }

        const actualTimeStep = TIME_STEP * simulationSpeed;

        return newBodies.map((body) => {
          const newVelocity = body.velocity
            .clone()
            .add(body.acceleration.clone().multiplyScalar(actualTimeStep));
          const newPosition = body.position
            .clone()
            .add(newVelocity.clone().multiplyScalar(actualTimeStep));

          const newTrailPoints = [...body.trailPoints, newPosition.clone()];
          if (newTrailPoints.length > trailLength) {
            newTrailPoints.splice(0, newTrailPoints.length - trailLength);
          }

          return {
            ...body,
            position: newPosition,
            velocity: newVelocity,
            trailPoints: newTrailPoints,
          };
        });
      }
    });
  }, [simulationSpeed, trailLength, stableOrbits]);

  // Simulation loop
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      updatePhysics();
    }, TIME_STEP * 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, updatePhysics]);

  // Three.js objects update (keeping existing implementation)
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    const currentIds = new Set(bodies.map((b) => b.id));

    threeObjectsMapRef.current.forEach((resources, id) => {
      if (!currentIds.has(id)) {
        disposeThreeJSResources(resources, scene);
        threeObjectsMapRef.current.delete(id);
      }
    });

    bodies.forEach((body) => {
      let resources = threeObjectsMapRef.current.get(body.id);

      if (!resources) {
        const segments = Math.max(
          32,
          Math.min(128, Math.floor(body.radius * 4))
        );
        const geometry = new THREE.SphereGeometry(
          body.radius,
          segments,
          segments / 2
        );

        let material: THREE.Material;
        switch (body.type) {
          case "star":
            material = createStarMaterial(body.color, body.radius);
            break;
          case "planet":
            material = createPlanetMaterial(body.color, body.radius);
            break;
          case "moon":
            material = createMoonMaterial(body.color, body.radius);
            break;
          default:
            material = new THREE.MeshStandardMaterial({
              color: body.color,
              roughness: 0.8,
              metalness: 0.2,
            });
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(body.position);

        mesh.castShadow = body.type !== "star";
        mesh.receiveShadow = true;

        if (body.type === "star") {
          mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.02;
          const sunLight = new THREE.PointLight(0xffffff, 2, 2000, 2);
          mesh.add(sunLight);
        }

        if (body.type === "planet") {
          mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;
          const planetLight = new THREE.PointLight(
            body.color,
            0.8,
            body.radius * 4
          );
          planetLight.position.set(0, 0, 0);
          mesh.add(planetLight);
        }

        const trailMaterial = new THREE.LineBasicMaterial({
          color: body.color,
          transparent: true,
          opacity: body.type === "star" ? 0.9 : 0.8,
          linewidth: body.type === "star" ? 6 : 4,
        });
        const trailGeometry = new THREE.BufferGeometry();
        const trailLine = new THREE.Line(trailGeometry, trailMaterial);

        const velocityArrow = new THREE.ArrowHelper(
          body.velocity.clone().normalize(),
          body.position,
          body.velocity.length() * VELOCITY_ARROW_SCALE,
          SPACE_COLORS.danger
        );

        let orbitalRing: THREE.Line | undefined;
        if (body.type === "planet" && body.position.length() > 0) {
          const radius = body.position.length();
          orbitalRing = createOrbitalRing(radius, body.color);
          orbitalRing.userData.radius = radius;
        }

        resources = { mesh, trailLine, velocityArrow, orbitalRing };
        if (orbitalRing) {
          scene.add(mesh, trailLine, velocityArrow, orbitalRing);
        } else {
          scene.add(mesh, trailLine, velocityArrow);
        }
        threeObjectsMapRef.current.set(body.id, resources);
      }

      // Update existing objects
      resources.mesh.position.copy(body.position);

      const originalRadius = (resources.mesh.geometry as THREE.SphereGeometry)
        .parameters.radius;
      const scaleFactor = body.radius / originalRadius;
      resources.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

      (resources.mesh.material as THREE.MeshStandardMaterial).color.set(
        body.color
      );

      if (resources.mesh.userData.rotationSpeed) {
        resources.mesh.rotation.y += resources.mesh.userData.rotationSpeed;
        if (body.type === "star") {
          resources.mesh.rotation.x +=
            resources.mesh.userData.rotationSpeed * 0.5;
        }
      }

      if (body.trailPoints.length > 1 && showTrails) {
        resources.trailLine.geometry.dispose();
        resources.trailLine.geometry = new THREE.BufferGeometry().setFromPoints(
          body.trailPoints
        );
        resources.trailLine.visible = true;
      } else {
        resources.trailLine.visible = false;
      }

      if (showVelocityVectors && body.velocity.lengthSq() > 0.001) {
        resources.velocityArrow.position.copy(body.position);
        resources.velocityArrow.setDirection(body.velocity.clone().normalize());
        resources.velocityArrow.setLength(
          body.velocity.length() * VELOCITY_ARROW_SCALE,
          0.2 * body.velocity.length() * VELOCITY_ARROW_SCALE,
          0.1 * body.velocity.length() * VELOCITY_ARROW_SCALE
        );
        resources.velocityArrow.visible = true;
      } else {
        resources.velocityArrow.visible = false;
      }

      if (resources.orbitalRing) {
        const ringMat = resources.orbitalRing
          .material as THREE.LineBasicMaterial;
        ringMat.color.set(
          showColoredRings ? body.color : SPACE_COLORS.orbitalRing
        );
        ringMat.opacity = 0.8;
      }
    });
  }, [bodies, trailLength, showVelocityVectors, showTrails, showColoredRings]);

  const disposeThreeJSResources = (
    resources: ThreeJSResources,
    scene?: THREE.Scene
  ) => {
    scene?.remove(resources.mesh, resources.trailLine, resources.velocityArrow);
    if (resources.orbitalRing) {
      scene?.remove(resources.orbitalRing);
      resources.orbitalRing.geometry.dispose();
      (resources.orbitalRing.material as THREE.Material).dispose();
    }
    resources.mesh.geometry.dispose();
    (resources.mesh.material as THREE.Material).dispose();
    resources.trailLine.geometry.dispose();
    (resources.trailLine.material as THREE.Material).dispose();
  };

  // UI Handlers (keeping existing but simplified for brevity)
  const handleAddBody = (
    params: Omit<
      CelestialBody,
      "id" | "acceleration" | "trailPoints" | "position"
    > & { position?: THREE.Vector3 }
  ) => {
    const newId = Date.now().toString();
    const basePosition =
      params.position ||
      new THREE.Vector3(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        0
      );

    let finalPosition = basePosition.clone();
    let finalVelocity = params.velocity.clone();

    if (params.type === "moon" && params.parentId) {
      const parent = bodies.find((b) => b.id === params.parentId);
      if (parent) {
        finalPosition = parent.position.clone().add(basePosition);
        finalVelocity = parent.velocity.clone().add(params.velocity);
      }
    }

    const newBody: CelestialBody = {
      ...params,
      id: newId,
      position: finalPosition,
      velocity: finalVelocity,
      acceleration: new THREE.Vector3(0, 0, 0),
      trailPoints: [],
    };
    setBodies((prev) => [...prev, newBody]);
    setSelectedBodyId(newId);
    setIsAddingBody(false);
    setNewBodyParentId(undefined);
  };

  const handleFormSubmit = () => {
    if (!newBodyForm.name.trim()) {
      alert("Please enter a name for the celestial body.");
      return;
    }

    const position = new THREE.Vector3(
      parseFloat(newBodyForm.posX) || 0,
      parseFloat(newBodyForm.posY) || 0,
      parseFloat(newBodyForm.posZ) || 0
    );
    let finalPosition = position.clone();
    let finalVelocity = new THREE.Vector3(
      parseFloat(newBodyForm.velX) || 0,
      parseFloat(newBodyForm.velY) || 0,
      parseFloat(newBodyForm.velZ) || 0
    );

    if (newBodyType === "moon" && newBodyParentId) {
      const parent = bodies.find((b) => b.id === newBodyParentId);
      if (parent) {
        finalPosition = parent.position.clone().add(position);
        finalVelocity = parent.velocity.clone().add(finalVelocity);
      }
    }

    handleAddBody({
      name: newBodyForm.name,
      type: newBodyType,
      mass: parseFloat(newBodyForm.mass) || (newBodyType === "planet" ? 10 : 1),
      radius:
        parseFloat(newBodyForm.radius) || (newBodyType === "planet" ? 5 : 2),
      color: newBodyForm.color,
      position: finalPosition,
      velocity: finalVelocity,
      parentId: newBodyParentId,
    });

    setNewBodyForm({
      name: "",
      mass: newBodyType === "planet" ? "10" : "1",
      radius: newBodyType === "planet" ? "5" : "2",
      color: newBodyType === "planet" ? SPACE_COLORS.earth : SPACE_COLORS.moon,
      velX: "",
      velY: "",
      velZ: "0",
      posX: "",
      posY: "",
      posZ: "0",
    });
    setIsAddingBody(false);
    setIsPaused(false);
  };

  const handleUpdateBody = (
    id: string,
    updates: Partial<Pick<CelestialBody, "mass" | "radius">>
  ) => {
    setBodies((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const handleDeleteBody = (id: string) => {
    if (sceneRef.current) {
      const resources = threeObjectsMapRef.current.get(id);
      if (resources) {
        disposeThreeJSResources(resources, sceneRef.current);
        threeObjectsMapRef.current.delete(id);
      }
    }
    setBodies((prev) => prev.filter((b) => b.id !== id));
    if (selectedBodyId === id) setSelectedBodyId(null);
  };

  const handleClearTrails = () => {
    setBodies((prev) => prev.map((b) => ({ ...b, trailPoints: [] })));
  };

  const handleResetSimulation = () => {
    setIsPaused(true);
    setBodies([
      {
        id: "sun",
        name: "Sun",
        type: "star",
        mass: 1000,
        radius: 15,
        color: SPACE_COLORS.sun,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 0, 0),
        trailPoints: [],
      },
      // ... other planets (same as initial state)
    ]);
    setSelectedBodyId(null);
    setTrailLength(MAX_TRAIL_POINTS);
    setSimulationSpeed(1);
    setIsPaused(false);
  };

  const startAddingBody = (type: "planet" | "moon") => {
    setIsPaused(true);
    setNewBodyType(type);
    setIsAddingBody(true);
    setIsEditing(false);
    setSelectedBodyId(null);
    setNewBodyParentId(undefined);

    if (isMobile) {
      setIsMobileMenuOpen(false);
    }

    setNewBodyForm({
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      mass: type === "planet" ? "10" : "1",
      radius: type === "planet" ? "5" : "2",
      color: type === "planet" ? SPACE_COLORS.earth : SPACE_COLORS.moon,
      velX: "",
      velY: type === "planet" ? "2" : "",
      velZ: "0",
      posX: type === "planet" ? "100" : "50",
      posY: "",
      posZ: "0",
    });
  };

  // Mobile detection and event handling (keeping existing implementations)
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const newIsMobile = width <= 768 || (isTouchDevice && width <= 1024);

      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, [isMobile]);

  // Main render
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${SPACE_COLORS.deepSpace} 0%, ${SPACE_COLORS.spaceNavy} 50%, ${SPACE_COLORS.spacePurple} 100%)`,
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Canvas Container */}
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
          cursor: isAddingBody
            ? isDragging
              ? "grabbing"
              : "crosshair"
            : isDragging
            ? "grabbing"
            : "default",
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onClick={handleCanvasPointerClick}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      />

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            background: SPACE_COLORS.sidebarBg,
            border: `2px solid ${SPACE_COLORS.cardBorder}`,
            borderRadius: "12px",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
          }}
        >
          <FaBars size={20} color={SPACE_COLORS.textPrimary} />
        </button>
      )}

      {/* Fixed Sidebar Collapse Button for Desktop */}
      {!isMobile && sidebarCollapsed && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSidebarCollapsed(false);
          }}
          style={{
            position: "fixed",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            zIndex: 1000,
            background: SPACE_COLORS.sidebarBg,
            border: `2px solid ${SPACE_COLORS.cardBorder}`,
            borderRadius: "12px",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
          }}
          title="Open Sidebar"
        >
          <FaChevronLeft size={20} color={SPACE_COLORS.textPrimary} />
        </button>
      )}

      {/* Enhanced Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isMobile
            ? isMobileMenuOpen
              ? 0
              : "-100%"
            : sidebarCollapsed
            ? "-360px"
            : 0,
          width: isMobile ? "100%" : "360px",
          height: "100vh",
          background: SPACE_COLORS.sidebarBg,
          backdropFilter: "blur(20px)",
          border: isMobile ? "none" : `2px solid ${SPACE_COLORS.sidebarBorder}`,
          borderRight: "none",
          zIndex: 500,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          overflowX: "hidden",
          boxShadow: isMobile ? "none" : "-8px 0 32px rgba(0, 0, 0, 0.3)",
          scrollbarWidth: "thin",
          scrollbarColor: `${SPACE_COLORS.accent} transparent`,
        }}
        className="custom-scrollbar"
      >
        <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: ${SPACE_COLORS.accent};
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: ${SPACE_COLORS.accentHover};
                    }
                `}</style>

        {/* Sidebar Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: `2px solid ${SPACE_COLORS.cardBorder}`,
            background: `linear-gradient(135deg, ${SPACE_COLORS.cardBg} 0%, rgba(35, 35, 65, 0.7) 100%)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: SPACE_COLORS.textPrimary,
                fontSize: "24px",
                fontWeight: "700",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaRocket size={24} color={SPACE_COLORS.accent} />
              Solar System
            </h2>
            {!isMobile && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSidebarCollapsed(!sidebarCollapsed);
                }}
                style={{
                  background: "transparent",
                  border: `2px solid ${SPACE_COLORS.cardBorder}`,
                  borderRadius: "8px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: SPACE_COLORS.textSecondary,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = SPACE_COLORS.accent;
                  e.currentTarget.style.color = SPACE_COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = SPACE_COLORS.cardBorder;
                  e.currentTarget.style.color = SPACE_COLORS.textSecondary;
                }}
              >
                <FaChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div style={{ padding: "24px", paddingBottom: "0" }}>
          {/* Control Panel */}
          <div
            style={{
              background: SPACE_COLORS.cardBg,
              border: `2px solid ${SPACE_COLORS.cardBorder}`,
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: SPACE_COLORS.textPrimary,
                fontSize: "18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaGamepad size={18} color={SPACE_COLORS.accent} />
              Controls
              <InfoButton
                onClick={() =>
                  setShowFeatureInfo(
                    showFeatureInfo === "controls" ? null : "controls"
                  )
                }
              />
            </h3>

            {showFeatureInfo === "controls" && (
              <div
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: `1px solid ${SPACE_COLORS.accent}`,
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "16px",
                  fontSize: "13px",
                  color: SPACE_COLORS.textSecondary,
                  lineHeight: "1.4",
                }}
              >
                • <strong>Play/Pause:</strong> Control simulation time
                <br />• <strong>Speed:</strong> Adjust simulation speed
                <br />• <strong>Camera:</strong> Switch between 3D and top-down
                view
                <br />• <strong>Trails:</strong> Show orbital paths
                <br />• <strong>Vectors:</strong> Display velocity arrows
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={() => setIsPaused(!isPaused)}
                variant={isPaused ? "primary" : "secondary"}
                size="medium"
                icon={isPaused ? <FaPlay size={14} /> : <FaPause size={14} />}
              >
                {isPaused ? "Play" : "Pause"}
              </Button>
              <Button
                onClick={handleClearTrails}
                variant="secondary"
                size="medium"
                icon={<FaBroom size={14} />}
              >
                Clear Trails
              </Button>
              <Button
                onClick={handleResetSimulation}
                variant="danger"
                size="medium"
                icon={<FaRedo size={14} />}
              >
                Reset
              </Button>
            </div>

            <CustomSlider
              value={simulationSpeed}
              onChange={setSimulationSpeed}
              min={0.1}
              max={5}
              step={0.1}
              label="Simulation Speed"
              icon={<MdSpeed size={16} />}
            />

            <CustomSlider
              value={trailLength}
              onChange={setTrailLength}
              min={10}
              max={500}
              step={10}
              label="Trail Length"
              icon={<GiTrail size={16} />}
            />

            {/* Camera Controls */}
            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: SPACE_COLORS.textPrimary,
                  fontWeight: "600",
                }}
              >
                <FaCamera size={16} />
                Camera View
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  onClick={() => setCameraView("perspective")}
                  variant={
                    cameraView === "perspective" ? "primary" : "secondary"
                  }
                  size="small"
                >
                  3D View
                </Button>
                <Button
                  onClick={() => setCameraView("top-down")}
                  variant={cameraView === "top-down" ? "primary" : "secondary"}
                  size="small"
                >
                  Top-Down
                </Button>
              </div>
            </div>

            {/* Display Options */}
            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: SPACE_COLORS.textPrimary,
                  fontWeight: "600",
                }}
              >
                <MdVisibility size={16} />
                Display Options
              </label>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: SPACE_COLORS.textSecondary,
                    fontSize: "14px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={showTrails}
                    onChange={(e) => setShowTrails(e.target.checked)}
                    style={{
                      accentColor: SPACE_COLORS.accent,
                      transform: "scale(1.2)",
                    }}
                  />
                  Show Orbital Trails
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: SPACE_COLORS.textSecondary,
                    fontSize: "14px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={showVelocityVectors}
                    onChange={(e) => setShowVelocityVectors(e.target.checked)}
                    style={{
                      accentColor: SPACE_COLORS.accent,
                      transform: "scale(1.2)",
                    }}
                  />
                  Show Velocity Vectors
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: SPACE_COLORS.textSecondary,
                    fontSize: "14px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={showColoredRings}
                    onChange={(e) => setShowColoredRings(e.target.checked)}
                    style={{
                      accentColor: SPACE_COLORS.accent,
                      transform: "scale(1.2)",
                    }}
                  />
                  Colored Orbital Rings
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: SPACE_COLORS.textSecondary,
                    fontSize: "14px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={stableOrbits}
                    onChange={(e) => setStableOrbits(e.target.checked)}
                    style={{
                      accentColor: SPACE_COLORS.accent,
                      transform: "scale(1.2)",
                    }}
                  />
                  Stable Orbits Mode
                </label>
              </div>
            </div>
          </div>

          {/* Add Bodies Section */}
          <div
            style={{
              background: SPACE_COLORS.cardBg,
              border: `2px solid ${SPACE_COLORS.cardBorder}`,
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: SPACE_COLORS.textPrimary,
                fontSize: "18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaPlus size={18} color={SPACE_COLORS.accent} />
              Add Bodies
              <InfoButton
                onClick={() =>
                  setShowFeatureInfo(showFeatureInfo === "add" ? null : "add")
                }
              />
            </h3>

            {showFeatureInfo === "add" && (
              <div
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: `1px solid ${SPACE_COLORS.accent}`,
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "16px",
                  fontSize: "13px",
                  color: SPACE_COLORS.textSecondary,
                  lineHeight: "1.4",
                }}
              >
                • <strong>Click:</strong> Place body at cursor position
                <br />• <strong>Drag:</strong> Set position and velocity vector
                <br />• <strong>Mobile:</strong> Tap to place, drag to set
                velocity
                <br />• <strong>Moon:</strong> Select parent planet first
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <Button
                onClick={() => startAddingBody("planet")}
                variant={
                  isAddingBody && newBodyType === "planet"
                    ? "primary"
                    : "secondary"
                }
                size="medium"
                icon={<IoPlanet size={14} />}
              >
                Add Planet
              </Button>
              <Button
                onClick={() => startAddingBody("moon")}
                variant={
                  isAddingBody && newBodyType === "moon"
                    ? "primary"
                    : "secondary"
                }
                size="medium"
                icon={<FaMoon size={14} />}
              >
                Add Moon
              </Button>
            </div>

            {isAddingBody && (
              <div
                style={{
                  background: "rgba(102, 126, 234, 0.1)",
                  border: `2px solid ${SPACE_COLORS.accent}`,
                  borderRadius: "12px",
                  padding: "16px",
                  marginTop: "16px",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 16px 0",
                    color: SPACE_COLORS.textPrimary,
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Adding New{" "}
                  {newBodyType.charAt(0).toUpperCase() + newBodyType.slice(1)}
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "13px",
                        color: SPACE_COLORS.textPrimary,
                        fontWeight: "500",
                      }}
                    >
                      Name
                    </label>
                    <Input
                      value={newBodyForm.name}
                      onChange={(value) =>
                        setNewBodyForm({ ...newBodyForm, name: value })
                      }
                      placeholder="Enter body name"
                    />
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          fontSize: "13px",
                          color: SPACE_COLORS.textPrimary,
                          fontWeight: "500",
                        }}
                      >
                        Mass
                      </label>
                      <Input
                        type="number"
                        value={newBodyForm.mass}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, mass: value })
                        }
                        placeholder="10"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          fontSize: "13px",
                          color: SPACE_COLORS.textPrimary,
                          fontWeight: "500",
                        }}
                      >
                        Radius
                      </label>
                      <Input
                        type="number"
                        value={newBodyForm.radius}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, radius: value })
                        }
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "13px",
                        color: SPACE_COLORS.textPrimary,
                        fontWeight: "500",
                      }}
                    >
                      Color
                    </label>
                    <input
                      type="color"
                      value={newBodyForm.color}
                      onChange={(e) =>
                        setNewBodyForm({
                          ...newBodyForm,
                          color: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        height: "40px",
                        border: `2px solid ${SPACE_COLORS.cardBorder}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: "transparent",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "13px",
                        color: SPACE_COLORS.textPrimary,
                        fontWeight: "500",
                      }}
                    >
                      Position (X, Y, Z)
                    </label>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <Input
                        type="number"
                        value={newBodyForm.posX}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, posX: value })
                        }
                        placeholder="0"
                      />
                      <Input
                        type="number"
                        value={newBodyForm.posY}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, posY: value })
                        }
                        placeholder="0"
                      />
                      <Input
                        type="number"
                        value={newBodyForm.posZ}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, posZ: value })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "13px",
                        color: SPACE_COLORS.textPrimary,
                        fontWeight: "500",
                      }}
                    >
                      Velocity (X, Y, Z)
                    </label>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <Input
                        type="number"
                        value={newBodyForm.velX}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, velX: value })
                        }
                        placeholder="0"
                      />
                      <Input
                        type="number"
                        value={newBodyForm.velY}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, velY: value })
                        }
                        placeholder="0"
                      />
                      <Input
                        type="number"
                        value={newBodyForm.velZ}
                        onChange={(value) =>
                          setNewBodyForm({ ...newBodyForm, velZ: value })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {newBodyType === "moon" && (
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          fontSize: "13px",
                          color: SPACE_COLORS.textPrimary,
                          fontWeight: "500",
                        }}
                      >
                        Parent Planet
                      </label>
                      <select
                        value={newBodyParentId || ""}
                        onChange={(e) =>
                          setNewBodyParentId(e.target.value || undefined)
                        }
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: `2px solid ${SPACE_COLORS.cardBorder}`,
                          borderRadius: "8px",
                          background: SPACE_COLORS.cardBg,
                          color: SPACE_COLORS.textPrimary,
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select parent planet</option>
                        {bodies
                          .filter((b) => b.type === "planet")
                          .map((planet) => (
                            <option key={planet.id} value={planet.id}>
                              {planet.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "16px" }}
                  >
                    <Button
                      onClick={handleFormSubmit}
                      variant="primary"
                      size="medium"
                      icon={<FaCheck size={14} />}
                    >
                      Create{" "}
                      {newBodyType.charAt(0).toUpperCase() +
                        newBodyType.slice(1)}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAddingBody(false);
                        setIsPaused(false);
                        if (isMobile) setIsMobileMenuOpen(false);
                      }}
                      variant="secondary"
                      size="medium"
                      icon={<FaTimes size={14} />}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected Body Details */}
          {selectedBody && (
            <div
              style={{
                background: SPACE_COLORS.cardBg,
                border: `2px solid ${SPACE_COLORS.cardBorder}`,
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "24px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  color: SPACE_COLORS.textPrimary,
                  fontSize: "18px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {selectedBody.type === "star" && (
                  <FaSun size={18} color={SPACE_COLORS.sun} />
                )}
                {selectedBody.type === "planet" && (
                  <IoPlanet size={18} color={selectedBody.color} />
                )}
                {selectedBody.type === "moon" && (
                  <FaMoon size={18} color={selectedBody.color} />
                )}
                {selectedBody.name}
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: selectedBody.color,
                    border: `2px solid ${SPACE_COLORS.textPrimary}`,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  }}
                />
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: `1px solid ${SPACE_COLORS.cardBorder}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: SPACE_COLORS.textMuted,
                      marginBottom: "4px",
                    }}
                  >
                    Type
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: SPACE_COLORS.textPrimary,
                      fontWeight: "600",
                    }}
                  >
                    {selectedBody.type.charAt(0).toUpperCase() +
                      selectedBody.type.slice(1)}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: `1px solid ${SPACE_COLORS.cardBorder}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: SPACE_COLORS.textMuted,
                      marginBottom: "4px",
                    }}
                  >
                    Mass
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: SPACE_COLORS.textPrimary,
                      fontWeight: "600",
                    }}
                  >
                    {selectedBody.mass.toFixed(2)}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: `1px solid ${SPACE_COLORS.cardBorder}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: SPACE_COLORS.textMuted,
                      marginBottom: "4px",
                    }}
                  >
                    Radius
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: SPACE_COLORS.textPrimary,
                      fontWeight: "600",
                    }}
                  >
                    {selectedBody.radius.toFixed(1)}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: `1px solid ${SPACE_COLORS.cardBorder}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: SPACE_COLORS.textMuted,
                      marginBottom: "4px",
                    }}
                  >
                    Speed
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: SPACE_COLORS.textPrimary,
                      fontWeight: "600",
                    }}
                  >
                    {selectedBody.velocity.length().toFixed(2)}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: SPACE_COLORS.textMuted,
                    marginBottom: "8px",
                  }}
                >
                  Position
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: `1px solid ${SPACE_COLORS.cardBorder}`,
                    fontSize: "13px",
                    color: SPACE_COLORS.textPrimary,
                    fontFamily: "monospace",
                  }}
                >
                  X: {selectedBody.position.x.toFixed(1)}
                  <br />
                  Y: {selectedBody.position.y.toFixed(1)}
                  <br />
                  Z: {selectedBody.position.z.toFixed(1)}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: SPACE_COLORS.textMuted,
                    marginBottom: "8px",
                  }}
                >
                  Velocity
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: `1px solid ${SPACE_COLORS.cardBorder}`,
                    fontSize: "13px",
                    color: SPACE_COLORS.textPrimary,
                    fontFamily: "monospace",
                  }}
                >
                  X: {selectedBody.velocity.x.toFixed(2)}
                  <br />
                  Y: {selectedBody.velocity.y.toFixed(2)}
                  <br />
                  Z: {selectedBody.velocity.z.toFixed(2)}
                </div>
              </div>

              {isEditing && (
                <div
                  style={{
                    background: "rgba(102, 126, 234, 0.1)",
                    border: `2px solid ${SPACE_COLORS.accent}`,
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 16px 0",
                      color: SPACE_COLORS.textPrimary,
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Edit Properties
                  </h4>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          fontSize: "13px",
                          color: SPACE_COLORS.textPrimary,
                          fontWeight: "500",
                        }}
                      >
                        Mass
                      </label>
                      <Input
                        type="number"
                        value={selectedBody.mass.toString()}
                        onChange={(value) =>
                          handleUpdateBody(selectedBody.id, {
                            mass: parseFloat(value) || 0,
                          })
                        }
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          fontSize: "13px",
                          color: SPACE_COLORS.textPrimary,
                          fontWeight: "500",
                        }}
                      >
                        Radius
                      </label>
                      <Input
                        type="number"
                        value={selectedBody.radius.toString()}
                        onChange={(value) =>
                          handleUpdateBody(selectedBody.id, {
                            radius: parseFloat(value) || 1,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "primary" : "secondary"}
                  size="small"
                  icon={
                    isEditing ? <FaCheck size={12} /> : <FaEdit size={12} />
                  }
                >
                  {isEditing ? "Done" : "Edit"}
                </Button>
                {selectedBody.id !== "sun" && (
                  <Button
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete ${selectedBody.name}?`
                        )
                      ) {
                        handleDeleteBody(selectedBody.id);
                      }
                    }}
                    variant="danger"
                    size="small"
                    icon={<FaTrash size={12} />}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Bodies List */}
          <div
            style={{
              background: SPACE_COLORS.cardBg,
              border: `2px solid ${SPACE_COLORS.cardBorder}`,
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: SPACE_COLORS.textPrimary,
                fontSize: "18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaGlobe size={18} color={SPACE_COLORS.accent} />
              Celestial Bodies ({bodies.length})
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {bodies.map((body) => (
                <div
                  key={body.id}
                  onClick={() => {
                    setSelectedBodyId(body.id);
                    setIsEditing(false);
                    if (isMobile) setIsMobileMenuOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    background:
                      selectedBodyId === body.id
                        ? "rgba(0, 212, 255, 0.2)"
                        : hoveredBodyId === body.id
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.05)",
                    border: `2px solid ${
                      selectedBodyId === body.id
                        ? SPACE_COLORS.accent
                        : "transparent"
                    }`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredBodyId(body.id)}
                  onMouseLeave={() => setHoveredBodyId(null)}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: body.color,
                      border: `2px solid ${SPACE_COLORS.textPrimary}`,
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: SPACE_COLORS.textPrimary,
                        marginBottom: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {body.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: SPACE_COLORS.textMuted,
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <span>{body.type}</span>
                      <span>•</span>
                      <span>M: {body.mass.toFixed(1)}</span>
                      <span>•</span>
                      <span>R: {body.radius.toFixed(1)}</span>
                    </div>
                  </div>
                  {body.type === "star" && (
                    <FaSun size={16} color={SPACE_COLORS.sun} />
                  )}
                  {body.type === "planet" && (
                    <IoPlanet size={16} color={body.color} />
                  )}
                  {body.type === "moon" && (
                    <FaMoon size={16} color={body.color} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div
            style={{
              background: SPACE_COLORS.cardBg,
              border: `2px solid ${SPACE_COLORS.cardBorder}`,
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "0", // Remove bottom margin
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 16px 0",
                color: SPACE_COLORS.textPrimary,
                fontSize: "18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaInfo size={18} color={SPACE_COLORS.accent} />
              Instructions
            </h3>
            <div
              style={{
                fontSize: "13px",
                color: SPACE_COLORS.textSecondary,
                lineHeight: "1.6",
              }}
            >
              <strong>🖱️ Mouse Controls:</strong>
              <br />• <strong>Click:</strong> Select celestial body
              <br />• <strong>Drag:</strong> Rotate camera (3D mode)
              <br />• <strong>Scroll:</strong> Zoom in/out
              <br />• <strong>Right-click + drag:</strong> Pan camera
              <br />
              <br />
              <strong>📱 Touch Controls:</strong>
              <br />• <strong>Tap:</strong> Select body
              <br />• <strong>Swipe from left:</strong> Open menu
              <br />• <strong>Pinch:</strong> Zoom
              <br />• <strong>Two-finger drag:</strong> Pan
              <br />
              <br />
              <strong>➕ Adding Bodies:</strong>
              <br />
              • Click "Add Planet" or "Add Moon"
              <br />
              • Click to place, drag to set velocity
              <br />
              • Fill in properties and click "Create"
              <br />
              <br />
              <strong>⚙️ Physics Modes:</strong>
              <br />• <strong>Stable Orbits:</strong> Perfect circular motion
              <br />• <strong>Realistic:</strong> Full gravitational simulation
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 400,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Status Bar */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          background: SPACE_COLORS.sidebarBg,
          backdropFilter: "blur(20px)",
          border: `2px solid ${SPACE_COLORS.cardBorder}`,
          borderRadius: "12px",
          padding: "12px 16px",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          fontSize: "13px",
          color: SPACE_COLORS.textSecondary,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isPaused
                ? SPACE_COLORS.warning
                : SPACE_COLORS.success,
              animation: isPaused ? "none" : "pulse 2s infinite",
            }}
          />
          <span style={{ fontWeight: "600" }}>
            {isPaused ? "PAUSED" : "RUNNING"}
          </span>
        </div>
        <div>Speed: {simulationSpeed}x</div>
        <div>Bodies: {bodies.length}</div>
        <div>Camera: {cameraView === "perspective" ? "3D" : "Top-Down"}</div>
        {selectedBody && (
          <div style={{ color: SPACE_COLORS.accent, fontWeight: "600" }}>
            Selected: {selectedBody.name}
          </div>
        )}
      </div>

      {/* Simple Footer */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "40px",
          background: "rgba(26, 26, 46, 0.8)",
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${SPACE_COLORS.cardBorder}`,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: SPACE_COLORS.textMuted,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaRocket size={14} color={SPACE_COLORS.accent} />
          <span>Solar System Simulator</span>
          <span style={{ color: SPACE_COLORS.cardBorder }}>•</span>
          <span>Built with React & Three.js</span>
          <span style={{ color: SPACE_COLORS.cardBorder }}>•</span>
          <span>© 2024</span>
        </div>
      </div>

      {/* Add pulsing animation for status indicator */}
      <style>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
    </div>
  );
};

export default SolarSystemApp;
