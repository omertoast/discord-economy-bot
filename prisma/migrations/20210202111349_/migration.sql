/*
  Warnings:

  - You are about to drop the column `shopItemItemId` on the `Item` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[itemId]` on the table `ShopItem`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_shopItemItemId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "shopItemItemId";

-- CreateIndex
CREATE UNIQUE INDEX "ShopItem_itemId_unique" ON "ShopItem"("itemId");

-- AddForeignKey
ALTER TABLE "ShopItem" ADD FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
