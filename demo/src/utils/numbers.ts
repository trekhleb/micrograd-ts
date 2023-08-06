export const toInt = (
  rawValue: string | number,
  fallback: number = 0
): number => {
  if (rawValue === undefined || rawValue == '') return fallback
  return typeof rawValue === 'number' ? rawValue : parseInt(rawValue)
}

export const toFloat = (
  rawValue: string | number,
  fallback: number = 0.0
): number => {
  if (rawValue === undefined || rawValue == '') return fallback
  return typeof rawValue === 'number' ? rawValue : parseFloat(rawValue)
}
