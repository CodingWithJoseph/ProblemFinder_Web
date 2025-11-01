"use client";

export default function Introduction() {

  return (
    <section className="relative flex h-screen items-start justify-start px-20 py-10 bg-brand-jet-black">
      <div className="flex items-start justify-center w-full h-full pb-20">
        <div className="flex flex-col items-center mb-16">
          <div className="max-w-5xl w-full text-start">
            <h2 className="leading-tight tracking-tight text-transparent bg-clip-text drop-shadow-sm font-semibold"
              style={{ fontSize: "clamp(2rem, 2vw, 5rem)"}}>
              Introducing
            </h2>
            <h2 className="leading-tight tracking-tight text-transparent bg-clip-text drop-shadow-sm font-semibold"
                style={{ fontSize: "clamp(2rem, 4vw, 5rem)", backgroundImage: "var(--color-gradient-blue)", }}>
              Blue Labs
            </h2>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center w-full h-full pb-20 ">
      </div>
    </section>
  );
}