uniform mat4 viewProjection;

in vec3 position;
in vec2 uv;

out vec2 vUv;
out float vID;

#include<instancesDeclaration>

void main() {
  #include<instancesVertex>

  vec3 pos = position;

  gl_Position =  viewProjection * finalWorld * vec4(pos, 1.);
  vUv = uv;
  vID = float(gl_InstanceID);
}