/**
 * Ordered (matrix) dithering with:
 *   • 4×4 or 8×8 Bayer matrix (any power‑of‑two size)
 *   • three output modes:
 *        - "bw"        : black‑/white (binary)
 *        - "grayscale" : 8‑bit gray (no dithering, just luminance)
 *        - "palette"   : nearest colour from a supplied palette
 *
 * The class is pure – it receives an ImageData and returns a new ImageData.
 * No DOM manipulation, no external deps.
 */

type DitherMode = 'bw' | 'grayscale' | 'palette';

interface DitherOptions {
  /** Size of the Bayer matrix (must be a power of two). Default = 4. */
  size?: number;
  /** Desired output mode – see DitherMode type. Default = 'bw'. */
  mode?: DitherMode;
  /**
   * Palette for mode === 'palette'.
   * Flat Uint8ClampedArray (or number[]) **must** contain a multiple of 3 entries:
   *   [R0,G0,B0, R1,G1,B1, …]
   */
  palette?: Uint8ClampedArray | number[];
}

/** Simple 2‑D matrix type */
type BayerMatrix = number[][];

/**
 * Build a Bayer matrix of the given order (order = 2ⁿ).
 * Returns integer values 0 … order²‑1.
 */
function buildBayerMatrix(order: number): BayerMatrix {
  if (order === 2) return [[0, 2], [3, 1]];

  const smaller = buildBayerMatrix(order / 2);
  const newMatrix: number[][] = Array.from({ length: order }, () =>
    new Array(order).fill(0)
  );

  const offsets: [number, number, number][] = [
    [0, 0, 0],                 // top‑left
    [0, order / 2, 2],        // top‑right
    [order / 2, 0, 3],        // bottom‑left
    [order / 2, order / 2, 1], // bottom‑right
  ];

  for (const [rowOff, colOff, add] of offsets) {
    for (let r = 0; r < smaller.length; ++r) {
      for (let c = 0; c < smaller.length; ++c) {
        newMatrix[rowOff + r][colOff + c] = 4 * smaller[r][c] + add;
      }
    }
  }
  return newMatrix;
}

/**
 * Fast Euclidean distance (no sqrt – monotonic) between two RGB triples.
 */
function colourDistance(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
): number {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return dr * dr + dg * dg + db * db;
}

/** Main class */
export class BayerOrderedDither {
  private readonly size: number;
  private readonly matrix: BayerMatrix;
  private readonly divisor: number; // = size * size, used for scaling
  private readonly mode: DitherMode;
  private readonly palette?: Uint8ClampedArray; // flat RGB array

  /**
   * @param opts Configuration object.
   *   - size   : 2,4,8,16,… (default 4)
   *   - mode   : 'bw' | 'grayscale' | 'palette' (default 'bw')
   *   - palette: required when mode === 'palette', flat RGB list.
   */
  constructor(opts: DitherOptions = {}) {
    const { size = 4, mode = 'bw', palette } = opts;

    if (size < 2 || (size & (size - 1)) !== 0) {
      throw new Error('Bayer matrix size must be a power of two (2,4,8,16,…)');
    }
    this.size = size;
    this.matrix = buildBayerMatrix(size);
    this.divisor = size * size;
    this.mode = mode;

    if (mode === 'palette') {
      if (!palette) {
        throw new Error('Palette must be supplied when mode = "palette".');
      }
      // Normalise to Uint8ClampedArray (for fast indexing)
      this.palette =
        palette instanceof Uint8ClampedArray
          ? palette
          : new Uint8ClampedArray(palette);
      if (this.palette.length % 3 !== 0) {
        throw new Error('Palette length must be a multiple of 3 (RGB triples).');
      }
    }
  }

  /**
   * Apply the selected ordered‑dither to an ImageData object.
   *
   * @returns a **new** ImageData (the original is untouched).
   */
  public apply(image: ImageData): ImageData {
    const { width, height, data: src } = image;
    const out = new Uint8ClampedArray(src.length);

    for (let y = 0; y < height; ++y) {
      const rowIdx = y % this.size; // matrix row (repeats)

      for (let x = 0; x < width; ++x) {
        const outIdx = (y * width + x) * 4;

        // ----- 1️⃣  Convert to luminance (Rec. 601) -------------------------
        const r = src[outIdx];
        const g = src[outIdx + 1];
        const b = src[outIdx + 2];
        const a = src[outIdx + 3]; // preserve alpha

        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // ----- 2️⃣  Threshold from the Bayer matrix -------------------------
        const colIdx = x % this.size;
        const threshold = (this.matrix[rowIdx][colIdx] * 255) / this.divisor;

        // ----- 3️⃣  Choose output depending on the mode ------------------
        if (this.mode === 'bw') {
          // Binary output
          const bw = lum < threshold ? 0 : 255;
          out[outIdx] = out[outIdx + 1] = out[outIdx + 2] = bw;
        } else if (this.mode === 'grayscale') {
          // Simple gray (no dithering) – we keep the original luminance
          const gray = clampByte(lum);
          out[outIdx] = out[outIdx + 1] = out[outIdx + 2] = gray;
        } else if (this.mode === 'palette') {
          // ---------- palette mode ----------
          // Find closest palette entry (brute‑force linear search – fine for few‑hundred colours)
          const pal = this.palette!;
          let bestIdx = 0;
          let bestDist = Infinity;
          for (let i = 0; i < pal.length; i += 3) {
            const dr = r - pal[i];
            const dg = g - pal[i + 1];
            const db = b - pal[i + 2];
            const dist = dr * dr + dg * dg + db * db;
            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = i;
            }
          }
          out[outIdx] = pal[bestIdx];
          out[outIdx + 1] = pal[bestIdx + 1];
          out[outIdx + 2] = pal[bestIdx + 2];
        }

        // Preserve original alpha for *all* modes
        out[outIdx + 3] = a;
      }
    }

    return new ImageData(out, width, height);
  }
}

/* ----------------------------------------------------------------------
   6️⃣  Helper factories for the two most common sizes + modes
   ---------------------------------------------------------------------- */

function makeDither(
  size: number,
  mode: DitherMode,
  palette?: Uint8ClampedArray | number[]
) {
  return new BayerOrderedDither({ size, mode, palette });
}

/* BW (binary) */
export const orderedDither4x4BW = (src: ImageData) =>
  makeDither(4, 'bw').apply(src);
export const orderedDither8x8BW = (src: ImageData) =>
  makeDither(8, 'bw').apply(src);

/* Grayscale (plain gray, no dither) */
export const orderedDither4x4Gray = (src: ImageData) =>
  makeDither(4, 'grayscale').apply(src);
export const orderedDither8x8Gray = (src: ImageData) =>
  makeDither(8, 'grayscale').apply(src);

/* Palette mode – user supplies a flat RGB palette */
export const orderedDither4x4Palette = (
  src: ImageData,
  palette: Uint8ClampedArray | number[]
) => makeDither(4, 'palette', palette).apply(src);

export const orderedDither8x8Palette = (
  src: ImageData,
  palette: Uint8ClampedArray | number[]
) => makeDither(8, 'palette', palette).apply(src);

/* ----------------------------------------------------------------------
   7️⃣  Example usage in a browser
   ---------------------------------------------------------------------- */

/*
const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;
const src = ctx.getImageData(0, 0, canvas.width, canvas.height);

// ---- 1. 8×8 BW -------------------------------------------------------
const bw = orderedDither8x8BW(src);
ctx.putImageData(bw, 0, 0);

// ---- 2. 4×4 Grayscale (just converts to gray) --------------------
const gray = orderedDither4x4Gray(src);
ctx.putImageData(gray, 0, 0);

// ---- 3. 8×8 Palette (web‑safe 216 colours) -------------------------
const webSafe = generateWebSafePalette(); // see helper below
const paletteDither = orderedDither8x8Palette(src, webSafe);
ctx.putImageData(paletteDither, 0, 0);
*/

/* ----------------------------------------------------------------------
   8️⃣  Helper: generate the classic 6×6×6 “web‑safe” palette
   ---------------------------------------------------------------------- */
export function generateWebSafePalette(): Uint8ClampedArray {
  const steps = [0, 51, 102, 153, 204, 255];
  const pal = new Uint8ClampedArray(6 * 6 * 6 * 3);
  let i = 0;
  for (const r of steps) {
    for (const g of steps) {
      for (const b of steps) {
        pal[i++] = r;
        pal[i++] = g;
        pal[i++] = b;
      }
    }
  }
  return pal;
}

/* ----------------------------------------------------------------------
   9️⃣  Small utility – clamp a number to 0‑255 (used for grayscale mode)
   ---------------------------------------------------------------------- */
function clampByte(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}