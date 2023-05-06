import * as BABYLON from 'babylonjs';
import WebGL from '../WebGL';

export default class Postprocess {
  constructor(scene: BABYLON.Scene, camera: BABYLON.Camera) {
    const webgl = new WebGL();
    const pipeline = new BABYLON.PostProcessRenderPipeline(
      webgl.engine,
      'standardPipeline'
    );

    const fxaa = new BABYLON.FxaaPostProcess(
      'fxaa',
      1,
      null,
      0,
      webgl.engine,
      false
    );

    const effect = new BABYLON.PostProcessRenderEffect(
      webgl.engine,
      'effect',
      () => [fxaa]
    );
    pipeline.addEffect(effect);

    scene.postProcessRenderPipelineManager.addPipeline(pipeline);
    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
      'standardPipeline',
      camera
    );
  }
}
