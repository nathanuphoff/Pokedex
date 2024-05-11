export function formatApiResourceName(name: string): string {
  return name
    .replaceAll(/-/g, ' ')
    .replaceAll(/\b\w/g, (char) => char.toUpperCase());
}
