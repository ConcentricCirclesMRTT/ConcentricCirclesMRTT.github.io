import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL = "/neube-sr-showcase/assets/models/tower-assembly-1-6-s1602.glb";

export function LongContextTowerViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pivotRef = useRef<THREE.Group | null>(null);
  const rotatingRef = useRef(true);
  const resetRef = useRef<() => void>(() => undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rotating, setRotating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let animationFrame = 0;
    const materials: THREE.Material[] = [];
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x101916, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100000);
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controlsRef.current = controls;

    scene.add(new THREE.HemisphereLight(0xf6fff9, 0x21342c, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 3.4);
    key.position.set(6, 9, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8fd4bf, 2.2);
    rim.position.set(-6, 4, -5);
    scene.add(rim);

    new GLTFLoader().load(MODEL_URL, (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const material = new THREE.MeshStandardMaterial({ color: 0xaebbb6, roughness: 0.58, metalness: 0.24 });
        object.material = material;
        materials.push(material);
      });

      model.updateMatrixWorld(true);
      const sourceSize = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
      if (sourceSize.z > sourceSize.y && sourceSize.z >= sourceSize.x) model.rotation.x = -Math.PI / 2;
      else if (sourceSize.x > sourceSize.y && sourceSize.x > sourceSize.z) model.rotation.z = Math.PI / 2;

      // Apply the axis correction before measuring again. Normalizing the
      // assembled source to a predictable size keeps the camera independent
      // from CAD units and prevents a valid model from sitting outside the
      // viewing frustum.
      model.updateMatrixWorld(true);
      const orientedBounds = new THREE.Box3().setFromObject(model);
      const orientedSize = orientedBounds.getSize(new THREE.Vector3());
      const orientedCenter = orientedBounds.getCenter(new THREE.Vector3());
      model.position.sub(orientedCenter);
      const maxDimension = Math.max(orientedSize.x, orientedSize.y, orientedSize.z);
      if (!Number.isFinite(maxDimension) || maxDimension <= 0) throw new Error("GLB has no visible geometry");
      model.scale.setScalar(12 / maxDimension);
      model.updateMatrixWorld(true);

      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const pivot = new THREE.Group();
      pivot.add(model);
      pivotRef.current = pivot;
      scene.add(pivot);

      const displayDimension = Math.max(size.x, size.y, size.z);
      const distance = (displayDimension / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))) * 1.35;
      const reset = () => {
        camera.position.set(distance * 0.8, distance * 0.38, distance * 0.9);
        camera.near = Math.max(displayDimension / 1000, 0.01);
        camera.far = displayDimension * 20;
        camera.updateProjectionMatrix();
        controls.target.set(0, 0, 0);
        controls.minDistance = distance * 0.32;
        controls.maxDistance = distance * 3.2;
        controls.update();
      };
      resetRef.current = reset;
      reset();
      setLoading(false);
    }, undefined, () => {
      if (!disposed) { setLoading(false); setError(true); }
    });

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
      if (pivotRef.current && rotatingRef.current) pivotRef.current.rotation.y += 0.0035;
      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      controlsRef.current = null;
      pivotRef.current = null;
    };
  }, []);

  useEffect(() => { rotatingRef.current = rotating; }, [rotating]);

  return (
    <div className="long-context-viewer">
      <canvas ref={canvasRef} aria-label="最新角钢塔三维模型，可拖拽旋转和缩放" />
      {loading && <div className="long-context-status">正在构建长上下文模型…</div>}
      {error && <div className="long-context-status">三维模型暂时无法加载</div>}
      <div className="long-context-toolbar">
        <button type="button" onClick={() => setRotating((value) => !value)} title={rotating ? "暂停旋转" : "继续旋转"} aria-label={rotating ? "暂停旋转" : "继续旋转"}>{rotating ? <Pause size={17} /> : <Play size={17} />}</button>
        <button type="button" onClick={() => resetRef.current()} title="重置视角" aria-label="重置视角"><RotateCcw size={17} /></button>
      </div>
      <div className="long-context-model-label"><span>最新重构</span><strong>M1–M6 塔段</strong></div>
    </div>
  );
}
