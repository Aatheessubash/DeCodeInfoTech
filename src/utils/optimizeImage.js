const MAX_SOURCE_BYTES = 8 * 1024 * 1024;
const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1000;
const TARGET_BYTES = 650 * 1024;
const SUPPORTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('The selected image could not be opened.'));
    };
    image.src = objectUrl;
  });
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('The optimized image could not be saved.'));
    reader.readAsDataURL(blob);
  });
}

export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(bytes > 1024 * 100 ? 0 : 1)} KB`;
}

export async function optimizeProjectImage(file) {
  if (!file) throw new Error('Choose an image to upload.');
  if (!SUPPORTED_TYPES.has(file.type)) {
    throw new Error('Use a JPG, PNG, or WebP image.');
  }
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error('The image must be smaller than 8 MB.');
  }

  const image = await loadImage(file);
  const scale = Math.min(1, MAX_WIDTH / image.naturalWidth, MAX_HEIGHT / image.naturalHeight);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: false });

  if (!context) throw new Error('Image optimization is not supported in this browser.');

  canvas.width = width;
  canvas.height = height;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, 0, 0, width, height);

  let optimizedBlob = null;
  for (const quality of [0.84, 0.72, 0.6]) {
    optimizedBlob = await canvasToBlob(canvas, quality);
    if (optimizedBlob && optimizedBlob.size <= TARGET_BYTES) break;
  }

  if (!optimizedBlob) throw new Error('This browser could not optimize the selected image.');

  return {
    dataUrl: await blobToDataUrl(optimizedBlob),
    width,
    height,
    size: optimizedBlob.size,
  };
}
