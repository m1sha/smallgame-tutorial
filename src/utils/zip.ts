import { zipSync, strToU8  } from "fflate"

export type ZippingFile = Uint8Array

export function createTextFile (text: string): ZippingFile { return strToU8 (text) }
export function createJsonFile (text: {}): ZippingFile { return strToU8 (JSON.stringify(text, null, 2)) }
export async function createImageFile (canvas: HTMLCanvasElement, type: 'png' = 'png'): Promise<ZippingFile> {
   const imageBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/" + type),
  );

  if (!imageBlob) {
    throw new Error("Can't get an image from canvas");
  }

  return new Uint8Array(await imageBlob.arrayBuffer())
}

export function downloadZip (filename: string, files: Record<string, ZippingFile>) {
  const zipData = zipSync(files, { level: 6 })

  const blob = new Blob([zipData], { type: "application/zip" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
}