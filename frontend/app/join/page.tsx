import Link from "next/link";

const benefits = [
  {
    title: "Curated build circles",
    description: "Join product squads focused on rapid iteration, supported by mentors who ship weekly."
  },
  {
    title: "Kinetic knowledge base",
    description: "Access research, rituals, and playbooks that turn learnings into momentum."
  },
  {
    title: "Launch showcases",
    description: "Share your wins with the community in immersive, cinematic demos."
  }
];

export default function JoinPage() {
  return (
    <div className="space-y-16 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Join the ProblemFinder beta</h1>
        <p className="mt-6 text-base text-white/70 md:text-lg">
          We are onboarding a limited number of teams who are obsessed with accelerating their build cycles. Tell us
          about your crew and we will send an invitation soon.
        </p>
        <Link
          href="mailto:team@problemfinder.io"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-pf-sky px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-pf-night shadow-lg shadow-pf-sky/30 transition hover:shadow-pf-sky/50"
        >
          Request access
        </Link>
      </div>
      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">{benefit.title}</h2>
            <p className="mt-4 text-sm text-white/70">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
