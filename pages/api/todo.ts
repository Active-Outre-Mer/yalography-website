import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import { handlePromise } from "@util/handle-promise";
import type { Tasks } from "@prisma/client";

async function deleteTodo(id: number) {
  await prisma.$connect();
  await prisma.tasks.delete({ where: { id } });
  await prisma.$disconnect();
}

type Data = {
  name: string;
  description?: string;
};

async function addTodo(data: Data) {
  await prisma.$connect();
  const task = await prisma.tasks.create({ data });
  await prisma.$disconnect();
  return task;
}

async function updateTodo(id: number, data: Tasks) {
  await prisma.$connect();
  const task = await prisma.tasks.update({ where: { id }, data });
  await prisma.$connect();
  return task;
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
    } else if (req.method === "POST") {
      const [data, error] = await handlePromise(addTodo(req.body));
      if (error) throw new Error(error);
      console.log(data);
      res.status(201).json({ message: "Task created", data });
    } else if (req.method === "PUT") {
      const { id, data } = req.body;
      const [taskData, error] = await handlePromise(updateTodo(id, data));
      if (error) throw new Error(error);

      res.status(200).json({ message: "Task updated", data: taskData });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error ocurred on the server", error });
  }
};

export default handler;
