export const topics = [
  {
    key: "discovery",
    title: "Discovery",
    text: "Find the signals in the noise — real problems echoing across the web, waiting for someone bold enough to listen.",
    bg: "/images/discovery.webp",
  },
  {
    key: "validation",
    title: "Validation",
    text: "Watch demand reveal itself. People asking, searching, hoping — proof that the problem is real and ready to be solved.",
    bg: "/images/validate.webp",
  },
  {
    key: "insight",
    title: "Insight",
    text: "Patterns emerge where chaos once ruled. See problems cluster into themes, uncover root causes, and glimpse the bigger picture.",
    bg: "/images/insight.webp",
  },
  {
    key: "competition",
    title: "Competition",
    text: "See the landscape with clarity — who’s building, what’s missing, and where opportunity quietly waits between giants.",
    bg: "/images/competition.webp",
  },
  {
    key: "opportunity",
    title: "Opportunity",
    text: "All signals converge into one score — a living heartbeat of potential telling you where to build next.",
    bg: "/images/opportunity.webp",
  },
  {
    key: "community",
    title: "Community",
    text: "Join the builders mapping the world’s unmet needs. Every insight shared brings the future into sharper focus.",
    bg: "/images/community.webp",
  },
];

export type Topic = (typeof topics)[number];
