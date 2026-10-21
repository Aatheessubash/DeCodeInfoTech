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
  const [isClosing, setIsClosing] = useState(false);

  const [dragY, setDragY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const touchStartY = useRef<number | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  // Handle open / close lifecycle transitions
  useEffect(() => {
    if (isOpen) {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      setShouldRender(true);
      setIsClosing(false);

      // Trigger enter transition on next paint frame
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setIsEntered(true);
        });
        return () => cancelAnimationFrame(frame2);
      });
      return () => cancelAnimationFrame(frame1);
    } else {
      if (shouldRender && !isClosing) {
        setIsEntered(false);
        setIsClosing(true);
        exitTimer.current = setTimeout(() => {
          setShouldRender(false);
          setIsClosing(false);
        }, 260);
        return () => {
          if (exitTimer.current) clearTimeout(exitTimer.current);
        };
      }
    }
  }, [isOpen, shouldRender, isClosing]);

  // Request close with smooth exit animation
  const requestClose = () => {
    if (isClosing) return;
    setIsEntered(false);
    setIsClosing(true);
    exitTimer.current = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      onCloseRef.current();
    }, 260);
  };

  // Focus close button smoothly after entrance
  useEffect(() => {
    if (!shouldRender || !isEntered || isClosing) return undefined;
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 260);
    return () => clearTimeout(timer);
  }, [shouldRender, isEntered, isClosing]);

  // Handle ESC and Tab trap
  useEffect(() => {
    if (!shouldRender || isClosing) return undefined;
    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose();
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
  }, [shouldRender, isClosing]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || isClosing) return;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isClosing) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    } else {
      setDragY(deltaY * 0.15);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null || isClosing) return;
    const pulledDistance = dragY ?? 0;
    touchStartY.current = null;
    setIsDragging(false);

    if (pulledDistance > 75) {
      requestClose();
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
    isEntered && !isClosing ? styles.backdropEntered : '',
    isClosing ? styles.backdropExiting : '',
  ]
    .filter(Boolean)
    .join(' ');

  const modalClasses = [
    styles.modal,
    styles[size],
    className,
    isEntered && !isClosing ? styles.modalEntered : '',
    isClosing ? styles.modalExiting : '',
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
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? headingId : undefined}
        style={dragStyle}
      >
        <div
          className={styles.header}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div className={styles.handleBar} aria-hidden="true">
            <span className={styles.handleIndicator} />
          </div>
          <div className={styles.titleGroup}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className={styles.title}>
                {title}
              </h2>
            )}
          </div>
          {showCloseButton && (
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={requestClose}
              onTouchStart={(e) => e.stopPropagation()}
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
