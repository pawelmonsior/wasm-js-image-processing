function makeGaussKernel(sigma) {
  const GAUSSKERN = 6.0;
  var dim = parseInt(Math.max(3.0, GAUSSKERN * sigma));
  var sqrtSigmaPi2 = Math.sqrt(Math.PI * 2.0) * sigma;
  var s2 = 2.0 * sigma * sigma;
  var sum = 0.0;

  var kernel = new Float64Array(dim - !(dim & 1));
  const half = parseInt(kernel.length / 2);

  for (var j = 0, i = -half; j < kernel.length; i++, j++) {
    kernel[j] = Math.exp(-(i * i) / (s2)) / sqrtSigmaPi2;
    sum += kernel[j];
  }

  for (var i = 0; i < dim; i++) {
    kernel[i] /= sum;
  }

  return kernel;
}

function gauss_internal(data, w, h, kernel, ch) {
  var buff = new Uint8Array(w * h);
  var mk = Math.floor(kernel.length / 2);
  var kl = kernel.length;

  for (var j = 0, hw = 0; j < h; j++, hw += w) {
    for (var i = 0; i < w; i++) {
      var sum = 0;
      for (var k = 0; k < kl; k++) {
        var col = Math.max(0, Math.min(i + (k - mk), w - 1));
        sum += data[(hw + col) * 4 + ch] * kernel[k];
      }
      buff[hw + i] = sum;
    }
  }

  for (var j = 0, offset = 0; j < h; j++, offset += w) {
    for (var i = 0; i < w; i++) {
      var sum = 0;
      for (k = 0; k < kl; k++) {
        var row = Math.max(0, Math.min(j + (k - mk), h - 1));
        sum += buff[(row * w + i)] * kernel[k];
      }
      var off = (j * w + i) * 4;
      data[off + ch] = sum;
    }
  }
}

export function gauss(image_data, width, height, sigma) {
  var kernel = makeGaussKernel(sigma);

  for (var ch = 0; ch < 3; ch++) {
    gauss_internal(image_data, width, height, kernel, ch);
  }
}