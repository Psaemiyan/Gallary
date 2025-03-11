uniform vec3 color;
uniform float emissiveIntensity;
varying vec2 vUv;

void main() {
  float distX = abs(vUv.x - 0.5);
  float distY = abs(vUv.y - 0.5);
  float dist = max(distX, distY);

  float fade = smoothstep(0.35, 0.5, dist);

  vec3 glowColor = mix(color * emissiveIntensity, color * 0.2, fade);

  gl_FragColor = vec4(glowColor, 1.0 - fade * 0.8); 
}
