use std::cmp;

pub fn run(image_data: &mut [u8], width: usize, height: usize, sigma: f64) {
    let kernel = make_gauss_kernel(sigma);

    for ch in 0..3 {
        gauss_internal(image_data, width, height, &kernel, ch);
    }
}

fn make_gauss_kernel(sigma: f64) -> Vec<f64> {
    const GAUSSKERN: f64 = 6.0;
    let dim = f64::max(3.0, GAUSSKERN * sigma) as usize;
    let sqrt_sigma_pi2 = (std::f64::consts::PI * 2.0 * sigma).sqrt();
    let s2 = 2.0 * sigma * sigma;
    let mut sum = 0.0;

    let mut kernel = Vec::with_capacity(dim);
    let half = kernel.len() / 2;

    for j in 0..dim {
        let i = j as isize - half as isize;
        kernel.push((-((i * i) as f64) / s2).exp() / sqrt_sigma_pi2);
        sum += kernel[j];
    }

    for i in 0..dim {
        kernel[i] /= sum;
    }

    kernel
}

fn gauss_internal(data: &mut [u8], w: usize, h: usize, kernel: &[f64], ch: usize) {
    let mut buff = vec![0u8; w * h];
    let mk = f64::floor((kernel.len() / 2) as f64);
    let kl = kernel.len();
    let mut hw = 0;
    let mut offset = 0;

    for j in 0..h {
        for i in 0..w {
            let mut sum = 0.0;
            for k in 0..kl {
                let col = cmp::max(0, cmp::min(i as usize + (k -mk as usize), w as usize - 1)) as usize;
                sum += f64::from(data[(hw + col) * 4 + ch]) * kernel[k];
            }
            buff[hw + i] = sum as u8;
        }
        hw += w;
    }

    for j in 0..h {
        for i in 0..w {
            let mut sum = 0.0;
            for k in 0..kl {
                let row = cmp::max(0, cmp::min(j as usize + (k -mk as usize), h as usize - 1)) as usize;
                sum += f64::from(buff[row * w + i]) * kernel[k];
            }
            let off = (j * w + i) * 4;
            data[off + ch] = sum as u8;
        }
        offset += w;
    }
}