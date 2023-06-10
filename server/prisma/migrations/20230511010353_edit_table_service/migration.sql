/*
  Warnings:

  - You are about to drop the column `clients_id` on the `services` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_clients_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "clients_id",
ADD COLUMN     "client_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
