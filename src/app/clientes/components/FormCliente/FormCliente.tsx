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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  nombre: z.string().min(5),
  ruc: z.string().min(2),
  telefono: z.string(),
  email: z
    .string()
    .min(1, { message: "El campo es requerido." })
    .email("No es un correo electrónico válido."),
  direccion: z.string(),
  tipo: z.string().min(1),
});

interface FormProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export function FormCliente(props: FormProps) {
  const { setOpenModal } = props;
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false); // Estado para el botón de carga

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      ruc: "",
      telefono: "",
      email: "",
      direccion: "",
      tipo: "",
    },
  });

  const { isValid } = form.formState;

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      setLoading(true); // Desactivar el botón

      const resp = await fetch("/api/cliente", {
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
                  <FormLabel>Nombre Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre ..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ruc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUC</FormLabel>
                  <FormControl>
                    <Input placeholder="Ruc ..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(+595) 0981 222 333 ..."
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="Email ..." type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección ..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="taller">Taller</SelectItem>
                      <SelectItem value="particular">Particular</SelectItem>
                      <SelectItem value="comercio">Comercio</SelectItem>
                      <SelectItem value="NA">Otro</SelectItem>
                    </SelectContent>
                  </Select>
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
