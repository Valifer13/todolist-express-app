/*
  Warnings:

  - You are about to drop the column `slug` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `uuid` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "slug",
ADD COLUMN     "uuid" TEXT NOT NULL;
