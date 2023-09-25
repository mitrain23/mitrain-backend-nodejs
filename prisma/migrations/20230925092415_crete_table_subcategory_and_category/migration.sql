/*
  Warnings:

  - You are about to drop the column `category` on the `mitras` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `mitras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mitras` DROP COLUMN `category`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `categoryName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_categoryName_key`(`categoryName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategory` (
    `id` VARCHAR(191) NOT NULL,
    `subcategoryName` VARCHAR(191) NOT NULL,
    `categoryName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Subcategory_subcategoryName_key`(`subcategoryName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mitras` ADD CONSTRAINT `mitras_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
