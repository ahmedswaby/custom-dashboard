import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { StatusCellRenderer } from "./statusCellRenderer";
import { ActionsCellRenderer } from "./actionsCellRenderer";
import {
  ValueFormatterFunc,
  ColDef,
} from "ag-grid-community";
import { useGetOrdersQuery } from '../../store/apis/index';
import {  orderData } from '../../models/enums'
const statuses = {
  Pending: "Pending",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};




const statusFormatter: ValueFormatterFunc = ({ value }) => value.Name as keyof typeof statuses ?? "";




const Orders = () => {

  const [rowData, setRowData] = useState<orderData[]>([]);
  const [colDefs] = useState<ColDef[]>([
    { field: "orderID" },
    { field: "customerName", filter: true },
    { field: "orderDate", filter: true },
    {
      field: "status",
      valueFormatter: statusFormatter,
      cellRenderer: StatusCellRenderer,
      filter: true,
      filterParams: {
        valueFormatter: statusFormatter,
      },
      headerClass: "header-status",
      
    },
    { field: "totalAmount", filter: true },
    {
      field: "actions",
      cellRenderer: ActionsCellRenderer,
      cellEditorParams: {
        api: {
          setRowData, // Pass setRowData to the editor component
        },
      },
    }
  ]);

 const { data } = useGetOrdersQuery()

 const onGridReady = (params: any) => {
  params.api.sizeColumnsToFit();
};



  useEffect(() => {
    if(data) {
      setRowData(data)
    }
  }, [data])

  return (
    <div className="h-100 page-wrapper">
      <h1>Orders</h1>
      <Table data={rowData} columns={colDefs}
        onGridReady={onGridReady}
        pagination
        paginationPageSize={20}
        paginationPageSizeSelector={[10, 15, 20]} />
    </div>

  )
}

export default Orders;