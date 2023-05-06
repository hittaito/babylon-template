import * as BABYLON from 'babylonjs';
import Preprocess from './scene/Preprocess';
import World from './scene/World';
import Postprocess from './scene/Postprocess';
// // @ts-ignore
// import HavokPhysics from "@babylonjs/havok";

let instance: WebGL;
export default class WebGL {
  isLoad = false;

  engine: BABYLON.Engine;

  buffer: Map<string, BABYLON.RenderTargetTexture> = new Map();
  preprocess: Preprocess;
  world: World;
  postprocess: Postprocess;

  // events
  clickEvents: ((event: MouseEvent) => void)[] = [];

  constructor(canvas?: HTMLCanvasElement) {
    if (!(!instance && canvas)) {
      return instance;
    }
    instance = this;
    this.init(canvas).then(() => (this.isLoad = true));
  }
  async init(canvas: HTMLCanvasElement) {
    // set up
    this.engine = new BABYLON.Engine(canvas, false, {
      preserveDrawingBuffer: true,
    });

    // const HK = await HavokPhysics();
    // const hk = new BABYLON.HavokPlugin(true, HK);

    // scene
    this.preprocess = new Preprocess();
    this.world = new World();
    this.postprocess = new Postprocess(this.world.scene, this.world.camera);

    this.world.camera.attachControl(canvas, true);

    this.engine.runRenderLoop(() => this.render());
  }
  render() {
    this.preprocess.render();
    this.world.render();
  }
  resize() {
    if (!this.isLoad) return;
    this.engine.resize();
  }
  mousemove(_: number, __: number) {
    if (!this.isLoad) return;
  }
  click(event: MouseEvent) {
    if (!this.isLoad) return;
    this.clickEvents.forEach((f) => f(event));
  }
}
