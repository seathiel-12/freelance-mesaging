import prisma from "../prisma/client.ts";

interface UpdateUserDTO {
  firstname?: string;
  lastname?: string;
  vision?: string;
  about?: string;
  enterpriseName?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  cv?: string;
  members?: number;
}

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: { 
      id: true,
      email: true,
      firstname: true,
      lastname: true,
    },
  });
};


// GET USER PROFILE
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstname: true,
      lastname: true,
      status: true,
      vision: true,
      about: true,
      enterpriseName: true,
      github: true,
      linkedin: true,
      website: true,
      cv: true,
      members: true,
      isVerified: true,
      createdAt: true,
    },
  });
};

// UPDATE USER PROFILE
export const updateUser = async (id: string, data: UpdateUserDTO) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};