-- DropIndex
DROP INDEX "ShopItem_itemId_unique";

-- DropForeignKey
ALTER TABLE "ShopItem" DROP CONSTRAINT "ShopItem_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "shopItemItemId" INTEGER;

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("shopItemItemId") REFERENCES "ShopItem"("itemId") ON DELETE SET NULL ON UPDATE CASCADE;
