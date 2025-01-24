import { type FunctionComponent } from "react";

import styles from "./statusCellRenderer.module.css";

export const StatusCellRenderer: FunctionComponent<{value: {id: number, Name: string }, valueFormatted: string}> = ({
  value,
  valueFormatted,
}) => {
  return(
    <div className={`${styles.tag} ${styles[value.Name + "Tag"]}`}>
      <div className={`${styles.circle} ${styles[value.Name + "Circle"]}`}></div>
      <span>{valueFormatted}</span>
    </div>
  )
}
