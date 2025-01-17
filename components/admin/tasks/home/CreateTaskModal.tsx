"use client";
//Components
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { Textarea } from "@components/shared/Textarea";
import { Button } from "@components/shared/Button";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.Dialog));
const DatePicker = dynamic(() => import("@components/shared/DatePicker/DatePicker").then((mod) => mod.DatePicker));

//Hooks
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";

import type { FormEvent } from "react";
import type { SerializedTaskList, SerializedTask } from "@lib/prisma";

type PropTypes = {
  taskLists: (SerializedTaskList & { tasks: SerializedTask[] })[];
};

export function CreateTaskModal({ taskLists }: PropTypes) {
  const [dialog, dialogToggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [lazyLoad, lazyLoadToggle] = useToggle();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      name: formData.task_name,
      description: formData.description,
      groupId: parseInt(formData.task_list as string) || null,
      deadline: formData.deadline ? new Date(formData.deadline as string) : null,
      priority: formData.priority
    };
    toggle.on();
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(json.message);
        dialogToggle.off();
      } else {
        throw new Error(json.message, { cause: json.error });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };
  const isLoading = isPending || loading;
  const selectData = taskLists.map((list) => ({ label: list.name, value: `${list.id}` }));
  return (
    <>
      <Button onClick={dialogToggle.on} onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}>
        Create task
      </Button>
      {lazyLoad && (
        <Dialog title="Create new task" open={dialog} onOpenChange={dialogToggle.set}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Input required name="task_name" label="Task Name" />
              <DatePicker id="deadline" minDate={new Date()} label="Deadline" name="deadline" />
              <div className="flex gap-2">
                <Select className="grow basis-1/2" label="Add to task list" name="task_list" data={selectData} />
                <Select
                  defaultValue="low"
                  className="grow basis-1/2"
                  label="Priority"
                  name="priority"
                  data={[
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" }
                  ]}
                />
              </div>
              <Textarea name="description" label="Description" />
              <Button disabled={isLoading} intent={"accept"}>
                Submit
              </Button>
            </div>
          </form>
        </Dialog>
      )}
    </>
  );
}
