import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#app');
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5; 

const geometry = new Three.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
    1.0, 1.0, 1.0, // top right
    1.0, -1.0, 1.0, // bottom right
    -1.0, -1.0, 1.0, // bottom left
    -1.0,-1.0,1.0, // bottom left
    -1.0, 1.0, 1.0, // top left
    1.0, 1.0, 1.0,
    
] );
// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new Three.BufferAttribute( vertices,3 ) );
const material = new Three.MeshBasicMaterial( { color: 'white', side: Three.DoubleSide ,wireframe:true} );
const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

function animate() {
    requestAnimationFrame(animate);
   
    controls.update();
    renderer.render(scene, camera);
}

animate();