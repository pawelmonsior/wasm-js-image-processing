export function jsSobel(image_data, width, height) {
  const SOBEL_V =
    [
      -1.0, 0.0, +1.0,
      -2.0, 0.0, +2.0,
      -1.0, 0.0, +1.0
    ];

  const SOBEL_H =
    [
      -1.0, -2.0, -1.0,
      0.0, 0.0, 0.0,
      +1.0, +2.0, +1.0
    ];

  let pixels = new Uint8ClampedArray(image_data.length / 4);
  let data = image_data;

  {
    let i = data.length;
    while (i) {
      i -= 4;
      let b = data[i + 2];
      let g = data[i + 1];
      let r = data[i];
      pixels[i / 4] = 0.3 * r + 0.59 * g + 0.11 * b;
    }
  }

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let h_sum = 0.0;
      let v_sum = 0.0;
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
          const pixel = pixels[(y + j - 1) * width + (x + i - 1)];
          const kernel_accessor = i * 3 + j;
          h_sum += pixel * SOBEL_H[kernel_accessor];
          v_sum += pixel * SOBEL_V[kernel_accessor];
        }
      }
      const gradient_magnitude = Math.sqrt(h_sum ** 2 + v_sum ** 2);

      const idx = ((y - 1) * width + (x - 1)) * 4;
      image_data[idx] = gradient_magnitude;
      image_data[idx + 1] = gradient_magnitude;
      image_data[idx + 2] = gradient_magnitude;
    }
  }
}