export interface Status {
    id: number;
    Name: string;
}


export const statuses: Status[] = [
    { id: 1, Name: "Pending" },
    { id: 2, Name: "Shipped" },
    { id: 3, Name: "Delivered" },
    { id: 4, Name: "Cancelled" },
  ];


  export interface orderData {
    id: string
    orderID: number,
    customerName: string,
    orderDate: string,
    status: {
      id: number,
      Name: string
    },
    totalAmount: string,
  }
  
  export interface userData {
    id: string
    email: number,
    userName: string,
    role: string,
    status: boolean
  }
  