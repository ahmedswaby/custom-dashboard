import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ActionsCellRenderer from "./activeCellRender";
import "@testing-library/jest-dom";

describe("ActionsCellRenderer Component", () => {
  const mockGetDetails = vi.fn();
  const mockEdit = vi.fn();
  const mockDeleteAction = vi.fn();
  const mockRenderModalContent = vi.fn();

  const defaultProps = {
    data: { id: "1" }, // Mock row data
    api: {
      applyTransaction: vi.fn(), // Mock API method
    },
    getDetails: mockGetDetails,
    edit: mockEdit,
    deleteAction: mockDeleteAction,
    renderModalContent: mockRenderModalContent,
    enableToggleStatus: true,
    toggleStatus: vi.fn(),
    value: "Sample Value",
    valueFormatted: "Sample Value Formatted",
    node: {},
    colDef: {},
    column: {},
    columnApi: {},
    context: {},
    eGridCell: {},
    eParentOfValue: {},
    refreshCell: vi.fn(),
    rowIndex: 0,
  };

  it("renders all enabled buttons", () => {
    render(<ActionsCellRenderer {...defaultProps} />);

    expect(screen.getByTestId("toggle status")).toBeInTheDocument();
  });
});
