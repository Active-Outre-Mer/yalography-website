import { Badge, Title, Breadcrumbs, Anchor } from "@components/shared";
import { Editor } from "@components/admin/projects/Editor";

import prisma from "@lib/prisma";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ProjectMenu } from "@components/admin/projects/ProjectMenu";

const getProject = cache(async (id: number) => {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  await prisma.$disconnect();
  if (!project) notFound();
  return { ...project, createdAt: project.createdAt.toDateString() };
});

export default async function Page({ params }: { params: { status: "drafted" | "published"; id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();

  const project = await getProject(id);

  return (
    <>
      <div className="border-b flex justify-between p-5 -mx-5 -mt-5 mb-5 border-zinc-300 dark:border-zinc-600">
        <div>
          <Title color={"red"} size={"sm"}>
            Project
          </Title>
          <div className="flex items-end gap-4">
            <Title order={"h2"}>{project.name}</Title>
            <Badge color={project.published ? "emerald" : "orange"}>
              {project.published ? "Published" : "Drafted"}
            </Badge>
          </div>
        </div>
        <ProjectMenu pinned={project.pinned} projectName={project.name} id={project.id} published={project.published} />
      </div>
      <Breadcrumbs>
        <Anchor href={"/admin/projects"}>Projects</Anchor>
        <Anchor className="capitalize" href={`/admin/projects/${params.status}`}>
          {params.status}{" "}
        </Anchor>
        <Anchor href={`/admin/projects/${params.status}/1`}>{project.name}</Anchor>
      </Breadcrumbs>
      <div className="mt-2">
        <Editor projectData={project} />
      </div>
    </>
  );
}
