-- CreateTable
CREATE TABLE `TaskRecord` (
    `taskId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`taskId`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskRecord` ADD CONSTRAINT `TaskRecord_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
