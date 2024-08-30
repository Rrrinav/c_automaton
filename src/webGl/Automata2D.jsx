import React, { useRef, useEffect, useState, useCallback } from "react";
import PicoGL from "picogl";

const Automata2D = ({
  updateRule,
  initialState,
  cellSize = 4,
  updateInterval = 100,
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

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

  const simulationStep = useCallback(
    (currentState, columns, rows) => {
      const newState = new Uint8Array(columns * rows);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const neighbors = [
            currentState[
              ((y - 1 + rows) % rows) * columns + ((x - 1 + columns) % columns)
            ],
            currentState[((y - 1 + rows) % rows) * columns + x],
            currentState[
              ((y - 1 + rows) % rows) * columns + ((x + 1) % columns)
            ],
            currentState[y * columns + ((x - 1 + columns) % columns)],
            currentState[y * columns + ((x + 1) % columns)],
            currentState[
              ((y + 1) % rows) * columns + ((x - 1 + columns) % columns)
            ],
            currentState[((y + 1) % rows) * columns + x],
            currentState[((y + 1) % rows) * columns + ((x + 1) % columns)],
          ];

          newState[y * columns + x] = updateRule(
            currentState[y * columns + x],
            neighbors,
          );
        }
      }

      return newState;
    },
    [updateRule],
  );

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
       outColor = v_state >= 0.5 ? vec4(0.49, 0.522, 0.592, 0.9) : vec4(0.0, 0.062, 0.149, 1.0);
      }`;

    const program = app.createProgram(vertSource, fragSource);

    const positions = new Float32Array(columns * rows * 12);
    const states = new Float32Array(columns * rows * 6);

    // Initialize states
    let currentState;
    if (initialState && initialState.length === columns * rows) {
      currentState = new Uint8Array(initialState);
    } else {
      currentState = new Uint8Array(columns * rows);
      for (let i = 0; i < currentState.length; i++) {
        currentState[i] = Math.random() > 0.5 ? 1 : 0;
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = (row * columns + col) * 12;
        const stateIndex = (row * columns + col) * 6;
        const x1 = ((col * cellSize) / width) * 2 - 1;
        const y1 = 1 - ((row * cellSize) / height) * 2;
        const x2 = (((col + 1) * cellSize) / width) * 2 - 1;
        const y2 = 1 - (((row + 1) * cellSize) / height) * 2;
        positions.set([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2], index);
        states.fill(
          currentState[row * columns + col],
          stateIndex,
          stateIndex + 6,
        );
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
        currentState = simulationStep(currentState, columns, rows);

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
  }, [dimensions, cellSize, updateInterval, initialState, simulationStep]);

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Automata2D;
