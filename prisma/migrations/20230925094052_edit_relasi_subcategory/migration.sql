-- DropForeignKey
ALTER TABLE `subcategory` DROP FOREIGN KEY `Subcategory_categoryName_fkey`;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`) ON DELETE RESTRICT ON UPDATE CASCADE;
