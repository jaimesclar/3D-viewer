import { scene } from './scene/setupScene.js';
import { camera } from './scene/setupCamera.js';
import { renderer } from './scene/setupRenderer.js';
import { setupLights } from './scene/setupLights.js';
import { setupControls } from './controls/setupControls.js';
import { setupHDRLoader } from './loaders/loadHDR.js';
import { setupModelLoader } from './loaders/loadModel.js';
import { setupColorChanger } from './interactions/changeColor.js';
import { setupTextureChanger } from './interactions/changeTexture.js';
import { setupMaterialChanger } from './interactions/changeMaterial.js';

setupLights(scene);
const controls = setupControls(camera, renderer);
setupHDRLoader(scene, renderer);
setupModelLoader(scene);

setupColorChanger();
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
