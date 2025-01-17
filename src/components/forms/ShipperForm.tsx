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
import { Input } from "@/components/ui/input";
import { AxiosResponse } from "axios";
import { api } from "@/lib/apiConfig";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Must be a valid email.",
  })
});

export default function ShipperForm({ setRowData }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response: AxiosResponse = await api.post("/shippers/", values);
      if (response) {
        alert("Uspesno unet dostavljac!");
        setRowData((prev: any) => [...prev, values]);
        form.reset();
      }
    } catch {
      alert("Greska prilikom unosenja dostavljaca");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormLabel className="text-3xl text-gray-700">
          Unesi novog dostavljača
        </FormLabel>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Ime dostavljača... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Telefon dostavljača... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input type="email" placeholder={`Email dostavljača... `} {...field} />
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
