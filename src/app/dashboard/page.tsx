"use client";
import React, { useState } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/ProductForm";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DashboardPage = () => {
  
  return (
    <div
      // define a height because the Data Grid will fill the size of the parent container
      style={{ display: "flex", height: "100vh", width: "100%" }}
    >
    
    </div>
  );
};

export default DashboardPage;
