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
export const getConversation = async (withId: string, userId: string) => {
  const userInfo = await prisma.user.findFirst({
    where: {
      id: withId,
    },
  });
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: withId, receiverId: userId },
        { senderId: userId, receiverId: withId },
      ],
    },
    orderBy: { createdAt: "asc" },
  })
  return { messages, userInfo };
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