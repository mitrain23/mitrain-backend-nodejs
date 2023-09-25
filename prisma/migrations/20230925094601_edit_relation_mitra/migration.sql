-- DropForeignKey
ALTER TABLE `mitras` DROP FOREIGN KEY `mitras_categoryName_fkey`;

-- AddForeignKey
ALTER TABLE `mitras` ADD CONSTRAINT `mitras_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`) ON DELETE RESTRICT ON UPDATE CASCADE;
