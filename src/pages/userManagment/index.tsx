import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { ColDef } from "ag-grid-community";
import { useGetUsersQuery } from '../../store/apis/users';
import { orderData } from '../../models/enums';

const UserManagement = () => {


  const [rowData, setRowData] = useState<orderData[]>([]);





  const [colDefs] = useState<ColDef[]>([
    { field: "id" },
    { field: "username" },
    { field: "email" },
    { field: "role" },
    { field: "status" },

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
  return <div className="h-100 page-wrapper">
    <h1>User Managment</h1>
    <Table data={rowData} columns={colDefs}
      onGridReady={onGridReady}
      pagination
      paginationPageSize={20}
      paginationPageSizeSelector={[10, 15, 20]}
    />
  </div>
};

export default UserManagement;
