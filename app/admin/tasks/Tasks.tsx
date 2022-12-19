import { Button, Card, Title, Skeleton } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { DotsVertical } from "@lib/icons";
import { cx } from "cva";

import prisma from "@lib/prisma";

async function getTasks() {
  await prisma.$connect();
  const tasks = await prisma.tasks.findMany();
  await prisma.$disconnect();
  return tasks.map((task) => {
    return {
      ...task,
      createdAt: task.createdAt.toDateString(),
      updatedAt: task.updatedAt.toDateString(),
      deadline: task?.deadline?.toDateString() || ""
    };
  });
}

export async function Tasks() {
  const tasks = await getTasks();
  return (
    <Card style={{ padding: 0 }} className="col-span-5 p-0 overflow-hidden">
      <div className="dark:bg-zinc-700 bg-slate-200 flex justify-between p-2">
        <Title size={"xl"} order={"h2"}>
          Tasks
        </Title>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button>
              <DotsVertical size={16} />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Create task</Dropdown.Item>
            <Dropdown.Item>Sort by</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
      <ScrollAreaDemo height={300} orientation={"vertical"}>
        {tasks.map((task, key) => {
          return (
            <div
              key={key}
              className="flex justify-between items-center border-b -mx-4 p-2  border-gray-300 dark:border-gray-600 last-of-type:border-b-0"
            >
              <button
                aria-label={task.status ? "Uncheck task" : "Complete task"}
                className={cx("h-5 w-5 rounded-full border border-zinc-700", task.status ? "bg-emerald-500" : "")}
              ></button>
              <p>{task.name}</p>
              <Button intent="secondary">Delete task</Button>
            </div>
          );
        })}
      </ScrollAreaDemo>
    </Card>
  );
}

export function TasksLoading() {
  const tasks = Array(5).fill(null);
  return (
    <Card className="col-span-5 relative overflow-hidden">
      <Skeleton.Shimmer />
      <div className="dark:bg-zinc-700 -mx-4 -mt-4 bg-slate-200 flex items-center justify-between p-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton radius={"full"} className="w-3 h-7" />
      </div>
      {tasks.map((_, key) => {
        return (
          <div
            key={key}
            className="flex justify-between items-center border-b -mx-4 p-4  border-gray-300 dark:border-gray-600 last-of-type:border-b-0"
          >
            <Skeleton radius={"full"} className="w-5 h-5" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
        );
      })}
    </Card>
  );
}