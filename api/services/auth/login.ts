import prisma from "../../prisma/client.ts";
import { comparePassword } from "../../utils/password.ts";

interface LoginDTO {
  email: string;
  password: string;
}

export const login = async (data: LoginDTO) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null; // Return null instead of throwing an error for invalid credentials
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
      return null; // Return null instead of throwing an error for invalid credentials
    }

  // You could return JWT later here
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    status: user.status,
  };
};