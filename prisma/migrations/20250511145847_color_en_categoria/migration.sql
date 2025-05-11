/*
  Warnings:

  - Added the required column `color` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "color" TEXT NOT NULL;
