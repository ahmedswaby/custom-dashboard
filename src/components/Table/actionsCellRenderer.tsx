import React, { useState } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import { type FunctionComponent, useCallback } from "react";
import styles from "./actionsCellRenderer.module.css";
import { orderData, userData } from '../../models/enums'
import Modal from "../modal";
import ActiveButtonCellRender from "./activeCellRender";
import CustomDropdownEditor from "./CustomDropdownEditor";
interface ActionsCellRendererProps extends ICellRendererParams {
  getDetails?: (id: string) => Promise<any>; // Adjust based on your function's type
  edit: (id: string) => Promise<any>; // Adjust based on your function's type
  deleteAction: (id: string) => Promise<any>; // Adjust based on your function's type
  renderModalContent: (details: any) => React.ReactNode;
  enableViewBtn?: boolean
  enableRemoveBtn?: boolean
  enableEditStatus?: boolean
  enableToggleStatus?: boolean
}

const ActionsCellRenderer: FunctionComponent<ActionsCellRendererProps> = (props) => {

  const { getDetails, edit, deleteAction, enableViewBtn, enableRemoveBtn, enableEditStatus , enableToggleStatus, renderModalContent } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [details, setDetails] = useState<orderData | userData | null>(null);


  const openDetailsModal = async () => {
    try {
      await getDetails(props.data.id).unwrap().then(res => {
        setDetails(res)
      }).catch(err => {
        console.error("Failed to fetch details", err);
      })
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch details", error);
      alert("Failed to load details. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDetails(null)
  };

  const onRemoveClick = useCallback(async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ?");
    if (!confirmDelete) return;

    try {
      await deleteAction(props.data.id).unwrap().then((res: orderData | userData) => {
        if (res) {
          props.api.applyTransaction({
            remove: [props.data],
          });
          alert("Order deleted successfully.");
        }
      }).catch((err: any) => {
        console.error("Failed to delete this", err);
        alert("Failed to delete this. Please try again.");
      });
    } catch (error) {
      console.error("Failed to delete this", error);
      alert("Failed to delete this. Please try again.");
    }

  }, [deleteAction, props.data, props.api]);




  return (
    <div className={styles.buttonCell}>
      {enableEditStatus && (
        <CustomDropdownEditor {...props} editOrder={edit} />
      )}

      {enableViewBtn && (
        <button
          className={`${styles.btnIcon} ${styles.viewBtn}`}
          onClick={openDetailsModal}
        >
          <img src={`/src/assets/icons/eye.svg`} alt="view details" />
        </button>
      )}

      {enableToggleStatus && (
        <ActiveButtonCellRender  {...props} />
      )}

      {enableRemoveBtn && (
        <button
          className={`${styles.btnIcon} ${styles.removeBtn}`}
          onClick={onRemoveClick}>
          <img src={`/src/assets/icons/delete.svg`} alt="delete" />
        </button>
      )}

      {enableViewBtn && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {details && renderModalContent(details)} {/* Render custom modal content */}
        </Modal>
      )}

    </div>
  );
};

export default ActionsCellRenderer;