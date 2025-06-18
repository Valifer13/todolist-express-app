import { User } from "../generated/prisma"
import prisma from "../prisma/client"

interface UserInterface {
  username: string,
  email: string,
  password: string
}

// Debug only
export const getAllUser = async () => {
  return prisma.user.findMany();
}

export const createUser = async (userData: UserInterface): Promise<User> => {
  return prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password
    }
  })
}

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      id
    }
  })
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}