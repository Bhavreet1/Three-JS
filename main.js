import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Wireframe } from 'three/examples/jsm/Addons.js';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#app');
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const mouse = {
    x: 0,
    y: 0
}
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 4;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.minDistance = 2;
controls.maxDistance = 10;


//resize event 
window.addEventListener("resize", (e) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//mouse move event
window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX / window.innerWidth
    mouse.y = e.clientY / window.innerHeight
})
camera.position.z = 3;

const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);


function animate() {
    requestAnimationFrame(animate);
    mesh.lookAt(new Three.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 1))
    controls.update();
    renderer.render(scene, camera);
}

animate();