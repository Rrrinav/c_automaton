// const canvas = document.getElementById("canvas");
// const gl = canvas.getContext("webgl2");
//
// const GRID_WIDTH = 40;
// const GRID_HEIGHT = 8;
//
// if (!gl) {
//   console.error("WebGL2 not supported");
//   throw new Error("WebGL2 not supported");
// }
//
// // Vertex shader
// const vsSource = `#version 300 es
// in vec4 a_position;
// out vec2 v_texCoord;
// void main() {
//     gl_Position = vec4(a_position.xy, 0.0, 1.0);
//     v_texCoord = a_position.xy * 0.5 + 0.5;
// }`;
//
// // Fragment shader for updating the game state
// const fsSourceUpdate = `#version 300 es
// precision highp float;
// uniform sampler2D u_state;
// uniform vec2 u_resolution;
// in vec2 v_texCoord;
// out vec4 outColor;
//
// int getCell(ivec2 coord) {
//     // Wrap coordinates around edges
//     coord = ivec2(mod(vec2(coord), u_resolution));
//     return int(texture(u_state, (vec2(coord) + 0.5) / u_resolution).r);
// }
//
// void main() {
//     ivec2 coord = ivec2(gl_FragCoord.xy);
//     int sum =
//         getCell(coord + ivec2(-1, -1)) +
//         getCell(coord + ivec2(-1,  0)) +
//         getCell(coord + ivec2(-1,  1)) +
//         getCell(coord + ivec2( 0, -1)) +
//         getCell(coord + ivec2( 0,  1)) +
//         getCell(coord + ivec2( 1, -1)) +
//         getCell(coord + ivec2( 1,  0)) +
//         getCell(coord + ivec2( 1,  1));
//
//     int current = getCell(coord);
//     int next = (sum == 3 || (sum == 2 && current == 1)) ? 1 : 0;
//     outColor = vec4(float(next), 0.0, 0.0, 1.0);
// }`;
//
// // Fragment shader for rendering
// const fsSourceRender = `#version 300 es
// precision highp float;
// uniform vec2 u_gridSize;
// uniform sampler2D u_state;
// in vec2 v_texCoord;
// out vec4 outColor;
//
// void main() {
//     vec2 scaledCoord = v_texCoord * u_gridSize;
//     float state = texture(u_state, scaledCoord / u_gridSize).r;
//     outColor = state > 0.5 ? vec4(0.831, 0.364, 1.0, 1.0) : vec4(0.0, 0.0, 0.0, 1.0);
// }`;
//
// // Create shader program
// function createProgram(vsSource, fsSource) {
//   const vertexShader = gl.createShader(gl.VERTEX_SHADER);
//   gl.shaderSource(vertexShader, vsSource);
//   gl.compileShader(vertexShader);
//   if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
//     console.error(
//       "Vertex shader failed to compile:",
//       gl.getShaderInfoLog(vertexShader),
//     );
//     return null;
//   }
//
//   const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
//   gl.shaderSource(fragmentShader, fsSource);
//   gl.compileShader(fragmentShader);
//   if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
//     console.error(
//       "Fragment shader failed to compile:",
//       gl.getShaderInfoLog(fragmentShader),
//     );
//     return null;
//   }
//
//   const program = gl.createProgram();
//   gl.attachShader(program, vertexShader);
//   gl.attachShader(program, fragmentShader);
//   gl.linkProgram(program);
//   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//     console.error("Program failed to link:", gl.getProgramInfoLog(program));
//     return null;
//   }
//
//   return program;
// }
//
// const updateProgram = createProgram(vsSource, fsSourceUpdate);
// const renderProgram = createProgram(vsSource, fsSourceRender);
//
// // Create textures and framebuffers
// const textures = [
//   createTexture(GRID_WIDTH, GRID_HEIGHT),
//   createTexture(GRID_WIDTH, GRID_HEIGHT),
// ];
// const framebuffers = [gl.createFramebuffer(), gl.createFramebuffer()];
//
// function createTexture(width, height) {
//   const texture = gl.createTexture();
//   gl.bindTexture(gl.TEXTURE_2D, texture);
//   gl.texImage2D(
//     gl.TEXTURE_2D,
//     0,
//     gl.R8,
//     width, // Use grid width
//     height, // Use grid height
//     0,
//     gl.RED,
//     gl.UNSIGNED_BYTE,
//     null, // No initial data
//   );
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
//   return texture;
// }
//
// // Initialize the grid
// function initGrid(width, height) {
//   const pixels = new Uint8Array(width * height);
//   for (let i = 0; i < pixels.length; i++) {
//     pixels[i] = Math.random() > 0.5 ? 255 : 0;
//   }
//   gl.bindTexture(gl.TEXTURE_2D, textures[0]);
//   gl.texSubImage2D(
//     gl.TEXTURE_2D,
//     0,
//     0,
//     0,
//     width,
//     height,
//     gl.RED,
//     gl.UNSIGNED_BYTE,
//     pixels,
//   );
// }
//
// function initGridWithGlider(width, height) {
//   const pixels = new Uint8Array(width * height);
//
//   // Define a glider pattern
//   const glider = [
//     { x: 1, y: 0 },
//     { x: 2, y: 1 },
//     { x: 0, y: 2 },
//     { x: 1, y: 2 },
//     { x: 2, y: 2 },
//   ];
//
//   // Place the glider in the grid
//   glider.forEach(({ x, y }) => {
//     pixels[y * width + x] = 255;
//   });
//
//   gl.bindTexture(gl.TEXTURE_2D, textures[0]);
//   gl.texSubImage2D(
//     gl.TEXTURE_2D,
//     0, // mipmap level
//     0, // x offset
//     0, // y offset
//     width, // width
//     height, // height
//     gl.RED, // format
//     gl.UNSIGNED_BYTE, // type
//     pixels, // pixel data
//   );
//   console.log(gl.getError());
// }
//
// // Use this function instead of the previous initGrid call
// initGridWithGlider(GRID_WIDTH, GRID_HEIGHT);
// // initGrid(GRID_WIDTH, GRID_HEIGHT);
//
// // Set up attribute and bind VAO
// const positionBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// gl.bufferData(
//   gl.ARRAY_BUFFER,
//   new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
//   gl.STATIC_DRAW,
// );
//
// const vao = gl.createVertexArray();
// gl.bindVertexArray(vao);
// gl.enableVertexAttribArray(0);
// gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
//
// // Main loop
// let currentTextureIndex = 0;
// function update() {
//   const nextTextureIndex = 1 - currentTextureIndex;
//
//   // Update state
//   gl.useProgram(updateProgram);
//   gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[nextTextureIndex]);
//   gl.framebufferTexture2D(
//     gl.FRAMEBUFFER,
//     gl.COLOR_ATTACHMENT0,
//     gl.TEXTURE_2D,
//     textures[nextTextureIndex],
//     0,
//   );
//   gl.viewport(0, 0, GRID_WIDTH, GRID_HEIGHT);
//   gl.uniform2f(
//     gl.getUniformLocation(updateProgram, "u_resolution"),
//     GRID_WIDTH,
//     GRID_HEIGHT,
//   );
//
//   gl.activeTexture(gl.TEXTURE0);
//   gl.bindTexture(gl.TEXTURE_2D, textures[currentTextureIndex]);
//   gl.uniform1i(gl.getUniformLocation(updateProgram, "u_state"), 0);
//
//   gl.bindVertexArray(vao);
//   gl.drawArrays(gl.TRIANGLES, 0, 6);
//
//   // Render to canvas
//   gl.useProgram(renderProgram);
//   gl.bindFramebuffer(gl.FRAMEBUFFER, null);
//   gl.viewport(0, 0, canvas.width, canvas.height);
//   gl.uniform2f(
//     gl.getUniformLocation(renderProgram, "u_gridSize"),
//     GRID_WIDTH,
//     GRID_HEIGHT,
//   );
//
//   gl.activeTexture(gl.TEXTURE0);
//   gl.bindTexture(gl.TEXTURE_2D, textures[nextTextureIndex]);
//   gl.uniform1i(gl.getUniformLocation(renderProgram, "u_state"), 0);
//
//   gl.bindVertexArray(vao);
//   gl.drawArrays(gl.TRIANGLES, 0, 6);
//
//   currentTextureIndex = nextTextureIndex;
//   setTimeout(() => {
//     requestAnimationFrame(update);
//   }, 1000 / 10);
// }
//
// update();
