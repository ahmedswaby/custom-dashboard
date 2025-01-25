import { useCallback } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import styles from "./activeCellRender.module.css";

import { useEditUserMutation } from "../../store/apis/users";


interface ActiveCellRendererProps extends ICellRendererParams {
    enableToggleStatus?: boolean
}

export const ActiveButtonCellRender = (props: ActiveCellRendererProps) => {

    const [editUser] = useEditUserMutation();


  // Handler to toggle the `active` status
  const toggleStatus = useCallback(async () => {

    const isActive = props.data.status;
    const action = !isActive ? "deactivate" : "activate";

    const confirmToggle = window.confirm(`Are you sure you want to ${action} this user?`);
    if (!confirmToggle) return;

    try {
      // Call API to toggle status
      const updatedUser = await editUser({ id: props.data.id, body: {status: !isActive }}).unwrap();
      console.log(`User ${updatedUser.name} status updated successfully.`);

      // Update the row data in the grid
      props.api.applyTransaction({
        update: [{ ...props.data, status: !isActive }],
      });
      
    } catch (error) {
      console.error("Failed to update user status:", error);
      alert("Failed to update user status. Please try again.");
    }
  }, [props.data, props.api]);



    return (
        <button
        className={`button-secondary ${styles.toggleStatusBtn}`}
        onClick={toggleStatus}
      >
        {props.data.status ? "Deactivate" : "Activate"}
      </button>
    )

};

export default ActiveButtonCellRender;


