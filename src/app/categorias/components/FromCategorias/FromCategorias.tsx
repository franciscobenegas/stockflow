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
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  nombre: z.string().min(2),
  color: z.string(),
});

interface FormProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export function FromCategorias(props: FormProps) {
  const { setOpenModal } = props;
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false); // Estado para el botón de carga

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      color: "#2aade5",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      setLoading(true); // Desactivar el botón

      const resp = await fetch("/api/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (resp.ok) {
        router.refresh();
        setOpenModal(false);
        toast({
          title: "Exito!!! 😃",
          description: "Los datos fueron guardados",
          variant: "successful",
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "Error al dar de alta el Cliente",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reactivar el botón
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre de la categoria"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={!isValid || loading}>
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                Guardando
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
