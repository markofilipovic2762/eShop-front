"use client";
import React, { useState } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/ProductForm";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const EditButtonComponent = ({ className }: any) => {
  return (
    <Button className={className} onClick={() => window.alert("clicked")}>
      Edit
    </Button>
  );
};

const ProductsPage = () => {
  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "make",
      filter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Tesla", "Ford", "Toyota"],
      },
      flex: 1,
    },
    { field: "model", filter: true, floatingFilter: true, flex: 1 },
    { field: "price", filter: "agNumberColumnFilter", flex: 1 },
    { field: "electric", filter: true, flex: 1 },
    { field: "action", cellRenderer: EditButtonComponent, flex: 1 },
  ]);
  return (
    <div
      // define a height because the Data Grid will fill the size of the parent container
      style={{ display: "flex", height: "100vh", width: "100%" }}
    >
      <AgGridReact
        className="w-2/3 h-full"
        rowData={rowData}
        columnDefs={colDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
      <div className="flex justify-center w-1/3 px-4">
        <ProductForm />
      </div>
    </div>
  );
};

export default ProductsPage;
