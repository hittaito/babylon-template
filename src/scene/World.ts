import * as BABYLON from 'babylonjs';
import WebGL from '../WebGL';
import Box from '../models/Box';

export default class World {
  scene: BABYLON.Scene;
  camera: BABYLON.ArcRotateCamera;

  box: Box;
  constructor() {
    const webgl = new WebGL();

    // scene
    this.scene = new BABYLON.Scene(webgl.engine);

    // camera
    this.camera = new BABYLON.ArcRotateCamera(
      'worldcamera',
      -Math.PI / 2,
      Math.PI / 2.5,
      20,
      new BABYLON.Vector3(),
      this.scene
    );

    // enable physics
    // const gravity = new BABYLON.Vector3(0, -9.81, 0);
    // this.scene.enablePhysics(gravity, hk);

    // model
    this.box = new Box(this.scene);
  }
  render() {
    this.scene.render();
  }
}
