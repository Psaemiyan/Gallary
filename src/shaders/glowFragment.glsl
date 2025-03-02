uniform vec3 color;
uniform float emissiveIntensity;
varying vec2 vUv;

void main() {
  // Calculate distance from the center of the plane
  float distX = abs(vUv.x - 0.5);
  float distY = abs(vUv.y - 0.5);
  float dist = max(distX, distY);

  // Adjust the smoothstep values to prevent full black edges
  float fade = smoothstep(0.35, 0.5, dist);

  // Ensure the glow never fully disappears at the edges
  vec3 glowColor = mix(color * emissiveIntensity, color * 0.2, fade);

  gl_FragColor = vec4(glowColor, 1.0 - fade * 0.8); // Reduce alpha fade to keep soft edges
}
