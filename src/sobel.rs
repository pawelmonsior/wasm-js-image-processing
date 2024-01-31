pub fn run(image_data: &mut [u8], width: usize, height: usize) {
    const SOBEL_H: [f32; 9] = [-1.0, -2.0, -1.0, 0.0, 0.0, 0.0, 1.0, 2.0, 1.0];
    const SOBEL_V: [f32; 9] = [-1.0, 0.0, 1.0, -2.0, 0.0, 2.0, -1.0, 0.0, 1.0];

    let mut pixels: Vec<f32> = vec![0.0; image_data.len() / 4];
    let data = &image_data[..];

    let mut i = data.len();
    while i > 0 {
        i -= 4;
        let b = data[i + 2] as f32;
        let g = data[i + 1] as f32;
        let r = data[i] as f32;
        pixels[i / 4] = 0.3 * r + 0.59 * g + 0.11 * b;
    }

    for y in 1..height - 1 {
        for x in 1..width - 1 {
            let mut h_sum = 0.0;
            let mut v_sum = 0.0;
            for j in 0..3 {
                for i in 0..3 {
                    let pixel = pixels[((y + j - 1) * width + (x + i - 1)) as usize];
                    let kernel_accessor = (i * 3) + j;
                    h_sum += pixel * SOBEL_H[kernel_accessor];
                    v_sum += pixel * SOBEL_V[kernel_accessor];
                }
            }
            let gradient_magnitude = (h_sum.powi(2) + v_sum.powi(2)).sqrt() as u8;

            let idx = ((y - 1) * width + (x - 1)) * 4;
            image_data[idx] = gradient_magnitude;
            image_data[idx + 1] = gradient_magnitude;
            image_data[idx + 2] = gradient_magnitude;
        }
    }
}