import { useEffect } from 'react';
import './Modal.css';

export default function Modal({ open, onClose, title, children }) {
  // Let Escape close the modal, and lock page scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-box__close" aria-label="Close dialog" onClick={onClose}>
          ×
        </button>
        {title && <h3 id="modal-title">{title}</h3>}
        <div className="modal-box__content">{children}</div>
      </div>
    </div>
  );
}