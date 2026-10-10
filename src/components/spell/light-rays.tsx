// Spell UI — https://spell.sh/docs/light-rays (MIT, xxtomm/spell-ui)
// Portado de three.js para WebGL puro: o shader é o mesmo do original, mas sem os ~600 KB do three.
// Também pausa fora da tela/aba oculta e desenha um único quadro com prefers-reduced-motion.
import { useEffect, useRef, type CSSProperties } from "react";

interface LightRaysProps {
  intensity?: number;
  rays?: number;
  reach?: number;
  position?: number;
  speed?: number;
  color1?: string;
  color2?: string;
  className?: string;
  style?: CSSProperties;
}

const RAY_Y_POSITION_1 = -0.4;
const RAY_Y_POSITION_2 = -0.5;

const mapRange = (v: number, a: number, b: number, c: number, d: number) => c + ((v - a) / (b - a)) * (d - c);

const hexToRgb = (hex: string): [number, number, number] => {
  const c = hex.replace("#", "");
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as [number, number, number];
};

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_colors[2];
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  float diagonal = length(u_resolution);
  return clamp(
      (.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
      (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
      u_reach, 1.0) *
    clamp((diagonal - length(sourceToCoord)) / diagonal, u_reach, 1.0);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  float speed = u_rays * 10.0;

  float strength1 = rayStrength(u_rayPos1, normalize(vec2(1.0, -0.116)), coord, 36.2214 * speed, 21.11349 * speed, 1.5 * speed);
  float strength2 = rayStrength(u_rayPos2, normalize(vec2(1.0, 0.241)), coord, 22.39910 * speed, 18.0234 * speed, 1.1 * speed);

  float brightness = 1.0 * u_reach - (coord.y / u_resolution.y);
  float attenuation = clamp(brightness + (0.5 + u_intensity), 0.0, 1.0);

  float alpha1 = strength1 * attenuation * u_colors[0].a;
  float alpha2 = strength2 * attenuation * u_colors[1].a;

  vec3 blendedColor = u_colors[0].rgb * alpha1 + u_colors[1].rgb * alpha2;
  float blendedAlpha = alpha1 + alpha2 * (1.0 - alpha1);
  vec3 finalRGB = blendedColor / max(blendedAlpha, 0.0001);

  gl_FragColor = vec4(finalRGB * blendedAlpha, blendedAlpha);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
};

export function LightRays({
  intensity = 13,
  rays = 32,
  reach = 16,
  position = 50,
  speed = 10,
  color1 = "#ffffff",
  color2 = "#ffffff",
  className,
  style,
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!canvas || !gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Um triângulo que cobre a tela inteira.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);
    gl.uniform4fv(u("u_colors"), new Float32Array([r1, g1, b1, 1, r2, g2, b2, 1]));
    gl.uniform1f(u("u_intensity"), mapRange(intensity, 0, 100, 0, 0.5));
    gl.uniform1f(u("u_rays"), mapRange(rays, 0, 100, 0, 0.3));
    gl.uniform1f(u("u_reach"), mapRange(reach, 0, 100, 0, 0.5));
    const uTime = u("u_time");
    const uRes = u("u_resolution");
    const uPos1 = u("u_rayPos1");
    const uPos2 = u("u_rayPos2");

    // Resolução 1x de propósito, como no original: os raios são difusos e isso poupa a GPU do celular.
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth));
      const h = Math.max(1, Math.round(canvas.clientHeight));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uPos1, (position / 100) * w, RAY_Y_POSITION_1 * h);
      gl.uniform2f(uPos2, (position / 100 + 0.02) * w, RAY_Y_POSITION_2 * h);
    };

    let time = Math.random() * 10000;
    let last = 0;
    let frame = 0;
    let visible = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (last) time += ((now - last) * speed) / 1000 / 10;
      last = now;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || frame || !visible || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    draw();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [intensity, rays, reach, position, speed, color1, color2]);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ width: "100%", height: "100%", display: "block", ...style }} />;
}
