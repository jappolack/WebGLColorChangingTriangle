# WebGL Color-Changing Triangle

A small WebGL demo that renders a triangle on an HTML canvas and continuously
changes its color over time.

## Requirements

- A modern web browser with WebGL support
- Python 3, or another local static file server

## Run

From the project directory, start a local server:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000/triangleColor.html](http://localhost:8000/triangleColor.html)
in a WebGL-enabled browser.

You can also open `triangleColor.html` directly in a browser, but a local
server is recommended for consistent browser behavior.

## Project Files

- `triangleColor.html` defines the canvas and vertex and fragment shaders.
- `triangleColor.js` initializes WebGL, uploads the triangle vertices, compiles
  the shaders, and animates the fragment color with `requestAnimationFrame`.

The demo uses the browser's native WebGL API and does not require the external
`Common/webgl-utils.js` or `Common/initShaders.js` files.

## Troubleshooting

If the canvas is blank, make sure WebGL is enabled in the browser and check the
browser developer console for shader or WebGL errors.