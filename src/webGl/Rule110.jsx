import React, { useEffect, useRef } from "react";
import PicoGL from "picogl";

const Rule110 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = PicoGL.createContext(canvas);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader for Rule 110
    const fragmentShaderSource = `
      precision highp float;
      uniform float uTime;
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      varying vec2 vTexCoord;

      void main() {
        vec2 texCoord = gl_FragCoord.xy / uResolution;
        float rule = texture2D(uTexture, texCoord).r;
        float newVal = (rule == 1.0) ? 0.0 : 1.0;
        gl_FragColor = vec4(newVal, newVal, newVal, 1.0);
      }
    `;

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = gl.createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    // Create program
    const program = gl.createProgram(vertexShader, fragmentShader);

    // Create buffer
    const buffer = gl.createBuffer(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    );

    // Create texture
    const texture = gl.createTexture(gl.TEXTURE_2D, {
      data: new Uint8Array(256 * 256 * 4),
      width: 256,
      height: 256,
      format: gl.RGBA,
      type: gl.UNSIGNED_BYTE,
    });

    // Uniforms
    const uTime = gl.getUniformLocation(program, "uTime");
    const uTexture = gl.getUniformLocation(program, "uTexture");
    const uResolution = gl.getUniformLocation(program, "uResolution");

    // Set up attributes and uniforms
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Animation loop
    const animate = (time) => {
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTexture, 0);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time / 1000);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Clean up
    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
    };
  }, []);

  return (
    <div>
      <h1>Rule 110 Demo</h1>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default Rule110;
