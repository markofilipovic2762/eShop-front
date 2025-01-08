'use client'
import React, {useState} from 'react'
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DashboardPage = () => {
    const [rowData, setRowData] = useState([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<ColDef[]>([
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" },
    ]);
  return (
    <div
        // define a height because the Data Grid will fill the size of the parent container
        style={{ height: 500 }}
    >
        <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
        />
    </div>
  )
}

export default DashboardPage