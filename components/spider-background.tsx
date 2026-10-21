"use client";

import { useEffect, useRef } from "react";

const VERT_SOURCE = `
attribute vec2 aPos;
varying vec2 vUv;

void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_SOURCE = `
precision highp float;

varying vec2 vUv;
uniform sampler2D uShape;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uOpacity;
uniform float uHalo;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float shapeAt(vec2 suv) {
  if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) {
    return 0.0;
  }
  return texture2D(uShape, suv).a;
}

float dotField(vec2 p) {
  vec2 g = p * 42.0;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  vec2 j = (vec2(hash(id), hash(id + 19.7)) - 0.5) * 0.6;
  float r = 0.16 + 0.12 * hash(id + 7.3);
  r += 0.03 * sin(uTime * 1.2 + hash(id) * 6.2831);
  float d = length(f - j);
  return smoothstep(r, r - 0.06, d);
}

float gooey(vec2 p) {
  float sum = dotField(p);
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.78539816339;
    sum += dotField(p + vec2(cos(a), sin(a)) * 0.014);
  }
  sum /= 9.0;
  return smoothstep(0.07, 0.17, sum);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (vUv - uCenter) * vec2(aspect, 1.0);
  float scale = 0.62;
  vec2 suv = p / scale + 0.5;

  float shapeSoft = (
    shapeAt(suv + vec2(0.012, 0.0)) +
    shapeAt(suv - vec2(0.012, 0.0)) +
    shapeAt(suv + vec2(0.0, 0.012)) +
    shapeAt(suv - vec2(0.0, 0.012))
  ) * 0.25;

  float g = gooey(p * 1.15);
  float mask = g * smoothstep(0.20, 0.50, shapeSoft);
  float halo = smoothstep(0.30, 0.60, shapeSoft) * (1.0 - g) * uHalo;

  vec3 dotCol = vec3(0.98);
  vec3 haloCol = vec3(0.38);
  float total = mask + halo;
  vec3 col = mix(haloCol, dotCol, mask / max(total, 0.0001));

  float alpha = clamp(total, 0.0, 1.0) * uOpacity;
  gl_FragColor = vec4(col, alpha);
}
`;

function createSpiderShape(size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return canvas;
  }

  const s = size / 512;
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const cx = 256 * s;

  ctx.beginPath();
  ctx.ellipse(cx, 335 * s, 68 * s, 92 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(cx, 225 * s, 48 * s, 54 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  const attach = [195, 215, 235, 255];
  const kneeX = [150, 175, 180, 155];
  const kneeY = [130, 175, 275, 340];
  const footX = [245, 250, 245, 230];
  const footY = [45, 110, 370, 455];

  ctx.lineWidth = 16 * s;
  for (const sign of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + sign * 40 * s, attach[i] * s);
      ctx.quadraticCurveTo(
        cx + sign * kneeX[i] * s,
        kneeY[i] * s,
        cx + sign * footX[i] * s,
        footY[i] * s,
      );
      ctx.stroke();
    }
  }

  ctx.lineWidth = 10 * s;
  for (const sign of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(cx + sign * 18 * s, 185 * s);
    ctx.quadraticCurveTo(
      cx + sign * 40 * s,
      150 * s,
      cx + sign * 55 * s,
      165 * s,
    );
    ctx.stroke();
  }

  return canvas;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function SpiderBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) {
      return;
    }

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SOURCE);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SOURCE);
    if (!vert || !frag) {
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      return;
    }
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uCenter = gl.getUniformLocation(program, "uCenter");
    const uOpacity = gl.getUniformLocation(program, "uOpacity");
    const uHalo = gl.getUniformLocation(program, "uHalo");
    const uShape = gl.getUniformLocation(program, "uShape");

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      createSpiderShape(640),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(uShape, 0);

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA,
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(canvas.clientWidth, 1);
      const height = Math.max(canvas.clientHeight, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);

      const wide = width >= 900;
      gl.uniform2f(uCenter, 0.5, 0.5);
      gl.uniform1f(uOpacity, wide ? 0.8 : 0.4);

      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      gl.uniform1f(uHalo, dark ? 0.0 : 0.4);
    };

    const render = (time: number) => {
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    resize();
    window.addEventListener("resize", resize);
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", resize);

    let frame = 0;
    if (reducedMotion) {
      render(0);
    } else {
      const loop = (time: number) => {
        render(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      scheme.removeEventListener("change", resize);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
