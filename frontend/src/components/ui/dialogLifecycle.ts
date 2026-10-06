// A single owner for top-layer dialogs, background isolation, and scroll state.
let active: { release: () => void; dismiss: () => void; opener: HTMLElement | null; dialog: HTMLDialogElement } | null = null;

export function openManagedDialog(dialog: HTMLDialogElement, dismiss: () => void, trigger?: HTMLElement | null) {
  const opener = trigger ?? (active?.dialog.contains(document.activeElement) ? active.opener : document.activeElement as HTMLElement | null);
  if (active) {
    const previous = active;
    previous.release();
    previous.dismiss();
  }
  const root = document.getElementById('root');
  const previousInert = root?.inert ?? false;
  const bodyOverflow = document.body.style.overflow;
  const htmlOverflow = document.documentElement.style.overflow;
  const padding = document.body.style.paddingRight;
  const gutter = window.innerWidth - document.documentElement.clientWidth;
  const stableGutter = getComputedStyle(document.documentElement).scrollbarGutter.includes('stable');
  let released = false;

  const focusables = () => [...dialog.querySelectorAll<HTMLElement>(
    'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
  )].filter(el => el.tabIndex >= 0 && !el.closest('[hidden], [inert]') && el.getClientRects().length > 0);
  const focusFirst = () => (focusables()[0] ?? dialog).focus({ preventScroll: true });
  const keydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      dismiss();
    } else if (event.key === 'Tab') {
      const elements = focusables();
      const index = elements.indexOf(document.activeElement as HTMLElement);
      if (!elements.length || index < 0 || (event.shiftKey && index === 0) || (!event.shiftKey && index === elements.length - 1)) {
        event.preventDefault();
        (event.shiftKey ? elements.at(-1) ?? dialog : elements[0] ?? dialog).focus();
      }
    }
  };
  const focusin = (event: FocusEvent) => {
    if (!dialog.contains(event.target as Node)) focusFirst();
  };
  const cancel = (event: Event) => { event.preventDefault(); dismiss(); };
  const viewport = window.visualViewport;
  const sizeToViewport = () => {
    if (viewport) {
      dialog.style.height = `${viewport.height}px`;
      dialog.style.top = `${viewport.offsetTop}px`;
      dialog.style.setProperty('--dialog-height', `${viewport.height}px`);
    }
  };
  const release = () => {
    if (released) return;
    released = true;
    document.removeEventListener('keydown', keydown, true);
    document.removeEventListener('focusin', focusin);
    dialog.removeEventListener('cancel', cancel);
    viewport?.removeEventListener('resize', sizeToViewport);
    viewport?.removeEventListener('scroll', sizeToViewport);
    dialog.close();
    dialog.removeAttribute('aria-modal');
    if (root) root.inert = previousInert;
    document.body.style.overflow = bodyOverflow;
    document.body.style.paddingRight = padding;
    document.documentElement.style.overflow = htmlOverflow;
    if (active?.release === release) active = null;
    if (opener?.isConnected && !opener.closest('[inert]')) opener.focus({ preventScroll: true });
  };

  // showModal supplies native top-layer isolation, including fixed navigation.
  dialog.showModal();
  if (root) root.inert = true;
  dialog.setAttribute('aria-modal', 'true');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  if (!stableGutter && gutter > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + gutter}px`;
  document.addEventListener('keydown', keydown, true);
  document.addEventListener('focusin', focusin);
  dialog.addEventListener('cancel', cancel);
  viewport?.addEventListener('resize', sizeToViewport);
  viewport?.addEventListener('scroll', sizeToViewport);
  sizeToViewport();
  active = { release, dismiss, opener, dialog };
  focusFirst();
  return release;
}
