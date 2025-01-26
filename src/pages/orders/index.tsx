import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { StatusCellRenderer } from "../../components/Table/statusCellRenderer";
import ActionsCellRenderer from "../../components/Table/actionsCellRenderer";
import {
  ValueFormatterFunc,
  ColDef,
} from "ag-grid-community";
import { useGetOrdersQuery } from '../../store/apis/orders';
import { orderData , statuses as statusEnum } from '../../models/enums';
import { useLazyGetOrderDetailsQuery, useEditOrderMutation, useDeleteOrderMutation } from "../../store/apis/orders";
import type { CustomCellRendererProps } from "ag-grid-react";


// Generate the statuses object dynamically
export const statuses = statusEnum.reduce((acc, status) => {
  acc[status.Name] = status.Name;
  return acc;
}, {} as Record<string, string>);




const statusFormatter: ValueFormatterFunc = ({ value }) => value.Name as keyof typeof statuses ?? "";


// Function to render modal content
const renderModalContent = (details: orderData) => (
  <>
    <h3>Order Details</h3>
    <p><strong>Order ID:</strong> {details.orderID}</p>
    <p><strong>Customer Name:</strong> {details.customerName}</p>
    <div className="status-wrapper"><strong>Status:</strong> <StatusCellRenderer value={details?.status ?? {}} valueFormatted={details?.status?.Name ?? ''} /></div>

    <p><strong>Total Amount:</strong> ${details.totalAmount}</p>
  </>
);



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
      cellRenderer: (props: CustomCellRendererProps) => {
        return (
        <ActionsCellRenderer 
          {...props} 
          enableEditStatus 
          enableRemoveBtn 
          enableViewBtn 
          renderModalContent={renderModalContent}
          getDetails={getOrderDetails} 
          edit={editOrder} 
          deleteAction={deleteOrder} 
          />);
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