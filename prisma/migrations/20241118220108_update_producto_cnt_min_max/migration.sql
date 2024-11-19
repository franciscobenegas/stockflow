/*
  Warnings:

  - Added the required column `cantidadMaxima` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidadMinima` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "cantidadMaxima" INTEGER NOT NULL,
ADD COLUMN     "cantidadMinima" INTEGER NOT NULL;
