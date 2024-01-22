/*
  Warnings:

  - Added the required column `order` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "order" INTEGER NOT NULL;
