export {};

declare global {
  interface Window {
    __applyDarkMode?: (isDark: boolean) => void;
  }
}
