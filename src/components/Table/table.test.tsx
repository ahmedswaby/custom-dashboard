import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './index'; // Adjust the import path as necessary
import { Provider } from 'react-redux';
import store from '../../store/store';

test('renders table with correct data', () => {
    const mockData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ];
    const columns = [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
    ];
    render( <Provider store={store}><Table data={mockData} columns={columns} /></Provider>);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
  