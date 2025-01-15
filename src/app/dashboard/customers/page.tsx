"use client";
import React, { useState, useMemo, useEffect } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import CustomerForm from "@/components/forms/CustomerForm";
import SubcategoryForm from "@/components/forms/SubcategoryForm";
import { api } from "@/lib/apiConfig";
import { AxiosResponse } from "axios";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const EditButtonComponent = ({ className }: any) => {
  return (
    <Button className={className} onClick={() => window.alert("clicked")}>
      Edit
    </Button>
  );
};

const CustomersPage = () => {
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    api.get("/customers").then(response => setRowData(response.data));
  }, [setRowData]);

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "id",
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      { field: "name", filter: true, floatingFilter: true, flex: 1 },
      {
        field: "address",
        headerName: "Adresa",
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      { field: "city", filter: true, floatingFilter: true, flex: 1 },
      { field: "postalCode", filter: true, floatingFilter: true, flex: 1 },
      { field: "phone", filter: true, floatingFilter: true, flex: 1 },
      { field: "email", filter: true, floatingFilter: true, flex: 1 },
      {
        field: "action",
        filter: false,
        cellRenderer: EditButtonComponent,
        flex: 1,
      },
    ],
    []
  );

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
  return (
    <div
      // define a height because the Data Grid will fill the size of the parent container
      style={{ display: "flex", height: "90vh", width: "100%" }}
    >
      
        <AgGridReact
          className="w-2/3 h-full"
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          defaultColDef={defaultColDef}
        />
      <div className="flex justify-center w-1/3 px-2">
        <CustomerForm setRowData={setRowData} />
      </div>
    </div>
  );
};

export default CustomersPage;
