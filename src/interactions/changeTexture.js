import * as THREE from 'three';
import { getCurrentModel } from '../loaders/loadModel.js';

export function setupTextureChanger() {
  const input = document.getElementById('shirtTexture');

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    const model = getCurrentModel();
    if (!file || !model) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida.');
      return;
    }

    const url = URL.createObjectURL(file);
    const loader = new THREE.TextureLoader();

    loader.load(url, texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);

      model.traverse(node => {
        if (node.isMesh && node.material?.name) {
          const name = node.material.name;
          if (name === 'Body_FRONT_2664' || name === 'Sleeves_FRONT_2669') {
            node.material.map = texture;
            node.material.needsUpdate = true;
          }
        }
      });

      URL.revokeObjectURL(url);
    }, undefined, err => {
      console.error('Error cargando la textura:', err);
      alert('No se pudo cargar la textura.');
    });
  });
}
