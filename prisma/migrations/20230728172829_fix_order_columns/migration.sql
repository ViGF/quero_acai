/*
  Warnings:

  - You are about to drop the column `size` on the `Order` table. All the data in the column will be lost.
  - The `fruits` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `syrupsAndCreams` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `priceId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "size",
ADD COLUMN     "priceId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "fruits",
ADD COLUMN     "fruits" TEXT[],
DROP COLUMN "syrupsAndCreams",
ADD COLUMN     "syrupsAndCreams" TEXT[];
