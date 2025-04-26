-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "medidaId" INTEGER;

-- CreateTable
CREATE TABLE "Medidas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Medidas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Producto_medidaId_idx" ON "Producto"("medidaId");
