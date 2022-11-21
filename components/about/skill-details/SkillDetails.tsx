import { Grid, Section, Title } from "@components/shared";
import Image from "next/image";
import pixel from "@public/pixel2.jpg";

export function SkillDetails() {
  return (
    <Section margin="mb-0" className={`svg-background py-16 border-t border-zinc-700`}>
      <Grid cols="lg:grid-cols-1" width="w-11/12" gap="gap-48">
        <Skill />
        <Skill />
        <Skill />
      </Grid>
    </Section>
  );
}

function Skill() {
  return (
    <article className="flex  gap-10 even:flex-row-reverse">
      <div className="basis-1/2 grow">
        <header className="mb-5">
          <Title order="h2" color="text-red-500">
            Editing
          </Title>
          <Title order="h3" className="text-3xl">
            Something about editing
          </Title>
        </header>
        <p className="text-lg">
          Commodo nulla laboris non ullamco veniam consequat laborum esse. Nulla magna laboris pariatur qui
          reprehenderit mollit anim officia. Deserunt sunt Lorem duis culpa officia non culpa ex. Mollit veniam
          reprehenderit in minim fugiat incididunt irure magna nostrud ex labore eu duis in. Irure consectetur nisi
          aliquip incididunt amet incididunt.
        </p>
      </div>
      <figure className="bg-red-600 basis-1/2 grow">
        <Image src={pixel} alt={""} />
      </figure>
    </article>
  );
}
