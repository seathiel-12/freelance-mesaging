import prisma from "../../prisma/client.ts";
import { hashPassword } from "../../utils/password.ts";

interface RegisterDTO {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  status: "FREELANCE" | "ENTERPRISE";
}

export const register = async (data: RegisterDTO) => {
  const {
    email,
    password,
    confirmPassword,
    firstname,
    lastname,
    status,
  } = data;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      firstname,
      lastname,
      status,
    },
  });

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstname,
    lastName: user.lastname,
    status: user.status,
  };
};