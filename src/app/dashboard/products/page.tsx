"use client";
import React, { useState, useMemo, useEffect } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/ProductForm";
import { api } from "@/lib/apiConfig";

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
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [20, 50, 100];
  const [rowData, setRowData] = useState([]);

  const [categories,setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    api.get("/products").then((response) => setRowData(response.data));
  }, [setRowData]);

  useEffect(() => {
    api.get("/categories").then((response) => setCategories(response.data));
    api.get("/suppliers").then((response) => setSuppliers(response.data));
  },[setCategories,setSuppliers]);

  const getSubcategories = async (id: number) => {
    const response = await api.get(`/subcategories?id=${id}`);
    return response.data;
  }
  // Column Definitions: Defines the columns to be displayed.
  const colDefs = useMemo<ColDef[]>(() => [
    {
      field: "id",
      filter: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Ime",
      filter: true,
      flex: 1,
    },
    { field: "price", headerName: "Cena", filter: "agNumberColumnFilter", flex: 1 },
    { field: "amount", headerName: "Količina", filter: true, floatingFilter: true, flex: 1 },
    { field: "categoryName", headerName: "Kategorija", filter: true, flex: 1 },
    { field: "subcategoryName", headerName: "Podkategorija", filter: true, floatingFilter: true, flex: 1 },
    { field: "supplierName", headerName: "Dobavljač", filter: true, floatingFilter: true, flex: 1 },
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
        <ProductForm setRowData={setRowData} categories={categories} getSubcategories={getSubcategories} suppliers={suppliers} />
      </div>
    </div>
  );
};

export default ProductsPage;
