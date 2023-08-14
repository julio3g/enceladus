/*
  Warnings:

  - Added the required column `description` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "registration" INTEGER NOT NULL;
