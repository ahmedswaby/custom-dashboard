import ReactDOM from "react-dom";

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    const handleOutsideClick = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).dataset.modalBackdrop) {
        onClose();
      }
    };
    return ReactDOM.createPortal(
      <div
        data-modal-backdrop
        className="modal-wrapper"
        onClick={handleOutsideClick}
      >
        <div
          className="modal-dialog"
        >
          {children}
          <button
            onClick={onClose}
            className="btn-close"
          >
            Close
          </button>
        </div>
      </div>,
      document.body
    );
  };

  export default Modal;