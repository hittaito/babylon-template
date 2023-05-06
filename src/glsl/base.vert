uniform mat4 worldViewProjection;

in vec3 position;
in vec2 uv;

out vec2 vUv;

void main() {
    gl_Position = worldViewProjection * vec4(position, 1.);
    vUv = uv;
}