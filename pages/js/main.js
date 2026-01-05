// Pak de container
const container = document.getElementById("scene-container");
const width = container.clientWidth;
const height = 400; // vaste hoogte voor nu

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x02030a); // match ongeveer je achtergrond
container.appendChild(renderer.domElement);

// Scene + camera
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x02030a, 10, 50);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
camera.position.set(0, 1, 6);

// Neon grid
const gridMaterial = new THREE.LineBasicMaterial({
  color: 0x39ff14,
  linewidth: 1
});

const grid = new THREE.GridHelper(40, 40, 0x39ff14, 0x003300);
grid.position.y = -1;
scene.add(grid);

// Neon object
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 200, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xff2bf0,
  emissive: 0xff2bf0,
  emissiveIntensity: 0.9,
  metalness: 0.8,
  roughness: 0.2
});
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Licht
const ambient = new THREE.AmbientLight(0x00f6ff, 0.3);
scene.add(ambient);

const point = new THREE.PointLight(0x39ff14, 2, 50);
point.position.set(2, 4, 4);
scene.add(point);

// Animatie
function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.01;
  knot.rotation.y += 0.015;
  renderer.render(scene, camera);
}
animate();

// Responsive: resize
window.addEventListener("resize", () => {
  const newWidth = container.clientWidth;
  const newHeight = 400;
  renderer.setSize(newWidth, newHeight);
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
});
