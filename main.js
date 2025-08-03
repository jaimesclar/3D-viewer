import { scene } from './src/scene/setupScene.js';
import { camera } from './src/scene/setupCamera.js';
import { renderer } from './src/scene/setupRenderer.js';
import { setupLights } from './src/scene/setupLights.js';
import { setupControls } from './src/controls/setupControls.js';
import { setupHDRLoader } from './src/loaders/loadHDR.js';
import { setupModelLoader } from './src/loaders/loadModel.js';
import { setupMultiMaterialColorChanger } from './src/interactions/changeColor.js';
import { setupTextureChanger } from './src/interactions/changeTexture.js';
import { setupMaterialChanger } from './src/interactions/changeMaterial.js';

setupLights(scene);
const controls = setupControls(camera, renderer);
setupHDRLoader(scene, renderer);
setupModelLoader(scene);

setupMultiMaterialColorChanger();
setupTextureChanger();
setupMaterialChanger(scene);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
