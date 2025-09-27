export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isPhone(v: string) {
  return /^\+?\d{7,15}$/.test(v);
}
