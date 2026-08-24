var gl;
var colorLocation;

window.onload = function init()
{
    var canvas =
        document.getElementById("gl-canvas");

    gl = canvas.getContext("webgl");

    if (!gl)
    {
        alert("WebGL isn't available");
        return;
    }

    var vertices =
    [
        -0.8, -0.8,
         0.0,  0.8,
         0.8, -0.8
    ];

    gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
    );

    gl.clearColor(
        1.0,
        1.0,
        1.0,
        1.0
    );

    var program = createProgramFromScripts(
        gl,
        "vertex-shader",
        "fragment-shader"
    );

    if (!program)
    {
        return;
    }

    gl.useProgram(program);

    var bufferId =
        gl.createBuffer();

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        bufferId
    );

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );

    var vPosition =
        gl.getAttribLocation(
            program,
            "vPosition"
        );

    gl.vertexAttribPointer(
        vPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.enableVertexAttribArray(
        vPosition
    );

    colorLocation =
        gl.getUniformLocation(
            program,
            "uColor"
        );

    render();
};

function createProgramFromScripts(gl, vertexShaderId, fragmentShaderId)
{
    var vertexShader = compileShader(
        gl,
        gl.VERTEX_SHADER,
        document.getElementById(vertexShaderId).text
    );

    var fragmentShader = compileShader(
        gl,
        gl.FRAGMENT_SHADER,
        document.getElementById(fragmentShaderId).text
    );

    if (!vertexShader || !fragmentShader)
    {
        return null;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error(gl.getProgramInfoLog(program));
        return null;
    }

    return program;
}

function compileShader(gl, type, source)
{
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Generate changing colors

    var time = Date.now() / 1000;

    var red =
        (Math.sin(time) + 1) / 2;

    var green =
        (Math.sin(time + 2) + 1) / 2;

    var blue =
        (Math.sin(time + 4) + 1) / 2;

    gl.uniform4f(
        colorLocation,
        red,
        green,
        blue,
        1.0
    );

    gl.drawArrays(
        gl.TRIANGLES,
        0,
        3
    );

    requestAnimationFrame(render);
}