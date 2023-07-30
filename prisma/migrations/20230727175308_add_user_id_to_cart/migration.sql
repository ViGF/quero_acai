/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - The required column `id` was added to the `Cart` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Order_userId_idx";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId",
ADD COLUMN     "cartId" TEXT;

-- CreateIndex
CREATE INDEX "Order_cartId_idx" ON "Order"("cartId");
