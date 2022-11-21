import { Grid, Button, Title, Section } from "@components/shared";
import Image from "next/image";
import photographer from "@public/photographer-lg.jpg";
import { Stats } from "./Stats";

export function AboutSection() {
  return (
    <Section>
      <Grid>
        <figure className="col-span-full lg:col-span-4 bg-red-600">
          <Image src={photographer} alt={""} />
        </figure>
        <div className="col-span-full lg:col-span-7 p-5">
          <header className="mb-7 space-y-2">
            <Title order={"h2"} color="red" size={"md"}>
              About
            </Title>
            <Title order={"h3"} className="text-3xl">
              Yalography
            </Title>
          </header>
          <p className="leading-loose text-lg mb-10">
            Dolore aute consequat sint ex est. Nisi eiusmod enim consequat quis incididunt dolor cupidatat incididunt eu
            est officia cillum esse. Aute duis laboris excepteur nisi amet eiusmod commodo in ut. Deserunt magna cillum
            enim deserunt qui sint mollit reprehenderit. Veniam occaecat sunt occaecat nisi magna et anim dolore
            voluptate.
          </p>
          <Stats />
          <Button className="mx-auto block">View gallery</Button>
        </div>
      </Grid>
    </Section>
  );
}
