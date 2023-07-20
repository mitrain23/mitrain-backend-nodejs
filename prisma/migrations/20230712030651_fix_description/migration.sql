-- AlterTable
ALTER TABLE `post` ADD COLUMN `subtitle` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(255) NULL,
    MODIFY `phone_number_contact` VARCHAR(191) NULL;
