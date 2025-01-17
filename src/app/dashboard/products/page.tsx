"use client";
import React, { useState, useMemo } from "react";
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
  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = useMemo<ColDef[]>(() => [
    {
      field: "name",
      headerName: "Ime",
      filter: true,
      flex: 1,
    },
    { field: "price", headerName: "Cena", filter: "agNumberColumnFilter", flex: 1 },
    { field: "amount", headerName: "Količina", filter: true, floatingFilter: true, flex: 1 },
    { field: "categoryId", headerName: "Kategorija", filter: true, flex: 1 },
    { field: "subcategoryId", headerName: "Podkategorija", filter: true, floatingFilter: true, flex: 1 },
    { field: "supplierId", headerName: "Dobavljač", filter: true, floatingFilter: true, flex: 1 },
    { field: 'action', cellRenderer: EditButtonComponent, flex: 1 },
  ],[]);

  return (
    <div
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
