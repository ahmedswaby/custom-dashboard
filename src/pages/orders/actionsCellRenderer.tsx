import React, { useState, useEffect } from "react";
import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent, useCallback } from "react";
import styles from "./actionsCellRenderer.module.css";
import { statuses } from '../../models/enums'
import { useEditOrderMutation, useLazyGetOrderDetailsQuery, useDeleteOrderMutation } from "../../store/apis";
import Modal from "../../components/modal";
import { StatusCellRenderer } from "./statusCellRenderer";

export const ActionsCellRenderer: FunctionComponent<
  CustomCellRendererProps
> = (props) => {

  const { api, node } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [getOrderDetails, { data: orderDetails }] = useLazyGetOrderDetailsQuery()
  const [deleteOrder] = useDeleteOrderMutation();

  const openDetailsModal = async () => {
    try {
      await getOrderDetails(props.data.id)
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch order details", error);
      alert("Failed to load order details. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onRemoveClick = useCallback(async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await deleteOrder(props.data.id);
      console.log(`Order ${props.data.orderId} deleted successfully.`);

      // Remove the deleted row from the grid
      props.api.applyTransaction({
        remove: [props.data],
      });

      alert("Order deleted successfully.");
    } catch (error) {
      console.error("Failed to delete order", error);
      alert("Failed to delete order. Please try again.");
    }
    const rowData = node.data;
    api.applyTransaction({ remove: [rowData] });
  }, [node, api]);



  return (
    <div className={styles.buttonCell}>
      <CustomDropdownEditor {...props} />
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
            <div className="status-wrapper"><strong>Status:</strong> <StatusCellRenderer value={orderDetails.status} valueFormatted={orderDetails.status.Name} /></div>
            
            <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
          </>
        )}
      </Modal>

    </div>
  );
};






export const CustomDropdownEditor = (props: CustomCellRendererProps) => {

  const [value, setValue] = useState(props.value);
  const [loading, setLoading] = useState(false);

  const [editOrder] = useEditOrderMutation()







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
      // Call API to update the status
      // await axios.patch(`http://localhost:3000/orders/${props.data.id}`, {
      //   status: selectedStatus,
      // });
      editOrder({
        id: props.data.id,
        body: { status: selectedStatus },
      })

      // const response = await axios.get("http://localhost:3000/orders");

      //  // Refresh the cell to reflect the updated value
      //  props.api.refreshCells({
      //   rowNodes: [props.node], // Refresh only the current row
      //   force: true, // Force refresh
      // });
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


