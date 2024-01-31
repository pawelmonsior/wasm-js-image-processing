use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;
use std::panic;
mod gaussian;
mod grayscale;
mod sobel;

#[wasm_bindgen]
pub fn wasmGaussian(image_data: &mut [u8], width: usize, height: usize, sigma: f64) {
    gaussian::run(image_data, width, height, sigma);
}

#[wasm_bindgen]
pub fn wasmGrayScale(image_data: &mut [u8]) {
    grayscale::run(image_data);
}

#[wasm_bindgen]
pub fn wasmSobel(image_data: &mut [u8], width: usize, height: usize) {
    // panic::set_hook(Box::new(console_error_panic_hook::hook));
    sobel::run(image_data, width, height);
}