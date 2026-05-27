import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#app');
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);


const geometry = new Three.BoxGeometry();
const material = new Three.MeshBasicMaterial({ color: 0x00ff00 ,wireframe: true });
const cube = new Three.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5; 

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();