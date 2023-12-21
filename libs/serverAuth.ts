import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = res as unknown as NextResponse;
  const session = await getServerSession(
    req,
    {
      ...response,
      getHeader: (name: string) => response.headers?.get(name),
      setHeader: (name: string, value: string) =>
        response.headers?.set(name, value),
    } as unknown as NextApiResponse,
    authOptions
  );

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
