/*
  Warnings:

  - You are about to drop the column `chatId` on the `Messages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Chatroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatroomId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_chatId_fkey";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "chatId",
ADD COLUMN     "chatroomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chatroom_id_key" ON "Chatroom"("id");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
