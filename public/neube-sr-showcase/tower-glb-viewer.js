import * as THREE from "three";
import { OrbitControls } from "./vendor/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./vendor/three/examples/jsm/loaders/GLTFLoader.js";

const viewers = [
  { canvas: "#towerHeadCanvas", status: "#towerHeadModelStatus", model: "assets/models/complete-tower-head.glb", palette: [0x42a5d5, 0x58b957, 0xf39b27] },
  { canvas: "#towerCanvas", status: "#towerModelStatus", model: "assets/models/tower-assembly-1-6-s1602.glb", palette: [0x42a5d5, 0x58b957, 0xf39b27, 0x20b8b4, 0x8f5bd4, 0xef413d] },
];

function createViewer(config) {
  const canvas = document.querySelector(config.canvas);
  const status = document.querySelector(config.status);
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x101916, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 1000);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));
  scene.add(new THREE.HemisphereLight(0xf4f1e8, 0x25343b, 3.6));
  const key = new THREE.DirectionalLight(0xffffff, 4.5);
  key.position.set(8, 12, 10);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x62c7d9, 3);
  rim.position.set(-8, 7, -9);
  scene.add(rim);

  let frame = 0;
  let modelRoot = null;
  let disposed = false;
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  new GLTFLoader().load(config.model, (gltf) => {
    if (disposed) return;
    const modelFrame = new THREE.Group();
    const model = gltf.scene;
    modelFrame.add(model);
    let meshIndex = 0;
    model.traverse((object) => {
      if (!object.isMesh) return;
      const color = config.palette[meshIndex++ % config.palette.length];
      object.material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.28, roughness: 0.5, metalness: 0.18, side: THREE.DoubleSide });
    });

    // Both engineering exports use Z-up coordinates.
    modelFrame.rotation.x = -Math.PI / 2;
    modelFrame.updateMatrixWorld(true);
    const orientedSize = new THREE.Box3().setFromObject(modelFrame).getSize(new THREE.Vector3());
    const sourceMax = Math.max(orientedSize.x, orientedSize.y, orientedSize.z);
    if (!Number.isFinite(sourceMax) || sourceMax <= 0) {
      if (status) status.textContent = "模型没有可显示的几何";
      return;
    }

    modelFrame.scale.setScalar(12 / sourceMax);
    modelFrame.updateMatrixWorld(true);
    const scaledCenter = new THREE.Box3().setFromObject(modelFrame).getCenter(new THREE.Vector3());
    modelFrame.position.sub(scaledCenter);
    modelFrame.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(modelFrame);
    const target = bounds.getCenter(new THREE.Vector3());
    const radius = bounds.getBoundingSphere(new THREE.Sphere()).radius;
    const distance = (radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.04;

    // Keep engineering-axis correction on the inner frame. The outer pivot
    // rotates only around the scene's vertical Y axis.
    const rotationPivot = new THREE.Group();
    rotationPivot.add(modelFrame);
    scene.add(rotationPivot);
    modelRoot = rotationPivot;
    camera.position.copy(target).add(new THREE.Vector3(1, 0.22, 1).normalize().multiplyScalar(distance));
    camera.near = Math.max(0.01, distance / 1000);
    camera.far = distance * 12;
    camera.updateProjectionMatrix();
    controls.target.copy(target);
    controls.minDistance = distance * 0.2;
    controls.maxDistance = distance * 3;
    controls.update();
    status?.remove();
    resize();
  }, undefined, () => {
    if (status) status.textContent = "三维模型暂时无法加载";
  });

  const render = () => {
    if (modelRoot) modelRoot.rotation.y += 0.0035;
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  render();

  window.addEventListener("pagehide", () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    controls.dispose();
    renderer.dispose();
  }, { once: true });
}

viewers.forEach(createViewer);
