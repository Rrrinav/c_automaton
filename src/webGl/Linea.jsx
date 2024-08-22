import React, { useRef, useEffect } from "react";
import PicoGL from "picogl";

const SmoothLife = () => {
  const canvasRef = useRef(null);
  const textureSize = 512.0; // Size of the texture

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize PicoGL
    const app = PicoGL.createApp(canvas).clearColor(0.0, 1.0, 0.0, 1.0);

    // Vertex Shader
    const vertexShaderSource = `#version 300 es
      in vec4 position;
      in vec2 texCoord;
      out vec2 vTexCoord;
      void main() {
        vTexCoord = texCoord;
        gl_Position = position;
      }`;

    // New Fragment Shader (as provided)
    const fragmentShaderSource = `#version 300 es
      precision mediump float;
      
      in vec2 vTexCoord;
      uniform sampler2D uCurrentState;
      uniform vec2 uTextureSize;
      
      out vec4 finalColor;
      
      float ra = 11.0;
      float dt = 0.08;
      
      vec2 modd(vec2 x, float y)
      {
        float xx = x.x - y * floor(x.x/y);
        float yy = x.y - y * floor(x.y/y);
        return (vec2(xx, yy));
      }

     
      float grid(vec2 uv)
      {
          vec2 UV = modd(uv, 1.0);
          vec4 t = texture(uCurrentState, UV);
          return max(max(t.r, t.g), t.b);
      }
      
      void main()
      {
          vec2 uv = vTexCoord;
          vec2 pixelCoord = uv * uTextureSize;
          float ri = ra/3.0;
          float m = 0.0;
          float n = 0.0;
          float M = 3.14159265359 * ri * ri;
          float N = 3.14159265359 * ra * ra - M;
      
          for (float dy = -ra; dy <= ra; dy += 1.0) {
              for (float dx = -ra; dx <= ra; dx += 1.0) {
                  vec2 offset = vec2(dx, dy) / uTextureSize;
                  vec2 sampleUV = uv + offset;
                  if (dx*dx + dy*dy <= ri*ri) {
                      m += grid(sampleUV);
                  } else if (dx*dx + dy*dy <= ra*ra) {
                      n += grid(sampleUV);
                  }
              }
          }
          m /= M;
          n /= N;
      
          // SmoothLife rules
          float b1 = 0.257;
          float b2 = 0.336;
          float d1 = 0.365;
          float d2 = 0.549;
          float alpha_n = 0.028;
          float alpha_m = 0.147;
      
          float sigma1 = 1.0/(1.0 + exp(-(n - (m*(1.0 - b1) + b1*d1))*4.0/alpha_n));
          float sigma2 = 1.0/(1.0 + exp(-(n - (m*(1.0 - b2) + b2*d2))*4.0/alpha_n));
          float q = sigma1 * (1.0 - sigma2);
      
          float diff = 2.0*q - 1.0;
          float v = clamp(grid(uv) + dt*diff, 0.0, 1.0);
      
          finalColor = vec4(v, v, v, 1.0) * vec4(0.0, 1.0, 1.0, 1.0);

      }`;
    const program = app.createProgram(vertexShaderSource, fragmentShaderSource);

    const positions = app.createVertexBuffer(
      PicoGL.FLOAT,
      2,
      new Float32Array([
        -1.0,
        -1.0, // Bottom-left corner
        -1.0,
        1.0, // Top-left corner
        1.0,
        -1.0, // Bottom-right corner
        -1.0,
        1.0, // Top-left corner
        1.0,
        1.0, // Top-right corner
        1.0,
        -1.0, // Bottom-right corner
      ]),
    );

    const texCoords = app.createVertexBuffer(
      PicoGL.FLOAT,
      2,
      new Float32Array([
        0.0,
        0.0, // Bottom-left corner
        0.0,
        1.0, // Top-left corner
        1.0,
        0.0, // Bottom-right corner
        0.0,
        1.0, // Top-left corner
        1.0,
        1.0, // Top-right corner
        1.0,
        0.0, // Bottom-right corner
      ]),
    );

    const vertexArray = app
      .createVertexArray()
      .vertexAttributeBuffer(0, positions)
      .vertexAttributeBuffer(1, texCoords);

    const initStateData = new Uint8Array(textureSize * textureSize * 4);
    for (let i = 0; i < initStateData.length; i += 4) {
      const state = Math.random() > 0.09 ? 255 : 0;

      initStateData[i] = state; // R
      initStateData[i + 1] = state; // G
      initStateData[i + 2] = state; // B
      initStateData[i + 3] = 255; // A
    }

    const texture1 = app.createTexture2D(
      initStateData,
      textureSize,
      textureSize,
      {
        internalFormat: PicoGL.RGBA8,
        type: PicoGL.UNSIGNED_BYTE,
        minFilter: PicoGL.NEAREST,
        magFilter: PicoGL.NEAREST,
        wrapS: PicoGL.REPEAT,
        wrapT: PicoGL.REPEAT,
      },
    );

    const texture2 = app.createTexture2D(
      initStateData,
      textureSize,
      textureSize,
      {
        internalFormat: PicoGL.RGBA8,
        type: PicoGL.UNSIGNED_BYTE,
        minFilter: PicoGL.NEAREST,
        magFilter: PicoGL.NEAREST,
        wrapS: PicoGL.REPEAT,
        wrapT: PicoGL.REPEAT,
      },
    );

    const textures = [texture1, texture2];

    const framebuffer1 = app.createFramebuffer().colorTarget(0, texture1);
    const framebuffer2 = app.createFramebuffer().colorTarget(0, texture2);

    let state = 0;

    const renderLoop = () => {
      app.drawFramebuffer(state === 0 ? framebuffer2 : framebuffer1);
      app.clear();
      app
        .createDrawCall(program, vertexArray)
        .texture("uCurrentState", textures[state])
        .uniform("uTextureSize", [textureSize, textureSize])
        .draw();

      // Swap textures
      state = 1 - state;

      app.defaultDrawFramebuffer();
      app.clear();
      app
        .createDrawCall(program, vertexArray)
        .texture("uCurrentState", textures[state])
        .uniform("uTextureSize", [textureSize, textureSize])
        .draw();

      setTimeout(() => requestAnimationFrame(renderLoop), 1000 / 10);
    };

    renderLoop();

    return () => {};
  }, []);

  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default SmoothLife;
