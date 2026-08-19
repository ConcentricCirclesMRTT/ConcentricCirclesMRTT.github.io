import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRight, Columns2, GalleryHorizontal, Maximize2, RotateCcw, RotateCw, ScanLine } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL = "/neube-sr-showcase/assets/models/complete-tower-head.glb";

export function TowerModelViewer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetViewRef = useRef<() => void>(() => undefined);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const hasPlayedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [sequenceActive, setSequenceActive] = useState(false);
  const [sequencePhase, setSequencePhase] = useState<"waiting" | "playing" | "revealed">("waiting");
  const [countdown, setCountdown] = useState(3);
  const [sequencePaused, setSequencePaused] = useState(false);
  const [displayMode, setDisplayMode] = useState<"carousel" | "split">("carousel");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasPlayedRef.current) return;
        hasPlayedRef.current = true;
        setSequenceActive(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(stage);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (displayMode !== "carousel" || !sequenceActive || sequencePhase !== "waiting" || sequencePaused) return;

    const countdownTimer = window.setTimeout(() => {
      if (countdown <= 1) {
        setCountdown(0);
        setSequencePhase("playing");
        return;
      }
      setCountdown((value) => value - 1);
    }, 1000);

    return () => window.clearTimeout(countdownTimer);
  }, [countdown, displayMode, sequenceActive, sequencePaused, sequencePhase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let animationFrame = 0;
    const modelMaterials: THREE.MeshStandardMaterial[] = [];

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x171a1c, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.55;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.7;
    controls.screenSpacePanning = true;
    controlsRef.current = controls;

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    scene.add(new THREE.HemisphereLight(0xf4f1e8, 0x25343b, 3.8));

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.8);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x62c7d9, 3.2);
    rimLight.position.set(-8, 7, -9);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) {
          gltf.scene.traverse((object) => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
          return;
        }

        const model = gltf.scene;
        const modelFrame = new THREE.Group();
        modelFrame.add(model);
        modelRef.current = modelFrame;
        const palette = [0x42a5d5, 0x58b957, 0xf39b27, 0x20b8b4, 0x8f5bd4, 0xef413d];
        let meshIndex = 0;
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const color = palette[meshIndex++ % palette.length];
          const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.34, roughness: 0.48, metalness: 0.18, side: THREE.DoubleSide });
          object.material = material;
          modelMaterials.push(material);
        });

        modelFrame.updateMatrixWorld(true);
        // This engineering export uses Z-up coordinates. The tower head is
        // wider than it is tall, so longest-axis inference would rotate it
        // incorrectly; map its known vertical axis directly to Three.js Y.
        modelFrame.rotation.x = -Math.PI / 2;
        modelFrame.updateMatrixWorld(true);
        const orientedBounds = new THREE.Box3().setFromObject(modelFrame);
        const orientedSize = orientedBounds.getSize(new THREE.Vector3());
        const sourceMax = Math.max(orientedSize.x, orientedSize.y, orientedSize.z);
        if (!Number.isFinite(sourceMax) || sourceMax <= 0) throw new Error("GLB has no visible geometry");
        modelFrame.scale.setScalar(12 / sourceMax);
        modelFrame.updateMatrixWorld(true);
        const scaledCenter = new THREE.Box3().setFromObject(modelFrame).getCenter(new THREE.Vector3());
        modelFrame.position.sub(scaledCenter);
        modelFrame.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(modelFrame);
        const size = bounds.getSize(new THREE.Vector3());
        const target = bounds.getCenter(new THREE.Vector3());
        const radius = bounds.getBoundingSphere(new THREE.Sphere()).radius;
        const distance = radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2));
        scene.add(modelFrame);

        const resetView = () => {
          const direction = new THREE.Vector3(1, 0.22, 1).normalize();
          camera.position.copy(target).add(direction.multiplyScalar(distance));
          camera.near = Math.max(0.01, distance / 1000);
          camera.far = distance * 12;
          camera.updateProjectionMatrix();
          controls.target.copy(target);
          controls.minDistance = distance * 0.18;
          controls.maxDistance = distance * 2.6;
          controls.update();
        };

        resetViewRef.current = resetView;
        resetView();
        setLoading(false);
      },
      undefined,
      () => {
        if (!disposed) {
          setLoading(false);
          setError(true);
        }
      },
    );

    const resizeObserver = new ResizeObserver(() => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(canvas);

    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      modelMaterials.forEach((material) => material.dispose());
      renderer.dispose();
      controlsRef.current = null;
      modelRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshStandardMaterial) object.material.wireframe = wireframe;
      });
    }
  }, [wireframe]);

  const replayTransformation = () => {
    setSequencePaused(false);
    setCountdown(3);
    setSequencePhase("waiting");
    setSequenceActive(true);
  };

  const showModelPage = () => {
    setSequencePaused(false);
    setSequenceActive(true);
    setSequencePhase("revealed");
  };

  const pauseTransformation = (event: PointerEvent<HTMLDivElement>) => {
    if (!sequenceActive || sequencePhase === "revealed") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSequencePaused(true);
  };

  const resumeTransformation = (event: PointerEvent<HTMLDivElement>) => {
    if (!sequencePaused) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setSequencePaused(false);
  };

  return (
    <div
      className={`tower-viewer mode-${displayMode}`}
      ref={stageRef}
      onPointerDown={pauseTransformation}
      onPointerUp={resumeTransformation}
      onPointerCancel={resumeTransformation}
    >
      <div className="viewer-mode-switch" aria-label="展示方式" onPointerDown={(event) => event.stopPropagation()}>
        <button
          className={displayMode === "carousel" ? "is-active" : ""}
          onClick={() => setDisplayMode("carousel")}
          aria-pressed={displayMode === "carousel"}
          aria-label="滑页展示"
          title="滑页展示"
        >
          <GalleryHorizontal size={17} />
        </button>
        <button
          className={displayMode === "split" ? "is-active" : ""}
          onClick={() => setDisplayMode("split")}
          aria-pressed={displayMode === "split"}
          aria-label="并排展示"
          title="并排展示"
        >
          <Columns2 size={17} />
        </button>
      </div>

      <div
        className={`viewer-track is-${sequencePhase} ${sequencePaused ? "is-paused" : ""}`}
        onAnimationEnd={() => {
          if (displayMode === "carousel" && sequencePhase === "playing") setSequencePhase("revealed");
        }}
      >
        <div className="viewer-slide drawing-slide" aria-hidden={displayMode === "carousel" && sequencePhase === "revealed"}>
          {displayMode === "carousel" && sequenceActive && sequencePhase !== "revealed" && (
            <div className="drawing-reveal-status" aria-live="polite">
              <span>{sequencePaused ? "PAUSED" : sequencePhase === "playing" ? "COMPILING" : "GENERATING IN"}</span>
              <strong>{sequencePhase === "waiting" ? String(countdown).padStart(2, "0") : sequencePaused ? "II" : "→"}</strong>
            </div>
          )}
          <div className="drawing-reveal-visual">
            <img src="/images/complete-tower-head-drawing.png" alt="完整塔头多视图工程图纸" />
          </div>
          <div className="drawing-reveal-copy">
            <span>INPUT / ENGINEERING DRAWING</span>
            <strong>把这张工程图<br />变成三维几何</strong>
            <ArrowRight size={30} strokeWidth={1.5} />
          </div>
        </div>

        <div className="viewer-slide model-slide">
          <canvas ref={canvasRef} aria-label="可交互的完整角钢塔塔头三维模型" />
          <div className="viewer-label">
            <span>INTERACTIVE GLB / COMPLETE TOWER HEAD</span>
            <strong>完整塔头重构</strong>
          </div>
          <button
            className={`viewer-replay ${displayMode === "carousel" && sequencePhase === "revealed" ? "is-visible" : ""}`}
            onClick={replayTransformation}
            aria-label="重播图纸到三维的转换"
            title="重播转换"
          >
            <RotateCcw size={18} />
          </button>
          <div className="viewer-toolbar" aria-label="三维模型控制">
            <button
              className={autoRotate ? "is-active" : ""}
              onClick={() => setAutoRotate((value) => !value)}
              aria-pressed={autoRotate}
              aria-label="切换自动旋转"
              title="自动旋转"
            >
              <RotateCw size={18} />
            </button>
            <button
              className={wireframe ? "is-active" : ""}
              onClick={() => setWireframe((value) => !value)}
              aria-pressed={wireframe}
              aria-label="切换线框模式"
              title="线框模式"
            >
              <ScanLine size={18} />
            </button>
            <button onClick={() => resetViewRef.current()} aria-label="复位三维视角" title="复位视角">
              <Maximize2 size={18} />
            </button>
          </div>
          {loading && <div className="viewer-status">正在载入模型...</div>}
          {error && <div className="viewer-status is-error">模型载入失败</div>}
        </div>
      </div>

      {displayMode === "carousel" && (
        <div className="viewer-pagination" aria-label="样例页面" onPointerDown={(event) => event.stopPropagation()}>
          <button
            className={sequencePhase !== "revealed" ? "is-active" : ""}
            onClick={replayTransformation}
            aria-label="查看二维工程图"
          />
          <button
            className={sequencePhase === "revealed" ? "is-active" : ""}
            onClick={showModelPage}
            aria-label="查看三维模型"
          />
        </div>
      )}
    </div>
  );
}
