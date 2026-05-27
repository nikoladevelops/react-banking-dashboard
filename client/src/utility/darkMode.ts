export function initDarkMode(): boolean {
  const saved = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = saved === "true" || (saved === null && prefersDark);

  if (window.__applyDarkMode) {
    window.__applyDarkMode(isDark);
  } else {
    // Fallback in case the global function isn't available (should not happen)
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }
  return isDark;
}

export function setDarkModePreference(isDark: boolean): void {
  localStorage.setItem("darkMode", String(isDark));
  if (window.__applyDarkMode) {
    window.__applyDarkMode(isDark);
  } else {
    // Fallback
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }
}
