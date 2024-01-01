/*
  Warnings:

  - Made the column `quantity` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `quantity` INTEGER NOT NULL;
