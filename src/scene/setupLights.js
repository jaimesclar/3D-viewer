import * as THREE from 'three';

export function setupLights(scene) {
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(5, 10, 7);
  dir.castShadow = true;
  dir.shadow.mapSize.width = 2048;
  dir.shadow.mapSize.height = 2048;
  dir.shadow.camera.left = -10;
  dir.shadow.camera.right = 10;
  dir.shadow.camera.top = 10;
  dir.shadow.camera.bottom = -10;
  scene.add(dir);

  const fillLight = new THREE.PointLight(0xffffff, 0.3);
  fillLight.position.set(1, 2, 2);
  scene.add(fillLight);
}
