/*
  Warnings:

  - Added the required column `isMitra` to the `mitras` table without a default value. This is not possible if the table is not empty.
  - Made the column `mitraId` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `isMitra` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_mitraId_fkey`;

-- AlterTable
ALTER TABLE `mitras` ADD COLUMN `isMitra` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `posts` MODIFY `mitraId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isMitra` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `mitras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
