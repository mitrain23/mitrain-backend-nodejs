-- DropIndex
DROP INDEX `mitras_categoryName_fkey` ON `mitras`;

-- AddForeignKey
ALTER TABLE `mitras` ADD CONSTRAINT `mitras_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`) ON DELETE RESTRICT ON UPDATE CASCADE;
