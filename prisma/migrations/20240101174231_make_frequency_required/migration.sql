/*
  Warnings:

  - Made the column `frequency` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `frequency` VARCHAR(191) NOT NULL;
