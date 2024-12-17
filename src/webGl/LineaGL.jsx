import React, { useRef, useEffect } from "react";
import PicoGL from "picogl";

const SmoothLife = () => {
  const canvasRef = useRef(null);
  const texturewidth = 512.0; // Size of the texture
  const textureheight = 256.0; // Size of the texture
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
      
      float ra = 12.0;
      float dt = 0.96;
      
      float b1 = 0.258;
      float b2 = 0.327;
      float d1 = 0.3649;
      float d2 = 0.548;
      float alpha_n = 0.028;
      float alpha_m = 0.147;
      float grid(vec2 uv)
      { 
          uv = fract(uv); 
          vec4 t = texture(uCurrentState, uv);
          return max(t.g, t.r);
      }
      
      float sigma(float x, float a, float alpha)
      {
        return 1.0/(1.0 + exp(-(x - a)*4.0/alpha));
      }
     
      float sigma_n(float x, float a, float b)
      {
          return sigma(x, a, alpha_n)*(1.0 - sigma(x, b, alpha_n));
      }

      float sigma_m(float x, float y, float m)
      {
          return x*(1.0 - sigma(m, 0.5, alpha_m)) + y*sigma(m, 0.5, alpha_m);
      }
      
      float s(float n, float m)
      {
          return sigma_n(n, sigma_m(b1, d1, m), sigma_m(b2, d2, m));
      }
      void main()
      {
          vec2 uv = vTexCoord;
          vec2 pixelCoord = uv * uTextureSize;
          float ri = 3.0;
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
          float q = s(n, m);

          float diff = 2.0 * q - 1.0;
          float v = clamp(grid(uv) + dt*diff, 0.0, 1.0);
          vec4 color;
          if (v <= 0.0) {
          color = vec4(0.0, 0.0, 0.15, 1.0);
          } else {
          color =  vec4(v, v, v, 1.0) * vec4(0.9 , 1. , 1. ,0.7);
          }
          finalColor = color; 
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

    const initStateData = new Uint8Array(texturewidth * textureheight * 4);
    for (let y = 0; y < textureheight; y++) {
      for (let x = 0; x < texturewidth; x++) {
        const i = (y * texturewidth + x) * 4;
        const state = Math.random() * 255; 
        initStateData[i] = state;
        initStateData[i + 1] = state;
        initStateData[i + 2] = state;
        initStateData[i + 3] = 255;
      }
    }

    const texture1 = app.createTexture2D(
      initStateData,
      texturewidth,
      textureheight,
      {
        internalFormat: PicoGL.RGBA8,
        type: PicoGL.UNSIGNED_BYTE,
        minFilter: PicoGL.LINEAR,
        magFilter: PicoGL.LINEAR,
        wrapS: PicoGL.REPEAT,
        wrapT: PicoGL.REPEAT,
      },
    );

    const texture2 = app.createTexture2D(
      initStateData,
      texturewidth,
      textureheight,
      {
        internalFormat: PicoGL.RGBA8,
        type: PicoGL.UNSIGNED_BYTE,
        minFilter: PicoGL.LINEAR,
        magFilter: PicoGL.LINEAR,
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
      app.viewport(0, 0, texturewidth, textureheight);
      app.clear();
      app
        .createDrawCall(program, vertexArray)
        .texture("uCurrentState", textures[state])
        .uniform("uTextureSize", [texturewidth, textureheight])
        .draw();

      // Swap textures
      state = 1 - state;

      app.defaultDrawFramebuffer();
      app.viewport(0, 0, canvas.width, canvas.height);
      app.clear();
      app
        .createDrawCall(program, vertexArray)
        .texture("uCurrentState", textures[state])
        .uniform("uTextureSize", [texturewidth, textureheight])
        .draw();
      setTimeout(() => requestAnimationFrame(renderLoop), 1000 / 12);
    };

    renderLoop();

    return () => {};
  }, []);

  return <canvas ref={canvasRef} width={800} height={460} />;
};

export default SmoothLife;
