export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1] ?? '00', 16),
        g: parseInt(result[2] ?? '00', 16),
        b: parseInt(result[3] ?? '00', 16),
      }
    : { r: 0, g: 0, b: 0 }
}
