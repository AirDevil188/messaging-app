/*
  Warnings:

  - A unique constraint covering the columns `[chatroomId]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Messages_chatroomId_key" ON "Messages"("chatroomId");
