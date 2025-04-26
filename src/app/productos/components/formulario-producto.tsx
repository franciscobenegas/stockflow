"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown, ImagePlus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const categorias = [
  { label: "Electrónica", value: "electronica" },
  { label: "Ropa", value: "ropa" },
  { label: "Hogar", value: "hogar" },
  { label: "Deportes", value: "deportes" },
  { label: "Juguetes", value: "juguetes" },
  { label: "Alimentos", value: "alimentos" },
  { label: "Belleza", value: "belleza" },
  { label: "Libros", value: "libros" },
];

const formSchema = z.object({
  nombre: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  descripcion: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  precio: z.coerce.number().positive({
    message: "El precio debe ser un número positivo.",
  }),
  categoria: z.string({
    required_error: "Por favor selecciona una categoría.",
  }),
  stock: z.coerce.number().int().nonnegative({
    message: "El stock debe ser un número entero no negativo.",
  }),
  activo: z.boolean().default(true),
  imagen: z.instanceof(File).optional(),
});

export default function FormularioProducto() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: undefined,
      categoria: "",
      stock: undefined,
      activo: true,
      imagen: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simular envío a API
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "Producto creado",
        description: `El producto "${values.nombre}" ha sido dado de alta correctamente.`,
      });
      form.reset();
      setImagenPreview(null);
    }, 1500);
  }

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("imagen", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Información del Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Smartphone XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="precio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                          $
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          className="pl-7"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe las características del producto..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Categoría</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categorias.find(
                                  (categoria) => categoria.value === field.value
                                )?.label
                              : "Selecciona una categoría"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Buscar categoría..." />
                          <CommandList>
                            <CommandEmpty>
                              No se encontraron categorías.
                            </CommandEmpty>
                            <CommandGroup>
                              {categorias.map((categoria) => (
                                <CommandItem
                                  key={categoria.value}
                                  value={categoria.value}
                                  onSelect={(value) => {
                                    form.setValue("categoria", value);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      categoria.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {categoria.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock disponible</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="imagen"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Imagen del producto</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                          onClick={() =>
                            document.getElementById("imagen-input")?.click()
                          }
                        >
                          {imagenPreview ? (
                            <img
                              src={imagenPreview || "/placeholder.svg"}
                              alt="Vista previa"
                              className="max-h-[150px] object-contain mb-2"
                            />
                          ) : (
                            <ImagePlus className="h-12 w-12 text-gray-400 mb-2" />
                          )}
                          <p className="text-sm text-gray-500">
                            {imagenPreview ? "Cambiar imagen" : "Subir imagen"}
                          </p>
                          <input
                            id="imagen-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImagenChange}
                            {...fieldProps}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Formatos aceptados: JPG, PNG, GIF
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-8">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Estado del producto
                      </FormLabel>
                      <FormDescription>
                        {field.value
                          ? "Activo (visible para los clientes)"
                          : "Inactivo (oculto)"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-end gap-2 px-0">
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Guardando..." : "Guardar producto"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
