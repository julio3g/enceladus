/*
  Warnings:

  - You are about to drop the column `data_income` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the `additionals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phone` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Made the column `clients_id` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "additionals" DROP CONSTRAINT "additionals_client_id_fkey";

-- DropForeignKey
ALTER TABLE "additionals" DROP CONSTRAINT "additionals_third_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_clients_id_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "data_income",
DROP COLUMN "phone_number",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "clients_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- DropTable
DROP TABLE "additionals";

-- CreateTable
CREATE TABLE "extras" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "third_id" TEXT,
    "client_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_clients_id_fkey" FOREIGN KEY ("clients_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extras" ADD CONSTRAINT "extras_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extras" ADD CONSTRAINT "extras_third_id_fkey" FOREIGN KEY ("third_id") REFERENCES "thirds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
