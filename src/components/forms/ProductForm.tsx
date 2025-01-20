"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { api } from "@/lib/apiConfig";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.number().or(z.null()),
  amount: z.number().or(z.null()),
  categoryId: z.string(),
  subcategoryId: z.string(),
  supplierId: z.string(),
  imageUrl: z.string(),
});

type ProductFormProps = {
  setRowData: any;
  categories: any;
  suppliers: any;
  getSubcategories: any;
}

export function ProductForm({ setRowData, categories, suppliers, getSubcategories }: ProductFormProps) {
  const [subcategories, setSubcategories] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: null, // ili 0
      amount: null, // ili 0
      categoryId: "",
      subcategoryId: "",
      supplierId: "",
      imageUrl: "",
    },
  });

  const watchedCategoryId = useWatch({
    control: form.control,
    name: "categoryId",
  });

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (watchedCategoryId !== undefined && watchedCategoryId !== null) {
        const result = await getSubcategories(watchedCategoryId);
        console.log("Rezultat subkategorija:", result);
        setSubcategories(result || []);
      } else {
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [watchedCategoryId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response: AxiosResponse = await api.post("/products/", values);
      if (response) {
        form.reset();
        setRowData((prev: any) => [...prev, values]);
        alert("Uspesno unet proizvod!");
      }
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormLabel className="text-3xl text-gray-800">
          Unesi podatke o proizvodu
        </FormLabel>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Unesi ime proizvoda... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-gray-600"
                  placeholder={`Unesi opis... `}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-gray-600"
                  placeholder={`Unesi cenu... `}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  // {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-gray-600"
                  placeholder={`Unesi kolicinu... `}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  // {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl className="text-gray-600">
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberi kategoriju" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="text-gray-600">
                  {categories?.map((category: any) => (
                    <SelectItem
                      className="text-gray-600"
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={!watchedCategoryId}
          name="subcategoryId"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl className="text-gray-600">
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberi podkategoriju" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="text-gray-600">
                  {subcategories?.map((subcategory: any) => (
                    <SelectItem
                      className="text-gray-600"
                      key={subcategory.id}
                      value={subcategory.id.toString()}
                    >
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          //disabled={!watchedCategoryId}
          name="supplierId"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl className="text-gray-600">
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberi dobavljaca" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="text-gray-600">
                  {suppliers?.map((supplier: any) => (
                    <SelectItem
                      className="text-gray-600"
                      key={supplier.id}
                      value={supplier.id.toString()}
                    >
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-gray-700">
                Unesi sliku proizvoda
              </FormLabel>
              <FormControl>
                {/* <label htmlFor="imageUrl" >Unesi sliku proizvoda</label> */}
                <Input
                  type="file"
                  className="text-gray-700 cursor-pointer"
                  accept="image/*"
                  placeholder={`Unesi sliku... `}
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center mt-4">
          <Button type="submit" className="bg-blue-600 w-full text-2xl p-4">
            Dodaj proizvod
          </Button>
        </div>
      </form>
    </Form>
  );
}
