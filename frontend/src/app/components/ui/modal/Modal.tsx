"use client";
import { createPortal } from "react-dom";
import { PropsWithChildren, useEffect, useRef } from "react";
import "./modal.css";

interface Props extends PropsWithChildren {
  closeModal: () => void;
  open: boolean;
}

const Modal = (props: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return props.closeModal();
      }

      // Trap Focus логика (запрет на TAB вне модального окна)
      if (e.key === "Tab" && props.open && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (props.open) {
      document.addEventListener("keydown", handleKeyDown);
      // Фокусируемся на первом элементе при открытии
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.open]);

  return createPortal(
    <>
      {props.open && (
        <div role="dialog" aria-modal="true" className="modal" ref={modalRef}>
          <div className="modal__bg" />
          <div className="modal__inner">
            <div className="modal__window">
              <div className="modal__top">
                <button
                  type="button"
                  className="button"
                  onClick={props.closeModal}
                  aria-label="Закрыть модальное окно"
                >
                  <img
                    className="modal__exit"
                    src="/svg/cross.svg"
                    width={13}
                    height={13}
                    alt=""
                  />
                </button>
              </div>
              <div className="modal__content">{props.children}</div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

export default Modal;
