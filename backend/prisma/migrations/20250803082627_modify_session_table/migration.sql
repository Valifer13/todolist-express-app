/*
  Warnings:

  - You are about to drop the column `payload` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `session` DROP COLUMN `payload`,
    DROP COLUMN `userAgent`;
