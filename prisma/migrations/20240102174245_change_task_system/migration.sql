-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_goalId_fkey`;

-- AlterTable
ALTER TABLE `Goal` MODIFY `target` INTEGER NULL,
    MODIFY `score` INTEGER NULL;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `value` INTEGER NULL,
    MODIFY `goalId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_goalId_fkey` FOREIGN KEY (`goalId`) REFERENCES `Goal`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
