import * as THREE from "three";
import { OrbitControls } from "./vendor/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./vendor/three/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("#towerCanvas");
const status = document.querySelector("#towerModelStatus");
if (canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xeaf1ee, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100000);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.autoRotate = false;
  controls.enablePan = false;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x53645d, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(5, 8, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fd4bf, 1.8);
  rim.position.set(-4, 5, -6);
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

  const loader = new GLTFLoader();
  loader.load("assets/models/tower-assembly-1-6-s1602.glb", (gltf) => {
    if (disposed) return;
    const model = gltf.scene;
    model.traverse((object) => {
      if (!object.isMesh) return;
      object.material = new THREE.MeshStandardMaterial({ color: 0x98a6a1, roughness: 0.62, metalness: 0.2 });
    });
    const sourceBounds = new THREE.Box3().setFromObject(model);
    const sourceSize = sourceBounds.getSize(new THREE.Vector3());
    // Normalize common CAD export orientation: tower height should follow world Y.
    if (sourceSize.z > sourceSize.y && sourceSize.z >= sourceSize.x) model.rotation.x = -Math.PI / 2;
    else if (sourceSize.x > sourceSize.y && sourceSize.x > sourceSize.z) model.rotation.z = Math.PI / 2;
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const pivot = new THREE.Group();
    pivot.add(model);
    model.position.sub(center);
    modelRoot = pivot;
    scene.add(pivot);
    const maxDimension = Math.max(size.x, size.y, size.z);
    const distance = (maxDimension / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.2);
    camera.position.set(distance * 0.85, distance * 0.58, distance * 0.85);
    camera.near = Math.max(maxDimension / 10000, 0.001);
    camera.far = maxDimension * 20;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.minDistance = distance * 0.35;
    controls.maxDistance = distance * 3.5;
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
