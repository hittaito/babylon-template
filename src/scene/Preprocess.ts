import * as BABYLON from "babylonjs";
import WebGL from "../WebGL";
import vert from "../glsl/base.vert?raw";
import frag from "../glsl/base.frag?raw";

export default class Preprocess {
  scene: BABYLON.Scene;
  camera: BABYLON.ArcRotateCamera;

  private material: BABYLON.ShaderMaterial;
  constructor() {
    const webgl = new WebGL();

    // scene
    this.scene = new BABYLON.Scene(webgl.engine);

    // camera
    this.camera = new BABYLON.ArcRotateCamera(
      "pre_camera",
      -Math.PI / 2,
      Math.PI / 2,
      10,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    this.camera.orthoTop = 1;
    this.camera.orthoBottom = -1;
    this.camera.orthoLeft = -1;
    this.camera.orthoRight = 1;

    // geom
    const plane = BABYLON.MeshBuilder.CreatePlane(
      "pre_geom",
      {
        width: 2,
        height: 2,
      },
      this.scene
    );

    // material
    this.material = new BABYLON.ShaderMaterial("pre_material", this.scene, {
      vertexSource: vert,
      fragmentSource: frag,
    });
    plane.material = this.material;

    // target
    const target = new BABYLON.RenderTargetTexture("pre_target", {
      width: webgl.engine.getRenderWidth(),
      height: webgl.engine.getRenderHeight(),
    });
    this.scene.customRenderTargets.push(target);
    target.renderList?.push(plane);
    target.setMaterialForRendering([plane], [this.material]);

    webgl.buffer.set("pre_texture", target);
  }
  render() {
    this.scene.render();
  }
}
