"use client";
import React, { useState, useMemo, useEffect } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/forms/CategoryForm";
import { api } from "@/lib/apiConfig";
import ShipperForm from "@/components/forms/ShipperForm";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const EditButtonComponent = ({ className }: any) => {
  return (
    <Button className={className} onClick={() => window.alert("clicked")}>
      Edit
    </Button>
  );
};

const ShippersPage = () => {
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    api.get("/shippers").then((response) => setRowData(response.data));
  }, [setRowData]);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "id",
        filter: true,
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "name",
        headerName: "Ime",
        filter: true,
        floatingFilter: true,
        flex: 5,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "phone",
        headerName: "Telefon",
        filter: true,
        floatingFilter: true,
        flex: 5,
        cellStyle: { textAlign: "center" },
    },
    {
        field: "email",
        headerName: "Email",
        filter: true,
        floatingFilter: true,
        flex: 5,
        cellStyle: { textAlign: "center" },
    }   
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
      style={{ display: "flex", height: "100vh", width: "100%" }}
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
      <div className="flex justify-center w-1/3 px-4">
        <ShipperForm setRowData={setRowData} />
      </div>
    </div>
  );
};

export default ShippersPage;
