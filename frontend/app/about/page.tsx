import {HowItWorks} from "./components/HowItWorks";
import {Features} from "./components/Features";
import {CallToAction} from "./components/CallToAction";

export default function About() {
    return (
        <div className="min-h-screen w-full bg-white">
            <HowItWorks />
            <Features />
            <CallToAction />
        </div>
    );
}