pub fn run(image_data: &mut [u8]) {
    for i in (0..image_data.len()).step_by(4) {
        let total = u32::from(image_data[i]) + u32::from(image_data[i + 1]) + u32::from(image_data[i + 2]);
        let average_color_value = (total / 3) as u8;

        image_data[i] = average_color_value;
        image_data[i + 1] = average_color_value;
        image_data[i + 2] = average_color_value;
    }
}