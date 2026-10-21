'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './SiteModal.module.css';

type SiteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  titleId?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeLabel?: string;
  className?: string;
  showCloseButton?: boolean;
};

export function SiteModal({
  isOpen,
  onClose,
  eyebrow,
  title,
  subtitle,
  titleId,
  children,
  size = 'md',
  closeLabel = 'Close dialog',
  className,
  showCloseButton = true,
}: SiteModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isEntered, setIsEntered] = useState(false);

  const [dragY, setDragY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const isClosingRef = useRef(false);
  const prevIsOpen = useRef(false);
  const openTimestampRef = useRef<number>(0);

  const touchStartY = useRef<number | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const generatedTitleId = useId();
  const headingId = titleId || generatedTitleId;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  // Request close with smooth exit transition
  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsEntered(false);
    setTimeout(() => {
      onCloseRef.current();
      isClosingRef.current = false;
      setShouldRender(false);
    }, 240);
  };

  // Synchronize open / close lifecycle
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setShouldRender(true);
      isClosingRef.current = false;
      openTimestampRef.current = Date.now();

      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setIsEntered(true);
        });
        return () => cancelAnimationFrame(frame2);
      });
      prevIsOpen.current = true;
      return () => cancelAnimationFrame(frame1);
    } else if (!isOpen && prevIsOpen.current) {
      prevIsOpen.current = false;
      if (!isClosingRef.current) {
        setIsEntered(false);
        const timer = setTimeout(() => {
          setShouldRender(false);
        }, 240);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen]);

  // Handle backdrop clicks, ignoring ghost clicks right after open
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    // Guard against delayed mobile tap clicks from opening the modal
    if (Date.now() - openTimestampRef.current < 380) return;
    handleClose();
  };

  // Only auto-focus close button on non-touch desktop devices (never auto-focus on mobile touch devices)
  useEffect(() => {
    if (!shouldRender || !isEntered || isClosingRef.current) return undefined;
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch) return undefined;

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 280);
    return () => clearTimeout(timer);
  }, [shouldRender, isEntered]);

  // Handle ESC and Tab trapping
  useEffect(() => {
    if (!shouldRender || !isEntered || isClosingRef.current) return undefined;
    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (event.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus?.({ preventScroll: true });
    };
  }, [shouldRender, isEntered]);

  // Touch drag gesture (on handleBar)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || isClosingRef.current) return;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isClosingRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    } else {
      setDragY(deltaY * 0.15);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null || isClosingRef.current) return;
    const pulledDistance = dragY ?? 0;
    touchStartY.current = null;
    setIsDragging(false);

    if (pulledDistance > 75) {
      handleClose();
      setDragY(null);
      return;
    }

    setDragY(0);
    resetTimer.current = setTimeout(() => {
      setDragY(null);
    }, 240);
  };

  if (!isMounted || !shouldRender) return null;

  const backdropClasses = [
    styles.backdrop,
    isEntered ? styles.backdropEntered : '',
  ]
    .filter(Boolean)
    .join(' ');

  const modalClasses = [
    styles.modal,
    styles[size],
    className,
    isEntered ? styles.modalEntered : '',
  ]
    .filter(Boolean)
    .join(' ');

  const dragStyle =
    dragY !== null
      ? {
          transform: `translate3d(0, ${Math.max(0, dragY)}px, 0)`,
          transition: isDragging ? 'none' : 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        }
      : undefined;

  return createPortal(
    <div
      className={backdropClasses}
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? headingId : undefined}
        style={dragStyle}
      >
        <div className={styles.header}>
          <div
            className={styles.handleBar}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            aria-hidden="true"
          >
            <span className={styles.handleIndicator} />
          </div>
          <div className={styles.titleGroup}>
            {eyebrow && (
              <div className={styles.eyebrowWrapper}>
                <span className={styles.eyebrow}>{eyebrow}</span>
              </div>
            )}
            {title && (
              <h2 id={headingId} className={styles.title}>
                {title}
              </h2>
            )}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {showCloseButton && (
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label={closeLabel}
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
