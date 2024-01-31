export function jsGrayScale() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    const start = performance.now();

    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data;
    for (let i = 0; i < scannedData.length; i += 4) {
        const r = scannedData[i];
        const g = scannedData[i + 1];
        const b = scannedData[i + 2];

        const L = 0.3 * r + 0.59 * g + 0.11 * b;

        scannedData[i] = L;
        scannedData[i + 1] = L;
        scannedData[i + 2] = L;
    }
    const newImageData = new ImageData(scannedData, canvas.width, canvas.height)
    ctx.putImageData(newImageData, 0, 0);

    const end = performance.now();
    console.log(`jsGreyScale: Execution time: ${end - start} ms`);

    var text = document.getElementById('operationTime');
    text.innerHTML = `Operation time: ${end - start} ms`;
}