import prisma from "../prisma/client"

export const checkSessionService = async (id: number) => {
  const session = prisma.session.findUnique({
    where: {
      id
    }
  })

  return (!session);
}