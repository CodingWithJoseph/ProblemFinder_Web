import { HeroSection } from "../components/ui/HeroSection";
import { ScrollScene } from "../components/ui/ScrollScene";

const pillars = [
  {
    title: "Launch, learn, repeat",
    description:
      "Shorten the feedback cycle with build rituals and automation that remove drag from your experiments."
  },
  {
    title: "Clarity for the crew",
    description:
      "Align teams around a shared discovery roadmap and keep every iteration transparent, measurable, and inspiring."
  },
  {
    title: "Momentum as a habit",
    description:
      "Celebrate progress daily with immersive dashboards and kinetic storytelling that reinforce bold thinking."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ScrollScene>
        <div className="grid gap-12 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur">
              <h3 className="mb-4 text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm text-white/70">{pillar.description}</p>
            </article>
          ))}
        </div>
      </ScrollScene>
    </div>
  );
}
