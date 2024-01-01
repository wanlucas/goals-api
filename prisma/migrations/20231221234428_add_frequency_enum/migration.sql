/*
  Warnings:

  - You are about to alter the column `frequency` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `frequency` ENUM('daily', 'weekly', 'monthly') NOT NULL;
