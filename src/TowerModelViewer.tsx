import { useEffect, useRef, useState } from "react";
import { Maximize2, RotateCw, ScanLine } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const MODEL_URL = "/models/N02932S-T0706-09_coordination.stl?v=20260807-7f20cc6d";

export function TowerModelViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetViewRef = useRef<() => void>(() => undefined);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let animationFrame = 0;
    let modelGeometry: THREE.BufferGeometry | null = null;
    let edgeGeometry: THREE.EdgesGeometry | null = null;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x171a1c, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x171a1c, 18000, 42000);

    const camera = new THREE.PerspectiveCamera(32, 1, 10, 100000);
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.7;
    controls.screenSpacePanning = true;
    controlsRef.current = controls;

    scene.add(new THREE.HemisphereLight(0xf4f1e8, 0x22292d, 2.2));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(9000, 15000, 11000);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd1493f, 2.4);
    rimLight.position.set(-10000, 7000, -9000);
    scene.add(rimLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0xc9ceca,
      roughness: 0.68,
      metalness: 0.18,
      side: THREE.DoubleSide,
    });
    materialRef.current = material;

    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x596166, transparent: true, opacity: 0.58 });
    const grid = new THREE.GridHelper(11000, 14, 0x596166, 0x343a3e);
    grid.material.transparent = true;
    grid.material.opacity = 0.42;
    scene.add(grid);

    const loader = new STLLoader();
    loader.load(
      MODEL_URL,
      (geometry) => {
        if (disposed) {
          geometry.dispose();
          return;
        }

        modelGeometry = geometry;
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        const size = geometry.boundingBox?.getSize(new THREE.Vector3()) ?? new THREE.Vector3(3592, 3563, 9060);
        geometry.center();

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = size.z / 2;
        scene.add(mesh);

        edgeGeometry = new THREE.EdgesGeometry(geometry, 28);
        const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
        edges.rotation.copy(mesh.rotation);
        edges.position.copy(mesh.position);
        scene.add(edges);

        const target = new THREE.Vector3(0, size.z * 0.46, 0);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const distance = (maxDimension / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))) * 1.28;

        const resetView = () => {
          const direction = new THREE.Vector3(1, 0.55, 1).normalize();
          camera.position.copy(target).add(direction.multiplyScalar(distance));
          camera.near = Math.max(1, distance / 1000);
          camera.far = distance * 8;
          camera.updateProjectionMatrix();
          controls.target.copy(target);
          controls.minDistance = distance * 0.28;
          controls.maxDistance = distance * 3;
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
      modelGeometry?.dispose();
      edgeGeometry?.dispose();
      material.dispose();
      edgeMaterial.dispose();
      grid.geometry.dispose();
      grid.material.dispose();
      renderer.dispose();
      controlsRef.current = null;
      materialRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (materialRef.current) materialRef.current.wireframe = wireframe;
  }, [wireframe]);

  return (
    <div className="tower-viewer">
      <canvas ref={canvasRef} aria-label="可交互的铁塔 STL 三维模型" />
      <div className="viewer-label">
        <span>INTERACTIVE STL / N02932S-T0706-09</span>
        <strong>铁塔协调模型</strong>
      </div>
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
  );
}
