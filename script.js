import init, { wasmGrayScale, wasmGaussian, wasmSobel } from './pkg/hello_wasm.js'
import { jsGrayScale } from './js_scripts/jsGrayScale.js';
import { jsSobel } from './js_scripts/jsSobel.js'
import { gauss } from './js_scripts/jsGaussian.js'

await init()
window.wasmGreyScale = wasmGreyScale;
window.wasmBlur = wasmBlur;
window.wasmSobel = runWasmSobel;
window.jsGrayScale = jsGrayScale;
window.jsSobel = runJsSobel;
window.jsGaussian = runJsGaussian;
window.loadImage = loadImage;

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

function loadImage(input) {
  const file = input.files[0];

  if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
          const image1 = new Image();
          image1.onload = function () {
              canvas.width = image1.width;
              canvas.height = image1.height;
              ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
          };
          image1.src = e.target.result;
      };

      reader.readAsDataURL(file);
  }
}

function wasmGreyScale() {
  const start = performance.now();

  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;
  wasmGrayScale(scannedData);
  const newImageData = new ImageData(scannedData, canvas.width, canvas.height)
  ctx.putImageData(newImageData, 0, 0);

  const end = performance.now();
  console.log(`wasmGreyScale: Execution time: ${end - start} ms`);

  var text = document.getElementById('operationTime');
  text.innerHTML = `Operation time: ${end - start} ms`;
}

function runWasmSobel() {
  const start = performance.now();

  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;
  wasmSobel(scannedData, canvas.width, canvas.height);
  const newImageData = new ImageData(scannedData, canvas.width, canvas.height)
  ctx.putImageData(newImageData, 0, 0);

  const end = performance.now();
  console.log(`wasmSobel: Execution time: ${end - start} ms`);

  var text = document.getElementById('operationTime');
  text.innerHTML = `Operation time: ${end - start} ms`;
}

function runJsSobel() {
  const start = performance.now();

  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;
  jsSobel(scannedData, canvas.width, canvas.height);
  const newImageData = new ImageData(scannedData, canvas.width, canvas.height)
  ctx.putImageData(newImageData, 0, 0);

  const end = performance.now();
  console.log(`jsSobel: Execution time: ${end - start} ms`);

  var text = document.getElementById('operationTime');
  text.innerHTML = `Operation time: ${end - start} ms`;
}

function runJsGaussian() {
  const start = performance.now();

  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;
  gauss(scannedData, scannedImage.width, scannedImage.height, 15);
  const newImageData = new ImageData(scannedData, canvas.width, canvas.height)
  ctx.putImageData(newImageData, 0, 0);

  const end = performance.now();
  console.log(`jsGaussian: Execution time: ${end - start} ms`);

  var text = document.getElementById('operationTime');
  text.innerHTML = `Operation time: ${end - start} ms`;
}

function wasmBlur() {
  const start = performance.now();

  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;
  wasmGaussian(scannedData, scannedImage.width, scannedImage.height, 15);
  const newImageData = new ImageData(scannedData, canvas.width, canvas.height)
  ctx.putImageData(newImageData, 0, 0);

  const end = performance.now();
  console.log(`wasmBlur: Execution time: ${end - start} ms`);

  var text = document.getElementById('operationTime');
  text.innerHTML = `Operation time: ${end - start} ms`;
}