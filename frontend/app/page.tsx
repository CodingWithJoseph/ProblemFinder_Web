import {Hero} from "./home/Hero";
import {TopNavigation} from "../components/navigation/TopNavigation";

export default function HomePage() {
  return (
      <div className="min-h-screen w-full bg-white">
          <TopNavigation/>
          <Hero />
      </div>
  );
}