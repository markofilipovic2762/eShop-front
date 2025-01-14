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
});

export default function CategoryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const response: AxiosResponse = await api.post('/categories/',values);
        if(response){
            alert("Uspesno uneta kategorija!")
        }
    } catch {
        alert("Greska prilikom unosenja kategorije")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormLabel className="text-2xl text-black">
          Unesi novu kategoriju
        </FormLabel>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Ime kategorije... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-center items-center mt-4">
          <Button type="submit" className="bg-blue-600 w-full text-2xl p-4">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
