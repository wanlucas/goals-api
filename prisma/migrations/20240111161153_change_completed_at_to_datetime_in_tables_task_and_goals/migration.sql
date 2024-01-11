/*
  Warnings:

  - You are about to alter the column `completedAt` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `completedAt` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Goal` MODIFY `completedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `completedAt` DATETIME(3) NULL;
