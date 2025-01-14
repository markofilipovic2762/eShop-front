"use client";
import React, { useState, useMemo, useEffect, use } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/forms/CategoryForm";
import SubcategoryForm from "@/components/forms/SubcategoryForm";
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

const SubcategoriesPage = () => {
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  const [categories, setCategories] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    api.get("/categories").then((response) => setCategories(response.data));
  }, []);

  useEffect(() => {
    api.get("/subcategories").then((response) => setRowData(response.data));
  }, []);

  console.log(categories);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
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
      valueGetter: (p) => {
        const category = categories?.find(
          (category) => category.id === p.data.categoryId
        );
        return category?.name;
      }, // categories.find((category) => category.id === p.data.categoryId),
      // valueGetter: (p) => categories.find((category) => category.id === p.data.categoryId)?.name,
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
  ]);

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
      <div className="flex justify-center w-1/3 px-4">
        <SubcategoryForm categories={categories} />
      </div>
    </div>
  );
};

export default SubcategoriesPage;
