import React, { useState, useEffect } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import { type FunctionComponent, useCallback } from "react";
import styles from "./actionsCellRenderer.module.css";
import { orderData, statuses } from '../../models/enums'
import Modal from "../modal";
import { StatusCellRenderer } from "./statusCellRenderer";

interface ActionsCellRendererProps extends ICellRendererParams {
  getOrderDetails: (id: string) => Promise<any>; // Adjust based on your function's type
  editOrder: (id: string) => Promise<any>; // Adjust based on your function's type
  deleteOrder: (id: string) => Promise<any>; // Adjust based on your function's type
}

export const ActionsCellRenderer: FunctionComponent<ActionsCellRendererProps> = (props) => {

  const { getOrderDetails, editOrder, deleteOrder } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<orderData | null>(null);


  const openDetailsModal = async () => {
    try {
      await getOrderDetails(props.data.id).unwrap().then(res => {
        setOrderDetails(res)

      })
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch order details", error);
      alert("Failed to load order details. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderDetails(null)
  };

  const onRemoveClick = useCallback(async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await deleteOrder(props.data.id);
      // Remove the deleted row from the grid
      props.api.applyTransaction({
        remove: [props.data],
      });

      alert("Order deleted successfully.");
    } catch (error) {
      console.error("Failed to delete order", error);
      alert("Failed to delete order. Please try again.");
    }

    // i'm updaing grid by calling order list to kwwp dashboard updated, 
    // but i can also activate this lines if i didn't want to call list again 

    const rowData = props.node.data;
      props.api.applyTransaction({ remove: [rowData] });

  }, [deleteOrder, props.data, props.api]);




  return (
    <div className={styles.buttonCell}>
      <CustomDropdownEditor {...props} editOrder={editOrder} />
      <button
        className={`button-secondary ${styles.viewBtn}`}
        onClick={openDetailsModal}
      >
        <img src={`/src/assets/icons/eye.svg`} alt="view details" />
      </button>
      <button
        className={`button-secondary ${styles.removeBtn}`}
        onClick={onRemoveClick}>
        <img src={`/src/assets/icons/delete.svg`} alt="delete" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {orderDetails && (
          <>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {orderDetails.orderID}</p>
            <p><strong>Customer Name:</strong> {orderDetails.customerName}</p>
            <div className="status-wrapper"><strong>Status:</strong> <StatusCellRenderer value={orderDetails?.status ?? {}} valueFormatted={orderDetails?.status?.Name ?? ''} /></div>

            <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
          </>
        )}
      </Modal>

    </div>
  );
};



interface CustomDropdownEditor extends ICellRendererParams {
  editOrder: (id: string) => Promise<any>; // Adjust based on your function's type
}



export const CustomDropdownEditor = (props: CustomDropdownEditor) => {

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


  // Required method: Returns the GUI element for Ag-Grid
  const getGui = () => {
    return (
      <select
        className={styles.editableSelect}
        value={value}
        onChange={handleChange}
      >
        {loading ? (
          <option>Loading...</option>
        ) : (
          ["Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))
        )}
      </select>
    );
  };
  // Expose required methods to Ag-Grid
  useEffect(() => {
    props.api.stopEditing();
  });

  return getGui();
};

export default CustomDropdownEditor;


