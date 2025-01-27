
export function safeParse<T>(value: any): T | null {
  try {
    return JSON.parse(value) as T;
  } catch (err) {
    return null;
  }
}
