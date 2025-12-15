import { useState } from "react";

export function useDesktopOnly() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  function checkWindowSize() {
    if (window.innerWidth >= 768) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }
  window.addEventListener("resize", checkWindowSize);

  return isDesktop;
}
