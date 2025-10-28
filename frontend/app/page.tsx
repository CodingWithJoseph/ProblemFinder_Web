import {Hero} from "./home/Hero";
import Clarity from "./home/components/Clarity";
import Meaning from "./home/components/Meaning";
import Belonging from "./home/components/Belonging";

export default function HomePage() {
  return (
      <div className="min-h-screen w-full bg-white">
        <Hero />
        <Clarity />
        <Meaning />
        <Belonging />
      </div>
  );
}