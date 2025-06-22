// Utility to combine classNames conditionally, commonly called "cn"
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
