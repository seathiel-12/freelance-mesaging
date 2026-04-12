import prisma from "../prisma/client.ts";

interface SendMessageDTO {
  senderId: string;
  receiverId: string;
  content: string;
}

// CREATE
export const sendMessage = async (data: SendMessageDTO) => {
  const { senderId, receiverId, content } = data;

  return prisma.message.create({
    data: {
      id: crypto.randomUUID(),
      isEdited: false,
      senderId,
      receiverId,
      content,
    },
  });
};

// READ (conversation between 2 users)
export const getConversation = async (user1Id: string, user2Id: string) => {
  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
};

// UPDATE
export const updateMessage = async (id: string, content: string) => {
  return prisma.message.update({
    where: { id },
    data: { content, isEdited: true },
  });
};

// DELETE
export const deleteMessage = async (id: string) => {
  return prisma.message.delete({
    where: { id },
  });
};