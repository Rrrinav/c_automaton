import React, { useRef, useEffect } from "react";
import PicoGL from "picogl";

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
    out vec3 vColor;
    void main() {
      vColor = color;
      gl_Position = position;
    }`;

    const fragmentShaderSource = `#version 300 es
    precision highp float;
    in vec3 vColor;
    out vec4 color;
    void main() {
      color = vec4(vColor, 1.0); // Use the interpolated color
    }`;

    const program = app.createProgram(vertexShaderSource, fragmentShaderSource);

    // Create buffers for positions and colors
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

    const vertexArray = app
      .createVertexArray()
      .vertexAttributeBuffer(0, positions)
      .vertexAttributeBuffer(1, colors);

    // Draw function
    const draw = () => {
      app.clear();
      app.createDrawCall(program, vertexArray).draw(PicoGL.TRIANGLES, 3);
    };

    // Render loop
    const renderLoop = () => {
      draw();
      requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Cleanup function
    return () => {};
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Linea;
