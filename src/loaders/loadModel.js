import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

let currentModel = null;
const loader = new GLTFLoader();

export function setupModelLoader(scene) {
  const input = document.getElementById('fileInput');

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.toLowerCase().split('.').pop();
    if (!['glb', 'gltf'].includes(ext)) {
      alert('Por favor, selecciona un archivo .glb o .gltf válido.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      alert('El modelo es demasiado grande. Máximo permitido: 100MB');
      return;
    }

    const url = URL.createObjectURL(file);
    loader.load(url, gltf => {
      // Limpiar la escena (solo dejar luces)
      scene.children = scene.children.filter(obj => obj.type.includes('Light'));

      currentModel = gltf.scene;

      currentModel.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          const m = node.material;
          if (m && (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial)) {
            if (scene.environment) {
              m.envMap = scene.environment;
              m.envMapIntensity = 1.2;
            }
            m.metalness = 0.4;
            m.roughness = 0.3;
            m.needsUpdate = true;
          }
        }
      });

      scene.add(currentModel);
      URL.revokeObjectURL(url);
    }, undefined, err => console.error('Error cargando GLB/GLTF:', err));
  });
}

export function getCurrentModel() {
  return currentModel;
}
