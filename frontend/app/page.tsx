import {Hero} from "./home/Hero";
import Clarity from "./home/clarity/Clarity";
import Meaning from "./home/meaning/Meaning";
import Belonging from "./home/belonging/Belonging";

export default function Home() {
  return (
      <div className="min-h-screen w-full bg-white">
        <Hero />
        <Clarity />
        <Meaning />
        <Belonging />
      </div>
  );
}