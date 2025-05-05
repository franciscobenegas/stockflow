"use server";

// Esta es una función simulada para crear un producto
// En un caso real, aquí conectarías con tu base de datos
export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  category: string;
  imageCount: number;
}) {
  // Simulamos un retraso para mostrar el estado de carga
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("Producto creado:", data);

  // Aquí iría la lógica para guardar en la base de datos
  // Por ejemplo, con Prisma:
  // const product = await prisma.product.create({
  //   data: {
  //     name: data.name,
  //     description: data.description,
  //     price: data.price,
  //     category: data.category,
  //   },
  // })

  // Y luego guardaríamos las imágenes relacionadas con el producto

  return {
    id: "prod_" + Math.random().toString(36).substring(2, 9),
    ...data,
  };
}
