import {TopNavigation} from "../../components/navigation/TopNavigation";
import {HowItWorks} from "./components/HowItWorks";
import {Features} from "./components/Features";
import {CallToAction} from "./components/CallToAction";

export default function About() {
    return (
        <div className="min-h-screen w-full bg-white">
            <TopNavigation />
            <HowItWorks />
            <Features />
            <CallToAction />
        </div>
    );
}