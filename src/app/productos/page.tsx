import FormularioProducto from "./components/formulario-producto";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Alta de Producto</h1>
      <FormularioProducto />
    </main>
  );
}
