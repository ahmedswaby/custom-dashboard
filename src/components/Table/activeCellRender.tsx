import { useCallback , useState } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import styles from "./activeCellRender.module.css";

import { useEditUserMutation } from "../../store/apis/users";


interface ActiveCellRendererProps extends ICellRendererParams {
    enableToggleStatus?: boolean
}

export const ActiveButtonCellRender = (props: ActiveCellRendererProps) => {

    const [editUser] = useEditUserMutation();
    const [isActive , setIsActive] = useState<boolean>(props.data.status);
    
    // const isActive = props.data.status;
    const action = isActive ? "deactivate" : "activate";

    // Handler to toggle the `active` status
    const toggleStatus = useCallback(async () => {


        const confirmToggle = window.confirm(`Are you sure you want to ${action} this user?`);
        if (!confirmToggle) return;

        try {
            // Call API to toggle status
            await editUser({ id: props.data.id, body: { status: !isActive } }).unwrap().then(res => {
                if (res) {
                    // Update the row data in the grid
                    props.api.applyTransaction({
                        update: [{ ...props.data, status: !isActive }],
                    });
                    setIsActive(!isActive);
                }

            }).catch(err => {
                console.error("Failed to update user status:", err);
                alert("Failed to update user status. Please try again.");
            });

        } catch (error) {
            console.error("Failed to update user status:", error);
            alert("Failed to update user status. Please try again.");
        }
    }, [action, editUser, props.data, props.api, isActive]);



    return (
        <button
            className={`${styles.toggleStatusBtn}`}
            onClick={toggleStatus}
        >
            {isActive ? "Deactivate" : "Activate"}
        </button>
    )

};

export default ActiveButtonCellRender;


