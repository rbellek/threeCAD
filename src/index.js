import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { SpotLight } from 'three';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.z = 5;
camera.position.y = 2;
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF,
side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false,
    angle: 0.2,
    penumbra: 0,
    intensity : 1,
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.castShadow = true;
sphere.position.x = -10;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(directionalLightHelper);

// const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionalLightShadowHelper);

const spotLigth = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLigth);
spotLigth.position.set(-100, 100, 0);
spotLigth.castShadow = true;
spotLigth.angle = 0.2;

const spotLigthHelper = new THREE.SpotLightHelper(spotLigth);
scene.add(spotLigthHelper);



const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.1,
    penumbra: 0.1,
    intensity: 1.0
};

gui.addColor(options, 'sphereColor').onChange(e => {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(e => {
    sphere.material.wireframe = e;
})

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1.0);
gui.add(options, 'penumbra', 0, 1.0);
gui.add(options, 'intensity', 0, 1.0);

let step = 0;

function animate(time){
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotLigth.angle = options.angle;
    spotLigth.penumbra = options.penumbra;
    spotLigth.intensity = options.intensity;
    spotLigthHelper.update();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

console.log("deneme2");