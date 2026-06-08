import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#app');
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

// const light = new Three.DirectionalLight(0x4ffff4, 2);
// light.position.set(1, 1, 1);


// const helper = new Three.DirectionalLightHelper( light, 0.8 );
// scene.add( helper );

// const light2 = new Three.PointLight(0xffffff, 0.1);
// light2.position.set(-1, -1, 0);


// const helper2 = new Three.PointLightHelper( light2, 0.1);
// scene.add( helper2 );

// const groupLight = new Three.Group();
// groupLight.add(light, light2);
// scene.add(groupLight);

//hdri (environment)

const hdri = new HDRLoader();

hdri.load("./tree_lined_driveway_2k.pic", (hdriTexture) => {
    hdriTexture.mapping = Three.EquirectangularReflectionMapping;
    scene.environment = hdriTexture;
    
})


camera.position.z = 2; 

//tex 1
const loader = new Three.TextureLoader();
const tex = loader.load("./earth_tex.jpeg");
tex.colorSpace = Three.SRGBColorSpace;

//tex 2
const texture2 = loader.load("./8k_earth_clouds.jpg");
texture2.colorSpace = Three.SRGBColorSpace;

const geometry = new Three.SphereGeometry( 1, 250, 250 );
const material = new Three.MeshPhysicalMaterial({map:tex});

const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

const geometry2 = new Three.SphereGeometry( 1.003, 250, 250 );
const material2 = new Three.MeshPhysicalMaterial({  alphaMap: texture2, transparent: true });

const mesh2 = new Three.Mesh(geometry2, material2);
scene.add(mesh2);

mesh.rotateY(-3);
mesh.rotateX(-0.35);


function animate() {
    requestAnimationFrame(animate);
   mesh.rotateY(0.0008);
   mesh2.rotateY(0.0007);
    controls.update();
    renderer.render(scene, camera);
}

animate();