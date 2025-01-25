import React, { useState, useEffect } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import { type FunctionComponent, useCallback } from "react";
import styles from "./actionsCellRenderer.module.css";
import { orderData, statuses, userData } from '../../models/enums'
import Modal from "../modal";
import { StatusCellRenderer } from "./statusCellRenderer";
import ActiveButtonCellRender from "./activeCellRender";










interface CustomDropdownEditor extends ICellRendererParams {
  editOrder: (id: string) => Promise<any>; // Adjust based on your function's type
}



const CustomDropdownEditor = (props: CustomDropdownEditor) => {

  const [value, setValue] = useState(props.value);
  const [loading, setLoading] = useState(false);

  // Update local state when the value changes
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedStatus = statuses.find((status) => status.Name === event.target.value);
    if (!selectedStatus) return;

    setValue(selectedStatus);
    setLoading(true); // Show loading while updating

    try {
      props.editOrder({
        id: props.data.id,
        body: { status: selectedStatus },
      })
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (<select
    className={styles.editableSelect}
    value={value}
    onChange={handleChange}
  >
    {loading ? (
      <option>Loading...</option>
    ) : (
      statuses.map((status) => (
        <option key={status.id} value={status.Name} selected={props.data.status.id === status.id}>
          {status.Name}
        </option>
      ))
    )}
  </select>);
};














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
  const [details, setDetails] = useState<orderData | userData>(null);


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
      await deleteAction(props.data.id).unwrap().then((res: any) => {
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
          {/* note: that best practise but still thinking how we can pass data dynamic to the modal */}
          {details && renderModalContent(details)} {/* Render custom modal content */}

        </Modal>
      )}

    </div>
  );
};

export default ActionsCellRenderer;