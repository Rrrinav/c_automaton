import React, { useRef, useEffect, useState, useCallback } from "react";
import PicoGL from "picogl";

const LangtonsAntGL = ({
  cellSize = 4,
  updateInterval = 100,
  initialState = null,
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle resizing of the canvas
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

  const updateAnt = useCallback((state, ant, columns, rows) => {
    // Get the current cell's state
    const currentState = state[ant.y * columns + ant.x];

    // Determine the new state of the current cell
    const newState = currentState === 0 ? 1 : 0;

    // Update the ant's direction
    const newDirection =
      currentState === 0
        ? (ant.direction + 1) % 4 // Turn right
        : (ant.direction + 3) % 4; // Turn left

    // Update the ant's position
    let newX = ant.x;
    let newY = ant.y;
    if (newDirection === 0) newY = (ant.y - 1 + rows) % rows; // Up
    if (newDirection === 1) newX = (ant.x + 1) % columns; // Right
    if (newDirection === 2) newY = (ant.y + 1) % rows; // Down
    if (newDirection === 3) newX = (ant.x - 1 + columns) % columns; // Left

    return {
      state: state.map((v, i) =>
        i === ant.y * columns + ant.x ? newState : v,
      ),
      ant: { x: newX, y: newY, direction: newDirection },
    };
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
        outColor = v_state >= 0.5 ? vec4(0.49, 0.522, 0.592, 0.9) : vec4(0.0, 0.062, 0.149, 1.0);
      }`;

    const program = app.createProgram(vertSource, fragSource);

    const positions = new Float32Array(columns * rows * 12);
    const states = new Float32Array(columns * rows * 6);

    // Initialize the state
    const initialStateArray =
      initialState ||
      new Uint8Array(columns * rows).map(() =>  (0) );// (Math.random() > 0.8 ? 1 : 0));

    // Initialize the ant's state
    let ant = {
      x: Math.floor(columns / 2),
      y: Math.floor(rows / 2),
      direction: 0,
    };

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
          initialStateArray[row * columns + col],
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
        const result = updateAnt(initialStateArray, ant, columns, rows);
        initialStateArray.set(result.state);
        ant = result.ant;

        for (let i = 0; i < initialStateArray.length; i++) {
          states.fill(initialStateArray[i], i * 6, (i + 1) * 6);
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
  }, [dimensions, cellSize, updateInterval, initialState, updateAnt]);

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default LangtonsAntGL;
