import React, { useEffect, useRef } from "react";
import "./Loader.css";

// Constants for the grid size and cell size
const GRID_SIZE = 50;
const CELL_SIZE = 10;

const CellularAutomataLoader = () => {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rows = GRID_SIZE;
    const cols = GRID_SIZE;

    ctx.fillStyle = "#001233";

    // Initialize the grid with the Star Oscillator pattern
    const createGrid = () => {
      const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

      // Create a simple Star Oscillator pattern
      const centerX = Math.floor(rows / 2) - 10;
      const centerY = Math.floor(cols / 2);
      grid[centerX][centerY] = 1;
      grid[centerX - 1][centerY] = 1;
      grid[centerX + 1][centerY] = 1;
      grid[centerX][centerY - 1] = 1;
      grid[centerX][centerY + 1] = 1;

      return grid;
    };

    let grid = createGrid();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.fillStyle = grid[r][c] === 1 ? "#7d8597" : "#001026";
          ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
      ctx.fillStyle = "#fff";
      ctx.font = "70px Poppins";

      ctx.textAlign = "center";
      ctx.fillText("Loading", canvas.width / 2, canvas.height / 1.8);
    };

    const updateGrid = () => {
      const newGrid = grid.map((row) => row.slice());

      for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
          const liveNeighbors = [
            grid[r - 1][c],
            grid[r + 1][c],
            grid[r][c - 1],
            grid[r][c + 1],
            grid[r - 1][c - 1],
            grid[r - 1][c + 1],
            grid[r + 1][c - 1],
            grid[r + 1][c + 1],
          ].filter(Boolean).length;

          if (grid[r][c] === 1) {
            newGrid[r][c] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
          } else {
            newGrid[r][c] = liveNeighbors === 3 ? 1 : 0;
          }
        }
      }

      grid = newGrid;
    };

    const animate = () => {
      updateGrid();
      drawGrid();
    };

    intervalRef.current = setInterval(animate, 200);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="loader-container">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="loader-canvas"
      ></canvas>
    </div>
  );
};

export default CellularAutomataLoader;
