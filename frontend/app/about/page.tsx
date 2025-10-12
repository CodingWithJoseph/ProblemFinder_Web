import { ScrollScene } from "../../components/ui/ScrollScene";

const values = [
  {
    title: "Radical candor",
    description: "We communicate openly, share learnings quickly, and invite critique without ego."
  },
  {
    title: "Velocity over vanity",
    description: "Our success metric is how fast teams learn, not how polished our slides look."
  },
  {
    title: "Design with depth",
    description: "Every touch point should feel purposeful, cinematic, and alive."
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-16 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Why ProblemFinder?</h1>
        <p className="mt-6 text-base text-white/70 md:text-lg">
          ProblemFinder started as an internal ritual for teams who wanted to ship audacious ideas faster. Today we
          are building the operating system for relentless iteration, empowering teams to align, execute, and learn
          with cinematic clarity.
        </p>
      </div>
      <ScrollScene>
        <div className="space-y-10">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">{value.title}</h2>
              <p className="mt-4 text-sm text-white/70">{value.description}</p>
            </div>
          ))}
        </div>
      </ScrollScene>
    </div>
  );
}
