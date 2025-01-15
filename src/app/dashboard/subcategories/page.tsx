"use client";
import React, { useState, useMemo, useEffect } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/forms/CategoryForm";
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

const SubcategoriesPage = () => {
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  const [categories, setCategories] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/subcategories")]).then(
      ([categoriesResponse, subcategoriesResponse]) => {
        setCategories(categoriesResponse.data);
        setRowData(subcategoriesResponse.data);
      }
    );
  }, [setCategories, setRowData]);

  const getCategoryName = (id: string | number) => {
    const category = categories?.find((category) => String(category.id) === String(id));
    return category?.name || "N/A";
  };

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = useMemo<ColDef[]>(() => [
    {
      field: "id",
      filter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Tesla", "Ford", "Toyota"],
      },
      flex: 1,
    },
    { field: "name", filter: true, floatingFilter: true, flex: 1 },
    {
      field: "categoryId",
      headerName: "Kategorija",
      valueGetter: (params) => {
        if (!categories || categories.length === 0) return "Loading...";
        return getCategoryName(params.data?.categoryId);
      },
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "action",
      filter: false,
      cellRenderer: EditButtonComponent,
      flex: 1,
    },
  ], [categories]);

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
      {categories && (
        <AgGridReact
          className="w-2/3 h-full"
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          defaultColDef={defaultColDef}
        />
      )}
      <div className="flex justify-center w-1/3 px-4">
        <SubcategoryForm categories={categories} setRowData={setRowData} />
      </div>
    </div>
  );
};

export default SubcategoriesPage;
