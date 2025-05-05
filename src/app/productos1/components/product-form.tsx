"use client";

import type React from "react";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
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
import { createProduct } from "./actions";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El precio debe ser un número mayor que 0.",
  }),
  category: z.string({
    required_error: "Por favor selecciona una categoría.",
  }),
  activo: z.boolean().default(true),
  stock: z.coerce.number().int().nonnegative({
    message: "El stock debe ser un número entero no negativo.",
  }),
});

const categories = [
  { value: "electronics", label: "Electrónica" },
  { value: "clothing", label: "Ropa" },
  { value: "home", label: "Hogar" },
  { value: "books", label: "Libros" },
  { value: "sports", label: "Deportes" },
  { value: "toys", label: "Juguetes" },
  { value: "beauty", label: "Belleza" },
  { value: "health", label: "Salud" },
  { value: "food", label: "Alimentos" },
  { value: "other", label: "Otros" },
];

export default function ProductForm() {
  //   const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      activo: true,
      stock: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);

      // Crear URLs para las vistas previas
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    // Liberar URL de objeto para evitar fugas de memoria
    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      // En un caso real, aquí enviaríamos las imágenes junto con los datos del formulario
      // Esto podría hacerse con FormData y fetch, o con una acción del servidor

      // Simulamos la creación del producto
      await createProduct({
        ...values,
        price: Number.parseFloat(values.price),
        imageCount: images.length,
      });

      // Resetear el formulario y las imágenes
      form.reset();
      setImages([]);
      setPreviews([]);

      // Mostrar mensaje de éxito o redirigir
      alert("Producto creado con éxito");
      // router.push("/productos")
    } catch (error) {
      console.error("Error al crear el producto:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Producto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el nombre del producto"
                    {...field}
                  />
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
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describa el producto"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Gs."
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
              name="category"
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
                          className="w-full justify-between"
                        >
                          {field.value ? (
                            categories.find(
                              (category) => category.value === field.value
                            )?.label
                          ) : (
                            <div className="text-gray-500">
                              Seleccione una categoría
                            </div>
                          )}
                          <Upload className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" w-full md:w-96 p-0 ">
                      <Command>
                        <CommandInput
                          placeholder="Buscar categoría..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            No se encontraron categorías.
                          </CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.value}
                                value={category.label}
                                onSelect={() => {
                                  form.setValue("category", category.value);
                                  setOpen(false);
                                }}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === category.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
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

          <div className="space-y-4">
            <FormLabel>Imágenes del Producto</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-sm font-medium">
                  Haga clic para seleccionar imágenes
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF hasta 10MB
                </span>
              </label>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden border">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Vista previa ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {previews.length > 0 && (
              <p className="text-sm text-gray-500">
                {previews.length}{" "}
                {previews.length === 1
                  ? "imagen seleccionada"
                  : "imágenes seleccionadas"}
              </p>
            )}
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
    </Card>
  );
}
