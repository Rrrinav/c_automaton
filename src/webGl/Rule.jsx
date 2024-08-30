import React, { useRef, useEffect, useState } from "react";
import PicoGL from "picogl";

const Rule = ({ rule = [0, 0, 1, 0, 0, 0, 0, 0] }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const cellSize = 2;

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = dimensions;
    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    const app = PicoGL.createApp(canvas).clearColor(0.0, 0.0, 0.0, 1.0);

    const vertSource = `#version 300 es
      in vec2 position;
      in float state;
      out float v_state;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        v_state = state;
      }`;

    const fragSource = `#version 300 es 
      precision highp float;
      in float v_state;
      out vec4 outColor;
      void main() {
        outColor = v_state >= 0.5 ? vec4(1.0) : vec4(0.0, 0.0, 0.0, 1.0);
      }`;

    const program = app.createProgram(vertSource, fragSource);

    const positions = new Float32Array(columns * rows * 12);
    const states = new Float32Array(columns * rows * 6);
    //randomly fill the first row
    for (let col = 0; col < columns; col++) {
      states[col * 6] = Math.random() > 0.5 ? 1 : 0;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = (row * columns + col) * 12;
        const x1 = ((col * cellSize) / width) * 2 - 1;
        const y1 = 1 - ((row * cellSize) / height) * 2;
        const x2 = (((col + 1) * cellSize) / width) * 2 - 1;
        const y2 = 1 - (((row + 1) * cellSize) / height) * 2;
        positions.set([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2], index);
      }
    }

    const positionBuffer = app.createVertexBuffer(PicoGL.FLOAT, 2, positions);
    const stateBuffer = app.createVertexBuffer(PicoGL.FLOAT, 1, states);

    const vertexArray = app
      .createVertexArray()
      .vertexAttributeBuffer(0, positionBuffer)
      .vertexAttributeBuffer(1, stateBuffer);

    const drawCall = app.createDrawCall(program, vertexArray);

    const cells = new Uint8Array(columns);
    cells[Math.floor(columns / 2)] = 1; // Start with a single cell in the middle

    let animationFrameId;
    let currentRow = 0;

    const updateAndDraw = () => {
      // Update states buffer for the current row
      for (let col = 0; col < columns; col++) {
        const stateIndex = (currentRow * columns + col) * 6;
        states.fill(cells[col], stateIndex, stateIndex + 6);
      }
      stateBuffer.data(states);

      app.clear();
      drawCall.draw();

      // Compute the next generation using the provided rule
      const newCells = new Uint8Array(columns);
      for (let col = 0; col < columns; col++) {
        const left = cells[(col - 1 + columns) % columns];
        const center = cells[col];
        const right = cells[(col + 1) % columns];
        const ruleIndex = (left << 2) | (center << 1) | right;
        newCells[col] = rule[ruleIndex];
      }

      states.copyWithin(0, columns * 6);

      // Update bottom row
      for (let col = 0; col < columns; col++) {
        const stateIndex = (rows - 1) * columns * 6 + col * 6;
        states.fill(newCells[col], stateIndex, stateIndex + 6);
      }

      cells.set(newCells);

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, rule]);

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Rule;
