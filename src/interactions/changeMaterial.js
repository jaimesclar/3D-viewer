import * as THREE from 'three';
import { getCurrentModel } from '../loaders/loadModel.js';

export function setupMaterialChanger(scene) {
  const select = document.getElementById('materialSelect');

  select.addEventListener('change', e => {
    const selected = e.target.value;
    const model = getCurrentModel();
    if (!model) return;

    model.traverse(node => {
      if (node.isMesh) {
        const oldMat = node.material;
        let newMat;

        switch (selected) {
          case 'phong':
            newMat = new THREE.MeshPhongMaterial({ color: oldMat.color || 0xffffff });
            break;
          case 'standard':
            newMat = new THREE.MeshStandardMaterial({ color: oldMat.color || 0xffffff });
            break;
          case 'lambert':
            newMat = new THREE.MeshLambertMaterial({ color: oldMat.color || 0xffffff });
            break;
          case 'toon':
            newMat = new THREE.MeshToonMaterial({ color: oldMat.color || 0xffffff });
            break;
          case 'default':
          default:
            return;
        }

        if (oldMat.map) newMat.map = oldMat.map;
        newMat.name = oldMat.name;
        newMat.metalness = oldMat.metalness || 0;
        newMat.roughness = oldMat.roughness || 0.5;
        newMat.envMap = scene.environment;
        newMat.envMapIntensity = 1.2;
        newMat.needsUpdate = true;

        node.material = newMat;
      }
    });
  });
}
