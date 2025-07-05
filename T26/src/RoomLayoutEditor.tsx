import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import * as THREE from "three";
import {
  MdDownload,
  MdPalette,
  MdDelete,
  MdAdd,
  MdImage,
  MdGridOn,
  MdHome,
  MdArrowForward,
  MdClose,
  MdVisibility,
  MdPeople,
  MdLayers,
  MdAutoAwesome,
  MdStar,
  MdGpsFixed,
  MdBolt,
  MdMenu,
  MdFavorite,
} from "react-icons/md";

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const toast: ToastApi = {
  success: (message) => {
    const toastEl = document.createElement("div");
    toastEl.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[200] animate-slide-in";
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  },
  error: (message) => {
    const toastEl = document.createElement("div");
    toastEl.className =
      "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[200] animate-slide-in";
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  },
  info: (message) => {
    const toastEl = document.createElement("div");
    toastEl.className =
      "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-[200] animate-slide-in";
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  },
};

type Colors = Record<string, string>;

const colors: Colors = {
  bg: "#fafafa",
  bgSecondary: "#ffffff",
  bgTertiary: "#f4f4f5",
  text: "#09090b",
  textSecondary: "#71717a",
  textMuted: "#a1a1aa",
  border: "#e4e4e7",
  borderHover: "#d4d4d8",
  primary: "#6366f1",
  primaryHover: "#5b5bd6",
  primaryLight: "#eef2ff",
  secondary: "#f1f5f9",
  accent: "#8b5cf6",
  accentHover: "#7c3aed",
  success: "#22c55e",
  successHover: "#16a34a",
  warning: "#f59e0b",
  error: "#ef4444",
  errorHover: "#dc2626",
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowHover: "rgba(0, 0, 0, 0.15)",
};

interface FurnitureType {
  id: string;
  name: string;
  size: [number, number, number];
  color: string;
}

interface FurniturePosition {
  x: number;
  z: number;
}

interface FurnitureItem {
  id: string;
  type: string;
  position: FurniturePosition;
  rotation: number;
  color: string;
  customSize: [number, number, number] | null;
}

interface Project {
  id: string;
  name: string;
  furniture: FurnitureItem[];
  gridSize: number;
  createdAt: string;
}

interface DragState {
  mode: "add" | "move";
  item: FurnitureItem & { size?: [number, number, number] };
  initialPosition: FurniturePosition | null;
  startX: number;
  startY: number;
  colliding: boolean;
  isOverFloor: boolean;
}

const FURNITURE_TYPES: FurnitureType[] = [
  { id: "sofa", name: "Sofa", size: [2, 0.8, 1], color: "#8B4513" },
  { id: "table", name: "Table", size: [1.2, 0.8, 1.2], color: "#654321" },
  { id: "chair", name: "Chair", size: [0.6, 1, 0.6], color: "#2F4F4F" },
  { id: "bed", name: "Bed", size: [2, 0.6, 1.4], color: "#4682B4" },
  { id: "desk", name: "Desk", size: [1.5, 0.8, 0.8], color: "#8B4513" },
  { id: "bookshelf", name: "Bookshelf", size: [0.4, 2, 1.2], color: "#654321" },
];

interface StorageApi {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
}

const storage: StorageApi = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {}
  },
};

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = "" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div
      className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      R
    </div>
  </div>
);

interface FadeInComponentProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeInComponent: React.FC<FadeInComponentProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[200]">
      <FadeInComponent>
        <div
          className={`w-full ${sizeClasses[size]} rounded-2xl shadow-2xl`}
          style={{ backgroundColor: colors.bgSecondary }}
        >
          {title && (
            <div
              className="p-6 border-b"
              style={{ borderColor: colors.border }}
            >
              <div className="flex items-center justify-between">
                <h2
                  className="text-xl font-bold"
                  style={{ color: colors.text }}
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                  style={{ color: colors.textSecondary }}
                >
                  <MdClose size={20} />
                </button>
              </div>
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </FadeInComponent>
    </div>
  );
};

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "confirm" | "danger";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <p className="mb-6" style={{ color: colors.textSecondary }}>
          {message}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            style={{
              backgroundColor:
                type === "danger" ? colors.error : colors.primary,
              color: "white",
            }}
          >
            {type === "danger" ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title: string;
  placeholder: string;
  defaultValue?: string;
}

const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  placeholder,
  defaultValue = "",
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, isOpen]);

  const handleSubmit = (): void => {
    if (value.trim()) {
      onSubmit(value.trim());
      onClose();
      setValue("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div>
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder={placeholder}
          className="w-full p-4 rounded-xl border-0 focus:outline-none focus:ring-2 transition-all duration-200 mb-4"
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
            boxShadow: `0 0 0 2px ${colors.border}`,
          }}
          onKeyPress={(e: React.KeyboardEvent) =>
            e.key === "Enter" && handleSubmit()
          }
          autoFocus
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
    }));

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(1, "#f4f4f5");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.2)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
};

interface ThreeSceneProps {
  furniture: FurnitureItem[];
  selectedFurniture: string | null;
  onSelectFurniture: (id: string | null) => void;
  onUpdateFurniture: (
    id: string,
    updates: Partial<Pick<FurnitureItem, "rotation" | "customSize">>
  ) => void;
  gridSize: number;
  zoomLevel: number;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  furniture,
  selectedFurniture,
  onSelectFurniture,
  onUpdateFurniture,
  gridSize,
  zoomLevel,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const furnitureMeshesRef = useRef<Record<string, THREE.Mesh>>({});
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const furnitureStateRef = useRef<FurnitureItem[]>(furniture);
  useEffect(() => {
    furnitureStateRef.current = furniture;
  }, [furniture]);

  const cameraPositionRef = useRef<{
    theta: number;
    phi: number;
    radius: number;
  }>({
    theta: Math.PI / 4,
    phi: Math.PI / 4,
    radius: 15,
  });

  const interactionStateRef = useRef<{
    mode: "none" | "camera" | "rotate" | "scale";
    lastPointer: { x: number; y: number };
    lastPinchDist: number;
    draggedItemId: string | null;
  }>({
    mode: "none",
    lastPointer: { x: 0, y: 0 },
    lastPinchDist: 0,
    draggedItemId: null,
  });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    scene.background = new THREE.Color(colors.bg);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const handleResize = (): void => {
      const width = container.clientWidth;
      const height = width;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(gridSize, gridSize),
      new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 30 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(gridSize, gridSize);
    (gridHelper.material as THREE.Material).color.setHex(0xcccccc);
    scene.add(gridHelper);

    const updateCameraPosition = (): void => {
      const camPos = cameraPositionRef.current;
      const distance = camPos.radius / zoomLevel;
      camera.position.x =
        distance * Math.sin(camPos.phi) * Math.cos(camPos.theta);
      camera.position.y = distance * Math.cos(camPos.phi);
      camera.position.z =
        distance * Math.sin(camPos.phi) * Math.sin(camPos.theta);
      camera.lookAt(0, 0, 0);
    };

    updateCameraPosition();

    const getPointer = (e: MouseEvent | TouchEvent) => {
      if (!rendererRef.current) throw new Error("Renderer not initialized");
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
      const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;
      return {
        x: clientX,
        y: clientY,
        canvasX: ((clientX - rect.left) / rect.width) * 2 - 1,
        canvasY: -((clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent): void => {
      if ("touches" in e) {
        e.preventDefault();
      }
      const interaction = interactionStateRef.current;
      setIsInteracting(true);

      if ("touches" in e && e.touches.length === 2 && selectedFurniture) {
        interaction.mode = "scale";
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        interaction.lastPinchDist = Math.hypot(
          t1.clientX - t2.clientX,
          t1.clientY - t2.clientY
        );
        interaction.draggedItemId = selectedFurniture;
      } else {
        const pointer = getPointer(e);
        interaction.lastPointer = { x: pointer.x, y: pointer.y };

        raycaster.current.setFromCamera(
          { x: pointer.canvasX, y: pointer.canvasY },
          camera
        );
        const intersects = raycaster.current.intersectObjects(
          Object.values(furnitureMeshesRef.current),
          true
        );
        const furnitureIntersect = intersects.find(
          (i) => i.object.userData.isFurniture
        );

        if (furnitureIntersect) {
          interaction.mode = "rotate";
          const objectId = furnitureIntersect.object.userData.id;
          interaction.draggedItemId = objectId;
          onSelectFurniture(objectId);
        } else {
          interaction.mode = "camera";
          onSelectFurniture(null);
        }
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent): void => {
      const interaction = interactionStateRef.current;
      if (interaction.mode === "none") return;
      if ("touches" in e) {
        e.preventDefault();
      }

      if (interaction.mode === "scale") {
        if (!("touches" in e) || e.touches.length < 2) return;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(
          t1.clientX - t2.clientX,
          t1.clientY - t2.clientY
        );

        if (interaction.lastPinchDist > 0 && interaction.draggedItemId) {
          const scaleFactor = currentDist / interaction.lastPinchDist;
          const item = furnitureStateRef.current.find(
            (f) => f.id === interaction.draggedItemId
          );
          if (item) {
            const furnitureType = FURNITURE_TYPES.find(
              (t) => t.id === item.type
            );
            if (!furnitureType) return;
            const currentSize = item.customSize || furnitureType.size;
            const newSize: [number, number, number] = [
              Math.max(0.1, currentSize[0] * scaleFactor),
              Math.max(0.1, currentSize[1] * scaleFactor),
              Math.max(0.1, currentSize[2] * scaleFactor),
            ];
            onUpdateFurniture(item.id, { customSize: newSize });
          }
        }
        interaction.lastPinchDist = currentDist;
        return;
      }

      const pointer = getPointer(e);
      const deltaX = pointer.x - interaction.lastPointer.x;
      const deltaY = pointer.y - interaction.lastPointer.y;

      if (interaction.mode === "camera") {
        const camPos = cameraPositionRef.current;
        camPos.theta -= deltaX * 0.005;
        camPos.phi -= deltaY * 0.005;
        camPos.phi = Math.max(0.1, Math.min(Math.PI - 0.1, camPos.phi));
        updateCameraPosition();
      } else if (interaction.mode === "rotate") {
        if (interaction.draggedItemId) {
          const item = furnitureStateRef.current.find(
            (f) => f.id === interaction.draggedItemId
          );
          if (item) {
            const newRotation = (item.rotation || 0) - deltaX * 0.02;
            onUpdateFurniture(item.id, { rotation: newRotation });
          }
        }
      }
      interaction.lastPointer = { x: pointer.x, y: pointer.y };
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent): void => {
      const interaction = interactionStateRef.current;

      if (
        interaction.mode === "scale" &&
        "touches" in e &&
        e.touches.length === 1
      ) {
        interaction.mode = "camera";
        interaction.lastPinchDist = 0;
        const pointer = getPointer(e);
        interaction.lastPointer = { x: pointer.x, y: pointer.y };
        return;
      }

      if (!("touches" in e) || e.touches.length === 0) {
        interaction.mode = "none";
        interaction.draggedItemId = null;
        interaction.lastPinchDist = 0;
        setIsInteracting(false);
      }
    };

    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      if (selectedFurniture) {
        const currentItem = furnitureStateRef.current.find(
          (item) => item.id === selectedFurniture
        );
        if (!currentItem) return;

        const furnitureType = FURNITURE_TYPES.find(
          (t) => t.id === currentItem.type
        );
        if (!furnitureType) return;
        const currentSize = currentItem.customSize || furnitureType.size;
        const scaleFactor = event.deltaY > 0 ? 0.95 : 1.05;
        const newSize: [number, number, number] = [
          Math.max(0.1, currentSize[0] * scaleFactor),
          Math.max(0.1, currentSize[1] * scaleFactor),
          Math.max(0.1, currentSize[2] * scaleFactor),
        ];
        onUpdateFurniture(selectedFurniture, { customSize: newSize });
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handlePointerDown);
    domElement.addEventListener("touchstart", handlePointerDown, {
      passive: false,
    });
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);
    domElement.addEventListener("wheel", handleWheel, { passive: false });

    const animate = (): void => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container && domElement) {
        try {
          container.removeChild(domElement);
        } catch (e) {}
      }
      domElement.removeEventListener("mousedown", handlePointerDown);
      domElement.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
      domElement.removeEventListener("wheel", handleWheel);
      renderer.dispose();
    };
  }, [
    gridSize,
    zoomLevel,
    onSelectFurniture,
    onUpdateFurniture,
    selectedFurniture,
  ]);

  useEffect(() => {
    if (!sceneRef.current) return;

    Object.values(furnitureMeshesRef.current).forEach((mesh) =>
      sceneRef.current!.remove(mesh)
    );
    furnitureMeshesRef.current = {};

    furniture.forEach((item) => {
      const furnitureType = FURNITURE_TYPES.find((t) => t.id === item.type);
      if (!furnitureType) return;

      const size = item.customSize || furnitureType.size;
      const geometry = new THREE.BoxGeometry(...size);
      const material = new THREE.MeshPhongMaterial({
        color: item.color || furnitureType.color,
        shininess: 30,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(item.position.x, size[1] / 2, item.position.z);
      mesh.rotation.y = item.rotation || 0;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: item.id, isFurniture: true };

      if (selectedFurniture === item.id) {
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: colors.primary, linewidth: 2 })
        );
        mesh.add(line);
      }

      sceneRef.current!.add(mesh);
      furnitureMeshesRef.current[item.id] = mesh;
    });
  }, [furniture, selectedFurniture]);

  useEffect(() => {
    const camPos = cameraPositionRef.current;
    const distance = camPos.radius / zoomLevel;
    if (!cameraRef.current) return;
    cameraRef.current.position.x =
      distance * Math.sin(camPos.phi) * Math.cos(camPos.theta);
    cameraRef.current.position.y = distance * Math.cos(camPos.phi);
    cameraRef.current.position.z =
      distance * Math.sin(camPos.phi) * Math.sin(camPos.theta);
    cameraRef.current.lookAt(0, 0, 0);
  }, [zoomLevel]);

  return (
    <div
      ref={mountRef}
      className="rounded-xl overflow-hidden shadow-lg w-full"
      style={{ cursor: isInteracting ? "grabbing" : "grab" }}
    />
  );
};

interface ProjectGalleryProps {
  onClose: () => void;
  onLoadProject: (project: Project) => void;
  projects: Project[];
  onDeleteProject: (projectId: string) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onClose,
  onLoadProject,
  projects,
  onDeleteProject,
}) => {
  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);

  return (
    <Modal isOpen={true} onClose={onClose} title="My Projects" size="xl">
      <div>
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <MdImage
              size={48}
              style={{ color: colors.textMuted }}
              className="mx-auto mb-4"
            />
            <p style={{ color: colors.textSecondary }}>No projects saved yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                }}
              >
                <h3
                  className="font-semibold mb-2"
                  style={{ color: colors.text }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: colors.textSecondary }}
                >
                  {project.furniture?.length || 0} items •{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onLoadProject(project)}
                    className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    style={{ backgroundColor: colors.primary, color: "white" }}
                  >
                    Load
                  </button>
                  <button
                    onClick={() => setConfirmDelete(project)}
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                    style={{ color: colors.error }}
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmModal
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => {
            onDeleteProject(confirmDelete!.id);
            setConfirmDelete(null);
          }}
          title="Delete Project"
          message={`Are you sure you want to delete "${confirmDelete?.name}"? This action cannot be undone.`}
          type="danger"
        />
      )}
    </Modal>
  );
};

interface HomepageProps {
  onGetStarted: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onGetStarted }) => {
  const stats = [
    { icon: MdPeople, label: "Active Users", value: "10K+" },
    { icon: MdLayers, label: "Projects Created", value: "50K+" },
    { icon: MdStar, label: "User Rating", value: "4.9/5" },
    { icon: MdBolt, label: "Time Saved", value: "80%" },
  ];

  const features = [
    {
      icon: MdGpsFixed,
      title: "Drag & Drop Interface",
      description: "Intuitive design tools that make room planning effortless",
    },
    {
      icon: MdVisibility,
      title: "3D Visualization",
      description: "See your designs come to life with realistic 3D rendering",
    },
    {
      icon: MdPalette,
      title: "Dynamic Customization",
      description:
        "Change the color/material and size of any item in real-time to perfectly match your style.",
    },
  ];

  const steps: { step: number; title: string; description: string }[] = [
    {
      step: 1,
      title: "Open the Editor",
      description: "Click 'Get Started' to jump right into the action.",
    },
    {
      step: 2,
      title: "Add Furniture",
      description: "Drag and drop furniture pieces into your room",
    },
    {
      step: 3,
      title: "Customize & Export",
      description: "Adjust colors, sizes, and export your design",
    },
  ];

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: "100vh" }}>
      <AnimatedBackground />

      <FadeInComponent delay={50}>
        <header
          className="sticky top-0 z-10 p-4 border-b backdrop-blur-sm"
          style={{
            backgroundColor: colors.bgSecondary + "f0",
            borderColor: colors.border,
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <h1 className="text-xl font-bold" style={{ color: colors.text }}>
                Room Designer
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                style={{ backgroundColor: colors.primary, color: "white" }}
              >
                <MdArrowForward size={18} />
              </button>
            </div>
          </div>
        </header>
      </FadeInComponent>

      <main className="relative z-10">
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-8 items-center">
              <FadeInComponent delay={400}>
                <div className="relative">
                  <div
                    className="w-full h-64 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                    style={{
                      boxShadow: `0 25px 50px -12px ${colors.shadow}`,
                    }}
                  >
                    <div className="text-white text-center p-4">
                      <MdGridOn size={60} className="mx-auto mb-4 opacity-80" />
                      <h3 className="text-xl font-bold mb-2">
                        3D Room Designer
                      </h3>
                      <p className="text-base opacity-90">
                        Visualize your ideas in real-time
                      </p>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full opacity-80 animate-pulse"></div>
                </div>
              </FadeInComponent>
              <FadeInComponent delay={200}>
                <div className="space-y-6 text-center">
                  <div className="space-y-4">
                    <h1
                      className="text-4xl font-bold leading-tight"
                      style={{ color: colors.text }}
                    >
                      Design Your
                      <span className="block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        Perfect Room
                      </span>
                    </h1>
                    <p
                      className="text-lg leading-relaxed"
                      style={{ color: colors.textSecondary }}
                    >
                      Create stunning room layouts with our intuitive 3D
                      designer. Drag, drop, and visualize your dream space in
                      real-time.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={onGetStarted}
                      className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                      style={{
                        backgroundColor: colors.primary,
                        color: "white",
                      }}
                    >
                      <MdAutoAwesome size={20} />
                      Start Designing
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6">
                    {stats.map((stat, index) => (
                      <FadeInComponent key={index} delay={400 + index * 100}>
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            <stat.icon
                              size={24}
                              style={{ color: colors.primary }}
                            />
                          </div>
                          <div
                            className="text-xl font-bold"
                            style={{ color: colors.text }}
                          >
                            {stat.value}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: colors.textSecondary }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      </FadeInComponent>
                    ))}
                  </div>
                </div>
              </FadeInComponent>
            </div>
          </div>
        </section>

        <section
          className="py-10 px-4"
          style={{ backgroundColor: colors.bgSecondary }}
        >
          <div className="max-w-6xl mx-auto">
            <FadeInComponent delay={100}>
              <div className="text-center mb-12">
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: colors.text }}
                >
                  Why Choose Room Designer?
                </h2>
                <p className="text-lg" style={{ color: colors.textSecondary }}>
                  Powerful features that make room design simple and fun
                </p>
              </div>
            </FadeInComponent>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <FadeInComponent key={index} delay={200 + index * 100}>
                  <div
                    className="p-6 rounded-2xl text-center transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <div className="flex justify-center mb-6">
                      <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: colors.primaryLight }}
                      >
                        <feature.icon
                          size={32}
                          style={{ color: colors.primary }}
                        />
                      </div>
                    </div>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: colors.text }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: colors.textSecondary }}>
                      {feature.description}
                    </p>
                  </div>
                </FadeInComponent>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeInComponent delay={100}>
              <div className="text-center mb-12">
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: colors.text }}
                >
                  How It Works
                </h2>
                <p className="text-lg" style={{ color: colors.textSecondary }}>
                  Get started in just 3 simple steps
                </p>
              </div>
            </FadeInComponent>

            <div className="grid grid-cols-1 gap-6">
              {steps.map((step, index) => (
                <FadeInComponent key={index} delay={200 + index * 100}>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {step.step}
                    </div>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: colors.text }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ color: colors.textSecondary }}>
                      {step.description}
                    </p>
                  </div>
                </FadeInComponent>
              ))}
            </div>
          </div>
        </section>

        <section
          className="py-10 px-4"
          style={{ backgroundColor: colors.bgSecondary }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <FadeInComponent delay={100}>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.text }}
              >
                Ready to Design Your Dream Room?
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: colors.textSecondary }}
              >
                Join thousands of users who are already creating amazing spaces
                with Room Designer
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-3 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                style={{ backgroundColor: colors.primary, color: "white" }}
              >
                <MdAutoAwesome size={24} />
                Start Now
                <MdArrowForward size={20} />
              </button>
            </FadeInComponent>
          </div>
        </section>
      </main>

      <footer
        className="py-8 px-4 border-t z-30 relative"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo size={32} />
            <span className="text-lg font-bold" style={{ color: colors.text }}>
              Room Designer
            </span>
          </div>
          <p
            style={{ color: colors.textMuted }}
            className="flex justify-center items-center text-sm"
          >
            2025 Room Designer. Made with{" "}
            <span className="mx-2">
              <MdFavorite fill="#ff0015" />
            </span>{" "}
            for creative minds.
          </p>
        </div>
      </footer>
    </div>
  );
};

const RoomLayoutEditor: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "editor">("home");
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(
    null
  );
  const [gridSize, setGridSize] = useState<number>(10);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const floorPlanRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.userSelect = "none";

    const savedProjects = storage.get<Project[]>("roomDesigner_projects") || [];
    if (savedProjects.length > 0) {
      const latestProject = savedProjects[savedProjects.length - 1];
      setFurniture(latestProject.furniture || []);
      setGridSize(latestProject.gridSize || 10);
    }

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      document.body.style.userSelect = "auto";
    };
  }, []);

  const handleGetStarted = (): void => {
    setCurrentPage("editor");
  };

  const addFurniture = useCallback(
    (type: string, position: FurniturePosition): void => {
      const furnitureType = FURNITURE_TYPES.find((t) => t.id === type);
      if (!furnitureType) return;

      const newFurniture: FurnitureItem = {
        id: Date.now().toString(),
        type: type,
        position: position,
        rotation: 0,
        color: furnitureType.color,
        customSize: null,
      };

      setFurniture((prev) => [...prev, newFurniture]);
      setShowMobileMenu(false);
      toast.success(`${furnitureType.name} added!`);
    },
    []
  );

  const deleteFurniture = (id: string): void => {
    setFurniture((prev) => prev.filter((item) => item.id !== id));
    setSelectedFurniture(null);
    toast.success("Furniture deleted");
  };

  const saveProject = (projectName: string): void => {
    const savedProjects = storage.get<Project[]>("roomDesigner_projects") || [];
    const project: Project = {
      id: Date.now().toString(),
      name: projectName,
      furniture: furniture,
      gridSize: gridSize,
      createdAt: new Date().toISOString(),
    };

    const updatedProjects = [...savedProjects, project];
    storage.set("roomDesigner_projects", updatedProjects);
    toast.success("Project saved successfully!");
  };

  const loadProject = (project: Project): void => {
    setFurniture(project.furniture || []);
    setGridSize(project.gridSize || 10);
    setShowGallery(false);
    setShowMobileMenu(false);
    toast.success(`Project "${project.name}" loaded!`);
  };

  const deleteProject = (projectId: string): void => {
    const savedProjects = storage.get<Project[]>("roomDesigner_projects") || [];
    const updatedProjects = savedProjects.filter((p) => p.id !== projectId);
    storage.set("roomDesigner_projects", updatedProjects);
    toast.success("Project deleted successfully!");
  };

  const exportData = (): void => {
    const data = {
      furniture,
      gridSize,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `room-layout-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Project exported successfully!");
  };

  const newProject = (): void => {
    setFurniture([]);
    setSelectedFurniture(null);
    setGridSize(10);
    setZoomLevel(1);
    toast.success("New project started!");
  };

  const checkCollision = useCallback(
    (
      item1: FurnitureItem,
      item2: FurnitureItem,
      excludeId: string | null = null
    ): boolean => {
      if (item2.id === excludeId) return false;

      const getTransformedCorners = (item: FurnitureItem) => {
        const type = FURNITURE_TYPES.find((t) => t.id === item.type);
        if (!type) return [];
        const size = item.customSize || type.size;
        const w = size[0] / 2;
        const d = size[2] / 2;
        const { x, z } = item.position;
        const angle = item.rotation || 0;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const corners = [
          { x: -w, z: -d },
          { x: w, z: -d },
          { x: w, z: d },
          { x: -w, z: d },
        ];

        return corners.map((corner) => ({
          x: x + corner.x * cos - corner.z * sin,
          z: z + corner.x * sin + corner.z * cos,
        }));
      };

      const getAxes = (corners: { x: number; z: number }[]) => {
        const axes: { x: number; z: number }[] = [];
        for (let i = 0; i < corners.length; i++) {
          const p1 = corners[i];
          const p2 = corners[(i + 1) % corners.length];
          const edge = { x: p2.x - p1.x, z: p2.z - p1.z };
          const normal = { x: -edge.z, z: edge.x };
          const length = Math.sqrt(normal.x * normal.x + normal.z * normal.z);
          if (length > 0)
            axes.push({ x: normal.x / length, z: normal.z / length });
        }
        return axes;
      };

      const project = (
        corners: { x: number; z: number }[],
        axis: { x: number; z: number }
      ) => {
        let min = Infinity,
          max = -Infinity;
        for (const corner of corners) {
          const dotProduct = corner.x * axis.x + corner.z * axis.z;
          min = Math.min(min, dotProduct);
          max = Math.max(max, dotProduct);
        }
        return { min, max };
      };

      const corners1 = getTransformedCorners(item1);
      const corners2 = getTransformedCorners(item2);

      const axes = [...getAxes(corners1), ...getAxes(corners2)];

      for (const axis of axes) {
        const p1 = project(corners1, axis);
        const p2 = project(corners2, axis);
        if (p1.max < p2.min || p2.max < p1.min) {
          return false;
        }
      }
      return true;
    },
    []
  );

  const updateFurniture = useCallback(
    (id: string, updates: Partial<FurnitureItem>): void => {
      setFurniture((prev) => {
        const originalItem = prev.find((item) => item.id === id);
        if (!originalItem) return prev;

        const updatedItem = { ...originalItem, ...updates };

        const isColliding = prev.some((otherItem) => {
          if (otherItem.id === id) return false;
          return checkCollision(updatedItem, otherItem);
        });

        if (isColliding) {
          return prev;
        }

        return prev.map((item) => (item.id === id ? updatedItem : item));
      });
    },
    [checkCollision]
  );

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    item: FurnitureItem | FurnitureType,
    mode: "add" | "move"
  ): void => {
    e.preventDefault();
    e.stopPropagation();

    const clientX = "clientX" in e ? e.clientX : e.touches?.[0]?.clientX;
    const clientY = "clientY" in e ? e.clientY : e.touches?.[0]?.clientY;

    if (clientX === undefined || clientY === undefined) return;

    let initialItem: FurnitureItem & { size?: [number, number, number] };
    let initialPosition: FurniturePosition | null = null;

    if (mode === "add" && "size" in item) {
      const type = FURNITURE_TYPES.find((t) => t.id === item.id);
      if (!type) return;
      initialItem = {
        id: `ghost-${Date.now()}`,
        type: item.id,
        size: type.size,
        color: type.color,
        position: { x: 0, z: 0 },
        rotation: 0,
        customSize: null,
      };
    } else if (mode === "move" && "position" in item) {
      initialItem = { ...item };
      initialPosition = item.position;
      setSelectedFurniture(item.id);
    } else {
      return;
    }

    setDragState({
      mode,
      item: initialItem,
      initialPosition,
      startX: clientX,
      startY: clientY,
      colliding: false,
      isOverFloor: false,
    });
  };

  useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent): void => {
      if (!dragState) return;

      if ("touches" in e) {
        e.preventDefault();
      }

      const clientX = "clientX" in e ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = "clientY" in e ? e.clientY : e.touches?.[0]?.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const scrollThreshold = window.innerHeight * 0.15;
      const scrollSpeed = 15;

      if (clientY < scrollThreshold) {
        window.scrollBy(0, -scrollSpeed);
      } else if (clientY > window.innerHeight - scrollThreshold) {
        window.scrollBy(0, scrollSpeed);
      }

      const floorEl = floorPlanRef.current;
      if (!floorEl) return;

      const rect = floorEl.getBoundingClientRect();
      const isOverFloor =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      let newPosition = dragState.item.position;
      let isColliding = false;

      if (isOverFloor) {
        const x = clientX - rect.left;
        const z = clientY - rect.top;

        const gridX = (x / rect.width) * gridSize - gridSize / 2;
        const gridZ = (z / rect.height) * gridSize - gridSize / 2;

        newPosition = { x: gridX, z: gridZ };
        const ghostItem = { ...dragState.item, position: newPosition };

        isColliding = furniture.some((item) =>
          checkCollision(
            ghostItem,
            item,
            dragState.mode === "move" ? dragState.item.id : null
          )
        );
      }

      setDragState((prev) =>
        prev
          ? {
              ...prev,
              item: { ...prev.item, position: newPosition },
              isOverFloor,
              colliding: isColliding,
            }
          : null
      );
    };

    const handleDragEnd = (): void => {
      if (!dragState) return;

      if (dragState.isOverFloor && !dragState.colliding) {
        if (dragState.mode === "add") {
          addFurniture(dragState.item.type, dragState.item.position);
        } else {
          updateFurniture(dragState.item.id, {
            position: dragState.item.position,
          });
        }
      } else if (dragState.colliding) {
        toast.error("Cannot place furniture here!");
        if (dragState.mode === "move" && dragState.initialPosition) {
          updateFurniture(dragState.item.id, {
            position: dragState.initialPosition,
          });
        }
      } else if (dragState.mode === "move" && dragState.initialPosition) {
        updateFurniture(dragState.item.id, {
          position: dragState.initialPosition,
        });
      }

      setDragState(null);
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [
    dragState,
    furniture,
    gridSize,
    addFurniture,
    updateFurniture,
    checkCollision,
  ]);

  if (currentPage === "home") {
    return <Homepage onGetStarted={handleGetStarted} />;
  }

  const draggedItemOnFloor =
    dragState && dragState.isOverFloor ? dragState.item : null;

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: "100vh" }}>
      <div
        className="sticky top-0 z-20 p-4 border-b backdrop-blur-sm"
        style={{
          backgroundColor: colors.bgSecondary + "f0",
          borderColor: colors.border,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size={32} />
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center gap-2 p-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              style={{
                backgroundColor: colors.bgTertiary,
                color: colors.text,
              }}
            >
              <MdHome size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSaveModal(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.success, color: "white" }}
            >
              <MdAdd size={16} />
              Save
            </button>
            <button
              onClick={() => setShowGallery(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              <MdImage size={16} />
              My Projects
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
              style={{
                backgroundColor: colors.bgTertiary,
                color: colors.text,
              }}
            >
              <MdMenu size={20} />
            </button>
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div
          className="fixed inset-x-0 top-20 z-30 mx-4 p-4 rounded-xl shadow-xl border backdrop-blur-sm"
          style={{
            backgroundColor: colors.bgSecondary + "f0",
            borderColor: colors.border,
          }}
        >
          <div className="space-y-3">
            <button
              onClick={() => {
                newProject();
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              <MdAdd size={18} />
              New Project
            </button>
            <button
              onClick={() => {
                exportData();
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text,
              }}
            >
              <MdDownload size={18} />
              Export
            </button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="space-y-6">
          <FadeInComponent delay={300}>
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.bgSecondary }}
            >
              <h2
                className="text-lg font-semibold mb-3"
                style={{ color: colors.text }}
              >
                3D Preview
              </h2>
              <ThreeScene
                furniture={furniture}
                selectedFurniture={selectedFurniture}
                onSelectFurniture={setSelectedFurniture}
                onUpdateFurniture={updateFurniture}
                gridSize={gridSize}
                zoomLevel={zoomLevel}
              />
              <p
                className="text-sm mt-2 text-center"
                style={{ color: colors.textMuted }}
              >
                Drag to rotate view or furniture. Use mouse wheel or pinch
                gesture on a selected item to resize it.
              </p>
            </div>
          </FadeInComponent>

          <FadeInComponent delay={400}>
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.bgSecondary }}
            >
              <h2
                className="text-lg font-semibold mb-3"
                style={{ color: colors.text }}
              >
                Floor Plan
              </h2>
              <div
                className="relative mx-auto aspect-square border-2 rounded-lg overflow-hidden"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.bg,
                  backgroundImage: `linear-gradient(${colors.border} 1px, transparent 1px), linear-gradient(to right, ${colors.border} 1px, transparent 1px)`,
                  backgroundSize: `${100 / gridSize}% ${100 / gridSize}%`,
                }}
                ref={floorPlanRef}
              >
                {furniture.map((item) => {
                  const furnitureType = FURNITURE_TYPES.find(
                    (t) => t.id === item.type
                  );
                  if (!furnitureType) return null;
                  const itemSize = item.customSize || furnitureType.size;
                  const width = (itemSize[0] / gridSize) * 100;
                  const depth = (itemSize[2] / gridSize) * 100;
                  const x = ((item.position.x + gridSize / 2) / gridSize) * 100;
                  const z = ((item.position.z + gridSize / 2) / gridSize) * 100;

                  return (
                    <div
                      key={item.id}
                      className="absolute rounded-md border-2 transition-all duration-200 flex items-center justify-center text-sm font-semibold cursor-grab active:cursor-grabbing"
                      style={{
                        backgroundColor: `${
                          item.color || furnitureType.color
                        }CC`,
                        borderColor:
                          selectedFurniture === item.id
                            ? colors.primary
                            : "rgba(0,0,0,0.3)",
                        width: `${width}%`,
                        height: `${depth}%`,
                        left: `${x}%`,
                        top: `${z}%`,
                        transform: `translate(-50%, -50%) rotate(${
                          (-1 * (item.rotation || 0) * 180) / Math.PI
                        }deg)`,
                        color: "white",
                        textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                        boxShadow:
                          selectedFurniture === item.id
                            ? `0 0 12px ${colors.primary}80`
                            : "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                      onMouseDown={(e) => handleDragStart(e, item, "move")}
                      onTouchStart={(e) => handleDragStart(e, item, "move")}
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation();
                        setSelectedFurniture(item.id);
                      }}
                    >
                      {furnitureType.name.charAt(0)}
                    </div>
                  );
                })}
                {draggedItemOnFloor && (
                  <div
                    className="absolute rounded-md border-2 pointer-events-none"
                    style={{
                      backgroundColor: dragState.colliding
                        ? `${colors.error}99`
                        : `${draggedItemOnFloor.color}99`,
                      borderColor: dragState.colliding
                        ? colors.error
                        : colors.success,
                      width: `${
                        ((draggedItemOnFloor.customSize ||
                          FURNITURE_TYPES.find(
                            (t) => t.id === draggedItemOnFloor.type
                          )!.size)[0] /
                          gridSize) *
                        100
                      }%`,
                      height: `${
                        ((draggedItemOnFloor.customSize ||
                          FURNITURE_TYPES.find(
                            (t) => t.id === draggedItemOnFloor.type
                          )!.size)[2] /
                          gridSize) *
                        100
                      }%`,
                      left: `${
                        ((draggedItemOnFloor.position.x + gridSize / 2) /
                          gridSize) *
                        100
                      }%`,
                      top: `${
                        ((draggedItemOnFloor.position.z + gridSize / 2) /
                          gridSize) *
                        100
                      }%`,
                      transform: `translate(-50%, -50%) rotate(${
                        (-1 * (draggedItemOnFloor.rotation || 0) * 180) /
                        Math.PI
                      }deg)`,
                      transition: "background-color 0.2s, border-color 0.2s",
                      zIndex: 100,
                    }}
                  />
                )}
              </div>
              <p
                className="text-sm mt-3 text-center"
                style={{ color: colors.textMuted }}
              >
                Drag a furniture item from the list to add it. Drag an item on
                the floor plan to move it.
              </p>
            </div>
          </FadeInComponent>

          <FadeInComponent delay={200}>
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: colors.bgSecondary }}
            >
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: colors.text }}
              >
                Add Furniture
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {FURNITURE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onMouseDown={(e: any) => handleDragStart(e, type, "add")}
                    onTouchStart={(e: any) => handleDragStart(e, type, "add")}
                    className="p-4 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg text-left cursor-grab active:cursor-grabbing"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      border: `2px solid ${colors.border}`,
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.borderColor = colors.borderHover)
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.borderColor = colors.border)
                    }
                  >
                    <div className="flex items-center gap-3 pointer-events-none">
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: type.color }}
                      />
                      <span>{type.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </FadeInComponent>

          {selectedFurniture && (
            <FadeInComponent delay={500}>
              <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.bgSecondary }}
              >
                <h2
                  className="text-lg font-semibold mb-5"
                  style={{ color: colors.text }}
                >
                  Edit Furniture
                </h2>
                <div className="space-y-5">
                  <div>
                    <label
                      className="font-medium text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      Material / Color
                    </label>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {[
                        "#8B4513",
                        "#654321",
                        "#2F4F4F",
                        "#4682B4",
                        "#8B0000",
                        "#006400",
                        "#8B008B",
                      ].map((c) => {
                        const currentColor = furniture.find(
                          (f) => f.id === selectedFurniture
                        )?.color;
                        return (
                          <button
                            key={c}
                            onClick={() =>
                              updateFurniture(selectedFurniture, { color: c })
                            }
                            className="w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 focus:outline-none"
                            style={{
                              backgroundColor: c,
                              borderColor:
                                currentColor === c
                                  ? colors.primary
                                  : "transparent",
                              boxShadow: `0 0 0 1px ${colors.border}`,
                            }}
                          />
                        );
                      })}
                      <div
                        className="relative w-8 h-8 rounded-full border-2"
                        style={{
                          borderColor: "transparent",
                          boxShadow: `0 0 0 1px ${colors.border}`,
                        }}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{
                            backgroundColor:
                              furniture.find((f) => f.id === selectedFurniture)
                                ?.color || "#ffffff",
                          }}
                        />
                        <input
                          type="color"
                          value={
                            furniture.find((f) => f.id === selectedFurniture)
                              ?.color || "#ffffff"
                          }
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateFurniture(selectedFurniture, {
                              color: e.target.value,
                            })
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      className="font-medium text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      Actions
                    </label>
                    <button
                      onClick={() => deleteFurniture(selectedFurniture)}
                      className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        backgroundColor: colors.error,
                        color: "white",
                      }}
                    >
                      <MdDelete size={20} />
                      <span>Delete Furniture</span>
                    </button>
                  </div>
                </div>
              </div>
            </FadeInComponent>
          )}
        </div>
      </div>
      <InputModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSubmit={saveProject}
        title="Save Project"
        placeholder="Enter project name..."
      />
      {showGallery && (
        <ProjectGallery
          onClose={() => setShowGallery(false)}
          onLoadProject={loadProject}
          projects={storage.get<Project[]>("roomDesigner_projects") || []}
          onDeleteProject={deleteProject}
        />
      )}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </div>
  );
};

export default RoomLayoutEditor;
