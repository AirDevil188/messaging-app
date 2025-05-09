/*
  Warnings:

  - Added the required column `chatId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "chatId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Chatroom" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Chatroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatroomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatroomToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChatroomToUser_B_index" ON "_ChatroomToUser"("B");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatroomToUser" ADD CONSTRAINT "_ChatroomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatroomToUser" ADD CONSTRAINT "_ChatroomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
