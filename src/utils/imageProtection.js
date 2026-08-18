/**
 * IT HUNT - Image Security & Anti-Download Utilities
 * Provides client-side protection against saving, downloading, dragging,
 * long-pressing, printing, and right-clicking images.
 */

export function initImageProtection() {
  if (typeof window === 'undefined') return;

  // 1. Prevent Right-Click Context Menu on Images and Image Wrappers
  document.addEventListener('contextmenu', (event) => {
    const target = event.target;
    // Check if target is an image, inside an image wrapper, or has protected class
    if (
      target.tagName === 'IMG' ||
      target.closest('img') ||
      target.closest('.protected-img') ||
      target.closest('.lightbox-img-wrapper') ||
      target.closest('.event-card-img-wrapper') ||
      target.closest('.course-card-img') ||
      target.closest('.protected-img-overlay')
    ) {
      event.preventDefault();
      return false;
    }
  }, { capture: true });

  // 2. Prevent Drag and Drop of Images
  document.addEventListener('dragstart', (event) => {
    const target = event.target;
    if (
      target.tagName === 'IMG' ||
      target.closest('img') ||
      target.closest('.protected-img')
    ) {
      event.preventDefault();
      return false;
    }
  }, { capture: true });

  // 3. Prevent Keyboard Shortcuts for Save/Print/View Source
  document.addEventListener('keydown', (event) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlCmd = isMac ? event.metaKey : event.ctrlKey;
    const key = event.key.toLowerCase();

    // Block Cmd+S / Ctrl+S (Save Page / Image)
    // Block Cmd+P / Ctrl+P (Print)
    // Block Cmd+U / Ctrl+U (View Source)
    if (ctrlCmd && (key === 's' || key === 'p' || key === 'u')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 4. Touch Device Long-Press Protection (iOS / Android)
  document.addEventListener('touchstart', (event) => {
    const target = event.target;
    if (
      target.tagName === 'IMG' ||
      target.closest('img') ||
      target.closest('.protected-img')
    ) {
      // Prevent callout popup on touch devices
      target.style.webkitTouchCallout = 'none';
    }
  }, { passive: true });
}

/**
 * Vue directive for image protection: v-protected-image
 */
export const protectedImageDirective = {
  mounted(el) {
    el.setAttribute('draggable', 'false');
    el.style.userDrag = 'none';
    el.style.webkitUserDrag = 'none';
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.webkitTouchCallout = 'none';

    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('dragstart', (e) => e.preventDefault());
  }
};
