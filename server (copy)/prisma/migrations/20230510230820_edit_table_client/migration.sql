/*
  Warnings:

  - You are about to drop the column `total_balance` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `total_balance` on the `thirds` table. All the data in the column will be lost.
  - Added the required column `balance` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `thirds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "total_balance",
ADD COLUMN     "balance" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "thirds" DROP COLUMN "total_balance",
ADD COLUMN     "balance" INTEGER NOT NULL;
