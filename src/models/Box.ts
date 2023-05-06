import * as BABYLON from 'babylonjs';
import WebGL from '../WebGL';
import vert from '../glsl/instance.vert?raw';
import frag from '../glsl/instance.frag?raw';

const SIZE = 2;

export default class Box {
  private box: BABYLON.Mesh;
  private material: BABYLON.ShaderMaterial;
  constructor(scene: BABYLON.Scene) {
    const webgl = new WebGL();

    // geom
    this.box = BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, scene);

    const matrix = new Float32Array(16 * SIZE * SIZE);
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const n = y * SIZE + x;
        const m = BABYLON.Matrix.Translation(
          -((SIZE - 1) / 2 - x) * 2,
          y * 2,
          0
        );

        m.copyToArray(matrix, n * 16);
      }
    }
    this.box.thinInstanceSetBuffer('matrix', matrix, 16);

    // material
    this.material = new BABYLON.ShaderMaterial(
      'box_material',
      scene,
      {
        vertexSource: vert,
        fragmentSource: frag,
      },
      {
        uniforms: [
          'world',
          'worldView',
          'worldViewProjection',
          'view',
          'projection',
          'viewProjection',
          'uCount',
        ],
        attributes: ['position', 'uv'],
        samplers: ['uImage'],
      }
    );
    const map = webgl.buffer.get('pre_texture');
    if (!map) return;
    this.material.setVector2('uCount', new BABYLON.Vector2(SIZE, SIZE));
    this.material.setTexture('uImage', map);

    this.box.material = this.material;

    webgl.clickEvents.push(this.onClick);
  }
  onClick = () => {
    this.box.rotation.y += 0.3;
  };
}
