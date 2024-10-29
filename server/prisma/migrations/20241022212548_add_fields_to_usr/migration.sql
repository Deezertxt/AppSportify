/*
  Warnings:

  - You are about to drop the column `gender` on the `user` table. All the data in the column will be lost.
  - Added the required column `genderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `gender`,
    ADD COLUMN `genderId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameGender` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Gender_nameGender_key`(`nameGender`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
