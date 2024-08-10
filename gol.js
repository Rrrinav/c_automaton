const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = 800;
const gl = canvas.getContext("webgl2");

const resolution = canvas.height / canvas.width;

var GRID_WIDTH = 20;
var CELL_WIDTH = Math.ceil(canvas.width / GRID_WIDTH);
var GRID_HEIGHT = 6;
var CELL_HEIGHT = Math.ceil(canvas.height / GRID_HEIGHT);

if (!gl) {
  console.error("WebGL2 not supported");
  throw new Error("WebGL2 not supported");
}

// Vertex shader
const vsSource = `#version 300 es
in vec4 a_position;
void main() {
    gl_Position = a_position;
}`;

// Fragment shader for rendering
const fsSourceRender = `#version 300 es
precision highp float;
uniform vec4 u_color;
out vec4 outColor;

void main() {
    vec2 p = gl_FragCoord.xy;
    outColor = u_color;
}`;

// Create shader program
function createProgram(vsSource, fsSource) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vsSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "Vertex shader failed to compile:",
      gl.getShaderInfoLog(vertexShader),
    );
    return null;
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fsSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "Fragment shader failed to compile:",
      gl.getShaderInfoLog(fragmentShader),
    );
    return null;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program failed to link:", gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

const renderProgram = createProgram(vsSource, fsSourceRender);

// Create buffers for rendering
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positionLocation = gl.getAttribLocation(renderProgram, "a_position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

function drawRect(x, y, width, height, color) {
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

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  gl.useProgram(renderProgram);
  gl.uniform4f(gl.getUniformLocation(renderProgram, "u_color"), ...color);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// Game of Life logic
let grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0));

// Initialize a glider
grid[1][2] = 1;
grid[2][3] = 1;
grid[3][1] = 1;
grid[3][2] = 1;
grid[3][3] = 1;

function updateGrid() {
  const newGrid = grid.map((arr) => [...arr]);
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const sum =
        grid[(y - 1 + GRID_HEIGHT) % GRID_HEIGHT][
          (x - 1 + GRID_WIDTH) % GRID_WIDTH
        ] +
        grid[(y - 1 + GRID_HEIGHT) % GRID_HEIGHT][x] +
        grid[(y - 1 + GRID_HEIGHT) % GRID_HEIGHT][(x + 1) % GRID_WIDTH] +
        grid[y][(x - 1 + GRID_WIDTH) % GRID_WIDTH] +
        grid[y][(x + 1) % GRID_WIDTH] +
        grid[(y + 1) % GRID_HEIGHT][(x - 1 + GRID_WIDTH) % GRID_WIDTH] +
        grid[(y + 1) % GRID_HEIGHT][x] +
        grid[(y + 1) % GRID_HEIGHT][(x + 1) % GRID_WIDTH];

      if (grid[y][x] === 1) {
        newGrid[y][x] = sum === 2 || sum === 3 ? 1 : 0;
      } else {
        newGrid[y][x] = sum === 3 ? 1 : 0;
      }
    }
  }
  grid = newGrid;
}

function render() {
  gl.clearColor(0.043, 0, 0.2, 1.0); // Light grey background
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (grid[y][x] === 1) {
        drawRect(
          x * CELL_WIDTH,
          y * CELL_HEIGHT,
          CELL_WIDTH - 2, // Slightly smaller cells for better visibility
          CELL_HEIGHT - 2,
          [0.11, 0.447, 0.576, 0.9], // Black color for alive cells
          // [0.24725, 0.1995, 0.0745, 1.0],
        );
      }
    }
  }
}

function loop() {
  updateGrid();
  render();
  setTimeout(() => {
    requestAnimationFrame(loop);
  }, 1000 / 8);
}

loop();
