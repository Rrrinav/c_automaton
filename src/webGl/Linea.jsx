import React, { useRef, useEffect } from "react";
import PicoGL from "picogl";

const generateCheckerboardTexture = (size, colors) => {
  const data = new Uint8Array(size * size * 4); // RGBA format

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isWhite = ((x >> 3) & 1) === ((y >> 3) & 1);
      const color = isWhite ? colors[0] : colors[1]; // Choose between two colors
      const index = (y * size + x) * 4;
      data[index] = color[0]; // R
      data[index + 1] = color[1]; // G
      data[index + 2] = color[2]; // B
      data[index + 3] = 255; // A (full opacity)
    }
  }

  return data;
};

const Linea = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // Initialize PicoGL
    const app = PicoGL.createApp(canvas)
      .clearColor(0.0, 0.0, 0.0, 1.0)
      .depthTest();

    // Create shaders
    const vertexShaderSource = `#version 300 es
      in vec4 position;
      in vec3 color;
      in vec2 texCoord;
      out vec3 vColor;
      out vec2 vTexCoord;
      void main() {
        vColor = color;
        vTexCoord = texCoord;
        gl_Position = position;
      }`;

    const fragmentShaderSource = `#version 300 es
      precision highp float;
      in vec3 vColor;
      in vec2 vTexCoord;
      out vec4 outColor;
      uniform sampler2D uTexture;
      void main() {
        vec4 textureColor = texture(uTexture, vTexCoord);
        outColor = textureColor * vec4(vColor, 1.0); // Combine texture color with vertex color
      }`;

    const program = app.createProgram(vertexShaderSource, fragmentShaderSource);

    // Create buffers for positions, colors, and texture coordinates
    const positions = app.createVertexBuffer(
      PicoGL.FLOAT,
      2,
      new Float32Array([
        -0.5,
        -0.5, // Vertex 1
        0.5,
        -0.5, // Vertex 2
        0.0,
        0.5, // Vertex 3
      ]),
    );

    const colors = app.createVertexBuffer(
      PicoGL.FLOAT,
      3,
      new Float32Array([
        1.0,
        0.0,
        0.0, // Red
        0.0,
        1.0,
        0.0, // Green
        0.0,
        0.0,
        1.0, // Blue
      ]),
    );

    const texCoords = app.createVertexBuffer(
      PicoGL.FLOAT,
      2,
      new Float32Array([
        0.0,
        0.0, // Vertex 1 TexCoord
        1.0,
        0.0, // Vertex 2 TexCoord
        0.5,
        1.0, // Vertex 3 TexCoord
      ]),
    );

    const vertexArray = app
      .createVertexArray()
      .vertexAttributeBuffer(0, positions)
      .vertexAttributeBuffer(1, colors)
      .vertexAttributeBuffer(2, texCoords);

    const textureData = generateCheckerboardTexture(128, [
      [255, 255, 255],
      [0, 0, 0],
    ]);

    const texture = app.createTexture2D(textureData, 128, 128, {
      format: PicoGL.RGBA,
      internalFormat: PicoGL.RGBA8,
      mipmaps: true,
    });

    const renderLoop = () => {
      app.clear();
      app
        .createDrawCall(program, vertexArray)
        .texture("uTexture", texture)
        .draw();

      requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      texture.delete();
    };
  }, []);

  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default Linea;
