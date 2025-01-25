import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { StatusCellRenderer } from "../../components/Table/statusCellRenderer";
import { ActionsCellRenderer } from "../../components/Table/actionsCellRenderer";
import {
  ValueFormatterFunc,
  ColDef,
} from "ag-grid-community";
import { useGetOrdersQuery } from '../../store/apis/orders';
import { orderData } from '../../models/enums';
import { useLazyGetOrderDetailsQuery, useEditOrderMutation, useDeleteOrderMutation } from "../../store/apis/orders";
import type { CustomCellRendererProps } from "ag-grid-react";

const statuses = {
  Pending: "Pending",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};




const statusFormatter: ValueFormatterFunc = ({ value }) => value.Name as keyof typeof statuses ?? "";




const Orders = () => {

  const [rowData, setRowData] = useState<orderData[]>([]);


  const [getOrderDetails] = useLazyGetOrderDetailsQuery();
  const [editOrder] = useEditOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();


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
      // cellRenderer: ActionsCellRenderer,
      cellRenderer: (props: CustomCellRendererProps) => {
        // put the value in bold
        return <ActionsCellRenderer {...props} enableEditStatus enableRemoveBtn enableViewBtn
          getOrderDetails={getOrderDetails} editOrder={editOrder} deleteOrder={deleteOrder} />;
      }
    }
  ]);

  const { data } = useGetOrdersQuery()

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };



  useEffect(() => {
    if (data) {
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
        paginationPageSizeSelector={[10, 15, 20]}
      />
    </div>

  )
}

export default Orders;