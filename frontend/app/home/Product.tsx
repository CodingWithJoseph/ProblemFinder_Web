"use client";

export default function Product() {
  const cards = [
    {
      title: "Discovery Layer. AI-Powered Platform",
      body: "Reveal the hidden problems worth solving. Analyze real human frustrations, patterns, and unmet needs to uncover opportunities where innovation can make a difference.",
      src: "images/validate.webp",
      align: "left",
    },
    {
      title: "Startup Layer. Driven by AI",
      body: "Transform discovery into action. Rapidly prototype, validate, and scale ideas with AI-powered tools. Turning sparks of insight into working ventures that evolve fast.",
      src: "images/discovery.webp",
      align: "right",
    },
  ];

  return (
    <section className="relative flex h-screen items-start justify-center px-20 py-10 bg-brand-jet-black">
      <div className="flex flex-1 flex-col items-center justify-center w-full h-full pb-20">
        <div className="flex flex-col items-center mb-16">
          <div className="max-w-5xl w-full text-start">
            <h2
              className="leading-tight tracking-tight text-transparent bg-clip-text drop-shadow-sm font-semibold"
              style={{
                fontSize: "clamp(2rem, 4vw, 5rem)",
                backgroundImage: "var(--color-gradient-blue)",
              }}>
              Build Often. Build Fast.
            </h2>
            <p className="font-light leading-tight tracking-tight text-brand-off-white" style={{ fontSize: "clamp(2rem, 3vw, 5rem)" }}>
              Create the world you want.
            </p>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="flex max-w-6xl h-full items-center justify-center gap-5 p-10">
          {cards.map(({ title, body, src, align }, i) => (
            <div
              key={i}
              className={`flex flex-col h-5/6 w-full rounded-3xl bg-brand-soft-charcoal overflow-hidden
              ${align === "left" ? "items-start" : "items-end"}`}>
              <div className="p-10">
                <p className="text-xl leading-tight tracking-tight text-gray-300 font-semibold">
                  <span className="text-white">{title}</span> {body}
                </p>
              </div>

              <div
                className={`relative w-[85%] h-full overflow-hidden rounded-2xl shadow-xl mb-[-3rem] 
                ${align === "left" ? "ml-[-3rem]" : "mr-[-3rem]"}`}>
                <img
                  alt={title}
                  src={src}
                  className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}