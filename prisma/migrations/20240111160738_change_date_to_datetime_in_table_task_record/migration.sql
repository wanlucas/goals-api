/*
  Warnings:

  - The primary key for the `TaskRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `date` on the `TaskRecord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `TaskRecord` DROP PRIMARY KEY,
    MODIFY `date` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`taskId`, `date`);
