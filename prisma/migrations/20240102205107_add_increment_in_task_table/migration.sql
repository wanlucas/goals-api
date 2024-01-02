/*
  Warnings:

  - You are about to drop the column `range` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `range`,
    ADD COLUMN `increment` INTEGER NULL;
