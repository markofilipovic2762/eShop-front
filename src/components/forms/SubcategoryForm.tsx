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
  categoryId: z.string(),
});

type SubcategoryFormProps = {
  categories: Array<any>;
}

export default function SubcategoryForm( { categories }: SubcategoryFormProps ) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    api.post('/subcategories', values).then( res => alert(`Uspesno uneta podkategorija! ${res.data}`))
    .catch( err => alert("Dogodila se greska!") )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormLabel className="text-2xl text-black">
          Unesi novu podkategoriju
        </FormLabel>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-gray-600">
              <FormControl>
                <Input placeholder={`Ime podkategorije... `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="text-gray-600" >
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl className="text-gray-600">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="text-gray-600">
                  {categories.map((category) => (
                    <SelectItem className="text-gray-600" key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
