/*
  Warnings:

  - You are about to alter the column `frequency` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `frequency` VARCHAR(191) NULL;
