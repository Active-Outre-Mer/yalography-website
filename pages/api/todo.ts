import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import { handlePromise } from "@util/handle-promise";

async function deleteTodo(id: number) {
  await prisma.$connect();
  await prisma.tasks.delete({ where: { id } });
  await prisma.$disconnect();
}

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "DELETE") {
      const id = req.body.id;

      const [, error] = await handlePromise(deleteTodo(id));

      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        res.status(200).json({ message: "Todo deleted" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error ocurred on the server", error });
  }
};

export default handler;