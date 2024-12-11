"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { tipoCliente } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface tipoClienteFormProps {
  tipoCliente: tipoCliente;
}

const formSchema = z.object({
  name: z.string().min(5),
});

export function FormTipoCliente(props: tipoClienteFormProps) {
  const { tipoCliente } = props;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // Estado para el botón de carga
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tipoCliente.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true); // Desactivar el botón
      const resp = await fetch(`/api/tipocliente/${tipoCliente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (resp.ok) {
        toast({
          title: "Dato Actualizado!!! 😃",
          variant: "successful",
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Algo salio mal, vuelva a intentarlo",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false); // Reactivar el botón
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Nombre </FormLabel>
                <FormControl>
                  <Input placeholder="Tipo Cliente..." type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              Actualizando...
            </>
          ) : (
            "Actualizar Datos"
          )}
        </Button>
      </form>
    </Form>
  );
}
