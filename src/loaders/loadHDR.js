import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as THREE from 'three';

export function setupHDRLoader(scene, renderer) {
  const input = document.getElementById('hdrInput');

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.hdr')) {
      alert('Por favor, selecciona un archivo HDR válido (.hdr)');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('El archivo HDR es demasiado grande. Máximo permitido: 50MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      const buffer = ev.target.result;
      new RGBELoader().setDataType(THREE.HalfFloatType).parse(buffer, undefined, hdrTexture => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envMap = pmrem.fromEquirectangular(hdrTexture).texture;
        scene.environment = envMap;
        scene.background = envMap;
        hdrTexture.dispose();
        pmrem.dispose();
      }, err => console.error('Error cargando HDR:', err));
    };

    reader.readAsArrayBuffer(file);
  });
}
