/*
  Warnings:

  - The migration will change the primary key for the `Item` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `ShopItem` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `UserItem` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserItem` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[id,itemGuildId]` on the table `Item`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[itemId,guildId]` on the table `ShopItem`. If there are existing duplicate values, the migration will fail.
  - Added the required column `itemGuildId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `ShopItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemGuildId` to the `UserItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `UserItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerGuildId` to the `UserItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ShopItem_itemId_unique";

-- DropForeignKey
ALTER TABLE "ShopItem" DROP CONSTRAINT "ShopItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "UserItem" DROP CONSTRAINT "UserItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "UserItem" DROP CONSTRAINT "UserItem_userId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
ADD COLUMN     "itemGuildId" TEXT NOT NULL,
ADD PRIMARY KEY ("id", "itemGuildId");

-- AlterTable
ALTER TABLE "ShopItem" DROP CONSTRAINT "ShopItem_pkey",
ADD COLUMN     "guildId" TEXT NOT NULL,
ADD PRIMARY KEY ("itemId", "guildId");

-- AlterTable
ALTER TABLE "UserItem" DROP CONSTRAINT "UserItem_pkey",
DROP COLUMN "userId",
ADD COLUMN     "itemGuildId" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "ownerGuildId" TEXT NOT NULL,
ADD PRIMARY KEY ("itemId", "itemGuildId", "ownerId", "ownerGuildId");

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberGuildId" TEXT NOT NULL,

    PRIMARY KEY ("id","memberGuildId")
);

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "Member.id_memberGuildId_unique" ON "Member"("id", "memberGuildId");

-- CreateIndex
CREATE UNIQUE INDEX "Item.id_itemGuildId_unique" ON "Item"("id", "itemGuildId");

-- CreateIndex
CREATE UNIQUE INDEX "ShopItem_itemId_guildId_unique" ON "ShopItem"("itemId", "guildId");

-- AddForeignKey
ALTER TABLE "Member" ADD FOREIGN KEY ("memberGuildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("itemGuildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItem" ADD FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItem" ADD FOREIGN KEY ("itemId", "guildId") REFERENCES "Item"("id", "itemGuildId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD FOREIGN KEY ("itemId", "itemGuildId") REFERENCES "Item"("id", "itemGuildId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD FOREIGN KEY ("ownerId", "ownerGuildId") REFERENCES "Member"("id", "memberGuildId") ON DELETE CASCADE ON UPDATE CASCADE;
