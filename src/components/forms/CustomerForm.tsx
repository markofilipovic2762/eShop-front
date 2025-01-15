"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/apiConfig";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(5, {
    message: "Postal code must be at least 5 characters.",
  }),
  phone: z.string().optional()
  })

type CustomerFormProps = {
  setRowData: any;
};

export default function CustomerForm({
  setRowData,
}: CustomerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    api
      .post("/customers", values)
      .then((res) => {
        setRowData((prev : any) => [...prev, values]);
        alert(`Uspesno unet kupac! ${res.data}`);
      })
      .catch((err) => alert("Dogodila se greska!"));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormLabel className="text-4xl text-black">Unesi novog kupca</FormLabel>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Ime kupca... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Adresa... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Grad... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Postanski broj... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input type="tel" placeholder={`Broj telefona... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center mt-4">
          <Button type="submit" className="bg-blue-600 w-full text-2xl p-4">
            Dodaj
          </Button>
        </div>
      </form>
    </Form>
  );
}
