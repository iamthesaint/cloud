uniform float uTime;
uniform float uProgress;
varying vec2 vUv;

void main() {
    // outline
    float outline = smoothstep(0.45, 0.5, vUv.y) - smoothstep(0.5, 0.55, vUv.y);

    // wave fill
    float wave = sin(vUv.x * 40.0 + uTime * 2.0) * 0.05;
    float fillLine = uProgress + wave;
    float fill = step(vUv.y, fillLine);

    float alpha = max(outline, fill);

    vec3 color = vec3(0.0);
    gl_FragColor = vec4(color, alpha);
}