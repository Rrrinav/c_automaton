import React, { useRef, useEffect, useState, useCallback } from "react";

const Glider = ({ width, height, bgColor = [0.0, 0.062, 0.149] }) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const bufferRef = useRef(null);
  const animationRef = useRef(null);
  const gridRef = useRef(
    Array.from({ length: height }, () => Array(width).fill(0)),
  );

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: 800,
  });

  const initializeGrid = useCallback(() => {
    const grid = gridRef.current;
    grid.forEach((row) => row.fill(0)); // Clear the grid

    // Initialize glider in the middle of the grid
    grid[2][3] = 1;
    grid[3][4] = 1;
    grid[4][2] = 1;
    grid[4][3] = 1;
    grid[4][4] = 1;
  }, []);

  const updateGrid = useCallback(() => {
    const grid = gridRef.current;
    const newGrid = grid.map((arr) => [...arr]);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const sum =
          grid[(y - 1 + height) % height][(x - 1 + width) % width] +
          grid[(y - 1 + height) % height][x] +
          grid[(y - 1 + height) % height][(x + 1) % width] +
          grid[y][(x - 1 + width) % width] +
          grid[y][(x + 1) % width] +
          grid[(y + 1) % height][(x - 1 + width) % width] +
          grid[(y + 1) % height][x] +
          grid[(y + 1) % height][(x + 1) % width];

        newGrid[y][x] =
          grid[y][x] === 1
            ? sum === 2 || sum === 3
              ? 1
              : 0
            : sum === 3
              ? 1
              : 0;
      }
    }
    gridRef.current = newGrid;
  }, []);

  const createShader = useCallback((gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(shader),
      );
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }, []);

  const createProgram = useCallback((gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(program),
      );
      return null;
    }
    return program;
  }, []);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL2 not supported");
      return;
    }
    glRef.current = gl;

    const vsSource = `#version 300 es
      in vec4 a_position;
      void main() {
        gl_Position = a_position;
      }`;

    const fsSource = `#version 300 es
      precision highp float;
      uniform vec4 u_color;
      out vec4 outColor;
      void main() {
        outColor = u_color;
      }`;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    programRef.current = program;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    bufferRef.current = positionBuffer;

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position",
    );
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  }, [createShader, createProgram]);

  const drawRect = useCallback((x, y, width, height, color) => {
    const gl = glRef.current;
    const program = programRef.current;
    const buffer = bufferRef.current;
    const canvas = canvasRef.current;

    const x1 = (x / canvas.width) * 2 - 1;
    const y1 = (y / canvas.height) * -2 + 1;
    const x2 = ((x + width) / canvas.width) * 2 - 1;
    const y2 = ((y + height) / canvas.height) * -2 + 1;

    const positions = new Float32Array([
      x1,
      y1,
      x2,
      y1,
      x1,
      y2,
      x1,
      y2,
      x2,
      y1,
      x2,
      y2,
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.uniform4fv(gl.getUniformLocation(program, "u_color"), color);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, []);

  const render = useCallback(() => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    if (!gl) return;

    gl.clearColor(bgColor[0], bgColor[1], bgColor[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const grid = gridRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === 1) {
          drawRect(
            x * (canvas.width / width),
            y * (canvas.height / height),
            canvas.width / width - 2,
            canvas.height / height - 2,
            [0.49, 0.522, 0.592, 0.9],
          );
        }
      }
    }
  }, [drawRect]);

  const loop = useCallback(() => {
    updateGrid();
    render();
    animationRef.current = setTimeout(
      () => requestAnimationFrame(loop),
      1000 / 10,
    );
  }, [updateGrid, render]);

  useEffect(() => {
    initWebGL();
    initializeGrid();
    loop();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [initWebGL, initializeGrid, loop]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: 800 });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (canvas && gl) {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      render();
    }
  }, [dimensions, render]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{ width: "100%", height: "40vh", margin: 0, padding: 0 }}
    />
  );
};

export default Glider;
