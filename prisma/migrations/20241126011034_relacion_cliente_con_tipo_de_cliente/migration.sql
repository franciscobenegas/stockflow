/*
  Warnings:

  - Added the required column `tipoClienteId` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "tipoClienteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tipoCliente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "tipoCliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cliente_tipoClienteId_idx" ON "Cliente"("tipoClienteId");
