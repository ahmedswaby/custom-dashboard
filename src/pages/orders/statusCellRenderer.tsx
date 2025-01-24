import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

import styles from "./statusCellRenderer.module.css";

export const StatusCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  valueFormatted,
}) => {
  console.log(value
    ,valueFormatted)
  return(
    <div className={`${styles.tag} ${styles[value.Name + "Tag"]}`}>
      <div className={`${styles.circle} ${styles[value.Name + "Circle"]}`}></div>
      <span>{valueFormatted}</span>
    </div>
  )
}
