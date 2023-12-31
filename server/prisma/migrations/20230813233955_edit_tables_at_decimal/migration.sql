-- AlterTable
ALTER TABLE "equity_investments" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "estimates" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "extras" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "financial_incomes" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "fixed_costs" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "receipts" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "thirds" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "payment" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(65,30);
