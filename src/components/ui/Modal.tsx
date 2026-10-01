import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { openManagedDialog } from './dialogLifecycle';

export function Modal({ children, onClose, labelledBy, describedBy, className = '', trigger }: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  className?: string;
  trigger?: HTMLElement | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  useLayoutEffect(() => { closeRef.current = onClose; });
  useLayoutEffect(() => {
    if (ref.current) return openManagedDialog(ref.current, () => closeRef.current(), trigger);
  }, [trigger]);
  return createPortal(
    <dialog ref={ref} tabIndex={-1} aria-labelledby={labelledBy} aria-describedby={describedBy}
      className={`shared-dialog ${className}`}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      {children}
    </dialog>, document.body,
  );
}
