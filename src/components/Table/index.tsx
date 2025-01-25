import React from 'react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { AgGridReact } from "ag-grid-react";
import { ColDef, GridOptions } from "ag-grid-community";

interface TableProps extends GridOptions {
  columns: ColDef[]; // Ag-Grid column definitions
  data: any[]; // Row data
  pagination?: boolean; // Enable/disable pagination
  paginationPageSize?: number; // Number of rows per page
  paginationPageSizeSelector?: number[]; // Dropdown options for page sizes
}
const Table: React.FC<TableProps> = ({
  columns,
  data,
  pagination = true,
  paginationPageSize = 10,
  paginationPageSizeSelector = [10, 20, 50],
  ...rest
}) => {


  return (
    <div className="ag-theme-quartz-auto-dark table-wrapper">
      <AgGridReact 
        rowData={data} 
        columnDefs={columns} 
        pagination={pagination} 
        paginationPageSize={paginationPageSize} 
        paginationPageSizeSelector={paginationPageSizeSelector} 
        rowHeight={60}
        {...rest}
      />
    </div>
  );
};

export default Table;
