uniform vec2 uCount;
uniform sampler2D uImage;

in vec2 vUv;
in float vID;

void main() {
  float y = floor((vID+.01) / uCount.x );
  float x = floor(mod((vID+.01), uCount.x));
  vec2 uv = vec2(x,y)/uCount;
  vec2 uv2 = uv + vUv * 1./uCount;
  vec3 col = texture(uImage, uv2).xyz;
  glFragColor = vec4(col,1.);
}