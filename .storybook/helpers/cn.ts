export function cn(...args: any[]): string {
  return args
    .flatMap(arg => {
      if (typeof arg === 'string') {
        return [arg];
      } else if (typeof arg === 'boolean' || arg == null) {
        return [];
      } else if (Array.isArray(arg)) {
        return cn(...arg);
      } else if (typeof arg === 'object') {
        return Object.entries(arg)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(' ');
}
