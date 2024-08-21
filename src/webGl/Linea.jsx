import React, { useRef, useEffect } from "react";
import PicoGL from "picogl";

// Function to generate a checkerboard texture
const generateCheckerboardTexture = (size, colors, checkSize) => {
  const data = new Uint8Array(size * size * 4); // RGBA format

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = (y * size + x) * 4;
      const color =
        (Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0
          ? colors[0]
          : colors[1];

      data[index + 0] = color[0]; // Red
      data[index + 1] = color[1]; // Green
      data[index + 2] = color[2]; // Blue
      data[index + 3] = 255; // Alpha
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
    const app = PicoGL.createApp(canvas).clearColor(0.0, 0.0, 0.0, 1.0);

    // Create shaders
    const vertexShaderSource = `#version 300 es
      in vec4 position;
      in vec2 texCoord;
      in vec4 color;
      out vec2 vTexCoord;
      out vec4 vColor;
      void main() {
        vTexCoord = texCoord;
        gl_Position = position;
        vColor = color;
      }`;

    const fragmentShaderSource = `#version 300 es
      precision highp float;
      in vec2 vTexCoord;
      in vec4 vColor;
      out vec4 outColor;
      uniform sampler2D uTexture;
      void main() {
        outColor = texture(uTexture, vTexCoord) * vColor;
      }`;

    const program = app.createProgram(vertexShaderSource, fragmentShaderSource);

    // Create buffers for positions and texture coordinates
    const positions = app.createVertexBuffer(
      PicoGL.FLOAT,
      2,
      new Float32Array([
        -1.0,
        -1.0, // Bottom left
        -1.0,
        1.0, // Top left
        1.0,
        1.0, // Top right
        1.0,
        1.0, // Top right
        1.0,
        -1.0, // Bottom right
        -1.0,
        -1.0, // Bottom left
      ]),
    );

    const colors = app.createVertexBuffer(
      PicoGL.FLOAT,
      4,
      new Float32Array([
        1.0, 0, 0, 1.0, 0, 1.0, 0, 1.0, 0, 0, 1.0, 1.0, 0, 0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 0.0, 0, 1.0,
      ]),
    );

    const texCoords = app.createVertexBuffer(
      PicoGL.FLOAT,
      2,
      new Float32Array([
        0.0,
        0.0, // Bottom left
        0.0,
        1.0, // Top left
        1.0,
        1.0, // Top right
        1.0,
        1.0, // Top right
        1.0,
        0.0, // Bottom right
        0.0,
        0.0, // Bottom left
      ]),
    );

    const vertexArray = app
      .createVertexArray()
      .vertexAttributeBuffer(0, positions, { size: 2 })
      .vertexAttributeBuffer(1, texCoords)
      .vertexAttributeBuffer(2, colors);

    // Create and load texture
    const textureData = generateCheckerboardTexture(
      128,
      [
        [255, 255, 255], // White
        [0, 0, 255], // Blue
      ],
      8,
    );

    const texture = app.createTexture2D(textureData, 128, 128, {
      internalFormat: PicoGL.RGBA8,
      mipmaps: false,
      minFilter: PicoGL.NEAREST,
      magFilter: PicoGL.NEAREST,
    });

    // Render loop
    const renderLoop = () => {
      app.clear();
      app
        .createDrawCall(program, vertexArray)
        .texture("uTexture", texture)
        .draw();

      requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Cleanup function
    return () => {};
  }, []);

  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default Linea;
