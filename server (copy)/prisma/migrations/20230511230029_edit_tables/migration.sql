/*
  Warnings:

  - You are about to drop the column `reportId` on the `receipts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "receipts" DROP CONSTRAINT "receipts_reportId_fkey";

-- AlterTable
ALTER TABLE "receipts" DROP COLUMN "reportId",
ADD COLUMN     "report_id" TEXT;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;
