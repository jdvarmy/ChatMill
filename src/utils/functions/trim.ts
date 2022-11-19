export function trim(string: string, chars?: string): string {
  if (string && !chars) {
    return string.trim();
  }

  const pattern = new RegExp(`[${chars}]`, 'gi');
  return string.replace(pattern, '');
}
