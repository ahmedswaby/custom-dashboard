import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { ColDef } from "ag-grid-community";
import { useGetUsersQuery, useLazyGetUserDetailsQuery } from '../../store/apis/users';
import { orderData, userData } from '../../models/enums';
import { CustomCellRendererProps } from 'ag-grid-react';
import ActionsCellRenderer from '../../components/Table/actionsCellRenderer';


// Function to render modal content
const renderModalContent = (details: userData) => (
  <>
    <h3>User Details</h3>
    <p><strong>Name:</strong> {details.name}</p>
    <p><strong>User name:</strong> {details.username}</p>
    <p><strong>email:</strong> {details.email}</p>
    <p><strong>Role:</strong> {details.role}</p>
    <p><strong>Active:</strong> {details.status ? 'True' : 'False'}</p>

  </>
);


const UserManagement = () => {

  const [getUserDetails] = useLazyGetUserDetailsQuery()


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
        // return <ActiveButtonCellRender {...props}/>;
        return (
          <ActionsCellRenderer 
            {...props} 
            enableViewBtn 
            enableToggleStatus 
            renderModalContent={renderModalContent} 
            getDetails={getUserDetails} 
          />
        )
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
