import React, { useRef, useEffect, useState, useCallback } from "react";
import PicoGL from "picogl";

const DayNightAutomatonGL = ({ cellSize = 4, updateInterval = 100 }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle canvas resizing
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

  // Function to count neighbors and apply Day & Night rules
  const updateAutomaton = useCallback((state, columns, rows) => {
    const newState = new Uint8Array(columns * rows);

    const getNeighborCount = (x, y) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newX = (x + i + columns) % columns;
          const newY = (y + j + rows) % rows;
          count += state[newY * columns + newX];
        }
      }
      return count;
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        const neighbors = getNeighborCount(col, row);
        const isAlive = state[index];

        if (isAlive) {
          // Survival rules: 3, 4, 6, 7, 8 neighbors
          newState[index] = neighbors === 3 || neighbors === 4 || neighbors === 6 || neighbors === 7 || neighbors === 8 ? 1 : 0;
        } else {
          // Birth rules: 3, 6, 7, 8 neighbors
          newState[index] = neighbors === 3 || neighbors === 6 || neighbors === 7 || neighbors === 8 ? 1 : 0;
        }
      }
    }

    return newState;
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
        outColor = v_state >= 0.5 ? vec4(0.8, 0.8, 0.0, 1.0) : vec4(0.0, 0.0, 0.2, 1.0);  // Yellow for alive, dark blue for dead
      }`;

    const program = app.createProgram(vertSource, fragSource);

    const positions = new Float32Array(columns * rows * 12);
    const states = new Float32Array(columns * rows * 6);

    // Initialize the state (random starting configuration)
    let currentState = new Uint8Array(columns * rows).map(() => (Math.random() > 0.8 ? 1 : 0));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = (row * columns + col) * 12;
        const stateIndex = (row * columns + col) * 6;
        const x1 = ((col * cellSize) / width) * 2 - 1;
        const y1 = 1 - ((row * cellSize) / height) * 2;
        const x2 = (((col + 1) * cellSize) / width) * 2 - 1;
        const y2 = 1 - (((row + 1) * cellSize) / height) * 2;
        positions.set([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2], index);
        states.fill(currentState[row * columns + col], stateIndex, stateIndex + 6);
      }
    }

    const positionBuffer = app.createVertexBuffer(PicoGL.FLOAT, 2, positions);
    const stateBuffer = app.createVertexBuffer(PicoGL.FLOAT, 1, states);

    const vertexArray = app
      .createVertexArray()
      .vertexAttributeBuffer(0, positionBuffer)
      .vertexAttributeBuffer(1, stateBuffer);

    const drawCall = app.createDrawCall(program, vertexArray);

    let animationFrameId;
    let lastUpdateTime = 0;

    const updateAndDraw = (timestamp) => {
      if (timestamp - lastUpdateTime > updateInterval) {
        currentState = updateAutomaton(currentState, columns, rows);

        for (let i = 0; i < currentState.length; i++) {
          states.fill(currentState[i], i * 6, (i + 1) * 6);
        }
        stateBuffer.data(states);

        lastUpdateTime = timestamp;
      }

      app.clear();
      drawCall.draw();

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, cellSize, updateInterval, updateAutomaton]);

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default DayNightAutomatonGL;
