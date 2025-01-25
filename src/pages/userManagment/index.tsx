import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { ColDef } from "ag-grid-community";
import { useGetUsersQuery } from '../../store/apis/users';
import { orderData } from '../../models/enums';
import ActiveButtonCellRender from '../../components/Table/activeCellRender';
import { CustomCellRendererProps } from 'ag-grid-react';

const UserManagement = () => {

  const [rowData, setRowData] = useState<orderData[]>([]);
  const [colDefs] = useState<ColDef[]>([
    { field: "id" },
    { field: "username" },
    { field: "email" },
    { field: "role" },
    {
      field: "status",
      // cellRenderer: ActionsCellRenderer,
      cellRenderer: (props: CustomCellRendererProps) => {
        // put the value in bold
        return <ActiveButtonCellRender {...props}/>;
      }
    }
  ]);
  
  const { data } = useGetUsersQuery()

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    if (data) {
      setRowData(data)
    }
  }, [data])

  const getRowId = (params: any) => params.data.id; // Use the `id` field as the unique identifier

  return <div className="h-100 page-wrapper">
    <h1>User Managment</h1>
    <Table data={rowData} columns={colDefs}
      onGridReady={onGridReady}
      pagination
      paginationPageSize={20}
      paginationPageSizeSelector={[10, 15, 20]}
      getRowId={getRowId}
    />
  </div>
};

export default UserManagement;
