import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 1024;

function getServerSnapshot() {
  return false;
}

function getSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mediaQuery.addEventListener("change", onChange);

  return () => {
    mediaQuery.removeEventListener("change", onChange);
  };
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
