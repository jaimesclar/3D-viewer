import { getCurrentModel } from '../loaders/loadModel.js';
import { getUniqueMaterialNames } from './utils/getUniqueMaterialNames.js';

export function setupMultiMaterialColorChanger(containerId = 'materialColorInputs') {
  const model = getCurrentModel();

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with id '${containerId}' not found.`);
    return;
  }

  if (!model) {
    container.innerHTML = `<p style="color: gray; font-style: italic;">⚠️ Modelo no cargado. Espera unos segundos...</p>`;
    console.warn('Model not loaded.');
    return;
  }
  
  const materialNames = getUniqueMaterialNames();

  // Clear previous inputs
  container.innerHTML = '';

  // For each material name, create a label and input
  materialNames.forEach(name => {
    const label = document.createElement('label');
    label.textContent = name;
    label.style.display = 'block';

    const input = document.createElement('input');
    input.type = 'color';
    input.value = '#ffffff'; // default white
    input.style.marginBottom = '8px';

    input.addEventListener('input', e => {
      const color = e.target.value;

      model.traverse(node => {
        if (node.isMesh && node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(mat => {
              if (mat.name === name) {
                mat.color.set(color);
                mat.needsUpdate = true;
              }
            });
          } else if (node.material.name === name) {
            node.material.color.set(color);
            node.material.needsUpdate = true;
          }
        }
      });
    });

    container.appendChild(label);
    container.appendChild(input);
  });
}
