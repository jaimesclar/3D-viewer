import { getCurrentModel } from '../loaders/loadModel.js';

export function setupColorChanger() {
  const input = document.getElementById('shirtColor');

  input.addEventListener('input', e => {
    const color = e.target.value;
    const model = getCurrentModel();
    if (!model) return;

    model.traverse(node => {
      if (node.isMesh && node.material?.name) {
        const name = node.material.name;
        if (name === 'Body_FRONT_2664' || name === 'Sleeves_FRONT_2669') {
          node.material.color.set(color);
          node.material.needsUpdate = true;
        }
      }
    });
  });
}
