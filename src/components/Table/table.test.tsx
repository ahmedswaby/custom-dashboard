import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Table from './index'; // Adjust the import path to your component
import '@testing-library/jest-dom';

describe('Table Component', () => {
  const mockData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
  ];

  const mockColumns = [
    { field: 'Name', headerName: 'Name' },
    { field: 'Age', headerName: 'Age' },
  ];

  it('renders the table with data', () => {
    const { getAllByRole } = render(<Table data={mockData} columns={mockColumns} />);
    const headers = getAllByRole('columnheader');
    expect(headers[0]).toHaveTextContent('Name');
    expect(headers[1]).toHaveTextContent('Age');
  });




});
