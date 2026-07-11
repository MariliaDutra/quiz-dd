// Downscale an image before storing it, so localStorage never chokes on a raw camera photo.
// JPEG has no alpha channel, so logos (which are usually transparent PNGs) must be kept as PNG.
export function resizeImageFile(file, maxSize = 480, format = "jpeg") {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(
          format === "png"
            ? canvas.toDataURL("image/png")
            : canvas.toDataURL("image/jpeg", 0.85)
        );
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
