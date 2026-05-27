import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#app');
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

// Enable damping (inertia) for smoother controls
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Enable auto-rotation of the camera around the target
controls.autoRotate = true;
controls.autoRotateSpeed = 10.0;



const geometry = new Three.BoxGeometry();
const material = new Three.MeshBasicMaterial({ color: 0x00ff00 ,wireframe: true });
const cube = new Three.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5; 

function animate() {
    requestAnimationFrame(animate);
   
    controls.update();
    renderer.render(scene, camera);
}

animate();