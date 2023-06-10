/*
  Warnings:

  - You are about to drop the column `additionals_id` on the `clients` table. All the data in the column will be lost.
  - Added the required column `additions_id` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "additionals_id",
ADD COLUMN     "additions_id" TEXT NOT NULL;
