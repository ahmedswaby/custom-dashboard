import React, { useState } from "react";
import { statuses } from '../../models/enums'
import type { ICellRendererParams } from "ag-grid-community";
import styles from "./actionsCellRenderer.module.css";


interface CustomDropdownEditor extends ICellRendererParams {
    editOrder: (id: string) => Promise<any>; // Adjust based on your function's type
}



const CustomDropdownEditor = (props: CustomDropdownEditor) => {

    const [loading, setLoading] = useState(false);

    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedStatus = statuses.find((status) => status.Name === event.target.value);
        if (!selectedStatus) return;

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
        value={props.data.status.Name}
        onChange={handleChange}
    >
        {loading ? (
            <option>Loading...</option>
        ) : (
            statuses.map((status) => (
                <option key={status.id} value={status.Name}>
                    {status.Name}
                </option>
            ))
        )}
    </select>);
};


export default CustomDropdownEditor;