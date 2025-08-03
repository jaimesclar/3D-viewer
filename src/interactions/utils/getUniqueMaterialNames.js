import { getCurrentModel } from '../../loaders/loadModel.js';

export function getUniqueMaterialNames() {
  const model = getCurrentModel();
  if (!model) {
    console.warn('No model loaded.');
    return [];
  }

  const materialNames = new Set();

  model.traverse(node => {
    if (node.isMesh && node.material) {
      if (Array.isArray(node.material)) {
        node.material.forEach(mat => {
          if (mat?.name) materialNames.add(mat.name);
        });
      } else {
        if (node.material.name) materialNames.add(node.material.name);
      }
    }
  });

  return [...materialNames]; // Convert Set to Array
}
