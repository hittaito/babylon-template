import WebGL from './WebGL';
import './style.css';

let webgl: WebGL;
let canvas: HTMLCanvasElement;
window.onload = () => {
  const c = document.querySelector<HTMLCanvasElement>('#canvas');
  if (!c) return;
  canvas = c;
  webgl = new WebGL(canvas);

  canvas.addEventListener('mousemove', (event) => {
    webgl.mousemove(event.clientX, event.clientY);
  });
  canvas.addEventListener('click', (event) => webgl.click(event));
};

window.addEventListener('resize', () => {
  if (webgl) webgl.resize();
});
